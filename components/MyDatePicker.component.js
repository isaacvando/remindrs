import React from 'react';
import { TextInput, View, TouchableOpacity, Image, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
import styles from '../styles.js';

const MyDatePicker = (props) => {
  return (
    <>
      <View style={styles.block}>
        <View style={styles.datePickerWrapper} >
          <DatePicker textColor={'#ffffff'} date={props.date} onDateChange={props.setDate}
            minuteInterval={5} fadeToColor="none" />
        </View>
        <View style={styles.checkButtonWrapper}>
          <TouchableOpacity style={styles.checkButtonOpacity}
            onPress={() => {
              if (new Date(props.date) >= new Date()) {
                props.setShowDatePicker(false);
                props.createReminder(props.text, props.date, props.setText, props.setDate, props.setReminders);
              }
              else {
                Alert.alert("Date must be in the future");
              }
            }}>
            <Image source={require('../assets/check.png')} style={styles.checkButtonImage}></Image>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.separator} />
    </>
  );
}

export default MyDatePicker;
