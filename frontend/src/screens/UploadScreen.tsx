import { Ionicons } from '@expo/vector-icons'; // Add this for the icon
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { ClassificationResult, RootStackParamList } from 'src/types/type';

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

      const response = await axios.post<{
        success: boolean;
        classification: ClassificationResult;
      }>(
        `${API_URL}/classification/classify`,
        { imageBase64: image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success && response.data.classification) {
        console.log('No token found');
        navigation.navigate('Result', {
          result: response.data.classification,
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
    <View style={styles.container1}>
  {/* Banner */}
<View style={styles.header}>
  <Text style={styles.title}>BioLens</Text>
  <Text style={styles.subtitle}>Upload & Classification</Text>

  {/* Profile button inside banner */}
  <TouchableOpacity 
    style={styles.profileButton}
    onPress={() => navigation.navigate('Profile')}
  >
    <Ionicons name="person-circle-outline" size={35} color="#fff" />
  </TouchableOpacity>

  {/* History button inside banner */}
  <TouchableOpacity 
    style={styles.historyButton}
    onPress={() => navigation.navigate('History')}
  >
    <Ionicons name="time-outline" size={32} color="#fff" />
  </TouchableOpacity>
</View>


  {/* Scrollable content below banner */}
  <ScrollView
    contentContainerStyle={styles.container}
    showsVerticalScrollIndicator={false}
  >
    <View style={styles.topImageWrapper}>
      <Image source={require('../../assets/output.jpeg')} style={styles.image} />
    </View>

    <Text style={styles.title}>Upload your image</Text>

    <TouchableOpacity 
      style={styles.uploadBtn} 
      onPress={() => pickImage('gallery')}
      disabled={loading || classifying}
    >
      <Text style={styles.uploadText}>Click to upload</Text>
    </TouchableOpacity>

    {image && (
      <View style={styles.previewContainer}>
        <TouchableOpacity style={styles.cancelBtn} onPress={() => setImage(null)}>
          <Text style={styles.cancelText}>✕</Text>
        </TouchableOpacity>
        <Image source={{ uri: `data:image/jpeg;base64,${image}` }} style={styles.preview} />
      </View>
    )}

    <TouchableOpacity 
      style={styles.predictCircle} 
      onPress={handleClassify}
      disabled={classifying}
    >
      <Text style={styles.predictText}>
        {classifying ? 'Processing...' : `Start\nPredicting`}
      </Text>
    </TouchableOpacity>
  </ScrollView>
</View>

//     <View style={styles.container1}>
     
//       <ScrollView
//         contentContainerStyle={styles.container}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.header}>
//   <Text style={styles.title}>BioLens</Text>
//   <Text style={styles.subtitle}>Upload & Classification</Text>

//   {/* Profile button inside header */}
//   <TouchableOpacity 
//     style={styles.profileButton}
//     onPress={() => navigation.navigate('Profile')}
//   >
//     <Ionicons name="person-circle-outline" size={35} color="#fff" />
//   </TouchableOpacity>
// </View>

//         {/* Curved Illustration */}
//         <View style={styles.topImageWrapper}>
//           <Image
//             source={require('../../assets/output.jpeg')}
//             style={styles.image}
//           />
//         </View>

//         <Text style={styles.title}>Upload your image</Text>

//         <TouchableOpacity 
//           style={styles.uploadBtn} 
//           onPress={() => pickImage('gallery')}
//           disabled={loading || classifying}
//         >
//           <Text style={styles.uploadText}>Click to upload</Text>
//         </TouchableOpacity>
//           {image && (
//           <View style={styles.previewContainer}>
//             <TouchableOpacity
//               style={styles.cancelBtn}
//               onPress={() => setImage(null)}
//             >
//               <Text style={styles.cancelText}>✕</Text>
//             </TouchableOpacity>

//             <Image 
//               source={{ uri: `data:image/jpeg;base64,${image}` }} 
//               style={styles.preview} 
//             />
//           </View>
//         )}

//         <TouchableOpacity 
//           style={styles.predictCircle} 
//           onPress={handleClassify}
//           disabled={classifying}
//         >
//           <Text style={styles.predictText}>
//             {classifying ? 'Processing...' : `Start\nPredicting`}
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
  );
}



const styles = StyleSheet.create({
  
  container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  paddingTop: 40,
  width: '100%',          // ✅ fill available width
  maxWidth: 700,          // ✅ cap width on desktop so it doesn’t get too wide
  alignSelf: 'center',    // ✅ center the whole block
},
uploadBtn: {
  backgroundColor: '#0b6e3b',
  paddingHorizontal: 20,
  paddingVertical: 12,
  borderRadius: 8,
  marginBottom: 20,
  width: '80%',           // ✅ expand button width
  alignItems: 'center',
},
preview: {
  width: 200,             // ✅ larger preview
  height: 200,
  borderRadius: 12,
  marginBottom: 20,
},
predictCircle: {
  width: 200,             // ✅ bigger circle
  height: 200,
  borderRadius: 100,
  backgroundColor: '#0b6e3b',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 12,
  borderColor: '#8fe0b0',
},

  previewContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  cancelBtn: {
    position: 'absolute',
    top: -8,
    right: -8,
    zIndex: 10,
    backgroundColor: '#000',
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  /* 🔥 Curved container */
  topImageWrapper: {
    width: 240,
    height: 240,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  
  
  uploadText: {
    color: '#fff',
    fontWeight: '600',
  },
  
  
  predictText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  container1: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Added this to handle the scrolling area separately
  scrollContent: {
    alignItems: 'center',
    paddingTop: 60, // Increased to make room for the profile icon
    paddingBottom: 40,
  },
  // --- STYLE FOR THE NEW BUTTON ---
  
  header: {
  paddingTop: 60,
  paddingBottom: 40,
  alignItems: 'center',
  backgroundColor: '#2d5a3d', // ✅ green banner
  position: 'relative',
},
title: {
  fontSize: 32,
  fontWeight: 'bold',
  color: '#fff',
},
subtitle: {
  fontSize: 14,
  color: '#d0d0d0',
  marginTop: 8,
},
profileButton: {
  position: 'absolute',
  top: 20,    // ✅ inside the banner
  right: 20,
},
historyButton: {
  position: 'absolute',
  top: 20,
  right: 70,   // ✅ places it to the left of the profile icon
},

});