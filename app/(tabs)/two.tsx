import React, { useState, useEffect, useRef } from "react";

import { StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import Slider from "@react-native-community/slider";
import { Button } from "react-native-elements";

import { MMKV } from "react-native-mmkv";

const quotes = [
  "In the midst of chaos, find your calm; it's the eye of the storm where clarity resides.",
  "Calmness is not the absence of storms, but the ability to find peace within them.",
  "In the waves of life, be the calm sailor steering your own ship.",
  "Calmness isn't about avoiding turbulence, it's about navigating through it with a composed spirit.",
  "The serenity within you is the anchor in life's unpredictable seas.",
  "Amidst the noise, discover the power of silence within - therein lies your calm.",
  "Calmness is the ultimate superpower; it allows you to respond rather than react.",
  "Sometimes the most productive thing you can do is relax into the calm of the moment.",
  "Finding tranquility within yourself is the gateway to inner strength and resilience.",
  "Calmness is a skill—a practice that brings peace to the chaos and clarity to the confusion.",
  "In the center of the storm, there is stillness. In the center of stillness, there is you, calm and unshaken.",
  "Calmness isn't complacency; it's the stronghold from which you make your most thoughtful decisions.",
  "Embrace the serenity within; it's the compass guiding you through life's tempests.",
  "Your inner peace is a sanctuary. Guard it fiercely and return to it often.",
  "Calmness doesn't mean a lack of passion or drive; it means channeling your energy purposefully and harmoniously.",
  "To be calm is to have mastered the art of riding the waves without letting them disturb your inner peace.",
  "The quieter you become, the more you can hear. In silence, find the profound calm.",
  "Calmness is the bridge between reaction and response. It grants you the wisdom to choose.",
  "Peace is not found by escaping the storm but by finding calm within it.",
  "Your tranquility is your superpower; it radiates resilience in the face of adversity.",
];

let i = Math.floor(Math.random() * quotes.length);
let z = Math.floor(Math.random() * quotes.length);

export const storage = new MMKV();

export default function TabTwoScreen() {
  storage.getAllKeys();
  const [value, setValue] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.text}> {quotes[i]} </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.smallerText}>
        {" "}
        Please Select the Time Between Actions:{" "}
      </Text>
      <Text>{Math.floor(value * 10) / 10} Seconds</Text>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0.5}
        maximumValue={4}
        step={0.1}
        onValueChange={setValue}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentView: {
    padding: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "stretch",
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
});
