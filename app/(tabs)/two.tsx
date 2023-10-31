// Import necessary components and modules from React and React Native libraries
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import Slider from "@react-native-community/slider";
import { Button, Image } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { quotes } from "../../data/quotes";

// Select a random index from the 'quotes' array
let i = Math.floor(Math.random() * quotes.length);

// Set the image source for the logo
let logoSource = require("../../assets/images/Tranquility.png");

// Define the main functional component for the TabTwoScreen
export default function TabTwoScreen() {
  // State to handle the value for slider
  const [value, setValue] = useState(2.5);

  // Function to store the value in AsyncStorage
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("actionTime", value);
    } catch (e) {
      // Error handling if saving fails
    }
  };
  // Store the current slider value in AsyncStorage
  storeData((value * 1000).toString());

  return (
    // Main view container with defined styles
    <View style={styles.container}>
      <View style={styles.contentView}>
        {/* Title for the settings section */}
        <Text style={styles.title}>Settings</Text>
        {/* Separator view with specific styles */}
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        {/* Display a random quote */}
        <Text style={styles.text}> "{quotes[i]}" - Anonymous </Text>
        {/* Separator view */}
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        {/* Text prompting to select time between actions */}
        <Text style={styles.smallerText}>
          Please Select the Time Between Actions:
        </Text>
        {/* Display the current slider value */}
        <Text>{Math.round(value * 10) / 10} Seconds</Text>
        {/* Slider component for selecting time interval */}
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={1}
          maximumValue={4}
          thumbTintColor="#D3D3D3"
          step={0.1}
          value={value}
          onValueChange={setValue}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#808080"
        />
        {/* Separator view */}
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        {/* Display an image (logo) */}
        <Image source={logoSource} style={styles.logo} />
      </View>

      {/* Text at the bottom */}
      <View style={styles.bottomText}>
        <Text>Made with Passion - Darren Pinto</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: 150, // Adjust the width as needed
    height: 150, // Adjust the height as needed
    resizeMode: "fit", // Modify as needed
    marginBottom: 0, // Add margin bottom as needed
  },
  verticalContent: {
    padding: 20,
    flex: 1,
    flexDirection: "row",
    height: 500,
    justifyContent: "center",
    alignItems: "stretch",
  },
  subHeader: {
    backgroundColor: "#2089dc",
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    marginLeft: 25,
    marginRight: 25,
    textAlign: "center",
  },
  smallerText: {
    fontSize: 15,
    marginLeft: 50,
    marginRight: 50,
    textAlign: "center",
    marginBottom: 50,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  contentView: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  bottomText: {
    flex: 0.1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
});
