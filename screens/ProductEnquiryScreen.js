import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { supabase } from '../config/supabaseClient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── Auto-detect enquiry fields from product data ────────────────────────
function getEnquiryFields(product) {
  const fields = [];

  // 1. Frame styles (from details)
  const frameStyleDetail = product.details?.find(
    (d) => d.title.toLowerCase().includes('frame style')
  );
  if (frameStyleDetail?.images?.length > 0) {
    fields.push({
      key: 'frameStyle',
      label: 'Frame Style',
      options: frameStyleDetail.images.map((img) => img.label),
    });
  }

  // 2. Door / window styles
  if (product.styles?.length > 0) {
    product.styles.forEach((styleGroup) => {
      if (styleGroup.images?.length > 0) {
        fields.push({
          key: 'productStyle',
          label: 'Style',
          options: styleGroup.images.map((img) => img.label),
        });
      }
    });
  }

  // 3. Colours – flattened from all colour groups
  if (product.colours?.length > 0) {
    const allColours = [];
    product.colours.forEach((cg) => {
      cg.swatches?.forEach((s) => {
        if (!allColours.includes(s.label)) allColours.push(s.label);
      });
    });
    if (allColours.length > 0) {
      fields.push({
        key: 'colour',
        label: 'Colour',
        options: allColours,
      });
    }
  }

  // 4. Handle colours
  const handleOptions = [];
  if (product.hardware?.length > 0) {
    const handleGroup = product.hardware.find((h) =>
      h.title.toLowerCase().includes('handle')
    );
    handleGroup?.images?.forEach((img) => {
      if (!handleOptions.includes(img.label)) handleOptions.push(img.label);
    });
  } else if (product.details) {
    const handleDetail = product.details.find((d) =>
      d.title.toLowerCase().includes('standard handle')
    );
    handleDetail?.images?.forEach((img) => {
      if (!handleOptions.includes(img.label)) handleOptions.push(img.label);
    });
  }
  if (handleOptions.length > 0) {
    fields.push({ key: 'handleColour', label: 'Handle Colour', options: handleOptions });
  }

  // 5. Glass options
  if (product.glass?.length > 0) {
    const glassOptions = [];
    product.glass.forEach((gg) => {
      gg.images?.forEach((img) => {
        if (!glassOptions.includes(img.label)) glassOptions.push(img.label);
      });
    });
    if (glassOptions.length > 0) {
      fields.push({ key: 'glassType', label: 'Glass Type', options: glassOptions });
    }
  }

  // 6. Door-specific hardware (knockers, letterboxes)
  if (product.hardware) {
    const knockerGroup = product.hardware.find((h) =>
      h.title.toLowerCase().includes('knocker')
    );
    if (knockerGroup?.images?.length > 0) {
      fields.push({
        key: 'knocker',
        label: 'Knocker Style',
        options: knockerGroup.images.map((img) => img.label),
      });
    }
    const letterboxGroup = product.hardware.find((h) =>
      h.title.toLowerCase().includes('letterbox')
    );
    if (letterboxGroup?.images?.length > 0) {
      fields.push({
        key: 'letterbox',
        label: 'Letterbox Finish',
        options: letterboxGroup.images.map((img) => img.label),
      });
    }
  }

  return fields;
}

// ─── Upload a single image to Supabase Storage ──────────────────────────
// SETUP: Create a public bucket called "enquiry-images" in your Supabase
// dashboard with INSERT policy for the anon role.
async function uploadImageToSupabase(uri) {
  const fileName = `enquiries/${Date.now()}_${Math.random().toString(36).slice(2, 8)}.jpg`;
  
  // Read file as base64 string
  const base64Data = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  // Convert to Uint8Array (binary)
  const binaryString = atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const { data, error } = await supabase.storage
    .from('enquiry-images')
    .upload(fileName, bytes, { contentType: 'image/jpeg', cacheControl: '3600' });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from('enquiry-images')
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}

// ═════════════════════════════════════════════════════════════════════════
// Component
// ═════════════════════════════════════════════════════════════════════════
export default function ProductEnquiryScreen({ route, navigation }) {
  const { product } = route.params;
  const enquiryFields = getEnquiryFields(product);

  // ── Contact info ──
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // ── Dynamic selections (keyed by field.key) ──
  const [selections, setSelections] = useState({});

  // ── Extras ──
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [images, setImages] = useState([]); // array of { uri }
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // ── Auto-fill from saved contact data ──
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem('formData');
        if (json) {
          const saved = JSON.parse(json);
          if (saved.firstname) setName(saved.firstname);
          if (saved.email) setEmail(saved.email);
          if (saved.mobtel) setPhone(saved.mobtel);
        }
      } catch (_) {}
    })();
  }, []);

  // ── Helpers ──
  const selectChip = (fieldKey, value) => {
    setSelections((prev) => ({
      ...prev,
      [fieldKey]: prev[fieldKey] === value ? null : value,
    }));
  };

  const pickFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.6,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImages((prev) => [...prev, { uri: result.assets[0].uri }].slice(0, 5));
      }
    } catch (error) {
      console.error('Gallery picker error:', error?.message);
      Alert.alert('Error', 'Failed to open photo library.');
    }
  };



  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ── Submit ──
  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      Alert.alert('Missing Information', 'Please fill in your name, email, and phone number.');
      return;
    }

    setLoading(true);

    try {
      // Save contact data for future auto-fill
      await AsyncStorage.setItem(
        'formData',
        JSON.stringify({ firstname: name, email, mobtel: phone })
      );

      // Upload images to Supabase Storage
      let imageUrls = [];
      if (images.length > 0) {
        try {
          const uploadPromises = images.map((img) => uploadImageToSupabase(img.uri));
          imageUrls = await Promise.all(uploadPromises);
        } catch (uploadErr) {
          console.warn('Image upload failed:', uploadErr);
          // Continue without images — don't block the enquiry
        }
      }

      // Build preferences text
      const prefsLines = [];
      enquiryFields.forEach((field) => {
        const val = selections[field.key];
        if (val) prefsLines.push(`${field.label}: ${val}`);
      });
      const preferencesText = prefsLines.length > 0 ? prefsLines.join('\n') : 'None specified';

      // Build image links text (not used by Edge Function but kept for API for now)
      const imageLinksText =
        imageUrls.length > 0
          ? imageUrls.map((url, i) => `Photo ${i + 1}: ${url}`).join('\n')
          : 'No photos attached';

      // 1. Send email via Supabase Edge Function
      try {
        const { data, error } = await supabase.functions.invoke('send-product-enquiry', {
          body: {
            product_title: product.title,
            name: name,
            email: email,
            phone: phone,
            quantity: quantity,
            preferences: preferencesText,
            notes: notes || 'None',
            imageUrls: imageUrls,
          },
        });

        if (error) {
          console.warn('Edge Function returned an error:', error);
          throw error;
        }
      } catch (funcErr) {
        console.warn('Supabase function send failed:', funcErr);
        throw funcErr; // Re-throw to catch block to show alert
      }

      // 2. Submit to Ab Initio API
      try {
        await axios.post('https://webleads.abinitiosoftware.co.uk/api/LeadDetails', {
          AB_CUSTID: '6008198',
          AB_PWORD: 'WOSWl7utR32r',
          FIRSTSURNAME: name,
          EMAIL: email,
          MOBTEL: phone,
          PRODINTEREST1: product.title,
          QUOTETYPE: 'Web Lead',
        });
      } catch (apiErr) {
        console.warn('Ab Initio API failed:', apiErr);
      }

      setLoading(false);
      setIsSuccess(true);
    } catch (err) {
      setLoading(false);
      console.error('Enquiry submission error:', err);
      Alert.alert('Error', 'Something went wrong. Please try again or call us directly.');
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // Render
  // ═══════════════════════════════════════════════════════════════════════
  const renderChipPicker = (field) => (
    <View key={field.key} style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{field.label}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
      >
        {field.options.map((option) => {
          const selected = selections[field.key] === option;
          return (
            <TouchableOpacity
              key={option}
              style={[styles.chip, selected && styles.chipSelected]}
              onPress={() => selectChip(field.key, option)}
              activeOpacity={0.7}
            >
              <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={24} color="#111" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              Enquire Now
            </Text>
            <Text style={styles.headerSubtitle} numberOfLines={1}>
              {product.title}
            </Text>
          </View>
          <View style={{ width: 44 }} />
        </View>

        {isSuccess ? (
          <View style={styles.enquirySuccessContainer}>
            <View style={styles.successIconContainer}>
              <Feather name="check-circle" size={48} color="#059669" />
            </View>
            <Text style={styles.successTitle}>Enquiry Sent!</Text>
            <Text style={styles.successMessage}>
              Thanks for your enquiry. We will get back to you as soon as we can.
            </Text>
            <TouchableOpacity
              style={styles.successCloseButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.successCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* ── Product badge ── */}
              <View style={styles.productBadge}>
                <Image
                  source={
                    typeof product.heroImage === 'string'
                      ? { uri: product.heroImage }
                      : product.heroImage
                  }
                  style={styles.productBadgeImage}
                />
                <View style={styles.productBadgeInfo}>
                  <Text style={styles.productBadgeName}>{product.title}</Text>
                  <Text style={styles.productBadgeTagline} numberOfLines={2}>
                    {product.tagline || 'Premium Quality Products'}
                  </Text>
                </View>
              </View>

              {/* ── Contact details ── */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionIconWrap}>
                    <Feather name="user" size={16} color="#E5040A" />
                  </View>
                  <Text style={styles.sectionTitle}>Your Details</Text>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Full Name</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g. John Smith"
                    placeholderTextColor="#B0B5BF"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email Address</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g. john@example.com"
                    placeholderTextColor="#B0B5BF"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Phone Number</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g. 07123 456789"
                    placeholderTextColor="#B0B5BF"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              {/* ── Product-specific preferences ── */}
              {enquiryFields.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionIconWrap}>
                      <Ionicons name="options-outline" size={16} color="#E5040A" />
                    </View>
                    <Text style={styles.sectionTitle}>Preferences</Text>
                  </View>
                  {enquiryFields.map((field) => renderChipPicker(field))}
                </View>
              )}

              {/* ── Quantity ── */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionIconWrap}>
                    <Feather name="hash" size={16} color="#E5040A" />
                  </View>
                  <Text style={styles.sectionTitle}>Quantity</Text>
                </View>
                <View style={styles.quantityRow}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Feather name="minus" size={20} color="#111" />
                  </TouchableOpacity>
                  <Text style={styles.quantityValue}>{quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => setQuantity(quantity + 1)}
                  >
                    <Feather name="plus" size={20} color="#111" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* ── Additional notes ── */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionIconWrap}>
                    <Feather name="edit-3" size={16} color="#E5040A" />
                  </View>
                  <Text style={styles.sectionTitle}>Additional Notes</Text>
                </View>
                <TextInput
                  style={styles.notesInput}
                  placeholder="Tell us about your project, specific requirements, dimensions, etc."
                  placeholderTextColor="#B0B5BF"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  value={notes}
                  onChangeText={setNotes}
                />
              </View>

              {/* ── Photo upload ── */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionIconWrap}>
                    <Feather name="camera" size={16} color="#E5040A" />
                  </View>
                  <Text style={styles.sectionTitle}>Photos of Your Property</Text>
                </View>
                <Text style={styles.photoHint}>
                  Upload photos of your home so we can provide a more accurate remote quote.
                </Text>

                {/* Photo thumbnails */}
                {images.length > 0 && (
                  <View style={styles.photoGrid}>
                    {images.map((img, index) => (
                      <View key={index} style={styles.photoThumbWrap}>
                        <Image source={{ uri: img.uri }} style={styles.photoThumb} />
                        <TouchableOpacity
                          style={styles.photoRemove}
                          onPress={() => removeImage(index)}
                        >
                          <Feather name="x" size={14} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}

                {/* Add Photo Button */}
                {images.length < 5 && (
                  <TouchableOpacity style={styles.addPhotoButton} onPress={pickFromGallery}>
                    <Feather name="plus" size={18} color="#e5040a" />
                    <Text style={styles.addPhotoText}>Add Photo</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Bottom spacing for button */}
              <View style={{ height: 120 }} />
            </ScrollView>

            {/* ── Fixed submit button ── */}
            <View style={styles.submitContainer}>
              {!loading ? (
                <TouchableOpacity
                  style={styles.submitButton}
                  activeOpacity={0.8}
                  onPress={handleSubmit}
                >
                  <Feather name="send" size={18} color="#fff" style={{ marginRight: 10 }} />
                  <Text style={styles.submitText}>Submit Enquiry</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.submitButton}>
                  <ActivityIndicator size="small" color="#fff" />
                  <Text style={[styles.submitText, { marginLeft: 10 }]}>Sending...</Text>
                </View>
              )}
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ═════════════════════════════════════════════════════════════════════════
// Styles
// ═════════════════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleWrap: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: 'RB',
    color: '#111',
  },
  headerSubtitle: {
    fontSize: 13,
    fontFamily: 'RM',
    color: '#E5040A',
    marginTop: 2,
  },
  // ── Product badge ──
  productBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 8,
    padding: 14,
    backgroundColor: '#F9FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  productBadgeImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
  },
  productBadgeInfo: {
    flex: 1,
    marginLeft: 14,
  },
  productBadgeName: {
    fontSize: 15,
    fontFamily: 'RB',
    color: '#111',
  },
  productBadgeTagline: {
    fontSize: 13,
    fontFamily: 'RM',
    color: '#6B7280',
    marginTop: 3,
  },
  // ── Sections ──
  section: {
    marginHorizontal: 20,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'RB',
    color: '#111',
  },
  // ── Inputs ──
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontFamily: 'RM',
    color: '#6B7280',
    marginBottom: 6,
    marginLeft: 4,
  },
  textInput: {
    backgroundColor: '#F9FAFC',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EAECF0',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    fontFamily: 'RM',
    color: '#111',
  },
  // ── Chip selectors ──
  fieldGroup: {
    marginBottom: 18,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: 'RM',
    color: '#374151',
    marginBottom: 10,
    marginLeft: 2,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 20,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  chipSelected: {
    backgroundColor: '#E5040A',
    borderColor: '#E5040A',
  },
  chipText: {
    fontSize: 13,
    fontFamily: 'RM',
    color: '#374151',
  },
  chipTextSelected: {
    color: '#fff',
    fontFamily: 'RB',
  },
  // ── Quantity ──
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#F9FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EAECF0',
    overflow: 'hidden',
  },
  quantityButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityValue: {
    fontSize: 18,
    fontFamily: 'RB',
    color: '#111',
    minWidth: 40,
    textAlign: 'center',
  },
  // ── Notes ──
  notesInput: {
    backgroundColor: '#F9FAFC',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EAECF0',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
    fontSize: 15,
    fontFamily: 'RM',
    color: '#111',
    minHeight: 110,
  },
  // ── Photos ──
  photoHint: {
    fontSize: 13,
    fontFamily: 'RM',
    color: '#9CA3AF',
    marginBottom: 14,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  photoThumbWrap: {
    width: (SCREEN_WIDTH - 40 - 30) / 4,
    height: (SCREEN_WIDTH - 40 - 30) / 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  photoThumb: {
    width: '100%',
    height: '100%',
  },
  photoRemove: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#FEE2E2', // light red background
    marginTop: 12,
  },
  addPhotoText: {
    color: '#e5040a',
    fontFamily: 'RSB',
    fontSize: 14,
    marginLeft: 8,
  },
  // ── Submit ──
  submitContainer: {
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
  submitButton: {
    backgroundColor: '#E5040A',
    borderRadius: 30,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E5040A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  submitText: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'RB',
  },
  scrollView: {
    flex: 1,
  },
  // ── Enquiry Success ──
  enquirySuccessContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 22,
    fontFamily: 'RB',
    color: '#111',
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 15,
    fontFamily: 'RM',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  successCloseButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 14,
  },
  successCloseText: {
    fontSize: 15,
    fontFamily: 'RB',
    color: '#374151',
  },
});
