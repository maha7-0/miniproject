import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from 'src/types/type';
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Logout">;

const LogoutScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const logout = async () => {
      try {
        // Clear token from AsyncStorage
        await AsyncStorage.removeItem("authToken");

        // Reset navigation stack and go to ProjectInfo
        navigation.reset({
          index: 0,
          routes: [{ name: "ProjectInfo" }],
        });
      } catch (error) {
        console.error("Error clearing token:", error);
      }
    };

    logout();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2d5a3d" />
      <Text style={styles.text}>Logging out...</Text>
    </View>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fb",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: "#2c3e50",
  },
});
