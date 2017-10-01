import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

export class InitPlayersScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currInput: 'New Player',
      players: [],
      scores: {}
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Add Players'
    };
  };

  render() {
    const { navigate, state } = this.props.navigation;

    return (
      <View style={{flex: 1}}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          value={this.state.currInput}
          onChangeText={
            (text) => {
              this.setState({
                currInput: text
              });
            }
          }
          onSubmitEditing={
            (event) => {
              var newPlayer = event.nativeEvent.text;
              var newScores = this.state.scores;
              newScores[newPlayer] = 0;
              this.setState({
                currInput: '',
                players: this.state.players.concat([{key: newPlayer}]),
                scores: newScores
              });
            }
          }
        />
        <FlatList
          data={ this.state.players }
          renderItem={({item}) => <Text>{item.key}</Text>}
        />
        <View>
          <Button
            title={(this.state.players.length < 4) ? 'Start' : `Start (${~~(60/this.state.players.length)} Rounds)`}
            disabled={(this.state.players.length < 4) ? true : false}
            backgroundColor='#2962FF'
            fontSize={24}
            onPress={() => navigate('Round', {
              roundNum: 1,
              tot_round: ~~(60/this.state.players.length),
              players: this.state.players,
              scores: this.state.scores,
            })}
          />
        </View>
      </View>
    );
  }
}
