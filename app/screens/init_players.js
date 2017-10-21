import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import FAB from 'react-native-fab';
import Swipeout from 'react-native-swipeout';
import { ListItem } from '../components/list_item.js';

export class InitPlayersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currInput: '',
      players: [],
      totalRounds: null,
    };
    this._renderItem = this._renderItem.bind(this);
    this._removePlayer = this._removePlayer.bind(this);
  }

  static navigationOptions = {
    title: 'Add Players',
    headerLeft: null,
  };

  _removePlayer(id: number) {
    var newPlayers = this.state.players.filter((player) => {
      return player.id !== id;
    });
    this.setState({
      players: newPlayers,
    });
  }

  _renderItem(item) {
    return (
      <Swipeout style={{
        flex: 1,
        backgroundColor: 'transparent',
      }} right={[{
        text: 'Delete',
        type: 'delete',
        onPress: () => {
          this._removePlayer(item.id);
        }
      }]}>
        <Text style={{
          textAlign: 'center',
          fontSize: 24,
          color: 'black',
          padding: 8,
        }}>
          {item.name}
        </Text>
      </Swipeout>
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
          renderItem={({item}) => this._renderItem(item)}
          ItemSeparatorComponent={() => {
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
