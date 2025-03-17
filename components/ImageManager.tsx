import React, { useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageManager() {
    const [permissionInformation, setPermissionInformation] = useState<ImagePicker.PermissionStatus>();
    const [selectedImage, setSelectedImage] = useState(null);

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
        } catch (err) {
            console.log(err);
        }
    };

  return (
    <View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
};
