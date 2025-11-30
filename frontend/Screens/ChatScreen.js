import React, { useState } from "react";
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity,ScrollView,ImageBackground,KeyboardAvoidingView,Platform,} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

export default function ChatScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Lara",
      avatar: require("./../assets/travelAir.jpg"),
      text: "Hey everyone! Just landed. The view is absolutely surreal.",
      mine: false,
    },
    {
      id: 2,
      user: "You",
      avatar: require("../assets/jetski.jpg"),
      text: "Amazing! Can’t wait to get there. How’s the weather?",
      mine: true,
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      user: "You",
      avatar: require("./../assets/jetski.jpg"),
      text: message,
      mine: true,
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  return (
    <ImageBackground
      source={require("./../assets/chat.jpg")}
      style={styles.bg}
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.2)"]}
        style={styles.overlay}
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Spiti Valley Adventure</Text>
        <TouchableOpacity>
          <Text style={styles.menu}>⋮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20 }}
      >
        <View style={styles.tabsContainer}>
          <Text style={[styles.tab, styles.activeTab]}>Spiti Valley Adventure</Text>
          <Text style={styles.tab}>Bali Escape</Text>
          <Text style={styles.tab}>Tokyo ’24</Text>
        </View>

        <View style={styles.dateTag}>
          <Text style={styles.dateText}>Today</Text>
        </View>

        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageRow,
              msg.mine ? styles.rightRow : styles.leftRow,
            ]}
          >
            {!msg.mine && (
              <Image source={msg.avatar} style={styles.avatar} />
            )}

            <BlurView
              intensity={50}
              tint="dark"
              style={[
                styles.messageBubble,
                msg.mine ? styles.myBubble : styles.otherBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageSender,
                  msg.mine && { textAlign: "right" },
                ]}
              >
                {msg.user}
              </Text>

              <Text style={styles.messageText}>{msg.text}</Text>
            </BlurView>
          </View>
        ))}
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.inputContainer}>
          <BlurView intensity={40} tint="dark" style={styles.inputBlur}>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Type your message..."
              placeholderTextColor="#ccc"
              style={styles.input}
            />
          </BlurView>

          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject },

  header: {
    marginTop: 135,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  menu: {
    fontSize: 26,
    color: "#fff",
  },

  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  tab: {
    color: "#bbb",
    marginRight: 20,
    fontSize: 15,
  },
  activeTab: {
    color: "#fff",
    borderBottomWidth: 2,
    borderColor: "#b9a1ff55",
    paddingBottom: 4,
  },

  dateTag: {
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  dateText: {
    color: "#fff",
    fontSize: 12,
  },

  messageRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  leftRow: { justifyContent: "flex-start" },
  rightRow: { justifyContent: "flex-end" },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 50,
    marginRight: 10,
  },

  messageBubble: {
    maxWidth: "75%",
    borderRadius: 25,
    padding: 15,
    overflow: "hidden",
  },

  otherBubble: {
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  myBubble: {
    backgroundColor: "#b9a1ff55",
  },

  messageSender: {
    color: "#ccc",
    fontSize: 12,
    marginBottom: 5,
  },

  messageText: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 21,
  },

  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
  },
  inputBlur: {
    flex: 1,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  input: {
    color: "#fff",
    fontSize: 15,
  },

  sendButton: {
    marginLeft: 10,
    backgroundColor: "#b9a1ff55",
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  sendIcon: {
    fontSize: 22,
    color: "#fff",
    marginLeft: 3,
  },
});
