
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import RosterCard from '@/components/RosterCard';
import { roster, Explorer } from '@/data/roster';

export default function RosterScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'probationary' | 'inactive'>('all');

  // Filter roster based on search and status
  const filteredRoster = roster.filter(explorer => {
    const matchesSearch = explorer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         explorer.rank.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || explorer.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleExplorerPress = (explorerId: string) => {
    router.push(`/explorer-details?id=${explorerId}`);
  };

  const getStatusCount = (status: Explorer['status']) => {
    return roster.filter(explorer => explorer.status === status).length;
  };

  const filterButtons = [
    { key: 'all', label: 'All', count: roster.length },
    { key: 'active', label: 'Active', count: getStatusCount('active') },
    { key: 'probationary', label: 'Probationary', count: getStatusCount('probationary') },
    { key: 'inactive', label: 'Inactive', count: getStatusCount('inactive') },
  ] as const;

  return (
    <>
      <Stack.Screen
        options={{
          title: "Explorer Roster",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }}
      />
      <SafeAreaView style={[commonStyles.wrapper]} edges={['bottom']}>
        <ScrollView 
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <IconSymbol name="person.3.fill" size={32} color={colors.primary} />
              <Text style={styles.statNumber}>{roster.length}</Text>
              <Text style={styles.statLabel}>Total Explorers</Text>
            </View>
            
            <View style={styles.statCard}>
              <IconSymbol name="checkmark.circle.fill" size={32} color="#28a745" />
              <Text style={styles.statNumber}>{getStatusCount('active')}</Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
            
            <View style={styles.statCard}>
              <IconSymbol name="clock.fill" size={32} color={colors.accent} />
              <Text style={styles.statNumber}>{getStatusCount('probationary')}</Text>
              <Text style={styles.statLabel}>Probationary</Text>
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <IconSymbol name="magnifyingglass" size={20} color={colors.textSecondary} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search explorers..."
                placeholderTextColor={colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <Pressable onPress={() => setSearchQuery('')}>
                  <IconSymbol name="xmark.circle.fill" size={20} color={colors.textSecondary} />
                </Pressable>
              )}
            </View>
          </View>

          {/* Filter Buttons */}
          <View style={styles.filterContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterScrollContent}
            >
              {filterButtons.map((filter) => (
                <Pressable
                  key={filter.key}
                  style={[
                    styles.filterButton,
                    selectedFilter === filter.key && styles.filterButtonActive
                  ]}
                  onPress={() => setSelectedFilter(filter.key)}
                >
                  <Text style={[
                    styles.filterButtonText,
                    selectedFilter === filter.key && styles.filterButtonTextActive
                  ]}>
                    {filter.label} ({filter.count})
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Roster List */}
          <View style={styles.rosterSection}>
            <Text style={styles.sectionTitle}>
              {filteredRoster.length} Explorer{filteredRoster.length !== 1 ? 's' : ''}
              {searchQuery && ` matching "${searchQuery}"`}
            </Text>

            {filteredRoster.length > 0 ? (
              filteredRoster.map((explorer) => (
                <RosterCard
                  key={explorer.id}
                  explorer={explorer}
                  onPress={() => handleExplorerPress(explorer.id)}
                />
              ))
            ) : (
              <View style={styles.noResultsContainer}>
                <IconSymbol name="person.badge.minus" size={40} color={colors.textSecondary} />
                <Text style={styles.noResultsText}>
                  {searchQuery 
                    ? `No explorers found matching "${searchQuery}"`
                    : 'No explorers found'
                  }
                </Text>
              </View>
            )}
          </View>

          {/* Leadership Section */}
          <View style={styles.leadershipSection}>
            <Text style={styles.sectionTitle}>Leadership</Text>
            {roster
              .filter(explorer => explorer.rank.includes('Captain') || explorer.rank.includes('Senior'))
              .map((leader) => (
                <View key={leader.id} style={styles.leaderCard}>
                  <IconSymbol 
                    name={leader.rank.includes('Captain') ? 'star.fill' : 'chevron.up.circle.fill'} 
                    size={24} 
                    color={colors.primary} 
                  />
                  <View style={styles.leaderInfo}>
                    <Text style={styles.leaderName}>{leader.name}</Text>
                    <Text style={styles.leaderRank}>{leader.rank}</Text>
                  </View>
                  <Pressable onPress={() => handleExplorerPress(leader.id)}>
                    <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
                  </Pressable>
                </View>
              ))
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingBottom: 100, // Space for floating tab bar
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterScrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.highlight,
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  filterButtonTextActive: {
    color: colors.card,
  },
  rosterSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 12,
    textAlign: 'center',
  },
  leadershipSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  leaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  leaderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  leaderName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  leaderRank: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 2,
  },
});
