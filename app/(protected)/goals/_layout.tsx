import { Stack } from "expo-router";

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
        
      }} />
      <Stack.Screen name="goals/[id]" options={{ 
        title: "Goal details",
      }} />
    </Stack>  
  );
}