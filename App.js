import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SearchScreen from './src/screens/SearchScreen';
import ResultsShowScreen from './src/screens/ResultsShowScreen';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

const App = () => { 
  return(
    <SafeAreaProvider>
      <NavigationContainer>
      <StatusBar style="dark" />
        <Stack.Navigator 
        screenOptions={{
        }}>
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{
             headerShown: false,
           }}
          />
        <Stack.Screen
            name="ResultsShow"
            component={ResultsShowScreen}
            options={({ route }) => ({
              id: route.params.id,
              headerTransparent: true,
              title: "" 
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    )
}

export default App;
