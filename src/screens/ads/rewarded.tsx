import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { AdRequestConfiguration, AdTheme, Gender, Location, RewardedAd, RewardedAdLoader } from 'yandex-mobile-ads';
import AdScreensStyle from './styles/styles';
import LogView from '../../components/logView';
import Logger from '../../common/logger';
import DropdownList from '../../components/dropdownList';
import AdNetwork from '../../common/adNetworkUtils/adNetwork';
import AdNetworkProvider from '../../common/adNetworkUtils/adNetworkProvider';

const logger = new Logger();

const loadAd = async (adUnitId: string, setAd: any, setButtonLabel: any, setIsButtonDisabled: any, setLogs: any) => {
    let loader = await RewardedAdLoader.create();
    let adRequestConfiguration = new AdRequestConfiguration(
        adUnitId,
        '20',
        'context-query',
        ['context-tag'],
        Gender.Female,
        new Location(55.734202, 37.588063),
        AdTheme.Light,
        'bidding-data',
        new Map<string, string>([['param1', 'value1'], ['param2', 'value2']])
    );
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
}

const showAd = async (ad: RewardedAd | undefined, setButtonLabel: any, setIsButtonDisabled: any, setLogs: any) => {
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
        ad.onRewarded = (reward) => {
            logger.addLog(`Did reward: ${JSON.stringify(reward)}`, setLogs);
        }
        ad.show();
    }
};

const RewardedScreen = () => {
    const styles = AdScreensStyle;
    const rewardedAdNetworks = AdNetworkProvider.instance.rewardedAdNetworks;

    const [ad, setAd] = useState<RewardedAd | undefined>(undefined);
    const [buttonLabel, setButtonLabel] = useState<string>('Load ad');
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [selectedAdNetwork, setAdNetwork] = useState<AdNetwork | undefined>(rewardedAdNetworks[0]);

    return (
        <SafeAreaView style={[styles.verticalContainer, styles.commonView]}>
            <View style={styles.horizontalContainer}>
                <DropdownList
                    adNetworks={rewardedAdNetworks}
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

export default RewardedScreen;
