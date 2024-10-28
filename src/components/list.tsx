import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type ItemData = {
    id: string;
    title: String;
};

const styles = StyleSheet.create({
    item: {
        paddingVertical: 10,
        paddingHorizontal: 6,
        marginBottom: 20,
    },
    text: {
        marginTop: 3,
        fontSize: 16,
        fontWeight: '500',
    },
    list: {
        paddingVertical: 15,
    },
});

const Screens: ItemData[] = [
    {
        id: '1',
        title: 'Settings',
    },
    {
        id: '2',
        title: 'Sticky Banner',
    },
    {
        id: '3',
        title: 'Inline Banner',
    },
    {
        id: '4',
        title: 'Interstitial',
    },
    {
        id: '5',
        title: 'Rewarded',
    },
    {
        id: '6',
        title: 'AppOpen',
    },
];

const List = () => {
    const textColor = '#212121';
    const marginHorizontal = 16;
    const navigation = useNavigation<any>();
    const renderItem = ({ item }: { item: ItemData }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate(item.title)} style={[styles.item]}>
                <Text style={[styles.text, { color: textColor }]}>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ marginHorizontal: marginHorizontal }}>
            <FlatList data={Screens} renderItem={renderItem} keyExtractor={(item) => item.id} />
        </SafeAreaView>
    );
};

export default List;
