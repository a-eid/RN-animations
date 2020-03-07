import React from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import Animated, {Easing, multiply} from 'react-native-reanimated';
import {State} from 'react-native-gesture-handler';
import {useMemoOne} from 'use-memo-one';
import {Card} from '../components';
// import {transformOrigin} from 'react-native-redash';
const {width} = Dimensions.get('window');

// eslint-disable-next-line
const {not,  useCode, Value, Clock, block, startClock, cond, set, neq, eq, timing, interpolate} = Animated; // prettier-ignore
const withTransition = (value, timingConfig = {}, gestureState = new Value(State.UNDETERMINED)) => {
  const clock = new Clock();

  const state = {
    finished: new Value(0),
    frameTime: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    toValue: new Value(0),
    duration: 250,
    easing: Easing.linear,
    ...timingConfig,
  };
  return block([
    startClock(clock),
    cond(neq(config.toValue, value), [
      set(state.frameTime, 0),
      set(state.time, 0),
      set(state.finished, 0),
      set(config.toValue, value),
    ]),
    cond(eq(gestureState, State.ACTIVE), [set(state.position, value)], timing(clock, state, config)),
    state.position,
  ]);
};

const bin = value => (value ? 1 : 0);

const useTransition = (state, config = {}) => {
  useCode(() => set(value, typeof state === 'boolean' ? bin(state) : state), [state, value]);
  const value = useMemoOne(() => new Value(0), []);
  const transition = useMemoOne(() => withTransition(value, config), [value]);
  return transition;
};

const bgs = {'-1': 'red', 1: 'blue', 0: 'green'};
const translate = [-20, 0, 20];

export function UseTransition() {
  const [active, setActive] = React.useState(0);
  const transition = useTransition(active, not(active), active);

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {['-1', '0', '1'].map(num => {
          const rotate = multiply(
            num,
            interpolate(transition, {
              inputRange: [0, 1],
              outputRange: [0, Math.PI / 6],
            }),
          );

          return (
            <Animated.View
              key={`${num}`}
              style={{
                transform: [{translateX: transformOrigin}, {rotate}, {translateX: -transformOrigin}],
              }}>
              <Card style={[{backgroundColor: bgs[num]}, styles.card]} />
            </Animated.View>
          );
        })}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => setActive(active === 0 ? 1 : 0)} />
    </View>
  );
}
const transformOrigin = -(width / 2 - 40);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingTop: 250,
    padding: 20,
  },
  cardsContainer: {},
  card: {
    height: 250,
    ...StyleSheet.absoluteFill,
  },
  button: {height: 100, backgroundColor: 'red', position: 'absolute', bottom: 0, left: 0, right: 0},
});
