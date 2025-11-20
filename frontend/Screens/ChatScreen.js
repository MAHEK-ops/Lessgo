import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hey! How can I help you today?", sender: "other" },
    { id: "2", text: "I want to plan a trip 😄", sender: "me" },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "me",
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.bubble,
        item.sender === "me" ? styles.myBubble : styles.otherBubble,
      ]}
    >
      <Text style={item.sender === "me" ? styles.myText : styles.otherText}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
      />

      {/* Input Bar */}
      <View style={styles.inputBar}>
        <TextInput
          placeholder="Message..."
          placeholderTextColor="#666"
          style={styles.input}
          value={input}
          onChangeText={setInput}
        />

        <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
          <Ionicons name="send" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#403d3dff",
  },

  /* chat bubbles */
  bubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 18,
    marginBottom: 12,
  },
  myBubble: {
    backgroundColor: "#000",
    marginLeft: "auto",
    borderBottomRightRadius: 0,
  },
  otherBubble: {
    backgroundColor: "#EDEDED",
    marginRight: "auto",
    borderBottomLeftRadius: 0,
  },
  myText: {
    color: "#fff",
  },
  otherText: {
    color: "#000",
  },

  /* input bar */
  inputBar: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  input: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: 12,
    borderRadius: 25,
    paddingHorizontal: 18,
    fontSize: 15,
    color: "#000",
  },

  sendBtn: {
    marginLeft: 10,
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
