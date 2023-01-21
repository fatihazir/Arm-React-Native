import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

const BasicHeader = ({ title }) => {
    return (
        <View style={styles.container}>
            <View style={styles.rowParent}>
                <Text style={styles.headerText}>{title}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: 'white',
    },
    rowParent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 22,
        alignItems: 'center'
    },
    headerText: {
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: 2,
        color: 'black',
    }
});

export default BasicHeader;
