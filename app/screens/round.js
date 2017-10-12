import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ListView, Text, TextInput } from 'react-native';
import { Button, Card } from 'react-native-elements';
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
        rounds: params.rounds,
        totalRounds: params.totalRounds,
      });

      console.log(`Round ${params.roundNum} loaded`);
    } else {
      // initialize round
      var newRound = null;
      if (params.roundNum === 1) {
        newRound = params.players.map((item, index) => {
          return {
            name: item.name,
            index: index,
            bet: 0,
            hit: 0,
            score: (params.roundNum === 1) ? 0 : (params.rounds[params.roundNum - 2][index].score),
          };
        });
      } else {
        newRound = params.rounds[params.roundNum-2].map((item, index) => {
          return {
            name: item.name,
            index: item.index,
            bet: 0,
            hit: 0,
            score: item.score,
        }});
      }

      this.setState({
        currRound: newRound,
        roundNum: params.roundNum,
        totalBets: 0,
        rounds: params.rounds,
        totalRounds: params.totalRounds,
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
    const { navigate } = this.props.navigation;

    var newRounds = this.state.rounds.slice();
    newRounds[this.state.roundNum-1] = this.state.currRound;

    navigate('RoundResult', {
      rounds: newRounds,
      roundNum: this.state.roundNum,
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
          data={this.state.currRound}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.index}
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
