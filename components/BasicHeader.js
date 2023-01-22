import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BasicHeader = ({ title, activateGoBack }) => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={styles.rowParent}>
                {activateGoBack &&
                    <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back-sharp" size={24} color="black" />
                    </TouchableOpacity>}
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
        paddingHorizontal: 22,
        alignItems: 'center',
    },
    iconContainer: {
        padding: 12,
        paddingRight: 24
    },
    headerText: {
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: 2,
        color: 'black',
    }
});

export default BasicHeader;
