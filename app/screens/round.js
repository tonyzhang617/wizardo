import React, { Component } from 'react';
import { View } from 'react-native';

export class RoundScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasInit: false,
    };
  }

  static navigationOptions = ({navigation}) => ({
    title: `Round ${navigation.state.params.roundNum}`,
  });

  componentWillMount() {
    const { state, setParams } = this.props.navigation;

    var newPlayers = state.params.players;
    var dealer = newPlayers.shift();
    newPlayers.push(dealer);

    setParams({
      players: newPlayers
    });

    console.log(`Round ${state.params.roundNum} initialized`);
  }

  render() {
    const { state, setParams } = this.props.navigation;

    return (
      <View>
      </View>
    );
  }
}
