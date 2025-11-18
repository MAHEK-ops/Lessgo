// Destinations.js
import React, { useRef, useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated, ImageBackground, Image, TouchableOpacity } from "react-native";

import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen";

import { RFPercentage } from "react-native-responsive-fontsize";

const DATA = [
  {
    id: "1",
    src: require("./../assets/spitiValley.jpg"),
    title: "Spiti Valley",
    desc: "Mountains, trekking, and pine-scented trails.",
  },
  {
    id: "2",
    src: require("./../assets/Goa.jpg"),
    title: "Goa",
    desc: "Beaches, sunsets, and chilled-out nightlife.",
  },
  {
    id: "3",
    src: require("./../assets/kerala.jpg"),
    title: "Kerala",
    desc: "God's Own Country — backwaters, green hills, and spice-scented air.",
  },
  {
    id: "4",
    src: require("./../assets/Rajasthan.jpg"),
    title: "Rajasthan",
    desc: "Desert forts, colorful markets, and royal palaces.",
  },
];

const CARD_WIDTH = wp("35%");
const CARD_SPACING = wp("0%");
const FULL_CARD = CARD_WIDTH + CARD_SPACING * 2;

export default function Destinations() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const flatRef = useRef(null);

  useEffect(() => {
    const id = scrollX.addListener(({ value }) => {
      const idx = Math.round(value / FULL_CARD);
      if (idx !== activeIndex && idx >= 0 && idx < DATA.length) {
        setActiveIndex(idx);
      }
    });

    return () => scrollX.removeListener(id);
  }, [activeIndex]);

  const goPrev = () => {
    const i = Math.max(0, activeIndex - 1);
    flatRef.current?.scrollToOffset({ offset: i * FULL_CARD, animated: true });
    setActiveIndex(i);
  };

  const goNext = () => {
    const i = Math.min(DATA.length - 1, activeIndex + 1);
    flatRef.current?.scrollToOffset({ offset: i * FULL_CARD, animated: true });
    setActiveIndex(i);
  };

  const heroTranslateY = scrollY.interpolate({
    inputRange: [0, hp("40%")],
    outputRange: [0, -hp("6%")],
    extrapolate: "clamp",
  });

  const current = DATA[activeIndex];

  return (
    <View style={styles.container}>

      <Animated.View style={[styles.heroWrap, { transform: [{ translateY: heroTranslateY }] }]}>
        <ImageBackground source={current.src} style={styles.hero}>
          <LinearGradient
            colors={["rgba(0,0,0,0.12)", "rgba(0,0,0,0.78)"]}
            style={StyleSheet.absoluteFill}
          />
        </ImageBackground>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.headerContent}>
          <Text style={styles.title}>{current.title}</Text>

          <BlurView intensity={50} tint="dark" style={styles.descBlur}>
            <Text style={styles.desc} numberOfLines={3}>
              {current.desc}
            </Text>
          </BlurView>

          <TouchableOpacity activeOpacity={0.9} style={styles.exploreBtn}>
            <Text style={styles.exploreText}>Explore</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.carouselArea}>

          <BlurView intensity={80} tint="light" style={styles.arrowBlur}>
            <TouchableOpacity onPress={goPrev} style={styles.arrowTouch}>
              <Ionicons name="chevron-back" size={RFPercentage(3)} color="#111" />
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
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / FULL_CARD);
              setActiveIndex(index);
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            renderItem={({ item, index }) => {
              const scale = scrollX.interpolate({
                inputRange: [
                  (index - 1) * FULL_CARD,
                  index * FULL_CARD,
                  (index + 1) * FULL_CARD,
                ],
                outputRange: [0.6, 0.8, 0.6],
                extrapolate: "clamp",
              });

              return (
                <View style={{ width: FULL_CARD, alignItems: "center" }}>
                  <Animated.View style={[styles.cardGlass, { transform: [{ scale }] }]}>
                    <Image source={item.src} style={styles.cardImage} />
                  </Animated.View>
                </View>
              );
            }}
          />
          <BlurView intensity={80} tint="light" style={styles.arrowBlur}>
            <TouchableOpacity onPress={goNext} style={styles.arrowTouch}>
              <Ionicons name="chevron-forward" size={RFPercentage(3)} color="#111" />
            </TouchableOpacity>
          </BlurView>
        </View>

        <View style={styles.pagination}>
          {DATA.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === activeIndex && styles.dotActive]}
            />
          ))}
        </View>


        <View style={{ height: hp("8%") }} />
      </Animated.ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  heroWrap: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: "100%",
  },

  hero: {
    width: "100%",
    height: "100%",
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: hp("21%"),
    paddingBottom: hp("6%"),
  },

  headerContent: {
    paddingHorizontal: wp("6%"),
    marginBottom: hp("2%"),
  },

  title: {
    color: "#fff",
    fontSize: RFPercentage(5),
    fontWeight: "800",
    marginBottom: hp("3%"),
  },

  descBlur: {
    borderRadius: 14,
    padding: hp("1.2%"),
    marginBottom: hp("1.2%"),
    width: wp("86%"),
    overflow: "hidden",
  },

  desc: {
    color: "#fff",
    fontSize: RFPercentage(2),
    lineHeight: RFPercentage(2.8),
  },

  exploreBtn: {
    backgroundColor: "#3B71F3",
    paddingVertical: hp("1.3%"),
    paddingHorizontal: wp("5%"),
    borderRadius: 12,
    alignSelf: "flex-start",
    margin: wp("2%")
  },

  exploreText: {
    color: "#fff",
    fontSize: RFPercentage(2.2),
    fontWeight: "700",
  },

  carouselArea: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("18%"),
  },

  arrowBlur: {
    width: wp("11%"),
    height: wp("11%"),
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
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
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.12)",
  },

  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: hp("2%"),
  },
  dot: {
    width: wp("2.6%"),
    height: wp("2.6%"),
    borderRadius: 50,
    marginHorizontal: wp("1%"),
    backgroundColor: "rgba(255,255,255,0.45)",
  },
  dotActive: {
    width: wp("3.8%"),
    backgroundColor: "#fff",
  },
});
