import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image, ScrollView, StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [remember, setRemember] = useState(true);

  return (
    // 🔹 Web wrapper (important for browser)
    <View style={styles.webRoot}>
      <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false} // optional
    >
      <View style={styles.container}>
        {/* Top bar */}
        <View style={styles.topBar}></View>


        {/* Image */}
        <Image
          source={require("../assets/images/login.jpeg")}
          style={styles.image}
        />

        {/* Text */}
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Please Sign in to continue</Text>

        {/* Inputs */}
        <TextInput placeholder="Username" style={styles.input} />
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

        {/* Login button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/predict")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  /* 🔥 THIS FIXES EXPO WEB LAYOUT */
  webRoot: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  container: {
    width: "100%",
    maxWidth: 420, // 🔥 KEY LINE (browser fix)
    paddingHorizontal: 24,
    paddingTop: 40,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },

  image: {
    width: 240,
    height: 240,
    borderRadius: 40,     // curve strength
    overflow: "hidden",  // IMPORTANT
    marginBottom: 20,

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
  },

  subtitle: {
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
