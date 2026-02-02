// import React from 'react';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { RootStackParamList } from 'src/types/type';

// // Screens
// import HomeScreen from '../screens/HomeScreen';
// import UploadScreen from '../screens/UploadScreen';
// import HistoryScreen from '../screens/HistoryScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import ResultScreen from '../screens/ResultScreen';
// import LoginScreen from '../screens/LoginScreen';

// import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';

// const Stack = createNativeStackNavigator<RootStackParamList>();
// const Tab = createBottomTabNavigator<RootStackParamList>();

// interface AppNavigatorProps {
//   setIsAuthenticated: (value: boolean) => void;
// }

// function UserTabs({ setIsAuthenticated }: AppNavigatorProps) {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: '#2d5a3d',
//         tabBarInactiveTintColor: '#888',
//         tabBarStyle: {
//           backgroundColor: '#f8f8f8',
//           borderTopColor: '#e0e0e0',
//         },
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           tabBarLabel: 'Home',
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="home" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Upload"
//         component={UploadScreen}
//         options={{
//           tabBarLabel: 'Upload',
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="cloud-upload" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="History"
//         component={HistoryScreen}
//         options={{
//           tabBarLabel: 'History',
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="history" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         options={{
//           tabBarLabel: 'Profile',
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="account" color={color} size={size} />
//           ),
//         }}
//       >
//         {(props) => (
//           <ProfileScreen {...props} setIsAuthenticated={setIsAuthenticated} />
//         )}
//       </Tab.Screen>
//     </Tab.Navigator>
//   );
// }
// export default function AppNavigator({ setIsAuthenticated }: AppNavigatorProps) {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {/* Login screen */}
//       <Stack.Screen name="Login" component={LoginScreen} />

//       {/* Tabs for user flow */}
//       <Stack.Screen name="Home">
//         {() => <UserTabs setIsAuthenticated={setIsAuthenticated} />}
//       </Stack.Screen>

//       {/* Result screen */}
//       <Stack.Screen
//         name="Result"
//         component={ResultScreen}
//         options={{
//           headerShown: true,
//           title: 'Classification Result',
//           headerStyle: { backgroundColor: '#2d5a3d' },
//           headerTintColor: '#fff',
//           headerTitleStyle: { color: '#fff' },
//         }}
//       />

//       {/* Admin dashboard */}
//       <Stack.Screen
//         name="AdminDashboard"
//         component={AdminDashboardScreen}
//         options={{
//           headerShown: true,
//           title: 'Admin Dashboard',
//           headerStyle: { backgroundColor: '#2d5a3d' },
//           headerTintColor: '#fff',
//           headerTitleStyle: { color: '#fff' },
//         }}
//       />
//     </Stack.Navigator>
//   );
// }




// import React from 'react';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { RootStackParamList } from 'src/types/type';

// // Screens
// import HomeScreen from '../screens/HomeScreen';
// import UploadScreen from '../screens/UploadScreen';
// import HistoryScreen from '../screens/HistoryScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import ResultScreen from '../screens/ResultScreen';
// import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';

// const Stack = createNativeStackNavigator<RootStackParamList>();
// const Tab = createBottomTabNavigator<RootStackParamList>();

// interface AppNavigatorProps {
//   setIsAuthenticated: (value: boolean) => void;
// }

// function UserTabs({ setIsAuthenticated }: AppNavigatorProps) {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: '#2d5a3d',
//         tabBarInactiveTintColor: '#888',
//         tabBarStyle: {
//           backgroundColor: '#f8f8f8',
//           borderTopColor: '#e0e0e0',
//         },
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           tabBarLabel: 'Home',
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="home" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Upload"
//         component={UploadScreen}
//         options={{
//           tabBarLabel: 'Upload',
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="cloud-upload" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="History"
//         component={HistoryScreen}
//         options={{
//           tabBarLabel: 'History',
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="history" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         options={{
//           tabBarLabel: 'Profile',
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="account" color={color} size={size} />
//           ),
//         }}
//       >
//         {(props) => (
//           <ProfileScreen {...props} setIsAuthenticated={setIsAuthenticated} />
//         )}
//       </Tab.Screen>
//     </Tab.Navigator>
//   );
// }

// export default function AppNavigator({ setIsAuthenticated }: AppNavigatorProps) {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {/* Tabs for user flow */}
//       <Stack.Screen name="Home">
//         {() => <UserTabs setIsAuthenticated={setIsAuthenticated} />}
//       </Stack.Screen>

//       {/* Result screen */}
//       <Stack.Screen
//         name="Result"
//         component={ResultScreen}
//         options={{
//           headerShown: true,
//           title: 'Classification Result',
//           headerStyle: { backgroundColor: '#2d5a3d' },
//           headerTintColor: '#fff',
//           headerTitleStyle: { color: '#fff' },
//         }}
//       />

//       {/* Admin dashboard */}
//       <Stack.Screen
//         name="AdminDashboard"
//         component={AdminDashboardScreen}
//         options={{
//           headerShown: true,
//           title: 'Admin Dashboard',
//           headerStyle: { backgroundColor: '#2d5a3d' },
//           headerTintColor: '#fff',
//           headerTitleStyle: { color: '#fff' },
//         }}
//       />
//     </Stack.Navigator>
//   );
// }


// import React from 'react';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import { RootStackParamList } from 'src/types/type';

// // Screens
// import HomeScreen from '../screens/HomeScreen';
// import UploadScreen from '../screens/UploadScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import ResultScreen from '../screens/ResultScreen';
// import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';

// const Stack = createNativeStackNavigator<RootStackParamList>();
// const Tab = createBottomTabNavigator<RootStackParamList>();

// interface AppNavigatorProps {
//   setIsAuthenticated: (value: boolean) => void;
// }

// function CustomTopTabBar({ state, descriptors, navigation }: any) {
//   return (
//     <View style={styles.topTabBar}>
//       {state.routes.map((route: any, index: number) => {
//         const { options } = descriptors[route.key];
//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name);
//           }
//         };

//         return (
//           <TouchableOpacity
//             key={route.key}
//             onPress={onPress}
//             style={[
//               styles.tabButton,
//               isFocused && styles.tabButtonActive,
//             ]}
//           >
//             <MaterialCommunityIcons
//               name={
//                 route.name === 'Home'
//                   ? 'home'
//                   : route.name === 'Upload'
//                   ? 'cloud-upload'
//                   : 'account'
//               }
//               size={24}
//               color={isFocused ? '#2d5a3d' : '#888'}
//             />
//             <Text
//               style={[
//                 styles.tabLabel,
//                 isFocused && styles.tabLabelActive,
//               ]}
//             >
//               {options.tabBarLabel || route.name}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// function UserTabs({ setIsAuthenticated }: AppNavigatorProps) {
//   return (
//     <Tab.Navigator
//       tabBar={(props) => <CustomTopTabBar {...props} />}
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           tabBarLabel: 'Home',
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="home" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Upload"
//         component={UploadScreen}
//         options={{
//           tabBarLabel: 'Upload',
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="cloud-upload" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         options={{
//           tabBarLabel: 'Profile',
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="account" color={color} size={size} />
//           ),
//         }}
//       >
//         {(props) => (
//           <ProfileScreen {...props} setIsAuthenticated={setIsAuthenticated} />
//         )}
//       </Tab.Screen>
//     </Tab.Navigator>
//   );
// }

// export default function AppNavigator({ setIsAuthenticated }: AppNavigatorProps) {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {/* Tabs for user flow */}
//       <Stack.Screen name="UserTabs">
//         {() => <UserTabs setIsAuthenticated={setIsAuthenticated} />}
//       </Stack.Screen>

//       {/* Result screen */}
//       <Stack.Screen
//         name="Result"
//         component={ResultScreen}
//         options={{
//           headerShown: true,
//           title: 'Classification Result',
//           headerStyle: { backgroundColor: '#2d5a3d' },
//           headerTintColor: '#fff',
//           headerTitleStyle: { color: '#fff' },
//         }}
//       />

//       {/* Admin dashboard */}
//       <Stack.Screen
//         name="AdminDashboard"
//         component={AdminDashboardScreen}
//         options={{
//           headerShown: true,
//           title: 'Admin Dashboard',
//           headerStyle: { backgroundColor: '#2d5a3d' },
//           headerTintColor: '#fff',
//           headerTitleStyle: { color: '#fff' },
//         }}
//       />
//     </Stack.Navigator>
//   );
// }
// const styles = StyleSheet.create({
//   topTabBar: {
//     flexDirection: 'row',
//     backgroundColor: '#f8f8f8',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//     paddingTop: 10,
//     paddingBottom: 10,
//     justifyContent: 'space-around',
//   },
//   tabButton: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   tabButtonActive: {
//     borderBottomWidth: 3,
//     borderBottomColor: '#2d5a3d',
//   },
//   tabLabel: {
//     fontSize: 12,
//     color: '#888',
//     marginTop: 4,
//   },
//   tabLabelActive: {
//     color: '#2d5a3d',
//     fontWeight: '600',
//   },
// });

//28/01
//working 

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { RootStackParamList } from 'src/types/type';

// // Screens
// import HomeScreen from '../screens/HomeScreen';
// import LoginScreen from '../screens/LoginScreen';
// import UploadScreen from '../screens/UploadScreen';
// import LogoutScreen from '../screens/LogoutScreen';

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function AppNavigator() {
//   return (
//     <Stack.Navigator
//       initialRouteName="Home"
//       screenOptions={{ headerShown: false }}
//     >
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="Upload" component={UploadScreen} />
//       <Stack.Screen name="Logout" component={LogoutScreen} />
//     </Stack.Navigator>
//   );
// }

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/types/type';

// Import ALL screens
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import UploadScreen from '../screens/UploadScreen';
import LogoutScreen from '../screens/LogoutScreen';
import AdminLoginScreen from '../screens/admin/AdminLoginScreen';
import ResultScreen from 'src/screens/ResultScreen';
import HistoryScreen from 'src/screens/HistoryScreen';
import ProfileScreen from 'src/screens/ProfileScreen';
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home" // Set this to Login so you can see the screen immediately
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Upload" component={UploadScreen} />
      <Stack.Screen name="Logout" component={LogoutScreen} />
      <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
      <Stack.Screen name= "Result" component={ResultScreen}/>
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}