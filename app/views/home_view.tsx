import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

export default function HomeView() {
    const testState = useSelector((state: any) => state.testState);

    return (
        <div className="HomeView">
            <Text>{testState}</Text>
            <StatusBar style="auto" />
        </div>
    );
}