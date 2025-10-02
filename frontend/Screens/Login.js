import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({navigation}){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleLogin = async() => {
    if (email && password) {
      await AsyncStorage.setItem("isLoggedIn","true");
      navigation.replace("Home");
    }else{
      alert("Please enter email and password");
    }
  }
  return(
    <View style={styles.container}>
      <ImageBackground
        source={require('./../assets/jetski.jpg')}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Lessgo</Text>
          <Text style={styles.subtitle}>Traveling around the world.</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text)=>setEmail(text)}
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text)=>setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
          <View style={styles.footer}>
            <Text onPress={() => alert("Create Account pressed")}>Create Account</Text>
            <Text>  |  </Text>
            <Text onPress={() => alert("Forgot Password pressed")}>Forgot Password?</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    padding: 12,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#00796b",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
    backgroundColor: 'rgba(0,0,0, 0.5)'
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "center",
  },
});
