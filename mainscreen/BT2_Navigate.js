import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";

const Stack = createNativeStackNavigator();

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const users = [
        { username: "user1", password: "pass1" },
        { username: "user2", password: "pass2" },
    ];

    const handleLogin = () => {
        const user = users.find(
            (u) => u.username === username && u.password === password
        );

        if (user) {
            navigation.navigate("Courses");
        } else {
            alert("Invalid username or password");
        }
    };

    return (
        <View style={styles.loginContainer}>
            <Text style={styles.loginTitle}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

const CoursesScreen = ({ navigation }) => {
    const courseList = [
        { id: 1, name: "MÔN HỌC 1" },
        { id: 2, name: "MÔN HỌC 2" },
        { id: 3, name: "MÔN HỌC 3" }
    ];

    return (
        <View style={styles.coursesContainer}>
            <Text style={styles.coursesTitle}>Courses</Text>
            {courseList.map(course => (
                <Button 
                    key={course.id} 
                    title={course.name} 
                    padding={10}
                    onPress={() => navigation.navigate("CourseDetails", { id: course.id })} 
                />
            ))}
        </View>
    );
};

const CourseDetailsScreen = ({ route }) => {
    const { id } = route.params;
    return (
        <View style={styles.courseDetailsContainer}>
            <Text style={styles.courseDetailsTitle}>Course Details - {id}</Text>
        </View>
    );
};

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Courses" component={CoursesScreen} />
                <Stack.Screen name="CourseDetails" component={CourseDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    loginTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    coursesContainer: {
        padding: 16,
    },
    coursesTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    courseDetailsContainer: {
        padding: 16,
    },
    courseDetailsTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    input: {
        width: "80%",
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#333",
    },
});

export default App;
