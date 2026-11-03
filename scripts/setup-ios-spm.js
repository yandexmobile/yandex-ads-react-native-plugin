const {execFileSync} = require('child_process');
const fs = require('fs');
const path = require('path');

const app = path.resolve(process.argv[2] || process.cwd());
const cli = path.join(
    path.dirname(require.resolve('react-native/package.json', {paths: [app]})),
    'scripts/setup-apple-spm.js',
);
const project = fs.readdirSync(path.join(app, 'ios')).find(name => name.endsWith('.xcodeproj'));
if (!project) throw new Error('iOS Xcode project not found');
const target = project.replace(/\.xcodeproj$/, '');
const run = (...args) =>
    execFileSync(
        process.execPath,
        [cli, ...args, '--xcodeproj', path.join(app, 'ios', project), '--product-name', target],
        {
            cwd: app,
            stdio: 'inherit',
        },
    );
run('scaffold', '--yes');
const autolinking = JSON.parse(
    fs.readFileSync(path.join(app, 'ios/build/generated/autolinking/autolinking.json'), 'utf8'),
);
for (const dependency of Object.values(autolinking.dependencies)) {
    const manifestPath = path.join(dependency.root, 'Package.swift');
    if (!fs.existsSync(manifestPath)) continue;
    const manifest = fs.readFileSync(manifestPath, 'utf8');
    if (
        !manifest.includes('AUTO-SCAFFOLDED') ||
        manifest.includes('.define("RCT_NEW_ARCH_ENABLED"')
    )
        continue;
    fs.writeFileSync(
        manifestPath,
        manifest.replace(/(c(?:xx)?Settings: \[)/g, '$1.define("RCT_NEW_ARCH_ENABLED", to: "1"), '),
    );
}
const permissions = path.join(app, 'node_modules/react-native-permissions/Package.swift');
if (fs.existsSync(permissions)) {
    let manifest = fs.readFileSync(permissions, 'utf8');
    for (const permission of ['AppTrackingTransparency', 'LocationAlways', 'LocationWhenInUse']) {
        const source = `ios/${permission}/RNPermissionHandler${permission}.mm`;
        if (!manifest.includes(source)) {
            manifest = manifest.replace('sources: [', `sources: [\n                "${source}",`);
        }
    }
    if (!manifest.includes('.linkedFramework("AppTrackingTransparency")')) {
        manifest = manifest.replace(
            'linkerSettings: [',
            'linkerSettings: [.linkedFramework("AppTrackingTransparency"), .linkedFramework("CoreLocation"), ',
        );
    }
    for (const permission of ['AppTrackingTransparency', 'LocationAlways', 'LocationWhenInUse']) {
        if (!manifest.includes(`ios/${permission}/RNPermissionHandler${permission}.mm`)) {
            throw new Error(`SwiftPM scaffolding omitted permission handler ${permission}`);
        }
    }
    fs.writeFileSync(permissions, manifest);
}
const screens = path.join(app, 'node_modules/react-native-screens/Package.swift');
if (fs.existsSync(screens)) {
    const manifest = fs.readFileSync(screens, 'utf8');
    const searchPath = '.headerSearchPath("common/cpp/react/renderer/components")';
    if (!manifest.includes(searchPath)) {
        const patched = manifest.replace(/(c(?:xx)?Settings: \[)/g, `$1${searchPath}, `);
        if (!patched.includes(searchPath))
            throw new Error('SwiftPM screens manifest has no header settings');
        fs.writeFileSync(screens, patched);
    }
}
run('--yes');
const ios = path.join(app, 'ios');
for (const entry of fs.readdirSync(ios).filter(name => name.endsWith('.xcodeproj'))) {
    const projectPath = path.join(ios, entry, 'project.pbxproj');
    const source = fs.readFileSync(projectPath, 'utf8');
    fs.writeFileSync(
        projectPath,
        source.replace(
            /HERMES_CLI_PATH = "[^"]+";/g,
            'HERMES_CLI_PATH = "$(SRCROOT)/../node_modules/hermes-compiler/hermesc/osx-bin/hermesc";',
        ),
    );
}
