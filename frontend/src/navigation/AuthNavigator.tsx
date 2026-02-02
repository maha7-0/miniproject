// // import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // import LoginScreen from '../screens/LoginScreen';
// // import SignupScreen from '../screens/SignupScreen';
// // import AdminLoginScreen from '../screens/admin/AdminLoginScreen';
// // import { RootStackParamList } from '../types/type';

// // const Stack = createNativeStackNavigator<RootStackParamList>();

// // interface AuthNavigatorProps {
// //   setIsAuthenticated: (value: boolean) => void;
// //   setUserToken: (token: string) => void;
// // }

// // export default function AuthNavigator({
// //   setIsAuthenticated,
// //   setUserToken,
// // }: AuthNavigatorProps) {
// //   return (
// //     <Stack.Navigator
// //       screenOptions={{
// //         headerShown: false,
// //       }}
// //     >
// //       <Stack.Screen
// //         name="Login"
// //         options={{}}
// //       >
// //         {(props) => (
// //           <LoginScreen
// //             {...props}
// //             setIsAuthenticated={setIsAuthenticated}
// //             setUserToken={setUserToken}
// //           />
// //         )}
// //       </Stack.Screen>
// //       <Stack.Screen
// //         name="Signup"
// //         options={{}}
// //       >
// //         {(props) => (
// //           <SignupScreen
// //             {...props}
// //             setIsAuthenticated={setIsAuthenticated}
// //             setUserToken={setUserToken}
// //           />
// //         )}
// //       </Stack.Screen>
// //       <Stack.Screen
// //         name="AdminLogin"
// //         options={{}}
// //         component={AdminLoginScreen}
// //       />
// //     </Stack.Navigator>
// //   );
// // }
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginScreen from '../screens/LoginScreen';
// import SignupScreen from '../screens/SignupScreen';
// import AdminLoginScreen from '../screens/admin/AdminLoginScreen';
// import { RootStackParamList } from '../types/type';

// const Stack = createNativeStackNavigator<RootStackParamList>();

// interface AuthNavigatorProps {
//   setIsAuthenticated: (value: boolean) => void;
//   setUserToken: (token: string) => void;
// }

// export default function AuthNavigator({
//   setIsAuthenticated,
//   setUserToken,
// }: AuthNavigatorProps) {
//   return (
//     <Stack.Navigator
//       initialRouteName="Login"
//       screenOptions={{ headerShown: false }}
//     >
//       <Stack.Screen name="Login">
//         {(props) => (
//           <LoginScreen
//             {...props}
//             setIsAuthenticated={setIsAuthenticated}
//             setUserToken={setUserToken}
//           />
//         )}
//       </Stack.Screen>

//       <Stack.Screen name="Signup">
//         {(props) => (
//           <SignupScreen
//             {...props}
//             setIsAuthenticated={setIsAuthenticated}
//             setUserToken={setUserToken}
//           />
//         )}
//       </Stack.Screen>

//       <Stack.Screen
//         name="AdminLogin"
//         component={AdminLoginScreen}
//         options={{ headerShown: true, title: 'Admin Login' }}
//       />
//     </Stack.Navigator>
//   );
// }


// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginScreen from '../screens/LoginScreen';
// import SignupScreen from '../screens/SignupScreen';
// import AdminLoginScreen from '../screens/admin/AdminLoginScreen';
// import { RootStackParamList } from '../types/type';

// const Stack = createNativeStackNavigator<RootStackParamList>();

// interface AuthNavigatorProps {
//   setIsAuthenticated: (value: boolean) => void;
//   setUserToken: (token: string) => void;
// }

// export default function AuthNavigator({
//   setIsAuthenticated,
//   setUserToken,
// }: AuthNavigatorProps) {
//   return (
//     <Stack.Navigator
//       initialRouteName="Login"
//       screenOptions={{ headerShown: false }}
//     >
//       <Stack.Screen name="Login">
//         {(props) => (
//           <LoginScreen
//             {...props}
//             setIsAuthenticated={setIsAuthenticated}
//             setUserToken={setUserToken}
//           />
//         )}
//       </Stack.Screen>

//       <Stack.Screen name="Signup">
//         {(props) => (
//           <SignupScreen
//             {...props}
//             setIsAuthenticated={setIsAuthenticated}
//             setUserToken={setUserToken}
//           />
//         )}
//       </Stack.Screen>

//       <Stack.Screen
//         name="AdminLogin"
//         component={AdminLoginScreen}
//         options={{ headerShown: true, title: 'Admin Login' }}
//       />
//     </Stack.Navigator>
//   );
// }

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import AdminLoginScreen from '../screens/admin/AdminLoginScreen';
import { RootStackParamList } from '../types/type';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen
        name="AdminLogin"
        component={AdminLoginScreen}
        options={{ headerShown: true, title: 'Admin Login' }}
      />
    </Stack.Navigator>
  );
}
