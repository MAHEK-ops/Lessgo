import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, ScrollView, } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/chat.jpg")}
        style={styles.bg}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.1)"]}
          style={styles.overlay}
        />

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.centerBox}>
            <Image source={require("../assets/Goa.jpg")} style={styles.avatar} />
          </View>

          <Text style={styles.name}>Aria Stark</Text>
          <Text style={styles.bio}>
            Wanderer, dreamer, and storyteller on a quest to explore every
            corner of the world.
          </Text>

          <View style={styles.statsRow}>
            <BlurView intensity={50} tint="light" style={styles.statsCard}>
              <Text style={styles.statsNumber}>12</Text>
              <Text style={styles.statsLabel}>Trips Joined</Text>
            </BlurView>

            <BlurView intensity={50} tint="light" style={styles.statsCard}>
              <Text style={styles.statsNumber}>28</Text>
              <Text style={styles.statsLabel}>Trips Created</Text>
            </BlurView>
          </View>

          <BlurView intensity={50} tint="light" style={styles.singleStatsCard}>
            <Text style={styles.statsNumber}>5</Text>
            <Text style={styles.statsLabel}>Upcoming</Text>
          </BlurView>

          <View style={{ marginTop: 20 }}>
            <BlurView intensity={50} tint="light" style={styles.menuItem}>
              <Text style={styles.menuText}>My Trips</Text>
              <Text style={styles.arrow}>›</Text>
            </BlurView>

            <BlurView intensity={50} tint="light" style={styles.menuItem}>
              <Text style={styles.menuText}>Achievements</Text>
              <Text style={styles.arrow}>›</Text>
            </BlurView>

            <BlurView intensity={70} tint="light" style={styles.menuLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </BlurView>
          </View>

          <View style={{ height: 50 }} />
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
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  editText: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.9,
  },

  centerBox: {
    alignItems: "center",
    marginTop: 20,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 100,
  },

  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },

  bio: {
    fontSize: 14,
    color: "#f5f5f5",
    textAlign: "center",
    marginTop: 8,
    marginHorizontal: 35,
    lineHeight: 20,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginTop: 25,
  },

  statsCard: {
    width: "48%",
    borderRadius: 25,
    overflow: "hidden",
    paddingVertical: 18,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },

  statsNumber: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "700",
  },
  statsLabel: {
    fontSize: 13,
    color: "#eee",
    marginTop: 4,
  },

  singleStatsCard: {
    borderRadius: 25,
    overflow: "hidden",
    paddingVertical: 18,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    marginHorizontal: 25,
    marginTop: 15,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 25,
    marginVertical: 8,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.15)",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  menuText: {
    color: "#fff",
    fontSize: 16,
  },
  arrow: {
    fontSize: 22,
    color: "#fff",
    opacity: 0.9,
  },

  menuLogout: {
    marginHorizontal: 25,
    marginTop: 10,
    paddingVertical: 18,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "rgba(255,60,60,0.25)",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },

  logoutText: {
    color: "#ffe",
    fontSize: 17,
    fontWeight: "700",
  },
});
