import { COLORS } from "@/constants/colors";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: "#7c7c7cff",
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: {
          borderTopWidth: 0.5,
          elevation: 0,
          shadowColor: "transparent",
          shadowOffset: { height: 0, width: 0 },
          shadowOpacity: 0,
          shadowRadius: 0,
          paddingTop: 5,
          height: 75,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused, size }) => (
            <FontAwesome5 name={"home"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          headerShown: false,
          title: "Explore",
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, focused, size }) => (
            <FontAwesome6 name={"soccer-ball"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          headerShown: false,
          title: "History",
          tabBarLabel: "History",
          tabBarIcon: ({ color, focused, size }) => (
            <FontAwesome5 name={"history"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, focused, size }) => (
            <FontAwesome5 name={"user-alt"} color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
