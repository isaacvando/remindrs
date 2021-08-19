import { View, Text } from 'react-native';
import React from 'react';
import styles from '../styles.js';

const DateTime = (props) => {
  ampm = 'AM';
  hours = props.date.getHours();
  minutes = props.date.getMinutes();
  minutesString = '' + minutes;
  if (hours >= 12) {
    hours = hours % 12;
    ampm = 'PM';
  }
  if (hours == 0)
    hours = 12;
  if (minutes < 10) {
    minutesString = '0' + minutes;
  }
  return (
    <Text style={[styles.date]}>{props.date.getMonth() + 1}/{props.date.getDate()}, {hours}:{minutesString} {ampm}</Text>
  );
}

export default DateTime;