import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, SafeAreaView, Dimensions} from 'react-native';
import {Transitioning, Transition} from 'react-native-reanimated';
import {Card} from '../components';

const {width} = Dimensions.get('window');

const states = {
  row: {
    container: {
      flexDirection: 'row',
    },
    child: {
      flex: 1,
    },
  },
  column: {
    container: {
      flexDirection: 'column',
    },
    child: {
      width: width / 2 - 24,
    },
  },
  wrap: {
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    child: {
      width: width / 2 - 24,
      marginLeft: 8,
    },
  },
};
const bgs = ['red', 'green', 'blue'];
const transition = <Transition.Change durationMs={300} interpolation="easeInOut" />;

export function LayoutTransition() {
  const [layout, setLayout] = React.useState('column');
  const ref = React.useRef(null);

  return (
    <View style={styles.container}>
      <Transitioning.View style={[styles.cardsContainer, states[layout].container]} ref={ref} transition={transition}>
        {[0, 1, 2].map(i => (
          <Card key={`${i}`} style={[{backgroundColor: bgs[i]}, states[layout].child]} />
        ))}
      </Transitioning.View>
      <SafeAreaView>
        {Object.keys(states).map(key => (
          <TouchableOpacity
            key={key}
            style={styles.selectItem}
            onPress={() => {
              ref.current.animateNextTransition();
              setLayout(key);
            }}>
            <Text>{key}</Text>
          </TouchableOpacity>
        ))}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ccc'},
  cardsContainer: {flex: 1, backgroundColor: '#fff', margin: 12},
  selectItem: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#fff',
  },
});
