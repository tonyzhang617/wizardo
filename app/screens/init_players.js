import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

export class InitPlayersScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currInput: 'New Player',
      players: []
    };
  }

  static navigationOptions = {
    title: 'Add Players'
  };

  _renderItem({ item }) {
    return (
      <Text>
        {item.name}
      </Text>
    );
  }

  render() {
    const { navigate } = this.props.navigation;

    const minPlayerNum = 2;

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

              var newPlayer = {
                key: this.state.players.length,
                name: event.nativeEvent.text,
                bet: 0,
                score: 0,
              };

              this.setState({
                currInput: '',
                players: this.state.players.concat([newPlayer]),
              });
            }
          }
        />
        <FlatList
          data={ this.state.players }
          renderItem={this._renderItem}
        />
        <View>
          <Button
            title={(this.state.players.length < minPlayerNum) ? 'Start' : `Start (${~~(60/this.state.players.length)} Rounds)`}
            disabled={(this.state.players.length < minPlayerNum) ? true : false}
            backgroundColor='#2962FF'
            fontSize={24}
            onPress={() => navigate('Round', {
              roundNum: 1,
              tot_round: ~~(60/this.state.players.length),
              players: this.state.players,
            })}
          />
        </View>
      </View>
    );
  }
}
