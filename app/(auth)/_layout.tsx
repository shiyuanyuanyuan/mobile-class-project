import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: "#B762C1", // Purple color from screenshot
      },
      headerTintColor: "#fff",
    }}>
      <Stack.Screen name="login" options={{ 
        title: "Login",
      }} />
      <Stack.Screen name="signup" options={{ 
        title: "Signup",
      }} />
    </Stack>  
  );
}
