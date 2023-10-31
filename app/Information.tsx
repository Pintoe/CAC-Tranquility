import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Information</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          marginRight: 50,
          marginLeft: 50,
          color: "#00D6FF",
        }}
      >
        Inhale when the indicator crosses over the blue rectangle.
      </Text>
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          marginRight: 50,
          marginLeft: 50,
          marginTop: 50,
          color: "#E500FF",
        }}
      >
        Exhale when the indicator crosses over the magenta rectangle.
      </Text>
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          marginRight: 50,
          marginLeft: 50,
          marginTop: 50,
          color: "yellow",
        }}
      >
        Hold your breath when the indicator crosses over the yellow rectangle.
      </Text>
      <Text style={styles.text}>
        Open up settings to modify the time between actions.
      </Text>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  text: {
    fontSize: 20,
    marginTop: 50,
    marginRight: 50,
    marginLeft: 50,
    marginBottom: 150,
    textAlign: "center",
  },
});
