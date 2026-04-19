import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../config/supabaseClient";
import { registerForPushNotificationsAsync } from "../components/pushNotifications";
import { LinearGradient } from "expo-linear-gradient";
import { tabletLogo } from "../assets";

const { height, width } = Dimensions.get("window");
const isTablet = width >= 768;

const Home = () => {
  const navigation = useNavigation();
  const [pushToken, setPushToken] = useState();
  const currentDate = new Date();
  
  const addTokenToSupabase = async () => {
    try {
      if (pushToken) {
        const { error } = await supabase
          .from("push_tokens")
          .upsert(
            { expo_push_token: pushToken },
            { onConflict: "expo_push_token" }
          );
        if (error) throw error;
        console.log("Token added successfully");
      }
      navigation.navigate("HomeScreen");
    } catch (e) {
      navigation.navigate("HomeScreen");
      console.log("error while adding token", e);
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((x) => setPushToken(x))
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      {/* Background Hero Image */}
      <View style={styles.imageContainer}>
        <Image 
          source={require('../assets/hero-bg-cropped.png')} 
          style={styles.heroImage} 
          resizeMode="cover" 
        />
      </View>

      {/* Gradient overlay to blend image into the white bottom area */}
      <LinearGradient
        colors={['rgba(255,255,255,0)', '#ffffff', '#ffffff']}
        locations={[0, 0.4, 1.0]}
        style={styles.gradientOverlay}
      />

      {/* Bottom Content Container */}
      <View style={styles.bottomContainer}>
        <View style={isTablet ? styles.contentWrapTablet : styles.contentWrap}>
          {isTablet && (
            <View style={styles.leftLogoTablet}>
              <Image 
                source={tabletLogo} 
                style={styles.logoTablet} 
                resizeMode="contain" 
              />
            </View>
          )}

          <View style={isTablet ? styles.rightTextContentTablet : styles.fullContent}>
            <Text style={isTablet ? styles.titleTextTablet : styles.titleText}>
              Services You{"\n"}
              <Text style={styles.titleTextBold}>Can Trust!</Text>
            </Text>
            
            <TouchableOpacity
              style={isTablet ? styles.buttonStyleTablet : styles.buttonStyle}
              onPress={() => addTokenToSupabase()}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonTitle}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  imageContainer: {
    width: width,
    height: height, 
    position: 'absolute',
    top: 0,
    overflow: 'hidden',
  },
  heroImage: {
    width: width,
    height: height, 
    position: 'absolute',
    top: 0,
  },
  gradientOverlay: {
    width: width,
    height: height * 0.5,
    position: 'absolute',
    bottom: 0, 
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingBottom: 50,
    backgroundColor: 'transparent',
  },
  contentWrap: {
    width: "100%",
    maxWidth: 500,
  },
  contentWrapTablet: {
    width: "100%",
    maxWidth: 900,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  rightTextContentTablet: {
    flex: 1,
    alignItems: "flex-start",
    paddingLeft: 20,
  },
  fullContent: {
    width: "100%",
  },
  leftLogoTablet: {
    flex: 1,
    alignItems: "flex-start",
  },
  logoTablet: {
    width: 450,
    height: 220,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 34,
    fontFamily: "RM",
    color: "#666",
    marginBottom: 30,
    lineHeight: 45,
  },
  titleTextTablet: {
    fontSize: 42,
    fontFamily: "RM",
    color: "#666",
    marginBottom: 30,
    lineHeight: 52,
    textAlign: "left",
  },
  titleTextBold: {
    fontFamily: "RB",
    color: "#111",
  },
  buttonStyle: {
    width: "100%",
    height: 60,
    borderRadius: 30,
    backgroundColor: "red", 
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "red",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonStyleTablet: {
    width: 250,
    height: 60,
    borderRadius: 30,
    backgroundColor: "red", 
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "red",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonTitle: {
    fontSize: 18,
    fontFamily: "RM",
    color: "white",
  },
});
