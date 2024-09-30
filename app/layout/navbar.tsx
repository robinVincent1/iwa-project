import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeView from "../views/home_view";
import ProfileView from "../views/profil/profile_view";
import MapStackNavigator from "../navigation/stack_navigator";
import Login from "../views/login_register/login_view";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

// Actions de connexion et de déconnexion
export const login = () => {
  return {
    type: "LOGIN",
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export default function Navbar() {
  const profil_notifications = useSelector(
    (state: any) => state.profil_notifications
  );
  const isAuthenticated = useSelector((state: any) => state.isAuthenticated); // Accès à l'état d'authentification
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAuthButton = () => {
    if (isAuthenticated) {
      dispatch(logout()); // Déconnexion
    } else {
      navigation.navigate("Login" as never); // Rediriger vers la page de connexion
    }
  };

  const renderHeaderRight = () => (
    <View style={{ marginRight: 10 }}>
      <TouchableOpacity onPress={handleAuthButton}>
        <Text style={{ color: "#007bff", fontWeight: "bold" }}>
          <Ionicons name="log-in"  size={30} />
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: renderHeaderRight, // Bouton de connexion/déconnexion dans l'entête
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeView}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Carte"
        component={MapStackNavigator}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileView}
        options={{
          tabBarLabel: "",
          tabBarBadge: profil_notifications,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
