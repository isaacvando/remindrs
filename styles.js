import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  block: {
    flexDirection: 'row',
    marginLeft: 12,
    //alignItems: 'center'
  },
  scrollView: {
  },
  bodyText: {
    color: '#fff',
    fontSize: 20,
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 13,
    marginRight: 13,
    flexShrink: 1
  },
  headerText: {
    color: '#fff',
    fontSize: 50,
    paddingTop: 25,
    paddingBottom: 10,
  },
  date: {
    color: '#fff',
    fontSize: 15,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 8,
    marginRight: 6,
    padding: 4,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 10,
  },
  separator: {
    backgroundColor: '#999',
    width: '95%',
    padding: StyleSheet.hairlineWidth,
    margin: 10
  },
  newButtonView: {
    flex: 1,
    alignContent: 'center',
    width: '100%'
  },
  newButtonOpacity: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 70,
    left: "50%",
    margin: -35,
  },
  newButtonImage: {
    width: 70,
    height: 70,
  },
  newButtonBackground: {
    position: 'absolute',
    bottom: 70,
    left: "50%",
    margin: -31,
    backgroundColor: '#000',
    width: 62,
    height: 62
  },
  checkButtonOpacity: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'flex-end',
    marginLeft: 22,
    marginRight: 22
  },
  checkButtonImage: {
    width: 40,
    height: 40,
  },
  textInput: {
    color: '#fff',
    fontSize: 20,
    width: 305,
    paddingTop: 30,
    paddingBottom: 30,
  },
  textInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 310, // this should be the width of the DatePicker
    height: 216 // and this the height
  },
  datePickerWrapper: {
    //height: 200
  },
  deleteButtonOpacity: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 22,
    paddingRight: 22
  },
  deleteButtonImage: {
    width: 20,
    height: 20,
    marginLeft: 10
  },
  checkReminderButtonImage: {
    width: 27,
    height: 27,
    marginLeft: 9
  },
  reminderWrapper: {
    flexDirection: 'row',
    width: 310
  },
  dateTimeWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});