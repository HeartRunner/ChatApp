'use strict';

import React, {
  StyleSheet,
  Component,
  TouchableHighlight,
  ScrollView,
  View,
  Text,
  ListView,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {load} from '../modules/list';
import { connect } from 'react-redux';

// 不是最佳方法
import Detail from './Detail';
import ListItem from '../components/ListItem';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.list !== nextProps) {
      this.setState({dataSource: this.state.dataSource.cloneWithRows(nextProps.list.toJS())});
    }
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

  renderFooter = () => {
    return <TouchableHighlight onPress={this.props.load} style={styles.loadButton}>
          <Text style={styles.loadText}>重新加载</Text>
        </TouchableHighlight>;
  };

  renderList = (item) => {
    return <ListItem onItemPress={this.onItemPress} {...item} />
  };

  render() {
    const { loading, loaded, list } = this.props;

    return (
      <View style={styles.container}>
        {loading && <View style={styles.loading}><Text>载入中.....</Text></View>}
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderList}
          style={styles.scrollView}
          renderFooter={this.renderFooter}
        />
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
    backgroundColor: '#E5F1F1',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadButton: {
    alignSelf: 'stretch',
  },
  loadText: {
    margin: 12,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    alignSelf: 'stretch',
  }
});
