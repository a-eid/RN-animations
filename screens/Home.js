import React from 'react';
import {FlatList, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import screens from './index';

export function Home() {
  const navigation = useNavigation();
  function navigate(name) {
    navigation.navigate(name);
  }

  return (
    <FlatList
      contentContainerStyle={styles.contentContainerStyle}
      data={Object.keys(screens)}
      renderItem={({item}) => <FlatListItem name={item} navigate={navigate} />}
      keyExtractor={item => `${item}`}
    />
  );
}

function FlatListItem({name, navigate}) {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={_ => navigate(name)}>
      <Text style={styles.itemText}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
  itemContainer: {
    padding: 20,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  itemText: {
    fontSize: 17,
  },
});
