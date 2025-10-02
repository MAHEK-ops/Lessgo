import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get("window");

export default function SignUp({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <ImageBackground
            source={require("../assets/Screenshot 2025-10-03 at 12.22.20 AM.png")}
            style={styles.background}
            imageStyle={styles.imageStyle}
            resizeMode="cover"
        >
            <View style={styles.topNav}>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.topNavText}>SIGN IN</Text>
                </TouchableOpacity>
                <Text style={styles.topNavDivider}>|</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={[styles.topNavText, styles.topNavSelected]}>SIGN UP</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.card}>
                <Text style={styles.title}>Tell us about yourself.</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#4c7b77ff"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#4c7b77ff"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
                    <Text style={styles.buttonText}>SIGN UP</Text>
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
        zIndex: 10
    },
    topNavText: {
        fontSize: 16,
        color: "#f7fbffff",
        letterSpacing: 1,
        fontWeight: "400"
    },
    topNavDivider: {
        fontSize: 18,
        color: "#f7fbffff",
        marginHorizontal: 10,
        fontWeight: "400"
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
    input: {
        width: "100%",
        borderBottomWidth: 1.5,
        borderBottomColor: "#4c7b77ff",
        fontSize: 15,
        paddingVertical: 18,
        marginTop: 20,
        marginBottom: 22,
        color: "#333",
    },
    button: {
        marginTop: 210,
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
