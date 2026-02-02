import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native';
import { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/types/type';

type Props = NativeStackScreenProps<RootStackParamList, 'Logout'>;

export default function LogoutScreen({ navigation }: Props) {
  useEffect(() => {
    const logout = async () => {
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    };
    logout();
  }, []);

  return (
    <View>
      <Text>Logging out...</Text>
    </View>
  );
}
