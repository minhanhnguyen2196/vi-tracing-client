/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Easing, Animated} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Scan from './src/components/Scan';
import ProductDetail from './src/components/ProductDetail'

const AppStack = createStackNavigator({
  Scan,
  ProductDetail
}, {
    initialRouteName: 'Scan',
    navigationOptions: {
      header: null
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 700,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps
        const thisSceneIndex = scene.index
        const width = layout.initWidth

        const translateX = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex],
          outputRange: [width, 0],
        })

        return { transform: [{ translateX }] }
      }
    })
  })



export default class App extends Component {
  render() {
    return (
      <AppStack />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
