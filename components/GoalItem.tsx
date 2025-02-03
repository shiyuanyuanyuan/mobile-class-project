import { StyleSheet, Text, View, Button } from 'react-native';
import { GoalDB } from '@/App';

type GoalItemProps = {
    goalObj: GoalDB
    deleteGoal: (id: number) => void
}

const GoalItem = ({goalObj, deleteGoal}: GoalItemProps) => {
    return (
        <View style={styles.container}>
          <Text style={styles.goalText}>{goalObj.text}</Text>
          <View style={styles.deleteButton}>
            <Button 
              title="X" 
              onPress={() => deleteGoal(goalObj.id)} 
              color="#0096FF"
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
})