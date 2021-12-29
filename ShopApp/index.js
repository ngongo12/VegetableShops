/**
 * @format
 */

import { AppRegistry } from 'react-native';
import React from 'react';
import notifee, { AndroidImportance, AndroidStyle } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    //console.log('FCM message background', remoteMessage);
    const { notification, data, messageId } = remoteMessage;
    displayNotification(notification, messageId);
});

const displayNotification = async (notification, messageId) => {
    const channelId = await notifee.createChannel({
        id: messageId,
        name: messageId,
        importance: AndroidImportance.HIGH
    });
    //console.log('channelId ', channelId);
    const { title, body, android: { imageUrl } } = notification;
    await notifee.displayNotification({
        title,
        body,
        android: {
            channelId,
            importance: AndroidImportance.HIGH,
            //visibility: AndroidVisibility.PUBLIC,
            smallIcon: 'ic_shop',
            color: MainColor,
            largeIcon: imageUrl,
            style: {
                type: AndroidStyle.BIGPICTURE,
                picture: imageUrl
            }
        }
    })


}

function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
        // App has been launched in the background by iOS, ignore
        return null;
    }

    return <App />;
}


AppRegistry.registerComponent(appName, () => HeadlessCheck);
