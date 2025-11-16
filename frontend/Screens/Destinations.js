// Destinations.js
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
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";

const { width: SCREEN_W } = Dimensions.get("window");

const DATA = [
  {
    id: "1",
    src: "https://picsum.photos/1080/1920?random=201",
    title: "Kerala",
    desc: "God's Own Country — backwaters, green hills, and spice-scented air.",
  },
  {
    id: "2",
    src: "https://picsum.photos/1080/1920?random=202",
    title: "Goa",
    desc: "Beaches, sunsets, and chilled-out nightlife.",
  },
  {
    id: "3",
    src: "https://picsum.photos/1080/1920?random=203",
    title: "Himachal",
    desc: "Mountains, trekking, and pine-scented trails.",
  },
  {
    id: "4",
    src: "https://picsum.photos/1080/1920?random=204",
    title: "Rajasthan",
    desc: "Desert forts, colorful markets, and royal palaces.",
  },
];

const CARD_WIDTH = wp("28%");
const CARD_SPACING = wp("4%");
const FULL_CARD = CARD_WIDTH + CARD_SPACING * 2;

export default function Destinations() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const flatRef = useRef(null);

  // update activeIndex live while scrolling
  useEffect(() => {
    const id = scrollX.addListener(({ value }) => {
      const idx = Math.round(value / FULL_CARD);
      if (idx >= 0 && idx < DATA.length && idx !== activeIndex) {
        setActiveIndex(idx);
      }
    });
    return () => scrollX.removeListener(id);
  }, [activeIndex]);

  const onMomentumScrollEnd = (ev) => {
    const offset = ev.nativeEvent.contentOffset.x;
    const index = Math.round(offset / FULL_CARD);
    setActiveIndex(index);
  };

  const goPrev = () => {
    const next = Math.max(0, activeIndex - 1);
    flatRef.current?.scrollToOffset({ offset: next * FULL_CARD, animated: true });
    setActiveIndex(next);
  };

  const goNext = () => {
    const next = Math.min(DATA.length - 1, activeIndex + 1);
    flatRef.current?.scrollToOffset({ offset: next * FULL_CARD, animated: true });
    setActiveIndex(next);
  };

  const heroTranslateY = scrollY.interpolate({
    inputRange: [0, hp("40%")],
    outputRange: [0, -hp("6%")],
    extrapolate: "clamp",
  });

  const currentBg = DATA[activeIndex]?.src ?? DATA[0].src;
  const currentTitle = DATA[activeIndex]?.title ?? "";
  const currentDesc = DATA[activeIndex]?.desc ?? "";

  return (
    <View style={styles.container}>
      {/* Full-screen hero background (covers whole screen, no white margins) */}
      <Animated.View style={[styles.heroWrap, { transform: [{ translateY: heroTranslateY }] }]}>
        <ImageBackground source={{ uri: currentBg }} style={styles.hero}>
          <LinearGradient colors={["rgba(0,0,0,0.12)", "rgba(0,0,0,0.78)"]} style={StyleSheet.absoluteFill} />
        </ImageBackground>
      </Animated.View>

      {/* content scroll - transparent background so hero shows through */}
      <Animated.ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
      >
        {/* Title & text derived from active carousel item */}
        <View style={styles.headerContent}>
          <Text style={styles.title}>{currentTitle}</Text>

          <BlurView intensity={50} tint="dark" style={styles.descBlur}>
            <Text style={styles.desc} numberOfLines={3} ellipsizeMode="tail">
              {currentDesc}
            </Text>
          </BlurView>

          <TouchableOpacity activeOpacity={0.9} style={styles.exploreBtn}>
            <Text style={styles.exploreText}>Explore</Text>
          </TouchableOpacity>
        </View>

        {/* Carousel area */}
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
            onMomentumScrollEnd={onMomentumScrollEnd}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
              useNativeDriver: true,
            })}
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
                outputRange: [0.6, 0.85, 1, 0.85, 0.6],
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

          <BlurView intensity={80} tint="light" style={styles.arrowBlur}>
            <TouchableOpacity onPress={goNext} style={styles.arrowTouch}>
              <Ionicons name="chevron-forward" size={RFPercentage(3)} color="#111" />
            </TouchableOpacity>
          </BlurView>
        </View>

        {/* pagination */}
        <View style={styles.pagination}>
          {DATA.map((_, i) => (
            <View key={i} style={[styles.dot, i === activeIndex && styles.dotActive]} />
          ))}
        </View>

        {/* Extra bottom spacer so last elements don't clash with safe area */}
        <View style={{ height: hp("8%") }} />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent" },

  heroWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%", // full-screen hero
    zIndex: 0,
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
    // leave room for the floating tab bar at the top (adjust if your tabs move)
    paddingTop: hp("14%"),
    paddingBottom: hp("6%"),
  },

  headerContent: {
    paddingHorizontal: wp("6%"),
    marginBottom: hp("2%"),
  },

  title: {
    color: "#fff",
    fontSize: RFPercentage(6.2),
    fontWeight: "800",
    marginBottom: hp("0.6%"),
    textShadowColor: "rgba(0,0,0,0.45)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },

  descBlur: {
    borderRadius: 14,
    padding: hp("1.2%"),
    marginBottom: hp("1.2%"),
    width: wp("86%"),
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },

  desc: {
    color: "#fff",
    fontSize: RFPercentage(2),
    lineHeight: RFPercentage(2.8),
  },

  exploreBtn: {
    backgroundColor: "#3B71F3",
    paddingVertical: hp("1.2%"),
    paddingHorizontal: wp("5.5%"),
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: hp("1%"),
    shadowColor: "#3B71F3",
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 6,
  },

  exploreText: {
    color: "#fff",
    fontSize: RFPercentage(2.2),
    fontWeight: "700",
  },

  carouselArea: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("3%"),
  },

  arrowBlur: {
    width: wp("11%"),
    height: wp("11%"),
    borderRadius: wp("11%") / 2,
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
    backgroundColor: "rgba(255,255,255,0.12)",
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
