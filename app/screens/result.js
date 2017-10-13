import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { ListItem } from '../components/list_item.js';

export class ResultScreen extends Component {

  static navigationOptions = {
    title: 'Results',
  };

  componentWillMount() {
    const { params } = this.props.navigation.state;

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
      }}>
        <FlatList
          data={this.state.players}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}
