import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { PlayerBet } from '../components/player_bet.js';

export class RoundScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: `Round ${navigation.state.params.roundNum}`,
  });

  componentWillMount() {
    const { params } = this.props.navigation.state;

    if (params.rounds.length >= params.roundNum) {
      // load round
      var round = params.rounds[params.roundNum-1];
      // TODO: update scores
      var tb = round.reduce((sum, item) => {
        return sum + item.bet;
      }, 0);
      this.setState({
        currRound: round,
        roundNum: params.roundNum,
        totalBets: tb,
      });

      console.log(`Round ${params.roundNum} loaded`);
    } else {
      // initialize round
      var newRound = params.players.map((item, index) => {
        return {
          name: item.name,
          index: index,
          bet: 0,
          hit: 0,
          score: (params.roundNum === 1) ? 0 : (params.rounds[params.roundNum - 2][index].score),
        };
      });

      this.setState({
        currRound: newRound,
        roundNum: params.roundNum,
        // totalRounds: params.totalRounds,
        totalBets: 0,
      });

      console.log(`Round ${params.roundNum} initialized`);
    }
  }

  _onIncBet = (idx: number) => {
    var newPlayers = this.state.currRound.slice();
    var newTotal = this.state.totalBets;
    for (var i = 0; i < newPlayers.length; ++i) {
      if (newPlayers[i].index === idx) {
        if (newPlayers[i].bet < this.state.roundNum) {
          newPlayers[i].bet += 1;
          newTotal += 1;
        }
        break;
        // TODO: implement can't bet if total bets is round number
      }
    }

    this.setState({
      currRound: newPlayers,
      totalBets: newTotal,
    });
  }

  _onDecBet = (idx: number) => {
    var newPlayers = this.state.currRound.slice();
    var newTotal = this.state.totalBets;
    for (var i = 0; i < newPlayers.length; ++i) {
      if (newPlayers[i].index === idx) {
        if (newPlayers[i].bet > 0) {
          newPlayers[i].bet -= 1;
          newTotal -= 1;
        }
        break;
      }
    }

    this.setState({
      currRound: newPlayers,
      totalBets: newTotal,
    });
  }

  _renderItem = ({item}) => {
    return (
      <PlayerBet
        index={item.index}
        name={item.name}
        bet={item.bet}
        score={item.score}
        onIncBet={this._onIncBet}
        onDecBet={this._onDecBet}
      />
    );
  };

  _finalize() {
    const { state, navigate } = this.props.navigation;

    var newRounds = state.params.rounds.slice();
    newRounds[this.state.roundNum-1] = this.state.currRound;

    navigate('RoundResult', {
      rounds: newRounds,
      players: state.params.players,
      roundNum: this.state.roundNum,
      totalRounds: state.params.totalRounds,
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.state.currRound}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.index}
        />
        <Button
          title='Place Bets'
          backgroundColor='#F44336'
          fontSize={24}
          onPress={this._finalize.bind(this)}
        />
      </View>
    );
  }
}
