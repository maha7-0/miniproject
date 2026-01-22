// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HistoryScreen from '../screens/HistoryScreen';
// import HomeScreen from '../screens/HomeScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import ResultScreen from '../screens/ResultScreen';
// import UploadScreen from '../screens/UploadScreen';
// import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
// import { RootStackParamList } from 'src/types/type';

// const Stack = createNativeStackNavigator<RootStackParamList>();
// const Tab = createBottomTabNavigator();

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
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Stack.Group>
//         <Stack.Screen
//           name="Home"
//           options={{}}
//         >
//           {() => <UserTabs setIsAuthenticated={setIsAuthenticated} />}
//         </Stack.Screen>
//       </Stack.Group>

//       <Stack.Group
//         screenOptions={{
//           presentation: 'modal',
//           headerShown: true,
//           headerStyle: { backgroundColor: '#2d5a3d' },
//           headerTintColor: '#fff',
//           headerTitleStyle: { color: '#fff' },
//         }}
//       >
//         <Stack.Screen
//           name="Result"
//           component={ResultScreen}
//           options={{ title: 'Classification Result' }}
//         />
//       </Stack.Group>

//       <Stack.Group
//         screenOptions={{
//           presentation: 'modal',
//           headerShown: true,
//           headerStyle: { backgroundColor: '#2d5a3d' },
//           headerTintColor: '#fff',
//           headerTitleStyle: { color: '#fff' },
//         }}
//       >
//         <Stack.Screen
//           name="AdminDashboard"
//           component={AdminDashboardScreen}
//           options={{ title: 'Admin Dashboard' }}
//         />
//       </Stack.Group>
//     </Stack.Navigator>
//   );
// }
// // User related types
// export interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// export interface SignupData {
//   name: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

// export interface LoginData {
//   email: string;
//   password: string;
// }

// // Diatom classification types
// export interface DiatomClass {
//   _id: string;
//   name: string;
//   scientificDescription: string;
//   environmentalSignificance: string;
//   impacts: string;
// }

// export interface ClassificationResult {
//   className: string;
//   confidence: number;
//   scientificDescription: string;
//   environmentalSignificance: string;
//   impacts: string;
//   recordId: string;
//   timestamp: string;
// }

// export interface ClassificationRecord {
//   _id: string;
//   userId: string;
//   imageUrl: string;
//   predictedClass: string;
//   confidence: number;
//   createdAt: string;
//   diatomClass?: DiatomClass;
// }

// // Admin types
// export interface Admin {
//   id: string;
//   username: string;
// }

// export interface AdminLoginData {
//   username: string;
//   password: string;
// }

// export interface AdminStats {
//   totalUsers: number;
//   totalClassifications: number;
//   totalDiatomClasses: number;
//   mostDetectedClasses: {
//     _id: string;
//     count: number;
//     avgConfidence: number;
//   }[];
//   recentClassifications: ClassificationRecord[];
// }

// // API Response types
// export interface ApiResponse<T> {
//   success: boolean;
//   message?: string;
//   data?: T;
//   error?: string;
// }

// export interface AuthResponse {
//   success: boolean;
//   message: string;
//   token: string;
//   user?: User | Admin;
//   admin?: Admin;
// }

// // ✅ Navigation types
// export type RootStackParamList = {
//   Login: undefined;
//   Signup: undefined;
//   Home: undefined;
//   Upload: undefined;
//   History: undefined;
//   Profile: undefined;
//   Result: { result: ClassificationResult }; // Result screen expects a payload
//   AdminLogin: undefined;
//   AdminDashboard: undefined;
// };


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
// import SignupScreen from '../screens/SignupScreen';

// const Stack = createNativeStackNavigator<RootStackParamList>();
// const Tab = createBottomTabNavigator();

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
//   name="Profile"
//   options={{
//     tabBarLabel: 'Profile',
//     tabBarIcon: ({ color, size }) => (
//       <MaterialCommunityIcons name="account" color={color} size={size} />
//     ),
//   }}
// >
//   {(props) => (
//     <ProfileScreen {...props} setIsAuthenticated={setIsAuthenticated} />
//   )}
// </Tab.Screen>

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



//again - 7/1
// import React from 'react';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { RootStackParamList } from 'src/types/type';

// // Screens
// import LoginScreen from '../screens/LoginScreen';
// import SignupScreen from '../screens/SignupScreen';
// import HomeScreen from '../screens/HomeScreen';
// import UploadScreen from '../screens/UploadScreen';
// import HistoryScreen from '../screens/HistoryScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import ResultScreen from '../screens/ResultScreen';
// import AdminLoginScreen from '../screens/admin/AdminLoginScreen';
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
//       {/* Auth flow */}
//       <Stack.Screen
//         name="Login"
//         component={LoginScreen}
//         options={{ headerShown: true, title: 'Login' }}
//       />
//       <Stack.Screen
//         name="Signup"
//         component={SignupScreen}
//         options={{ headerShown: true, title: 'Sign Up' }}
//       />

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

//       {/* Admin login */}
//       <Stack.Screen
//         name="AdminLogin"
//         component={AdminLoginScreen}
//         options={{
//           headerShown: true,
//           title: 'Admin Login',
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


import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/types/type';

// Screens
import HomeScreen from '../screens/HomeScreen';
import UploadScreen from '../screens/UploadScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ResultScreen from '../screens/ResultScreen';
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

interface AppNavigatorProps {
  setIsAuthenticated: (value: boolean) => void;
}

function UserTabs({ setIsAuthenticated }: AppNavigatorProps) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2d5a3d',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#f8f8f8',
          borderTopColor: '#e0e0e0',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={UploadScreen}
        options={{
          tabBarLabel: 'Upload',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cloud-upload" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      >
        {(props) => (
          <ProfileScreen {...props} setIsAuthenticated={setIsAuthenticated} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function AppNavigator({ setIsAuthenticated }: AppNavigatorProps) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Tabs for user flow */}
      <Stack.Screen name="Home">
        {() => <UserTabs setIsAuthenticated={setIsAuthenticated} />}
      </Stack.Screen>

      {/* Result screen */}
      <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{
          headerShown: true,
          title: 'Classification Result',
          headerStyle: { backgroundColor: '#2d5a3d' },
          headerTintColor: '#fff',
          headerTitleStyle: { color: '#fff' },
        }}
      />

      {/* Admin dashboard */}
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{
          headerShown: true,
          title: 'Admin Dashboard',
          headerStyle: { backgroundColor: '#2d5a3d' },
          headerTintColor: '#fff',
          headerTitleStyle: { color: '#fff' },
        }}
      />
    </Stack.Navigator>
  );
}
