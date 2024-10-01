import { View, TextInput } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function HomepageSearch() {
    const [query, setQuery] = useState('');
    const navigation = useNavigation();

    const handleFocus = () => {
        navigation.navigate('Map_Stack', { screen: 'Map', params: { fromHomepageSearch: true } }); 
    }

    return (
        <View style={styles.autocompleteWrapper}>
            <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
            <TextInput
                style={styles.textInput}
                value={query}
                placeholder="Commencez vos recherches !"
                onFocus={() => {handleFocus()}}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    searchIcon: {
        marginRight: 10,
    },
    textInput: {
        flex: 1,
        height: '100%',
        borderWidth: 0,
    },
    autocompleteWrapper: {
        zIndex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        margin: 10,
        padding: 10,
        backgroundColor: 'white', // Ajout d'un fond blanc pour le conteneur
        height: 50, // Fixe la hauteur de la vue de l'autocomplete
    },
});