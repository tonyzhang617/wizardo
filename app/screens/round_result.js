import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { PlayerHit } from '../components/player_hit.js';

export class RoundResultScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Round ${navigation.state.params.currRound+1} Result`
  });

  componentWillMount() {
    const { params } = this.props.navigation.state;

    var totalHits = 0;
    var newPlayers = params.players.map(item => {
      totalHits += item.bet;
      return {
        name: item.name,
        id: item.id,
        bet: item.bet,
        hit: item.bet,
        gain: 20 + 10*item.bet,
        score: item.score,
      };
    });

    this.setState({
      players: newPlayers,
      currRound: params.currRound,
      totalRounds: params.totalRounds,
      totalHits: totalHits,
    });
  }

  _onIncHit = (id: number) => {
    var players = this.state.players.slice();
    for (var i = 0; i < players.length; ++i) {
      if (players[i].id === id) {
        if (players[i].hit <= this.state.currRound) {
          players[i].hit += 1;
          players[i].gain = (players[i].hit === players[i].bet) ? (20 + 10*players[i].hit) : (-10 * Math.abs(players[i].bet - players[i].hit));
          this.setState({
            players: players,
            totalHits: this.state.totalHits+1,
          });
          return;
        }
      }
    }
  }

  _onDecHit = (id: number) => {
    var players = this.state.players.slice();
    for (var i = 0; i < players.length; ++i) {
      if (players[i].id === id) {
        if (players[i].hit > 0) {
          players[i].hit -= 1;
          players[i].gain = (players[i].hit === players[i].bet) ? (20 + 10*players[i].hit) : (-10 * Math.abs(players[i].bet - players[i].hit));
          this.setState({
            players: players,
            totalHits: this.state.totalHits-1,
          });
          return;
        }
      }
    }
  }

  _renderItem({ item }) {
    return (
      <PlayerHit
        index={ item.id }
        name={ item.name }
        hit={ item.hit }
        bet={ item.bet }
        gain={ item.gain }
        score={ item.score }
        onIncHit={this._onIncHit}
        onDecHit={this._onDecHit}
      />
    );
  }

  _nextRound() {
    const { navigate } = this.props.navigation;

    var newPlayers = [];
    for (var i = 0; i < this.state.players.length; ++i) {
      var tmpPlayer = { ... this.state.players[i] };
      tmpPlayer.score += tmpPlayer.gain;
      newPlayers.push(tmpPlayer);
    }

    if (this.state.currRound === this.state.totalRounds-1) {
      navigate('Result', {
        // TODO
        players: this.state.players,
      });
    } else {
      navigate('Round', {
        players: newPlayers,
        currRound: this.state.currRound+1,
        totalRounds: this.state.totalRounds,
      });
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.state.players}
          renderItem={this._renderItem.bind(this)}
          keyExtractor={item => { return item.id; }}
        />
        <Text style={{
          textAlign: 'center',
          fontSize: 12,
          color: 'gray',
          marginBottom: 4,
        }}>
          {`${this.state.totalHits} win(s) in total.`}
        </Text>
        <Button
          title={(this.state.currRound === this.state.totalRounds-1) ? 'Finish Game' : 'Start Next Round'}
          disabled={(this.state.totalHits !== this.state.currRound+1) ? true : false}
          fontSize={24}
          raised
          buttonStyle={{ backgroundColor: 'red', borderRadius: 4 }}
          textStyle={{textAlign: 'center'}}
          onPress={this._nextRound.bind(this)}
        />
      </View>
    );
  }
}
