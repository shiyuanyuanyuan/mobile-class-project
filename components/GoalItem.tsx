import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { GoalFrontDB } from '../app/index';
import { router } from 'expo-router';

type GoalItemProps = {
    goalObj: GoalFrontDB
    deleteGoal: (id: string) => void
}

const GoalItem = ({goalObj, deleteGoal}: GoalItemProps) => {
    return (
        <Pressable 
          android_ripple={styles.android_ripple}
          style={({pressed}) => [
            styles.container,
            pressed && styles.pressed
          ]}
          // style={styles.container}
          onPress={() => router.navigate(`/goals/${goalObj.id}`)}
        >
          <Text style={styles.goalText}>{goalObj.text}</Text>
            {/* <Link asChild href={`/goals/${goalObj.id}`}>
              <Button title="info" />
            </Link> */}
          <View style={styles.deleteButton}>
            <Button 
              title="X" 
              onPress={() => deleteGoal(goalObj.id)} 
              color="#0096FF"
            />
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
        color: 'blue',
    }
})