
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { RootStackParamList } from 'src/types/type';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export default function ResultScreen({ navigation, route }: Props) {
  const { result } = route.params; // ✅ matches RootStackParamList
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    description: true,
    environmental: false,
    impacts: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const confidencePercentage = Math.round(result.confidence * 100);
  const confidenceColor =
    confidencePercentage >= 85 ? '#2d5a3d' : confidencePercentage >= 70 ? '#4a7c5e' : '#d4a574';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Classification Result</Text>
      </View>

      {/* Diatom Class Card */}
      <View style={styles.classCard}>
        <Text style={styles.className}>{result.className}</Text>
        <View style={styles.confidenceContainer}>
          <View style={styles.confidenceBar}>
            <View
              style={[
                styles.confidenceFill,
                {
                  width: `${confidencePercentage}%`,
                  backgroundColor: confidenceColor,
                },
              ]}
            />
          </View>
          <Text style={[styles.confidenceText, { color: confidenceColor }]}>
            {confidencePercentage}% Confidence
          </Text>
        </View>
      </View>

      {/* Expandable Sections */}
      <ExpandableSection
        title="Scientific Overview"
        section="description"
        expanded={expandedSections.description}
        onToggle={toggleSection}
        content={result.scientificDescription}
      />

      <ExpandableSection
        title="Environmental Significance"
        section="environmental"
        expanded={expandedSections.environmental}
        onToggle={toggleSection}
        content={result.environmentalSignificance}
      />

      <ExpandableSection
        title="Impacts & Indicators"
        section="impacts"
        expanded={expandedSections.impacts}
        onToggle={toggleSection}
        content={result.impacts}
      />

      {/* Action Buttons */}
      <View style={styles.actionGroup}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.primaryButtonText}>View History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Upload')}
        >
          <Text style={styles.secondaryButtonText}>Classify Another</Text>
        </TouchableOpacity>
      </View>

      {/* Record ID */}
      <View style={styles.recordInfo}>
        <Text style={styles.recordLabel}>Record ID</Text>
        <Text style={styles.recordId}>{result.recordId}</Text>
      </View>
    </ScrollView>
  );
}

interface ExpandableSectionProps {
  title: string;
  section: string;
  expanded: boolean;
  onToggle: (section: string) => void;
  content: string;
}

function ExpandableSection({
  title,
  section,
  expanded,
  onToggle,
  content,
}: ExpandableSectionProps) {
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => onToggle(section)}
        activeOpacity={0.7}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.expandIcon}>{expanded ? '▼' : '▶'}</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.sectionContent}>
          <Text style={styles.sectionText}>{content}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  classCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2d5a3d',
  },
  className: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2d5a3d',
    marginBottom: 16,
  },
  confidenceContainer: {
    gap: 8,
  },
  confidenceBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 4,
  },
  confidenceText: {
    fontSize: 14,
    fontWeight: '600',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
  },
  expandIcon: {
    fontSize: 12,
    color: '#666',
  },
  sectionContent: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  sectionText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  actionGroup: {
    gap: 12,
    marginVertical: 20,
  },
  primaryButton: {
    backgroundColor: '#2d5a3d',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#e8f0eb',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2d5a3d',
  },
  secondaryButtonText: {
    color: '#2d5a3d',
    fontSize: 16,
    fontWeight: '600',
  },
  recordInfo: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  recordLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  recordId: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
});