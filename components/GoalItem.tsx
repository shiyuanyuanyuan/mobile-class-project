import { StyleSheet, Text, View, Button } from 'react-native';
import { Goal } from '@/App';

type GoalItemProps = {
    goalObj: Goal
    deleteGoal: (id: number) => void
}

const GoalItem = ({goalObj, deleteGoal}: GoalItemProps) => {
    return (
        <View style={styles.container}>
          <Text style={styles.goalText}>{goalObj.text}</Text>
          <View style={styles.buttonContainer}>
            <Button 
              title="X" 
              onPress={() => deleteGoal(goalObj.id)} 
              color="#808080"
            />
          </View>
        </View>
    )
}

export default GoalItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: 'grey',
    },
    goalText: {
        color: 'blue',
        fontSize: 18,
        backgroundColor: 'grey',
        padding: 5,      
      },
      buttonContainer: {
        padding: 2,
        borderRadius: 5,
      }
})
