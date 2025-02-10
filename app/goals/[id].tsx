import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function GoalDetails() {
  const { id } = useLocalSearchParams();
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Goal Details for ID: {id}</Text>
    </View>
  );
}
