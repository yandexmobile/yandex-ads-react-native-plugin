import { HomeScreen, SettingsScreen, InterstitialScreen, InlineBannerScreen, StickyBannerScreen, RewardedScreen, AppOpenScreen, } from './screens/ads';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Button } from 'react-native';
import { MobileAds } from 'yandex-mobile-ads';

const AppStack = createNativeStackNavigator();

const AppStackNavigator = () => {
    const backgroundStyle = { backgroundColor: '#b4b1b1' };
    const textStyle = { color: '#212121' };
    return (
        <AppStack.Navigator
            screenOptions={() => ({
                headerRight: () => (
                    <Button
                        onPress={() => MobileAds.showDebugPanel()}
                        title="Debug panel"
                        color="#000"
                    />
                ),
            })}>
            <AppStack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Yandex Mobile Ads',
                    headerStyle: backgroundStyle,
                    headerTitleStyle: textStyle,
                }}
            />
            <AppStack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    title: 'Settings',
                    headerStyle: backgroundStyle,
                    headerTitleStyle: textStyle,
                    headerRight: undefined,
                }}
            />
            <AppStack.Screen
                name="Sticky Banner"
                component={StickyBannerScreen}
                options={() => ({
                    title: 'Sticky Banner',
                    headerStyle: backgroundStyle,
                    headerTitleStyle: textStyle,
                    headerRight: undefined,
                })}
            />
            <AppStack.Screen
                name="Inline Banner"
                component={InlineBannerScreen}
                options={() => ({
                    title: 'Inline Banner',
                    headerStyle: backgroundStyle,
                    headerTitleStyle: textStyle,
                    headerRight: undefined,
                })}
            />
            <AppStack.Screen
                name="Interstitial"
                component={InterstitialScreen}
                options={() => ({
                    title: 'Interstitial',
                    headerStyle: backgroundStyle,
                    headerTitleStyle: textStyle,
                    headerRight: undefined,
                })}
            />
            <AppStack.Screen
                name="Rewarded"
                component={RewardedScreen}
                options={() => ({
                    title: 'Rewarded',
                    headerStyle: backgroundStyle,
                    headerTitleStyle: textStyle,
                    headerRight: undefined,
                })}
            />
            <AppStack.Screen
                name="AppOpen"
                component={AppOpenScreen}
                options={() => ({
                    title: 'AppOpen',
                    headerStyle: backgroundStyle,
                    headerTitleStyle: textStyle,
                    headerRight: undefined,
                })}
            />
        </AppStack.Navigator>
    );
};

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <AppStackNavigator />
        </NavigationContainer>
    );
};

export default RootNavigator;
