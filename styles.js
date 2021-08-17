import { StyleSheet, Dimensions } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    // borderColor: '#fff',
    // borderWidth: 1
  },
  block: {
    flexDirection: 'row',
  },
  scrollView: {
  },
  separator: {
    backgroundColor: '#999',
    width: '95%',
    padding: StyleSheet.hairlineWidth,
    margin: 10
  },
  headerText: {
    color: '#fff',
    fontSize: 50,
    paddingTop: 10,
    paddingBottom: 10,
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
  reminderTextWrapper: {
    flexShrink: 1,
    //width: '58%'
  },
  date: {
    color: '#fff',
    fontSize: 15,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 12,
    marginRight: 6,
    padding: 4,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 10,
  },
  dateTimeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderWrapper: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - 52
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
  checkButtonWrapper: {
    flexDirection: 'row',
    marginLeft: 'auto'
  },
  checkButtonOpacity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 22,
    marginRight: 22
  },
  checkButtonImage: {
    width: 40,
    height: 40,
  },
  textInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    // width: 310, // this should be the width of the DatePicker
    height: 216 // and this the height
  },
  textInput: {
    color: '#fff',
    fontSize: 20,
    width: Dimensions.get('window').width - 100,
    paddingTop: 30,
    paddingBottom: 30,
  },
  deleteButtonWrapper: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 6
  },
  deleteButtonOpacity: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 22,
    paddingRight: 22,
  },
  deleteButtonImage: {
    width: 20,
    height: 20,
  }
});