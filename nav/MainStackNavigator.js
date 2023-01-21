import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from '../utils/Routes';
import RegisterScreen from '../screens/RegisterScreen';
import AuthHeader from '../components/AuthHeader';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Routes.RegisterScreen}>
                <Stack.Screen name={Routes.RegisterScreen} component={RegisterScreen}
                    options={{ header: (() => <AuthHeader title="Register" />) }} />
                <Stack.Screen name={Routes.LoginScreen} component={LoginScreen}
                    options={{ header: (() => <AuthHeader title="Login" />) }} />
            </Stack.Navigator>
        </NavigationContainer>
    )

};


export default MainStackNavigator;