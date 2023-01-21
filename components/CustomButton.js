import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

const CustomButton = ({ text, onPress, containerStyle, buttonColor }) => {
    return (
        <View style={containerStyle}>
            <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: buttonColor }]}>
                <Text>{text}</Text>
            </TouchableOpacity>
        </View >
    );
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    }
});

export default CustomButton;
