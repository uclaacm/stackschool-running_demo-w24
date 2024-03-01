import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SpotifyEmbed from './SpotifyEmbed';

const URL = 'http://localhost:8000';

export default function Post ({ user, post, accessToken }) {
  const [loading, setLoading] = useState(true);
  const [songUser, setSongUser] = useState();
  const [image, setImage] = useState();
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState();

  // state for whether or not to show embed (default to true)
  // make sure to add the embed into the Post!
  // const [showEmbed, setShowEmbed] = useState(true);

  const timestamp = post.date;
  const formattedTimestamp = new Date(timestamp).toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric', 
    year: '2-digit', 
    hour: 'numeric',
    minute: 'numeric', 
    hour12: true, 
  }).replace(/\//g, '.').replace(',', '');

  const handleEmbed = (works) => {
    if (!works) {
      setShowEmbed(false);
    }
  };

  async function setLike() {
    try {
      const response = await fetch(`${URL}/liked/song?songId=${post.id}&userId=${user.id}`);
      const data = await response.json();
      setLiked(data.has_liked);
    } catch (error) {
      console.error('Error setting like:', error.message);
    } 
  }

  async function handleLike() {
    try {
      const response = await fetch(`${URL}/songs/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ songId: post.id, userId: user.id }),
      });

        const updatedPost = await response.json();
        setLikes(updatedPost.likes);
        setLiked(!liked);
    } catch (error) {
      console.error('Error updating like:', error.message);
    }    
  }

  useEffect(() => {
    fetchSongUser();
  }, []);

  useEffect(() => {
    if(user)
    {
      setLike();
    }
  }, [user])

  useEffect(() => {
    setLikes(post.likes);
  }, [post.likes]);

  async function fetchSongUser() {
    try {
      const response = await fetch(`${URL}/songs/user/${post.id}`);
      const user = await response.json();
      setSongUser(user);
      if (user.image === 'mofu1.jpeg') {
        setImage(require('../assets/mofu1.jpeg'));
      } else if (user.image === 'mofu2.jpeg') {
        setImage(require('../assets/mofu2.jpeg'));
      } else if (user.image === 'mofu3.jpeg') {
        setImage(require('../assets/mofu3.jpeg'));
      } else {
        setImage(require('../assets/mofu4.jpeg'));
      }
      setLoading(false);
    } catch (error) {
      console.error(`Error fetching song's user data:`, error.message);
    }    
  }

  if(loading)
  {
    return <Text> Loading </Text>;
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.image} source={image} />   
          <View>
            <View style={styles.row}>
              <Text style={styles.whiteText}>{songUser.first} {songUser.last}</Text>
              <Text style={styles.greyText}>@{songUser.username}</Text>
              <Text style={styles.greyText}>{formattedTimestamp}</Text>
            </View>
            <View style={styles.songRow}>
              <Ionicons name="musical-note" size={12} color="white" style={styles.musicIcon} />
              <Text style={styles.whiteText}>{post.title} - {post.artist}</Text>
            </View>
          </View>
        </View>
        {/* {!loading && showEmbed && (
          <SpotifyEmbed
            title={post.title}
            artist={post.artist}
            accessToken={accessToken}
            onResult={handleEmbed}
          />
        )} */}
        <View style={styles.likes}>
          <TouchableOpacity onPress={handleLike}>
            <Ionicons name={liked ? 'heart' : 'heart-outline'} size={16} color={liked ? 'red' : 'grey'} />
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
    paddingRight: 20,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginBottom: 2,
  },
  songRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    paddingBottom: 15,
  },
  whiteText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white'
  },
  greyText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    fontWeight: 'bold',
    color: 'grey',
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 100,
  },
  likes: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginBottom: 30
  },
  likesText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white'
  },
  noSongs: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    marginTop: 150,
  }
});
