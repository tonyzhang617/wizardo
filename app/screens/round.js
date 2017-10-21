import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ListView, Text, TextInput } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { PlayerBet } from '../components/player_bet.js';
import SideMenu from 'react-native-side-menu';

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
      totalBets: 0,
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
            totalBets: this.state.totalBets+1,
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
            totalBets: this.state.totalBets-1,
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
    var lastPlayer = this.state.players[this.state.players.length-1];
    var cannotBet = this.state.currRound + 1 - this.state.totalBets + lastPlayer.bet;

    return (
      <SideMenu menu={<Text>hello world</Text>}>
        <View style={{
          flex: 1,
          flexDirection: 'column'
        }}>
          <FlatList
            data={this.state.players}
            renderItem={this._renderItem}
            keyExtractor={item => item.id}
          />
          <Text style={{
            textAlign: 'center',
            fontSize: 12,
            color: 'gray',
            marginBottom: 4,
          }}>
            {`${this.state.totalBets} bet(s) in total. ${(cannotBet < 0) ? lastPlayer.name+' can bet anything.' : lastPlayer.name+' cannot bet ' + cannotBet + '.'}`}
          </Text>
          <Button
            title='Place Bets'
            fontSize={24}
            disabled={ (lastPlayer.bet === cannotBet) ? true : false }
            raised
            buttonStyle={{ backgroundColor: 'red', borderRadius: 4 }}
            textStyle={{textAlign: 'center'}}
            onPress={this._finalize.bind(this)}
          />
        </View>
      </SideMenu>
    );
  }
}
