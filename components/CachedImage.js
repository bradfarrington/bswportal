/**
 * CachedImage.js
 *
 * Drop-in replacement for React Native's <Image> for remote URLs, backed by
 * expo-image's persistent memory + disk cache. Once an image is fetched it
 * survives app restarts, so screens that re-render the same catalog images
 * after a cold launch render instantly instead of re-downloading from Supabase.
 *
 * Preserves the previous API:
 *   <CachedImage source={{ uri: '...' }} style={...} resizeMode="cover" />
 */

import React from 'react';
import { Image as ExpoImage } from 'expo-image';

const RESIZE_TO_CONTENT_FIT = {
  cover: 'cover',
  contain: 'contain',
  stretch: 'fill',
  center: 'none',
  repeat: 'cover',
};

const CachedImage = ({
  source,
  style,
  resizeMode = 'cover',
  contentFit,
  transition = 200,
  placeholderColor = '#E8E8E8',
  ...rest
}) => {
  const fit = contentFit || RESIZE_TO_CONTENT_FIT[resizeMode] || 'cover';

  return (
    <ExpoImage
      source={source}
      style={[{ backgroundColor: placeholderColor }, style]}
      contentFit={fit}
      transition={transition}
      cachePolicy="memory-disk"
      recyclingKey={typeof source === 'object' && source?.uri ? source.uri : undefined}
      {...rest}
    />
  );
};

export default CachedImage;
