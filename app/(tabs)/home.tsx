import { COLORS } from "@/constants/colors";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={{ fontSize: 20, fontWeight: "800" }}>AI Pocket Agent</Text>
      ),
      headerTitleAlign: "center",
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginLeft: 16,
            backgroundColor: COLORS.primary,
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 6,
            paddingHorizontal: 10,
            borderRadius: 40,
            gap: 5,
            // boxShadow: "-3px 3px 152px 1px rgba(136, 221, 245, 1)",
          }}
        >
          <Text style={{ color: "white", fontWeight: "500", fontSize: 16 }}>
            Pro
          </Text>
          <Octicons name="sparkles-fill" size={20} color="yellow" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 16 }}>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
