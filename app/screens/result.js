import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput, Button } from 'react-native';
import { ListItem } from '../components/list_item.js';

export class ResultScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Results',
    headerRight: (
      <Button
        title='New Game'
        onPress={() => navigation.navigate('Home')} />
    ),
  });

  componentWillMount() {
    const { params } = this.props.navigation.state;

    params.players.sort((lhs, rhs) => {
      return rhs.score - lhs.score;
    });

    this.setState({
      players: params.players,
    });
  }

  _renderItem({ item }) {
    return (
      <ListItem title={item.name}
        subtitle={item.score} />
    );
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#E8EAF6'
      }}>
        <FlatList
          data={this.state.players}
          renderItem={this._renderItem}
          keyExtractor={item => {
            return item.id;
          }}
        />
      </View>
    );
  }
}
