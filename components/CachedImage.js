/**
 * CachedImage.js
 * 
 * Enhanced drop-in replacement for React Native's <Image> for remote URLs.
 * Uses RN's built-in Image with:
 *   - Image.prefetch() for cache warming
 *   - Animated fade-in on load
 *   - Placeholder background while loading
 * 
 * No native modules required — works in Expo Go and existing dev builds.
 * 
 * Usage:
 *   <CachedImage source={{ uri: 'https://...' }} style={styles.img} />
 *   <CachedImage source={{ uri: 'https://...' }} resizeMode="cover" />
 */

import React, { useState, useRef, useEffect } from 'react';
import { Image, Animated, View, StyleSheet } from 'react-native';

// Global prefetch tracker — avoid duplicate prefetch calls
const prefetchedUrls = new Set();

const CachedImage = ({
  source,
  style,
  resizeMode = 'cover',
  transition = 300,
  placeholderColor = '#E8E8E8',
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;

  // Extract URI
  let uri = null;
  if (source && typeof source === 'object' && source.uri) {
    uri = source.uri;
  } else if (typeof source === 'string') {
    uri = source;
  }

  // Prefetch on mount (warms RN's URL cache)
  useEffect(() => {
    if (uri && !prefetchedUrls.has(uri)) {
      prefetchedUrls.add(uri);
      Image.prefetch(uri).catch(() => {});
    }
  }, [uri]);

  const handleLoad = () => {
    setLoaded(true);
    Animated.timing(opacity, {
      toValue: 1,
      duration: transition,
      useNativeDriver: true,
    }).start();
  };

  // For local require() images — pass through directly with no animation
  if (!uri) {
    return (
      <Image
        source={source}
        style={style}
        resizeMode={resizeMode}
        {...rest}
      />
    );
  }

  // Flatten style to extract dimensions for placeholder sizing
  const flatStyle = StyleSheet.flatten(style) || {};

  return (
    <View style={[{ overflow: 'hidden', backgroundColor: 'transparent' }, flatStyle]}>
      {/* Shimmer placeholder */}
      {!loaded && (
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: placeholderColor },
          ]}
        />
      )}
      {/* Actual image with fade-in */}
      <Animated.Image
        source={{ uri }}
        style={[StyleSheet.absoluteFill, { opacity }]}
        resizeMode={resizeMode}
        onLoad={handleLoad}
        {...rest}
      />
    </View>
  );
};

export default CachedImage;
