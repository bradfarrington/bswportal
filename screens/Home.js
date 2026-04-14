import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc } from "firebase/firestore";
import { firestoreDb } from "../config/firebaseConfig";
import { registerForPushNotificationsAsync } from "../components/pushNotifications";
import { LinearGradient } from "expo-linear-gradient";

const { height, width } = Dimensions.get("window");

const Home = () => {
  const navigation = useNavigation();
  const [pushToken, setPushToken] = useState();
  const currentDate = new Date();
  
  const addTokentoFirebase = async () => {
    try {
      if (pushToken) {
        await setDoc(doc(firestoreDb, "pushTokens", pushToken), {
          expoPushToken: pushToken,
          TimeStamp: currentDate,
        });
        console.log("Token Add succesfully");
      }
      navigation.navigate("HomeScreen");
    } catch (e) {
      navigation.navigate("HomeScreen");
      console.log("error while adding document", e);
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
        <Text style={styles.titleText}>
          Services You{"\n"}
          <Text style={styles.titleTextBold}>Can Trust!</Text>
        </Text>
        
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => addTokentoFirebase()}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonTitle}>Get Started</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 30,
    paddingBottom: 50,
    backgroundColor: 'transparent',
  },
  titleText: {
    fontSize: 34,
    fontFamily: "RM",
    color: "#666",
    marginBottom: 30,
    lineHeight: 45,
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
  buttonTitle: {
    fontSize: 18,
    fontFamily: "RM",
    color: "white",
  },
});
