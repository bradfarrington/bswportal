import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { supabase } from "../config/supabaseClient";
import styles, { backButtonSize } from "../components/style";

const DisplayProducts = (props) => {
  const { id } = props.route.params;
  const [itemData, setItemsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Display Products",
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

  const getData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("display_products")
        .select("*")
        .eq("category_id", id);

      if (error) throw error;

      setItemsData(data || []);
      setLoading(false);
    } catch (e) {
      console.log("request failed:", e);
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // This Is the data which is shown when we implement renderData - Do Not Edit

  const renderData = ({ item }) => {
    return (
      <View style={styles.card}>
        
          <Image
           
           style={{flex:1,alignSelf:'center',width:'90%',height:300,borderRadius:16,shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20}}
            resizeMode="cover"
            resizeMethod='scale'
            source={{ uri: item.url }}
            onLoad={handleImageLoad}
          />
          <View style={{flexDirection:'row-reverse'}}>
            <Text style={[styles.buttontext, { color: "black", margin:10}]}>
              {item.name}
            </Text>
          </View>
          <View>
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
        {item.price}
      </Animatable.Text>
          </View>
       

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("SaleProductDetail", {
              id: item.id,
              name: item.name,
              price: item.price,
              url: item.pic_url,
              oldPrice: item.old_price,
              images: item.images,
              desc: item.description,
              width: item.width,
              height: item.height,
              colourInternal: item.colour_internal,
              colourExternal: item.colour_external,
              glazed: item.glazed,
              additionalInfo: item.additional_info,
            });
          }}
        >
          <Text style={[styles.buttontext, { marginRight: 2 }]}>

            More Details
          </Text>
          <FontAwesome
            style={{ alignSelf: "center", paddingLeft: 5 }}
            name="arrow-circle-right"
            size={22}
            color="white"
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", backgroundColor: "#F9F9FB" }}
    >
      {!loading ? (
        <FlatList
          data={itemData}
          renderItem={renderData}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <ActivityIndicator size={"large"} color={'red'} />
      )}
    </SafeAreaView>
  );
};
export default DisplayProducts;
