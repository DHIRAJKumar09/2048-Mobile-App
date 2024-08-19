import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { GestureHandlerRootView ,PanGestureHandler,State} from 'react-native-gesture-handler';
const BOARD_SIZE = 4;

interface GameStyleProps {
  board: number[][]; 
  handleSwipe: (direction: string) => void;
  initializeGame: () => void;
}

const GameStyle: React.FC<GameStyleProps> = ({ board, handleSwipe, initializeGame }) => {
  const scaleAnimations = useRef(
    board.map(row => row.map(() => new Animated.Value(0)))
  ).current;

  useEffect(() => {
    
    board.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        if (value !== 0) {
          Animated.spring(scaleAnimations[rowIndex][colIndex], {
            toValue: 1,
            useNativeDriver: true,
          }).start();
        }
      });
    });
  }, [board]);

  const getTileColor = (value: number) => {
    switch (value) {
      case 2: return '#EEE4DA';
      case 4: return '#EDE0C8';
      case 8: return '#F2B179';
      case 16: return '#F59563';
      case 32: return '#F67C5F';
      case 64: return '#F65E3B';
      case 128: return '#EDCF72';
      case 256: return '#EDCC61';
      case 512: return '#EDC850';
      case 1024: return '#EDC53F';
      case 2048: return '#EDC22E';
      default: return '#BBF99A';
    }
  };

  const onSwipeEvent = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX, translationY } = event.nativeEvent;
      if (Math.abs(translationX) > Math.abs(translationY)) {
        handleSwipe(translationX > 0 ? 'RIGHT' : 'LEFT');
      } else {
        handleSwipe(translationY > 0 ? 'DOWN' : 'UP');
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.root}>
    <PanGestureHandler onHandlerStateChange={onSwipeEvent}>
      <View style={styles.container}>
        {board.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <Animated.View
              key={`${rowIndex}-${colIndex}`}
              style={[
                styles.tile,
                { 
                  backgroundColor: getTileColor(value),
                  transform: [{ scale: scaleAnimations[rowIndex][colIndex] }]
                },
              ]}
            >
              {value > 0 && (
                <Text style={styles.tileText}>{value}</Text>
              )}
            </Animated.View>
          ))
        )}
      </View>
    </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Dimensions.get('window').width,
  },
  tile: {
    width: Dimensions.get('window').width / BOARD_SIZE,
    height: Dimensions.get('window').width / BOARD_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 5,
  },
  tileText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  root: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
  

   
  },
});

export default GameStyle;
