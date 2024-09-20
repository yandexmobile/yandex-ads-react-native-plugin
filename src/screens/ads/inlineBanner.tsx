import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { AdRequest, AdTheme, BannerAdSize, BannerView, Gender, Location } from 'yandex-mobile-ads';
import AdScreensStyle from './styles/styles';
import LogView from '../../components/logView';
import Logger from '../../common/logger';
import DropdownList from '../../components/dropdownList';
import AdNetwork from '../../common/adNetworkUtils/adNetwork';
import AdNetworkProvider from '../../common/adNetworkUtils/adNetworkProvider';

const logger = new Logger();

const getBannerSize = async (width: string, maxHeight: string, setAdSize: any, setIsButtonDisabled: any, setIsBannerShowing: any, setLogs: any) => {
    if (Number(width) && Number(maxHeight)) {
        await BannerAdSize.inlineSize(Number(width), Number(maxHeight))
            .then((adSize) => {
                setAdSize(adSize);
                setIsButtonDisabled(false);
                setIsBannerShowing(true);
            })
            .catch((error) => {
                logger.addLog(`Did fail to get banner size with error: ${error}`, setLogs);
                setAdSize(undefined);
                setIsButtonDisabled(false);
            })
    } else {
        logger.addLog('Invalid banner size value(s)', setLogs);
        setIsButtonDisabled(false);
    }
}

const InlineBannerScreen = () => {
    const styles = AdScreensStyle;
    const bannerAdNetworks = AdNetworkProvider.instance.bannerInlineAdNetworks;

    const [adSize, setAdSize] = useState<BannerAdSize | null>(null);
    const [bannerWidthValue, setBannerWidthValue] = useState<string>('320');
    const [bannerMaxHeightValue, setBannerMaxHeightValue] = useState<string>('50');
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [isBannerShowing, setIsBannerShowing] = useState<boolean>(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [selectedAdNetwork, setAdNetwork] = useState<AdNetwork | undefined>(bannerAdNetworks[0]);

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

    return (
        <SafeAreaView style={[styles.verticalContainer, styles.commonView]}>
            <View style={styles.horizontalContainer}>
                <DropdownList
                    adNetworks={bannerAdNetworks}
                    setAdNetwork={(value) => setAdNetwork(value)}
                    style={styles.bannerInlineDropdownList}
                />
                <TextInput
                    style={[styles.bannerSizeInput, styles.inputLabel]}
                    value={bannerWidthValue}
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={setBannerWidthValue}
                />
                <TextInput
                    style={[styles.bannerSizeInput, styles.inputLabel]}
                    value={bannerMaxHeightValue}
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={setBannerMaxHeightValue}
                />
                <TouchableOpacity
                    onPress={() => {
                        setIsButtonDisabled(true);
                        setIsBannerShowing(false);
                        getBannerSize(bannerWidthValue, bannerMaxHeightValue, setAdSize, setIsButtonDisabled, setIsBannerShowing, setLogs);
                    }}
                    disabled={isButtonDisabled}
                    style={isButtonDisabled ? styles.buttonViewDisabled : styles.buttonViewEnabled}
                >
                    <Text style={isButtonDisabled ? styles.buttonLabelDisabled : styles.buttonLabelEnabled}>Load ad</Text>
                </TouchableOpacity>
            </View>
            <View>
                <View style={styles.bannerView}>
                    {isBannerShowing && adSize && selectedAdNetwork?.adUnitId && (
                        <BannerView
                            size={adSize!}
                            adUnitId={selectedAdNetwork?.adUnitId!}
                            adRequest={adRequest}
                            onAdLoaded={() => logger.addLog('Did load', setLogs)}
                            onAdFailedToLoad={(event: any) => {
                                setIsBannerShowing(false);
                                logger.addLog(`Did fail to load with error: ${JSON.stringify(event.nativeEvent)}`, setLogs);
                            }}
                            onAdClicked={() => logger.addLog('Did click', setLogs)}
                            onLeftApplication={() => logger.addLog('Did leave application', setLogs)}
                            onReturnToApplication={() => logger.addLog('Did return to application', setLogs)}
                            onAdImpression={(event: any) => logger.addLog(`Did track impression: ${JSON.stringify(event.nativeEvent.impressionData)}`, setLogs)}
                            onAdClose={() => {
                                setIsBannerShowing(false);
                                logger.addLog('Did close', setLogs);
                            }}
                        />
                    )}
                </View>
                <LogView logs={logs} />
            </View>
        </SafeAreaView>
    );
};

export default InlineBannerScreen;
