'use strict';

import React, {
  StyleSheet,
  Component,
  TouchableHighlight,
  ScrollView,
  View,
  Text
} from 'react-native';
import {bindActionCreators} from 'redux';
import {load} from '../modules/list';
import { connect } from 'react-redux';
import {brandColor} from '../config';

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  onBackClick = () => {
    this.props.pop();
  };

  render() {
    const { title = '你懂的', backable = true } = this.props;
    return (
      <View style={styles.container}>
        {backable && <TouchableHighlight style={styles.back} underlayColor="#efefef" onPress={this.onBackClick}>
          <Text >
            {'<'}
          </Text>
        </TouchableHighlight>}
        <View style={styles.center}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </View>
    );
  }
}

export default Nav;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 48,
    backgroundColor: brandColor,
    alignItems: 'center',
  },
  center: {
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  back: {
    paddingLeft: 12,
    paddingRight: 12,
    height: 48,
    paddingTop: 12,
    alignItems: 'center',
  }
});
