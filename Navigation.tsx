import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../newApp/Screen/HomeScreen';
import GameScreen from '../newApp/Screen/GameScreen';

const Stack = createStackNavigator();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '2048 Home' }} />
        <Stack.Screen name="Game" component={GameScreen} options={{ title: '2048 Game' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
