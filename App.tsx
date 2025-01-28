import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, FlatList, Alert } from 'react-native';
import Header from './components/Header'
import React, { useState, useEffect } from 'react'
import Input from './components/Input'
import GoalItem from './components/GoalItem'
export interface Goal {
  text: string;
  id: number;
}
export default function App() {
  const appName = 'my app'
  // const [receivetText, setReceiveText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [goals, setGoals] = useState<Goal[]>([])

  useEffect(() => {
    console.log("goals updated: ", goals)
  }, [goals])

  function handleInputData(data: string){
    console.log("app user type: ", data)
    // setReceiveText(data)
    // define a new goal
    const newGoal: Goal = {
      text: data,
      id: Math.random()
    }
    setGoals((prevGoals) => [...prevGoals, newGoal])
    setModalVisible(false)
  }
  function handleModal(){
    setModalVisible(true)
  }

  function handleModalDismiss() {
    console.log("app user cancel")
    setModalVisible(false)
  }

  function deleteGoal(id: number) {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id))
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Header name={appName} />
        <StatusBar style="auto" />
        <Input 
          focus={true} 
          inputHandler={handleInputData} 
          modalVisibility={modalVisible}
          onCancel={handleModalDismiss}
        />
        <Button title="Add a goal" onPress={handleModal}></Button>
      </View>
      <View style={styles.backContainer}>
        <FlatList
          contentContainerStyle={styles.alignCenter}
          data={goals}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No goals to show</Text>
          }
          ListHeaderComponent={
            goals.length > 0 ? (
              <Text style={styles.headerText}>My Goal List</Text>
            ) : null
          }
          
          ListFooterComponent={
            goals.length > 0 ? (
              <View style={styles.footerContainer}>
                <Button 
                  title="Delete all" 
                  color="#0096FF"
                  onPress={() => {
                    Alert.alert(
                      "Delete All Goals",
                      "Are you sure you want to delete all goals?",
                      [
                        { text: "No", style: "cancel" },
                        { 
                          text: "Yes", 
                          onPress: () => setGoals([]),
                          style: "destructive"
                        }
                      ]
                    );
                  }} 
                />
              </View>
            ) : null
          }
          ItemSeparatorComponent={({leadingItem}) => (
            <View style={styles.separatorContainer}>
              <View style={[styles.separator, {width: leadingItem ? leadingItem.text.length * 15 : 0}]} />
            </View>
          )}
          renderItem={({item}) => 
            <GoalItem goalObj={item} deleteGoal={deleteGoal} />
          }
        />


        {/* <ScrollView
        contentContainerStyle={styles.alignCenter}
        >
          {goals.map((goal) => {
            return (
              <View key={goal.id}>
              <Text style={styles.goalText}>{goal.text}</Text>
              </View>
            )
          })}
        </ScrollView> */}
      </View>      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContainer: {
    flex: 1,
    paddingTop: 70,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backContainer: {
    flex: 4,
    backgroundColor: "#E6E6FA",
    alignItems: 'center',
    paddingTop: 20,
  },
  alignCenter: {
    alignItems: 'center',
    width: '100%',
  },
  emptyText: {
    fontSize: 24,
    color: 'purple',
    marginTop: 20,
    fontWeight: '500',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 20,
    textAlign: 'center',
  },
  footerContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  separatorContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  separator: {
    height: 2,
    backgroundColor: 'grey',
    marginVertical: 10,
  }
});
