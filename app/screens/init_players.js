import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { ListItem } from '../components/list_item.js'

export class InitPlayersScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currInput: 'New Player',
      players: [],
      totalRounds: null,
    };
  }

  static navigationOptions = {
    title: 'Add Players'
  };

  _renderItem({ item }) {
    return (
      <ListItem title={item.name} />
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
                id: (this.state.players.length === 0) ? 0 : this.state.players[this.state.players.length - 1].id + 1,
                name: event.nativeEvent.text,
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
          keyExtractor={(item, index) => { return item.id; }}
        />
        <View>
          <Button
            title={(this.state.players.length < minPlayerNum) ? 'Start' : `Start (${this.state.totalRounds} Rounds)`}
            disabled={(this.state.players.length < minPlayerNum) ? true : false}
            fontSize={24}
            raised
            buttonStyle={{ backgroundColor: 'red', borderRadius: 4 }}
            textStyle={{textAlign: 'center'}}
            onPress={() => navigate('Round', {
              currRound: 0,
              totalRounds: this.state.totalRounds,
              players: this.state.players,
              rounds: [],
            })}
          />
        </View>
      </View>
    );
  }
}
