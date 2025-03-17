import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from "react-native";

export default function Cal() {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [result, setResult] = useState("");

    const calculateBMI = () => {
      const weightNum = parseFloat(weight);
      const heightNum = parseFloat(height) / 100; // convert height to meters
      if (!isNaN(weightNum) && !isNaN(heightNum) && heightNum > 0) {
          const bmiValue = weightNum / (heightNum * heightNum);
          setResult(bmiValue.toFixed(2));
      } else {
          setResult(null);
      }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI calculator</Text>

      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="Typing your weight"
        placeholderTextColor="#A0A0A0" 
        TextInput={weight}
        onChangeText={setWeight}
      />

      <Text style={styles.label}>Height (cm)</Text>
      <TextInput
        style={styles.input}
        placeholder="Typing your height"
        placeholderTextColor="#A0A0A0"
        TextInput={height}
        onChangeText={setHeight}
      />

      <Text style={styles.title}>Result:{result !== null ? result : ""}</Text>

      <TouchableOpacity style={styles.button} onPress={calculateBMI}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Cursive",
    alignItems: "bottom",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    marginBottom: 5,
    fontFamily: "Cursive",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    width: "100%",
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",},
});
