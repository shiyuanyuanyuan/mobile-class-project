import React, { useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImageSourcePropType } from 'react-native';
import { StyleSheet } from 'react-native';

interface ImageManagerProps {
    imageHandler: (image: string) => void;
}

export default function ImageManager({ imageHandler }: ImageManagerProps) {
    const [permissionInformation, setPermissionInformation] = useState<ImagePicker.PermissionStatus>();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const verifyPermissions = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
            return false;
        }
        setPermissionInformation(status);
        return true;
    };

    const takeImageHandler = async () => {
        // Verify permissions
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        try {
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
            });
            console.log(result);
            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri);
                imageHandler(result.assets[0].uri);
            }
            console.log(selectedImage);
        } catch (err) {
            console.log(err);
        }
    };

  return (
    <View>
      <Button title="Take Image" onPress={takeImageHandler} />
      {selectedImage && <Image source={{ uri: selectedImage}} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
    },
});
