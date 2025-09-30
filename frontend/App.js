import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './Screens/WelcomeScreen';
import { useFonts } from 'expo-font';

export default function App() {

  const [fontsLoaded] = useFonts({
    GreatVibes: require('./assets/fonts/GreatVibes-Regular.ttf'),
  });




  return (
    <WelcomeScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
