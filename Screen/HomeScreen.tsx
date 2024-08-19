import React, { useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Animated, Dimensions } from 'react-native';

function HomeScreen({ navigation }: { navigation: any }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.titleContainer, 
          { 
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <Text style={styles.title}>Welcome to 2048</Text>
      </Animated.View>
      <Animated.View 
        style={[
          styles.buttonContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <Button
          title="Let's Play 2048"
          onPress={() => navigation.navigate('Game')}
          color="#4CAF50"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  titleContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default HomeScreen;
