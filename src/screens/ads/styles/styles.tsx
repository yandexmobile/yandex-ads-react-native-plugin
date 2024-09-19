import { StyleSheet } from 'react-native';
const AdScreensStyle = StyleSheet.create({
    backgroundColor: {
        backgroundColor: '#f2f2f2',
    },
    commonView: {
        margin: 10,
    },
    verticalContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    horizontalContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    scrollView: {
        flex: 1,
    },
    inputLabel: {
        fontSize: 14,
    },
    labelView: {
        alignItems: 'center',
        paddingBottom: 10,
    },
    logsContainer: {
        height: 125,
        borderRadius: 10,
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: 1,
    },
    logLabel: {
        fontSize: 14,
    },
    buttonViewEnabled: {
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderColor: '#5f9149',
        width: '20%',
    },
    buttonViewDisabled: {
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderColor: '#919191',
        width: '20%',
    },
    buttonLabelEnabled: {
        fontSize: 14,
        color: '#5f9149',
    },
    buttonLabelDisabled: {
        fontSize: 14,
        color: '#919191',
    },
    bannerSizeInput: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        width: '15%',
    },
    bannerView: {
        alignItems: 'center',
        paddingBottom: 10,
    },
    settingsList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
    },
    settingLabel: {
        fontSize: 14,
    },
    labelWhenReady: {
        fontSize: 16,
        fontWeight: '700',
        color: '#00BA91',
    },
    labelWhenlNotReady: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FF004E',
    },
    fullscreenAdDropdownList: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        width: '75%',
    },
    bannerInlineDropdownList: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        width: '45%',
    },
    bannerStickyDropdownList: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        width: '55%',
    },
    placeholderStyle: {
        color: '#aaa',
        fontSize: 16,
    },
    selectedTextStyle: {
        color: '#000',
        fontSize: 16,
    },
});

export default AdScreensStyle;
