import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { supabase } from "../config/supabaseClient";
import styles, { backButtonSize } from "../components/style";

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const getData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("display_categories")
        .select("id");

      if (error) throw error;

      setProductsData(data || []);
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
      <View style={{ marginTop: 5 }}>
       
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Products', {
              id: item.id,
            });
          }}
        >
          <Text style={[styles.buttontext,{marginRight:2}]}> {item.id}</Text>
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
    <View style={styles.container}>
        <Text style={{marginTop:30}}></Text>
      {!loading ? (
        <FlatList
          data={productsData}
          renderItem={renderData}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <ActivityIndicator size={"large"} color={'red'} />
      )}
    </View>
  );
};
export default Products;
