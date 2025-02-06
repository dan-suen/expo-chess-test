import { StyleSheet } from 'react-native';

const settingstyles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
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
    maxHeight: 45,
    maxWidth: 200,
    justifyContent: 'center', 
    alignItems: 'center',
    overflow:"hidden"
  },
});

export default settingstyles;
