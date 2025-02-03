import { database } from "./firebaseSetup"
import { collection, addDoc } from "firebase/firestore"
export interface goalData {
    text: string
}

export async function writeToDB(data: goalData, collectionName: string){
    const docRef = await addDoc(collection(database, collectionName), data)
    console.log("Document written with ID: ", docRef.id)
}
