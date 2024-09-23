import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import {store} from './store';
import HomeView from './views/home_view';

export default function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <HomeView />
        <StatusBar style="auto" />
      </Provider>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
