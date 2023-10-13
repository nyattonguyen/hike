import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Edit from "../screens/Edit";
import Home from "../screens/Home";
const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
        options={{
          headerShown: false,
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
}

export default function HomeStack() {
  return <MyStack />;
}
