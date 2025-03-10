import PressableButton from "@/components/PressableButton";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "@/Firebase/firebaseSetup";


export default function Layout() {
  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: "#0096FF",
      },
      headerTintColor: "#fff",
    }}>
      <Stack.Screen name="index" options={{ 
        title: "All my goals",
        headerRight: () => (
          <PressableButton
            pressedHandler={() => {
              router.navigate("/(protected)/profile")
            }}
          >
            <Ionicons name="person-circle-outline" size={24} color="white" />
          </PressableButton>
        )
        
      }} />
      <Stack.Screen name="goals/[id]" options={{ 
        title: "Goal details",
      }} />
      <Stack.Screen name="profile" options={{ 
        title: "Profile",
        headerRight: () => (
          <PressableButton
            pressedHandler={() => {
              signOut(auth)
            }}
          >
            <Ionicons name="log-out-outline" size={24} color="white" />
          </PressableButton>
        )
      }} />
    </Stack>  
  );
}