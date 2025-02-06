import { StyleSheet } from 'react-native';

const settingstyles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',

  },
  text: {
    minWidth:200,
    textAlign:"center"
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    justifyContent:"flex-end",
    maxHeight:200,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  toggle: {
    borderRadius: 3,
    flex: 1,
    flexDirection: 'row',
    maxHeight: 60,
    maxWidth: 200,
    justifyContent: 'center', 
    alignItems: 'center',
    overflow:"hidden",
    margin: 30
  },
});

export default settingstyles;
