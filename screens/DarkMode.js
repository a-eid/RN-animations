import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Transitioning, Transition} from 'react-native-reanimated';

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={400} />
    <Transition.Out type="fade" durationMs={400} />
  </Transition.Together>
);

export function DarkMode() {
  const [dark, setDark] = React.useState(false);
  const ref = React.useRef(null);

  function handlePress() {
    if (ref.current) {
      ref.current.animateNextTransition();
      setDark(!dark);
    }
  }
  return (
    <Transitioning.View style={styles.container} {...{ref, transition}}>
      {dark && <View style={[StyleSheet.absoluteFill, {backgroundColor: 'black'}]} />}
      {!dark && <View style={[StyleSheet.absoluteFill, {backgroundColor: 'white'}]} />}
      <Text style={[styles.text, {color: dark ? 'white' : 'black'}]}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum quis quaerat cum, a, doloremque corrupti animi
        facere aspernatur natus recusandae maiores, ipsum non beatae aperiam sit ducimus iusto voluptatibus aliquam?
      </Text>
      {dark && (
        <TouchableOpacity style={[styles.button, {backgroundColor: 'white'}]} onPress={handlePress}>
          <Text style={[{color: 'black', fontSize: 24}]}>Dark</Text>
        </TouchableOpacity>
      )}
      {!dark && (
        <TouchableOpacity style={[styles.button, {backgroundColor: 'black'}]} onPress={handlePress}>
          <Text style={[{color: 'white', fontSize: 24}]}>Light</Text>
        </TouchableOpacity>
      )}
    </Transitioning.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkBackground: {
    backgroundColor: 'black',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'red',
  },
  text: {
    textAlign: 'center',
    marginTop: 200,
    fontSize: 24,
    alignSelf: 'center',
  },
});
