import { View, SafeAreaView } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import { FontAwesome } from "@expo/vector-icons";
import styles, { backButtonSize } from "../components/style";

const WEBSITE = "https://orderupdates.abinitiosoftware.co.uk/login/6008198";

const Orders = () => {

return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F9F9FB",
      }}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        <WebView source={{ uri: WEBSITE }} />
      </View>
    </SafeAreaView>
  );
};
export default Orders;
