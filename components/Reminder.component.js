import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import styles from '../styles.js';
import DateTime from './DateTime.component';

const Reminder = (props) => {
  return (
    <>
      <View style={styles.block}>
        <View style={styles.reminderWrapper}>
          <View style={styles.dateTimeWrapper}>
            <DateTime date={props.date}></DateTime>
          </View>
          <View style={styles.reminderTextWrapper}>
            <Text style={styles.bodyText}>
              {props.fired && <Text style={{ fontWeight: 'bold' }}>Fired: </Text>}
              {props.text}
            </Text>
          </View>
        </View>
        <View style={styles.deleteButtonWrapper}>
          <TouchableOpacity style={styles.deleteButtonOpacity}
            onPress={() => {
              props.deleteReminder(props.id, props.setReminders);
            }}>
            <Image source={require('../assets/x.png')} style={[styles.deleteButtonImage]}></Image>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.separator} />
    </>
  );
}
export default Reminder;