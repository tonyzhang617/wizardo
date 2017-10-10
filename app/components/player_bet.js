import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-elements';

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  columnContainer: {
    margin: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export class PlayerBet extends Component {
  render() {
    return (
      <Card flexDirection='row'>
        <View style={
          styles.columnContainer
        }>
          <Text style={ styles.titleText }>
            { this.props.name }
          </Text>
        </View>
        <View style={
          styles.columnContainer,
          { flex: 1 }
        }>
          <View style={
            styles.rowContainer
          }>
            <Button
              icon={{name: 'add-circle'}}
              onPress={() => this.props.onIncBet(this.props.index)}
            />
            <Text>
              {this.props.bet}
            </Text>
            <Button
              icon={{name: 'remove-circle'}}
              onPress={() => this.props.onDecBet(this.props.index)}
            />
          </View>
        </View>
      </Card>
    );

    // return (
    //   <View style={{
    //     flex: 1,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //   }}>
    //     <View style={{
    //       flex: 0.5,
    //       flexDirection: 'column',
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //     }}>
    //       <Text style={{
    //         fontSize: 20,
    //         fontWeight: 'bold',
    //       }}>
    //         { this.props.name }
    //       </Text>
    //       <Text>
    //         { this.props.score }
    //       </Text>
    //     </View>
    //
    //     <View style={{
    //       flex: 1,
    //       flexDirection: 'row',
    //       justifyContent: 'flex-end',
    //       alignItems: 'center'
    //     }}>
    //       <Button
    //         icon={{name: 'add-circle'}}
    //         onPress={() => this.props.onIncBet(this.props.index)}
    //       />
    //       <Text>
    //         {this.props.bet}
    //       </Text>
    //       <Button
    //         icon={{name: 'remove-circle'}}
    //         onPress={() => this.props.onDecBet(this.props.index)}
    //       />
    //     </View>
    //   </View>
    // );
  }
}
