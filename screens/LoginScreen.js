import { StyleSheet, View, Text } from 'react-native';

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <Text>Login</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
