import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

export default class IconButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
          width: 36,
          height: 36,
          backgroundColor: '#fff',
        }}
        onPress={this.props.onPress}>
        <Icon
          name={this.props.icon}
          size={24}
          color={this.props.color} />
      </TouchableOpacity>
    );
  }
}

IconButton.defaultProps = {
  icon: 'add',
  color: '#424242'
}

IconButton.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string
}
