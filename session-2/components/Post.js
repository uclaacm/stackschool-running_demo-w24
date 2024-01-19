import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Post({ post }) {
	let liked = true;
	let likes = 1;

	const handleLike = () => {
		console.log('liked');
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image style={styles.image} source={require('../assets/icon.png')} />
				<View>
					<View style={styles.row}>
						<Text style={styles.whiteText}>Shiyu Ye</Text>
						<Text style={styles.greyText}>@therealmonica</Text>
						<Text style={styles.greyText}>boilerplate_time</Text>
					</View>
					<View style={styles.songRow}>
						<Ionicons
							name='musical-note'
							size={12}
							color='white'
							style={styles.musicIcon}
						/>
						<Text style={styles.whiteText}>
							{post.title} - {post.artist}
						</Text>
					</View>
				</View>
			</View>
			<View style={styles.likes}>
				<TouchableOpacity onPress={handleLike}>
					<Ionicons
						name={liked ? 'heart' : 'heart-outline'}
						size={16}
						color={liked ? 'red' : 'grey'}
					/>
				</TouchableOpacity>
				<Text style={styles.likesText}>{likes} likes</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'black',
		paddingLeft: 20,
		paddingRight: 20
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		gap: 5,
		alignItems: 'center',
		marginBottom: 2
	},
	songRow: {
		display: 'flex',
		flexDirection: 'row',
		gap: 3,
		alignItems: 'center'
	},
	header: {
		flexDirection: 'row',
		gap: 15,
		alignItems: 'center',
		paddingBottom: 15
	},
	whiteText: {
		fontSize: 14,
		fontWeight: 'bold',
		color: 'white'
	},
	greyText: {
		fontSize: 12,
		fontWeight: 'bold',
		color: 'grey'
	},
	image: {
		width: 35,
		height: 35,
		borderRadius: 100
	},
	likes: {
		display: 'flex',
		flexDirection: 'row',
		gap: 5,
		alignItems: 'center',
		marginBottom: 30
	},
	likesText: {
		fontSize: 12,
		fontWeight: 'bold',
		color: 'white'
	},
	noSongs: {
		fontSize: 16,
		textAlign: 'center',
		color: 'white',
		marginTop: 150
	}
});
