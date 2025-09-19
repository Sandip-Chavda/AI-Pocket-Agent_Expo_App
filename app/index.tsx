import { firestoreDb } from "@/config/firebaseConfig";
import { COLORS } from "@/constants/colors";
import { useAuth, useSSO, useUser } from "@clerk/clerk-expo";
import { Fontisto } from "@expo/vector-icons";
import * as AuthSession from "expo-auth-session";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { doc, setDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const { isSignedIn } = useAuth();
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  // console.log(user?.primaryEmailAddress?.emailAddress);

  // useEffect(() => {
  //   if (isSignedIn) {
  //     //TODO: Redirect to Home screen.
  //     router.replace("/(tabs)/home");
  //   }
  //   if (isSignedIn != undefined) {
  //     setLoading(false);
  //   }
  // }, [isSignedIn]);

  // ...existing code...
  useEffect(() => {
    // wait until Clerk finishes loading
    if (!isLoaded) return;

    // small delay so the root layout / navigator has time to mount
    if (isSignedIn) {
      const id = setTimeout(() => {
        router.replace("/(tabs)/home");
      }, 500);
      return () => clearTimeout(id);
    }

    // Clerk finished loading and user is not signed in — hide splash
    setLoading(false);
  }, [isLoaded, isSignedIn, router]);
  // ...existing code...

  useWarmUpBrowser();

  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO();

  const onLoginPress = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          // For web, defaults to current path
          // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
          // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
          redirectUrl: AuthSession.makeRedirectUri(),
        });

      // console.log("----->", signIn);

      if (signUp) {
        await setDoc(doc(firestoreDb, "users", signUp.emailAddress ?? ""), {
          email: signUp.emailAddress,
          name: signUp.firstName + " " + signUp.lastName,
          joinDate: Date.now(),
          credits: 20,
        });
      }

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({
          session: createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              // Check for tasks and navigate to custom UI to help users resolve them
              // See https://clerk.com/docs/custom-flows/overview#session-tasks
              console.log(session?.currentTask);
              return;
            }

            router.push("/");
          },
        });
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

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
        pointerEvents="none"
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

      {!loading && (
        <TouchableOpacity style={styles.button} onPress={onLoginPress}>
          <Fontisto name="google" size={22} color="white" />
          <Text style={styles.buttonText}>Login with Google</Text>
        </TouchableOpacity>
      )}

      {loading && <ActivityIndicator size={"large"} color={COLORS.primary} />}
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
