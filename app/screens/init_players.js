import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

export class InitPlayersScreen extends Component {
  static navigationOptions = {
    title: 'Add Players'
  };
  render() {
    const navigate = this.props.navigation.navigate;

    return (
      <View>
        <Button
          onPress={() => navigate('Round')}
          title='New Screen'
        />
      </View>
    );
  }
}
