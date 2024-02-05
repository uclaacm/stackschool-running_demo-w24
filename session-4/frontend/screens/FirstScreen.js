import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Post from '../components/Post';

const data = {
	title: 'My Tears Ricochet',
	artist: 'Taylor Swift',
};

export default function FirstScreen({navigation}) {
	return (
		<View style={styles.container}>
			<Post post={data} />  
            <View style={styles.whiteText}>
				<Button 
                    title="to 2nd Screen"
					onPress={
						() => navigation.navigate("Second Screen")
						}
                        >
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
		alignItems: 'center',
		justifyContent: 'center'
	},
    whiteText: {
		fontSize: 14,
		fontWeight: 'bold',
		color: 'white'
	},
});
