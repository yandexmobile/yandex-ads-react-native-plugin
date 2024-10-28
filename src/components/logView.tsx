import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import AdScreensStyle from '../screens/ads/styles/styles';

type LogViewProps = {
    logs: string[];
};

const LogView: React.FC<LogViewProps> = ({ logs }) => {
    const styles = AdScreensStyle;

    return (
        <View style={styles.logsContainer}>
            <ScrollView style={styles.scrollView}>
                {logs.map((log, index) => (
                    <Text key={index} style={styles.logLabel}>
                        {log}
                    </Text>
                ))}
            </ScrollView>
        </View>
    );
};

export default LogView;
