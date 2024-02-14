import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Post from '../components/Post';
import NewPost from '../components/NewPost';
import { getUser, URL } from '../utils';

export default function HomeScreen({ navigation }) {
  const [isNewPostModalVisible, setIsNewPostModalVisible] = useState(false);
  // START: ADDED DURING DEMO
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  // END: ADDED DURING DEMO
  const userId = getUser();

  // START: ADDED DURING DEMO
  useEffect(() => {
    fetchSongs()
    .then(() => {
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error in promise:', error.message);
    });
  }, []);

  async function fetchSongs() {
    try {
      const response = await fetch(`${URL}/songs/all`);
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error('Error fetching songs:', error.message);
    }
  };
  // END: ADDED DURING DEMO

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Ionicons
          name="add"
          size={30}
          color="#fff"
          onPress={() => {
            setIsNewPostModalVisible(true);
          }}
        />
        <Text style={styles.headerText}>SoundsRight.</Text>
      </View>
      {loading ? (
        <Text>Loading...</Text>
      ) : songs !== null && songs.length > 0 ? (
        // START: ADDED DURING DEMO
        songs.sort((a, b) => new Date(b.date) - new Date(a.date))
             .map((song) => <Post key={song.id} post={song} userId={userId}/>)
        // END: ADDED DURING DEMO
      ) : (
        <View style={styles.noSongs}>
          <Text style={styles.noSongsText}>No songs available.</Text>
        </View>
      )}
      <NewPost
        visible={isNewPostModalVisible}
        onClose={() => setIsNewPostModalVisible(false)}
        onPost={fetchSongs}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    height: '100%',
    paddingTop: 75,
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
  },
  noSongs: {
    height: '80%',
    justifyContent: 'center',
  },
  noSongsText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  }
});
