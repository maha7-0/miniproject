import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { classificationService } from '../../frontend/src/services';
import { ClassificationRecord } from '../../frontend/src/types/type';

export default function HistoryScreen() {
  const [records, setRecords] = useState<ClassificationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const loadHistory = async () => {
    setIsLoading(true);
    try {
      const result = await classificationService.getHistory();
      if (result.success) {
        setRecords(result.records || []);
      } else {
        Alert.alert('Error', result.message || 'Failed to load history');
      }
    } catch (error: any) {
      Alert.alert('Error', 'Failed to load classification history');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderRecord = ({ item }: { item: ClassificationRecord }) => (
    <TouchableOpacity
      style={styles.recordCard}
      onPress={() => setExpandedId(expandedId === item._id ? null : item._id)}
    >
      <View style={styles.recordHeader}>
        <View style={styles.recordInfo}>
          <Text style={styles.recordClass}>{item.predictedClass}</Text>
          <Text style={styles.recordDate}>{formatDate(item.createdAt)}</Text>
        </View>
        <View style={styles.confidenceTag}>
          <Text style={styles.confidenceText}>{(item.confidence * 100).toFixed(0)}%</Text>
        </View>
      </View>

      {expandedId === item._id && (
        <View style={styles.expandedContent}>
          <Text style={styles.sectionTitle}>Scientific Description</Text>
          <Text style={styles.sectionText}>
            {item.diatomClass?.scientificDescription || 'No description available'}
          </Text>

          <Text style={styles.sectionTitle}>Environmental Significance</Text>
          <Text style={styles.sectionText}>
            {item.diatomClass?.environmentalSignificance || 'No data available'}
          </Text>

          <Text style={styles.sectionTitle}>Ecological Impacts</Text>
          <Text style={styles.sectionText}>
            {item.diatomClass?.impacts || 'No data available'}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Classification History</Text>
        </View>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#2d5a3d" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Classification History</Text>
        <Text style={styles.subtitle}>{records.length} classifications</Text>
      </View>

      {records.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="history" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No classifications yet</Text>
          <Text style={styles.emptySubtext}>
            Upload an image to get started
          </Text>
        </View>
      ) : (
        <FlatList
          data={records}
          keyExtractor={(item) => item._id}
          renderItem={renderRecord}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#2d5a3d',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 13,
    color: '#d0d0d0',
    marginTop: 4,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 13,
    color: '#bbb',
    marginTop: 8,
  },
  listContent: {
    padding: 16,
  },
  recordCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  recordInfo: {
    flex: 1,
  },
  recordClass: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d5a3d',
  },
  recordDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  confidenceTag: {
    backgroundColor: '#2d5a3d',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  confidenceText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  expandedContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2d5a3d',
    marginTop: 12,
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
  },
});
