import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from '../utils/Routes';
import RegisterScreen from '../screens/RegisterScreen';
import BasicHeader from '../components/BasicHeader';
import LoginScreen from '../screens/LoginScreen';
import MainBottomTabNavigator from './MainBottomTabNavigator';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Routes.LoginScreen}>
                <Stack.Screen name={Routes.RegisterScreen} component={RegisterScreen}
                    options={{ header: (() => <BasicHeader title="Register" />) }} />
                <Stack.Screen name={Routes.LoginScreen} component={LoginScreen}
                    options={{ header: (() => <BasicHeader title="Login" />) }} />
                <Stack.Screen name={Routes.MainBottomTabNavigator} component={MainBottomTabNavigator}
                    options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )

};


export default MainStackNavigator;