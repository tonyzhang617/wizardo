import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-elements';

export class ListItem extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: 8
        }}>
        <View style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 24,
            color: 'black'
          }}>
            {this.props.title}
          </Text>
        </View>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
          <Text style={{
            fontSize: 16,
            color: 'gray'
          }}>
            {this.props.subtitle}
          </Text>
        </View>
      </View>
    );
  }
}

ListItem.defaultProps = {
  title: '',
  subtitle: '',
};
