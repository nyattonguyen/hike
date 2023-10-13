import { View, Text } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Dialog } from "@rneui/themed";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";

const { width, height } = Dimensions.get("window");
export default function Home() {
  const [hikes, setHikes] = useState([]);
  const db = SQLite.openDatabase("demo.db", {
    onCreate: (db) => {
      db.executeSql(
        "CREATE TABLE IF NOT EXISTS hikes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, location TEXT, dateHike TEXT, selectedIndex INTEGER, lenghtHight INTEGER, level TEXT, desc TEXT) "
      );
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigation = useNavigation();
  const [dataHike, setDataHike] = useState([]);

  const handleDetail = (id) => {
    console.log("ok", id);
    navigation.navigate("Edit", { id });
  };
  // const handleDelete = (id) => {
  //   const newData = dataHike.filter((item) => item.id !== id);
  //   setDataHike(newData);
  // };

  useEffect(() => {
    db.transaction((tx) => {
      // Tạo bảng `hikes` nếu nó không tồn tại.
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS hikes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, location TEXT, dateHike TEXT, selectedIndex INTEGER, lenghtHight INTEGER, level TEXT, desc TEXT) "
      );

      // Chọn tất cả các chuyến đi bộ.
      tx.executeSql(
        "SELECT * FROM hikes",
        null,
        (txObj, resultSet) => setHikes(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
    setIsLoading(false);
  }, [hikes]);
  const deleteHike = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM hikes WHERE id = ?",
        [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingHikes = [...hikes].filter((hike) => hike.id !== id);
            setHikes(existingHikes);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };
  const deleteAllHikes = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM hikes;",
        null,
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            console.log("Tất cả các dữ liệu trong table hikes đã được xóa");
          }
        },
        (txObj, error) => console.log(error)
      );
    });
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
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <View
          style={{
            top: 30,
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
          }}
        >
          {error === true ? (
            <Dialog isVisible={error} onBackdropPress={toggleDialog}>
              <Dialog.Title title="Confirm" />
              <View
                style={{
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Text>Do you want to delete it? </Text>
              </View>
              <Dialog.Actions>
                <Dialog.Button
                  title="OK"
                  onPress={() => {
                    deleteAllHikes();
                    setError(false);
                  }}
                />
                <Dialog.Button
                  title="CANCEL"
                  onPress={() => {
                    setError(false);
                  }}
                />
              </Dialog.Actions>
            </Dialog>
          ) : (
            ""
          )}
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.h1}>Home</Text>
            </View>
            <View style={styles.col}>
              <Button
                color="#F53535"
                style={{ borderRadius: 10 }}
                onPress={deleteAllHikes}
              >
                Delete All
              </Button>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          {hikes.map((item) => (
            <View style={styles.row} key={item.id}>
              <View style={styles.col}>
                <TextInput style={styles.input}>{item.name}</TextInput>
              </View>
              <View style={styles.col}>
                <View style={{ marginTop: 8 }}>
                  <View style={styles.row}>
                    <View style={styles.col}>
                      <Button
                        style={styles.inputmore}
                        onPressIn={() => handleDetail(item.id)}
                        size="md"
                        radius={"xl"}
                        color="warning"
                      >
                        More
                      </Button>
                    </View>
                    <View style={styles.col}>
                      <Button
                        color="error"
                        style={styles.inputdelete}
                        onPressIn={() => deleteHike(item.id)}
                        size="md"
                        radius={"xl"}
                      >
                        Delete
                      </Button>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: "#fff",
  },
  title: {
    width: width * 0.9,
  },
  h1: {
    fontSize: 30,
    fontWeight: "600",
    color: "black",
    alignSelf: "flex-start",
  },
  body: {
    margin: "auto",
    width: width * 0.9,
  },
  item: {
    marginTop: 12,
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
  input: {
    marginLeft: 8,
    marginTop: 8,
    height: 50,
    borderColor: "#DDDDDD",
    width: width * 0.4,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontSize: 15,
  },
  inputdelete: {
    marginTop: 14,
    height: 50,
    backgroundColor: "#F53535",
    width: width * 0.16,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontSize: 15,
    textAlign: "center",
    color: "black",
    marginLeft: 4,
  },
  inputmore: {
    marginTop: 14,
    height: 50,
    backgroundColor: "#5CF535",
    width: width / 4 - 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontSize: 15,
    color: "black",
    textAlign: "center",
    marginRight: 4,
  },
});
