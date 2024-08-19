import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import GameStyle from '../Components/GameStyle';
import GameLogic from '../Components/GameLogic';

function GameScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
  };

  const { board, handleSwipe, initializeGame } = GameLogic();

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View
          style={{
            backgroundColor: isDarkMode ? '#000' : '#fff',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 90,
          }}>
          <GameStyle board={board} handleSwipe={handleSwipe} initializeGame={initializeGame} />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});

export default GameScreen;
