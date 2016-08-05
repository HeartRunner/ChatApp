// 等待实现

'use strict';
import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  View,
  Text,
  WebView,
} from 'react-native';
import Video from 'react-native-video';
import {bindActionCreators} from 'redux';
import {load} from '../modules/detail';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  video: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});


class Detail extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.href !== nextProps.href || this.props.detail !== nextProps.detail;
  }

  onLoad() {
    console.warn('onLoad');
  }
  onProgress(ct) {
    console.warn(ct);
  }
  onError(error) {
    console.warn('error', error);
  }

  render() {
    const { detail, href } = this.props;
    const loading = detail.get('loading');
    const loaded = detail.get('loaded');
    // const src = 'http://www.baidu.com';
    const src = detail.get(href);
    console.warn('src', src);
    return (
      <View style={styles.container}>
        {loading && <View style={styles.loading}><Text>载入中.....</Text></View>}
        {/*src && <View style={styles.video}><WebView
          source={src}
          onLoad={this.onLoad}
          onError={this.onError}
          style={styles.video}
          scalesPageToFit
        /></View>*/}

        {src && <Video
          resizeMode="cover"
          onLoad={this.onLoad}
          onError={this.onError}
          style={styles.video}
          source={{ uri: src }}
        /> }
        {!loading && !src && <Text>主播未直播</Text>}
      </View>

    );
  }
}

Detail.fetchData = function(getState, dispatch, props) {
  console.log(props);
  if(props.href) {
    console.log('dispatch');
    dispatch(load(props.href));
  }
}

export default connect(state => ({
  detail: state.detail,
}), {load})(Detail);

