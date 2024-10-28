import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Switch, Text, View } from 'react-native';
import { MobileAds } from 'yandex-mobile-ads';
import AdScreensStyle from './ads/styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

enum SettingsType {
    UserConsent = 'User consent',
    LocationConsent = 'Location consent',
    AgeRestrictedUser = 'Age restricted user',
    Logging = 'Logging',
    DebugErrorIndicator = 'Debug error indicator',
}

type Setting = {
    id: string;
    type: SettingsType;
    isEnabled: boolean;
};

const initialSettings: Setting[] = [
    { id: '1', type: SettingsType.UserConsent, isEnabled: false },
    { id: '2', type: SettingsType.LocationConsent, isEnabled: false },
    { id: '3', type: SettingsType.AgeRestrictedUser, isEnabled: false },
    { id: '4', type: SettingsType.Logging, isEnabled: false },
    { id: '5', type: SettingsType.DebugErrorIndicator, isEnabled: false },
];

const SettingsScreen = () => {
    const styles = AdScreensStyle;

    const [settings, setSettings] = useState<Setting[]>(initialSettings);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const savedData = await AsyncStorage.getItem('settings');
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                setSettings(parsedData);
            }
        } catch (error) {
            console.error('Error loading data', error);
        }
    };

    const saveData = async (newData: Setting[]) => {
        try {
            await AsyncStorage.setItem('settings', JSON.stringify(newData));
        } catch (error) {
            console.error('Error saving data', error);
        }
    };

    const toggleSwitch = (id: string) => {
        const newData = settings.map(item =>
            item.id === id ? { ...item, isEnabled: !item.isEnabled } : item
        );

        setSettings(newData);
        saveData(newData);

        const updatedItem = newData.find(item => item.id === id);

        switch (updatedItem?.type) {
            case SettingsType.UserConsent:
                MobileAds.setUserConsent(updatedItem.isEnabled);
                break;
            case SettingsType.LocationConsent:
                MobileAds.setLocationConsent(updatedItem.isEnabled);
                break;
            case SettingsType.AgeRestrictedUser:
                MobileAds.setAgeRestrictedUser(updatedItem.isEnabled);
                break;
            case SettingsType.Logging:
                MobileAds.enableLogging(updatedItem.isEnabled);
                break;
            case SettingsType.DebugErrorIndicator:
                MobileAds.enableDebugErrorIndicator(updatedItem.isEnabled);
                break;
            default:
                break;
        }
    };

    const renderItem = ({ item }: { item: Setting }) => {
        return (
            <View style={styles.settingsList}>
                <Text style={styles.settingLabel}>{item.type}</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#61dafb' }}
                    thumbColor={item.isEnabled ? '#f4f3f4' : '#f4f3f4'}
                    onValueChange={() => toggleSwitch(item.id)}
                    value={item.isEnabled}
                />
            </View>
        );
    };

    return (
        <SafeAreaView style={[styles.verticalContainer, styles.commonView]}>
            <Text style={styles.settingLabel}>Plugin version: {MobileAds.pluginVersion}</Text>
            <FlatList
                data={settings}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                scrollEnabled={false}
            />
        </SafeAreaView>
    );
};

export default SettingsScreen;
