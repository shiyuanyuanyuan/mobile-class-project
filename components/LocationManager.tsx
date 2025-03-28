import {Alert, Button, Text, View, Image, StyleSheet} from 'react-native';
import { useEffect, useState } from 'react';
import { getCurrentPositionAsync, useForegroundPermissions, LocationObject } from 'expo-location';
import { router, useLocalSearchParams } from 'expo-router';
export interface LocationData {
    latitude: number;
    longitude: number;
}
export default function LocationManager() {
    const params = useLocalSearchParams();
    const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
    const [permisionResponse, requestPermission] = useForegroundPermissions();
    const [location, setLocation] = useState<LocationData | null>(null);

    useEffect(() => {
        if (params.latitude && params.longitude) {
            setSelectedLocation({
                latitude: parseFloat(params.latitude as string),
                longitude: parseFloat(params.longitude as string)
            });
        }
    }, []);
    
    async function verifyPermissions() {
        try {
            const { status } = await requestPermission();
            if (status == 'granted') {
                return true;
            }
            const responseFromUser = await requestPermission();
            return responseFromUser.status == 'granted';
        } catch (err) {
            console.log(err);
            return false;
        }
    }
    async function locateUserHandler() {
        try {
            const hadPermission = await verifyPermissions();
            if (!hadPermission) {
                Alert.alert('Permission was denied, please grant permission to access location');
                return;
            }
            const response = await getCurrentPositionAsync();
            console.log(response);
            setLocation({
                latitude: response.coords.latitude,
                longitude: response.coords.longitude
            });
        } catch (err) {
            console.log(err);
        }
    }

    async function chooseLocationHandler() {
        try {
            router.push('/(protected)/map');
        } catch (error) {
            console.error('Navigation error:', error);
        }
    }

    return (
        <View>
            <Button title="Locate" onPress={locateUserHandler} />
            <Button title="Choose Location" onPress={chooseLocationHandler} />
            {location && (
                <View>
                    <Text>Latitude: {location.latitude}</Text>
                    <Text>Longitude: {location.longitude}</Text>
                    <Image 
                        style={styles.map}
                        source={{
                            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=AIzaSyAtLtdEnSQqCxleOlrkBvnGJcDPoYr8yGc`
                        }} 
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        width: 400,
        height: 200
    }
});