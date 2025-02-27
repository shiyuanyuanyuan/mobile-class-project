import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { readDocFromDB, addWarningToDB} from '@/Firebase/firestoreHelper';
import { goalData } from '@/types';
import GoalUsers from '@/components/GoalUsers';
import PressableButton from '@/components/PressableButton';
import { Ionicons } from '@expo/vector-icons';

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
          <PressableButton
            pressedHandler={warnUser}
            componentStyle={styles.warningButton}
          >
            <Ionicons name="warning" size={24} color="white" />
          </PressableButton>
            // <Button title="Warning" onPress={warnUser} />
        )
      }} />
      <Text style={warning && styles.warningText}>{goal?.text}</Text>
      <GoalUsers goalId={id}/>
    </View>
  );
}

const styles = StyleSheet.create({
  warningText: {
    color: "red",
  },
  warningButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
  }
});