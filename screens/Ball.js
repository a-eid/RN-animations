import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

const {Value, cond, eq, set, add, event} = Animated;

const onGestureEvent = nativeEvent => {
  const gestureEvent = event([{nativeEvent}]);
  return {
    onHandlerStateChange: gestureEvent,
    onGestureEvent: gestureEvent,
  };
};

function withOffset(value, state, offset) {
  return cond(
    eq(state, State.END), //
    [set(offset, add(offset, value)), offset], //
    add(offset, value), //
  );
}

function Ball() {
  const translationX = new Value(0);
  const translationY = new Value(0);
  const state = new Value(State.UNDETERMINED);

  const gestureHandler = onGestureEvent({
    translationX,
    translationY,
    state,
  });

  const translateX = withOffset(translationX, state, new Value(0));
  const translateY = withOffset(translationY, state, new Value(0));

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={[styles.ball, {transform: [{translateX, translateY}]}]} />
    </PanGestureHandler>
  );
}

export function BallScreen() {
  return (
    <View style={styles.contaienr}>
      <Ball />
    </View>
  );
}

const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    backgroundColor: '#000',
    borderRadius: 50,
  },
  contaienr: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
});
