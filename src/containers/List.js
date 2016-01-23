'use strict';

import React, { StyleSheet, Component, TouchableHighlight, ScrollView, View, Text } from 'react-native';
import {bindActionCreators} from 'redux';
import {load} from '../modules/list';
import { connect } from 'react-redux';

// 不是最佳方法
import Detail from './Detail';

class List extends Component {
  constructor(props) {
    super(props);
  }

  onItemPress = (href) => {
    return () => {
      this.props.navigator.push(
        {
          title: '详情',
          component: Detail,
          passProps: {href},
        }
      )
    };
  };
  render() {
    const { loading, loaded, list } = this.props;

    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.props.load}>
          <Text style={styles.welcome}>LOAD</Text>
        </TouchableHighlight>
        <Text>{loading ? 'loading' : 'not loading'}</Text>
        <Text>{loaded ? 'loaded' : 'not loaded'}</Text>
        <ScrollView style={{flex: 1}}>
        {

          list.map( (text, index) =>{
            return <TouchableHighlight key={index} onPress={this.onItemPress(text.href)}>
              <Text style={styles.instructions}>{text.text}</Text>
            </TouchableHighlight>;
          })
        }
        </ScrollView>
      </View>

    );
  }
}

export default connect(state => ({
  loading: state.list.loading,
  loaded: state.list.loaded,
  list: state.list.list,
}), {load})(List);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#111',
    marginBottom: 5,
  },
});
