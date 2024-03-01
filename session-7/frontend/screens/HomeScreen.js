import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Post from '../components/Post';
import NewPost from '../components/NewPost';
import { getUser, getAccessToken } from '../utils';

const URL = 'http://localhost:8000';

export default function HomeScreen({ navigation }) {
  const [isNewPostModalVisible, setIsNewPostModalVisible] = useState(false);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    Promise.all([fetchSongs(), fetchAccessToken()])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error in promise:', error.message);
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        const userId = await getUser();

        try {
          const response = await fetch(`${URL}/users/${userId}`);
          const data = await response.json();
          if(data) {
            setUser(data);
          } else {
            console.error('Error fetching user data');
          }
        } catch (error) {
          console.error('Error getting user by ID:', error.message);
          return null;
        }
      };

      fetchUserData();
    }, [])
  );

  async function fetchSongs() {
    try {
      const response = await fetch(`${URL}/songs/all`);
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error('Error fetching songs:', error.message);
    }
  };

  async function fetchAccessToken() {
    try {
      const token = await getAccessToken();
      setAccessToken(token);
    } catch (error) {
      console.error('Error fetching access token:', error.message);
    }
  }

  async function handlePost(newSong) {
    setSongs((prevSongs) => [newSong, ...prevSongs]);
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
        <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile');
        }}
        >
          <Ionicons
            name="md-person-circle-outline"
            size={30}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Text>Loading...</Text>
      ) : songs !== null && songs.length > 0 ? (
        <FlatList
          data={songs.sort((a, b) => new Date(b.date) - new Date(a.date))}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Post post={item} user={user} accessToken={accessToken}/>}
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
        onPost={handlePost}
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
    fontFamily: 'Inter-SemiBold',
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
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  }
});
