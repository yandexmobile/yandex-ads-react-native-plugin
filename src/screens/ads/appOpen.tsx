import { Text, TouchableOpacity, View, AppState, SafeAreaView, type NativeEventSubscription } from 'react-native';
import React, { useCallback, useState } from 'react';
import { AdRequestConfiguration, AdTheme, AppOpenAdLoader, AppOpenAd, Gender, Location } from 'yandex-mobile-ads';
import AdScreensStyle from './styles/styles';
import LogView from '../../components/logView';
import Logger from '../../common/logger';
import DropdownList from '../../components/dropdownList';
import AdNetwork from '../../common/adNetworkUtils/adNetwork';
import AdNetworkProvider from '../../common/adNetworkUtils/adNetworkProvider';
import { useFocusEffect } from '@react-navigation/native';

const logger = new Logger();
let subscription: NativeEventSubscription | null = null;

const loadAd = async (adUnitId: string, updateAdStatus: any, setIsButtonDisabled: any, setLogs: any) => {
    let loader = await AppOpenAdLoader.create()
        .catch((error) => {
            logger.addLog(`Did fail to create the loader with error: ${error}`, setLogs);
            setIsButtonDisabled(false);
            return;
        });
    if (!loader) {
        return;
    }
    let adRequestConfiguration = new AdRequestConfiguration({
        adUnitId: adUnitId,
        age: '20',
        contextQuery: 'context-query',
        contextTags: ['context-tag'],
        gender: Gender.Female,
        location: new Location(55.734202, 37.588063),
        adTheme: AdTheme.Light,
        parameters: new Map<string, string>([['param1', 'value1'], ['param2', 'value2']]),
    });
    await loader.loadAd(adRequestConfiguration)
        .then((ad) => {
            logger.addLog('Did load', setLogs);
            updateAdStatus('Ad is ready to be presented', true);
            prepareToShowAd(ad, updateAdStatus, setIsButtonDisabled, setLogs);
        })
        .catch((error) => {
            logger.addLog(`Did fail to load with error: ${error}`, setLogs);
            setIsButtonDisabled(false);
        });
};

const prepareToShowAd = async (ad: AppOpenAd | undefined, updateAdStatus: any, setIsButtonDisabled: any, setLogs: any) => {
    if (ad) {
        ad.onAdShown = () => {
            logger.addLog('Did show', setLogs);
        };
        ad.onAdFailedToShow = (error) => {
            logger.addLog(`Did fail to show with error: ${JSON.stringify(error)}`, setLogs);
        };
        ad.onAdClicked = () => {
            logger.addLog('Did click', setLogs);
        };
        ad.onAdDismissed = () => {
            logger.addLog('Did dismiss', setLogs);
        };
        ad.onAdImpression = (impressionData) => {
            logger.addLog(`Did track impression: ${JSON.stringify(impressionData)}`, setLogs);
        };

        const handleAppStateChange = (nextAppState: string) => {
            if (nextAppState === 'active') {
                ad.show();
                subscription?.remove();
                subscription = null;
                updateAdStatus('Ad is not ready to be presented', false);
                setIsButtonDisabled(false);
            }
        };

        subscription = AppState.addEventListener('change', handleAppStateChange);
    }
};

const AppOpenScreen = ({ }: { navigation: any }) => {
    const styles = AdScreensStyle;
    const appOpenAdNetworks = AdNetworkProvider.instance.appOpenAdNetworks;

    const [adStatusLabel, setAdStatusLabel] = useState('Ad is not ready to be presented');
    const [isAdReady, setIsAdReady] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [selectedAdNetwork, setAdNetwork] = useState<AdNetwork | undefined>(appOpenAdNetworks[0]);

    const updateAdStatus = (status: string, ready: boolean) => {
        setAdStatusLabel(status);
        setIsAdReady(ready);
    };

    useFocusEffect(
        useCallback(() => {
            return () => {
                subscription?.remove();
                subscription = null;
            };
        }, [])
    );

    return (
        <SafeAreaView style={[styles.verticalContainer, styles.commonView]}>
            <View style={styles.horizontalContainer}>
                <DropdownList
                    adNetworks={appOpenAdNetworks}
                    setAdNetwork={(value) => setAdNetwork(value)}
                    style={styles.fullscreenAdDropdownList}
                />
                <TouchableOpacity
                    onPress={() => {
                        setIsButtonDisabled(true);
                        loadAd(selectedAdNetwork?.adUnitId ?? '', updateAdStatus, setIsButtonDisabled, setLogs);
                    }}
                    disabled={isButtonDisabled}
                    style={isButtonDisabled ? styles.buttonViewDisabled : styles.buttonViewEnabled}
                >
                    <Text style={isButtonDisabled ? styles.buttonLabelDisabled : styles.buttonLabelEnabled}>Load ad</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.labelView}>
                <Text style={isAdReady ? styles.labelWhenReady : styles.labelWhenlNotReady}>{adStatusLabel}</Text>
            </View>
            <LogView logs={logs} />
        </SafeAreaView>
    );
};

export default AppOpenScreen;
