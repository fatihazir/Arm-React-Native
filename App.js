import { StyleSheet, SafeAreaView } from 'react-native';
import GlobalLoading from './components/GlobalLoading';
import Overlay from './components/Overlay';
import MainStackNavigator from './nav/MainStackNavigator';
import SharedContextProvider from './store/context/SharedContext';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <SharedContextProvider>
        <MainStackNavigator />
        <Overlay />
        <GlobalLoading />
      </SharedContextProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
