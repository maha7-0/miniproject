import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image, ScrollView, StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function PredictScreen() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Please allow gallery access");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const startPredicting = () => {
    if (!image) {
      Alert.alert("No image", "Please upload an image first");
      return;
    }
    Alert.alert("Prediction", "Prediction started...");
  };

  return (
    <View style={styles.container}>
<ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false} // optional
    >
      {/* Curved Illustration */}
      <View style={styles.topImageWrapper}>
        <Image
          source={require("../assets/images/output.jpeg")}
          style={styles.image}
        />
      </View>

      <Text style={styles.title}>Upload your image</Text>

      <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
        <Text style={styles.uploadText}>Click to upload</Text>
      </TouchableOpacity>

      {image && (
  <View style={styles.previewContainer}>
    <TouchableOpacity
      style={styles.cancelBtn}
      onPress={() => setImage(null)}
    >
      <Text style={styles.cancelText}>✕</Text>
    </TouchableOpacity>

    <Image source={{ uri: image }} style={styles.preview} />
  </View>
)}

      <TouchableOpacity style={styles.predictCircle} onPress={startPredicting}>
        <Text style={styles.predictText}>Start{"\n"}Predicting</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 40,
  },
  previewContainer: {
  position: "relative",
  marginBottom: 20,
},

cancelBtn: {
  position: "absolute",
  top: -8,
  right: -8,
  zIndex: 10,
  backgroundColor: "#000",
  width: 26,
  height: 26,
  borderRadius: 13,
  alignItems: "center",
  justifyContent: "center",
},

cancelText: {
  color: "#fff",
  fontSize: 14,
  fontWeight: "700",
},


  /* 🔥 Curved container */
  topImageWrapper: {
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

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },

  uploadBtn: {
    backgroundColor: "#0b6e3b",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },

  uploadText: {
    color: "#fff",
    fontWeight: "600",
  },

  preview: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 20,
  },

  predictCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#0b6e3b",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 12,
    borderColor: "#8fe0b0",
  },

  predictText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
