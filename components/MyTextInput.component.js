import React from 'react';
import { TextInput, View, TouchableOpacity, Image } from 'react-native';
import styles from '../styles.js';

const MyTextInput = (props) => {
  return (
    <>
      <View style={styles.block}>
        <View style={styles.textInputWrapper}>
          <TextInput style={styles.textInput} value={props.text} onChangeText={props.setText}
            multiline={true} placeholder={'reminder body here'} placeholderTextColor={'#999'}></TextInput>
        </View>
        <TouchableOpacity style={styles.checkButtonOpacity}
          onPress={() => {
            props.setShowTextInput(false);
            props.setShowDatePicker(true);
          }}>
          <Image source={require('../assets/check.png')} style={styles.checkButtonImage}></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
    </>
  );
}

export default MyTextInput;
