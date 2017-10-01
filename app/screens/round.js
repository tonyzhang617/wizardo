import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { PlayerBet } from '../components/player_bet.js'

export class RoundScreen extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     bets: {}
  //   };
  // }

  static navigationOptions = ({navigation}) => ({
    title: `Round ${navigation.state.params.roundNum}`,
  });

  componentWillMount() {
    const { state, setParams } = this.props.navigation;

    var newPlayers = state.params.players;
    var dealer = newPlayers.shift();
    newPlayers.push(dealer);

    newPlayers.forEach((item) => {
      item.bet = 0;
    });

    setParams({
      players: newPlayers
    });

    console.log(`Round ${state.params.roundNum} initialized`);
  }

  _onIncBet = (name: string) => {
    // TODO
  }

  _onDecBet = (name: string) => {
    // TODO
  }

  _renderItem = ({item}) => {
    console.log(item);
    return (
      <PlayerBet
        name={item.name}
        bet={item.bet}
        score={item.score}
        onIncBet={this._onIncBet}
        onDecBet={this._onDecBet}
      />
    );
  };

  render() {
    const { state, setParams } = this.props.navigation;

    return (
      <View style={{flex: 1}}>
        <FlatList
          data={state.params.players}
          renderItem={this._renderItem}
        />
        <Button
          title='Finalize'
          backgroundColor='#F44336'
          fontSize={24}
        />
      </View>
    );
  }
}
