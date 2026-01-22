import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { RootStackParamList } from '../../frontend/src/types/type';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>BioLens</Text>
        <Text style={styles.subtitle}>Diatom Detection & Classification</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <MaterialCommunityIcons name="microscope" size={48} color="#2d5a3d" />
          <Text style={styles.cardTitle}>Scientific Identification</Text>
          <Text style={styles.cardDescription}>
            Upload microscopic diatom images for instant AI-powered classification
          </Text>
        </View>

        <View style={styles.card}>
          <MaterialCommunityIcons name="water" size={48} color="#2d5a3d" />
          <Text style={styles.cardTitle}>Water Quality Analysis</Text>
          <Text style={styles.cardDescription}>
            Get ecological significance and environmental indicators for detected species
          </Text>
        </View>

        <View style={styles.card}>
          <MaterialCommunityIcons name="history" size={48} color="#2d5a3d" />
          <Text style={styles.cardTitle}>Classification History</Text>
          <Text style={styles.cardDescription}>
            Track and review all your past classifications and analysis results
          </Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Upload')}
        >
          <MaterialCommunityIcons name="cloud-upload" size={24} color="#fff" />
          <Text style={styles.primaryButtonText}>Start Classification</Text>
        </TouchableOpacity>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How It Works</Text>
          <Text style={styles.infoText}>
            1. Take or upload a microscopic diatom image{'\n'}
            2. Our AI model classifies the diatom species{'\n'}
            3. View detailed scientific and ecological information{'\n'}
            4. Track results in your classification history
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: '#2d5a3d',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#d0d0d0',
    marginTop: 8,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#2d5a3d',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
  },
  cardDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 18,
  },
  primaryButton: {
    backgroundColor: '#2d5a3d',
    borderRadius: 12,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  infoSection: {
    backgroundColor: '#f0f5f3',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d5a3d',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
  },
});
