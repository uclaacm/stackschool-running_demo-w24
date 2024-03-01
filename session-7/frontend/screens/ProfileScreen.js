import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActionSheetIOS } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Post from '../components/Post';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getUser, clearUser, getAccessToken } from '../utils';
// import * as ImagePicker from "expo-image-picker";
import NewImage from '../components/NewImage';

const URL = 'http://localhost:8000';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [updateUser, setUpdateUser] = useState(false);
  const [image, setImage] = useState();
  const [currentImage, setCurrentImage] = useState();
  const [userId, setUserId] = useState();
  const [userSongs, setUserSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [accessToken, setAccessToken] = useState();
  const [isNewImageModalVisible, setIsNewImageModalVisible] = useState(false);

  // const showMenu = () => {
  //   ActionSheetIOS.showActionSheetWithOptions(
  //     {
  //       options:["Cancel", "Photo Library", "Camera"],
  //       cancelButtonIndex: 0,
  //       userInterfaceStyle: 'dark'
  //     },
  //     buttonIndex => {
  //       if(buttonIndex === 1) {
  //         libraryUpload();
  //       } else if(buttonIndex === 2) {
  //         cameraUpload();
  //       }
  //     }
  //   )
  // }

  // const libraryUpload = async () => {
  //   try {
  //     await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [1, 1],
  //       quality: 1,
  //     });

  //     if(!result.canceled) {
  //       // UPLOAD TO BACKEND
  //       uploadImage()
  //       setImage(result.assets[0].uri);
  //     }
  //   } catch (error) {
  //     alert("Error uploading image: ", error.message);
  //   }
  // }

  // // DOESN'T WORK FOR SOME REASON LOL
  // const cameraUpload = async () => {
  //   try {
  //     await ImagePicker.requestCameraPermissionsAsync();
  //     result = await ImagePicker.launchCameraAsync({
  //       cameraType: ImagePicker.CameraType.front,
  //       allowsEditing: true,
  //       aspect: [1, 1],
  //       quality: 1,
  //     });

  //     if(!result.canceled) {
  //       uploadImage(result.assets[0].uri);
  //     }
  //   } catch (error) {
  //     alert("Error uploading image: ", error.message);
  //   }
  // };
  
  // useEffect(() => {
  //   fetchUserData();
  //   fetchAccessToken();
  // }, []);

  useEffect(() => {
    fetchUserData();
  }, [updateUser])

  useEffect(() => {
    fetchUserSongs();
  }, [userId]);

  async function fetchUserData() {
    const userId = await getUser();
    setUserId(userId);

    try {
      const response = await fetch(`${URL}/users/${userId}`);
      const user = await response.json();
      if(user) {
        setUser(user);
        if (user.image === 'mofu1.jpeg') {
          setImage(require('../assets/mofu1.jpeg'));
          setCurrentImage(1);
        } else if (user.image === 'mofu2.jpeg') {
          setImage(require('../assets/mofu2.jpeg'));
          setCurrentImage(2);
        } else if (user.image === 'mofu3.jpeg') {
          setImage(require('../assets/mofu3.jpeg'));
          setCurrentImage(3);
        } else {
          setImage(require('../assets/mofu4.jpeg'));
          setCurrentImage(4);
        }
      } else {
        console.error('Error fetching user data');
      }
    } catch (error) {
      console.error('Error getting user by ID:', error.message);
      return null;
    }
  }

  async function fetchUserSongs() {
    try {
      if (!userId) {
        return;
      }

      const response = await fetch(`${URL}/users/songs/${userId}`);
      const data = await response.json();
      setUserSongs(data);
    } catch (error) {
      console.error('Error fetching user songs:', error.message);
    } finally {
      setLoading(false);
    }
  }
  

  // async function fetchAccessToken() {
  //   try {
  //     const token = await getAccessToken();
  //     setAccessToken(token);
  //   } catch (error) {
  //     console.error('Error fetching access token:', error.message);
  //   }
  // }

  function closeModal() {
    setIsNewImageModalVisible(false);
    setUpdateUser(!updateUser);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
        <Text style={styles.sectionHeader}>Profile</Text>
        <Ionicons
          name="ellipsis-horizontal"
          size={24}
          color="#fff"
          onPress={() => {
            // TODO: Open menu to either edit profile, logout, or delete account
            // Currently just logouts of account
            clearUser();
            navigation.navigate('Login');
          }}
        />
      </View>
      {user && (
        <View style={styles.centered}>
          <View>
            <Image style={styles.image} source={image} />
            <Ionicons
              name="camera"
              size={24}
              color="#000"
              style={styles.camera}
              onPress={() => setIsNewImageModalVisible(true)}
            />
          </View>
          <Text style={styles.name}>{user.first} {user.last}</Text>
          <Text style={styles.username}>@{user.username}</Text>
        </View>
      )}

      <Text style={styles.songHeader}>Songs</Text>
      {loading ? (
        <Text style={styles.noSongs}>Loading...</Text>
      ) : userSongs.length > 0 ? (
        <FlatList
          data={userSongs.sort((a, b) => new Date(b.date) - new Date(a.date))}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Post post={item} user={user} accessToken={accessToken}/>
          )}
          style={{ marginTop: 15, marginBottom: 50}}
        />
      ) : (
        <Text style={styles.noSongs}>No songs available.</Text>
      )}
      <NewImage
        visible={isNewImageModalVisible}
        onClose={() => closeModal()}
        userId={userId}
        currentImage={currentImage}
      /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 75,
    paddingBottom: 50,
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  image: {
    width: 175,
    height: 175,
    borderRadius: 100,
    marginBottom: 20,
  },
  centered: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
  },
  username: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    textAlign: 'center',
    color: 'grey',
  },
  sectionHeader: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: 'white',
  },
  songHeader: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: 'white',
    paddingLeft: 20,
  },
  noSongs: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    marginTop: 150,
  },
  camera: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 22,
    padding: 8,
    position: 'absolute',
    right: 0,
    bottom: 20,
    overflow: 'hidden'
  }
});
