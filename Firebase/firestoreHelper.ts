import { database } from "./firebaseSetup"
import { collection, addDoc, deleteDoc, doc, getDoc, setDoc, getDocs } from "firebase/firestore"
import { User, goalData } from "@/types"


export async function writeToDB(data: goalData | User, collectionName: string){
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

export async function addWarningToDB(id: string, collectionName: string){
    try {
        const docRef = doc(database, collectionName, id)
        await setDoc(docRef, { isWarning: true }, { merge: true })
    } catch (error) {
        console.error("Error adding warning to document: ", error)
    }
}

export async function readAllFromDB(collectionName: string){
    try {
        const querySnapshot = await getDocs(collection(database, collectionName))
        if (querySnapshot.empty){
            console.log("No documents found")
            return null
        } else {
            let data: User[] = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data() as User)
            })
            return data
        }
    } catch (error) {
        console.error("Error reading all documents: ", error)
    }
}