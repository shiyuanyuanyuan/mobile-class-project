import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { readDocFromDB, goalData} from '@/Firebase/firestoreHelper';

export default function GoalDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [goal, setGoal] = useState<goalData | null>(null);
  
  useEffect(() => {
    async function fetchGoal() {
      try {
        const goal = await readDocFromDB(id, "goals");
        if (goal) {
          setGoal(goal as goalData);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchGoal();
  }, []);
  
  return (
      
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Goal Details for ID: {id}</Text>
      <Text>{goal?.text}</Text>
    </View>
  );
}
