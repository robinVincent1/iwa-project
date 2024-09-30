import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import HomepageBanner from '../components/homepage/homepage_banner';
import HomepageFavorites from '../components/homepage/homepage_favorites';

export default function HomeView() {
    const testState = useSelector((state: any) => state.testState);

    return (
        <ScrollView style={styles.container}>
            <HomepageBanner />
            <HomepageFavorites />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
});