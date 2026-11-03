// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "AdsDependencies",
    platforms: [.iOS(.v15)],
    products: [.library(name: "AdsDependencies", targets: ["AdsDependencies"])],
    dependencies: [
        .package(url: "https://github.com/yandexmobile/yandex-ads-sdk-mediation-ios", exact: "8.6.0"),
    ],
    targets: [
        .target(
            name: "AdsDependencies",
            dependencies: [.product(name: "YandexMobileAdsMediation", package: "yandex-ads-sdk-mediation-ios")]
        ),
    ]
)
