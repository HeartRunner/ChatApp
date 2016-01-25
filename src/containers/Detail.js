// 等待实现

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

class Detail extends Component {
  constructor(props) {
    super(props);
    console.log('props', props);
  }
  onItemPress = (href) => {
    return () => {
      console.log(href);
    };
  };
  render() {
    const { loading, loaded, list } = this.props;

    return (
      <View style={styles.container}>
        <Text>等待实现</Text>
      </View>

    );
  }
}

export default connect(state => ({
  loading: state.list.loading,
  loaded: state.list.loaded,
}), {load})(Detail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
