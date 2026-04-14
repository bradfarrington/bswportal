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
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { FLICKR_API_KEY, FLICKR_USER_ID, FLICKR_BASE_URL, buildPhotoUrl } from '../config/flickrConfig';

const { width } = Dimensions.get('window');
const GRID_PADDING = 12;
const GAP = 8;

// Bento tile sizing helpers
const fullWidth = width - GRID_PADDING * 2;
const halfWidth = (fullWidth - GAP) / 2;
const thirdWidth = (fullWidth - GAP * 2) / 3;

// Bento pattern: repeating group of 5 albums
// Row 1: one large (2/3) + one small (1/3)  — tall
// Row 2: one small (1/3) + one large (2/3)  — shorter
// Row 3: full width banner
const getBentoLayout = (index) => {
  const pos = index % 5;
  switch (pos) {
    case 0: // Large left
      return { w: halfWidth + thirdWidth / 2, h: 220 };
    case 1: // Small right
      return { w: halfWidth - thirdWidth / 2, h: 220 };
    case 2: // Small left
      return { w: halfWidth - thirdWidth / 2, h: 180 };
    case 3: // Large right
      return { w: halfWidth + thirdWidth / 2, h: 180 };
    case 4: // Full width
      return { w: fullWidth, h: 160 };
    default:
      return { w: halfWidth, h: 200 };
  }
};

// Group albums into bento rows
const buildBentoRows = (albums) => {
  const rows = [];
  let i = 0;
  while (i < albums.length) {
    const pos = i % 5;
    if (pos === 0 && i + 1 < albums.length) {
      // Row of 2: large + small
      rows.push([
        { album: albums[i], layout: getBentoLayout(i) },
        { album: albums[i + 1], layout: getBentoLayout(i + 1) },
      ]);
      i += 2;
    } else if (pos === 2 && i + 1 < albums.length) {
      // Row of 2: small + large
      rows.push([
        { album: albums[i], layout: getBentoLayout(i) },
        { album: albums[i + 1], layout: getBentoLayout(i + 1) },
      ]);
      i += 2;
    } else if (pos === 4) {
      // Full width row
      rows.push([{ album: albums[i], layout: getBentoLayout(i) }]);
      i += 1;
    } else {
      // Fallback: single item as half width
      rows.push([{ album: albums[i], layout: { w: fullWidth, h: 180 } }]);
      i += 1;
    }
  }
  return rows;
};

const GalleryScreen = ({ navigation }) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

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

  const renderAlbumTile = (album, layout) => (
    <TouchableOpacity
      key={album.id}
      style={[styles.albumCard, { width: layout.w, height: layout.h }]}
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
      <View style={styles.cardOverlay} />
      <View style={styles.cardContent}>
        <Text style={[styles.albumTitle, layout.w < halfWidth && styles.albumTitleSmall]}>
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

  const bentoRows = buildBentoRows(albums);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Gallery</Text>
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
          {bentoRows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.bentoRow}>
              {row.map(({ album, layout }) => renderAlbumTile(album, layout))}
            </View>
          ))}
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
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 20 : 10,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'RB',
    color: '#111',
  },
  scrollContent: {
    paddingHorizontal: GRID_PADDING,
    paddingBottom: 110,
  },
  bentoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: GAP,
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
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  albumTitle: {
    fontSize: 15,
    fontFamily: 'RB',
    color: '#fff',
    marginBottom: 4,
  },
  albumTitleSmall: {
    fontSize: 13,
  },
  countBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    fontSize: 12,
    fontFamily: 'RM',
    color: 'rgba(255,255,255,0.85)',
    marginLeft: 4,
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
