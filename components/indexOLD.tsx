import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Image, Animated, Easing, StyleSheet, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Card } from 'react-native-elements';

const cardData = [
  {
    title: 'Triangle',
    imageSource: require("../../assets/images/Triangle.png"),
    description: 'The idea with React Native Elements is more about...',
  },
  {
    title: 'Square',
    imageSource: require("../../assets/images/Square.png"),
    description: 'The idea with React Native Elements is more about...',
    points: 2
  },
  {
    title: 'Star',
    imageSource: require("../../assets/images/Star.png"),
    description: 'The idea with React Native Elements is more about...',
  }
];

function lerp(p, t) {
  return p[0]*(1-t) + p[1] * t
}
export default function TabOneScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [counter, setCounter] = useState(0); // Step 1: Initialize counter

  // Define Animated.Value instances for each shape
  let starPosition = new Animated.ValueXY({ x: 0, y: 0 });
  let trianglePosition = new Animated.ValueXY({ x: 0, y: 0 });
  let squarePosition = new Animated.ValueXY({ x: 0, y: 0 });
  const squareRange = [
    [-100, 0],// [-125, 125],
    [5, 10]// [-275, -25]
  ]

  
  /*const squarePositions = [[
    { value: 1, duration: 1000 },
    { value: 1, duration: 1000 },
    { value: 0, duration: 1000 },
    { value: 0, duration: 1000 }
  ],
  [
    { value: 0, duration: 1000 },
    { value: 1, duration: 1000 },
    { value: 1, duration: 1000 },
    { value: 0, duration: 1000 }
  ]]*/

  const squarePositions = [[
    { value : 0, duration: 1000},
    { value : 1, duration: 1000}
  ],
  [
    {value: 0, duration: 1000},
    {value: 1, duration: 1000}
  ]
]

  if (modalVisible) {
    squarePosition = new Animated.ValueXY({
      x : lerp([squareRange[0][0], squareRange[0][1]], squarePositions[0][(counter + 1) % selectedCard?.points].value),
      y : lerp([squareRange[1][0], squareRange[1][1]], squarePositions[1][(counter + 1) % selectedCard?.points].value)
    });

    console.log(squarePosition);
  }
  const openModal = (card) => {
    setSelectedCard(card);
    setCounter(0); // Reset counter when opening the modal
    setModalVisible(true);
  };

  // Define a function for a sequence of animations with variable keyframes
  const animateShape = (position, keyframesX, keyframesY, loop = true) => {
    const animations = [];

    console.log(position, keyframesX, keyframesY);
    for (let i = 0; i < keyframesX.length; i++) {
      animations.push(
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
      Animated.loop(Animated.sequence(animations)).start();
    } else {
      Animated.sequence(animations).start();
    }
  };

  useEffect(() => {
    if (modalVisible) {
      const interval = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 2); // Step 2: Increment counter
      }, 1000);

      return () => {
        clearInterval(interval); // Clear the interval when the modal is closed
      };
    }
  }, [modalVisible]);



  useEffect(() => {
    if (modalVisible) {
      // Start the appropriate animation based on the selected card
      switch (selectedCard?.title) {
        case 'Star':
          animateShape(starPosition, [
            { value: 0, duration: 1000 },
            { value: 0.5, duration: 500 },
            { value: 0.75, duration: 1000 },
            { value: 1, duration: 500 },
            { value: 0.25, duration: 750 },
          ],
          [
            { value: 0, duration: 1000 },
            { value: 0.25, duration: 500 },
            { value: 0.5, duration: 750 },
            { value: 0.75, duration: 500 },
            { value: 1, duration: 1000 },
          ], true);
          break;
        case 'Triangle':
          animateShape(trianglePosition, [
            { value: 0, duration: 1000 },
            { value: 0.5, duration: 500 },
            { value: 0.75, duration: 1000 },
            { value: 1, duration: 500 },
            { value: 0.25, duration: 750 },
          ],
          [
            { value: 0, duration: 1000 },
            { value: 0.25, duration: 500 },
            { value: 0.5, duration: 750 },
            { value: 0.75, duration: 500 },
            { value: 1, duration: 1000 },
          ], true);
          break;
        case 'Square':
          squareInterpolation = {
            translateX: squarePosition.x.interpolate({
              inputRange: [0, 1],
              outputRange: squareRange[0],
            }),
            translateY: squarePosition.y.interpolate({
              inputRange: [0, 1],
              outputRange: squareRange[1],
            },
          )};
          squarePosition.setValue({
            x : lerp([squareRange[0][0], squareRange[0][1]], squarePositions[0][(counter + 1) % selectedCard?.points].value),
            y : lerp([squareRange[1][0], squareRange[1][1]], squarePositions[1][(counter + 1) % selectedCard?.points].value)
          });
          animateShape(squarePosition, [
            squarePositions[0][counter % selectedCard?.points],
            squarePositions[0][(counter + 1) % selectedCard?.points]
          ],
          [
            squarePositions[1][counter % selectedCard?.points],
            squarePositions[1][(counter + 1) % selectedCard?.points]
          ], true);

          break;
        // Add similar animations for other shapes here
        default:
          break;
      }
    }


  }, [modalVisible, selectedCard, counter]);




  // Define interpolations for each shape
  let starInterpolation = {
    translateX: starPosition.x.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100],
    }),
    translateY: starPosition.y.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100],
    },
  )};
  let triangleInterpolation = {
    translateX: trianglePosition.x.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100],
    }),
    translateY: trianglePosition.y.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100],
    },
  )};
  let squareInterpolation = {
    translateX: squarePosition.x.interpolate({
      inputRange: [0, 1],
      outputRange: squareRange[0],
    }),
    translateY: squarePosition.y.interpolate({
      inputRange: [0, 1],
      outputRange: squareRange[1],
    },
  )};

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
              <Text style={{ marginBottom: 0, color: "black" }}>{card.description}</Text>
            </Card>
          </Pressable>
        ))}
      </ScrollView>
      <Modal
        visible={modalVisible}
        animationType="slide"
        style={styles.modal}
      >
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>{selectedCard?.title} Breathing Technique</Text>
          <Image style={styles.modalImage} source={selectedCard?.imageSource} />
          <Text style={styles.counterText}>{counter}</Text>
          {selectedCard?.title === 'Star' && (
            <Animated.View
              style={{
                width: 50,
                height: 50,
                backgroundColor: 'green',
                borderRadius: 25,
                transform: [
                  { translateX: starInterpolation.translateX },
                  { translateY: starInterpolation.translateY },
                ],
              }}
            />
          )}
          {selectedCard?.title === 'Triangle' && (
            <Animated.View
              style={{
                width: 50,
                height: 50,
                backgroundColor: 'green',
                borderRadius: 25,
                transform: [
                  { translateX: triangleInterpolation.translateX },
                  { translateY: triangleInterpolation.translateY },
                ],
              }}
            />
          )}
          {selectedCard?.title === 'Square' && (
            <Animated.View
              style={{
                width: 50,
                height: 50,
                backgroundColor: 'green',
                borderRadius: 25,
                transform: [
                  { translateX: squareInterpolation.translateX },
                  { translateY: squareInterpolation.translateY },
                ],
              }}
            />
          )}
          <Text style={{ marginBottom: 0, color: "black" }}>{selectedCard?.description}</Text>
          <Button title="All Better" onPress={() => { setModalVisible(false); setSelectedCard(null); }}>
          </Button>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: "black",
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 20,
    color: "white",
    textAlign: 'center',
  },
  image: {
    marginTop: 25,
    resizeMode: 'contain',
  },
  modalImage: {
    resizeMode: "contain",
  },
  modal: {
    backgroundColor: "black",
    color: "black",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 250,
    color: 'white'
  },
  counterText: {
    fontSize: 24, // Adjust the font size as needed
    color: 'white',
    marginBottom: 10,
  }
});

