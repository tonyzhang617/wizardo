import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { PlayerBet } from '../components/player_bet.js';

export class RoundScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      players: [],
      roundNum: 0,
      totalRounds: 0,
      totalBets: 0,
    };
  }

  static navigationOptions = ({navigation}) => ({
    title: `Round ${navigation.state.params.roundNum}`,
  });

  componentWillMount() {
    const { state } = this.props.navigation;

    var newPlayers = state.params.players;
    var dealer = newPlayers.shift();
    newPlayers.push(dealer);

    newPlayers.forEach((item) => {
      item.bet = 0;
      item.hit = 0;
    });

    this.setState({
      players: newPlayers,
      roundNum: state.params.roundNum,
      totalRounds: state.params.totalRounds,
      totalBets: 0,
    });

    console.log(`Round ${state.params.roundNum} initialized`);
  }

  componentWillUpdate() {
    console.log('Round Screen updated');
  }

  _onIncBet = (playerId: number) => {
    var newPlayers = this.state.players.slice();
    for (var i = 0; i < newPlayers.length; ++i) {
      if (newPlayers[i].key === playerId) {
        if (newPlayers[i].bet < this.state.roundNum) {
          newPlayers[i].bet += 1;
        }
        // TODO: implement can't bet if total bets is round number
        break;
      }
    }

    this.setState({
      players: newPlayers
    });
  }

  _onDecBet = (playerId: number) => {
    var newPlayers = this.state.players.slice();
    for (var i = 0; i < newPlayers.length; ++i) {
      if (newPlayers[i].key === playerId) {
        if (newPlayers[i].bet > 0) {
          newPlayers[i].bet -= 1;
        }
        break;
      }
    }

    this.setState({
      players: newPlayers
    });
  }

  _renderItem = ({item}) => {
    console.log(item);
    return (
      <PlayerBet
        playerId={item.key}
        name={item.name}
        bet={item.bet}
        score={item.score}
        onIncBet={this._onIncBet}
        onDecBet={this._onDecBet}
      />
    );
  };

  _finalize() {
    const { navigate } = this.props.navigation;

    navigate('RoundResult', {
      players: this.state.players,
      roundNum: this.state.roundNum,
      totalRounds: this.state.totalRounds,
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.state.players}
          renderItem={this._renderItem}
        />
        <Button
          title='Finalize'
          backgroundColor='#F44336'
          fontSize={24}
          onPress={this._finalize.bind(this)}
        />
      </View>
    );
  }
}
