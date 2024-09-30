import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LocationMapView from '../views/map_view';
import EmplacementDetails from '../views/emplacement_details_view'; 
import Login from '../views/login_register/login_view';
import Register from '../views/login_register/register_view';

const Stack = createStackNavigator();

export default function MapStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Map">
            <Stack.Screen name="Map" component={LocationMapView} />
            <Stack.Screen name="EmplacementDetails" component={EmplacementDetails} />
            <Stack.Screen name="Login"  component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    );
}