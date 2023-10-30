import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Modal,
  Image,
  Animated,
  Easing,
  StyleSheet,
  Pressable,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Card } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const cardData = [
  {
    title: "Triangle",
    imageSource: require("../../assets/images/Triangle.png"),
    description: "The idea with React Native Elements is more about...",
  },
  {
    title: "Square",
    imageSource: require("../../assets/images/Square.png"),
    description: "The idea with React Native Elements is more about...",
  },
];

export default function TabOneScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("actionTime", value);
    } catch (e) {
      // saving error
    }
  };

  let value = 2000;

  const getData = async () => {
    try {
      value = parseFloat(await AsyncStorage.getItem("actionTime"));
      console.log(value);
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };

  let animations = useRef(null);
  getData();
  console.log(value);
  const openModal = (card) => {
    setSelectedCard(card);
    setModalVisible(true);
    animations.current = null;
  };

  // Define a function for a sequence of animations with variable keyframes
  const animateShape = (position, keyframesX, keyframesY, loop = true) => {
    animations.current = [];
    for (let i = 0; i < keyframesX.length; i++) {
      animations.current.push(
        Animated.parallel([
          Animated.timing(position.x, {
            toValue: keyframesX[i].value,
            duration: keyframesX[i].duration,
            easing: keyframesX[i].easing || Easing.linear,
            useNativeDriver: false,
          }),
          Animated.timing(position.y, {
            toValue: keyframesY[i].value,
            duration: keyframesY[i].duration,
            easing: keyframesY[i].easing || Easing.linear,
            useNativeDriver: false,
          }),
        ])
      );
    }

    if (loop) {
      Animated.loop(Animated.sequence(animations.current)).start();
    } else {
      Animated.sequence(animations.current).start();
    }
  };

  useEffect(() => {
    if (modalVisible) {
      // Start the appropriate animation based on the selected card
      switch (selectedCard?.title) {
        case "Triangle":
          animateShape(
            trianglePosition,
            [
              { value: 0, duration: value },
              { value: 0.5, duration: value },
              { value: 0.75, duration: value },
              { value: 1, duration: value },
              { value: 0.25, duration: value },
            ],
            [
              { value: 0, duration: value },
              { value: 0.25, duration: value },
              { value: 0.5, duration: value },
              { value: 0.75, duration: value },
              { value: 1, duration: value },
            ],
            true
          );
          break;
        case "Square":
          animateShape(
            squarePosition,
            [
              { value: 1, duration: value },
              { value: 1, duration: value },
              { value: 0, duration: value },
              { value: 0, duration: value },
            ],
            [
              { value: 0, duration: value },
              { value: 1, duration: value },
              { value: 1, duration: value },
              { value: 0, duration: value },
            ],
            true
          );
          break;
        // Add similar animations for other shapes here
        default:
          break;
      }
    }
  }, [modalVisible, selectedCard]);

  // Define Animated.Value instances for each shape
  const trianglePosition = new Animated.ValueXY({ x: 0, y: 0 });
  const squarePosition = new Animated.ValueXY({ x: 0, y: 0 });

  const triangleInterpolation = {
    translateX: trianglePosition.x.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100],
    }),
    translateY: trianglePosition.y.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100],
    }),
  };
  const squareInterpolation = {
    translateX: squarePosition.x.interpolate({
      inputRange: [0, 1],
      outputRange: [-125, 125],
    }),
    translateY: squarePosition.y.interpolate({
      inputRange: [0, 1],
      outputRange: [-275, -25],
    }),
  };

  // ...

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Breathing Technique</Text>
      <ScrollView>
        {cardData.map((card, index) => (
          <Pressable key={index} onPress={() => openModal(card)}>
            <Card containerStyle={styles.card}>
              <Card.Title style={styles.cardTitle}>{card.title}</Card.Title>
              <Card.Divider />
              <Card.Image style={styles.image} source={card.imageSource} />
              <Text style={{ marginBottom: 0, color: "black" }}>
                {card.description}
              </Text>
            </Card>
          </Pressable>
        ))}
      </ScrollView>
      <Modal visible={modalVisible} animationType="fade" style={styles.modal}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>
            {selectedCard?.title} Breathing Technique
          </Text>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          <Text style={styles.modalText}>
            {" "}
            Breathe in on the Blue, Breathe out on the Magneta, Hold your Breath
            on the Yellow.{" "}
          </Text>
          <Image style={styles.modalImage} source={selectedCard?.imageSource} />
          {selectedCard?.title === "Triangle" && (
            <>
              <View
                style={{
                  width: 225, // Set the width of the square
                  height: 25, // Set the height of the square
                  position: "absolute",
                  backgroundColor: "yellow", // Set the background color
                  top: 585, // Set the top position (adjust as needed)
                  left: 85, // Set the left position (adjust as needed)
                }}
              />
              <View
                style={{
                  width: 200, // Set the width of the square
                  height: 26, // Set the height of the square
                  transform: "rotate(240deg)",
                  position: "absolute",
                  backgroundColor: "#E500FF", // Set the background color
                  top: 490, // Set the top position (adjust as needed)
                  left: 133, // Set the left position (adjust as needed)
                }}
              />
              <View
                style={{
                  width: 200, // Set the width of the square
                  height: 26, // Set the height of the square
                  transform: "rotate(-60deg)",
                  position: "absolute",
                  backgroundColor: "#00D6FF", // Set the background color
                  top: 490, // Set the top position (adjust as needed)
                  left: 60, // Set the left position (adjust as needed)
                }}
              />
              <View
                style={{
                  width: 225, // Set the width of the square
                  height: 25, // Set the height of the square
                  position: "absolute",
                  backgroundColor: "yellow", // Set the background color
                  top: 585, // Set the top position (adjust as needed)
                  left: 85, // Set the left position (adjust as needed)
                }}
              />
              <Animated.View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: "green",
                  borderRadius: 25,
                  transform: [
                    { translateX: triangleInterpolation.translateX },
                    { translateY: triangleInterpolation.translateY },
                  ],
                }}
              />
            </>
          )}
          {selectedCard?.title === "Square" && (
            <>
              <View
                style={{
                  width: 257, // Set the width of the square
                  height: 10, // Set the height of the square
                  position: "absolute",
                  backgroundColor: "yellow", // Set the background color
                  top: 635, // Set the top position (adjust as needed)
                  left: 65, // Set the left position (adjust as needed)
                }}
              />
              <View
                style={{
                  width: 10, // Set the width of the square
                  height: 257, // Set the height of the square
                  position: "absolute",
                  backgroundColor: "#E500FF", // Set the background color
                  top: 385, // Set the top position (adjust as needed)
                  left: 315, // Set the left position (adjust as needed)
                }}
              />
              <View
                style={{
                  width: 257, // Set the width of the square
                  height: 10, // Set the height of the square
                  position: "absolute",
                  backgroundColor: "yellow", // Set the background color
                  top: 385, // Set the top position (adjust as needed)
                  left: 65, // Set the left position (adjust as needed)
                }}
              />
              <View
                style={{
                  width: 10, // Set the width of the square
                  height: 257, // Set the height of the square
                  position: "absolute",
                  backgroundColor: "#00D6FF", // Set the background color
                  top: 385, // Set the top position (adjust as needed)
                  left: 65, // Set the left position (adjust as needed)
                }}
              />
              <Animated.View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: "green",
                  borderRadius: 25,
                  transform: [
                    { translateX: squareInterpolation.translateX },
                    { translateY: squareInterpolation.translateY },
                  ],
                }}
              />
            </>
          )}
          <Text style={{ marginBottom: 0, color: "black" }}>
            {selectedCard?.description}
          </Text>
          <Button
            title="All Better!"
            onPress={() => {
              setModalVisible(false);
              setSelectedCard(null);
            }}
          ></Button>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginVertical: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "black",
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  image: {
    marginTop: 25,
    resizeMode: "contain",
  },
  modalImage: {
    resizeMode: "contain",
  },
  modal: {
    backgroundColor: "black",
    color: "black",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 150,
    textAlign: "center",
    color: "white",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
