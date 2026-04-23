import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "../config/supabaseClient";
import CachedImage from "../components/CachedImage";
import CustomHeader from "../components/CustomHeader";

const { width } = Dimensions.get("window");

const ProductCard = ({ item, onPress, isTablet }) => {
  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    let active = true;
    const uri = item.url || item.pic_url;
    if (uri) {
      Image.getSize(
        uri,
        (imgWidth, imgHeight) => {
          if (active && imgWidth && imgHeight) {
            setAspectRatio(imgWidth / imgHeight);
          }
        },
        () => {}
      );
    }
    return () => {
      active = false;
    };
  }, [item.url, item.pic_url]);

  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={[styles.imageContainer, { aspectRatio }]}>
        <CachedImage
          style={styles.productImage}
          resizeMode="cover"
          source={{ uri: item.url || item.pic_url }}
        />
      </View>
      <View style={styles.productInfo}>
        <Text style={[styles.productTitle, isTablet && { fontSize: 16 }]} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={[styles.productPrice, isTablet && { fontSize: 20 }]}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SalesHomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;



  const getData = async () => {
    try {
      setLoading(true);
      const { data: catData, error: catError } = await supabase
        .from("display_categories")
        .select("id");
      if (catError) throw catError;
      
      const catList = [{ id: "All" }, ...(catData || [])];
      setCategories(catList);

      const { data: prodData, error: prodError } = await supabase
        .from("display_products")
        .select("*");
      if (prodError) throw prodError;

      setAllProducts(prodData || []);
      setLoading(false);
    } catch (e) {
      console.log("request failed:", e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.category_id === selectedCategory);

  const leftColumnData = filteredProducts.filter((_, i) => i % 2 === 0);
  const rightColumnData = filteredProducts.filter((_, i) => i % 2 !== 0);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.searchBar}>
        <Feather name="search" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="What are you looking for?"
          placeholderTextColor="#888"
          editable={false}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        {categories.map((cat, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryPill,
              selectedCategory === cat.id && styles.categoryPillActive,
              isTablet && { paddingVertical: 12, paddingHorizontal: 22 }
            ]}
            onPress={() => setSelectedCategory(cat.id)}
          >
            <Text
              style={[
                styles.categoryText,
                isTablet && { fontSize: 16 },
                selectedCategory === cat.id && styles.categoryTextActive,
              ]}
            >
              {cat.id}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.promoBanner}>
        <View style={styles.promoContent}>
          <Text style={[styles.promoTitle, isTablet && { fontSize: 24 }]}>Ex-Display Sale</Text>
          <Text style={[styles.promoSubtitle, isTablet && { fontSize: 16 }]}>Up To 50% Off</Text>
          <View style={styles.promoBtnWrapper}>
            <View style={styles.promoBtnGlow} />
            <LinearGradient
              colors={['#5A0006', '#1A0003']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.promoBtn}
            >
              <Text style={[styles.promoBtnText, isTablet && { fontSize: 14 }]}>Shop Now</Text>
              <Feather name="arrow-right" size={isTablet ? 18 : 14} color="#fff" style={{marginLeft: 6}} />
            </LinearGradient>
          </View>
        </View>
        <Image 
          source={require('../assets/visualiser-card-bg.jpg')} 
          style={styles.promoBgImage} 
        />
        <View style={styles.promoOverlay} />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, isTablet && { fontSize: 24 }]}>
          {selectedCategory === "All" ? "All Products" : selectedCategory}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <CustomHeader title="Sales & Clearance" showBackBtn={false} />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E5040A" />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        >
          {renderHeader()}
          <View style={styles.masonryContainer}>
            <View style={styles.masonryColumn}>
              {leftColumnData.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  isTablet={isTablet}
                  onPress={() => {
                    navigation.navigate("SaleProductDetail", {
                      id: item.id,
                      desc: item.description,
                      name: item.name,
                      price: item.price,
                      url: item.pic_url || item.url,
                      oldPrice: item.old_price,
                      images: item.images,
                      width: item.width,
                      height: item.height,
                      colourInternal: item.colour_internal,
                      colourExternal: item.colour_external,
                      glazed: item.glazed,
                      additionalInfo: item.additional_info,
                    });
                  }}
                />
              ))}
            </View>
            <View style={styles.masonryColumn}>
              {rightColumnData.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  isTablet={isTablet}
                  onPress={() => {
                    navigation.navigate("SaleProductDetail", {
                      id: item.id,
                      desc: item.description,
                      name: item.name,
                      price: item.price,
                      url: item.pic_url || item.url,
                      oldPrice: item.old_price,
                      images: item.images,
                      width: item.width,
                      height: item.height,
                      colourInternal: item.colour_internal,
                      colourExternal: item.colour_external,
                      glazed: item.glazed,
                      additionalInfo: item.additional_info,
                    });
                  }}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingBottom: 40,
  },
  headerContainer: {
    paddingTop: 10,
    backgroundColor: "#F9FAFB",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    marginHorizontal: 16,
    paddingHorizontal: 14,
    height: 44,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontFamily: "RM",
    fontSize: 14,
    color: "#111",
  },
  categoryScroll: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  categoryPill: {
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 10,
  },
  categoryPillActive: {
    backgroundColor: "#111",
  },
  categoryText: {
    fontFamily: "RB",
    fontSize: 14,
    color: "#555",
  },
  categoryTextActive: {
    color: "#fff",
  },
  promoBanner: {
    marginHorizontal: 16,
    height: 140,
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
    marginBottom: 24,
  },
  promoBgImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  promoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  promoContent: {
    padding: 20,
    zIndex: 2,
    alignItems: "flex-end",
  },
  promoTitle: {
    fontFamily: "RB",
    fontSize: 18,
    color: "#fff",
    marginBottom: 4,
  },
  promoSubtitle: {
    fontFamily: "RM",
    fontSize: 13,
    color: "#E0E0E0",
    marginBottom: 12,
  },
  promoBtnWrapper: {
    position: 'relative',
    marginTop: 4,
  },
  promoBtnGlow: {
    position: 'absolute',
    top: -2,
    bottom: -2,
    left: -2,
    right: -2,
    backgroundColor: 'rgba(229, 4, 10, 0.8)',
    borderRadius: 22,
    zIndex: 1,
    shadowColor: '#e5040a',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  promoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 60, 60, 0.3)',
  },
  promoBtnText: {
    fontFamily: "RB",
    fontSize: 12,
    color: "#fff",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: "RB",
    fontSize: 18,
    color: "#111",
  },
  seeAllText: {
    fontFamily: "RB",
    fontSize: 14,
    color: "#E5040A",
  },
  masonryContainer: {
    flexDirection: "row",
    paddingHorizontal: 8,
  },
  masonryColumn: {
    flex: 1,
    paddingHorizontal: 8,
  },
  productCard: {
    marginBottom: 20,
  },
  imageContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#F2F2F2",
  },
  heartIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#fff",
    borderRadius: 14,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  productInfo: {
    paddingHorizontal: 4,
  },
  productTitle: {
    fontFamily: "RM",
    fontSize: 13,
    color: "#111",
    marginBottom: 4,
    lineHeight: 18,
  },
  productPrice: {
    fontFamily: "RB",
    fontSize: 16,
    color: "#111",
  },
});

export default SalesHomeScreen;
