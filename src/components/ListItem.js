'use strict';

import React, {
  StyleSheet,
  TouchableHighlight,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#E5F1F1',
  },
  instructions: {

  }
});

export default props => {
  return (<TouchableHighlight style={styles.item} onPress={props.onItemPress(props.href)}>
    <Text style={styles.instructions}>{props.title}</Text>
  </TouchableHighlight>);
};

