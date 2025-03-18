import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function Watch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (time) => {
    const getMilliseconds = `0${Math.floor((time % 1000) / 10)}`.slice(-2);
    const seconds = Math.floor(time / 1000);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `${Math.floor(minutes / 60)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds},${getMilliseconds}`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handlelap = () => {
    setLaps([formatTime(time), ...laps]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>StopWatch</Text>
      <Text style={styles.counter}>{formatTime(time)}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            isRunning ? styles.buttonLap : styles.buttonReset,
          ]}
          onPress={isRunning ? handlelap : handleReset}
        >
          <Text style={styles.buttonText}>{isRunning ? "Lap" : "Reset"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            isRunning ? styles.buttonStop : styles.buttonStart,
          ]}
          onPress={handleStartStop}
        >
          <Text style={styles.buttonText}>{isRunning ? "Stop" : "Start"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.LapContainer}>
        {laps.map((lap, index) => (
          <View key={index} style={styles.Lap}>
            <Text style={styles.Lap_id}>Lap {laps.length - index}</Text>
            <Text style={styles.Lap_time}>{lap}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Cursive",
    alignItems: "bottom",
    marginTop: 100,
  },
  counter: {
    fontSize: 70,
    marginBottom: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 50, // Half of the width/height to make it circular
    width: 100, // Width of the button
    height: 100, // Height of the button
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderWidth: 3,
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
  },
  buttonStart: {
    borderColor: "green",
  },
  buttonStop: {
    borderColor: "red",
  },
  buttonLap: {
    borderColor: "blue",
  },
  buttonReset: {
    borderColor: "black",
  },
  LapContainer: {
    marginTop: 20,
    width: "100%",
  },
  Lap: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignSelf: "center",
  },
  Lap_id: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  Lap_time: {
    fontSize: 20,
    marginBottom: 10,
  },
});
