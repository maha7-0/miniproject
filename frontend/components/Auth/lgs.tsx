// import { AuthNavigatorParamList } from '@navigation/AuthNavigator';
// import { StackNavigationProp } from '@react-navigation/stack';
// import axios from 'axios';
// import { useState } from 'react';
// import {
//   Alert,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   ActivityIndicator,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// type LoginScreenNavigationProp = StackNavigationProp<AuthNavigatorParamList, 'Login'>;

// type Props = {
//   navigation: LoginScreenNavigationProp;
//   setIsAuthenticated: (value: boolean) => void;
//   setUserToken: (token: string) => void;
// };

// const API_URL = 'http://localhost:5000/api';

// export default function LoginScreen({ navigation, setIsAuthenticated, setUserToken }: Props) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(`${API_URL}/auth/login`, {
//         email,
//         password,
//       });

//       if (response.data.token) {
//         await AsyncStorage.setItem('userToken', response.data.token);
//         await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
//         setUserToken(response.data.token);
//         setIsAuthenticated(true);
//       }
//     } catch (error: any) {
//       const errorMessage =
//         error.response?.data?.message || 'An error occurred. Please try again.';
//       Alert.alert('Login Failed', errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>BioLens</Text>
//         <Text style={styles.subtitle}>Diatom Detection & Classification</Text>
//       </View>

//       <View style={styles.form}>
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           placeholderTextColor="#999"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           editable={!loading}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           placeholderTextColor="#999"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           editable={!loading}
//         />

//         <TouchableOpacity
//           style={[styles.button, loading && styles.buttonDisabled]}
//           onPress={handleLogin}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.buttonText}>Login</Text>
//           )}
//         </TouchableOpacity>
//       </View>

//       <View style={styles.footer}>
//         <Text style={styles.footerText}>Don't have an account? </Text>
//         <TouchableOpacity onPress={() => navigation.navigate('Signup')} disabled={loading}>
//           <Text style={styles.link}>Register</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//     justifyContent: 'space-between',
//     paddingVertical: 40,
//   },
//   header: {
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: '700',
//     color: '#1a1a1a',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#666',
//     fontWeight: '400',
//   },
//   form: {
//     paddingHorizontal: 20,
//     gap: 16,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#d0d0d0',
//     padding: 14,
//     borderRadius: 8,
//     fontSize: 16,
//     backgroundColor: '#fff',
//     color: '#1a1a1a',
//   },
//   button: {
//     backgroundColor: '#2d5a3d',
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   buttonDisabled: {
//     opacity: 0.6,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   footerText: {
//     color: '#666',
//     fontSize: 14,
//   },
//   link: {
//     color: '#2d5a3d',
//     fontSize: 14,
//     fontWeight: '600',
//   },
// });
