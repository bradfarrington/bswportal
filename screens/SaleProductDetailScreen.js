import React, { useLayoutEffect, useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions, 
  StyleSheet, 
  Image
} from "react-native";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useNavigation } from "@react-navigation/native";
import CachedImage from "../components/CachedImage";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const ProductDetails = (props) => {
  const navigation = useNavigation();
  const { id, name, price, url, oldPrice, images, desc, width: productWidth, height: productHeight, colourInternal, colourExternal, glazed, additionalInfo } = props.route.params;
  
  console.log('🔍 ROUTE PARAMS:', JSON.stringify(props.route.params, null, 2));
  
  // Create an array of images (main url + extra images if available)
  const allImages = [url];
  if (images && images.length > 0) {
    images.forEach(img => {
       if (img !== url) allImages.push(img);
    });
  }
  
  const [selectedImage, setSelectedImage] = useState(allImages[0]);
  const [imageAspect, setImageAspect] = useState(1);

  const detailsArray = React.useMemo(() => {
    const arr = [];
    if (productWidth) arr.push({ label: 'Width', value: productWidth });
    if (productHeight) arr.push({ label: 'Height', value: productHeight });
    if (colourInternal) arr.push({ label: 'Internal', value: colourInternal });
    if (colourExternal) arr.push({ label: 'External', value: colourExternal });
    arr.push({ label: 'Glazed', value: glazed ? 'Yes' : 'No' });
    return arr;
  }, [productWidth, productHeight, colourInternal, colourExternal, glazed]);

  const notesArray = Array.isArray(additionalInfo) ? additionalInfo : [];

  useEffect(() => {
    if (selectedImage) {
      Image.getSize(
        selectedImage,
        (w, h) => {
          if (h > 0) setImageAspect(w / h);
        },
        () => {
          setImageAspect(1);
        }
      );
    }
  }, [selectedImage]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerBackTitle: " ",
      headerTintColor: "#111",
      headerStyle: {
        backgroundColor: "#F9FAFB",
      },
      headerShadowVisible: false,
    });
  }, [navigation]);

  const callNumber = () => {
    Linking.openURL(`tel:01827288688`);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Image Container */}
        <View style={styles.imageBackground}>
          <CachedImage 
            source={{ uri: selectedImage }} 
            style={[styles.mainImage, { aspectRatio: imageAspect }]} 
            resizeMode="cover" 
          />
        </View>

        {/* Horizontal Thumbnails */}
        {allImages.length > 1 && (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbnailContainer}
          >
            {allImages.map((img, idx) => (
              <TouchableOpacity 
                key={idx} 
                style={[
                  styles.thumbnailWrapper, 
                  selectedImage === img && styles.thumbnailWrapperSelected
                ]}
                onPress={() => setSelectedImage(img)}
              >
                <CachedImage source={{ uri: img }} style={styles.thumbnailImage} resizeMode="cover" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Product Info Setup */}
        <View style={styles.productInfoContainer}>
          <View style={styles.titleRow}>
             <Text style={styles.titleText}>{name}</Text>
             <Text style={styles.priceText}>{price}</Text>
          </View>

          {/* Status Chips */}
          <View style={styles.chipsRow}>
            <View style={styles.chip}>
              <Text style={styles.chipText}>1 Available</Text>
            </View>
          </View>

          {/* Parsed Details Section */}
          <View style={styles.sectionContainer}>
             {detailsArray.length > 0 && (
               <>
                 <Text style={styles.sectionTitle}>Specifications</Text>
                 <View style={styles.specGrid}>
                   {detailsArray.map((item, idx) => (
                      <View key={`spec-${idx}`} style={styles.specItem}>
                         <Text style={styles.specLabel}>{item.label}</Text>
                         <Text style={styles.specValue}>{item.value}</Text>
                      </View>
                   ))}
                 </View>
               </>
             )}

             {notesArray.length > 0 && (
               <View style={styles.notesContainer}>
                 <Text style={styles.sectionTitle}>Additional Info</Text>
                 {notesArray.map((note, idx) => (
                    <View key={`note-${idx}`} style={styles.noteRow}>
                      <View style={styles.bulletDot} />
                      <Text style={styles.noteText}>{note}</Text>
                    </View>
                 ))}
               </View>
             )}

             {/* Fallback to raw description if parsing failed to extract anything */}
             {detailsArray.length === 0 && notesArray.length === 0 && desc && (
               <>
                 <Text style={styles.sectionTitle}>Details</Text>
                 <Text style={styles.descriptionText}>{desc}</Text>
               </>
             )}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Footer */}
      <View style={styles.stickyFooter}>
        <TouchableOpacity style={styles.iconButton} onPress={callNumber}>
          <Ionicons name="call-outline" size={24} color="#E5040A" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.outlineButton} onPress={callNumber}>
           <Text style={styles.outlineButtonText}>Enquire Now</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.solidButton} onPress={callNumber}>
           <Text style={styles.solidButtonText}>Collect Today</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    paddingBottom: 100, // Make room for sticky footer
  },
  headerRightBtn: {
    padding: 8,
  },
  imageBackground: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
  mainImage: {
    width: "100%",
    borderRadius: 16,
  },
  thumbnailContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  thumbnailWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#F2F2F2",
    borderRadius: 12,
    padding: 4,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "transparent",
    overflow: "hidden",
  },
  thumbnailWrapperSelected: {
    borderColor: "#E5040A",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  productInfoContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  titleText: {
    fontFamily: "RB",
    fontSize: 22,
    color: "#111",
    flex: 1,
    marginRight: 10,
  },
  priceText: {
    fontFamily: "RB",
    fontSize: 26,
    color: "#111",
  },
  chipsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 16,
    marginRight: 10,
  },
  chipText: {
    fontFamily: "RM",
    fontSize: 12,
    color: "#666",
  },
  sectionContainer: {
    marginTop: 10,
  },
  sectionTitle: {
    fontFamily: "RB",
    fontSize: 18,
    color: "#111",
    marginBottom: 12,
  },
  descriptionText: {
    fontFamily: "RR",
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
    textAlign: "justify",
  },
  specGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  specItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  specLabel: {
    fontFamily: "RM",
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  specValue: {
    fontFamily: "RB",
    fontSize: 14,
    color: "#111",
  },
  notesContainer: {
    marginTop: 5,
    marginBottom: 10,
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5040A',
    marginRight: 10,
    marginTop: 8,
  },
  noteText: {
    fontFamily: "RR",
    fontSize: 14,
    color: "#444",
    lineHeight: 22,
    flex: 1,
  },
  stickyFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30, // For home indicator padding
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  outlineButton: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E5040A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  outlineButtonText: {
    fontFamily: "RB",
    fontSize: 15,
    color: "#E5040A",
  },
  solidButton: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E5040A",
    justifyContent: "center",
    alignItems: "center",
  },
  solidButtonText: {
    fontFamily: "RB",
    fontSize: 15,
    color: "#fff",
  },
});

export default ProductDetails;
