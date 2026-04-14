import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  Platform,
  SafeAreaView,
  TextInput,
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { FLICKR_API_KEY, FLICKR_USER_ID, FLICKR_BASE_URL, buildPhotoUrl } from '../config/flickrConfig';

const { width } = Dimensions.get('window');
const GRID_PADDING = 12;
const GAP = 8;

const getCoverAspectRatio = (album) => {
  const extras = album.primary_photo_extras;
  let ratio = 1;
  if (extras) {
    if (extras.width_c && extras.height_c) ratio = parseInt(extras.width_c, 10) / parseInt(extras.height_c, 10);
    else if (extras.width_z && extras.height_z) ratio = parseInt(extras.width_z, 10) / parseInt(extras.height_z, 10);
    else if (extras.width_m && extras.height_m) ratio = parseInt(extras.width_m, 10) / parseInt(extras.height_m, 10);
  }
  // Clamp ratio to avoid extremely stretched or compressed tiles
  return Math.max(0.65, Math.min(ratio, 1.8));
};

// Build 2-column masonry layout
const buildMasonryColumns = (albums) => {
  const leftCol = [];
  const rightCol = [];
  let leftHeight = 0;
  let rightHeight = 0;

  albums.forEach((album) => {
    const ratio = getCoverAspectRatio(album);
    const estimatedHeight = 1 / ratio;

    if (leftHeight <= rightHeight) {
      leftCol.push({ album, ratio });
      leftHeight += estimatedHeight;
    } else {
      rightCol.push({ album, ratio });
      rightHeight += estimatedHeight;
    }
  });

  return { leftCol, rightCol };
};

const GalleryScreen = ({ navigation }) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const fetchAlbums = useCallback(async () => {
    try {
      setError(null);
      const response = await axios.get(FLICKR_BASE_URL, {
        params: {
          method: 'flickr.photosets.getList',
          api_key: FLICKR_API_KEY,
          user_id: FLICKR_USER_ID,
          format: 'json',
          nojsoncallback: 1,
          primary_photo_extras: 'url_m,url_z,url_c',
        },
      });

      if (response.data.stat === 'ok') {
        setAlbums(response.data.photosets.photoset);
      } else {
        setError(response.data.message || 'Failed to load albums');
      }
    } catch (err) {
      setError('Unable to connect to Flickr. Please check your connection.');
      console.error('Flickr API error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAlbums();
  }, [fetchAlbums]);

  const getCoverUrl = (album) => {
    if (album.primary_photo_extras?.url_c) return album.primary_photo_extras.url_c;
    if (album.primary_photo_extras?.url_z) return album.primary_photo_extras.url_z;
    if (album.primary_photo_extras?.url_m) return album.primary_photo_extras.url_m;
    return `https://live.staticflickr.com/${album.server}/${album.primary}_${album.secret}_z.jpg`;
  };

  const renderAlbumTile = (album, ratio) => (
    <TouchableOpacity
      key={album.id}
      style={[styles.albumCard, { aspectRatio: ratio }]}
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate('GalleryAlbum', {
          photosetId: album.id,
          title: album.title._content,
        })
      }
    >
      <Image
        source={{ uri: getCoverUrl(album) }}
        style={styles.coverImage}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.85)']}
        locations={[0.3, 1]}
        style={styles.cardOverlay}
      />
      <View style={styles.cardContent}>
        <Text style={styles.albumTitle} numberOfLines={2}>
          {album.title._content}
        </Text>
        <View style={styles.countBadge}>
          <Ionicons name="images-outline" size={12} color="#fff" />
          <Text style={styles.countText}>{album.photos}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#e5040a" />
        <Text style={styles.loadingText}>Loading Gallery...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Ionicons name="cloud-offline-outline" size={48} color="#ccc" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => { setLoading(true); fetchAlbums(); }}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const filteredAlbums = albums.filter((album) =>
    album.title._content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { leftCol, rightCol } = buildMasonryColumns(filteredAlbums);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.searchContainer, isFocused && styles.searchContainerFocused]}>
          <Ionicons name="search" size={22} color={isFocused ? '#e5040a' : '#888'} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Find an album..."
            placeholderTextColor="#A0AEC0"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            selectionColor="#e5040a"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.7} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#ccc" />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#e5040a"
              colors={['#e5040a']}
            />
          }
        >
          <View style={styles.masonryContainer}>
            <View style={styles.masonryColumn}>
              {leftCol.map(({ album, ratio }) => renderAlbumTile(album, ratio))}
            </View>
            <View style={styles.masonryColumn}>
              {rightCol.map(({ album, ratio }) => renderAlbumTile(album, ratio))}
            </View>
          </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: GRID_PADDING,
    marginTop: Platform.OS === 'android' ? 20 : 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  searchContainerFocused: {
    borderColor: 'rgba(229, 4, 10, 0.3)',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'RM',
    color: '#111',
    marginLeft: 10,
    marginBottom: -2, // Optical alignment for custom fonts
  },
  searchIcon: {
    marginRight: 0,
  },
  clearButton: {
    padding: 2,
    marginLeft: 8,
  },
  scrollContent: {
    paddingHorizontal: GRID_PADDING,
    paddingBottom: 110,
  },
  masonryContainer: {
    flexDirection: 'row',
    gap: GAP,
  },
  masonryColumn: {
    flex: 1,
    gap: GAP,
  },
  albumCard: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  coverImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  albumTitle: {
    fontSize: 14,
    fontFamily: 'RB',
    color: '#fff',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  countBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    fontSize: 12,
    fontFamily: 'RM',
    color: 'rgba(255,255,255,0.9)',
    marginLeft: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    fontFamily: 'RM',
    color: '#999',
  },
  errorText: {
    marginTop: 16,
    fontSize: 15,
    fontFamily: 'RM',
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#e5040a',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 20,
  },
  retryText: {
    color: '#fff',
    fontFamily: 'RB',
    fontSize: 15,
  },
});

export default GalleryScreen;
