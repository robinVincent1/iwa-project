import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

export default function HomeView() {
    const testState = useSelector((state: any) => state.testState);

    return (
        <View style={styles.container}>
            <Text>{testState}</Text>
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