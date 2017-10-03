import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

export class PlayerHit extends Component {
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
            {this.props.name}
          </Text>
          <Text>
            {
              this.props.score + ((this.props.hit === this.props.bet) ?
                (20 + 10*this.props.hit) : (-10 * Math.abs(this.props.bet - this.props.hit)))
            }
          </Text>
        </View>

        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <Button
            color='#4CAF50'
            icon={{
              name: 'add-circle'
            }}
            onPress={() => this.props.onIncHit(this.props.playerId)}
          />
          <Text>
            {this.props.hit}
          </Text>
          <Button
            icon={{
              name: 'remove-circle'
            }}
            color='#F44336'
            onPress={() => this.props.onDecHit(this.props.playerId)}
          />
        </View>
      </View>
    );
  }
}
