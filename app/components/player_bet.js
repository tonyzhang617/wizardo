import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-elements';

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitleText: {
    fontSize: 12,
    color: 'gray',
  },
  columnContainer: {
    margin: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rowContainer: {
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundedCorners: {
    borderRadius: 8,
  },
  fixedWidth: {
    width: 24,
  }
});

export class PlayerBet extends Component {
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
            { this.props.name }
          </Text>
          <Text style={ styles.subtitleText }>
            { this.props.score }
          </Text>
        </View>
        <View style={
          styles.columnContainer,
          { flex: 1 }
        }>
          <View style={{
            margin: 8,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
            <Button
              disabled={ this.props.isFinal ? true : false }
              raised
              icon={{ name: 'remove-circle', size: 24 }}
              buttonStyle={{ backgroundColor: 'red', borderRadius: 4 }}
              textStyle={{textAlign: 'center'}}
              onPress={() => this.props.onDecBet(this.props.index)} />
              <View style={ styles.fixedWidth }>
                <Text style={{
                  textAlign: 'center',
                  fontSize: 16,
                  color: 'black'
                }}>
                  {this.props.bet}
                </Text>
              </View>
            <Button
              disabled={ this.props.isFinal ? true : false }
              raised
              icon={{ name: 'add-circle', size: 24 }}
              buttonStyle={{ backgroundColor: 'green', borderRadius: 4 }}
              textStyle={{textAlign: 'center'}}
              onPress={() => this.props.onIncBet(this.props.index)} />
          </View>
        </View>
      </Card>
    );
  }
}
