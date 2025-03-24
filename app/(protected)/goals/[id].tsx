import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { readDocFromDB, addWarningToDB} from '@/Firebase/firestoreHelper';
import { goalData } from '@/types';
import GoalUsers from '@/components/GoalUsers';
import PressableButton from '@/components/PressableButton';
import { Ionicons } from '@expo/vector-icons';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from '@/Firebase/firebaseSetup';

export default function GoalDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [goal, setGoal] = useState<goalData | null>(null);
  const [warning, setWarning] = useState(false);
  
  useEffect(() => {
    async function fetchGoal() {
      try {
        const goal = await readDocFromDB(id, "goals") as goalData;
        if (goal) {
          setWarning(goal.isWarning); 
          if (goal.image) {
            const reference = ref(storage, goal.image);
            const url = await getDownloadURL(reference);
            goal.image = url
          }
          setGoal(goal);
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
      <Image source={{ uri: goal?.image }} style={{ width: 100, height: 100 }} />
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