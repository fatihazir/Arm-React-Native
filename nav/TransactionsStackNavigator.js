import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from '../utils/Routes';
import BasicHeader from '../components/BasicHeader';
import HomeScreen from '../screens/HomeScreen';
import TransactionGroupDetailScreen from '../screens/TransactionGroupDetailScreen';
import { SharedContext } from '../store/context/SharedContext';

const Stack = createNativeStackNavigator();

const TransactionsStackNavigator = () => {
    const currentContext = useContext(SharedContext)

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen name={Routes.HomeScreen} component={HomeScreen}
                    options={{ header: (() => <BasicHeader title="Home" />) }} />
                <Stack.Screen name={Routes.TransactionGroupDetailScreen} component={TransactionGroupDetailScreen}
                    options={{ header: (() => <BasicHeader title={currentContext.detailScreenTitle} activateGoBack={true} />) }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};


export default TransactionsStackNavigator;