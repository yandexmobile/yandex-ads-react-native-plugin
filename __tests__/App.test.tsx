/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
jest.mock('yandex-mobile-ads', () => {
    const actual = jest.requireActual('yandex-mobile-ads');
    return {
        ...actual,
        MobileAds: {...actual.MobileAds, initialize: jest.fn().mockResolvedValue(undefined)},
    };
});

it('renders correctly', async () => {
    let tree: ReturnType<typeof renderer.create>;
    await renderer.act(async () => {
        tree = renderer.create(<App />);
    });
    expect(tree!.toJSON()).not.toBeNull();
    await renderer.act(async () => tree!.unmount());
});
