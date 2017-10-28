import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, Image, TextInput, Button } from 'react-native';
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
      <Image
        source={require('../../assets/wizard-bg.png')}
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          width: undefined,
          height: undefined,
          flexDirection: 'column',
        }}
        resizeMode="contain">
        <FlatList
          data={this.state.players}
          renderItem={this._renderItem}
          keyExtractor={item => {
            return item.id;
          }}
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
        />
      </Image>
    );
  }
}
