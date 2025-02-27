import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { writeToDB, readAllFromDB } from '@/Firebase/firestoreHelper';
import { User, GoalUsersProps } from "@/types"

export default function GoalUsers({ goalId }: GoalUsersProps) {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const users = await readAllFromDB(`goals/${goalId}/users`);
                if (users){
                    setUsers(users)
                }
                else {
                    const users = await fetch(`https://jsonplaceholder.typicode.com/users`);
                    if (users.ok) {
                        const data = await users.json();
                        const goalUsers: User[] = data.map((user: User) => ({
                        id: user.id,
                        name: user.name
                    }));
                    setUsers(goalUsers);
                    // write the users to the database
                    goalUsers.forEach(user => {
                        writeToDB(user, `goals/${goalId}/users`);
                    });
                }
                else {
                    throw new Error('Something went wrong, error code: ' + users.status);
                }
                }
            } catch (error) {
            console.error(error);
            }
        }
        fetchUsers();
    }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
