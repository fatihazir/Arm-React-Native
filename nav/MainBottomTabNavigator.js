import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Foundation } from '@expo/vector-icons';
import { colors } from '../utils/lib/Colors';
import TransactionsStackNavigator from './TransactionsStackNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import BasicHeader from '../components/BasicHeader';

const Tab = createBottomTabNavigator();

export default function MainBottomTabNavigator() {

    return (

        <Tab.Navigator >
            <Tab.Screen name="Transaction Groups" component={TransactionsStackNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: (({ focused }) =>
                        focused ?
                            <Foundation name="results" size={24} color={colors.primary} />
                            :
                            <Foundation name="results" size={24} color="black" />)
                }} />
            <Tab.Screen name="Profile" component={ProfileScreen}
                options={{
                    header: (() => <BasicHeader title="Profile" />),
                    tabBarIcon: (({ focused }) =>
                        focused ?
                            <Ionicons name="person" size={24} color={colors.primary} />
                            :
                            <Ionicons name="person" size={24} color="black" />)
                }} />
        </Tab.Navigator>

    );
}