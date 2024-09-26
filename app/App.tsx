import { StyleSheet, Text, View } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';
import { NavigationContainer } from '@react-navigation/native';
import Navbar from './layout/navbar';
import { createStackNavigator } from '@react-navigation/stack';
import LocationMapView from './views/map_view';
import EmplacementDetails from './views/emplacement_details_view'; 
import Header from './layout/header';

const Stack = createStackNavigator();



export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Header/>
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