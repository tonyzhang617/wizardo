import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

export class PlayerBet extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <View style={{
          flex: 0.5,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
          }}>
            { this.props.name }
          </Text>
          <Text>
            { this.props.score }
          </Text>
        </View>

        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <Button
            icon={{name: 'add-circle'}}
            onPress={() => this.props.onIncBet(this.props.index)}
          />
          <Text>
            {this.props.bet}
          </Text>
          <Button
            icon={{name: 'remove-circle'}}
            onPress={() => this.props.onDecBet(this.props.index)}
          />
        </View>
      </View>
    );
  }
}
