import { StyleSheet,Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function MapView() {
    return (
        <View style={styles.container}>
            <Text>Map</Text>
            <StatusBar style="auto" />
        </View>
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