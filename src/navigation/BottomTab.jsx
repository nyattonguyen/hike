import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Add from "../screens/Add";
import Search from "../screens/Search";
import Iconn from "react-native-vector-icons/FontAwesome";
import HomeStack from "./MainStack";
const Tab = createBottomTabNavigator();

export function BottomTab() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Add"
        component={Add}
        options={{
          headerShown: false,
          tabBarLabel: "Add",
          tabBarIcon: ({ color }) => (
            <Iconn name="plus-circle" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Iconn name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <Iconn name="search" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
