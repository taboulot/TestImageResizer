/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {Button, Image, SafeAreaView, StyleSheet, Text} from 'react-native';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import {launchImageLibrary} from 'react-native-image-picker';

const App = () => {
  const [sourceUri, setSourceUri] = useState('');
  const [resizedUri, setResizedUri] = useState('');

  const selectImageFromPicker = async () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (!response || !response.assets) return;
      const asset = response.assets[0];
      if (asset) {
        setSourceUri(asset.uri ?? '');
      }
    });
  };

  const resizeImage = async () => {
    if (!sourceUri) {
      return;
    }

    const result = await ImageResizer.createResizedImage(
      sourceUri,
      960,
      1280,
      'JPEG',
      80,
    );

    setResizedUri(result.uri);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Select Image" onPress={selectImageFromPicker} />
      <Button title="Resize" onPress={resizeImage} />
      <Text>Original image: </Text>
      {sourceUri ? (
        <Image
          style={styles.image}
          source={{uri: sourceUri}}
          resizeMode="contain"
        />
      ) : null}
      <Text>Resized image: </Text>
      {resizedUri ? (
        <Image
          style={styles.image}
          source={{uri: resizedUri}}
          resizeMode="contain"
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 200,
    width: 200,
  },
});

export default App;
