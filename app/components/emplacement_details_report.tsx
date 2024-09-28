import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EmplacementDetailsReport() {
    return (
        <TouchableOpacity style={styles.container} onPress={() => alert('Annonce signalée')}>
            <Ionicons name="flag" size={24} color="#FF0000" />
            <Text style={styles.text}>Signaler cette annonce</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Aligner l'icône et le texte horizontalement
        alignItems: 'center', // Centrer verticalement
        marginHorizontal: 10, // Ajouter une marge horizontale de 10
    },
    text: {
        marginLeft: 10, // Ajouter une marge à gauche de l'icône
    },
});