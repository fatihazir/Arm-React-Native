import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { width_screen } from '../utils/Dimensions';

const BasicHeader = ({ title, activateGoBack }) => {
    const navigation = useNavigation()
    return (
        <View style={[styles.container, Platform.OS == 'android' && { marginTop: 20 }]}>
            <View style={styles.rowParent}>
                <>
                    {activateGoBack &&
                        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back-sharp" size={24} color="black" />
                        </TouchableOpacity>}
                    <Text numberOfLines={1} style={styles.headerText}>{title}</Text>
                </>
                <Image source={require('../assets/logo.png')} style={styles.image} resizeMode="contain" />
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
        justifyContent: 'space-between'
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
        maxWidth: width_screen * .7
    },
    image: {
        width: 40,
        height: 40,

    }
});

export default BasicHeader;
