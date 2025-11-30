import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Dimensions, } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const { width } = Dimensions.get("window");

export default function TripDetailsScreen() {
  const [activeTab, setActiveTab] = useState("joined");

  const trips = [
    {
      id: "1",
      type: "joined",
      status: "Booked",
      from: "Goa",
      to: "Spiti",
      dates: "22–29 July",
      description: "A thrilling adventure through the mountains.",
      category: "Premium",
      image: require("./../assets/Goa.jpg"),
      progress: 0.6,
    },
    {
      id: "2",
      type: "joined",
      status: "Upcoming",
      from: "Paris",
      to: "Rome",
      dates: "15–25 August",
      description: "Exploring European art and history.",
      category: "Adventure",
      image: require("./../assets/spitiValley.jpg"),
      progress: 0.2,
    },
    {
      id: "3",
      type: "joined",
      status: "Booked",
      from: "Manali",
      to: "Leh",
      dates: "10–18 September",
      description: "Road trip with stunning landscapes.",
      category: "Adventure",
      image: require("./../assets/camping.jpg"),
      progress: 0.8,
    },
  ];

  const filteredTrips = trips.filter((t) => t.type === activeTab);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("./../assets/chat.jpg")}
        style={styles.bg}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.1)"]}
          style={styles.overlay}
        />
        <View style={styles.header}>
          <Text style={styles.title}>My Trips</Text>
        </View>
        <BlurView intensity={50} tint="light" style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setActiveTab("joined")}
            style={[styles.tab, activeTab === "joined" && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "joined" && styles.activeTabText,
              ]}
            >
              Joined
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("created")}
            style={[styles.tab, activeTab === "created" && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "created" && styles.activeTabText,
              ]}
            >
              Created
            </Text>
          </TouchableOpacity>
        </BlurView>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 260,
          }}
        >
          {filteredTrips.map((trip) => (
            <View key={trip.id} style={styles.cardWrapper}>
              <BlurView intensity={50} tint="light" style={styles.tripCard}>
                <ImageBackground
                  source={trip.image}
                  style={styles.tripImage}
                  imageStyle={{ borderRadius: 20 }}
                />

                <View style={styles.tripContent}>
                  <Text style={styles.status}>{trip.status}</Text>
                  <Text style={styles.route}>
                    {trip.from} → {trip.to}
                  </Text>

                  <View style={styles.progressTrack}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${trip.progress * 100}%` },
                      ]}
                    />
                  </View>

                  <Text style={styles.dates}>{trip.dates}</Text>
                  <Text style={styles.desc}>{trip.description}</Text>

                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{trip.category}</Text>
                  </View>
                </View>
              </BlurView>
            </View>
          ))}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject },

  header: {
    marginTop: 130,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },

  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 5,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 20,
  },
  tabText: {
    fontSize: 16,
    color: "#eee",
  },
  activeTab: {
    backgroundColor: "#b9a1ff55",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },

  cardWrapper: {
    alignItems: "center",
    marginTop: 25,
  },
  tripCard: {
    width: width * 0.9,
    borderRadius: 25,
    paddingBottom: 15,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  tripImage: {
    height: 150,
    width: "100%",
  },
  tripContent: {
    padding: 18,
  },
  status: { color: "#ddd", fontSize: 14 },
  route: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
    marginTop: 3,
  },
  progressTrack: {
    height: 6,
    width: "100%",
    backgroundColor: "#ffffff45",
    borderRadius: 10,
    marginVertical: 12,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#cf77ff",
    borderRadius: 10,
  },
  dates: { color: "#ddd", fontSize: 14 },
  desc: {
    color: "#eee",
    fontSize: 14,
    marginTop: 4,
    lineHeight: 18,
  },
  tag: {
    backgroundColor: "#d57dff",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    marginTop: 12,
  },
  tagText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 12,
  },
});
