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
  Modal,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import ImageViewer from 'react-native-image-zoom-viewer';
import { FLICKR_API_KEY, FLICKR_USER_ID, FLICKR_BASE_URL, buildPhotoUrl } from '../config/flickrConfig';

const { width } = Dimensions.get('window');
const PADDING = 12;
const GAP = 6;
const FULL = width - PADDING * 2;
const HALF = (FULL - GAP) / 2;
const THIRD = (FULL - GAP * 2) / 3;
const TWO_THIRDS = THIRD * 2 + GAP;

// Bento pattern repeats every 7 images:
// Row A: 3 equal squares (each 1/3 width)
// Row B: 1 wide left (2/3) + 1 tall right (1/3, spans 2 rows)
// Row C: 1 small left (1/3) + (right is continuation of row B tall tile)
// Then repeat

const buildBentoRows = (photos) => {
  const rows = [];
  let i = 0;

  while (i < photos.length) {
    const remaining = photos.length - i;

    // Row type A: 3 square thumbnails
    if (remaining >= 3) {
      rows.push({
        type: 'triple',
        items: [
          { photo: photos[i], idx: i },
          { photo: photos[i + 1], idx: i + 1 },
          { photo: photos[i + 2], idx: i + 2 },
        ],
      });
      i += 3;
    } else {
      // Fill remaining photos as a final row
      const items = [];
      for (let j = i; j < photos.length; j++) {
        items.push({ photo: photos[j], idx: j });
      }
      rows.push({ type: 'fill', items });
      break;
    }

    // Row type B: wide left + narrow right
    if (i < photos.length) {
      if (i + 1 < photos.length) {
        rows.push({
          type: 'wide-left',
          items: [
            { photo: photos[i], idx: i },
            { photo: photos[i + 1], idx: i + 1 },
          ],
        });
        i += 2;
      } else {
        rows.push({
          type: 'fill',
          items: [{ photo: photos[i], idx: i }],
        });
        i += 1;
      }
    }

    // Row type C: narrow left + wide right (flipped)
    if (i < photos.length) {
      if (i + 1 < photos.length) {
        rows.push({
          type: 'wide-right',
          items: [
            { photo: photos[i], idx: i },
            { photo: photos[i + 1], idx: i + 1 },
          ],
        });
        i += 2;
      } else {
        rows.push({
          type: 'fill',
          items: [{ photo: photos[i], idx: i }],
        });
        i += 1;
      }
    }
  }

  return rows;
};

const GalleryAlbumScreen = ({ route }) => {
  const { photosetId, title } = route.params;
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const fetchPhotos = useCallback(async () => {
    try {
      setError(null);
      const response = await axios.get(FLICKR_BASE_URL, {
        params: {
          method: 'flickr.photosets.getPhotos',
          api_key: FLICKR_API_KEY,
          photoset_id: photosetId,
          user_id: FLICKR_USER_ID,
          format: 'json',
          nojsoncallback: 1,
          extras: 'url_sq,url_m,url_z,url_c,url_l,url_o',
          per_page: 500,
        },
      });

      if (response.data.stat === 'ok') {
        setPhotos(response.data.photoset.photo);
      } else {
        setError(response.data.message || 'Failed to load photos');
      }
    } catch (err) {
      setError('Unable to load photos. Please check your connection.');
      console.error('Flickr photos error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [photosetId]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPhotos();
  }, [fetchPhotos]);

  const getThumbUrl = (photo) => {
    return photo.url_z || photo.url_c || photo.url_m || buildPhotoUrl(photo, 'z');
  };

  const getFullUrl = (photo) => {
    return photo.url_l || photo.url_c || photo.url_z || photo.url_o || buildPhotoUrl(photo, 'b');
  };

  const viewerImages = photos.map((photo) => ({
    url: getFullUrl(photo),
  }));

  const handleImagePress = (index) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  const renderTile = (photo, idx, tileWidth, tileHeight) => (
    <TouchableOpacity
      key={photo.id}
      activeOpacity={0.85}
      onPress={() => handleImagePress(idx)}
      style={[styles.imageWrapper, { width: tileWidth, height: tileHeight }]}
    >
      <Image
        source={{ uri: getThumbUrl(photo) }}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  const renderRow = (row, rowIndex) => {
    switch (row.type) {
      case 'triple':
        return (
          <View key={rowIndex} style={styles.bentoRow}>
            {row.items.map(({ photo, idx }) =>
              renderTile(photo, idx, THIRD, THIRD)
            )}
          </View>
        );
      case 'wide-left':
        return (
          <View key={rowIndex} style={styles.bentoRow}>
            {renderTile(row.items[0].photo, row.items[0].idx, TWO_THIRDS, HALF)}
            {renderTile(row.items[1].photo, row.items[1].idx, THIRD, HALF)}
          </View>
        );
      case 'wide-right':
        return (
          <View key={rowIndex} style={styles.bentoRow}>
            {renderTile(row.items[0].photo, row.items[0].idx, THIRD, HALF)}
            {renderTile(row.items[1].photo, row.items[1].idx, TWO_THIRDS, HALF)}
          </View>
        );
      case 'fill':
      default: {
        const tileW = row.items.length === 1
          ? FULL
          : (FULL - GAP * (row.items.length - 1)) / row.items.length;
        return (
          <View key={rowIndex} style={styles.bentoRow}>
            {row.items.map(({ photo, idx }) =>
              renderTile(photo, idx, tileW, THIRD)
            )}
          </View>
        );
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#e5040a" />
        <Text style={styles.loadingText}>Loading photos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Ionicons name="cloud-offline-outline" size={48} color="#ccc" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => { setLoading(true); fetchPhotos(); }}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const bentoRows = buildBentoRows(photos);

  return (
    <View style={styles.container}>
      {/* Stats bar */}
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Ionicons name="images-outline" size={16} color="#888" />
          <Text style={styles.statText}>{photos.length} Photos</Text>
        </View>
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
        {bentoRows.map((row, rowIndex) => renderRow(row, rowIndex))}
      </ScrollView>

      {/* Full-screen image viewer modal */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <ImageViewer
          imageUrls={viewerImages}
          index={selectedIndex}
          enableSwipeDown={true}
          onCancel={() => setModalVisible(false)}
          onSwipeDown={() => setModalVisible(false)}
          saveToLocalByLongPress={false}
          backgroundColor="rgba(0,0,0,0.95)"
          renderIndicator={(currentIndex, allSize) => (
            <View style={styles.indicator}>
              <Text style={styles.indicatorText}>
                {currentIndex} / {allSize}
              </Text>
            </View>
          )}
          renderHeader={() => (
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <AntDesign name="close" size={22} color="#fff" />
            </TouchableOpacity>
          )}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  statText: {
    fontSize: 14,
    fontFamily: 'RM',
    color: '#888',
    marginLeft: 6,
  },
  scrollContent: {
    padding: PADDING,
    paddingBottom: 110,
  },
  bentoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: GAP,
  },
  imageWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
  },
  image: {
    width: '100%',
    height: '100%',
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
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 999,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 998,
  },
  indicatorText: {
    color: '#fff',
    fontFamily: 'RM',
    fontSize: 15,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 12,
    overflow: 'hidden',
  },
});

export default GalleryAlbumScreen;
