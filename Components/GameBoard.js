// components/GameBoard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GameBoard = () => {
  // Initialize an empty 4x4 grid
  const grid = Array(4).fill(Array(4).fill(0));

  return (
    <View style={styles.container}>
      {grid.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, cellIndex) => (
            <View key={cellIndex} style={styles.cell}>
              <Text style={styles.cellText}>{cell !== 0 ? cell : ''}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 80,
    height: 80,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default GameBoard;
