import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, SafeAreaView, Platform, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { CATEGORIES } from '../data/ProductsData';

const { width } = Dimensions.get('window');
const CARD_GAP = 12;
const SLIDER_WIDTH = width - 40; // accounts for heroContainer paddingHorizontal: 20
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

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SLIDER_WIDTH);
    setActiveSlide(index);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerRight}>
              <TouchableOpacity style={[styles.iconCircleRound, { marginRight: 10 }]}>
                 <Feather name="search" size={18} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconCircleRound}>
                 <Feather name="bell" size={18} color="#333" />
              </TouchableOpacity>
            </View>
          </View>

          {false && (
            <>
              {/* Hero Slider */}
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
                  contentContainerStyle={{ width: SLIDER_WIDTH * heroSlides.length }}
                >
                  {heroSlides.map((slide, index) => (
                    <View key={index} style={[styles.heroCard, { width: CARD_WIDTH, marginRight: CARD_GAP }]}>  
                      <LinearGradient
                        colors={['#e5040a', '#e5040a']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={StyleSheet.absoluteFillObject}
                      />
                      <View style={styles.heroContent}>
                        <Text style={styles.heroTitle}>{slide.title}</Text>
                      </View>

                      {/* Bottom Frosted Bar */}
                      <View style={styles.frostedBar}>
                         <View style={styles.frostedBackground} />
                         <View style={styles.frostedBarContent}>
                           <View>
                             <Text style={styles.frostedTitle}>{slide.service}</Text>
                             <Text style={styles.frostedSubtitle}>{slide.price}</Text>
                           </View>
                           <TouchableOpacity style={styles.bookNowBtn} onPress={() => navigation.navigate('Quote')}>
                             <Text style={styles.bookNowText}>Book Now</Text>
                           </TouchableOpacity>
                         </View>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>

              {/* Dots */}
              <View style={styles.dotsContainer}>
                 {heroSlides.map((_, index) => (
                   <View key={index} style={[styles.dot, activeSlide === index && styles.activeDot]} />
                 ))}
              </View>
            </>
          )}

          {/* Categories */}
          <Text style={styles.sectionTitle}>View Products</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.categoriesContent}
          >
            {CATEGORIES.map((cat) => (
               <TouchableOpacity key={cat.id} style={styles.categoryItem} onPress={() => navigation.navigate('CatalogSubCategories', { category: cat })}>
                  <View style={styles.catImageProps}>
                    <Image source={cat.image} style={styles.catImage} />
                  </View>
                  <Text style={styles.catName}>{cat.title}</Text>
               </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Door Designer Promo */}
          <TouchableOpacity 
            style={styles.designerPromoContainer}
            onPress={() => navigation.navigate('Designer')}
            activeOpacity={0.9}
          >
            <View style={styles.designerPromoInner}>
              <Image
                source={require('../assets/composite-doors/deisnger-bg-image.png')}
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
              source={require('../assets/composite-doors/exploded-door.png')} 
              style={styles.designerPromoImage} 
              resizeMode="contain" 
            />
          </TouchableOpacity>

          {/* AI Visualiser Promo */}
          <TouchableOpacity 
            style={styles.aiPromoContainer}
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 25,
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
  categoriesContent: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  catImageProps: {
    width: 72,
    height: 72,
    borderRadius: 20,
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
    fontSize: 13,
    color: '#4B5563',
    fontFamily: 'RM',
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
    marginTop: 6,
  },
  designerPromoContainer: {
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 10,
    position: 'relative',
    height: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
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
});

export default Dashboard;

