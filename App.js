import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { useFonts } from "expo-font";
import { Montserrat_800ExtraBold, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold } from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "./components/pushNotifications";
import { StatusBar } from "expo-status-bar"; 
import { SafeAreaProvider } from "react-native-safe-area-context";
import { loadCategories } from "./data/ProductsData";
import { loadAllDesignerData } from "./data/DoorDesignerData";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEventListener } from "expo";

// Keep the splash screen visible while we load fonts/resources
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [fontsLoaded] = useFonts({
    RB: require("./assets/fonts/Roboto-Bold.ttf"),
    RM: require("./assets/fonts/Roboto-Medium.ttf"),
    RR: require("./assets/fonts/Roboto-Regular.ttf"),
    MontserratExtraBold: Montserrat_800ExtraBold,
    MontserratBold: Montserrat_700Bold,
    InterRegular: Inter_400Regular,
    InterMedium: Inter_500Medium,
    InterSemiBold: Inter_600SemiBold,
    InterBold: Inter_700Bold,
    InterExtraBold: Inter_800ExtraBold,
  });

  // Prefetch critical data during splash screen (parallel with fonts)
  const [dataReady, setDataReady] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);

  // Create the video player for the splash screen video
  const player = useVideoPlayer(
    require("./assets/splash-screen-video.mp4"),
    (player) => {
      player.loop = false;
      player.play();
    }
  );

  // Listen for the video to finish playing
  useEventListener(player, "playToEnd", () => {
    setVideoFinished(true);
  });

  // Listen for status changes to handle errors
  useEventListener(player, "statusChange", ({ status, error }) => {
    if (status === "error") {
      console.log("Video error:", error);
      // Fallback in case of video error
      setVideoFinished(true);
      SplashScreen.hideAsync();
    }
  });

  useEffect(() => {
    Promise.all([
      loadCategories().catch(err => console.log('[Prefetch] Categories failed:', err)),
      loadAllDesignerData().catch(err => console.log('[Prefetch] Designer data failed:', err)),
    ]).then(() => {
      console.log('[Prefetch] All data ready');
      setDataReady(true);
    }).catch(() => setDataReady(true)); // Never block app on failure
  }, []);

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
     registerForPushNotificationsAsync()
      .then((x) => console.log(x))
      .catch((error) => console.log(error));
  }, []);

  // Hide the native splash screen when the video renders its first frame
  const onFirstFrameRender = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  const appReady = fontsLoaded && dataReady && videoFinished;

  if (!appReady) {
    return (
      <View style={styles.splashContainer}>
        <VideoView
          player={player}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          nativeControls={false}
          onFirstFrameRender={onFirstFrameRender}
        />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "#000000",
  },
});
