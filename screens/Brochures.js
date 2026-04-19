import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Image,
  Alert,
  TextInput,
  ScrollView,
  ImageBackground
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState, useCallback, useMemo } from "react";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import styles from "../components/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../config/supabaseClient";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const { scale, width } = Dimensions.get("window");

const categories = [
  "All", 
  "Windows", 
  "Doors", 
  "Living Spaces", 
  "Lanterns", 
  "Glass", 
  "Colour Options", 
  "Maintenance",
  // Industry specific added for future
  "Conservatories",
  "Hardware",
  "Accessories",
  "Smart Home"
];

const Brochures = () => {
  const [BrochureData, setBrochureData] = useState([]);
  const [continueReading, setContinueReading] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeSlide, setActiveSlide] = useState(0);

  const { navigate } = useNavigation();

  const activeCategories = useMemo(() => {
    const active = new Set(["All"]);
    BrochureData.forEach(item => {
      if (item.isMaintenance) {
        active.add("Maintenance");
      } else if (item.category) {
        active.add(item.category);
      }
    });
    return categories.filter(cat => active.has(cat));
  }, [BrochureData]);

  const getContinueReading = async () => {
    try {
        const stored = await AsyncStorage.getItem("@bsw_continue_reading_v2");
        if (stored) {
            setContinueReading(JSON.parse(stored));
        }
    } catch(e) { }
  };

  useFocusEffect(
    useCallback(() => {
        getContinueReading();
    }, [])
  );

  const saveToContinueReading = async (item) => {
    try {
        const currentStored = await AsyncStorage.getItem("@bsw_continue_reading_v2");
        let history = currentStored ? JSON.parse(currentStored) : [];
        // prevent duplicate by removing existing entry of same item
        history = history.filter(h => h.id !== item.id);
        // Add to front
        history.unshift(item);
        // Cap at 8 items
        if (history.length > 8) history = history.slice(0, 8);
        
        await AsyncStorage.setItem("@bsw_continue_reading_v2", JSON.stringify(history));
        setContinueReading(history);
    } catch(e) {}
  };

  const handleOpenBrochure = (item) => {
    saveToContinueReading(item);
    navigate("PDfViewer", { url: item.link });
  };

  const getData = async () => {
    try {
      const lastQueryTime = await AsyncStorage.getItem("lastQueryTimeLibrary_v3");
      const currentTime = Date.now();
      setLoading(true);

      if (
        !lastQueryTime ||
        currentTime - parseInt(lastQueryTime) >= 24 * 60 * 60 * 1000
      ) {
        const [brochuresResponse, maintenanceResponse] = await Promise.all([
          supabase.from("brochures").select("*"),
          supabase.from("maintenance_guides").select("*")
        ]);

        if (brochuresResponse.error) throw brochuresResponse.error;
        if (maintenanceResponse.error) throw maintenanceResponse.error;

        const brochures = (brochuresResponse.data || []).map(item => ({...item, isMaintenance: false}));
        const maintenance = (maintenanceResponse.data || []).map(item => ({...item, isMaintenance: true}));
        
        const combined = [...brochures, ...maintenance];
        setBrochureData(combined);

        await AsyncStorage.setItem("lastQueryTimeLibrary_v3", currentTime.toString());
        await AsyncStorage.setItem("cachedLibraryData_v3", JSON.stringify(combined));
        console.log("from supabase");
      } else {
        console.log("cached data");
        const cachedData = JSON.parse(
          await AsyncStorage.getItem("cachedLibraryData_v3")
        );
        setBrochureData(cachedData || []);
      }
      setLoading(false);
    } catch (e) {
      console.log("request failed:", e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  async function downloadAndSaveFile(filename, url, item) {
    saveToContinueReading(item);
    try {
      setProgress(filename);
      const fileUri = `${FileSystem.documentDirectory}${filename}`;
      const downloadedFile = await FileSystem.downloadAsync(url, fileUri);
      if (downloadedFile.status != 200) {
        Alert.alert("Downloading failed");
      }
      const UTI = "public.item";
      await Sharing.shareAsync(downloadedFile.uri, { UTI });
      setProgress(null);
    } catch (error) {
      setProgress(null);
      console.error("Error downloading and saving the PDF file:", error);
    }
  }

  const filteredData = BrochureData.filter(item => {
    if (!item.isMaintenance && !item.category) return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedCategory === "All") return true;
    if (selectedCategory === "Maintenance") return item.isMaintenance;
    return item.category === selectedCategory; 
  });

  const popularData = BrochureData.filter(item => item.is_popular);
  const carouselData = popularData.length > 0 ? popularData.slice(0, 3) : BrochureData.slice(0, 3);

  const handleScroll = (event) => {
    const slideSize = width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    if (index !== activeSlide) setActiveSlide(index);
  };

  const renderItemBrochure = ({ item }) => {
    const isLoading = progress === item.filename;
    return (
      <View style={style.cardContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleOpenBrochure(item)}
          disabled={progress !== null}
        >
          <View style={style.cardBox}>
            <Image
              style={style.image}
              resizeMode="cover"
              source={{ uri: item.image }}
            />
          </View>
          <View style={style.textContainer}>
            <Text style={style.cardSubtext}>{item.category || "Guide"}</Text>
            <Text style={style.cardTitle} numberOfLines={2}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderContinueReadingItem = ({ item }) => {
    return (
      <TouchableOpacity 
         style={style.crCardContainer}
         onPress={() => handleOpenBrochure(item)}
         activeOpacity={0.8}
      >
          <Image source={{uri: item.image}} style={style.crImage} resizeMode="cover" />
          <View style={style.crTextWrap}>
              <View style={style.crTopRow}>
                 <FontAwesome5 name="star" size={10} color="#FFD700" solid />
                 <Text style={style.crCategoryText}>{item.category || "Guide"}</Text>
              </View>
              <Text style={style.crTitle} numberOfLines={2}>{item.title}</Text>
          </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9F9FB" }} edges={['top']}>
      <View style={style.headerContainer}>
        <View style={style.topRow}>
             <TouchableOpacity style={style.backBtn} onPress={() => navigate("HomeScreen")}>
                  <Ionicons name="chevron-back" size={28} color="#111" />
             </TouchableOpacity>
             <TouchableOpacity style={style.searchBtnToggle} onPress={() => setIsSearchActive(!isSearchActive)}>
                  <Ionicons name="search" size={24} color="#111" />
             </TouchableOpacity>
        </View>
        {isSearchActive && (
          <View style={style.searchContainer}>
              <AntDesign name="search1" size={20} color="#888" style={style.searchIcon} />
              <TextInput
                  style={style.searchInput}
                  placeholder="Search library..."
                  placeholderTextColor="#888"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoFocus={true}
              />
              {searchQuery.length > 0 && (
                   <TouchableOpacity onPress={() => setSearchQuery("")}>
                       <Ionicons name="close-circle" size={20} color="#888" style={style.clearIcon} />
                   </TouchableOpacity>
              )}
          </View>
        )}
      </View>

      <ScrollView 
         showsVerticalScrollIndicator={false}
         contentContainerStyle={{ paddingBottom: 40 }}
      >
          {/* Popular Placeholder Hero Card */}
          <View style={style.heroWrapper}>
              <ScrollView 
                 horizontal 
                 pagingEnabled 
                 showsHorizontalScrollIndicator={false}
                 onScroll={handleScroll}
                 scrollEventThrottle={16}
                 decelerationRate="fast"
              >
                  {carouselData.map((item, index) => (
                      <TouchableOpacity 
                         key={index} 
                         onPress={() => handleOpenBrochure(item)}
                         activeOpacity={0.9}
                      >
                         <ImageBackground
                             source={require('../assets/doors/composite-doors/deisnger-bg-image.png')}
                             style={style.heroCard}
                             imageStyle={{ borderRadius: 20 }}
                         >
                          <View style={style.heroContent}>
                              <View style={style.popularBadge}>
                                  <FontAwesome5 name="fire" size={12} color="#E5040A" />
                                  <Text style={style.popularBadgeText}>Popular</Text>
                              </View>
                              <Text style={style.heroTitle} numberOfLines={2}>{item.title}</Text>
                              <Text style={style.heroSubtitle}>{item.category || "Guide"}</Text>
                              <View style={style.heroBtnWrapper}>
                                  <View style={style.heroBtnGlow} />
                                  <View style={style.heroBtn}>
                                      <Text style={style.heroBtnText}>View Brochure</Text>
                                      <AntDesign name="arrowright" size={10} color="#fff" />
                                  </View>
                              </View>
                          </View>
                          <View style={style.heroImageWrap}>
                            <Image 
                               source={{ uri: item.image }} 
                               style={[style.heroBookImageStack, { right: 10, top: 45, transform: [{scale: 0.75}], opacity: 0.3, zIndex: 1 }]}
                               resizeMode="cover"
                               blurRadius={8}
                            />
                            <Image 
                               source={{ uri: item.image }} 
                               style={[style.heroBookImageStack, { right: 30, top: 40, transform: [{scale: 0.85}], opacity: 0.7, zIndex: 2 }]}
                               resizeMode="cover"
                               blurRadius={3}
                            />
                            <Image 
                               source={{ uri: item.image }} 
                               style={[style.heroBookImageStack, { right: 55, top: 35, zIndex: 3, shadowColor: "#000", shadowOffset: { width: -5, height: 5 }, shadowOpacity: 0.4, shadowRadius: 10 }]}
                               resizeMode="cover"
                            />
                          </View>
                          </ImageBackground>
                      </TouchableOpacity>
                  ))}
              </ScrollView>
              <View style={style.paginationContainer}>
                  {carouselData.map((_, i) => (
                      <View key={i} style={i === activeSlide ? style.dotActive : style.dotInactive} />
                  ))}
              </View>
          </View>

          {/* Categories Horizontal Scroll */}
          <View style={style.categoriesWrapper}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={style.categoriesContainer}>
                {activeCategories.map((cat, index) => {
                    const isActive = selectedCategory === cat;
                    return (
                        <TouchableOpacity 
                           key={index} 
                           style={isActive ? style.categoryPillActive : style.categoryPillInactive}
                           onPress={() => setSelectedCategory(cat)}
                           activeOpacity={0.7}
                        >
                            <Text style={isActive ? style.categoryTextActive : style.categoryTextInactive}>{cat}</Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
          </View>

          {/* Main Horizontal List */}
          <View style={style.mainListWrapper}>
          {!loading ? (
            filteredData.length > 0 ? (
              <FlatList
                data={filteredData}
                renderItem={renderItemBrochure}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                contentContainerStyle={style.horizontalListContent}
              />
            ) : (
              <View style={style.emptyState}>
                  <Text style={style.emptyText}>No items found.</Text>
              </View>
            )
          ) : (
            <View style={style.emptyState}>
              <ActivityIndicator size={"large"} color="#E5040A" />
            </View>
          )}
          </View>

          {/* Continue Reading Section */}
          {continueReading.length > 0 && (
             <View style={style.continueReadingWrapper}>
                 <Text style={style.sectionTitle}>Continue Reading</Text>
                 <FlatList
                    data={continueReading}
                    renderItem={renderContinueReadingItem}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={style.horizontalListContent}
                 />
             </View>
          )}

      </ScrollView>
    </SafeAreaView>
  );
};

export default Brochures;

const style = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: 0,
  },
  backBtn: {
    padding: 5,
    marginLeft: -5,
  },
  searchBtnToggle: {
    padding: 5,
    marginRight: -5,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: "#F9F9FB",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9FB",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#EAEAEA"
  },
  searchIcon: {
    marginRight: 10,
  },
  clearIcon: {
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: "RM",
    fontSize: 16,
    color: "#333",
  },
  heroWrapper: {
    paddingHorizontal: 0,
    marginTop: 15,
    marginBottom: 20,
  },
  heroCard: {
    borderRadius: 20,
    flexDirection: "row",
    overflow: "hidden",
    height: 155,
    width: width - 40,
    marginHorizontal: 20,
  },
  heroContent: {
    flex: 1,
    padding: 15,
    justifyContent: "space-between",
  },
  popularBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF2E5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  popularBadgeText: {
    fontFamily: "RB",
    fontSize: 10,
    color: "#E5040A",
    marginLeft: 4,
  },
  heroTitle: {
    fontFamily: "RB",
    fontSize: 18,
    color: "#fff",
    lineHeight: 22,
    marginTop: 4,
  },
  heroSubtitle: {
    fontFamily: "RM",
    fontSize: 12,
    color: "#ccc",
    marginTop: 2,
  },
  heroBtnWrapper: {
    marginTop: 8,
    alignSelf: 'flex-start',
    position: 'relative',
  },
  heroBtnGlow: {
    position: 'absolute',
    top: -2, left: -2, right: -2, bottom: -2,
    backgroundColor: 'rgba(229, 4, 10, 0.4)',
    borderRadius: 20,
  },
  heroBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5040a',
  },
  heroBtnText: {
    fontFamily: "RB",
    fontSize: 10,
    color: "#fff",
    marginRight: 4,
  },
  heroImageWrap: {
    width: "45%",
    position: "relative",
  },
  heroBookImageStack: {
    width: 125,
    height: 185, 
    borderRadius: 6,
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  dotActive: {
    width: 20,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5040A',
    marginHorizontal: 3,
  },
  dotInactive: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#d3d3d3',
    marginHorizontal: 3,
  },
  categoriesWrapper: {
    marginBottom: 20,
    marginTop: 10,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: 5,
    gap: 10,
  },
  categoryPillActive: {
    backgroundColor: "#E5040A",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#E5040A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  categoryPillInactive: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#EBEBEB",
  },
  categoryTextActive: {
    fontFamily: "RB",
    fontSize: 14,
    color: "#fff",
  },
  categoryTextInactive: {
    fontFamily: "RM",
    fontSize: 14,
    color: "#666",
  },
  mainListWrapper: {
     height: 260, 
  },
  horizontalListContent: {
    paddingHorizontal: 15,
  },
  cardContainer: {
    width: width * 0.34,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  cardBox: {
    backgroundColor: "#fff",
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 190,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  textContainer: {
    marginTop: 10,
    paddingHorizontal: 2,
  },
  cardSubtext: {
    fontFamily: "RM",
    fontSize: 10,
    color: "#E5040A",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  cardTitle: {
    fontFamily: "RB",
    fontSize: 14,
    color: "#111",
    lineHeight: 18,
    minHeight: 36, 
  },
  cardFooterRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "rgba(229, 4, 10, 0.1)",
    borderRadius: 8,
  },
  actionText: {
    fontFamily: "RB",
    color: "#E5040A",
    fontSize: 10,
  },
  emptyState: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    height: 200,
  },
  emptyText: {
    fontFamily: "RM", 
    color: "#888" 
  },
  continueReadingWrapper: {
    marginTop: 10,
  },
  sectionTitle: {
    fontFamily: "RB",
    fontSize: 18,
    color: "#111",
    marginLeft: 20,
    marginBottom: 10,
  },
  crCardContainer: {
    width: width * 0.6,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    flexDirection: "row",
    padding: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F0F0F0"
  },
  crImage: {
    width: 60,
    height: 90,
    borderRadius: 4,
  },
  crTextWrap: {
    flex: 1,
    marginLeft: 8,
    justifyContent: "center",
  },
  crTopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  crCategoryText: {
    fontFamily: "RM",
    fontSize: 11,
    color: "#888",
    marginLeft: 4,
  },
  crTitle: {
    fontFamily: "RB",
    fontSize: 14,
    color: "#111",
    lineHeight: 18,
  }
});
