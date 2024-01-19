import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Post from './components/Post';

const data = {
	title: 'My Tears Ricochet',
	artist: 'Taylor Swift'
};

export default function App() {
	return (
		<View style={styles.container}>
			<Post post={data} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
