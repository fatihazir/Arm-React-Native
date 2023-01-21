import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';

const Input = ({ value, onChangeText, placeholder, keyboardType, style, secureTextEntry }) => {
    return (
        <TextInput
            style={[styles.input, style]}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            keyboardType={keyboardType ? keyboardType : "default"}
            secureTextEntry={secureTextEntry}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 10,
    }
});

export default Input;
