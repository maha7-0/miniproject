import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { RootStackParamList, ApiResponse, ClassificationResult } from 'src/types/type';

type Props = NativeStackScreenProps<RootStackParamList, 'Upload'>;

const API_URL = 'http://localhost:5000/api';

export default function UploadScreen({ navigation }: Props) {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [classifying, setClassifying] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Camera permission is required to upload images');
      }
    })();
  }, []);

  const pickImage = async (source: 'camera' | 'gallery') => {
    try {
      setLoading(true);
      let result;

      if (source === 'camera') {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      }

      if (!result.canceled && result.assets[0]) {
        const uri = result.assets[0].uri;
        const base64 = await convertImageToBase64(uri);
        setImage(base64);
      }
    } catch {
      Alert.alert('Error', 'Failed to pick image');
    } finally {
      setLoading(false);
    }
  };

  const convertImageToBase64 = async (uri: string): Promise<string> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        resolve(base64.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleClassify = async () => {
    if (!image) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    setClassifying(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'Authentication token not found');
        return;
      }

      const response = await axios.post<ApiResponse<{ classification: ClassificationResult }>>(
        `${API_URL}/classification/classify`,
        { imageBase64: image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

 if (response.data.success && response.data.data?.classification) {
  navigation.navigate('Result', {
    result: response.data.data.classification,
  });
  setImage(null);


      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Classification failed. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setClassifying(false);
    }
  };

  const handleClear = () => {
    setImage(null);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Upload Microscopic Image</Text>
        <Text style={styles.subtitle}>Capture or select a diatom specimen image</Text>
      </View>
      

    <View style={styles.previewContainer}>
        {image ? (
          <Image
            source={{ uri: `data:image/jpeg;base64,${image}` }}
            style={styles.preview}
          />
        ) : (
           <View style={styles.placeholderPreview}>
          //   <Text style={styles.placeholderText}>📷</Text>
          //   <Text style={styles.placeholderLabel}>No image selected</Text>
           </View>
        )}
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, styles.cameraButton]}
          onPress={() => pickImage('camera')}
          disabled={loading || classifying}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>📷 Take Photo</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.galleryButton]}
          onPress={() => pickImage('gallery')}
          disabled={loading || classifying}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>🖼️ Choose from Gallery</Text>
          )}
        </TouchableOpacity>
      </View>

      {image && (
        <View style={styles.actionGroup}>
          <TouchableOpacity
            style={[styles.actionButton, styles.classifyButton]}
            onPress={handleClassify}
            disabled={classifying}
          >
            {classifying ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.actionButtonText}>Classify Image</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.clearButton]}
            onPress={handleClear}
            disabled={classifying}
          >
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Image Requirements</Text>
        <View style={styles.requirementList}>
          <Text style={styles.requirement}>• High-quality microscopic image</Text>
          <Text style={styles.requirement}>• Clear diatom specimen visible</Text>
          <Text style={styles.requirement}>• Proper lighting and focus</Text>
          <Text style={styles.requirement}>• Square format recommended</Text>
        </View>
      </View>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  previewContainer: {
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  preview: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  placeholderPreview: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  placeholderText: {
    fontSize: 48,
    marginBottom: 8,
  },
  placeholderLabel: {
    fontSize: 14,
    color: '#999',
  },
  buttonGroup: {
    gap: 12,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cameraButton: {
    backgroundColor: '#2d5a3d',
  },
  galleryButton: {
    backgroundColor: '#4a7c5e',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  actionGroup: {
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  classifyButton: {
    backgroundColor: '#2d5a3d',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: '#e0e0e0',
  },
  clearButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#e8f0eb',
    borderRadius: 12,
    padding: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d5a3d',
    marginBottom: 12,
  },
  requirementList: {
    gap: 8,
  },
  requirement: {
    fontSize: 13,
    color: '#555',
  },
});
