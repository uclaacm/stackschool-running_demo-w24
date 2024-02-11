import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Post from '../components/Post';
import NewPost from '../components/NewPost';
import { getUser, URL } from '../utils';

export default function HomeScreen({ navigation }) {
  const [isNewPostModalVisible, setIsNewPostModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const userId = getUser();

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
        <FlatList
          data={songs.sort((a, b) => new Date(b.date) - new Date(a.date))}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Post post={item} userId={userId}/>}
          style={{ marginTop: 15, marginBottom: 50}}
        />      
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
