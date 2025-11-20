import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { BlurView } from 'expo-blur';
import { TouchableOpacity } from "react-native";

export default function CreateTripScreen() {
  return (
    <ImageBackground
      source={require("./../assets/camping.jpg")}
      style={styles.bg}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <BlurView intensity={50} tint="light" style={styles.formCard}>
          
          <Text style={styles.heading}>Create a Trip</Text>

          <Text style={styles.label}>Destination</Text>
          <TextInput
            placeholder="Where do you want to go?"
            placeholderTextColor="#eee"
            style={styles.underlineInput}
          />

          <Text style={styles.label}>Budget Range</Text>
          <TextInput
            placeholder="$500–$1000"
            placeholderTextColor="#eee"
            style={styles.underlineInput}
          />

          <View style={styles.row}>
            <View style={styles.half}>
              <Text style={styles.label}>Start Date</Text>
              <TextInput
                placeholder="dd/mm/yyyy"
                placeholderTextColor="#eee"
                style={styles.underlineInput}
              />
            </View>

            <View style={styles.half}>
              <Text style={styles.label}>End Date</Text>
              <TextInput
                placeholder="dd/mm/yyyy"
                placeholderTextColor="#eee"
                style={styles.underlineInput}
              />
            </View>
          </View>

          <Text style={styles.label}>Number of Travelers</Text>
          <TextInput
            placeholder="2–3 people"
            placeholderTextColor="#eee"
            style={styles.underlineInput}
          />

          <Text style={styles.label}>Trip Interests</Text>
          <View style={styles.interestContainer}>
            {["Beach", "Culture", "Adventure", "Food", "Nightlife", "Nature", "Photography", "Shopping","trek"].map(item => (
              <TouchableOpacity key={item} style={styles.interestBadge}>
                <Text style={styles.interestText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.label, { marginTop: 25 }]}>Trip Description</Text>
          <TextInput
            placeholder="Tell others about your trip idea..."
            placeholderTextColor="#eee"
            style={[styles.underlineInput, { height: 100 }]}
            multiline
          />

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Create Trip</Text>
          </TouchableOpacity>

        </BlurView>

      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 80,
  },

  formCard: {
    borderRadius: 25,
    marginTop: 120,
    padding: 25,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.15)",
  },

  heading: {
    fontSize: 33,
    fontWeight: "800",
    color: "#ffffffff",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "French"
  },

  label: {
    color: "#fff",
    fontWeight: "800",
    marginBottom: 6,
    marginTop: 12,
  },

  underlineInput: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingVertical: 8,
    color: "#fff",
    fontSize: 16,
    marginBottom: 17,
  },

  row: {
    flexDirection: "row",
    gap: 15,
  },
  half: {
    flex: 1,
  },

  interestContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
  interestBadge: {
    backgroundColor: "rgba(255,255,255,0.8)",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  interestText: {
    color: "#222",
    fontWeight: "500",
  },

  button: {
    marginTop: 25,
    backgroundColor: "#fffefeff",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "#111111ff",
    fontWeight: "600",
    fontSize: 16,
  },
});
