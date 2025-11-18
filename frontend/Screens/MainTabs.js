import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions } from "react-native";

import Destinations from "./Destinations";
import CreateTripScreen from "./CreateTripScreen";
import ChatScreen from "./ChatScreen";
import TripDetailsScreen from "./TripDetailsScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createMaterialTopTabNavigator();

export default function MainTabs() {
  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get("window");

  const iconSize = width < 380 ? 22 : width < 430 ? 24 : 26;

  const tabFlexBasis = width / 5.5; 
  return (
    <Tab.Navigator
      initialRouteName="Destinations"
      screenOptions={({ route }) => ({
        swipeEnabled: true,
        lazy: true,

        tabBarStyle: {
          position: "absolute",
          top: insets.top + 10,
          left: 0,
          right: 0,
          backgroundColor: "transparent",
          elevation: 0,
          shadowOpacity: 0,
          zIndex: 999,
        },

        tabBarItemStyle: {
          flexBasis: tabFlexBasis,
          flexGrow: 0,
          flexShrink: 1,
          alignItems: "center",
          justifyContent: "center",
        },

        tabBarShowLabel: false,

        tabBarIndicatorStyle: {
          backgroundColor: "#fff",
          height: 3,
          borderRadius: 2,
        },

        tabBarPressColor: "rgba(255,255,255,0.12)",

        tabBarIcon: () => null,
      })}
    >
      <Tab.Screen
        name="Destinations"
        component={Destinations}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="earth-outline"
              size={iconSize}
              color={focused ? "#fff" : "rgba(255,255,255,0.7)"}
            />
          ),
          
        }}
      />

      <Tab.Screen
        name="CreateTrip"
        component={CreateTripScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="add-circle-outline"
              size={iconSize}
              color={focused ? "#fff" : "rgba(255,255,255,0.7)"}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="chatbubble-outline"
              size={iconSize}
              color={focused ? "#fff" : "rgba(255,255,255,0.7)"}
            />
          ),
        }}
      />

      <Tab.Screen
        name="TripDetails"
        component={TripDetailsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="map-outline"
              size={iconSize}
              color={focused ? "#fff" : "rgba(255,255,255,0.7)"}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-outline"
              size={iconSize}
              color={focused ? "#fff" : "rgba(255,255,255,0.7)"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
