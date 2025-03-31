import React from 'react';
import { View, StyleSheet, Dimensions, Text, Button } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { useState, useEffect } from 'react';
import { LocationData} from "@/components/LocationManager";
import { router, useLocalSearchParams } from 'expo-router';
import * as Location from 'expo-location';

export default function MapScreen() {
    const params = useLocalSearchParams();
    const [region, setRegion] = useState<Region>({
        latitude: params.latitude ? parseFloat(params.latitude as string) : 49.2827,
        longitude: params.longitude ? parseFloat(params.longitude as string) : -123.1207,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    });
    const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
        params.latitude && params.longitude ? {
            latitude: parseFloat(params.latitude as string),
            longitude: parseFloat(params.longitude as string)
        } : null
    );
    const confirmLocationHandler = (region: Region) => {
        router.navigate({
            pathname: '/profile',
            params: {
                latitude: region.latitude,
                longitude: region.longitude
            }
        })
    }

    return (
        <View style={styles.container}>
            <MapView 
                style={styles.map}
                initialRegion={region}
                onRegionChange={setRegion}
                onPress={(e) => {
                    console.log('pressed')
                    setSelectedLocation({
                        latitude: e.nativeEvent.coordinate.latitude,
                        longitude: e.nativeEvent.coordinate.longitude
                    })
                }}
            >
                <Marker
                    coordinate={{
                        latitude: selectedLocation?.latitude || 0,
                        longitude: selectedLocation?.longitude || 0
                    }}
                    title="Selected Location"
                    description="This is the selected location"
                />
            </MapView>
            <View style={styles.buttonContainer}>
                {selectedLocation && (
                    <Button 
                        title="Confirm Location" 
                    onPress={() => selectedLocation && confirmLocationHandler({
                        latitude: selectedLocation.latitude,
                        longitude: selectedLocation.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    })} 
                />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 100, // Leave space for button
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        padding: 16
    }
});