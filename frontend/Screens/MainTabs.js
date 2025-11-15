import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Destinations from "./Destinations";
import CreateTripScreen from "./CreateTripScreen";
import ChatScreen from "./ChatScreen";
import TripDetailsScreen from "./TripDetailsScreen";
import ProfileScreen from "./ProfileScreen";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();

export default function MainTabs() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
            <Tab.Navigator
                initialRouteName="Destinations"
                screenOptions={{
                    swipeEnabled: true,
                    lazy: true,
                    tabBarScrollEnabled: true, // more like a website
                    tabBarStyle: {
                        backgroundColor: "transparent",
                        elevation: 0,
                        shadowOpacity: 0,
                        height: 60,
                    },
                    tabBarItemStyle: {
                        width: "auto",
                        paddingHorizontal: 20,
                    },
                    tabBarLabelStyle: {
                        fontSize: 15,
                        fontWeight: "700",
                        color: "#ffffff",
                        textTransform: "none",
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: "#ffffff",
                        height: 3,
                        borderRadius: 2,
                        width: 60,
                        marginLeft: 20,
                    },
                    tabBarPressColor: "rgba(255,255,255,0.1)",
                }}
            >
                <Tab.Screen name="Destinations" component={Destinations} />
                <Tab.Screen name="Create Trip" component={CreateTripScreen} />
                <Tab.Screen name="Chat" component={ChatScreen} />
                <Tab.Screen name="Trip Details" component={TripDetailsScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </SafeAreaView>
    );
}
