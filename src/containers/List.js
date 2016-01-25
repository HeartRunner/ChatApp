'use strict';

import React, { StyleSheet, Component, TouchableHighlight, ScrollView, View, Text } from 'react-native';
import {bindActionCreators} from 'redux';
import {load} from '../modules/list';
import { connect } from 'react-redux';

// 不是最佳方法
import Detail from './Detail';
import ListItem from '../components/ListItem';

class List extends Component {
  constructor(props) {
    super(props);
  }

  onItemPress = (href) => {
    return () => {
      this.props.navigator.push(
        {
          title: '详情',
          name: 'Detail',
          passProps: {href},
        }
      )
    };
  };
  render() {
    const { loading, loaded, list } = this.props;

    return (
      <View style={styles.container}>
        {loading && <Text style={styles.loading}>载入中.....</Text>}
        <ScrollView style={{flex: 1}}>
          {

            list.map( (item, index) =>{
              return <TouchableHighlight key={index} onPress={this.onItemPress(item.href)}>
                <Text style={styles.instructions}>{item.title}</Text>
              </TouchableHighlight>;
            })
          }
          <TouchableHighlight onPress={this.props.load}>
            <Text style={styles.loadText}>重新加载</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>

    );
  }
}

List.fetchData = function(getState, dispatch) {
  if (!getState().list.loaded) {
    dispatch(load());
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
  loading: {
    fontSize: 12,
    marginTop: 3,
  },
  loadText: {
    margin: 12,
  },
});
