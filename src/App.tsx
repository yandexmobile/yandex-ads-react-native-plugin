import * as React from 'react';
import { MobileAds } from 'yandex-mobile-ads';

import RootNavigator from './navigator';

export default function App() {
    React.useEffect(() => {
        (async () => {
            await MobileAds.initialize();
        })();
    });
    return (
        <>
            <RootNavigator />
        </>
    );
}
