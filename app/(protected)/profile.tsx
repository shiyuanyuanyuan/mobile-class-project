import { View, Text } from "react-native";
import { auth } from "@/Firebase/firebaseSetup";

export default function Profile() {
    return (
        <View>
            <Text>{auth.currentUser?.email}</Text>
        </View>
    )
}   