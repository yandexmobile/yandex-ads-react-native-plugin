# yandex-mobile-ads

react native plugin for yandex mobile ads sdk

## Development

### Prerequesities

Set up environment:
https://reactnative.dev/docs/set-up-your-environment

Install yarn https://yarnpkg.com/getting-started/install

### Install project dependencies

```sh
yarn
```

### Launch Android sample:
```sh
yarn android
```

### Launch iOS sample:
```sh
yarn ios
```

## Installation

```sh
npm install yandex-mobile-ads
```

## Usage

#### Integrating an Interstitial Ad

Follow these steps to integrate an Interstitial Ad in your React Native application.

##### 1. Import the required modules and components

Import all the necessary modules, components, and utilities in your component file:

```ts
// ...
import { AdRequestConfiguration, AdTheme, Gender, InterstitialAdLoader, Location } from 'yandex-mobile-ads';
```

##### 2. Initialize a loader

Create an instance of the InterstitialAdLoader:

```ts
let loader = await InterstitialAdLoader.create();
```

##### 3. Initialize an ad request configuration

Create an instance of the AdRequestConfiguration:

```ts
let adRequestConfiguration = new AdRequestConfiguration(
    'demo-interstitial-yandex',
    '20',
    'context-query',
    ['context-tag'],
    Gender.Female,
    new Location(55.734202, 37.588063),
    AdTheme.Light,
    'bidding-data',
    new Map<string, string>([['param1', 'value1'], ['param2', 'value2']])
);
```

##### 4. Load an ad

Use the previously created loader to load an ad with the specified configuration:

```ts
let ad = await loader.loadAd(adRequestConfiguration)
    .then((ad) => {
        // Ad loaded successfully
        return ad;
    })
    .catch((error) => {
        // Handle error gracefully
        return;
    });
```

##### 5. Set callbacks and show the ad if loaded successfully

If the ad is loaded successfully, set up callbacks to handle various ad events and then show the ad:

```ts
if (ad) {
    ad.onAdShown = () => {
        console.log('Did show');
    };
    ad.onAdFailedToShow = (error) => {
        console.log(`Did fail to show with error: ${JSON.stringify(error)}`);
    };
    ad.onAdClicked = () => {
        console.log('Did click');
    };
    ad.onAdDismissed = () => {
        console.log('Did dismiss');
    };
    ad.onAdImpression = (impressionData) => {
        console.log(`Did track impression: ${JSON.stringify(impressionData)}`);
    };
    ad.show();
}
```

 <br />

#### Integrating a Rewarded Ad

Follow these steps to integrate a Rewarded Ad in your React Native application.

##### 1. Import the required modules and components

Import all the necessary modules, components, and utilities in your component file:

```ts
// ...
import { AdRequestConfiguration, AdTheme, Gender, Location, RewardedAdLoader } from 'yandex-mobile-ads';
```

##### 2. Initialize a loader

Create an instance of the RewardedAdLoader:

```ts
let loader = await RewardedAdLoader.create();
```

##### 3. Initialize an ad request configuration

Create an instance of the AdRequestConfiguration:

```ts
let adRequestConfiguration = new AdRequestConfiguration(
    'demo-rewarded-yandex',
    '20',
    'context-query',
    ['context-tag'],
    Gender.Male,
    new Location(55.734202, 37.588063),
    AdTheme.Dark,
    'bidding-data',
    new Map<string, string>([['param1', 'value1'], ['param2', 'value2']])
);
```

##### 4. Load an ad

Use the previously created loader to load an ad with the specified configuration:

```ts
let ad = await loader.loadAd(adRequestConfiguration)
    .then((ad) => {
        // Ad loaded successfully
        return ad;
    })
    .catch((error) => {
        // Handle error gracefully
        return;
    });
```

##### 5. Set callbacks and show the ad if loaded successfully

If the ad is loaded successfully, set up callbacks to handle various ad events and then show the ad:

```ts
if (ad) {
    ad.onAdShown = () => {
        console.log('Did show');
    };
    ad.onAdFailedToShow = (error) => {
        console.log(`Did fail to show with error: ${JSON.stringify(error)}`);
    };
    ad.onAdClicked = () => {
        console.log('Did click');
    };
    ad.onAdDismissed = () => {
        console.log('Did dismiss');
    };
    ad.onAdImpression = (impressionData) => {
        console.log(`Did track impression: ${JSON.stringify(impressionData)}`);
    };
    ad.onRewarded = (reward) => {
        console.log(`Did reward: ${JSON.stringify(reward)}`, setLogs);
    }
    ad.show();
}
```

 <br />

#### Integrating an AppOpen Ad

Follow these steps to integrate an AppOpen Ad in your React Native application.

##### 1. Import the required modules and components

Import all the necessary modules, components, and utilities in your component file:

```ts
// ...
import { AdRequestConfiguration, AdTheme, AppOpenAdLoader, Gender, Location } from 'yandex-mobile-ads';
```

##### 2. Initialize a loader

Create an instance of the RewardedAdLoader:

```ts
let loader = await AppOpenAdLoader.create();
```

##### 3. Initialize an ad request configuration

Create an instance of the AdRequestConfiguration:

```ts
let adRequestConfiguration = new AdRequestConfiguration(
    'demo-rewarded-yandex',
    '20',
    'context-query',
    ['context-tag'],
    Gender.Male,
    new Location(55.734202, 37.588063),
    AdTheme.Dark,
    'bidding-data',
    new Map<string, string>([['param1', 'value1'], ['param2', 'value2']])
);
```

##### 4. Load an ad

Use the previously created loader to load an ad with the specified configuration:

```ts
let ad = await loader.loadAd(adRequestConfiguration)
    .then((ad) => {
        // Ad loaded successfully
        return ad;
    })
    .catch((error) => {
        // Handle error gracefully
        return;
    });
```

##### 5. Set callbacks and handle AppState changes to show the ad (if loaded successfully) when the app becomes active

If the ad is loaded successfully, set up callbacks to handle various ad events. Additionally, handle app state changes to show the ad when the app becomes active:

```ts
if (ad) {
    ad.onAdShown = () => {
        console.log('Did show');
    };
    ad.onAdFailedToShow = (error) => {
        console.log(`Did fail to show with error: ${JSON.stringify(error)}`);
    };
    ad.onAdClicked = () => {
        console.log('Did click');
    };
    ad.onAdDismissed = () => {
        console.log('Did dismiss');
    };
    ad.onAdImpression = (impressionData) => {
        console.log(`Did track impression: ${JSON.stringify(impressionData)}`);
    };

    const handleAppStateChange = (nextAppState: string) => {
        if (nextAppState === 'active') {
            ad.show();
            subscription.remove();
        }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
}
```

 <br />

#### Integrating an Inline Banner Ad

Follow these steps to integrate an Inline Banner Ad in your React Native application.

##### 1. Import the required modules and components

Import all the necessary modules, components, and utilities in your component file:

```ts
// ...
import { Dimensions } from "react-native";
import { AdRequest, AdTheme, BannerAdSize, BannerView, Gender, Location } from "yandex-mobile-ads";
```

##### 2. Initialize an ad size

Create an instance of the BannerAdSize:

```ts
let adSize = await BannerAdSize.inlineSize(Dimensions.get('window').width, 250); // you can substitute your numbers
```

##### 3. Initialize an ad request

Create an instance of the AdRequest:

```ts
let adRequest = new AdRequest(
    '20',
    'context-query',
    ['context-tag'],
    Gender.Male,
    new Location(55.734202, 37.588063),
    AdTheme.Dark,
    'bidding-data',
    new Map<string, string>([['param1', 'value1'], ['param2', 'value2']])
);
```

##### 4. Render an Inline Banner Ad

Use the BannerView component to display a banner ad in your application. Set up the necessary properties and event callbacks to handle ad events:

```ts
{
    adSize && (
        <BannerView
            size={adSize!}
            adUnitId={'demo-banner-yandex'}
            adRequest={adRequest}
            onAdLoaded={() => console.log('Did load')}
            onAdFailedToLoad={(event: any) => console.log(`Did fail to load with error: ${JSON.stringify(event.nativeEvent)}`)}
            onAdClicked={() => console.log('Did click')}
            onLeftApplication={() => console.log('Did leave application')}
            onReturnToApplication={() => console.log('Did return to application')}
            onAdImpression={(event: any) => console.log(`Did track impression: ${JSON.stringify(event.nativeEvent.impressionData)}`)}
            onAdClose={() => console.log('Did close')}
        />
    )
}
```

 <br />

#### Integrating a Sticky Banner Ad

Follow these steps to integrate a Sticky Banner Ad in your React Native application.

##### 1. Import the required modules and components

Import all the necessary modules, components, and utilities in your component file:

```ts
// ...
import { Dimensions } from "react-native";
import { AdRequest, AdTheme, BannerAdSize, BannerView, Gender, Location } from "yandex-mobile-ads";
```

##### 2. Initialize an ad size

Create an instance of the BannerAdSize:

```ts
let adSize = await BannerAdSize.stickySize(Dimensions.get('window').width); // you can substitute your number
```

##### 3. Initialize an ad request

Create an instance of the AdRequest:

```ts
let adRequest = new AdRequest(
    '20',
    'context-query',
    ['context-tag'],
    Gender.Male,
    new Location(55.734202, 37.588063),
    AdTheme.Dark,
    'bidding-data',
    new Map<string, string>([['param1', 'value1'], ['param2', 'value2']])
);
```

##### 4. Render an Inline Banner Ad

Use the BannerView component to display a banner ad in your application. Set up the necessary properties and event callbacks to handle ad events:

```ts
{
    adSize && (
        <BannerView
            size={adSize!}
            adUnitId={'demo-banner-yandex'}
            adRequest={adRequest}
            onAdLoaded={() => console.log('Did load')}
            onAdFailedToLoad={(event: any) => console.log(`Did fail to load with error: ${JSON.stringify(event.nativeEvent)}`)}
            onAdClicked={() => console.log('Did click')}
            onLeftApplication={() => console.log('Did leave application')}
            onReturnToApplication={() => console.log('Did return to application')}
            onAdImpression={(event: any) => console.log(`Did track impression: ${JSON.stringify(event.nativeEvent.impressionData)}`)}
            onAdClose={() => console.log('Did close')}
        />
    )
}
```

## Mediation

#### Android

In ```android/app/build.gradle```:

You can choose adapters manually and include their dependencies:

```kt
dependencies {
    // ...
    implementation 'com.yandex.ads.mediation:mobileads-adcolony:4.8.0.14'
    implementation 'com.yandex.ads.mediation:mobileads-applovin:12.6.0.1'
    implementation 'com.yandex.ads.mediation:mobileads-chartboost:9.3.1.9'
    implementation 'com.yandex.ads.mediation:mobileads-google:23.0.0.4'
    implementation 'com.yandex.ads.mediation:mobileads-inmobi:10.7.5.0'
    implementation 'com.yandex.ads.mediation:mobileads-ironsource:8.2.1.1'
    implementation 'com.yandex.ads.mediation:mobileads-pangle:6.1.0.9.0'
    implementation 'com.yandex.ads.mediation:mobileads-startapp:5.0.2.1'
    implementation 'com.yandex.ads.mediation:mobileads-tapjoy:13.4.1.4'
    implementation 'com.yandex.ads.mediation:mobileads-vungle:7.1.0.5'
    implementation 'com.yandex.ads.mediation:mobileads-unityads:4.12.2.0'
    implementation 'com.yandex.ads.mediation:mobileads-mytarget:5.22.1.0'
}
```

If you plan to use AdMob, you need to add your AdMob ID to the AndroidManifest.xml file using a <meta-data> tag with com.google.android.gms.ads.APPLICATION_ID:

```kt
<manifest>
    <application>
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy"/>
    </application>
</manifest>
```

Some adapters also require adding specific maven urls:

In ```android/build.gradle```:

```kt
allprojects {
    repositories {
        // ...
        // IronSource
        maven { url = uri("https://android-sdk.is.com/") }
        // Pangle
        maven { url = uri("https://artifact.bytedance.com/repository/pangle") }
        // Tapjoy
        maven { url = uri("https://sdk.tapjoy.com/") }
        // Chartboost
        maven { url = uri("https://cboost.jfrog.io/artifactory/chartboost-ads/") }
        // AppNext
        maven { url = uri("https://dl.appnext.com/") }
    }
}
```

#### iOS

You can choose adapters manually and include their dependencies:

In ```ios/Podfile```:

```swift
pod 'AdColonyYandexMobileAdsAdapters', '4.9.0.20'
pod 'AppLovinYandexMobileAdsAdapters', '12.6.0.0'
pod 'ChartboostYandexMobileAdsAdapters', '9.7.0.9'
pod 'GoogleYandexMobileAdsAdapters', '11.7.0.0'
pod 'InMobiYandexMobileAdsAdapters', '10.7.4.4'
pod 'IronSourceYandexMobileAdsAdapters', '8.2.0.3'
pod 'StartAppYandexMobileAdsAdapters', '4.10.4.0'
pod 'VungleYandexMobileAdsAdapters', '7.4.0.4'
pod 'UnityAdsYandexMobileAdsAdapters', '4.12.2.0'
pod 'MyTargetYandexMobileAdsAdapters', '5.21.6.0'
```

If you plan to use AdMob, add the GADApplicationIdentifier key with your AdMob ID to your app's Info.plist file.
In ```ios/Info.plist```:

```swift
<key>GADApplicationIdentifier</key>
<string>ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy</string>
```

Networks also require adding specific SKAdNetworkIdentifiers to SKAdNetworkItems.
In ```ios/Info.plist```:

<details>
  <summary>Список SKAdNetwork</summary>

```xml
<key>SKAdNetworkItems</key>
<array>
    <dict>
        <!-- Yandex Ads -->
        <key>SKAdNetworkIdentifier</key>
        <string>zq492l623r.skadnetwork</string>
    </dict>
    <dict>
        <!-- Google (ex. AdMob) -->
        <key>SKAdNetworkIdentifier</key>
        <string>cstr6suwn9.skadnetwork</string>
    </dict>
    <dict>
        <!-- VK Реклама (ex. myTarget) -->
        <key>SKAdNetworkIdentifier</key>
        <string>n9x2a789qt.skadnetwork</string>
    </dict>
    <dict>
        <!-- VK Реклама (ex. myTarget) -->
        <key>SKAdNetworkIdentifier</key>
        <string>r26jy69rpl.skadnetwork</string>
    </dict>
    <dict>
        <!-- Start.io -->
        <key>SKAdNetworkIdentifier</key>
        <string>5l3tpt7t6e.skadnetwork</string>
    </dict>
    <dict>
        <!-- Vungle -->
        <key>SKAdNetworkIdentifier</key>
        <string>gta9lk7p23.skadnetwork</string>
    </dict>
    <dict>
        <!-- UnityAds -->
        <key>SKAdNetworkIdentifier</key>
        <string>4dzt52r2t5.skadnetwork</string>
    </dict>
    <dict>
        <!-- IronSource -->
        <key>SKAdNetworkIdentifier</key>
        <string>su67r6k2v3.skadnetwork</string>
    </dict>
    <dict>
        <!-- Applovin -->
        <key>SKAdNetworkIdentifier</key>
        <string>ludvb6z3bs.skadnetwork</string>
    </dict>
    <dict>
        <!-- Mintegral -->
        <key>SKAdNetworkIdentifier</key>
        <string>kbd757ywx3.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>633vhxswh4.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>tmhh9296z4.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>vcra2ehyfk.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>zh3b7bxvad.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>xmn954pzmp.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>79w64w269u.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>488r3q3dtq.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>d7g9azk84q.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>nzq8sh4pbs.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>866k9ut3g3.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>2q884k2j68.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>x8jxxk4ff5.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>gfat3222tu.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>pd25vrrwzn.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>lr83yxwka7.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>cp8zw746q7.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>pwdxu55a5a.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>c6k4g5qg8m.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>s39g8k73mm.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>wg4vff78zm.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>g28c52eehv.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>523jb4fst2.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>294l99pt4k.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>3qy4746246.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>a8cz6cu7e5.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>ggvn48r87g.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>y755zyxw56.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>qlbq5gtkt8.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>mls7yz5dvl.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>67369282zy.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>899vrgt9g8.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>mj797d8u6f.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>3sh42y64q3.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>f38h382jlk.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>24t9a8vw3c.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>mp6xlyr22a.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>x44k69ngh6.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>88k8774x49.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>hs6bdukanm.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>t3b3f7n3x8.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>prcb7njmu6.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>c7g47wypnu.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>52fl2v3hgk.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>9vvzujtq5s.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>m8dbw4sv7c.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>9g2aggbj52.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>m5mvw97r93.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>z5b3gh5ugf.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>dd3a75yxkv.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>9nlqeag3gk.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>cj5566h2ga.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>h5jmj969g5.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>dr774724x4.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>t7ky8fmwkd.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>fz2k2k5tej.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>u679fj5vs4.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>cs644xg564.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>9b89h5y424.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>w28pnjg2k4.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>2rq3zucswp.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>a7xqa6mtl2.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>g2y4y55b64.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>vc83br9sjg.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>eqhxz8m8av.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>7k3cvf297u.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>w9q455wk68.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>nu4557a4je.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>v4nxqhlyqp.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>wzmmz9fp6w.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>7fmhfwg9en.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>yclnxrl5pm.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>7tnzynbdc7.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>l6nv3x923s.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>h8vml93bkz.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>uzqba5354d.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>8qiegk9qfv.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>v79kvwwj4g.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>xx9sdjej2w.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>au67k4efj4.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>t38b2kh725.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>7ug5zh24hu.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>rx5hdcabgc.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>5lm9lj6jb7.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>qqp299437r.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>zmvfpc5aq8.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>9rd848q2bz.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>79pbpufp6p.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>dmv22haz9p.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>y5ghdn5j9k.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>n6fk4nfna4.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>7rz58n8ntl.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>v9wttpbfk9.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>n38lu8286q.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>feyaarzu9v.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>7fbxrn65az.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>47vhws6wlr.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>ejvt5qm6ak.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>b55w3d8y8z.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>v7896pgt74.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>5ghnmfs3dh.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>275upjj5gd.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>627r9wr2y5.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>sczv5946wb.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>8w3np9l82g.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>hb56zgv37p.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>9t245vhmpl.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>nrt9jy4kw9.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>7953jerfzd.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>dn942472g5.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>6v7lgmsu45.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>cad8qz2s3j.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>eh6m2bh4zr.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>jb7bn6koa5.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>fkak3gfpt6.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>a2p9lx4jpn.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>97r2b46745.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>22mmun2rn5.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>238da6jt44.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>44jx6755aq.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>b9bk5wbcq9.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>k674qkevps.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>tl55sbb4fm.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>24zw6aqk47.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>4468km3ulz.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>2tdux39lx8.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>2u9pt9hc89.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>8s468mfl3y.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>3cgn6rq224.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>glqzh8vgby.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>av6w8kgt66.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>klf5c3l5u5.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>nfqy3847ph.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>dticjx1a9i.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>ppxm28t8ap.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>9wsyqb3ku7.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>74b6s63p6l.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>xy9t38ct57.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>424m5254lk.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>qu637u8glc.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>f73kdq92p3.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>44n7hlldy6.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>kbmxgpxpgc.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>ecpz2srf59.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>x5854y7y24.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>f7s53z58qe.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>x8uqf25wch.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>uw77j35x4d.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>6964rsfnh4.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>gvmwg8q7h5.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>6yxyv74ff7.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>84993kbrcf.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>54nzkqm89y.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>pwa73g5rt2.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>mlmmfzh3r3.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>9yg77x724h.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>n66cz3y3bx.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>578prtvx9j.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>bvpn9ufa9b.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>6qx585k4p6.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>mtkv5xtk9e.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>l93v5h6a4m.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>rvh3l7un93.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>gta9lk7p23.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>5tjdwbrq8w.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>r45fhb6rf7.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>32z4fx6l9h.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>e5fvkxwrpn.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>8c4e2ghe7u.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>axh5283zss.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>3rd42ekr43.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>5mv394q32t.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>3qcr597p9d.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>v72qych5uu.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>ydx93a7ass.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>4pfyvq9l8r.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>5a6flpkh64.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>4fzdc2evr5.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>4w7y6s5ca2.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>252b5q8x7y.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>2fnua5tdw4.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>3l6bd9hu43.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>4mn522wn87.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>6g9af3uyq4.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>6p4ks3rnbw.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>6xzpu9s2p8.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>737z793b9f.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>89z7zv988g.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>8m87ys6875.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>8r8llnkz5a.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>bxvub5ada5.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>c3frkrj4fj.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>cg4yq2srnc.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>dbu4b84rxf.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>dkc879ngq3.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>dzg6xy7pwj.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>gta8lk7p23.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>hdw39hrw9y.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>hjevpa356n.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>krvm3zuq6h.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>ln5gz23vtd.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>m297p6643m.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>p78axxw29g.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>pu4na253f3.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>s69wq72ugq.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>t6d3zquu66.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>vutu7akeur.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>x2jnk7ly8j.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>x5l83yy675.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>y45688jllp.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>yrqqpx2mcb.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>z4gj7hsk7h.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>33r6p7g8nc.skadnetwork</string>
    </dict>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>g69uk9uh2b.skadnetwork</string>
    </dict>
</array>
```

</details>
