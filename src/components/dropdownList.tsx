import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AdNetwork from '../common/adNetworkUtils/adNetwork';
import AdScreensStyle from '../screens/ads/styles/styles';

interface DropdownListProps {
    adNetworks: AdNetwork[];
    setAdNetwork: (value: AdNetwork | undefined) => void;
    style?: StyleProp<ViewStyle>;
}

const DropdownList: React.FC<DropdownListProps> = ({ adNetworks, setAdNetwork, style }) => {
    const styles = AdScreensStyle;

    return (
        <Dropdown
            style={style}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={adNetworks}
            maxHeight={300}
            labelField="title"
            valueField="title"
            value={adNetworks[0]}
            placeholder="Select item"
            onChange={item => {
                setAdNetwork(item);
            }}
        />
    );
};

export default DropdownList;
