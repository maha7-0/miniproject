import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AppNavigator  from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          // Validate token by calling profile endpoint
          try {
            const response = await fetch('http://localhost:5000/api/auth/profile', {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });

            if (response.ok) {
              setUserToken(token);
              setIsAuthenticated(true);
            } else if (response.status === 401) {
              // Token is invalid/expired
              await AsyncStorage.removeItem('userToken');
              await AsyncStorage.removeItem('user');
              setIsAuthenticated(false);
            }
          } catch (err) {
            console.error('Token validation error:', err);
            // If we can't validate, still try to use the token
            setUserToken(token);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Failed to restore token', error);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2d5a3d" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AppNavigator setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <AuthNavigator
          setIsAuthenticated={setIsAuthenticated}
          setUserToken={setUserToken}
        />
      )}
    </NavigationContainer>
  );
}
