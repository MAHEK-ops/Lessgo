// src/screens/Destination/DestinationScreen.js
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";

const DATA = [
  { id: "1", src: "https://picsum.photos/900/1200?random=101" },
  { id: "2", src: "https://picsum.photos/900/1200?random=102" },
  { id: "3", src: "https://picsum.photos/900/1200?random=103" },
  { id: "4", src: "https://picsum.photos/900/1200?random=104" },
];

const CARD_WIDTH = wp("28%");
const CARD_SPACING = wp("4%");
const FULL_CARD = CARD_WIDTH + CARD_SPACING * 2;

export default function DestinationScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const flatRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const onMomentumScrollEnd = (ev) => {
    const offsetX = ev.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / FULL_CARD);
    setActiveIndex(index);
  };

  const goPrev = () => {
    const next = Math.max(0, activeIndex - 1);
    flatRef.current.scrollToOffset({ offset: next * FULL_CARD, animated: true });
    setActiveIndex(next);
  };

  const goNext = () => {
    const next = Math.min(DATA.length - 1, activeIndex + 1);
    flatRef.current.scrollToOffset({ offset: next * FULL_CARD, animated: true });
    setActiveIndex(next);
  };

  // Parallax translate for hero image
  const heroTranslateY = scrollY.interpolate({
    inputRange: [0, hp("40%")],
    outputRange: [0, -hp("6%")],
    extrapolate: "clamp",
  });

  const currentBg = DATA[activeIndex]?.src;

  return (
    <View style={styles.container}>
      {/* HERO BACKGROUND */}
      <Animated.View
        style={[styles.heroWrap, { transform: [{ translateY: heroTranslateY }] }]}
      >
        <ImageBackground source={{ uri: currentBg }} style={styles.hero}>
          <LinearGradient
            colors={["rgba(0,0,0,0.12)", "rgba(0,0,0,0.75)"]}
            style={StyleSheet.absoluteFill}
          />
        </ImageBackground>
      </Animated.View>

      {/* SCROLL CONTENT */}
      <Animated.ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
      >
        {/* TITLE + DESCRIPTION */}
        <View style={styles.headerContent}>
          <Text style={styles.title}>Kerala</Text>

          <BlurView intensity={50} tint="dark" style={styles.descBlur}>
            <Text style={styles.desc}>
              Known as "God’s Own Country", Kerala is full of backwaters, lush hills,
              beaches and incredible monsoon scenery.
            </Text>
          </BlurView>

          {/* EXPLORE BUTTON */}
          <View style={styles.glowWrap}>
            <TouchableOpacity activeOpacity={0.9} style={styles.exploreBtn}>
              <Text style={styles.exploreText}>Explore</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* CAROUSEL */}
        <View style={styles.carouselArea}>
          {/* LEFT ARROW */}
          <BlurView intensity={80} tint="light" style={styles.arrowBlur}>
            <TouchableOpacity onPress={goPrev} style={styles.arrowTouch}>
              <Ionicons name="arrow-back" size={RFPercentage(3)} color="#111" />
            </TouchableOpacity>
          </BlurView>

          <Animated.FlatList
            ref={flatRef}
            horizontal
            data={DATA}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: wp("10%") }}
            snapToInterval={FULL_CARD}
            decelerationRate="fast"
            onMomentumScrollEnd={onMomentumScrollEnd}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 2) * FULL_CARD,
                (index - 1) * FULL_CARD,
                index * FULL_CARD,
                (index + 1) * FULL_CARD,
                (index + 2) * FULL_CARD,
              ];

              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.86, 0.92, 1.08, 0.92, 0.86],
                extrapolate: "clamp",
              });

              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.6, 0.8, 1, 0.8, 0.6],
                extrapolate: "clamp",
              });

              return (
                <View style={{ width: FULL_CARD, alignItems: "center" }}>
                  <Animated.View style={[styles.cardGlass, { transform: [{ scale }], opacity }]}>
                    <Image source={{ uri: item.src }} style={styles.cardImage} />
                  </Animated.View>
                </View>
              );
            }}
          />

          {/* RIGHT ARROW */}
          <BlurView intensity={80} tint="light" style={styles.arrowBlur}>
            <TouchableOpacity onPress={goNext} style={styles.arrowTouch}>
              <Ionicons name="arrow-forward" size={RFPercentage(3)} color="#111" />
            </TouchableOpacity>
          </BlurView>
        </View>

        {/* DOTS */}
        <View style={styles.pagination}>
          {DATA.map((_, i) => (
            <View key={i} style={[styles.dot, i === activeIndex && styles.dotActive]} />
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  heroWrap: {
    height: hp("58%"),
    width: "100%",
    position: "absolute",
    top: 0,
    zIndex: 1,
  },

  hero: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  scroll: {
    flex: 1,
    zIndex: 2,
  },

  scrollContent: {
    paddingTop: hp("16%"), // ⭐ Keeps content below floating tabs
    paddingBottom: hp("8%"),
  },

  headerContent: {
    paddingHorizontal: wp("6%"),
    marginBottom: hp("2%"),
  },

  title: {
    color: "#fff",
    fontSize: RFPercentage(6.6),
    fontWeight: "800",
    marginBottom: hp("1%"),
  },

  descBlur: {
    borderRadius: 14,
    padding: hp("1.6%"),
    marginBottom: hp("1.6%"),
    width: wp("86%"),
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },

  desc: {
    color: "#fff",
    fontSize: RFPercentage(2.1),
    lineHeight: RFPercentage(3),
  },

  glowWrap: {
    alignSelf: "flex-start",
    marginTop: hp("1%"),
    shadowColor: "#3B71F3",
    shadowOpacity: 0.45,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },

  exploreBtn: {
    backgroundColor: "#3B71F3",
    paddingVertical: hp("1.4%"),
    paddingHorizontal: wp("6%"),
    borderRadius: 12,
  },

  exploreText: {
    color: "#fff",
    fontSize: RFPercentage(2.4),
    fontWeight: "700",
  },

  carouselArea: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("3%"),
  },

  arrowBlur: {
    width: wp("12%"),
    height: wp("12%"),
    borderRadius: wp("12%") / 2,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: wp("1%"),
    overflow: "hidden",
  },

  arrowTouch: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  cardGlass: {
    width: CARD_WIDTH,
    height: hp("24%"),
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },

  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    resizeMode: "cover",
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: hp("2%"),
  },

  dot: {
    width: wp("2.6%"),
    height: wp("2.6%"),
    backgroundColor: "rgba(255,255,255,0.45)",
    borderRadius: 50,
    marginHorizontal: wp("1%"),
  },

  dotActive: {
    width: wp("3.8%"),
    backgroundColor: "#fff",
  },
});
