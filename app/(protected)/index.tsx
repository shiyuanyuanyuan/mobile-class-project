import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, FlatList, Alert } from 'react-native';
import Header from '../../components/Header'
import React, { useState, useEffect } from 'react'
import Input from '../../components/Input'
import GoalItem from '../../components/GoalItem'
import { database, auth } from '../../Firebase/firebaseSetup'
import { goalData, GoalFrontDB } from '@/types'
import { writeToDB } from '../../Firebase/firestoreHelper'
import { collection, query, where } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { deleteFromDB } from '../../Firebase/firestoreHelper'
import PressableButton from '@/components/PressableButton';
import { useRouter } from 'expo-router';
import { UserInput } from '@/types';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../Firebase/firebaseSetup'
import { setNotificationHandler } from 'expo-notifications';

setNotificationHandler({
  handleNotification: async () => {
    return{
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }
  },
});

export default function App() {
  
  const appName = 'my app'
  // const [receivetText, setReceiveText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [goals, setGoals] = useState<GoalFrontDB[]>([])
  const router = useRouter();

  useEffect(() => {
    // Handle case where user might not be authenticated yet
    if (!auth.currentUser) {
      console.log("No authenticated user found");
      return;
    }
    
    // Start the listener with where clause to match security rules
    const unsubscribe = onSnapshot(
      query(
        collection(database, 'goals'), 
        where("owner", "==", auth.currentUser.uid)
      ), 
      (querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("No goals found")
          setGoals([]);
        } else {
          let newArrayOfGoals: GoalFrontDB[] = []
          querySnapshot.forEach((doc) => {
            console.log(doc.id)
            newArrayOfGoals.push({
              ...(doc.data() as goalData),
              id: doc.id
            })
          })
          console.log("newgoals: ", newArrayOfGoals)
          setGoals(newArrayOfGoals)
        }
      }
    );
    
    return () => {
      unsubscribe()
    }
  }, []);

  async function fetchImage(imageUri: string){
    try {
      const response = await fetch(imageUri)
      if (!response.ok) {
        throw new Error('Image not found')
      }
      const blob = await response.blob()
      const imageName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
      const imageRef = ref(storage, `images/${imageName}`)
      const uploadResult = await uploadBytesResumable(imageRef, blob);
      return uploadResult.metadata.fullPath;
    } catch (error) {
      console.error('Error fetching image:', error)
    }
  }

  async function handleInputData(data: UserInput){
    let storedImageUrl = '';
    try {
      if (data.image) {
        const url = await fetchImage(data.image)
        if (url) {
          storedImageUrl = url
        }
      }
    } catch (error) {
      console.error('Error fetching image:', error)
    }
    
    let newGoal: goalData = {
      text: data.text,
      isWarning: false,
      owner: auth.currentUser?.uid || '',
      image: storedImageUrl
    }
    writeToDB(newGoal, 'goals')   
    // setGoals((prevGoals) => [...prevGoals, newGoal])
    setModalVisible(false)
  }
  function handleModal(){
    setModalVisible(true)
  }

  function handleModalDismiss() {
    console.log("app user cancel")
    setModalVisible(false)
  }

  function deleteGoal(id: string) {
    // delete the goal from the database
    deleteFromDB(id, 'goals')
    // update the goals state
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
        {/* <Button title="Add a goal" onPress={handleModal}></Button> */}
        <PressableButton
          pressedHandler={handleModal}
          componentStyle={styles.addButton}
        >
          <Text style={{ color: 'white' }}>Add a goal</Text>
        </PressableButton>  
      </View>
      <View style={styles.backContainer}>
        <FlatList
          contentContainerStyle={styles.alignCenter}
          data={goals}
          ListEmptyComponent={
            <Text style={styles.header}>No goals to show</Text>
          }
          ListHeaderComponent={
            goals.length > 0 ? (
              <Text style={styles.header}>My Goal List</Text>
            ) : null
          }
          ListFooterComponent={
            goals.length > 0 ? (
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
            ) : null
          }
          ListFooterComponentStyle={styles.footer}
          ItemSeparatorComponent={({ highlighted }) => (
            <View style={[
              styles.separator,
              highlighted && { backgroundColor: 'purple' }
            ]} />
          )}
          renderItem={({item, separators}) => 
            <GoalItem 
              goalObj={item} 
              deleteGoal={deleteGoal}
              onPress={() => {
                separators.highlight();
                router.navigate(`/goals/${item.id}`);
              }}
              onPressOut={() => {
                separators.unhighlight();
              }}
            />
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 20,
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    marginBottom: 20,
  },
  separator: {
    height: 3,
    backgroundColor: 'grey',
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  }
});
