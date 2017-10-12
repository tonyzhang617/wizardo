import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { PlayerHit } from '../components/player_hit.js';

export class RoundResultScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Round ${navigation.state.params.roundNum} Result`
  });

  componentWillMount() {
    const { params } = this.props.navigation.state;

    // load round
    var round = params.rounds[params.roundNum-1].slice();
    var th = round.reduce((sum, item) => {
      return sum + item.hit;
    }, 0);
    round.forEach(item => {
      item.hit = item.bet;
    });

    this.setState({
      currRound: round,
      roundNum: params.roundNum,
      totalHits: th,
      rounds: params.rounds,
      totalRounds: params.totalRounds,
      isFinal: false,
    });

    console.log(`Round ${params.roundNum} results loaded`);
  }

  _onIncHit = (idx: number) => {
    var newPlayers = this.state.currRound.slice();
    for (var i = 0; i < newPlayers.length; ++i) {
      if (newPlayers[i].index === idx) {
        if (newPlayers[i].hit < this.state.roundNum) {
          newPlayers[i].hit += 1;
        }
        break;
      }
    }

    this.setState({
      currRound: newPlayers
    });
  }

  _onDecHit = (idx: number) => {
    var newPlayers = this.state.currRound.slice();
    for (var i = 0; i < newPlayers.length; ++i) {
      if (newPlayers[i].index === idx) {
        if (newPlayers[i].hit > 0) {
          newPlayers[i].hit -= 1;
        }
        break;
      }
    }

    this.setState({
      currRound: newPlayers
    });
  }

  _renderItem({ item }) {
    return (
      <PlayerHit
        index={ item.index }
        name={ item.name }
        hit={ item.hit }
        bet={ item.bet }
        points={ (item.hit === item.bet) ? (20 + 10*item.hit) : (-10 * Math.abs(item.bet - item.hit)) }
        score={ item.score }
        onIncHit={this._onIncHit}
        onDecHit={this._onDecHit}
        isFinal={this.state.isFinal}
      />
    );
  }

  _nextRound() {
    const { navigate } = this.props.navigation;

    if (!this.state.isFinal) {
      var newRounds = this.state.rounds.slice();
      newRounds[this.state.roundNum-1].forEach((item, index) => {
        item.score += (item.hit === item.bet) ? (20 + 10*item.hit) : (-10 * Math.abs(item.bet - item.hit));
      });

      this.setState({
        rounds: newRounds,
        isFinal: true,
      });
    }

    if (this.state.roundNum === this.state.totalRounds) {
      navigate('Result', {
        // TODO
        players: newRounds,
      });
    } else {
      navigate('Round', {
        rounds: this.state.rounds,
        roundNum: this.state.roundNum+1,
        totalRounds: this.state.totalRounds,
      });
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.state.currRound}
          renderItem={this._renderItem.bind(this)}
          keyExtractor={(item, index) => { return item.index; }}
        />
        <Button
          title='Start Next Round'
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
