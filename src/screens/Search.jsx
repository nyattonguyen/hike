import { View, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "@rneui/base";
import { useState } from "react";
import { Dimensions } from "react-native";
import { TextInput } from "react-native";
import * as SQLite from "expo-sqlite";
import { useEffect } from "react";

const { width, height } = Dimensions.get("window");
export default function Search() {
  const [text, setText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [hikes, setHikes] = useState([]);
  const [isFilled, setIsFilled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const db = SQLite.openDatabase("demo.db");
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM hikes",
        null,
        (txObj, resultSet) => setHikes(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
    setIsLoading(false);
  }, [hikes]);
  const fill = (text) => {
    const result = hikes.filter((item) => item.name.includes(text));
    setSearchResult(result);
    setIsFilled(true);
  };

  const handleFill = () => {
    fill(text);
  };
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.h1}>Search</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.item}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            onChangeText={(e) => setText(e)}
          />
        </View>
        <View style={{ marginTop: 16 }}>
          <Button
            color="#1453F7"
            style={{ width: width * 0.9, borderRadius: 12, marginTop: 20 }}
            title="Search"
            onPress={handleFill}
          />
        </View>
      </View>
      <View style={styles.result}>
        <View style={{ width: width - 10 }}>
          <Text style={styles.h2}>Result</Text>
          <View style={styles.col}></View>
        </View>
        {isFilled && (
          <View style={styles.listItem}>
            {searchResult.map((item, i) => (
              <View style={styles.item} key={item.id}>
                <TextInput style={styles.input}>{item.name}</TextInput>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: width,
    height: height,
    backgroundColor: "#fff",
  },
  title: {
    width: width * 0.9,
    top: 45,
  },
  h1: {
    fontSize: 30,
    fontWeight: "600",
    color: "black",
    alignSelf: "flex-start",
  },
  h2: {
    fontSize: 26,
    fontWeight: "500",
    color: "black",
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  body: {
    margin: "auto",
    width: width * 0.9,
    marginTop: 40,
  },
  item: {
    marginTop: 6,
    marginLeft: 14,
  },
  listItem: {
    marginTop: 14,
  },
  row: {
    flexDirection: "row",
  },
  col: {
    flex: 1,
  },
  label: {
    fontSize: 16,
  },
  result: {
    marginTop: 20,
  },
  input: {
    height: 50,
    borderColor: "#DDDDDD",
    width: width * 0.9,
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
    fontSize: 15,
  },
  input2: {
    marginTop: 10,
    height: 50,
    borderColor: "#DDDDDD",
    width: width * 0.4,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  dropdown: {
    height: 50,
    width: width * 0.4,
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
