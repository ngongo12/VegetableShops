import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import redux from './config/redux';
import notifee, { AndroidImportance, AndroidVisibility } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import NavigatorScreen from './screens/NavigatorScreen';
const Stack = createNativeStackNavigator();

const App = () => {
  LogBox.ignoreLogs([
    "Can't perform a React state update on an unmounted component."
  ])

  // useEffect(() => {
  //   messaging().onMessage(async remoteMessage => {
  //     //console.log('FCM message: ', JSON.stringify(remoteMessage));
  //     //Notification at here
  //     const { notification, data } = remoteMessage;
  //     //console.log('>>>>>>>>>>>>>>>>notifi ', notification)

  //     displayNotification(notification);

  //   });

  // }, [])

  // const displayNotification = async (notification) => {
  //   const channelId = await notifee.createChannel({
  //     id: 'default',
  //     name: 'Default channel',
  //     importance: AndroidImportance.HIGH
  //   });
  //   console.log('channelId ',channelId);
  //   const { title, body, android: { imageUrl } } = notification;
  //   await notifee.displayNotification({
  //     title,
  //     body,
  //     android: {
  //       channelId,
  //       importance: AndroidImportance.HIGH,
  //       //visibility: AndroidVisibility.PUBLIC,
  //       smallIcon: 'ic_shop',
  //       color: MainColor,
  //       largeIcon: imageUrl
  //     }
  //   })
    
  // }

  return (
    <Provider store={redux.store}>
      <NavigatorScreen />
    </Provider>
  );
};

export default App;
