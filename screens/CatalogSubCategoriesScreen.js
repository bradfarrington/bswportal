import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function CatalogSubCategoriesScreen({ route, navigation }) {
  const { category } = route.params;

  const renderItem = ({ item }) => {
    const imageSource = item.cardImage ? item.cardImage : { uri: item.heroImage };
    
    return (
      <TouchableOpacity 
        style={styles.cardContainer}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('CatalogProductDetails', { product: item })}
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
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={category.subcategories}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
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
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardContainer: {
    width: '48%',
    height: 180,
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
