import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import screens from './screens';
import {Home} from './screens/Home';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Home}>
        <Stack.Screen name="Home" component={Home} />
        {Object.keys(screens).map(key => (
          <Stack.Screen name={key} component={screens[key]} key={key} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
