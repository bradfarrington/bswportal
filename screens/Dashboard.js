import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, SafeAreaView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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

          {/* Categories */}
          <Text style={styles.sectionTitle}>Select Category</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.categoriesContent}
          >
            {[
              { name: 'Windows', id: '1' },
              { name: 'Flush Windows', id: '2' },
              { name: 'Doors', id: '3' },
              { name: 'UPVC Doors', id: '4' },
              { name: 'Composite', id: '5' },
            ].map((cat) => (
               <TouchableOpacity key={cat.id} style={styles.categoryItem} onPress={() => navigation.navigate('Orders')}>
                  <View style={styles.catImageProps}>
                    <Text style={{color: '#aaa', fontSize: 10}}>Img</Text>
                  </View>
                  <Text style={styles.catName}>{cat.name}</Text>
               </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Near For You */}
          <View style={[styles.sectionHeader, { marginHorizontal: 20 }]}>
             <Text style={styles.sectionTitleNoMargin}>Near For You</Text>
             <TouchableOpacity>
               <Text style={styles.seeAllText}>See all</Text>
             </TouchableOpacity>
          </View>

          {/* Near You Card */}
          <TouchableOpacity style={styles.nearCard} onPress={() => navigation.navigate('Brochures')}>
             <View style={styles.nearImgLayout}>
                <Text style={{color: '#999'}}>Promotional Image</Text>
             </View>
             
             <View style={styles.ratingBadge}>
               <Ionicons name="star" size={12} color="#FF9500" />
               <Text style={styles.ratingText}>4.9 (Review)</Text>
             </View>
             
             <View style={styles.nearCardBottomOverlay}>
               <LinearGradient
                 colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']}
                 style={StyleSheet.absoluteFillObject}
               />
               <View style={styles.nearCardLabel}>
                 <Text style={styles.nearCardTitle}>AC Repair</Text>
                 <Text style={styles.nearCardSubtitle}>$30/hour</Text>
               </View>
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
  },
  catName: {
    fontSize: 13,
    color: '#4B5563',
    fontFamily: 'RM',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontFamily: 'RM',
  },
  nearCard: {
    marginHorizontal: 20,
    height: 180,
    borderRadius: 24,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
    position: 'relative',
  },
  nearImgLayout: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'RB',
    color: '#111',
  },
  nearCardBottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    justifyContent: 'flex-end',
    padding: 16,
    zIndex: 2,
  },
  nearCardLabel: {
    flexDirection: 'column',
  },
  nearCardTitle: {
    fontSize: 16,
    fontFamily: 'RB',
    color: '#fff',
  },
  nearCardSubtitle: {
    fontSize: 13,
    fontFamily: 'RM',
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
});

export default Dashboard;

