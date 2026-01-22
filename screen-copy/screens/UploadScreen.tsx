import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { classificationService } from '../../frontend/src/services';
import { RootStackParamList } from '../../frontend/src/types/type';

type Props = NativeStackScreenProps<RootStackParamList, 'Upload'>;

export default function UploadScreen({ navigation }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const pickFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const base64 = await convertToBase64(result.assets[0].uri);
        setSelectedImage(base64);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image from gallery');
    }
  };

  const pickFromCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const base64 = await convertToBase64(result.assets[0].uri);
        setSelectedImage(base64);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to capture image from camera');
    }
  };

  const convertToBase64 = async (uri: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      fetch(uri)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = reader.result as string;
            resolve(base64.split(',')[1]);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
        .catch(reject);
    });
  };

  const handleClassify = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    setIsProcessing(true);
    try {
      const result = await classificationService.classify(selectedImage);

      if (result.success) {
        navigation.navigate('Result', { result: result.classification });
      } else {
        Alert.alert('Error', result.message || 'Classification failed');
      }
    } catch (error: any) {
      Alert.alert(
        'Classification Error',
        error.response?.data?.message || 'Failed to classify image'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Upload Image</Text>
        <Text style={styles.subtitle}>Select or capture a diatom image</Text>
      </View>

      <View style={styles.content}>
        {selectedImage ? (
          <View style={styles.previewContainer}>
            <Image
              source={{ uri: `data:image/jpeg;base64,${selectedImage.substring(0, 100)}` }}
              style={styles.preview}
            />
            <TouchableOpacity
              style={styles.changeButton}
              onPress={() => setSelectedImage(null)}
            >
              <Text style={styles.changeButtonText}>Change Image</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.placeholderContainer}>
            <MaterialCommunityIcons name="image" size={64} color="#ccc" />
            <Text style={styles.placeholderText}>No image selected</Text>
          </View>
        )}

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={pickFromGallery}
            disabled={isLoading || isProcessing}
          >
            <MaterialCommunityIcons name="image-multiple" size={24} color="#2d5a3d" />
            <Text style={styles.secondaryButtonText}>Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={pickFromCamera}
            disabled={isLoading || isProcessing}
          >
            <MaterialCommunityIcons name="camera" size={24} color="#2d5a3d" />
            <Text style={styles.secondaryButtonText}>Camera</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, styles.primaryButton, !selectedImage && styles.buttonDisabled]}
          onPress={handleClassify}
          disabled={!selectedImage || isProcessing}
        >
          {isProcessing ? (
            <>
              <ActivityIndicator color="#fff" />
              <Text style={styles.primaryButtonText}>Classifying...</Text>
            </>
          ) : (
            <>
              <MaterialCommunityIcons name="magnify" size={24} color="#fff" />
              <Text style={styles.primaryButtonText}>Classify</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Tips for best results:</Text>
          <Text style={styles.infoText}>• Clear, well-lit image{'\n'}• Focused microscopic view{'\n'}• Image in landscape mode</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#2d5a3d',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#d0d0d0',
    marginTop: 4,
  },
  content: {
    padding: 20,
  },
  previewContainer: {
    marginBottom: 20,
  },
  preview: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  changeButton: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  changeButtonText: {
    color: '#2d5a3d',
    fontSize: 14,
    fontWeight: '600',
  },
  placeholderContainer: {
    height: 300,
    borderRadius: 12,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#eee',
    borderStyle: 'dashed',
  },
  placeholderText: {
    marginTop: 12,
    color: '#999',
    fontSize: 14,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  button: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#f0f5f3',
    borderWidth: 2,
    borderColor: '#2d5a3d',
  },
  secondaryButtonText: {
    color: '#2d5a3d',
    fontSize: 14,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#2d5a3d',
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  infoBox: {
    backgroundColor: '#f0f5f3',
    borderRadius: 12,
    padding: 16,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d5a3d',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
  },
});
