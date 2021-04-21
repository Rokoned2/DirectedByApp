import 'react-native-gesture-handler';
import React from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import SearchScreen from './src/screens/SearchScreen';
import ResultsShowScreen from './src/screens/ResultsShowScreen';

const Stack = createStackNavigator();

const App = () => { 
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={SearchScreen}
        />
      <Stack.Screen
          name="ResultsShow"
          component={ResultsShowScreen}
          options={({ route }) => ({id: route.params.id})}
        />
      </Stack.Navigator>
    </NavigationContainer>
    )
}

export default App;
