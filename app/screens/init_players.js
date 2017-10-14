import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import FAB from 'react-native-fab';
import { ListItem } from '../components/list_item.js';

export class InitPlayersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currInput: '',
      players: [],
      totalRounds: null,
    };
  }

  static navigationOptions = {
    title: 'Add Players',
    headerLeft: null,
  };

  _renderItem({ item }) {
    return (
      <Text style={{
        flex: 1,
        textAlign: 'center',
        fontSize: 24,
        color: 'black',
        margin: 4,
      }}>
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
          autoCapitalize='words'
          autoCorrect={false}
          returnKeyType='done'
          placeholder={(this.state.players.length === 0) ? 'Enter the first dealer' : 'Enter the next dealer'}
          onChangeText={
            (text) => {
              this.setState({
                currInput: text
              });
            }
          }
          onSubmitEditing={
            (event) => {
              var name = event.nativeEvent.text.trim();
              if (name === '') {
                return;
              }

              var newPlayer = {
                id: (this.state.players.length === 0) ? 0 : this.state.players[this.state.players.length - 1].id + 1,
                name: name,
              };

              this.setState({
                currInput: '',
                players: this.state.players.concat([newPlayer]),
                totalRounds: ~~(60/(this.state.players.length+1)),
              });
            }
          }
        />
        <FlatList
          data={ this.state.players }
          renderItem={this._renderItem}
          renderSeparator={() => {
            return (
              <View
                style={{
                  height: 1,
                  backgroundColor: '#CED0CE',
                }}
              />
            );
          }}
          keyExtractor={(item, index) => { return item.id; }}
        />
        <Text style={{
          textAlign: 'center',
          fontSize: 12,
          color: 'gray',
          marginBottom: 4,
        }}>
          {(this.state.players.length >= minPlayerNum) ? `${this.state.totalRounds} rounds in total` : 'Add players to start the game'}
        </Text>

        <FAB
          buttonColor='red'
          iconTextColor='#FFFFFF'
          onClickAction={() => navigate('Round', {
            currRound: 0,
            totalRounds: this.state.totalRounds,
            players: this.state.players,
          })}
          visible={ (this.state.players.length >= minPlayerNum) ? true : false }
          iconTextComponent={
            <Text>Go!</Text>
          }
        />
      </View>
    );
  }
}
