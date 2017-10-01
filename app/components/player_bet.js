import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

export class PlayerBet extends Component {
  render() {
    return (
      <View>
        <Text>
          {this.props.name}
        </Text>
        <Button
          icon={{name: 'add-circle'}}
          onPress={() => this.props.onIncBet(this.props.name)}
        />
        <Button
          icon={{name: 'remove-circle'}}
          onPress={() => this.props.onDecBet(this.props.name)}
        />
      </View>
    );
  }
}
