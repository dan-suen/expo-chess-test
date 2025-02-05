import { StyleSheet } from 'react-native';
const aboutStyles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  text: { 
    color: '#000',
    width: "80%",
    backgroundColor: "white",  
    fontFamily: "Arial",      
    borderRadius: 5,           
    borderWidth: 1,            
    borderColor: "gray",
    fontSize: 30,  
    padding: 10,
    textAlign: "center", 
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
});
export default aboutStyles;
