import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function PreLogin({ navigation }) {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("./../assets/background3.jpg")} 
                style={styles.background}
                resizeMode="cover"
            >
                <LinearGradient
                    colors={['rgba(67, 198, 241, 0.2)', 'rgba(0,88,175,0.2)']}
                    style={StyleSheet.absoluteFill}
                />

                <View style={styles.content}>
                    <View style={styles.text}>
                        <Text style={styles.title}>Lessgo</Text>
                        <Text style={styles.tagline}>Where wanderlust meets friendship</Text>
                    </View>
                    <Text style={styles.divider}>〜</Text>


                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={styles.primaryButton}
                            onPress={() => navigation.navigate("SignUp")}
                        >
                            <Text style={styles.primaryButtonText}>Sign Up</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.secondaryButton}
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={styles.secondaryButtonText}>
                                Already have an account? Log In
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    content: {
        alignItems: "center",
        marginBottom: -20,
    },
    text: {
        alignItems: "center",
        marginBottom: 100,
    },
    title: {
        fontSize: 55,
        fontWeight: 400,
        color: "#2c3e3f",
        fontFamily: "French",
        marginBottom: 8,
    },
    tagline: {
        fontSize: 12,
        color: "#6f6e6eff",
        letterSpacing: 2,
        marginBottom: 20,
        textTransform: "uppercase",
    },
    divider: {
        fontSize: 25,
        color: "#2c3e3f",
        marginBottom: 130,
    },
    buttonGroup: {
        alignItems: "center",
        marginTop: 100,
        marginBottom: -90,
    },
    primaryButton: {
        backgroundColor: "#323538ff",
        width: width * 0.8,
        paddingVertical: 18,
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
        alignItems: "center",
    },
    primaryButtonText: {
        color: "#aeb2b6ff",
        fontSize: 18,
        fontWeight: "500",
    },
    secondaryButton: {
        backgroundColor: "#ced3daff",
        width: width * 0.8,
        paddingVertical: 18,
        borderRadius: 12,
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 6,
        alignItems: "center",
    },
    secondaryButtonText: {
        color: "#333",
        fontSize: 14,
    },
});