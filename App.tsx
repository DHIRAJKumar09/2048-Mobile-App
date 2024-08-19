import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import GameStyle from './Components/GameStyle';
import GameLogic from './Components/GameLogic';
import AppNavigator from './AppNavigator';


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
  };

  const { board, handleSwipe, initializeGame } = GameLogic();

  return (
    <AppNavigator/>
    
     

  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  root: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff'

   
  },
});

export default App;
