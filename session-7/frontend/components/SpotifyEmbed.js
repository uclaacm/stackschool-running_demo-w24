import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

// Run npx expo install react-native-webview
import { WebView } from 'react-native-webview';

/**
 * For opening links in system browser instead of inside the webview
 * Run npx expo install expo-linking
 */
import * as Linking from 'expo-linking';

/**
 * Reference for the HTML code:
 * https://developer.spotify.com/documentation/embeds/tutorials/using-the-iframe-api
 */

export default function SpotifyEmbed({ title, artist, accessToken, onResult }) {
  const [injectedJavaScript, setInjectedJavaScript] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {

// search for a song by title and artist, return the top result

    // const searchQuery = `https://api.spotify.com/v1/search?q=${encodeURIComponent(`${title} artist:${artist}`)}&type=track&limit=1`;
    // try {
    //   fetch(searchQuery, {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {

// the result is returned as a Spotify URI which we can pass into the embed to play the song

    //       const fetchedUri = data.tracks.items[0]?.uri;
    //       if (fetchedUri) {
    //         const newInjectedJavaScript = `
    //             document.getElementById('embed-iframe').innerHTML = '<iframe src="https://open.spotify.com/embed/track/${fetchedUri}?utm_source=generator"></iframe>';
    //             window.onSpotifyIframeApiReady = (IFrameAPI) => {
    //             const element = document.getElementById('embed-iframe');
    //             const options = {
    //                 width: '100%',
    //                 // This height changes the height of the embed
    //                 height: '100',
    //                 uri: '${fetchedUri}'
    //             };
    //             const callback = (EmbedController) => {};
    //             IFrameAPI.createController(element, options, callback);
    //             };
    //         `;
    //         setInjectedJavaScript(newInjectedJavaScript);
    //         onResult(true);
    //       } else {
    //         console.log(`No URI found in the fetched data for ${title} - ${artist}.`);
    //         onResult(false);
    //       }
    //     });
    // } catch (error) {
    //   console.error('Error fetching song from Spotify:', error.message);
    // }
  }, []);

  // Can replace <body> with <body style="background-color:black;"> to make webview background blend with app background
  const htmlContent = `
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1" />
      </head>
      <body style="margin: 0; background-color: black;">
        <div id="embed-iframe"></div>
        <script src="https://open.spotify.com/embed/iframe-api/v1" async></script>
        <script type="text/javascript">
          ${injectedJavaScript}
        </script>
      </body>
    </html>
  `;

  /**
   * Determines whether the WebView should start loading a request based on the URL.
   * If the URL includes "spotify.app.link", it opens the URL using Linking and returns false.
   * Otherwise, it returns true to allow the WebView to continue loading the request.
   */
  function shouldStartLoadWithRequest(event) {
    if (event.url.includes("spotify.app.link")) {
      Linking.openURL(event.url);
      return false;
    }
    return true;
  };

  return (
    // This height changes the height of the container
    <View style={{ height: 95 }}>
      <WebView
        originWhitelist={['*']}
        mixedContentMode="compatibility"
        injectedJavaScript={injectedJavaScript}
        source={{ html: htmlContent }}
        startInLoadingState={true}
        scalesPageToFit={true}
        style={{ width: `100%` }}
        onShouldStartLoadWithRequest={shouldStartLoadWithRequest}
        scrollEnabled='false'
        onLoadProgress={({nativeEvent}) => {
          if (nativeEvent.progress === 1) {
            setTimeout(() => {
              setLoading(false);
            }, 1500); 
          } 
        }}
      />
      {loading && (
        <View style={{ height: 95, backgroundColor: 'black'}}>
          <ActivityIndicator color="grey" style={{display: 'flex', alignItems: 'center', height: '100%'}} />
        </View>
      )}
    </View>
  );
};