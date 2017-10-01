import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

export class PlayerBet extends Component {
  render() {
    console.log(this.props);
    return (
      <View>
        <Button
          title={this.props.name}
          onPress={() => this.props.onIncBet(this.props.name)}
        />
      </View>
    );
  }
}
