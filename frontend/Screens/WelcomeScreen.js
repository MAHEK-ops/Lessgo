import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

const WelcomeScreen = ({ navigation }) => {
    const player = useVideoPlayer(
        require('./../assets/Screen Recording 2025-09-28 at 12.04.05 AM.mov'),
        (player) => {
            player.loop = true;
            player.play();
            player.muted = true;
        }
    );
    useEffect(() => {
        const checkLogin = async () => {
            const loggedIn = await AsyncStorage.getItem("isLoggedIn");
            if (loggedIn) {
                navigation.replace("Home"); 
            }
        };
        checkLogin();
    }, []);

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
                        <Feather name="chevron-up" size={24} color="#fff" style={{ marginTop: -8 }} />
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 60,
        backgroundColor: 'rgba(0,0,0, 0.5)'
    },
    textWrapper: {
        alignItems: 'center',
        marginBottom: 700,
    },
    travelText: {
        fontSize: 100,
        fontFamily: 'Reey',
        color: '#fff',
        textAlign: 'center',
        marginBottom: -20
    },
    smallText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginLeft: 110
    },

    buttonWrapper: {
        width: 85,
        height: 150,
        borderRadius: 50,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 15,
        marginBottom: -200,
        marginTop: -380
    },
    arrows: {
        position: 'absolute',
        top: 18,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#fff',
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
});