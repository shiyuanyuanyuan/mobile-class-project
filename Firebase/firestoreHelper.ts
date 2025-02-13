import { database } from "./firebaseSetup"
import { collection, addDoc, deleteDoc, doc, getDoc } from "firebase/firestore"

export interface goalData {
    text: string
}

export async function writeToDB(data: goalData, collectionName: string){
    try {
        const docRef = await addDoc(collection(database, collectionName), data)
        console.log("Document written with ID: ", docRef.id)
    } catch (error) {
        console.error("Error adding document: ", error)
    }
}

// delete a goal from the database
export async function deleteFromDB(id: string, collectionName: string){
    try {
        const docRef = doc(database, collectionName, id)
        await deleteDoc(docRef)
        console.log("Document deleted with ID: ", id)
    } catch (error) {
        console.error("Error deleting document: ", error)
    }
}

export async function readDocFromDB(id: string, collectionName: string){
    try {
        const docRef = doc(database, collectionName, id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()){
            return docSnap.data()
        } else {
            console.log("No such document!")
            return null
        }
    } catch (error) {
        console.error("Error reading document: ", error)
    }
}