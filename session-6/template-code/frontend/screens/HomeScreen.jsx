import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Post from "../components/Post";
import NewPost from "../components/NewPost";
import { getUser, clearUser, URL } from "../utils";

export default function HomeScreen({ navigation }) {
  const [isNewPostModalVisible, setIsNewPostModalVisible] = useState(false);

  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // const userId = await getUser();
        // if (!userId) return;
        // setUser(Number(userId));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    }

    fetchData();
  }, []);

  // useEffect(() => {
  //   if (user !== null) {
  //     fetchSongs();
  //   }
  // }, [user]);

  async function fetchSongs() {
    // if (!user) return;
    try {
      // const response = await fetch(`${URL}/users/songs/${user}`);
      const response = await fetch(`${URL}/songs/all`);
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error("Error fetching songs:", error.message);
    }
  }

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
        {/* // ========================================START OF DEMO======================================== */}
        {/* <Ionicons
          name="ellipsis-horizontal"
          size={24}
          color="#fff"
          onPress={() => {
            // Log out of account and clear user from async storage
            clearUser();
            navigation.navigate("Login");
          }}
        /> */}
        {/* // ========================================END OF DEMO======================================== */}
      </View>

      {loading ? (
        <Text>Loading...</Text>
      ) : songs !== null && songs.length > 0 ? (
        songs
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((song) => <Post key={song.id} post={song} userId={userId} />)
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
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    height: "100%",
    paddingTop: 75,
  },
  topBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
    color: "#fff",
  },
  noSongs: {
    height: "80%",
    justifyContent: "center",
  },
  noSongsText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
});
