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
          onPress={() => this.props.onIncHit(this.props.playerId)}
        />
        <Text>
          {this.props.hit}
        </Text>
        <Button
          icon={{name: 'remove-circle'}}
          onPress={() => this.props.onDecHit(this.props.playerId)}
        />
      </View>
    );
  }
}
