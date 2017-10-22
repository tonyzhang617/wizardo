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
    fontSize: 16,
    color: 'gray',
  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  roundedCorners: {
    borderRadius: 8
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
        }
        wrapperStyle={{
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}>
        <Text style={
          styles.titleText
        }>
          { this.props.name }
        </Text>
        <View style={
          styles.columnContainer,
          { flex: 1 }
        }>
          <View style={{
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
