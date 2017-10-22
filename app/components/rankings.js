import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Button, Card } from 'react-native-elements';

export default class Rankings extends Component {
  _renderItem(item) {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        padding: 8
      }}>
        <View style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: 'black'
          }}>
            {item.name}
          </Text>
        </View>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end'
        }}>
          <Text style={{
            fontSize: 12,
            color: 'gray'
          }}>
            {item.score}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    var sortedPlayers = [];
    for (var i = 0; i < this.props.players.length; ++i) {
      sortedPlayers.push({ ...this.props.players[i] });
    }
    sortedPlayers.sort((lhs, rhs) => {
      return rhs.score - lhs.score;
    });

    return (
      <FlatList
        data={ sortedPlayers }
        renderItem={({item}) => this._renderItem(item) }
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
    );
  }
}
