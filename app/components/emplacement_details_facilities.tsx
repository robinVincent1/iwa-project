import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EmplacementDetailsFacilities() {
    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <View style={styles.item}>
                    <Ionicons name="flash" size={20} color="#FFD700" />
                    <Text>Électricité</Text>
                </View>
                <View style={styles.item}>
                    <Ionicons name="water" size={20} color="#FFD700" />
                    <Text>Eau potable</Text>
                </View>
                <View style={styles.item}>
                    <Ionicons name="wifi" size={20} color="#FFD700" />
                    <Text>Wi-Fi</Text>
                </View>
            </View>
            <View style={styles.column}>
                <View style={styles.item}>
                    <Ionicons name="trash" size={20} color="#FFD700" />
                    <Text>Poubelles</Text>
                </View>
                <View style={styles.item}>
                    <Ionicons name="home" size={20} color="#FFD700" />
                    <Text>Toit</Text>
                </View>
                <View style={styles.item}>
                    <Ionicons name="bonfire" size={20} color="#FFD700" />
                    <Text>Feu de camp</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    column: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
});