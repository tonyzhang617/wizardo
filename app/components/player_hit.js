import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Card, Badge } from 'react-native-elements';

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
    margin: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rowContainer: {
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    borderRadius: 8,
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
      <Card
        flexDirection='row'
        containerStyle={
          styles.roundedCorners
        }>
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
            margin: 4,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
            <Button
              raised
              icon={{ name: 'remove-circle', size: 24 }}
              buttonStyle={{ backgroundColor: 'red', borderRadius: 4 }}
              textStyle={{textAlign: 'center'}}
              onPress={() => this.props.onDecHit(this.props.index)} />
            <View style={ styles.fixedLongWidth }>
              <Text style={{
                textAlign: 'center',
                fontSize: 16,
                color: 'black',
              }}>
                {`${this.props.hit} / ${this.props.bet}`}
              </Text>
            </View>
            <Button
              raised
              icon={{ name: 'add-circle', size: 24 }}
              buttonStyle={{ backgroundColor: 'green', borderRadius: 4 }}
              textStyle={{textAlign: 'center'}}
              onPress={() => this.props.onIncHit(this.props.index)} />
          </View>
        </View>
      </Card>
    );
  }
}
