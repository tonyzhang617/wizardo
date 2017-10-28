import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-elements';
import IconButton from './icon_button.js';

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitleText: {
    fontSize: 16,
    color: 'gray',
  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  roundedCorners: {
    borderRadius: 4
  },
  fixedWidth: {
    width: 24,
  }
});

export class PlayerBet extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: 8,
        }}>
        <Text style={
          styles.titleText
        }>
          { this.props.name }
        </Text>
        <View style={
          styles.columnContainer,
          { flex: 1 }
        }>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
            <IconButton
              icon='remove'
              color='red'
              onPress={() => this.props.onDecBet(this.props.index)} />
              <Text style={{
                textAlign: 'center',
                width: 48,
                fontSize: 16,
                color: 'black'
              }}>
                {this.props.bet}
              </Text>
            <IconButton
              icon='add'
              color='green'
              onPress={() => this.props.onIncBet(this.props.index)} />
          </View>
        </View>
      </View>
    );
  }
}
