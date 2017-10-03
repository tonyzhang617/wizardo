import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { PlayerHit } from '../components/player_hit.js';

export class RoundResultScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      roundNum: 0,
      totalRounds: 0,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: `Round ${navigation.state.params.roundNum} Result`,
  });

  componentWillMount() {
    const { params } = this.props.navigation.state;

    var newPlayers = params.players.slice();
    newPlayers.forEach((player) => {
      player.hit = player.bet;
    });

    this.setState({
      players: newPlayers,
      roundNum: params.roundNum,
      totalRounds: params.totalRounds,
    });
  }

  _onIncHit = (playerId: number) => {
    var newPlayers = this.state.players.slice();
    for (var i = 0; i < newPlayers.length; ++i) {
      if (newPlayers[i].key === playerId) {
        if (newPlayers[i].hit < this.state.roundNum) {
          newPlayers[i].hit += 1;
        }
        break;
      }
    }

    this.setState({
      players: newPlayers
    });
  }

  _onDecHit = (playerId: number) => {
    var newPlayers = this.state.players.slice();
    for (var i = 0; i < newPlayers.length; ++i) {
      if (newPlayers[i].key === playerId) {
        if (newPlayers[i].hit > 0) {
          newPlayers[i].hit -= 1;
        }
        break;
      }
    }

    this.setState({
      players: newPlayers
    });
  }

  _renderItem({ item }) {
    return (
      <PlayerHit
        onIncHit={this._onIncHit}
        onDecHit={this._onDecHit}
        playerId={ item.key }
        name={ item.name }
        hit={ item.hit }
        bet={ item.bet }
        score={ item.score }
      />
    );
  }

  _nextRound() {
    var newPlayers = this.state.players.slice();
    newPlayers.forEach((item) => {
      item.score += ((item.hit === item.bet)) ? (20 + 10*item.hit) : (-10 * Math.abs(item.bet - item.hit));
    });

    const { navigate } = this.props.navigation;

    if (this.state.roundNum === this.state.totalRounds) {
      navigate('FinalResult', {
        players: newPlayers,
      });
    } else {
      navigate('Round', {
        players: newPlayers,
        roundNum: this.state.roundNum+1,
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
          renderSeparator={() => {
            return (
              <View
                style={{
                  height: 1,
                  backgroundColor: "#CED0CE",
                }}
              />
            );}
          }
        />
        <Button
          title='Start Next Round'
          backgroundColor='#F44336'
          fontSize={24}
          onPress={this._nextRound.bind(this)}
        />
      </View>
    );
  }
}
