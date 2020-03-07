import React from 'react';
import {View, StyleSheet} from 'react-native';

export function Card({style = []}) {
  return <View style={[styles.card, ...style]} />;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    height: 150,
    marginBottom: 12,
    backgroundColor: 'red',
  },
});
