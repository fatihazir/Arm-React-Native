import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from '../utils/Routes';
import BasicHeader from '../components/BasicHeader';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen name={Routes.ProfileScreen} component={ProfileScreen}
                    options={{ header: (() => <BasicHeader title="Transaction Groups" />) }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};


export default ProfileStackNavigator;