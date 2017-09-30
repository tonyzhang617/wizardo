import React from 'react';
import {
  AppRegistry
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { InitPlayersScreen } from './app/screens/init_players.js';
import { RoundScreen } from './app/screens/round.js'

export default Wizardo = StackNavigator({
  Home: { screen: InitPlayersScreen },
  Round: { screen: RoundScreen }
});

AppRegistry.registerComponent('Wizardo', () => Wizardo);
