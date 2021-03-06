import React from 'react';
import {
  AppRegistry
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { InitPlayersScreen } from './app/screens/init_players.js';
import { RoundScreen } from './app/screens/round.js';
import { RoundResultScreen } from './app/screens/round_result.js';
import { ResultScreen } from './app/screens/result.js';

export default Wizardo = StackNavigator({
  Home: { screen: InitPlayersScreen },
  Round: { screen: RoundScreen },
  RoundResult: { screen: RoundResultScreen },
  Result: { screen: ResultScreen },
});

AppRegistry.registerComponent('Wizardo', () => Wizardo);
