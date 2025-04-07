import { View, Text, Button } from "react-native";
import LocationManager from "@/components/LocationManager";
import NotificationManager from "@/components/NotificationManager";

export default function Profile() {

    return (
        <View>
            <LocationManager />
            <NotificationManager />
        </View>
    )
}   