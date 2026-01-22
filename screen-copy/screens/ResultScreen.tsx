import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { RootStackParamList } from 'src/types/type';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export default function ResultScreen({ route, navigation }: Props) {
  const { result } = route.params;
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const confidenceColor = result.confidence > 0.85 ? '#27ae60' : result.confidence > 0.7 ? '#f39c12' : '#e74c3c';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.resultCard}>
        <View style={styles.classNameContainer}>
          <MaterialCommunityIcons name="microscope" size={48} color="#2d5a3d" />
          <Text style={styles.className}>{result.className}</Text>
        </View>

        <View style={styles.confidenceContainer}>
          <Text style={styles.confidenceLabel}>Classification Confidence</Text>
          <View style={styles.confidenceBar}>
            <View
              style={[
                styles.confidenceFill,
                { width: `${result.confidence * 100}%`, backgroundColor: confidenceColor },
              ]}
            />
          </View>
          <Text style={[styles.confidenceScore, { color: confidenceColor }]}>
            {(result.confidence * 100).toFixed(1)}%
          </Text>
        </View>

        <TouchableOpacity
          style={styles.expandableHeader}
          onPress={() => toggleSection('description')}
        >
          <View style={styles.headerContent}>
            <MaterialCommunityIcons
              name={expandedSection === 'description' ? 'chevron-down' : 'chevron-right'}
              size={24}
              color="#2d5a3d"
            />
            <Text style={styles.headerTitle}>Scientific Description</Text>
          </View>
        </TouchableOpacity>

        {expandedSection === 'description' && (
          <Text style={styles.expandedText}>{result.scientificDescription}</Text>
        )}

        <TouchableOpacity
          style={styles.expandableHeader}
          onPress={() => toggleSection('significance')}
        >
          <View style={styles.headerContent}>
            <MaterialCommunityIcons
              name={expandedSection === 'significance' ? 'chevron-down' : 'chevron-right'}
              size={24}
              color="#2d5a3d"
            />
            <Text style={styles.headerTitle}>Environmental Significance</Text>
          </View>
        </TouchableOpacity>

        {expandedSection === 'significance' && (
          <Text style={styles.expandedText}>{result.environmentalSignificance}</Text>
        )}

        <TouchableOpacity
          style={styles.expandableHeader}
          onPress={() => toggleSection('impacts')}
        >
          <View style={styles.headerContent}>
            <MaterialCommunityIcons
              name={expandedSection === 'impacts' ? 'chevron-down' : 'chevron-right'}
              size={24}
              color="#2d5a3d"
            />
            <Text style={styles.headerTitle}>Ecological Impacts</Text>
          </View>
        </TouchableOpacity>

        {expandedSection === 'impacts' && (
          <Text style={styles.expandedText}>{result.impacts}</Text>
        )}
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => navigation.navigate('Home')}
        >
          <MaterialCommunityIcons name="cloud-upload" size={20} color="#fff" />
          <Text style={styles.primaryButtonText}>New Classification</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('History')}
        >
          <MaterialCommunityIcons name="history" size={20} color="#2d5a3d" />
          <Text style={styles.secondaryButtonText}>View History</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  resultCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  classNameContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  className: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d5a3d',
    marginTop: 12,
  },
  confidenceContainer: {
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  confidenceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  confidenceBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 4,
  },
  confidenceScore: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  expandableHeader: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2d5a3d',
    marginLeft: 8,
    flex: 1,
  },
  expandedText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  actionButtons: {
    gap: 12,
  },
  button: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#2d5a3d',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#f0f5f3',
    borderWidth: 2,
    borderColor: '#2d5a3d',
  },
  secondaryButtonText: {
    color: '#2d5a3d',
    fontSize: 16,
    fontWeight: '600',
  },
});
