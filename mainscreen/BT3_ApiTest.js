import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authenticate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://blackntt.net:88/api/v1/employees');
      const users = await response.json();
      
      const userExists = users.some(user => user.employee_name === username);
      
      if (userExists) {
        alert("Login successful");
        navigation.navigate('home');
      } else {
        setError("Invalid username or password.");
      }
    } catch (error) {
      setError("Failed to fetch data.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        placeholderTextColor="#A0A0A0"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        placeholderTextColor="#A0A0A0"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={authenticate}>
          <Text style={styles.buttonText}>Confirm and Continue</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function HomeScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserAge, setNewUserAge] = useState("");
  const [newUserSalary, setNewUserSalary] = useState("");
  const [newUserProfileImage, setNewUserProfileImage] = useState("");


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://blackntt.net:88/api/v1/employees');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError("Failed to fetch users.");
        console.error("Fetch users error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://blackntt.net:88/api/v1/delete/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUsers(users.filter(user => user.id !== userId));
        alert("User deleted successfully.");
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Delete user error:", error);
      alert("An error occurred while deleting the user.");
    }
  };

  const addUser = async () => {
    if (!newUserName || !newUserAge || !newUserSalary || !newUserProfileImage) {
      alert("Please fill all fields.");
      return;
    }
    try {
      const response = await fetch('http://blackntt.net:88/api/v1/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employee_name: newUserName,
          employee_age: newUserAge,
          employee_salary: newUserSalary,
          profile_image: newUserProfileImage,
        }),
      });

      if (response.ok) {
        const newUser = await response.json();
        setUsers([...users, newUser]);
        alert("User added successfully.");
        setIsDialogVisible(false);
        setNewUserName("");
        setNewUserAge("");
        setNewUserSalary("");
        setNewUserProfileImage("");
      } else {
        alert("Failed to add user.");
      }
    } catch (error) {
      console.error("Add user error:", error);
      alert("An error occurred while adding the user.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <TouchableOpacity onPress={() => navigation.navigate('detail', { userId: item.id })}>
                <Text style={styles.item}>{item.employee_name}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteUser(item.id)} style={styles.deleteButton}>
                <MaterialIcons name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      <TouchableOpacity style={styles.addButton} onPress={() => setIsDialogVisible(true)}>
        <Text style={styles.addButtonText}>Add User</Text>
      </TouchableOpacity>

      {isDialogVisible && (
        <View style={styles.dialog}>
          <Text style={styles.dialogTitle}>Add New User</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={newUserName}
            onChangeText={setNewUserName}
          />
          <TextInput
            style={styles.input}
            placeholder="Age"
            value={newUserAge}
            onChangeText={setNewUserAge}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Salary"
            value={newUserSalary}
            onChangeText={setNewUserSalary}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="ProfileImage"
            value={newUserProfileImage}
            onChangeText={setNewUserProfileImage}
            keyboardType="numeric"
          />
          <View style={styles.dialogButtons}>
            <TouchableOpacity style={styles.dialogButton} onPress={addUser}>
              <Text style={styles.dialogButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dialogButton} onPress={() => setIsDialogVisible(false)}>
              <Text style={styles.dialogButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

function DetailScreen({ route, navigation }) {
  const { userId } = route.params;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://blackntt.net:88/api/v1/employee/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError("Failed to fetch user details.");
        console.error("Fetch user details error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Details</Text>
      <Text style={styles.label}>Name: {user.employee_name}</Text>
      <Text style={styles.label}>Age: {user.employee_age}</Text>
      <Text style={styles.label}>Salary: {user.employee_salary}</Text>
      <Text style={styles.label}>Profile Image:</Text>
      <Image source={{ uri: user.profile_image }} style={styles.profileImage} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back</Text>
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
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    marginBottom: 5,
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
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  item: {
    fontSize: 18,
    flex: 1,
  },
  deleteButton: {
    marginLeft: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  addButton: {
    width: "100%",
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
  dialog: {
    position: "absolute",
    top: 100,
    left: 20,
    right: 20,
    bottom: 20,
    backgroundColor: "rgba(193, 236, 159, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  dialogTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  dialogButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  dialogButton: {
    width: "45%",
    backgroundColor: "#000",
    paddingVertical: 10,
    borderRadius: 5,
  },
  dialogButtonText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
});

export default App;
