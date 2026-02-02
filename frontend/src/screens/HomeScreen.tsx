import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ImageBackground,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList, User } from 'src/types/type';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2d5a3d" />
      </View>
    );
  }

  return (
    <ImageBackground
  source={require('../../assets/7.png')}
  style={styles.background}
  resizeMode="cover"
>
  {/* Header */}
  <View style={styles.header}>
    <Text style={styles.logoText}>Biolens</Text>
    <Image
      source={require('../../assets/8.png')}
      style={styles.profileIcon}
    />
  </View>

  {/* 🔥 WELCOME BANNER */}
  <View style={styles.banner}>
    <Text style={styles.bannerText}>
      Welcome to BIOLENS!
    </Text>
  </View>

  {/* Main content */}
  <View style={styles.content}>
    <TouchableOpacity
      style={styles.uploadButton}
      onPress={() => navigation.navigate('Login')}
      activeOpacity={0.8}
    >
      <Text style={styles.uploadButtonText}>Go to Login</Text>
    </TouchableOpacity>
  </View>
</ImageBackground>

  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40, // adjust for safe area
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  profileIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   // paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 100,
    color: '#2d5a3d',
    //marginBottom: 24,
    textAlign: 'center',
    marginTop:20,
    fontWeight: 'bold',
  },
  uploadButton: {
    backgroundColor: '#2d5a3d',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  banner: {
  marginTop: 20,
  marginHorizontal: 16,
  paddingVertical: 18,
  paddingHorizontal: 20,
  //backgroundColor: 'rgba(0, 0, 0, 0.45)', // banner overlay
  borderRadius: 14,
  alignItems: 'center',
},

bannerText: {
  fontSize: 90,
  fontWeight: '800',
  color: '#2d5a3d',
  textAlign: 'center',
  letterSpacing: 1,
},

});

