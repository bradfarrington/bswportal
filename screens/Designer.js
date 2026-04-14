import { View, SafeAreaView } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import { FontAwesome } from "@expo/vector-icons";
import styles, { backButtonSize } from "../components/style";

const WEBSITE = "https://www.entrancedoorportal.co.uk/BrandedDoorDesigner.aspx?Code=1BRA02";

const Designer = () => {

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F9F9FB",
      }}
    >
      <View style={{ flex: 1, justifyContent: "center" ,marginTop:30}}>
        <WebView source={{ uri: WEBSITE }} />
      </View>
    </SafeAreaView>
  );
};
export default Designer;
