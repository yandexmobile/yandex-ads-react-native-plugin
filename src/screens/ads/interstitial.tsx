import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { AdRequestConfiguration, AdTheme, Gender, InterstitialAd, InterstitialAdLoader, Location } from 'yandex-mobile-ads';
import AdScreensStyle from './styles/styles';
import LogView from '../../components/logView';
import Logger from '../../common/logger';
import DropdownList from '../../components/dropdownList';
import AdNetwork from '../../common/adNetworkUtils/adNetwork';
import AdNetworkProvider from '../../common/adNetworkUtils/adNetworkProvider';

const logger = new Logger();

const loadAd = async (adUnitId: string, setAd: any, setButtonLabel: any, setIsButtonDisabled: any, setLogs: any) => {
    let loader = await InterstitialAdLoader.create()
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
            setAd(ad);
            setButtonLabel('Show ad');
            setIsButtonDisabled(false);
        })
        .catch((error) => {
            logger.addLog(`Did fail to load with error: ${error}`, setLogs);
            setAd(undefined);
            setButtonLabel('Load ad');
            setIsButtonDisabled(false);
        });
};

const showAd = async (ad: InterstitialAd | undefined, setButtonLabel: any, setIsButtonDisabled: any, setLogs: any) => {
    if (ad) {
        ad.onAdShown = () => {
            logger.addLog('Did show', setLogs);
            setButtonLabel('Load ad');
            setIsButtonDisabled(false);
        };
        ad.onAdFailedToShow = (error) => {
            logger.addLog(`Did fail to show with error: ${JSON.stringify(error)}`, setLogs);
            setButtonLabel('Load ad');
            setIsButtonDisabled(false);
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
        ad.show();
    }
};

const InterstitialScreen = () => {
    const styles = AdScreensStyle;
    const interstitialAdNetworks = AdNetworkProvider.instance.interstitialAdNetworks;

    const [ad, setAd] = useState<InterstitialAd | undefined>(undefined);
    const [buttonLabel, setButtonLabel] = useState<string>('Load ad');
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [selectedAdNetwork, setAdNetwork] = useState<AdNetwork | undefined>(interstitialAdNetworks[0]);

    return (
        <SafeAreaView style={[styles.verticalContainer, styles.commonView]}>
            <View style={styles.horizontalContainer}>
                <DropdownList
                    adNetworks={interstitialAdNetworks}
                    setAdNetwork={(value) => setAdNetwork(value)}
                    style={styles.fullscreenAdDropdownList}
                />
                <TouchableOpacity
                    onPress={() => {
                        setIsButtonDisabled(true);
                        if (buttonLabel === 'Load ad') {
                            loadAd(selectedAdNetwork?.adUnitId ?? '', setAd, setButtonLabel, setIsButtonDisabled, setLogs);
                        } else if (buttonLabel === 'Show ad') {
                            showAd(ad, setButtonLabel, setIsButtonDisabled, setLogs);
                        }
                    }}
                    disabled={isButtonDisabled}
                    style={isButtonDisabled ? styles.buttonViewDisabled : styles.buttonViewEnabled}
                >
                    <Text style={isButtonDisabled ? styles.buttonLabelDisabled : styles.buttonLabelEnabled}>{buttonLabel}</Text>
                </TouchableOpacity>
            </View>
            <LogView logs={logs} />
        </SafeAreaView>
    );
};

export default InterstitialScreen;
