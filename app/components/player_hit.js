import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Card, Badge } from 'react-native-elements';
import IconButton from './icon_button.js';

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitleText: {
    fontSize: 16,
    color: 'black',
  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  gain: {
    backgroundColor: 'green',
  },
  lose: {
    backgroundColor: 'red',
  },
  plusPointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  minusPointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  roundedCorners: {
    borderRadius: 4
  },
  fixedShortWidth: {
    width: 24,
  },
  fixedLongWidth: {
    width: 48,
  }
});

export class PlayerHit extends Component {
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
        <View style={
          styles.columnContainer
        }>
          <Text style={ styles.titleText }>
            {this.props.name}
          </Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
            <Text style={
              styles.subtitleText, {
                marginRight: 4,
                fontWeight: 'bold',
              }}>
              {this.props.score}
            </Text>
            <Badge
              value={ `${(this.props.gain > 0) ? '+' : ''}${this.props.gain}` }
              textStyle={styles.subtitleText, {
                color: 'white'
              }}
              containerStyle={
                (this.props.gain > 0) ? styles.gain : styles.lose
              }>
            </Badge>
          </View>
        </View>

        <View style={
          styles.columnContainer,
          { flex: 1 }}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
            <IconButton
              icon='remove'
              color='red'
              onPress={() => this.props.onDecHit(this.props.index)} />
              <Text style={{
                textAlign: 'center',
                fontSize: 16,
                color: 'black',
                width: 56
              }}>
                {`${this.props.hit} / ${this.props.bet}`}
              </Text>
            <IconButton
              icon='add'
              color='green'
              onPress={() => this.props.onIncHit(this.props.index)} />
          </View>
        </View>
      </View>
    );
  }
}
