import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  Platform,
  Modal,
  Dimensions 
} from 'react-native';
import { MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { FLICKR_API_KEY, FLICKR_USER_ID, FLICKR_BASE_URL, buildPhotoUrl } from '../config/flickrConfig';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const TABS = ['Overview', 'Details', 'Colours', 'Extras'];

export default function CatalogProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const [activeTab, setActiveTab] = useState('Overview');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState('');
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [galleryAlbumId, setGalleryAlbumId] = useState(null);
  const [galleryAlbumTitle, setGalleryAlbumTitle] = useState('');

  const openImage = (imageSource, label = '') => {
    setSelectedImage(imageSource);
    setSelectedLabel(label);
  };

  // Fetch Flickr gallery photos matching the product album name
  useEffect(() => {
    if (!product.galleryAlbumName) return;

    const fetchGallery = async () => {
      try {
        // Step 1: Find the album by name
        const albumsRes = await axios.get(FLICKR_BASE_URL, {
          params: {
            method: 'flickr.photosets.getList',
            api_key: FLICKR_API_KEY,
            user_id: FLICKR_USER_ID,
            format: 'json',
            nojsoncallback: 1,
          },
        });

        if (albumsRes.data.stat !== 'ok') return;

        const matchingAlbum = albumsRes.data.photosets.photoset.find(
          (a) => a.title._content.toLowerCase() === product.galleryAlbumName.toLowerCase()
        );

        if (!matchingAlbum) return;

        setGalleryAlbumId(matchingAlbum.id);
        setGalleryAlbumTitle(matchingAlbum.title._content);

        // Step 2: Get latest 6 photos from the album
        const photosRes = await axios.get(FLICKR_BASE_URL, {
          params: {
            method: 'flickr.photosets.getPhotos',
            api_key: FLICKR_API_KEY,
            photoset_id: matchingAlbum.id,
            user_id: FLICKR_USER_ID,
            format: 'json',
            nojsoncallback: 1,
            per_page: 6,
            page: 1,
            extras: 'url_m,url_z',
          },
        });

        if (photosRes.data.stat === 'ok') {
          setGalleryPhotos(photosRes.data.photoset.photo);
        }
      } catch (err) {
        console.error('Gallery fetch error:', err);
      }
    };

    fetchGallery();
  }, [product.galleryAlbumName]);

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <TouchableOpacity 
            key={tab} 
            style={[styles.tabButton, isActive && styles.activeTabButton]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderOverview = () => (
    <View style={styles.overviewSection}>
      {/* Hero Image */}
      <Image source={typeof product.heroImage === 'string' ? { uri: product.heroImage } : product.heroImage} style={styles.heroImage} />

      {/* Trust Badge Row */}
      <View style={styles.trustBadgeRow}>
        <View style={styles.checkIconContainer}>
          <MaterialIcons name="check" size={14} color="#fff" />
        </View>
        <Text style={styles.trustText}>{product.tagline || 'Premium Quality Products'}</Text>
      </View>

      {/* About Section */}
      <View style={styles.aboutContainer}>
        <Text style={styles.sectionTitle}>About {product.title}</Text>
        <Text 
          style={styles.aboutText} 
          numberOfLines={isExpanded ? undefined : 4}
        >
          {product.about}
        </Text>
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
          <Text style={styles.seeMoreText}>
            {isExpanded ? 'See Less' : 'See More....'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Gallery Section */}
      {galleryPhotos.length > 0 && (
        <View style={styles.galleryContainer}>
          <Text style={styles.sectionTitle}>Gallery</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.galleryScroll}
          >
            {galleryPhotos.map((photo) => (
              <TouchableOpacity 
                key={photo.id} 
                activeOpacity={0.8}
                onPress={() => openImage({ uri: buildPhotoUrl(photo, 'b') })}
              >
                <Image 
                  source={{ uri: photo.url_m || buildPhotoUrl(photo, 'z') }} 
                  style={styles.galleryImage} 
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity 
            onPress={() => navigation.navigate('GalleryAlbum', {
              photosetId: galleryAlbumId,
              title: galleryAlbumTitle,
            })}
          >
            <Text style={styles.viewMoreText}>View More →</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom spacing for CTA */}
      <View style={{ height: 100 }} />
    </View>
  );

  const renderDetails = () => (
    <View style={styles.detailsSection}>
      {product.details?.map((detail, index) => (
        <View key={index} style={styles.detailCard}>
          <Text style={styles.detailTitle}>{detail.title}</Text>
          <Text style={styles.detailContent}>{detail.content}</Text>
          {/* Overview image (e.g. full locking points diagram) */}
          {detail.overviewImage && (
            <TouchableOpacity activeOpacity={0.8} onPress={() => openImage(detail.overviewImage, detail.title)}>
              <Image source={detail.overviewImage} style={styles.overviewImage} resizeMode="contain" />
            </TouchableOpacity>
          )}
          {/* Image grid (styles, security points, hardware) */}
          {detail.images && detail.images.length > 0 && (
            <View style={styles.imageGrid}>
              {detail.images.map((img, i) => (
                <TouchableOpacity key={i} style={styles.imageGridItem} activeOpacity={0.8} onPress={() => openImage(img.image, img.label)}>
                  <Image source={img.image} style={styles.gridImage} resizeMode="contain" />
                  <Text style={styles.gridLabel}>{img.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ))}
      {(!product.details || product.details.length === 0) && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No detailed specifications available.</Text>
        </View>
      )}
      <View style={{ height: 100 }} />
    </View>
  );

  const renderColours = () => (
    <View style={styles.detailsSection}>
      {product.colours?.map((colourGroup, index) => (
        <View key={index} style={styles.detailCard}>
          <Text style={styles.detailTitle}>{colourGroup.title}</Text>
          <Text style={styles.detailContent}>{colourGroup.content}</Text>
          {colourGroup.swatches && colourGroup.swatches.length > 0 && (
            <View style={styles.swatchGrid}>
              {colourGroup.swatches.map((swatch, i) => (
                <TouchableOpacity key={i} style={styles.swatchItem} activeOpacity={0.8} onPress={() => openImage(swatch.image, swatch.label)}>
                  <Image source={swatch.image} style={styles.swatchImage} resizeMode="contain" />
                  <Text style={styles.swatchLabel}>{swatch.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ))}
      {(!product.colours || product.colours.length === 0) && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No colour options available.</Text>
        </View>
      )}
      <View style={{ height: 100 }} />
    </View>
  );

  const renderExtras = () => (
    <View style={styles.detailsSection}>
      {product.extras?.map((extra, index) => (
        <View key={index} style={styles.detailCard}>
          <Text style={styles.detailTitle}>{extra.title}</Text>
          {extra.image && (
            <TouchableOpacity activeOpacity={0.8} onPress={() => openImage(extra.image, extra.title)}>
              <Image source={extra.image} style={styles.extraImage} resizeMode="cover" />
            </TouchableOpacity>
          )}
          <Text style={styles.detailContent}>{extra.content}</Text>
        </View>
      ))}
      {(!product.extras || product.extras.length === 0) && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No extras available.</Text>
        </View>
      )}
      <View style={{ height: 100 }} />
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return renderOverview();
      case 'Details':
        return renderDetails();
      case 'Colours':
        return renderColours();
      case 'Extras':
        return renderExtras();
      default:
        return renderOverview();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Custom Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => navigation.goBack()}
          >
            <Feather name="chevron-left" size={24} color="#111" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{product.title || 'Product'}</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="bell" size={20} color="#111" />
          </TouchableOpacity>
        </View>

        {/* Tab Bar */}
        {renderTabs()}

        {/* Dynamic Content */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {renderContent()}
        </ScrollView>

        {/* Fixed CTA button */}
        <View style={styles.ctaContainer}>
          <TouchableOpacity 
            style={styles.ctaButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Quote')} 
          >
            <Text style={styles.ctaText}>Enquire Now</Text>
          </TouchableOpacity>
        </View>

        {/* Image Lightbox Modal */}
        <Modal
          visible={selectedImage !== null}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setSelectedImage(null)}
        >
          <View style={styles.modalOverlay}>
            <SafeAreaView style={styles.modalSafeArea}>
              {/* Close button */}
              <TouchableOpacity 
                style={styles.modalCloseButton} 
                onPress={() => setSelectedImage(null)}
              >
                <Feather name="x" size={24} color="#fff" />
              </TouchableOpacity>

              {/* Expanded Image */}
              <View style={styles.modalImageContainer}>
                {selectedImage && (
                  <Image 
                    source={selectedImage} 
                    style={styles.modalImage} 
                    resizeMode="contain" 
                  />
                )}
              </View>

              {/* Label */}
            </SafeAreaView>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
    paddingBottom: 15,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'RB',
    color: '#111',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tabButton: {
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: '#E5040A', // Primary Red
  },
  tabText: {
    fontSize: 15,
    fontFamily: 'RM',
    color: '#9CA3AF',
  },
  activeTabText: {
    color: '#E5040A',
    fontFamily: 'RB',
  },
  scrollView: {
    flex: 1,
  },
  overviewSection: {
    paddingHorizontal: 20,
  },
  heroImage: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  statsLeft: {
    justifyContent: 'center',
  },
  startFromText: {
    fontSize: 13,
    fontFamily: 'RM',
    color: '#6B7280',
    marginBottom: 8,
  },
  priceBadge: {
    backgroundColor: '#E5040A',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
    shadowColor: '#E5040A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  priceText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'RB',
  },
  statsRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'RB',
    color: '#111',
    marginLeft: 6,
  },
  reviewCount: {
    color: '#6B7280',
    fontFamily: 'RM',
  },
  completedText: {
    fontSize: 13,
    fontFamily: 'RM',
    color: '#111',
  },
  trustBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkIconContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#34C759',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  trustText: {
    fontSize: 14,
    fontFamily: 'RM',
    color: '#111',
  },
  aboutContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'RB',
    color: '#111',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 15,
    fontFamily: 'RM',
    color: '#6B7280',
    lineHeight: 24,
  },
  seeMoreText: {
    fontFamily: 'RB',
    color: '#E5040A',
    marginTop: 8,
  },
  galleryContainer: {
    marginBottom: 30,
  },
  galleryScroll: {
    paddingRight: 10,
  },
  galleryImage: {
    width: 150,
    height: 150,
    borderRadius: 16,
    marginRight: 12,
  },
  viewMoreText: {
    fontFamily: 'RB',
    color: '#E5040A',
    fontSize: 14,
    marginTop: 12,
  },
  detailsSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  detailCard: {
    backgroundColor: '#F9FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  detailTitle: {
    fontSize: 16,
    fontFamily: 'RB',
    color: '#111',
    marginBottom: 8,
  },
  detailContent: {
    fontSize: 14,
    fontFamily: 'RM',
    color: '#6B7280',
    lineHeight: 22,
  },
  emptyState: {
    paddingTop: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    fontFamily: 'RM',
    fontSize: 16,
    color: '#9CA3AF',
  },
  ctaContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  ctaButton: {
    backgroundColor: '#E5040A', // Brand Primary Red
    borderRadius: 30,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E5040A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  ctaText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'RB',
  },
  // Image grid for details (frame styles, security, hardware)
  overviewImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 8,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 14,
    gap: 12,
  },
  imageGridItem: {
    width: '46%',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#EAECF0',
  },
  gridImage: {
    width: '100%',
    height: 90,
    marginBottom: 8,
  },
  gridLabel: {
    fontSize: 12,
    fontFamily: 'RM',
    color: '#374151',
    textAlign: 'center',
  },
  // Colour swatches
  swatchGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 14,
    gap: 10,
  },
  swatchItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 8,
  },
  swatchImage: {
    width: '100%',
    height: 70,
    borderRadius: 8,
    marginBottom: 6,
  },
  swatchLabel: {
    fontSize: 10,
    fontFamily: 'RM',
    color: '#374151',
    textAlign: 'center',
  },
  // Extras images
  extraImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginVertical: 10,
  },
  // Modal Lightbox
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSafeArea: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 20,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  modalImageContainer: {
    width: SCREEN_WIDTH - 40,
    maxHeight: SCREEN_HEIGHT * 0.7,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  modalImage: {
    width: SCREEN_WIDTH - 40,
    height: undefined,
    aspectRatio: 1,
    maxHeight: SCREEN_HEIGHT * 0.7,
    borderRadius: 50,
  },
  modalLabel: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'RB',
    marginTop: 20,
    textAlign: 'center',
  },
});
