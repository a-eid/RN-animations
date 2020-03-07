import React from 'react';
import {View, SafeAreaView, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Animated from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import {useMemoOne} from 'use-memo-one';

// eslint-disable-next-line
const {Value, event, useCode,Extrapolate, set, block, interpolate, Clock, clockRunning, startClock, stopClock, add, eq, not, cond} = Animated; // prettier-ignore

const duration = 500;

const value = new Value(State.UNDETERMINED);
const handlerStateChange = event([{nativeEvent: {state: value}}]);
const op = cond(eq(value, State.BEGAN), 0.2, 1); // this value is not animating

export function Opacity() {
  const [show, setShow] = React.useState(true);
  const {time, clock, progress} = useMemoOne(
    () => ({
      time: new Value(0),
      clock: new Clock(),
      progress: new Value(0),
    }),
    [],
  );

  const opacity = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: show ? [0, 1] : [1, 0],
  });

  useCode(
    () =>
      block([
        cond(not(clockRunning(clock)), [startClock(clock), set(time, clock)]),
        set(
          progress,
          interpolate(clock, {
            inputRange: [time, add(time, duration)],
            outputRange: [0, 1],
            extrapolate: Extrapolate.CLAMP,
          }),
        ),
        cond(eq(progress, 1), stopClock(clock)),
      ]),
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TapGestureHandler onHandlerStateChange={handlerStateChange}>
          <Animated.View style={[styles.card, {opacity: op}]} />
        </TapGestureHandler>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => setShow(!show)}>
        <Text>{show ? 'Hide' : 'Show'} </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 320,
    backgroundColor: '#fff',
    marginHorizontal: 30,
    borderRadius: 14,
  },
  container: {flex: 1, backgroundColor: '#ccc', justifyContent: 'center'},
  button: {
    height: 100,
    backgroundColor: '#cec',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
