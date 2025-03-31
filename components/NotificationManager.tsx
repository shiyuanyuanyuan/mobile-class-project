import { scheduleNotificationAsync, getPermissionsAsync, requestPermissionsAsync, SchedulableTriggerInputTypes,  } from 'expo-notifications';
import { View, Button } from 'react-native';

export default function NotificationManager() {

    async function verifyPermissions() {
        try {
            const { granted } = await getPermissionsAsync();
            if (granted) {
                return true;
            }
            const response = await requestPermissionsAsync();
            return response.granted;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async function scheduleNotificationHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            alert('Please enable notifications to use this feature');
            return;
        }

        await scheduleNotificationAsync({
            content: {
                title: 'Reminder',
                body: 'Add your daily goals',
            },
            trigger: {
                seconds: 5,
                type: SchedulableTriggerInputTypes.TIME_INTERVAL,
            },
        });
    }

    return (
        <View>
            <Button title="Enable Notifications" onPress={scheduleNotificationHandler} />
        </View>
    );
}
