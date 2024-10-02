import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import LocationMapView from '../views/map_view';
import EmplacementDetails from '../views/emplacement_details/emplacement_details_view'; 
import Login from '../views/login_register/login_view';
import Register from '../views/login_register/register_view';
import Reservation_details from '../views/profil/Reservation_details';
import Emplacement_details from '../views/profil/Emplacement_details';
import SettingsView from '../views/profil/settings_view';
import ProfileView from '../views/profil/profile_view';
import EmplacementDetailsAllRatings from '../views/emplacement_details/emplacement_details_all_ratings';
import ArticleDetails from '../views/article_details_view';
import HomeView from '../views/home_view';
import FavoritesPage from '../views/all_favorite_view';
import ArticlesPage from '../views/all_article_view';
import { useSelector } from 'react-redux';
import AddEmplacement from '../views/profil/add_emplacement_view';


const Stack = createStackNavigator();
const EmplacementDetailsStack = createStackNavigator();

function EmplacementDetailsStackNavigator({ route }) {
    const { emplacement } = route.params;
    return (
        <EmplacementDetailsStack.Navigator initialRouteName="EmplacementDetailsMain">
            <EmplacementDetailsStack.Screen name="EmplacementDetailsMain" component={EmplacementDetails} initialParams={{ emplacement }} options={{ headerShown: false }} />
            <EmplacementDetailsStack.Screen name="EmplacementDetailsAllRatings" component={EmplacementDetailsAllRatings} options={{ headerShown: false }} />
        </EmplacementDetailsStack.Navigator>
    );
}


export function MapStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Map">
            <Stack.Screen name="Map" component={LocationMapView} options={{ headerShown: false }} />
            <Stack.Screen name="EmplacementDetails" component={EmplacementDetailsStackNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export function ProfileStackNavigator() {
    const isLoggedIn = useSelector((state: any) => state.profil.isLoggedIn); 
    return (
        <Stack.Navigator initialRouteName={isLoggedIn ? "Profile" : "Login"}>
            <Stack.Screen name="Profile" component={ProfileView} options={{ headerShown: false }} />
            <Stack.Screen name="Reservation_detail" component={Reservation_details} options={{ headerShown: false }} />
            <Stack.Screen name="Emplacement_detail" component={Emplacement_details} options={{ headerShown: false }} />
            <Stack.Screen name="Add_emplacement" component={AddEmplacement} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={SettingsView} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export function HomeStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeView}  options={{ headerShown: false }} />
            <Stack.Screen name="ArticleDetails" component={ArticleDetails} options={{ headerShown: false }}/>
            <Stack.Screen name="FavoritesPage" component={FavoritesPage} options={{ headerShown: false }} />
            <Stack.Screen name="ArticlesPage" component={ArticlesPage} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}