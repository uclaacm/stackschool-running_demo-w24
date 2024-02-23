import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";
import { getUser, URL } from "../utils";

export default function NewPost({ visible, onClose, onPost }) {
  const [userId, setUserId] = useState();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUser();

      if (user) {
        setUserId(user);
      } else {
        console.error("Error fetching user data");
      }
    };
    fetchUserData();
  }, []);

  async function handlePost() {
    if (!title || !artist) {
      alert("Please fill in all fields");
      return;
    }

    const newSong = {
      artist,
      title,
      user_id: userId,
    };

    try {
      const response = await fetch(`${URL}/songs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSong),
      });

      if (!response.ok) {
        console.error("Error creating new post:", response.statusText);
        alert("Failed to create a new post. Please try again.");
        return;
      }

      const createdSong = await response.json();
      console.log("New Post:", createdSong);
      onPost();
    } catch (error) {
      console.error("Error creating new post:", error.message);
      alert("Failed to create a new post. Please try again.");
    } finally {
      handleClose();
    }
  }

  function handleClose() {
    setTitle("");
    setArtist("");
    onClose();
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Post Song</Text>

          <TextInput
            placeholder="Title"
            placeholderTextColor="grey"
            autoCapitalize="none"
            value={title}
            onChangeText={(text) => setTitle(text)}
            style={styles.input}
          />

          <TextInput
            placeholder="Artist"
            placeholderTextColor="grey"
            autoCapitalize="none"
            value={artist}
            onChangeText={(text) => setArtist(text)}
            style={styles.input}
          />

          <TouchableOpacity onPress={handlePost} style={styles.postButton}>
            <Text style={styles.postText}>Post</Text>
          </TouchableOpacity>

          <Pressable onPress={handleClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    width: "85%",
  },
  modalTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
    marginBottom: 25,
  },
  input: {
    fontFamily: "Inter-SemiBold",
    paddingBottom: 3,
    borderBottomWidth: 2,
    borderBottomColor: "grey",
    marginBottom: 25,
  },
  postButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  postText: {
    fontFamily: "Inter-SemiBold",
    color: "white",
  },
  cancelText: {
    fontFamily: "Inter-SemiBold",
    color: "black",
  },
});
