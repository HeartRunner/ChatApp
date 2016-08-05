'use strict';
import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Image,
} from 'react-native';

const styles = StyleSheet.create({
  item: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    padding: 12,
    margin: 9,
    marginBottom: 0,
    shadowColor: 'rgba(0,0,0,.5)',
    shadowRadius: 5,
    borderRadius: 3,
  },
  title: {
    color: '#222',
  },
  cams: {
    color: '#ccc',
  },
  wholeView: {
    flexDirection: 'row',
  },
  description: {
    flex: 1,
    marginLeft: 12,
  },
  image: {
    width: 90,
    height: 79,
    borderRadius: 3,
    backgroundColor: '#cecece',
  },
});

export default props => {
  return (<TouchableHighlight style={styles.item} onPress={props.onItemPress(props.href)}>
    <View style={styles.wholeView}>
      <Image style={styles.image} source={{uri: 'a' + props.img}} />
      <View style={styles.description}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.cams}>{props.location} - {props.cams}</Text>
      </View>
    </View>
  </TouchableHighlight>);
};

