import { StyleSheet, Text, View } from "react-native";
import { BottomTab } from "./src/navigation/BottomTab";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <GestureHandlerRootView
          style={{
            flex: 1,
            width: "100%",
            display: "flex",

            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <BottomTab />
        </GestureHandlerRootView>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
