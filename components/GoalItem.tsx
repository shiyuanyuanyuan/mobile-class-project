import { StyleSheet, Text, View, Button, Pressable, Alert } from 'react-native';
import { GoalFrontDB } from '@/types';
import { router } from 'expo-router';
import PressableButton from './PressableButton';
import { Ionicons } from '@expo/vector-icons';

interface GoalItemProps {
    goalObj: GoalFrontDB;
    deleteGoal: (id: string) => void;
    onPress?: () => void;
    onPressOut?: () => void;
}

const GoalItem = ({goalObj, deleteGoal, onPress, onPressOut}: GoalItemProps) => {

    return (
        <Pressable 
          android_ripple={styles.android_ripple}
          style={({pressed}) => [
            styles.container,
            pressed && styles.pressed
          ]}
          onPress={onPress}
          onPressOut={onPressOut}
          onLongPress={() => {
            Alert.alert(
              "Delete Goal",
              "Are you sure you want to delete this goal?",
              [
                {
                  text: "Cancel",
                  style: "cancel"
                },
                {
                  text: "Delete",
                  onPress: () => deleteGoal(goalObj.id),
                  style: "destructive"
                }
              ]
            );
          }}
          delayLongPress={500}
        >
          <Text style={styles.goalText}>{goalObj.text}</Text>
            {/* <Link asChild href={`/goals/${goalObj.id}`}>
              <Button title="info" />
            </Link> */}
          <View style={styles.deleteButton}>
            <PressableButton
              pressedHandler={() => deleteGoal(goalObj.id)}
              pressedStyle={styles.pressed}
              componentStyle={styles.icon}
            >
              {/* <Text>X</Text> */}
              <Ionicons name="trash" size={24} />
            </PressableButton>
            {/* <Button 
              title="X" 
              onPress={() => deleteGoal(goalObj.id)} 
              color="#0096FF"
            /> */}
          </View>
          
          
        </Pressable>
    )
}

export default GoalItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 3,
        backgroundColor: 'lightgrey',
    },
    goalText: {
        color: 'purple',
        fontSize: 20,
        fontWeight: '500',
        padding: 10,
    },
    deleteButton: {
        backgroundColor: 'lightgrey',
        padding: 8,
        borderRadius: 5,
    },
    pressed: {
        backgroundColor: 'grey',
        opacity: 0.5,
    },
    android_ripple: {
        color: 'purple',
    },
    icon: {
        backgroundColor: 'lightgrey',
        padding: 5,
        borderRadius: 5,
    }
})