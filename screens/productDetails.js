import { Text, TouchableOpacity, ScrollView, Dimensions, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Gallery from "../components/gallery";
import styles, { backButtonSize } from "../components/style";
const ProductDetails = (props) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Product Details",
      headerTitleAlign: "center",
      headerTitleStyle: styles.headerTitle,
      headerStyle: {
        elevation: 0,
      },
      headerLeft: () => (
        <FontAwesome
          name="arrow-circle-left"
          size={backButtonSize}
          color={"red"}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation]);

  const { id, name, price, desc, url, oldPrice, images } = props.route.params;
  const phoneNumber = "01827288688";
  const callNumber = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F9F9FB" }}
      showsVerticalScrollIndicator={false}
    >
      <Gallery images={images} />
      <View style={styles.card}>
      <Text
        style={{
          color: "black",
          fontSize: 24,
           
          alignSelf: "center",
          fontFamily:'RR'
        }}
      >
        Sale Price
      </Text>
      <Animatable.Text
        animation={"pulse"}
        easing="ease-in-out"
        iterationCount={"infinite"}
        style={{
          fontSize: 44,
          color: "green",
          fontFamily:'RB',
          textAlign: "center",
        }}
      >
        {price}
      </Animatable.Text>

      <Text style={styles.description}>Details: {desc}</Text>
      </View>
      <Text style={[styles.buttontext, { color: "black" }]}>
        Cash On Collection
      </Text>

      <TouchableOpacity style={styles.collecttodayButton} onPress={callNumber}>
        <Ionicons name="call-outline" size={24} color="#fff" />
        <Text style={[styles.buttontext, { color: "#fff" ,marginLeft:2}]}>
          Collect Today
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default ProductDetails;
