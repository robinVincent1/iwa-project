import React from 'react';
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
import LocationMapView from '../views/map_view';
import EmplacementDetails from '../views/emplacement_details_view'; 
import Login from '../views/login_register/login_view';
import Register from '../views/login_register/register_view';
import Reservation_details from '../views/profil/Reservation_details';
import Emplacement_details from '../views/profil/Emplacement_details';
import SettingsView from '../views/profil/settings_view';
import ProfileView from '../views/profil/profile_view';


const Stack = createStackNavigator();

export function MapStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Map" >
            <Stack.Screen name="Map" component={LocationMapView} options={{ headerShown: false , animationEnabled:true}}/>
            <Stack.Screen name="EmplacementDetails" component={EmplacementDetails} options={{ headerShown: false }}/>
            <Stack.Screen name="Login"  component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}

export function ProfileStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen name="Profile" component={ProfileView} options={{ headerShown: false }} />
            <Stack.Screen name="Reservation_detail" component={Reservation_details} options={{ headerShown: false }} />
            <Stack.Screen name="Emplacement_detail" component={Emplacement_details} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={SettingsView} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}