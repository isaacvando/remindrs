import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Text, View, Platform, Alert, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { v4 as uuid } from 'uuid';
import styles from './styles.js';
import Reminder from './components/Reminder.component.js';
import MyTextInput from './components/MyTextInput.component.js';
import MyDatePicker from './components/MyDatePicker.component.js';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/*
Tasks:
- make formatting relative
---V2---
- ability to edit time and text
- animations
*/

const App = () => {
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState();
  const notificationListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      updateReminderToFired(notification, setReminders)
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
    };
  }, []);

  useEffect(() => {
    (async () => {
      await getReminders(setReminders);
    })();
  }, [setReminders]);

  return (
    <>
      <StatusBar barStyle={'light-content'}></StatusBar>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps={'handled'}>
          {/* Header */}
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.headerText}>remindrs</Text>
          </View>
          <View style={styles.separator} />

          {/* Body */}
          {showTextInput &&
            <MyTextInput text={text} setText={setText}
              setShowTextInput={setShowTextInput} setShowDatePicker={setShowDatePicker}></MyTextInput>}
          {showDatePicker &&
            <MyDatePicker date={date} setDate={setDate} text={text} setText={setText} setReminders={setReminders}
              setShowDatePicker={setShowDatePicker} createReminder={createReminder}></MyDatePicker>}
          {(showTextInput || showDatePicker) &&
            null}

          {/* {notification && console.log(notification)} */}
          {reminders}

          <View style={{ padding: 40 }}></View>

        </ScrollView>

        {/* Bottom button - should probably be put into a component */}
        {(showTextInput || showDatePicker) ?
          <>
            <View style={styles.newButtonBackground}></View>
            <TouchableOpacity style={styles.newButtonOpacity}
              onPress={() => {
                setText('');
                d = new Date();
                d.setHours(d.getHours() + 1);
                setDate(new Date(d));
                setShowTextInput(false);
                setShowDatePicker(false);
              }}>
              <Image source={require('./assets/cancel.png')} style={styles.newButtonImage}></Image>
            </TouchableOpacity>
          </> :
          <>
            <View style={styles.newButtonBackground}></View>
            <TouchableOpacity style={styles.newButtonOpacity}
              onPress={() => {
                setText('');
                d = new Date();
                d.setHours(d.getHours() + 1);
                setDate(new Date(d));
                setShowTextInput(true);
              }}>
              <Image source={require('./assets/plus.png')} style={styles.newButtonImage}></Image>
            </TouchableOpacity>
          </>
        }

      </SafeAreaView>
    </>
  );
}

const getReminders = async (setReminders) => {
  let currentString = await getItem('current');
  let current = [];
  let reminders = [];
  if (currentString) {
    current = JSON.parse(currentString);
  }

  // sort by date, lowest to highest
  current.sort((a, b) => new Date(a.date) - new Date(b.date));
  current.forEach(reminder => {
    let fired = false;
    if (reminder.notificationId == 'fired') {
      fired = true;
    }
    reminders.push(<Reminder key={reminder.id} id={reminder.id} text={reminder.text} fired={fired}
      date={new Date(reminder.date)} deleteReminder={deleteReminder} setReminders={setReminders}></Reminder>)
  });

  setReminders(reminders);
}

const createReminder = async (text, date, setText, setDate, setReminders) => {
  let currentString = await getItem('current');
  let current = [];
  if (currentString) {
    current = JSON.parse(currentString);
  }

  let id = uuid();
  var notificationId = await scheduleNotification(text, date, id, setReminders);
  const reminder = {
    id: id,
    text: text,
    date: date,
    notificationId: notificationId
  }

  current.push(reminder);
  await setItem('current', JSON.stringify(current));

  // reset date to interval of 5 minutes
  // date = new Date();
  // date.setMinutes(date.getMinutes() - date.getMinutes() % 5);
  // setDate(date);
  // setDate(new Date())

  await getReminders(setReminders);
}

const deleteReminder = async (id, setReminders) => {
  let currentString = await getItem('current');
  let current = [];
  if (currentString) {
    var notificationId;
    current = JSON.parse(currentString);
    current.forEach(reminder => {
      if (reminder.id == id) {
        notificationId = reminder.notificationId;
        current.splice(current.indexOf(reminder), 1);
      }
    });
    await setItem('current', JSON.stringify(current));
    getReminders(setReminders);

    await Notifications.cancelScheduledNotificationAsync(notificationId);
  }
}

const updateReminderToFired = async (notification, setReminders) => {
  let currentString = await getItem('current');
  let current = [];
  if (currentString) {
    current = JSON.parse(currentString);
    current.forEach(reminder => {
      if (reminder.notificationId == notification.request.identifier) {
        reminder.notificationId = 'fired';
      }
    });
    await setItem('current', JSON.stringify(current));
    getReminders(setReminders);
  }
}

// Notifications
const scheduleNotification = async (text, date, id, setReminders) => {
  date.setSeconds(0);
  try {
    return await Notifications.scheduleNotificationAsync({
      content: {
        body: text,
        sound: ''
      },
      trigger: new Date(date),
    });
  }
  catch (e) {
    Alert.alert("Date must be in the future");
    deleteReminder(id, setReminders);
  }
}

// From expo snack
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

// Storage
const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  }
  catch (e) {
    Alert.alert(e);
  }
}

const getItem = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  }
  catch (e) {
    Alert.alert(e);
  }
}

export default App;
