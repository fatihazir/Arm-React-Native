import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from '../utils/Routes';
import RegisterScreen from '../screens/RegisterScreen';
import BasicHeader from '../components/BasicHeader';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Routes.LoginScreen}>
                <Stack.Screen name={Routes.RegisterScreen} component={RegisterScreen}
                    options={{ header: (() => <BasicHeader title="Register" />) }} />
                <Stack.Screen name={Routes.LoginScreen} component={LoginScreen}
                    options={{ header: (() => <BasicHeader title="Login" />) }} />
                <Stack.Screen name={Routes.HomeScreen} component={HomeScreen}
                    options={{ header: (() => <BasicHeader title="HomePage" />) }} />
            </Stack.Navigator>
        </NavigationContainer>
    )

};


export default MainStackNavigator;