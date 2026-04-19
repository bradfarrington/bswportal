import React, { useState, useRef, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Platform, Image, TextInput, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { loadCategories } from '../data/ProductsData';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;
const CARD_GAP = 12;
const SLIDER_WIDTH = isTablet ? 450 : width - 40; // accounts for heroContainer paddingHorizontal: 20
const CARD_WIDTH = SLIDER_WIDTH - CARD_GAP;

const heroSlides = [
  {
    title: 'Book Trusted\nServices',
    subtitle: 'Get quick access to home\nservices your location.',
    service: 'Home Repair',
    price: '$30/hour',
  },
  {
    title: 'Expert\nInstallations',
    subtitle: 'Professional window & door\ninstallation services.',
    service: 'Window Fitting',
    price: '$45/hour',
  },
  {
    title: 'Quality\nProducts',
    subtitle: 'Browse our full range of\npremium UPVC products.',
    service: 'Consultation',
    price: 'Free',
  },
];

  const Dashboard = () => {
  const navigation = useNavigation();
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef(null);
  
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const isTabletDynamic = windowWidth >= 768;
  const isLandscape = windowWidth > windowHeight;

  useEffect(() => {
    loadCategories().then(data => setCategories(data || []));
  }, []);

  const allProducts = useMemo(() => {
    let products = [];
    const extractProducts = (items) => {
      items.forEach(item => {
        if (!item.subcategories || item.subcategories.length === 0) {
          products.push(item);
        } else {
          extractProducts(item.subcategories);
        }
      });
    };
    extractProducts(categories);

    // Deduplicate by title to remove doubled items like 'Roof Lanterns'
    const uniqueProducts = [];
    const seenTitles = new Set();
    products.forEach(p => {
      if (!seenTitles.has(p.title)) {
        seenTitles.add(p.title);
        uniqueProducts.push(p);
      }
    });

    return uniqueProducts;
  }, [categories]);

  const APP_PAGES = useMemo(() => [
    { id: 'page-visualiser', title: 'AI Window Visualiser', type: 'Feature', image: require('../assets/visualiser-card-img.jpg'), icon: 'image', route: 'VisualiserScreen' },
    { id: 'page-designer', title: 'Door Designer', type: 'Feature', image: require('../assets/doors/composite-doors/deisnger-bg-image.png'), overlayImage: require('../assets/doors/composite-doors/exploded-door.png'), icon: 'edit-3', route: 'Designer' },
    { id: 'page-gallery', title: 'Gallery', type: 'Page', image: require('../assets/hero-bg-cropped.png'), icon: 'image', route: 'Gallery' },
    { id: 'page-orders', title: 'Orders', type: 'Page', image: require('../assets/icon.png'), icon: 'shopping-cart', route: 'Orders' },
    { id: 'page-sale', title: 'Sale', type: 'Page', image: require('../assets/commercial-category-image.jpg'), icon: 'tag', route: 'Sale' },
    { id: 'page-products', title: 'All Products', type: 'Page', image: require('../assets/icon.png'), icon: 'box', route: 'Products' },
  ], []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    
    const pageResults = APP_PAGES.filter(p => p.title.toLowerCase().includes(query)).map(p => ({ ...p, isPage: true }));

    const productResults = allProducts.filter(p => 
      p.title && p.title.toLowerCase().includes(query)
    );

    return [...pageResults, ...productResults];
  }, [searchQuery, allProducts, APP_PAGES]);

  const handleCategoryPress = (category) => {
    if (!category) return;
    if (category.subcategories && category.subcategories.length > 0) {
      navigation.navigate('CatalogSubCategories', { category });
    } else {
      navigation.navigate('CatalogProductDetails', { 
        product: {
          ...category,
          id: category.id || 'unknown',
          title: category.title || 'Product',
          heroImage: category.heroImage || category.image,
          tagline: category.tagline || "Explore our range.",
          about: category.about || "Details coming soon.",
        }
      });
    }
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SLIDER_WIDTH);
    setActiveSlide(index);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }} edges={['top']}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Header */}
          <View style={[styles.header, { zIndex: 10 }]}>
            <View style={styles.headerLogoContainer}>
              <Image 
                source={require('../assets/icon.png')} 
                style={styles.headerLogo} 
                resizeMode="cover" 
              />
            </View>
            <View style={[styles.headerRight, isSearchActive && { flex: 1, marginLeft: 15 }]}>
              {isSearchActive ? (
                <View style={styles.expandedSearchContainer}>
                  <Ionicons name="search" size={22} color="#e5040a" />
                  <TextInput
                    style={styles.expandedSearchInput}
                    autoFocus
                    placeholder="Search the app..."
                    placeholderTextColor="#A0AEC0"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    selectionColor="#e5040a"
                    autoCorrect={false}
                  />
                  <TouchableOpacity onPress={() => { setIsSearchActive(false); setSearchQuery(''); }} activeOpacity={0.7} style={styles.clearButton}>
                    <Ionicons name="close-circle" size={20} color="#ccc" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity style={[styles.iconCircleRound, { marginRight: 0 }]} onPress={() => setIsSearchActive(true)}>
                   <Feather name="search" size={18} color="#333" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {isSearchActive && searchQuery.trim().length > 0 && (
            <View style={styles.searchPopupOverlay}>
               <ScrollView contentContainerStyle={styles.searchPopupInner} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                 {searchResults.length === 0 ? (
                   <View style={styles.emptySearchContainer}>
                     <Text style={styles.emptySearchText}>No results found for "{searchQuery}"</Text>
                   </View>
                 ) : (
                  searchResults.map((item, index) => {
                    const isPage = item.isPage;
                    return (
                    <TouchableOpacity 
                      key={item.id || index} 
                      style={[styles.searchResultItem, index === searchResults.length - 1 && { marginBottom: 0 } ]}
                      onPress={() => {
                        setIsSearchActive(false);
                        setSearchQuery('');
                        if (isPage) {
                           navigation.navigate(item.route);
                        } else {
                          navigation.navigate('CatalogProductDetails', { 
                            product: {
                              ...item,
                              id: item.id || 'unknown',
                              title: item.title || 'Product',
                              heroImage: item.heroImage || item.image,
                              tagline: item.tagline || "Explore our range.",
                              about: item.about || "Details coming soon.",
                            }
                          });
                        }
                      }}
                    >
                      {item.isPage && !item.image ? (
                        <View style={[styles.searchResultImage, { justifyContent: 'center', alignItems: 'center' }]}>
                          <Feather name={item.icon || 'file'} size={24} color="#888" />
                        </View>
                      ) : (
                        <View style={[styles.searchResultImage, { position: 'relative', overflow: 'hidden' }]}>
                          <Image source={typeof item.image === 'number' ? item.image : (typeof item.cardImage === 'number' ? item.cardImage : item.heroImage)} style={{ width: '100%', height: '100%', position: 'absolute' }} resizeMode="cover" />
                          {item.overlayImage && (
                            <Image source={item.overlayImage} style={{ width: '100%', height: '100%', position: 'absolute', bottom: 0, right: 0 }} resizeMode="contain" />
                          )}
                        </View>
                      )}
                      <View style={styles.searchResultInfo}>
                        <Text style={styles.searchResultTitle}>{item.title}</Text>
                      </View>
                      <Feather name="chevron-right" size={20} color="#ccc" />
                    </TouchableOpacity>
                  );
                 })
                 )}
               </ScrollView>
             </View>
          )}

          <>
            {/* Promo Slider */}
            <View style={styles.heroContainer}>
              <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                decelerationRate="fast"
                snapToInterval={SLIDER_WIDTH}
                snapToAlignment="start"
                contentContainerStyle={{ width: SLIDER_WIDTH * 3 }}
              >
                {/* Brochures Promo */}
                <View style={{ width: CARD_WIDTH, marginRight: CARD_GAP, justifyContent: 'center' }}>
                  <TouchableOpacity 
                    style={[styles.brochuresPromoContainer, { marginHorizontal: 0, marginTop: 0, marginBottom: 0 }]}
                    onPress={() => navigation.navigate('Brochures')}
                    activeOpacity={0.9}
                  >
                    <View style={styles.brochuresPromoInner}>
                      <Image
                        source={require('../assets/brochures-card-bg.png')}
                        style={styles.brochuresPromoBackground}
                        resizeMode="cover"
                      />
                      
                      <View style={styles.brochuresPromoContent}>
                        <Text style={styles.brochuresPromoTitle}>View Our{'\n'}Brochures</Text>
                        <Text style={styles.brochuresPromoDescription}>
                          Browse our latest{'\n'}product brochures.
                        </Text>
                        
                        <View style={styles.brochuresPromoButtonWrapper}>
                          <View style={styles.brochuresPromoButtonGlow} />
                          <LinearGradient
                            colors={['#5A0006', '#1A0003']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.brochuresPromoButton}
                          >
                            <Text style={styles.brochuresPromoButtonText}>View Brochures</Text>
                            <Feather name="arrow-right" size={16} color="#fff" style={{marginLeft: 8, marginTop: 1}} />
                          </LinearGradient>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                {/* AI Visualiser Promo */}
                <View style={{ width: CARD_WIDTH, marginRight: CARD_GAP, justifyContent: 'center' }}>
                  <TouchableOpacity 
                    style={[styles.aiPromoContainer, { marginHorizontal: 0, marginTop: 0, marginBottom: 0 }]}
                    onPress={() => navigation.navigate('VisualiserScreen')}
                    activeOpacity={0.9}
                  >
                    <View style={styles.aiPromoInner}>
                      <Image
                        source={require('../assets/visualiser-card-bg.jpg')}
                        style={styles.aiPromoBackground}
                        resizeMode="cover"
                      />
                      
                      <View style={styles.aiPromoContent}>
                        <Text style={styles.aiPromoTitle}>See New Windows{'\n'}Before You Buy</Text>
                        <Text style={styles.aiPromoDescription}>
                          Upload a photo and try{'\n'}new windows instantly.
                        </Text>
                        
                        <View style={styles.aiPromoButtonWrapper}>
                          <View style={styles.aiPromoButtonGlow} />
                          <LinearGradient
                            colors={['#1E3A8A', '#172554']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.aiPromoButton}
                          >
                            <Text style={styles.aiPromoButtonText}>Try Visualiser</Text>
                            <Feather name="arrow-right" size={16} color="#fff" style={{marginLeft: 8}} />
                          </LinearGradient>
                        </View>
                      </View>

                      <Image 
                        source={require('../assets/visualiser-card-img.jpg')} 
                        style={styles.aiPromoImage} 
                        resizeMode="contain"
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Door Designer Promo */}
                <View style={{ width: CARD_WIDTH, marginRight: CARD_GAP, justifyContent: 'center' }}>
                  <TouchableOpacity 
                    style={[styles.designerPromoContainer, { marginHorizontal: 0, marginTop: 0, marginBottom: 0 }]}
                    onPress={() => navigation.navigate('Designer')}
                    activeOpacity={0.9}
                  >
                    <View style={styles.designerPromoInner}>
                      <Image
                        source={require('../assets/doors/composite-doors/deisnger-bg-image.png')}
                        style={styles.designerPromoBackground}
                        resizeMode="cover"
                      />
                      
                      <View style={styles.designerPromoLeftContent}>
                        <Text style={styles.designerPromoTitle}>Design Your{'\n'}Dream Door</Text>
                        <Text style={styles.designerPromoDescription}>
                          Create your perfect{'\n'}custom door in minutes.
                        </Text>
                        
                        <View style={styles.designerPromoButtonWrapper}>
                          <View style={styles.designerPromoButtonGlow} />
                          <LinearGradient
                            colors={['#3A0006', '#1A0003']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.designerPromoButton}
                          >
                            <Text style={styles.designerPromoButtonText}>Start Designing</Text>
                            <Feather name="chevron-right" size={16} color="#fff" style={{marginLeft: 2, marginTop: 1}} />
                          </LinearGradient>
                        </View>
                      </View>
                    </View>
                    
                    <Image 
                      source={require('../assets/doors/composite-doors/exploded-door.png')} 
                      style={styles.designerPromoImage} 
                      resizeMode="contain" 
                    />
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>

            {/* Dots */}
            <View style={styles.dotsContainer}>
               {[0, 1, 2].map((_, index) => (
                 <View key={index} style={[styles.dot, activeSlide === index && styles.activeDot]} />
               ))}
            </View>

            {/* 2 Column Layout Container for Landscape Tablet */}
            <View style={[isTabletDynamic && isLandscape && { flexDirection: 'row', paddingHorizontal: 20, marginTop: 15, alignItems: 'flex-start' }]}>
              {/* Left Column: Categories */}
              <View style={[isTabletDynamic && isLandscape && { flex: 1, marginRight: 40 }]}>
                <View style={[styles.sectionHeaderRow, isTabletDynamic && isLandscape && { paddingHorizontal: 0, marginTop: 0 }]}>
                  <Text style={styles.sectionTitleNoMargin}>View Products</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Products')} activeOpacity={0.7}>
                    <Text style={styles.seeAllText}>View All</Text>
                  </TouchableOpacity>
                </View>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false} 
                  contentContainerStyle={[styles.categoriesContent, isTabletDynamic && isLandscape && { paddingHorizontal: 0 }]}
                >
                  {categories.map((cat) => (
                     <TouchableOpacity key={cat.id} style={[styles.categoryItem, isTabletDynamic && isLandscape && { marginRight: 20 }]} onPress={() => handleCategoryPress(cat)}>
                        <View style={[styles.catImageProps, isTabletDynamic && isLandscape && { width: 175, height: 175 }]}>
                          <Image source={cat.image} style={styles.catImage} />
                        </View>
                        <Text style={[styles.catName, isTabletDynamic && isLandscape && { fontSize: 18, marginTop: 8 }]}>{cat.title}</Text>
                     </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Right Column: Orders Promo Card */}
              <View style={[styles.ordersPromoWrapper, isTabletDynamic && isLandscape && { width: CARD_WIDTH, paddingHorizontal: 0, marginTop: 0, marginBottom: 0, alignItems: 'stretch' }]}>
                <TouchableOpacity 
                  style={[styles.ordersPromoContainer, isTabletDynamic && isLandscape && { height: 255 }]}
                  onPress={() => navigation.navigate('Orders')}
                  activeOpacity={0.9}
                >
                  <View style={styles.ordersPromoInner}>
                    <Image
                      source={require('../assets/track-orders-bg.png')}
                      style={styles.ordersPromoBackground}
                      resizeMode="cover"
                    />
                    
                    <View style={styles.ordersPromoContent}>
                      <Text style={styles.ordersPromoTitle}>Track Your Orders</Text>
                      <Text style={styles.ordersPromoDescription}>
                        Stay updated on the{'\n'}progress of your order
                      </Text>
                      
                      <View style={styles.ordersPromoButtonWrapper}>
                        <View style={styles.ordersPromoButtonGlow} />
                        <LinearGradient
                          colors={['#5A0006', '#1A0003']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={styles.ordersPromoButton}
                        >
                          <Feather name="eye" size={16} color="#fff" style={{marginRight: 8}} />
                          <Text style={styles.ordersPromoButtonText}>View My Orders</Text>
                          <Feather name="arrow-right" size={16} color="#fff" style={{marginLeft: 8, marginTop: 1}} />
                        </LinearGradient>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

          </>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingBottom: 110, // Avoid overlapping with tab bar
    paddingTop: Platform.OS === 'android' ? 20 : 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  headerActiveSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 25,
    backgroundColor: '#F9FAFB',
  },
  expandedSearchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(229, 4, 10, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  expandedSearchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'RM',
    color: '#111',
    marginLeft: 10,
    marginBottom: -2,
  },
  clearButton: {
    padding: 2,
    marginLeft: 8,
  },
  emptySearchContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  emptySearchText: {
    fontSize: 15,
    fontFamily: 'RM',
    color: '#888',
  },
  searchPopupOverlay: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 65 : 75,
    left: 20,
    right: 20,
    maxHeight: 350,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 1000,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  searchPopupInner: {
    padding: 12,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    padding: 10,
    marginBottom: 10,
  },
  searchResultImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
  searchResultInfo: {
    flex: 1,
    marginLeft: 15,
    marginRight: 10,
  },
  searchResultTitle: {
    fontSize: 16,
    fontFamily: 'RB',
    color: '#111',
    marginBottom: 4,
  },
  searchResultTagline: {
    fontSize: 12,
    fontFamily: 'RM',
    color: '#666',
    lineHeight: 16,
  },
  headerLogoContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  headerLogo: {
    width: 44,
    height: 44,
    borderRadius: 12,
  },

  iconCircleRound: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },

  headerRight: {
    flexDirection: 'row',
  },
  heroContainer: {
    paddingHorizontal: 20,
  },
  heroCard: {
    width: '100%',
    height: 200,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#e5040a',
  },
  heroContent: {
    padding: 24,
    zIndex: 2,
  },
  heroTitle: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'RB',
    lineHeight: 32,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    fontFamily: 'RM',
    lineHeight: 18,
  },
  heroImagePlaceholder: {
    position: 'absolute',
    right: -20,
    top: 0,
    width: 200,
    height: 200,
    backgroundColor: 'rgba(0,0,0,0.1)',
    zIndex: 1,
  },
  frostedBar: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    height: 64,
    borderRadius: 16,
    overflow: 'hidden',
    zIndex: 3,
    justifyContent: 'center',
  },
  frostedBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
  },
  frostedBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  frostedTitle: {
    color: '#111',
    fontFamily: 'RB',
    fontSize: 15,
    marginBottom: 2,
  },
  frostedSubtitle: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'RM',
  },
  bookNowBtn: {
    backgroundColor: '#e5040a',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },
  bookNowText: {
    color: '#fff',
    fontFamily: 'RB',
    fontSize: 13,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 25,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 3,
  },
  activeDot: {
    width: 18,
    height: 6,
    backgroundColor: '#e5040a',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'RB',
    color: '#111',
    marginLeft: 20,
    marginBottom: 15,
  },
  sectionTitleNoMargin: {
    fontSize: 18,
    fontFamily: 'RB',
    color: '#111',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: isTablet ? 24 : 16,
  },
  catImageProps: {
    width: isTablet ? 150 : 100,
    height: isTablet ? 150 : 100,
    borderRadius: isTablet ? 16 : 12,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  catImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  catName: {
    fontSize: isTablet ? 16 : 14,
    color: '#4B5563',
    fontFamily: 'RM',
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 35,
    marginBottom: 5,
  },
  seeAllText: {
    fontSize: 14,
    color: '#e5040a',
    fontFamily: 'RB',
  },
  designerPromoContainer: {
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 10,
    position: 'relative',
    height: 220,
    zIndex: 10,
  },
  designerPromoInner: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  designerPromoBackground: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  designerPromoLeftContent: {
    padding: 24,
    zIndex: 2,
    width: '60%',
    justifyContent: 'center',
  },
  designerPromoTitle: {
    fontFamily: 'InterBold',
    fontSize: 24,
    lineHeight: 30,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  designerPromoDescription: {
    fontFamily: 'InterRegular',
    fontSize: 13,
    lineHeight: 18,
    color: '#D4D4D8',
    marginBottom: 18,
  },
  designerPromoButtonWrapper: {
    alignSelf: 'flex-start',
    position: 'relative',
    marginTop: 4,
  },
  designerPromoButtonGlow: {
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
  designerPromoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    zIndex: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 60, 60, 0.3)',
  },
  designerPromoButtonText: {
    fontFamily: 'InterSemiBold',
    fontSize: 13,
    color: '#FFFFFF',
  },
  designerPromoImage: {
    position: 'absolute',
    right: -10,
    bottom: -12,
    width: 180,
    height: 235,
    zIndex: 20,
  },
  aiPromoContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 40,
    position: 'relative',
    height: 220, // Reduced height since tags were removed
    zIndex: 10,
  },
  aiPromoInner: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  aiPromoBackground: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  aiPromoContent: {
    padding: 24,
    zIndex: 2,
    flex: 1,
    width: '65%', // Keeping 65% so text doesn't overlap image too much
    justifyContent: 'center', // Added to perfectly center remaining text vertically
  },
  aiPromoTitle: {
    fontFamily: 'InterBold',
    fontSize: 22,
    lineHeight: 28,
    color: '#FFFFFF',
    marginBottom: 6, // Reduced from 8
  },
  aiPromoDescription: {
    fontFamily: 'InterRegular',
    fontSize: 13,
    lineHeight: 18,
    color: '#D4D4D8',
    marginBottom: 14, // Reduced from 16
  },
  aiPromoButtonWrapper: {
    alignSelf: 'flex-start',
    position: 'relative',
  },
  aiPromoButtonGlow: {
    position: 'absolute',
    top: -2,
    bottom: -2,
    left: -2,
    right: -2,
    backgroundColor: 'rgba(30, 58, 138, 0.8)',
    borderRadius: 22,
    zIndex: 1,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  aiPromoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    zIndex: 2,
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.3)',
  },
  aiPromoButtonText: {
    fontFamily: 'InterSemiBold',
    fontSize: 13,
    color: '#FFFFFF',
  },
  aiPromoImage: {
    position: 'absolute',
    right: -15, // Pushed to the right slightly
    bottom: -5,  // Pushed down slightly
    width: '55%', // Increased width slightly so it fills more
    height: '105%', // Slightly taller to cover gaps
    zIndex: 1,
  },
  brochuresPromoContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 40,
    position: 'relative',
    height: 220,
    zIndex: 10,
  },
  brochuresPromoInner: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  brochuresPromoBackground: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  brochuresPromoContent: {
    padding: 24,
    zIndex: 2,
    flex: 1,
    width: '75%',
    justifyContent: 'center',
  },
  brochuresInfoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(229, 4, 10, 0.4)',
    marginBottom: 16,
  },
  brochuresInfoText: {
    fontFamily: 'InterSemiBold',
    fontSize: 10,
    color: '#E4E4E7',
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  brochuresPromoTitle: {
    fontFamily: 'InterBold',
    fontSize: 24,
    lineHeight: 30,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  brochuresPromoDescription: {
    fontFamily: 'InterRegular',
    fontSize: 13,
    lineHeight: 18,
    color: '#D4D4D8',
    marginBottom: 18,
  },
  brochuresPromoButtonWrapper: {
    alignSelf: 'flex-start',
    position: 'relative',
    marginTop: 4,
  },
  brochuresPromoButtonGlow: {
    position: 'absolute',
    top: -2,
    bottom: -2,
    left: -2,
    right: -2,
    backgroundColor: 'rgba(229, 4, 10, 0.7)',
    borderRadius: 22,
    zIndex: 1,
    shadowColor: '#e5040a',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  brochuresPromoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    zIndex: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 60, 60, 0.4)',
  },
  brochuresPromoButtonText: {
    fontFamily: 'InterSemiBold',
    fontSize: 13,
    color: '#FFFFFF',
  },
  brochuresPromoFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brochuresFooterItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brochuresFooterText: {
    fontFamily: 'InterRegular',
    fontSize: 12,
    color: '#D4D4D8',
    marginLeft: 6,
  },
  brochuresFooterDivider: {
    width: 1,
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 12,
  },
  ordersPromoWrapper: {
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 20,
    alignItems: isTablet ? 'center' : 'stretch',
  },
  ordersPromoContainer: {
    position: 'relative',
    height: 220,
    width: '100%',
    maxWidth: isTablet ? 800 : undefined,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  ordersPromoInner: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  ordersPromoBackground: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  ordersPromoContent: {
    padding: 24,
    zIndex: 2,
    flex: 1,
    justifyContent: 'center',
  },
  ordersPromoTitle: {
    fontFamily: 'InterBold',
    fontSize: 24,
    lineHeight: 30,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  ordersPromoDescription: {
    fontFamily: 'InterRegular',
    fontSize: 13,
    lineHeight: 18,
    color: '#D4D4D8',
    marginBottom: 18,
  },
  ordersPromoButtonWrapper: {
    alignSelf: 'flex-start',
    position: 'relative',
  },
  ordersPromoButtonGlow: {
    position: 'absolute',
    top: -2,
    bottom: -2,
    left: -2,
    right: -2,
    backgroundColor: 'rgba(229, 4, 10, 0.7)',
    borderRadius: 22,
    zIndex: 1,
    shadowColor: '#e5040a',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  ordersPromoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    zIndex: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 60, 60, 0.4)',
  },
  ordersPromoButtonText: {
    fontFamily: 'InterSemiBold',
    fontSize: 13,
    color: '#FFFFFF',
  },
});

export default Dashboard;

