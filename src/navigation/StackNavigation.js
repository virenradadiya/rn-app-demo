import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackRoute} from './NavigationRoutes';
import {StackNav} from './NavigationKeys';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={StackNav.Splash}>
      <Stack.Screen name={StackNav.Splash} component={StackRoute.Splash} />
      <Stack.Screen
        name={StackNav.SetUpProfile}
        component={StackRoute.SetUpProfile}
      />
      <Stack.Screen name={StackNav.Home} component={StackRoute.Home} />
    </Stack.Navigator>
  );
}
