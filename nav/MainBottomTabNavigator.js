import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Foundation } from '@expo/vector-icons';
import { colors } from '../utils/lib/Colors';
import TransactionsStackNavigator from './TransactionsStackNavigator';

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Profile!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function MainBottomTabNavigator() {

    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Transaction Groups" component={TransactionsStackNavigator}
                    options={{
                        tabBarIcon: (({ focused }) =>
                            focused ?
                                <Foundation name="results" size={24} color={colors.primary} />
                                :
                                <Foundation name="results" size={24} color="black" />)
                    }} />
                <Tab.Screen name="Profile" component={SettingsScreen}
                    options={{
                        tabBarIcon: (({ focused }) =>
                            focused ?
                                <Ionicons name="person" size={24} color={colors.primary} />
                                :
                                <Ionicons name="person" size={24} color="black" />)
                    }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}