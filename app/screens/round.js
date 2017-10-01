import React, { Component } from 'react';
import { View } from 'react-native';

export class RoundScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: `Round ${navigation.state.params.roundNum}`,
  });
  render() {

    const { params } = this.props.navigation.state;

    console.log(params.scores);

    return (
      <View>
      </View>
    );
  }
}
