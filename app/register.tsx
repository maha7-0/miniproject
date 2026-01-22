import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Platform, ScrollView, StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function RegisterScreen() {
  const router = useRouter();
  const [remember, setRemember] = useState(true);

  const isWeb = Platform.OS === "web";

  return (
    <View style={styles.screen}>
      <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false} // optional
    >
      <View style={[styles.container, isWeb && styles.webContainer]}>
        {/* Image */}
        <Image
          source={require("../assets/images/register.jpg")}
          style={styles.image}
        />

        {/* Text */}
        <Text style={styles.title}>Welcome To Biolens</Text>
        <Text style={styles.subtitle}>Please register to continue</Text>

        {/* Inputs */}
        <TextInput placeholder="Username" style={styles.input} />
        <TextInput
          placeholder="Mobile Number"
          style={styles.input}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
        />

        {/* Remember me */}
        <View style={styles.rememberRow}>
          <Text style={styles.rememberText}>Remember me next time</Text>
          <Switch
            value={remember}
            onValueChange={setRemember}
            trackColor={{ false: "#ccc", true: "#1b7f3c" }}
            thumbColor="#fff"
          />
        </View>

        {/* Register button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  /* FULL SCREEN BACKGROUND */
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop:25,
  },

  /* MAIN CONTAINER */
  container: {
    width: "100%",
    paddingHorizontal: 24,
  },

  /* WEB ONLY */
  webContainer: {
    width: 420,
  },

  image: {
    width: 240,
    height: 240,
    borderRadius: 40,     // curve strength
    overflow: "hidden",  // IMPORTANT
    marginBottom: 20,
    alignItems:"center",
    // shadow (Android + iOS)
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#e6efe9",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },

  rememberRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },

  rememberText: {
    color: "#444",
  },

  button: {
    backgroundColor: "#0b6e3b",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
