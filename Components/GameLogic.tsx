
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

const BOARD_SIZE = 3;

type Board = number[][];
const useGameLogic = () => {
  const [board, setBoard] = useState<Board>(Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0)));

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const newBoard: Board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));
    addNewTile(newBoard);
    addNewTile(newBoard);
    setBoard(newBoard);
  };

  const addNewTile = (newBoard: Board) => {
    const emptyTiles = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (newBoard[i][j] === 0) {
          emptyTiles.push({ row: i, col: j });
        }
      }
    }

    if (emptyTiles.length > 0) {
      const { row, col } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
      newBoard[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  const handleSwipe = (direction: string) => {
    const newBoard = [...board];
    let moved = false;

    switch (direction) {
      case 'UP':
        moved = moveUp(newBoard);
        break;
      case 'DOWN':
        moved = moveDown(newBoard);
        break;
      case 'LEFT':
        moved = moveLeft(newBoard);
        break;
      case 'RIGHT':
        moved = moveRight(newBoard);
        break;
    }

    if (moved) {
      addNewTile(newBoard);
      setBoard(newBoard);
    }

    if (isGameOver(newBoard)) {
      Alert.alert('Game Over', 'No more moves left!', [
        { text: 'Restart', onPress: initializeGame },
      ]);
    }
  };

  const moveUp = (newBoard: Board) => {
    let moved = false;
    for (let col = 0; col < BOARD_SIZE; col++) {
      for (let row = 1; row < BOARD_SIZE; row++) {
        if (newBoard[row][col] !== 0) {
          let currentRow = row;
          while (currentRow > 0 && newBoard[currentRow - 1][col] === 0) {
            newBoard[currentRow - 1][col] = newBoard[currentRow][col];
            newBoard[currentRow][col] = 0;
            currentRow--;
            moved = true;
          }

          if (
            currentRow > 0 &&
            newBoard[currentRow - 1][col] === newBoard[currentRow][col]
          ) {
            newBoard[currentRow - 1][col] *= 2;
            newBoard[currentRow][col] = 0;
            moved = true;
          }
        }
      }
    }
    return moved;
  };

  const moveDown = (newBoard: Board) => {
    let moved = false;
    for (let col = 0; col < BOARD_SIZE; col++) {
      for (let row = BOARD_SIZE - 2; row >= 0; row--) {
        if (newBoard[row][col] !== 0) {
          let currentRow = row;
          while (currentRow < BOARD_SIZE - 1 && newBoard[currentRow + 1][col] === 0) {
            newBoard[currentRow + 1][col] = newBoard[currentRow][col];
            newBoard[currentRow][col] = 0;
            currentRow++;
            moved = true;
          }

          if (
            currentRow < BOARD_SIZE - 1 &&
            newBoard[currentRow + 1][col] === newBoard[currentRow][col]
          ) {
            newBoard[currentRow + 1][col] *= 2;
            newBoard[currentRow][col] = 0;
            moved = true;
          }
        }
      }
    }
    return moved;
  };

  const moveLeft = (newBoard: Board) => {
    let moved = false;
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 1; col < BOARD_SIZE; col++) {
        if (newBoard[row][col] !== 0) {
          let currentCol = col;
          while (currentCol > 0 && newBoard[row][currentCol - 1] === 0) {
            newBoard[row][currentCol - 1] = newBoard[row][currentCol];
            newBoard[row][currentCol] = 0;
            currentCol--;
            moved = true;
          }

          if (
            currentCol > 0 &&
            newBoard[row][currentCol - 1] === newBoard[row][currentCol]
          ) {
            newBoard[row][currentCol - 1] *= 2;
            newBoard[row][currentCol] = 0;
            moved = true;
          }
        }
      }
    }
    return moved;
  };

  const moveRight = (newBoard: Board) => {
    let moved = false;
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = BOARD_SIZE - 2; col >= 0; col--) {
        if (newBoard[row][col] !== 0) {
          let currentCol = col;
          while (currentCol < BOARD_SIZE - 1 && newBoard[row][currentCol + 1] === 0) {
            newBoard[row][currentCol + 1] = newBoard[row][currentCol];
            newBoard[row][currentCol] = 0;
            currentCol++;
            moved = true;
          }

          if (
            currentCol < BOARD_SIZE - 1 &&
            newBoard[row][currentCol + 1] === newBoard[row][currentCol]
          ) {
            newBoard[row][currentCol + 1] *= 2;
            newBoard[row][currentCol] = 0;
            moved = true;
          }
        }
      }
    }
    return moved;
  };

  const isGameOver = (newBoard: Board) => {
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (
          newBoard[row][col] === 0 ||
          (row > 0 && newBoard[row][col] === newBoard[row - 1][col]) ||
          (row < BOARD_SIZE - 1 && newBoard[row][col] === newBoard[row + 1][col]) ||
          (col > 0 && newBoard[row][col] === newBoard[row][col - 1]) ||
          (col < BOARD_SIZE - 1 && newBoard[row][col] === newBoard[row][col + 1])
        ) {
          return false;
        }
      }
    }
    return true;
  };

  return { board, initializeGame, handleSwipe };
};

export default useGameLogic;
