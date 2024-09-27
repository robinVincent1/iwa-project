// src/components/Navbar.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import HomeView from '../views/home_view';
import ProfileView from '../views/profile_view';
import MapView from '../views/map_view';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MapStackNavigator from '../navigation/stack_navigator'; 
import { RootState } from '../store';

const Tab = createBottomTabNavigator();

export default function Navbar() {
  const profil_notifications = useSelector((state: RootState) => state.profil.profil_notifications);

  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeView}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Carte"
        component={MapStackNavigator}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" color={color} size={size} />
          ),
        }}
        />
      <Tab.Screen 
        name="Profile"
        component={ProfileView}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarBadge: profil_notifications,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}