// import { useFocusEffect } from '@react-navigation/native';
// import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
// import { useCallback, useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   ScrollView,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { RootStackParamList } from '../types/type';

// type ProfileScreenProps = BottomTabScreenProps<RootStackParamList, 'Profile'> & {
//   setIsAuthenticated: (value: boolean) => void;
// };

// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// export default function ProfileScreen({ navigation, setIsAuthenticated }: ProfileScreenProps) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useFocusEffect(
//     useCallback(() => {
//       loadUserProfile();
//     }, [])
//   );

//   const loadUserProfile = async () => {
//     try {
//       setLoading(true);
//       const userData = await AsyncStorage.getItem('user');
//       if (userData) {
//         setUser(JSON.parse(userData));
//       }
//     } catch (error) {
//       console.error('Error loading user profile:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     Alert.alert('Logout', 'Are you sure you want to logout?', [
//       {
//         text: 'Cancel',
//         style: 'cancel',
//       },
//       {
//         text: 'Logout',
//         style: 'destructive',
//         onPress: async () => {
//           try {
//             await AsyncStorage.removeItem('userToken');
//             await AsyncStorage.removeItem('user');
//             setIsAuthenticated(false);
//             navigation.reset({
//               index: 0,
//               routes: [{ name: 'Login' }],
//             });
//           } catch (error) {
//             Alert.alert('Error', 'Failed to logout');
//           }
//         },
//       },
//     ]);
//   };

//   if (loading) {
//     return (
//       <View style={styles.centerContainer}>
//         <ActivityIndicator size="large" color="#2d5a3d" />
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Profile</Text>
//       </View>

//       {/* User Info Card */}
//       <View style={styles.userCard}>
//         <View style={styles.avatar}>
//           <Text style={styles.avatarText}>
//             {user?.name?.charAt(0).toUpperCase() || 'U'}
//           </Text>
//         </View>
//         <View style={styles.userInfo}>
//           <Text style={styles.userName}>{user?.name || 'User'}</Text>
//           <Text style={styles.userEmail}>{user?.email || 'email@example.com'}</Text>
//         </View>
//       </View>

//       {/* Account Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Account</Text>
//         <View style={styles.sectionContent}>
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Name</Text>
//             <Text style={styles.infoValue}>{user?.name || 'N/A'}</Text>
//           </View>
//           <View style={styles.divider} />
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Email</Text>
//             <Text style={styles.infoValue}>{user?.email || 'N/A'}</Text>
//           </View>
//           <View style={styles.divider} />
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>User ID</Text>
//             <Text style={styles.infoValue}>{user?.id?.substring(0, 12) || 'N/A'}...</Text>
//           </View>
//         </View>
//       </View>

//       {/* App Info Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>About BioLens</Text>
//         <View style={styles.sectionContent}>
//           <View style={styles.aboutItem}>
//             <Text style={styles.aboutLabel}>Version</Text>
//             <Text style={styles.aboutValue}>1.0.0</Text>
//           </View>
//           <View style={styles.divider} />
//           <View style={styles.aboutItem}>
//             <Text style={styles.aboutLabel}>Application</Text>
//             <Text style={styles.aboutValue}>Diatom Detection & Classification</Text>
//           </View>
//           <View style={styles.divider} />
//           <View style={styles.aboutItem}>
//             <Text style={styles.aboutLabel}>Purpose</Text>
//             <Text style={styles.aboutValue}>Research-grade microscopic analysis</Text>
//           </View>
//         </View>
//       </View>

//       {/* Features Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Features</Text>
//         <View style={styles.featureList}>
//           <View style={styles.featureItem}>
//             <Text style={styles.featureIcon}>🔬</Text>
//             <Text style={styles.featureText}>AI-powered diatom classification</Text>
//           </View>
//           <View style={styles.featureItem}>
//             <Text style={styles.featureIcon}>📊</Text>
//             <Text style={styles.featureText}>Environmental significance data</Text>
//           </View>
//           <View style={styles.featureItem}>
//             <Text style={styles.featureIcon}>📱</Text>
//             <Text style={styles.featureText}>Mobile-first design</Text>
//           </View>
//           <View style={styles.featureItem}>
//             <Text style={styles.featureIcon}>💾</Text>
//             <Text style={styles.featureText}>Classification history tracking</Text>
//           </View>
//         </View>
//       </View>

//       {/* Logout Button */}
//       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//         <Text style={styles.logoutButtonText}>Logout</Text>
//       </TouchableOpacity>

//       {/* Footer */}
//       <View style={styles.footer}>
//         <Text style={styles.footerText}>BioLens © 2024</Text>
//         <Text style={styles.footerSubtext}>Research-grade diatom analysis</Text>
//       </View>
//     </ScrollView>
//   );
// }
import { useFocusEffect } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../types/type';

type ProfileScreenProps = BottomTabScreenProps<RootStackParamList, 'Profile'> & {
  setIsAuthenticated: (value: boolean) => void;
};

interface User {
  id: string;
  name: string;
  email: string;
}

export default function ProfileScreen({ setIsAuthenticated }: ProfileScreenProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadUserProfile();
    }, [])
  );

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
     console.log("Logout pressed");

  Alert.alert('Logout', 'Are you sure you want to logout?', [
    { text: 'Cancel', style: 'cancel' },
    {
      text: 'Logout',
      style: 'destructive',
      onPress: async () => {
        try {
           console.log("Logout confirmed"); // Debug log
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('user');
          setIsAuthenticated(false); // App.tsx swaps to AuthNavigator → Login
        } catch (error) {
          Alert.alert('Error', 'Failed to logout');
        }
      },
    },
  ]);
};


  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2d5a3d" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      {/* User Info Card */}
      <View style={styles.userCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'email@example.com'}</Text>
        </View>
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.sectionContent}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>{user?.name || 'N/A'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user?.email || 'N/A'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>User ID</Text>
            <Text style={styles.infoValue}>{user?.id?.substring(0, 12) || 'N/A'}...</Text>
          </View>
        </View>
      </View>

      {/* App Info Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About BioLens</Text>
        <View style={styles.sectionContent}>
          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Version</Text>
            <Text style={styles.aboutValue}>1.0.0</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Application</Text>
            <Text style={styles.aboutValue}>Diatom Detection & Classification</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Purpose</Text>
            <Text style={styles.aboutValue}>Research-grade microscopic analysis</Text>
          </View>
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🔬</Text>
            <Text style={styles.featureText}>AI-powered diatom classification</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📊</Text>
            <Text style={styles.featureText}>Environmental significance data</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📱</Text>
            <Text style={styles.featureText}>Mobile-first design</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>💾</Text>
            <Text style={styles.featureText}>Classification history tracking</Text>
          </View>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>BioLens © 2024</Text>
        <Text style={styles.footerSubtext}>Research-grade diatom analysis</Text>
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2d5a3d',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2d5a3d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  aboutItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  aboutLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  aboutValue: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  featureList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 12,
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIcon: {
    fontSize: 20,
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#999',
  },
});

    // import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
// import { CompositeNavigationProp } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { useFocusEffect } from '@react-navigation/native';
// import { useCallback, useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   ScrollView,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AppNavigatorParamList } from '@navigation/AppNavigator';

// type ProfileScreenNavigationProp = CompositeNavigationProp<
//   BottomTabNavigationProp<AppNavigatorParamList, 'Profile'>,
//   StackNavigationProp<AppNavigatorParamList>
// >;

// type Props = {
//   navigation: ProfileScreenNavigationProp;
//   setIsAuthenticated: (value: boolean) => void;
// };

// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// export default function ProfileScreen({ navigation, setIsAuthenticated }: Props) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useFocusEffect(
//     useCallback(() => {
//       loadUserProfile();
//     }, [])
//   );

//   const loadUserProfile = async () => {
//     try {
//       setLoading(true);
//       const userData = await AsyncStorage.getItem('user');
//       if (userData) {
//         setUser(JSON.parse(userData));
//       }
//     } catch (error) {
//       console.error('Error loading user profile:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//   Alert.alert('Logout', 'Are you sure you want to logout?', [
//     {
//       text: 'Cancel',
//       onPress: () => {},
//       style: 'cancel',
//     },
//     {
//       text: 'Logout',
//       onPress: async () => {
//         try {
//           await AsyncStorage.removeItem('userToken');
//           await AsyncStorage.removeItem('user');
//           setIsAuthenticated(false);
//           navigation.reset({
//             index: 0,
//             routes: [{ name: 'Login' }],
//           }); // ✅ force navigation to Login screen
//         } catch (error) {
//           Alert.alert('Error', 'Failed to logout');
//         }
//       },
//       style: 'destructive',
//     },
//   ]);
// };


//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Profile</Text>
//       </View>

//       {/* User Info Card */}
//       <View style={styles.userCard}>
//         <View style={styles.avatar}>
//           <Text style={styles.avatarText}>
//             {user?.name?.charAt(0).toUpperCase() || 'U'}
//           </Text>
//         </View>
//         <View style={styles.userInfo}>
//           <Text style={styles.userName}>{user?.name || 'User'}</Text>
//           <Text style={styles.userEmail}>{user?.email || 'email@example.com'}</Text>
//         </View>
//       </View>

//       {/* Account Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Account</Text>
//         <View style={styles.sectionContent}>
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Name</Text>
//             <Text style={styles.infoValue}>{user?.name || 'N/A'}</Text>
//           </View>
//           <View style={styles.divider} />
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Email</Text>
//             <Text style={styles.infoValue}>{user?.email || 'N/A'}</Text>
//           </View>
//           <View style={styles.divider} />
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>User ID</Text>
//             <Text style={styles.infoValue}>{user?.id?.substring(0, 12) || 'N/A'}...</Text>
//           </View>
//         </View>
//       </View>

//       {/* App Info Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>About BioLens</Text>
//         <View style={styles.sectionContent}>
//           <View style={styles.aboutItem}>
//             <Text style={styles.aboutLabel}>Version</Text>
//             <Text style={styles.aboutValue}>1.0.0</Text>
//           </View>
//           <View style={styles.divider} />
//           <View style={styles.aboutItem}>
//             <Text style={styles.aboutLabel}>Application</Text>
//             <Text style={styles.aboutValue}>Diatom Detection & Classification</Text>
//           </View>
//           <View style={styles.divider} />
//           <View style={styles.aboutItem}>
//             <Text style={styles.aboutLabel}>Purpose</Text>
//             <Text style={styles.aboutValue}>Research-grade microscopic analysis</Text>
//           </View>
//         </View>
//       </View>

//       {/* Features Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Features</Text>
//         <View style={styles.featureList}>
//           <View style={styles.featureItem}>
//             <Text style={styles.featureIcon}>🔬</Text>
//             <Text style={styles.featureText}>AI-powered diatom classification</Text>
//           </View>
//           <View style={styles.featureItem}>
//             <Text style={styles.featureIcon}>📊</Text>
//             <Text style={styles.featureText}>Environmental significance data</Text>
//           </View>
//           <View style={styles.featureItem}>
//             <Text style={styles.featureIcon}>📱</Text>
//             <Text style={styles.featureText}>Mobile-first design</Text>
//           </View>
//           <View style={styles.featureItem}>
//             <Text style={styles.featureIcon}>💾</Text>
//             <Text style={styles.featureText}>Classification history tracking</Text>
//           </View>
//         </View>
//       </View>

//       {/* Logout Button */}
//       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//         <Text style={styles.logoutButtonText}>Logout</Text>
//       </TouchableOpacity>

//       {/* Footer */}
//       <View style={styles.footer}>
//         <Text style={styles.footerText}>BioLens © 2024</Text>
//         <Text style={styles.footerSubtext}>Research-grade diatom analysis</Text>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   contentContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 20,
//   },
//   centerContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f8f9fa',
//   },
//   header: {
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#1a1a1a',
//   },
//   userCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 20,
//     marginBottom: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 16,
//     borderLeftWidth: 4,
//     borderLeftColor: '#2d5a3d',
//   },
//   avatar: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#2d5a3d',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   avatarText: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#fff',
//   },
//   userInfo: {
//     flex: 1,
//   },
//   userName: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1a1a1a',
//     marginBottom: 4,
//   },
//   userEmail: {
//     fontSize: 13,
//     color: '#666',
//   },
//   section: {
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1a1a1a',
//     marginBottom: 12,
//   },
//   sectionContent: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   infoRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   infoLabel: {
//     fontSize: 14,
//     color: '#666',
//     fontWeight: '500',
//   },
//   infoValue: {
//     fontSize: 14,
//     color: '#1a1a1a',
//     fontWeight: '600',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#e0e0e0',
//   },
//   aboutItem: {
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   aboutLabel: {
//     fontSize: 13,
//     color: '#666',
//     marginBottom: 4,
//   },
//   aboutValue: {
//     fontSize: 14,
//     color: '#1a1a1a',
//     fontWeight: '500',
//   },
//   featureList: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     padding: 12,
//     gap: 12,
//   },
//   featureItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },
//   featureIcon: {
//     fontSize: 20,
//   },
//   featureText: {
//     flex: 1,
//     fontSize: 14,
//     color: '#555',
//   },
//   logoutButton: {
//     backgroundColor: '#d32f2f',
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   logoutButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   footer: {
//     alignItems: 'center',
//     paddingVertical: 20,
//     borderTopWidth: 1,
//     borderTopColor: '#e0e0e0',
//   },
//   footerText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1a1a1a',
//     marginBottom: 4,
//   },
//   footerSubtext: {
//     fontSize: 12,
//     color: '#999',
//   },
// });
