import { StyleSheet, Text, View } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';
import { NavigationContainer } from '@react-navigation/native';
import Navbar from './navigation/navbar';



export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navbar />
      </NavigationContainer>
    </Provider>
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