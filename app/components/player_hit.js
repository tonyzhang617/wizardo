import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

export class PlayerHit extends Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text>
          {this.props.name}
        </Text>
        <Button
          icon={{name: 'add-circle'}}
          onPress={() => this.props.onIncBet(this.props.playerId)}
        />
        <Text>
          {this.props.bet}
        </Text>
        <Button
          icon={{name: 'remove-circle'}}
          onPress={() => this.props.onDecBet(this.props.playerId)}
        />
      </View>
    );
  }
}
