import React, { useCallback, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { useFonts } from "expo-font";
import { Montserrat_800ExtraBold, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold } from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "./components/pushNotifications";
import { StatusBar } from "expo-status-bar"; 
import { SafeAreaView } from "react-native-safe-area-context";

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
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  useEffect(() => {
    onLayoutRootView();
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#F9FAFB'}}>
    <NavigationContainer>
      <AppNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
    </SafeAreaView>
  );
}
