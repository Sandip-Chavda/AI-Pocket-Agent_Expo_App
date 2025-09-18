import { COLORS } from "@/constants/colors";
import { Fontisto } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[
          COLORS.primaryGradient,
          "transparent",
          "transparent",
          COLORS.primaryGradient,
        ]}
        style={[StyleSheet.absoluteFill]}
      />
      <Image
        source={require("@/assets/images/robot/img13.png")}
        style={styles.image}
        contentFit="contain"
      />
      <View>
        <Text style={styles.title}>Welcome to AI Pocket Agent</Text>
        <Text style={styles.subTitle}>
          Your personal AI assistant for managing tasks, scheduling, and more.
        </Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Fontisto name="google" size={22} color="white" />
        <Text style={styles.buttonText}>Google Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  image: {
    width: Dimensions.get("screen").width * 0.85,
    height: 280,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "700",
    color: COLORS.primary,
    marginTop: 10,
  },
  subTitle: {
    textAlign: "center",
    fontSize: 15,
    marginTop: 5,
    lineHeight: 20,
    letterSpacing: 0.7,
    color: COLORS.lightGray,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "100%",
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    marginTop: 20,
    borderRadius: 50,
    boxShadow: "-1px 0px 50px -2px #5d5d5db2",
    marginBottom: 25,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    color: COLORS.white,
    fontWeight: "600",
  },
});
