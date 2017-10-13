import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ListView, Text, TextInput } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { PlayerBet } from '../components/player_bet.js';

export class RoundScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: `Round ${navigation.state.params.currRound+1}`,
  });

  componentWillMount() {
    const { params } = this.props.navigation.state;

    var newPlayers = params.players.map(item => {
      return {
        name: item.name,
        id: item.id,
        bet: 0,
        score: ((params.currRound === 0) ? 0 : item.score),
      };
    });

    newPlayers.push(newPlayers.shift());

    this.setState({
      players: newPlayers,
      totalRounds: params.totalRounds,
      currRound: params.currRound,
    });
  }

  _onIncBet = (id: number) => {
    var players = this.state.players.slice();
    for (var i = 0; i < players.length; ++i) {
      if (players[i].id === id) {
        if (players[i].bet <= this.state.currRound) {
          players[i].bet += 1;
          this.setState({
            players: players,
          });
          return;
        }
      }
    }
  }

  _onDecBet = (id: number) => {
    var players = this.state.players.slice();
    for (var i = 0; i < players.length; ++i) {
      if (players[i].id === id) {
        if (players[i].bet > 0) {
          players[i].bet -= 1;
          this.setState({
            players: players,
          });
          return;
        }
      }
    }
  }

  _renderItem = ({item}) => {
    return (
      <PlayerBet
        index={item.id}
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

    var newPlayers = [];
    for (var i = 0; i < this.state.players.length; ++i) {
      newPlayers.push({ ... this.state.players[i] });
    }

    navigate('RoundResult', {
      players: newPlayers,
      currRound: this.state.currRound,
      totalRounds: this.state.totalRounds,
    });
  }

  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column'
      }}>
        <FlatList
          data={this.state.players}
          renderItem={this._renderItem}
          keyExtractor={item => item.id}
        />
        <Button
          title='Place Bets'
          fontSize={24}
          raised
          buttonStyle={{ backgroundColor: 'red', borderRadius: 4 }}
          textStyle={{textAlign: 'center'}}
          onPress={this._finalize.bind(this)}
        />
      </View>
    );
  }
}
