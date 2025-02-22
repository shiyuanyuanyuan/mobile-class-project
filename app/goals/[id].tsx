import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { readDocFromDB, goalData, addWarningToDB} from '@/Firebase/firestoreHelper';

export default function GoalDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [goal, setGoal] = useState<goalData | null>(null);
  const [warning, setWarning] = useState(false);
  
  useEffect(() => {
    async function fetchGoal() {
      try {
        const goal = await readDocFromDB(id, "goals");
        if (goal) {
          setGoal(goal as goalData);
          setWarning(goal.isWarning);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchGoal();
  }, []);

  function warnUser() {
    setWarning(true);
    addWarningToDB(id, "goals");
  }
  
  return (
      
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Stack.Screen options={{
        headerTitle: goal? warning ? "Warning" : goal.text : "",
        headerRight: () => (
            <Button title="Warning" onPress={warnUser} />
        )
      }} />
      <Text style={warning && styles.warningText}>{goal?.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  warningText: {
    color: "red",
  },
});