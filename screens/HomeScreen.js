import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useLayoutEffect } from "react";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { logo } from "../assets";
import styles from "../components/style";
const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={styles.containerHome} edges={['top']}>
      <View>
        <Animatable.Image
          style={styles.logo}
          animation={"pulse"}
          easing="ease-in-out"
          iterationCount={"infinite"}
          source={logo}
          resizeMode="contain"
        />
      </View>

      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Brochures")}
          style={styles.button}
        >
          <Text style={styles.buttontext}>Brochures</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("HomeScreen", { screen: "Products" })}
        >
          <Text style={styles.buttontext}>Get A Quote</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Designer")}
        >
          <Text style={styles.buttontext}>Design Your Door</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Customer Portal")}
          style={styles.button}
        >
          <Text style={styles.buttontext}>Track Your Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("SaleProducts")}
          style={styles.button}
        >
          <Text style={styles.buttontext}>Ex-Display Sale</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
