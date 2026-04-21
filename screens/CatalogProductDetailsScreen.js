import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Platform,
  Modal,
  Dimensions,
  useWindowDimensions,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import ImageViewer from 'react-native-image-zoom-viewer';
import { FLICKR_API_KEY, FLICKR_USER_ID, FLICKR_BASE_URL, buildPhotoUrl } from '../config/flickrConfig';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../config/supabaseClient';
import CachedImage from '../components/CachedImage';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const TABS_DEFAULT = ['Overview', 'Details', 'Styles', 'Glass', 'Colours', 'Hardware', 'Extras', 'Brochure'];
const TABS_COMPOSITE = ['Overview', 'Details', 'Styles', 'Colours', 'Glass', 'Hardware', 'Extras', 'Brochure'];

export default function CatalogProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;
  const isLandscape = width > height;

  const isCompositeDoor = [
    'composite-doors', 
    'edge-collection', 
    'gemstone-collection', 
    'galaxy-collection', 
    'highline-range', 
    'elements-collection', 
    'elegance-collection', 
    'stable-doors', 
    'double-doors', 
    'inox-collection'
  ].includes(product.id);

  const isWindowProduct = [
    'windows',
    'casements',
    'flush-casements',
    'residence',
    'r7',
    'r9',
    'aluminium'
  ].includes(product.id);

  const isLanternProduct = [
    'roof-lanterns',
    'roof-lanterns-sub'
  ].includes(product.id);

  const [activeTab, setActiveTab] = useState('Overview');
  const [isExpanded, setIsExpanded] = useState(isTablet);
  const scrollViewRef = useRef(null);
  const [viewerImages, setViewerImages] = useState([]);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [brochures, setBrochures] = useState([]);
  const [brochuresLoading, setBrochuresLoading] = useState(false);

  // Stateful carousel component to track pagination
  const CarouselWidget = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = (event) => {
      const scrollPosition = event.nativeEvent.contentOffset.x;
      const itemWidth = (isLanternProduct && isTablet) ? ((width * (isLandscape ? 0.64 : 0.58)) - 110) : 220;
      const margin = 20;
      const index = Math.round(scrollPosition / (itemWidth + margin));
      setActiveIndex(index);
    };

    return (
      <View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.carouselContainer}
          snapToInterval={(isLanternProduct && isTablet) ? ((width * (isLandscape ? 0.64 : 0.58)) - 90) : 240}
          decelerationRate="fast"
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {images.map((img, i) => (
            <TouchableOpacity key={i} style={[styles.carouselItem, isLanternProduct && isTablet && { width: (width * (isLandscape ? 0.64 : 0.58)) - 110 }]} activeOpacity={0.8} onPress={() => openImage(img.image, img.label)}>
              <CachedImage source={img.image} style={[styles.carouselImage, isLanternProduct && { height: isTablet ? 240 : 120 }]} resizeMode="contain" />
              <Text style={styles.carouselLabel}>{img.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {isLanternProduct && isTablet && images.length > 1 && (
          <View style={styles.paginationContainer}>
            {images.map((_, i) => (
              <View key={i} style={[styles.paginationDot, i === activeIndex && styles.paginationDotActive]} />
            ))}
          </View>
        )}
      </View>
    );
  };
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [galleryAlbumId, setGalleryAlbumId] = useState(null);
  const [galleryAlbumTitle, setGalleryAlbumTitle] = useState('');

  const openImage = (imageSource, label = '') => {
    let images = [];
    if (imageSource && imageSource.uri) {
      images = [{ url: imageSource.uri }];
    } else {
      images = [{ url: '', props: { source: imageSource } }];
    }
    
    setViewerImages(images);
    setViewerIndex(0);
    setIsViewerVisible(true);
  };

  const openGalleryImage = (index) => {
    const images = galleryPhotos.map(photo => ({
      url: photo.url_l || photo.url_c || photo.url_z || photo.url_o || buildPhotoUrl(photo, 'b'),
    }));
    setViewerImages(images);
    setViewerIndex(index);
    setIsViewerVisible(true);
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

  // Fetch matching brochures from Supabase
  useEffect(() => {
    if (!product.brochureTitles?.length) return;
    const fetchBrochures = async () => {
      setBrochuresLoading(true);
      try {
        const { data } = await supabase
          .from('brochures')
          .select('*')
          .in('title', product.brochureTitles);
        if (data) setBrochures(data);
      } catch (e) {
        console.error('Brochure fetch error:', e);
      }
      setBrochuresLoading(false);
    };
    fetchBrochures();
  }, [product.brochureTitles]);

  const renderTabs = () => {
    const currentTabs = isCompositeDoor ? TABS_COMPOSITE : TABS_DEFAULT;
    const availableTabs = currentTabs.filter(tab => {
      if (tab === 'Brochure') return product.brochureTitles?.length > 0;
      if (tab === 'Extras') return product.extras && product.extras.length > 0;
      if (tab === 'Colours') return product.colours && product.colours.length > 0;
      if (tab === 'Glass') return product.glass && product.glass.length > 0;
      if (tab === 'Styles') return product.styles && product.styles.length > 0;
      if (tab === 'Hardware') return product.hardware && product.hardware.length > 0;
      return true;
    });

    return (
      <View style={styles.tabContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContent}
        >
          {availableTabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity 
                key={tab} 
                style={[styles.tabButton, isActive && styles.activeTabButton]}
                onPress={() => {
                  setActiveTab(tab);
                  scrollViewRef.current?.scrollTo({ y: 0, animated: false });
                }}
              >
                <Text style={[styles.tabText, isActive && styles.activeTabText]}>{tab}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  const renderOverview = () => (
    <View style={styles.overviewSection}>
      {/* Hero Image - ONLY rendered here if Mobile. On Tablet, it's sticky on left pane */}
      {!isTablet && (
        <CachedImage 
          source={typeof product.heroImage === 'string' ? { uri: product.heroImage } : product.heroImage} 
          style={[
            styles.heroImage,
            ([
              'upvc-doors', 
              'composite-doors', 
              'edge-collection', 
              'gemstone-collection', 
              'galaxy-collection', 
              'highline-range', 
              'elements-collection', 
              'elegance-collection', 
              'stable-doors', 
              'double-doors', 
              'inox-collection'
            ].includes(product.id)) && { height: 420 }
          ]} 
        />
      )}

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

      {/* Design Your Dream Door Card (for composite doors) */}
      {isCompositeDoor && !isTablet && renderDesignerPromo()}

      {/* Gallery Section */}
      {galleryPhotos.length > 0 && (
        <View style={styles.galleryContainer}>
          <Text style={styles.sectionTitle}>Gallery</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.galleryScroll}
          >
            {galleryPhotos.map((photo, index) => (
              <TouchableOpacity 
                key={photo.id} 
                activeOpacity={0.8}
                onPress={() => openGalleryImage(index)}
              >
                <CachedImage 
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
              <CachedImage source={detail.overviewImage} style={styles.overviewImage} resizeMode={detail.overviewImageMode || "contain"} />
            </TouchableOpacity>
          )}
          {/* Image grid (styles, security points, hardware) */}
          {detail.images && detail.images.length > 0 && (
            <View style={styles.imageGrid}>
              {detail.images.map((img, i) => (
                <TouchableOpacity key={i} style={[styles.imageGridItem, isTablet && { width: isLandscape ? '22%' : '31%' }]} activeOpacity={0.8} onPress={() => openImage(img.image, img.label)}>
                  <View style={[styles.gridImageWrapper, img.fullHeight && { padding: 0 }, isLanternProduct && { height: isTablet ? 70 : 60 }]}>
                    <CachedImage source={img.image} style={[styles.gridImage, img.fullHeight && { height: '100%' }]} resizeMode={img.resizeMode || "contain"} />
                  </View>
                  <Text style={styles.gridLabel}>{img.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {/* Carousel images */}
          {detail.carouselImages && detail.carouselImages.length > 0 && (
            <CarouselWidget images={detail.carouselImages} />
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
                <TouchableOpacity key={i} style={[styles.swatchItem, isTablet && { width: isLandscape ? '15%' : '22%' }]} activeOpacity={0.8} onPress={() => openImage(swatch.image, swatch.label)}>
                  <View style={styles.swatchImageWrapper}>
                    <CachedImage source={swatch.image} style={styles.swatchImage} resizeMode="cover" />
                  </View>
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

  const renderGlass = () => (
    <View style={styles.detailsSection}>
      {product.glass?.map((glassOption, index) => (
        <View key={index} style={styles.detailCard}>
          <Text style={styles.detailTitle}>{glassOption.title}</Text>
          <Text style={styles.detailContent}>{glassOption.content}</Text>
          {glassOption.images && glassOption.images.length > 0 && (
            <View style={styles.imageGrid}>
              {glassOption.images.map((img, i) => (
                <TouchableOpacity key={i} style={[styles.imageGridItem, isTablet && { width: isLandscape ? '22%' : '31%' }]} activeOpacity={0.8} onPress={() => openImage(img.image, img.label)}>
                  <View style={[styles.gridImageWrapper, img.fullHeight && { padding: 0 }, isLanternProduct && { height: isTablet ? 70 : 60 }]}>
                    <CachedImage source={img.image} style={[styles.gridImage, img.fullHeight && { height: '100%' }]} resizeMode={img.resizeMode || "contain"} />
                  </View>
                  <Text style={styles.gridLabel}>{img.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ))}
      {(!product.glass || product.glass.length === 0) && (
         <View style={styles.emptyState}>
           <Text style={styles.emptyStateText}>No glass options available.</Text>
         </View>
      )}
      <View style={{ height: 100 }} />
    </View>
  );

  const renderStyles = () => (
    <View style={styles.detailsSection}>
      {product.styles?.map((styleGroup, index) => (
        <View key={index} style={styles.detailCard}>
          <Text style={styles.detailTitle}>{styleGroup.title}</Text>
          <Text style={styles.detailContent}>{styleGroup.content}</Text>
          {styleGroup.overviewImage && (
            <TouchableOpacity activeOpacity={0.8} onPress={() => openImage(styleGroup.overviewImage, styleGroup.title)}>
              <CachedImage source={styleGroup.overviewImage} style={styles.overviewImage} resizeMode={styleGroup.overviewImageMode || "contain"} />
            </TouchableOpacity>
          )}
          {styleGroup.images && styleGroup.images.length > 0 && (
            <View style={styles.imageGrid}>
              {styleGroup.images.map((img, i) => (
                <TouchableOpacity key={i} style={[styles.imageGridItem, isTablet && { width: isLandscape ? '22%' : '31%' }]} activeOpacity={0.8} onPress={() => openImage(img.image, img.label)}>
                  <View style={[styles.gridImageWrapper, img.fullHeight && { padding: 0 }, isLanternProduct && { height: isTablet ? 70 : 60 }]}>
                    <CachedImage source={img.image} style={[styles.gridImage, img.fullHeight && { height: '100%' }]} resizeMode={img.resizeMode || "contain"} />
                  </View>
                  <Text style={styles.gridLabel}>{img.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {styleGroup.carouselImages && styleGroup.carouselImages.length > 0 && (
            <CarouselWidget images={styleGroup.carouselImages} />
          )}
        </View>
      ))}
      <View style={{ height: 100 }} />
    </View>
  );

  const renderHardware = () => (
    <View style={styles.detailsSection}>
      {product.hardware?.map((hardwareGroup, index) => (
        <View key={index} style={styles.detailCard}>
          <Text style={styles.detailTitle}>{hardwareGroup.title}</Text>
          <Text style={styles.detailContent}>{hardwareGroup.content}</Text>
          {hardwareGroup.images && hardwareGroup.images.length > 0 && (
            <View style={styles.imageGrid}>
              {hardwareGroup.images.map((img, i) => (
                <TouchableOpacity key={i} style={[styles.imageGridItem, isTablet && { width: isLandscape ? '22%' : '31%' }]} activeOpacity={0.8} onPress={() => openImage(img.image, img.label)}>
                  <View style={[styles.gridImageWrapper, img.fullHeight && { padding: 0 }, isLanternProduct && { height: isTablet ? 70 : 60 }]}>
                    <CachedImage source={img.image} style={[styles.gridImage, img.fullHeight && { height: '100%' }]} resizeMode={img.resizeMode || "contain"} />
                  </View>
                  <Text style={styles.gridLabel}>{img.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ))}
      <View style={{ height: 100 }} />
    </View>
  );

  const renderExtras = () => (
    <View style={styles.detailsSection}>
      <View style={isLandscape ? { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' } : null}>
        {product.extras?.map((extra, index) => (
          <View key={index} style={[styles.detailCard, isLandscape && { width: '48%' }]}>
            <Text style={styles.detailTitle}>{extra.title}</Text>
            {extra.image && (
              <TouchableOpacity activeOpacity={0.8} onPress={() => openImage(extra.image, extra.title)}>
                <CachedImage source={extra.image} style={styles.extraImage} resizeMode="cover" />
              </TouchableOpacity>
            )}
            <Text style={styles.detailContent}>{extra.content}</Text>
          </View>
        ))}
      </View>
      {(!product.extras || product.extras.length === 0) && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No extras available.</Text>
        </View>
      )}
      <View style={{ height: 100 }} />
    </View>
  );
  const renderBrochure = () => (
    <View style={styles.detailsSection}>
      {brochuresLoading ? (
        <View style={styles.brochureLoadingContainer}>
          <ActivityIndicator size="large" color="#E5040A" />
        </View>
      ) : brochures.length > 0 ? (
        <View style={brochures.length > 1 && (!isTablet || isLandscape) ? styles.brochureGrid : null}>
          {brochures.map((brochure, index) => (
            <TouchableOpacity
              key={brochure.id || index}
              style={[styles.brochureCard, brochures.length > 1 && (!isTablet || isLandscape) && styles.brochureCardHalf]}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('PDfViewer', { url: brochure.link })}
            >
              {/* Brochure Cover Image */}
              <View style={[styles.brochureCoverWrapper, isTablet && styles.brochureCoverWrapperTablet]}>
                <CachedImage
                  source={{ uri: brochure.image }}
                  style={styles.brochureCoverImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.6)']}
                  style={styles.brochureCoverGradient}
                />
              </View>

              {/* Brochure Info — stacked vertically */}
              <View style={styles.brochureInfoColumn}>
                <Text style={styles.brochureCardTitle} numberOfLines={2}>{brochure.title}</Text>
                <Text style={styles.brochureCardCategory}>{brochure.category || 'Brochure'}</Text>
                <View style={styles.brochureViewBtn}>
                  <Feather name="book-open" size={14} color="#fff" />
                  <Text style={styles.brochureViewBtnText}>View Brochure</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No brochures available.</Text>
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
      case 'Styles':
        return renderStyles();
      case 'Hardware':
        return renderHardware();
      case 'Colours':
        return renderColours();
      case 'Glass':
        return renderGlass();
      case 'Extras':
        return renderExtras();
      case 'Brochure':
        return renderBrochure();
      default:
        return renderOverview();
    }
  };

  const renderLightbox = () => (
    <Modal
      visible={isViewerVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsViewerVisible(false)}
    >
      <ImageViewer
        imageUrls={viewerImages}
        index={viewerIndex}
        enableSwipeDown={true}
        onCancel={() => setIsViewerVisible(false)}
        onSwipeDown={() => setIsViewerVisible(false)}
        saveToLocalByLongPress={false}
        backgroundColor="rgba(0,0,0,0.95)"
        renderIndicator={(currentIndex, allSize) => {
          if (allSize <= 1) return null;
          return (
            <View style={styles.indicator}>
              <Text style={styles.indicatorText}>
                {currentIndex} / {allSize}
              </Text>
            </View>
          );
        }}
        renderHeader={() => (
          <TouchableOpacity
            onPress={() => setIsViewerVisible(false)}
            style={styles.closeButton}
          >
            <AntDesign name="close" size={22} color="#fff" />
          </TouchableOpacity>
        )}
      />
    </Modal>
  );

  const renderDesignerPromo = () => (
    <View style={styles.promoWrapper}>
      <TouchableOpacity 
        style={[styles.designerPromoContainer, { marginHorizontal: 0, marginTop: (isTablet && !isLandscape) ? 30 : 10, marginBottom: 20, height: isTablet ? 200 : 220 }]}
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
            <Text style={[styles.designerPromoTitle, isTablet && { fontSize: 21, lineHeight: 26, marginTop: 10 }]}>Design Your{'\n'}Dream Door</Text>
            <Text style={[styles.designerPromoDescription, isTablet && { fontSize: 13, lineHeight: 18, marginBottom: 16 }]}>
              Create your perfect{'\n'}custom door in minutes.
            </Text>
            <View style={[styles.designerPromoButtonWrapper, isTablet && { marginTop: 0 }]}>
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
          <Image 
            source={require('../assets/doors/composite-doors/exploded-door.png')} 
            style={[
              styles.designerPromoImage,
              (isTablet && !isLandscape) && { height: '100%', width: 170, right: -15, bottom: -5 }
            ]} 
            resizeMode="contain" 
          />
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderTabletHeroAndCTAs = () => (
    <View style={[styles.leftPaneTablet, { width: isLandscape ? '36%' : '42%' }]}>
      
      {/* Hero Image (Top) */}
      <CachedImage 
        source={typeof product.heroImage === 'string' ? { uri: product.heroImage } : product.heroImage} 
        style={[
          styles.tabletHeroImage,
          !isWindowProduct && { height: isLandscape ? 360 : 480 }
        ]} 
        resizeMode="cover"
      />

      {/* Door Designer Promo (Middle - Tablets Only) */}
      {isCompositeDoor && renderDesignerPromo()}

      {/* AI Visualiser Promo (Middle) */}
      {isWindowProduct && (
        <TouchableOpacity 
          style={[styles.aiPromoContainer]}
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
      )}

      <View style={styles.tabletCtaWrapper}>
        {isCompositeDoor && (
          <TouchableOpacity 
            style={[styles.ctaButton, styles.ctaButtonSecondary, { flex: 0, width: '100%', marginBottom: 12 }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Designer')} 
          >
            <Feather name="sliders" size={18} color="#111" style={{marginRight: 6}} />
            <Text style={styles.ctaTextSecondary}>Design Yours</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity 
          style={[styles.ctaButton, { flex: 0, width: '100%' }]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('ProductEnquiry', { product })} 
        >
          <Text style={styles.ctaText}>Enquire Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={[styles.container, isTablet && styles.tabletSplitContainer]}>
        
        {isTablet && renderTabletHeroAndCTAs()}

        <View style={isTablet ? [styles.rightPaneTablet, { width: isLandscape ? '64%' : '58%' }] : styles.container}>
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
          <ScrollView 
            ref={scrollViewRef}
            style={styles.scrollView} 
            showsVerticalScrollIndicator={false}
          >
            {renderContent()}
          </ScrollView>

          {/* Fixed CTA button (Mobile Only) */}
          {!isTablet && (
            <View style={styles.ctaContainer}>
              {isCompositeDoor && (
                <TouchableOpacity 
                  style={[styles.ctaButton, styles.ctaButtonSecondary]}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('Designer')} 
                >
                  <Feather name="sliders" size={18} color="#111" style={{marginRight: 6}} />
                  <Text style={styles.ctaTextSecondary}>Design Yours</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity 
                style={styles.ctaButton}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('ProductEnquiry', { product })} 
              >
                <Text style={styles.ctaText}>Enquire Now</Text>
              </TouchableOpacity>
            </View>
          )}

        </View>

        {renderLightbox()}

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
  tabletSplitContainer: {
    flexDirection: 'row',
  },
  leftPaneTablet: {
    height: '100%',
    padding: 20,
    backgroundColor: '#F9FAFC',
    borderRightWidth: 1,
    borderRightColor: '#EAECF0',
  },
  rightPaneTablet: {
    height: '100%',
    backgroundColor: '#fff',
  },
  tabletHeroImage: {
    width: '100%',
    height: 320,
    borderRadius: 24,
    marginBottom: 20,
  },
  tabletCtaWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  aiPromoContainer: {
    position: 'relative',
    height: 190,
    zIndex: 10,
    marginBottom: 20,
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
    width: '65%', 
    justifyContent: 'center', 
  },
  aiPromoTitle: {
    fontFamily: 'RB',
    fontSize: 20,
    lineHeight: 24,
    color: '#FFFFFF',
    marginBottom: 6, 
  },
  aiPromoDescription: {
    fontFamily: 'RM',
    fontSize: 12,
    lineHeight: 16,
    color: '#D4D4D8',
    marginBottom: 14, 
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
    borderRadius: 18,
    zIndex: 2,
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.3)',
  },
  aiPromoButtonText: {
    fontFamily: 'RB',
    fontSize: 13,
    color: '#FFFFFF',
  },
  aiPromoImage: {
    position: 'absolute',
    right: -15, 
    bottom: -5,  
    width: '50%', 
    height: '105%', 
    zIndex: 1,
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
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    marginBottom: 20,
  },
  tabScrollContent: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 28,
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
    flexDirection: 'row',
    gap: 12,
  },
  ctaButton: {
    flex: 1,
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
    fontSize: 16,
    fontFamily: 'RB',
  },
  ctaButtonSecondary: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowOpacity: 0,
    elevation: 0,
    flexDirection: 'row',
  },
  ctaTextSecondary: {
    color: '#111',
    fontSize: 16,
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
    marginBottom: 12,
  },
  gridImageWrapper: {
    width: '100%',
    height: 140,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAECF0',
    overflow: 'hidden',
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridImage: {
    width: '100%',
    height: '90%',
  },
  gridLabel: {
    fontSize: 13,
    fontFamily: 'RM',
    color: '#374151',
    textAlign: 'center',
  },
  // Carousel for styles
  carouselContainer: {
    paddingVertical: 14,
    paddingRight: 20, // To avoid getting cut off entirely at the very end
  },
  carouselItem: {
    width: 220,
    marginRight: 20,
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    height: 380,
  },
  carouselLabel: {
    paddingTop: 16,
    fontSize: 16,
    fontFamily: 'RB',
    color: '#374151',
    textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 16,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.15)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CE0000',
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
  swatchImageWrapper: {
    width: '100%',
    height: 95,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 6,
  },
  swatchImage: {
    width: '100%',
    height: '100%',
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
  // Designer Promo styles imported from Dashboard
  designerPromoContainer: {
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
    fontFamily: 'RB',
    fontSize: 24,
    lineHeight: 30,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  designerPromoDescription: {
    fontFamily: 'RM',
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
    color: '#fff',
    fontFamily: 'RB',
    fontSize: 13,
  },
  designerPromoImage: {
    position: 'absolute',
    right: -20,
    bottom: -15, /* Tucked slightly down to use mask */
    height: '115%',
    width: 200,
    zIndex: 1,
  },
  // Brochure Tab Styles
  brochureLoadingContainer: {
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brochureCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  brochureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  brochureCardHalf: {
    width: '48%',
  },
  brochureCoverWrapper: {
    width: '100%',
    height: 260,
    position: 'relative',
  },
  brochureCoverWrapperTablet: {
    height: 340,
  },
  brochureCoverImage: {
    width: '100%',
    height: '100%',
  },
  brochureCoverGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  brochureInfoColumn: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 14,
    alignItems: 'center',
  },
  brochureCardTitle: {
    fontFamily: 'RB',
    fontSize: 15,
    color: '#111',
    marginBottom: 2,
    textAlign: 'center',
  },
  brochureCardCategory: {
    fontFamily: 'RM',
    fontSize: 11,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    textAlign: 'center',
  },
  brochureViewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5040A',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#E5040A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    gap: 6,
  },
  brochureViewBtnText: {
    fontFamily: 'RB',
    fontSize: 13,
    color: '#fff',
  },
});
