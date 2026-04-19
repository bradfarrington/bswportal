import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function CatalogSubCategoriesScreen({ route, navigation }) {
  const { category } = route.params;

  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const { width, height } = dimensions;
  const isTablet = Math.min(width, height) >= 768;
  const isLandscape = width > height;

  const numItems = category.subcategories?.length || 0;
  
  let numColumns = 2; // Default mobile: 2-column grid
  if (isTablet) {
    if (numItems <= 6) {
       // Dynamic viewport mode
       if (isLandscape) {
           if (numItems === 4) numColumns = 2; // 2x2 grid
           else if (numItems === 6) numColumns = 3; // 3x2 grid
           else if (numItems <= 3) numColumns = Math.max(numItems, 2); // Minimum 2 columns
           else numColumns = 3; 
       } else {
           // Portrait is tall, minimum 2 columns to preserve grid look
           numColumns = 2;
       }
    } else {
       // Scroll fallback for lots of items
       numColumns = isLandscape ? 4 : 3;
    }
  }

  // Dynamic Height Calculation
  const isDynamicGrid = isTablet && numItems <= 6;
  const numRows = Math.ceil(numItems / numColumns);
  const availableHeight = height - 200; // approximation of viewport minus headers/padding
  const totalGapSpace = (numRows - 1) * 16;

  const renderItem = ({ item }) => {
    const imageSource = item.cardImage ? item.cardImage : { uri: item.heroImage };
    
    let cardWidth = '48%';
    if (numColumns === 1) cardWidth = '100%';
    if (numColumns === 3) cardWidth = '31%';
    if (numColumns === 4) cardWidth = '23%';

    let dynamicHeight = isTablet ? 240 : 180;
    if (isDynamicGrid && numRows > 0) {
      dynamicHeight = Math.max((availableHeight - totalGapSpace) / numRows, 240);
    }
    
    return (
      <TouchableOpacity 
        style={[styles.cardContainer, { width: cardWidth, height: dynamicHeight, marginBottom: numColumns === 1 ? 16 : 0 }]}
        activeOpacity={0.8}
        onPress={() => {
          if (item.subcategories && item.subcategories.length > 0) {
            navigation.push('CatalogSubCategories', { category: item });
          } else {
            navigation.navigate('CatalogProductDetails', { product: item });
          }
        }}
      >
        <ImageBackground 
          source={imageSource}
          style={styles.imageBackground}
          imageStyle={{ borderRadius: 16 }}
        >
          <View style={styles.overlay}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <MaterialIcons name="arrow-forward-ios" size={14} color="#fff" />
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList 
        key={`${numColumns}-${isLandscape}`} // Force re-render when layout changes
        data={category.subcategories}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  columnWrapper: {
    justifyContent: 'flex-start',
    gap: 16, // using flex gap instead of space-between nicely handles uneven rows
    marginBottom: 16,
  },
  cardContainer: {
    // Height is set dynamically in component, but we can set a fallback
    minHeight: 180,
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
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 12,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'RB',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    flex: 1,
    marginRight: 8,
    lineHeight: 20,
  },
});
