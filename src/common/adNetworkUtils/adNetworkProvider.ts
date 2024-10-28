import { Platform } from 'react-native';
import Network from './adNetwork';
import IosAdNetworkProvider from './iosAdNetworkProvider';
import AndroidAdAdNetworkProvider from './androidAdNetworkProvider';

class AdNetworkProvider {
    static instance: AdNetworkProvider = AdNetworkProvider.createInstance();

    bannerInlineAdNetworks: Network[] = [];
    bannerStickyAdNetworks: Network[] = [];
    interstitialAdNetworks: Network[] = [];
    rewardedAdNetworks: Network[] = [];
    appOpenAdNetworks: Network[] = [];

    private static createInstance(): AdNetworkProvider {
        const platform = Platform.OS;
        switch (platform) {
            case 'android':
                return new AndroidAdAdNetworkProvider();
            case 'ios':
                return new IosAdNetworkProvider();
            default:
                throw new Error('The Yandex Mobile Ads SDK is only supported on Android and iOS.');
        }
    }
}

export default AdNetworkProvider;
