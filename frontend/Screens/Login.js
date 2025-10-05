import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';



const { width, height } = Dimensions.get("window");

export default function Login({ navigation }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <ImageBackground
            source={require("../assets/Screenshot 2025-10-03 at 12.22.20 AM.png")}
            style={styles.background}
            imageStyle={styles.imageStyle}
            resizeMode="cover"
        >
            {/* Top Navigation */}
            <View style={styles.topNav}>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={[styles.topNavText, styles.topNavSelected]}>SIGN IN</Text>
                </TouchableOpacity>
                <Text style={styles.topNavDivider}>|</Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Text style={styles.topNavText}>SIGN UP</Text>
                </TouchableOpacity>
            </View>

            {/* Registration Card */}
            <View style={styles.card}>
                <Text style={styles.title}>Welcome back!</Text>

                {/* Username Field */}
                <View style={styles.inputContainer}>
                    <Ionicons name="person-outline" size={22} color="#4c7b77ff" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="#4c7b77ff"
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>

                

                {/* Password Field */}
                <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={22} color="#4c7b77ff" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#4c7b77ff"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#79ccc3",
        justifyContent: "flex-start",
    },
    imageStyle: {
        width: width,
        height: height * 0.25,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
    },
    topNav: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: height * 0.18,
        zIndex: 10,
    },
    topNavText: {
        fontSize: 16,
        color: "#f7fbffff",
        letterSpacing: 1,
        fontWeight: "400",
    },
    topNavDivider: {
        fontSize: 18,
        color: "#f7fbffff",
        marginHorizontal: 10,
        fontWeight: "400",
    },
    topNavSelected: {
        color: "#f4f1a6ff",
        fontWeight: "700",
    },
    card: {
        backgroundColor: "#fff",
        width: width,
        height: height,
        alignSelf: "center",
        borderRadius: 28,
        marginTop: height * 0.01,
        padding: 30,
        alignItems: "center",
        elevation: 8,
        shadowColor: "#009090",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
    },
    title: {
        fontSize: 20,
        color: "#4c7b77ff",
        marginTop: 50,
        marginBottom: 30,
        fontFamily: "serif",
        letterSpacing: 0.2,
        fontWeight: "500",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1.5,
        borderBottomColor: "#4c7b77ff",
        width: "100%",
        marginBottom: 25,
        paddingVertical: 6,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: "#333",
        paddingVertical: 10,
    },
    button: {
        marginTop: 220,
        width: "100%",
        paddingVertical: 17,
        borderRadius: 28,
        backgroundColor: "#5b6671ff",
        alignItems: "center",
        elevation: 2,
    },
    buttonText: {
        color: "#f7fbffff",
        fontSize: 18,
        fontWeight: "600",
        letterSpacing: 1.2,
    },
});
