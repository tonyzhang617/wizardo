import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

export class ResultScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Results',
  });

  componentWillMount() {
    const { params } = this.props.navigation.state;

    this.setState({
      players: params.players,
    });
  }

  _renderItem({ item }) {

    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 48
      }}>
        <Text style={{
          fontWeight: 'bold',
        }}>
          {item.name}
        </Text>
        <Text>
          {item.score}
        </Text>
      </View>
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
