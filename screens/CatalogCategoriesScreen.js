import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';
import { CATEGORIES } from '../data/ProductsData';
import { MaterialIcons } from '@expo/vector-icons';

export default function CatalogCategoriesScreen({ navigation }) {

  const handleCategoryPress = (category) => {
    if (!category) return;
    if (category.subcategories && category.subcategories.length > 0) {
      navigation.navigate('CatalogSubCategories', { category });
    } else {
      navigation.navigate('CatalogProductDetails', { 
        product: {
          id: category.id,
          title: category.title,
          heroImage: category.image,
          tagline: "Explore our range.",
          about: "Details coming soon.",
        }
      });
    }
  };

  const getItem = (id) => CATEGORIES.find(c => c.id === id);

  const BentoCard = ({ item, style, titleStyle }) => {
    if (!item) return null;
    const imageSource = typeof item.image === 'string' ? { uri: item.image } : item.image;

    return (
      <TouchableOpacity 
        activeOpacity={0.8}
        style={[styles.cardContainer, style]}
        onPress={() => handleCategoryPress(item)}
      >
        <ImageBackground 
          source={imageSource}
          style={styles.imageBackground}
          imageStyle={{ borderRadius: 16 }}
        >
          <View style={styles.overlay}>
            <Text style={[styles.cardTitle, titleStyle]}>{item.title}</Text>
            <MaterialIcons name="arrow-forward-ios" size={16} color="#fff" />
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Our Products</Text>
      </View>
      <ScrollView 
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ROW 1: Vertical Door + 2 Squares */}
        <View style={styles.bentoRowTall}>
          <BentoCard 
            item={getItem('composite-doors')} 
            style={[styles.bentoVertical, { marginRight: 16 }]} 
            titleStyle={styles.titleVertical}
          />
          <View style={styles.bentoColumn}>
            <BentoCard item={getItem('upvc-windows')} style={[styles.bentoSquare, { marginBottom: 16 }]} />
            <BentoCard item={getItem('roof-lanterns')} style={styles.bentoSquare} />
          </View>
        </View>

        {/* ROW 2: Wide Horizontal (Bi-fold doors) */}
        <View style={styles.bentoRowWide}>
          <BentoCard item={getItem('bi-fold-doors')} style={styles.bentoHorizontal} />
        </View>

        {/* ROW 3: 2 Squares + Vertical Commercial */}
        <View style={styles.bentoRowTall}>
          <View style={[styles.bentoColumn, { marginRight: 16 }]}>
            <BentoCard item={getItem('repairs')} style={[styles.bentoSquare, { marginBottom: 16 }]} />
            <BentoCard item={getItem('living-spaces')} style={styles.bentoSquare} />
          </View>
          <BentoCard 
            item={getItem('commercial-work')} 
            style={styles.bentoVertical} 
            titleStyle={styles.titleVertical}
          />
        </View>

        {/* ROW 4: Wide Horizontal (Skyrooms) */}
        <View style={[styles.bentoRowWide, { marginBottom: 40 }]}>
          <BentoCard item={getItem('skyrooms')} style={styles.bentoHorizontal} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'RB',
    color: '#111',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // accommodate tab bar
  },
  // BENTO GRID STYLES
  bentoRowTall: {
    flexDirection: 'row',
    height: 260,
    marginBottom: 16,
  },
  bentoRowWide: {
    height: 130,
    marginBottom: 16,
  },
  bentoColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  bentoVertical: {
    flex: 1,
    height: '100%',
  },
  bentoSquare: {
    flex: 1,
  },
  bentoHorizontal: {
    flex: 1,
  },
  
  // CARD STYLES
  cardContainer: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    backgroundColor: '#fff',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)', // Slightly darker for better text readability
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 15,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'RB',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    flex: 1,
    marginRight: 10,
  },
  titleVertical: {
    fontSize: 20, // larger text for the tall blocks
  }
});
