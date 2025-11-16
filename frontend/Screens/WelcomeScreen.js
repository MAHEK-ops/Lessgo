import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const WelcomeScreen = ({ navigation }) => {
    const player = useVideoPlayer(
        require('./../assets/Screen Recording 2025-09-28 at 12.04.05 AM.mov'),
        (player) => {
            player.loop = true;
            player.play();
            player.muted = true;
        }
    );

    const handleGo = () => {
        navigation.navigate("PreLogin");
    };

    return (
        <View style={styles.container}>
            <VideoView style={styles.video} player={player} contentFit="cover" />

            <View style={styles.overlay}>
                <View style={styles.textWrapper}>
                    <Text style={styles.travelText}>Travel!</Text>
                    <Text style={styles.smallText}>Find your crew, make your trip</Text>
                </View>

                <LinearGradient
                    colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.7)']}
                    style={styles.buttonWrapper}
                >
                    <View style={styles.arrows}>
                        <Feather name="chevron-up" size={24} color="rgba(255,255,255,0.5)" />
                        <Feather name="chevron-up" size={24} color="#fff" style={{ marginTop: -8}} />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleGo}>
                        <Text style={styles.buttonText}>Go</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    video: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: '8%',
    },
    textWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: -height * 0.15,
    },
    travelText: {
        fontSize: width * 0.23,
        fontFamily: 'Reey',
        color: '#fff',
        textAlign: 'center',
        includeFontPadding: false, 
        textAlignVertical: 'center', 
    },
    smallText: {
        color: '#fff',
        fontSize: width * 0.045,
        textAlign: 'center',
        includeFontPadding: false,
        textAlignVertical: 'center',
        marginTop: -height * 0.01,
        marginLeft: width * 0.2,
    },
    buttonWrapper: {
        width: width * 0.22,
        height: height * 0.18,
        borderRadius: width * 0.12,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: height * 0.02,
        marginBottom: height * 0.04,
    },
    arrows: {
        position: 'absolute',
        top: height * 0.02,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#fff',
        width: width * 0.18,
        height: width * 0.18,
        borderRadius: width * 0.09,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    buttonText: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        color: '#000',
    },
});






// useEffect(() => {
    //     const checkLogin = async () => {
    //         setTimeout(async () => {
    //             const loggedIn = await AsyncStorage.getItem("isLoggedIn");
    //             if (loggedIn === "true") {
    //                 navigation.replace("Home");
    //             }
    //         }, 3000); // show WelcomeScreen for 3s
    //     };
    //     checkLogin();
    // }, []);