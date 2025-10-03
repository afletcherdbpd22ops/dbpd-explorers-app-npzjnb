
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import RosterCard from '@/components/RosterCard';
import { roster, Explorer, isSpecialRank } from '@/data/roster';

export default function RosterScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'probationary' | 'inactive' | 'special'>('all');

  // Filter roster based on search and status
  const filteredRoster = roster.filter(explorer => {
    const matchesSearch = explorer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         explorer.rank.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesFilter = true;
    if (selectedFilter === 'special') {
      matchesFilter = isSpecialRank(explorer.rank);
    } else if (selectedFilter !== 'all') {
      matchesFilter = explorer.status === selectedFilter;
    }
    
    return matchesSearch && matchesFilter;
  });

  const handleExplorerPress = (explorerId: string) => {
    router.push(`/explorer-details?id=${explorerId}`);
  };

  const getStatusCount = (status: Explorer['status']) => {
    return roster.filter(explorer => explorer.status === status).length;
  };

  const getSpecialRankCount = () => {
    return roster.filter(explorer => isSpecialRank(explorer.rank)).length;
  };

  const filterButtons = [
    { key: 'all', label: 'All', count: roster.length },
    { key: 'special', label: 'Special Ranks', count: getSpecialRankCount() },
    { key: 'active', label: 'Active', count: getStatusCount('active') },
    { key: 'probationary', label: 'Probationary', count: getStatusCount('probationary') },
    { key: 'inactive', label: 'Inactive', count: getStatusCount('inactive') },
  ] as const;

  // Sort roster to show special ranks first
  const sortedRoster = [...filteredRoster].sort((a, b) => {
    const aIsSpecial = isSpecialRank(a.rank);
    const bIsSpecial = isSpecialRank(b.rank);
    
    if (aIsSpecial && !bIsSpecial) return -1;
    if (!aIsSpecial && bIsSpecial) return 1;
    
    // If both are special or both are regular, sort by rank hierarchy
    const rankOrder = ['Major', 'Captain', 'Lieutenant', 'Sgt', 'Officer', 'Advisor', 'Senior Explorer', 'Explorer'];
    const aRankIndex = rankOrder.findIndex(rank => a.rank.toLowerCase().includes(rank.toLowerCase()));
    const bRankIndex = rankOrder.findIndex(rank => b.rank.toLowerCase().includes(rank.toLowerCase()));
    
    if (aRankIndex !== -1 && bRankIndex !== -1) {
      return aRankIndex - bRankIndex;
    }
    
    return a.name.localeCompare(b.name);
  });

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
              <Text style={styles.statLabel}>Total Members</Text>
            </View>
            
            <View style={styles.specialStatCard}>
              <IconSymbol name="star.fill" size={32} color="#FFD700" />
              <Text style={styles.statNumber}>{getSpecialRankCount()}</Text>
              <Text style={styles.statLabel}>Special Ranks</Text>
            </View>
            
            <View style={styles.statCard}>
              <IconSymbol name="checkmark.circle.fill" size={32} color="#28a745" />
              <Text style={styles.statNumber}>{getStatusCount('active')}</Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <IconSymbol name="magnifyingglass" size={20} color={colors.textSecondary} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search members..."
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
                    selectedFilter === filter.key && styles.filterButtonActive,
                    filter.key === 'special' && styles.specialFilterButton,
                    filter.key === 'special' && selectedFilter === filter.key && styles.specialFilterButtonActive
                  ]}
                  onPress={() => setSelectedFilter(filter.key)}
                >
                  <Text style={[
                    styles.filterButtonText,
                    selectedFilter === filter.key && styles.filterButtonTextActive,
                    filter.key === 'special' && styles.specialFilterButtonText,
                    filter.key === 'special' && selectedFilter === filter.key && styles.specialFilterButtonTextActive
                  ]}>
                    {filter.label} ({filter.count})
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Special Ranks Highlight */}
          {selectedFilter === 'all' && (
            <View style={styles.specialRanksHighlight}>
              <View style={styles.specialRanksHeader}>
                <IconSymbol name="star.fill" size={24} color="#FFD700" />
                <Text style={styles.specialRanksTitle}>Special Ranks</Text>
                <Pressable 
                  style={styles.viewAllButton}
                  onPress={() => setSelectedFilter('special')}
                >
                  <Text style={styles.viewAllText}>View All</Text>
                  <IconSymbol name="chevron.right" size={16} color={colors.primary} />
                </Pressable>
              </View>
              <Text style={styles.specialRanksSubtitle}>
                Officers, Majors, Captains, Lieutenants, Sergeants, and Advisors
              </Text>
            </View>
          )}

          {/* Roster List */}
          <View style={styles.rosterSection}>
            <Text style={styles.sectionTitle}>
              {filteredRoster.length} Member{filteredRoster.length !== 1 ? 's' : ''}
              {searchQuery && ` matching "${searchQuery}"`}
              {selectedFilter === 'special' && ' with Special Ranks'}
            </Text>

            {sortedRoster.length > 0 ? (
              sortedRoster.map((explorer) => (
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
                    ? `No members found matching "${searchQuery}"`
                    : selectedFilter === 'special'
                    ? 'No members with special ranks found'
                    : 'No members found'
                  }
                </Text>
              </View>
            )}
          </View>

          {/* Leadership Section - Only show if not filtering by special ranks */}
          {selectedFilter !== 'special' && (
            <View style={styles.leadershipSection}>
              <Text style={styles.sectionTitle}>Command Structure</Text>
              {roster
                .filter(explorer => isSpecialRank(explorer.rank))
                .sort((a, b) => {
                  const rankOrder = ['Major', 'Captain', 'Lieutenant', 'Sgt', 'Officer', 'Advisor'];
                  const aRankIndex = rankOrder.findIndex(rank => a.rank.toLowerCase().includes(rank.toLowerCase()));
                  const bRankIndex = rankOrder.findIndex(rank => b.rank.toLowerCase().includes(rank.toLowerCase()));
                  return aRankIndex - bRankIndex;
                })
                .map((leader) => (
                  <View key={leader.id} style={styles.leaderCard}>
                    <IconSymbol 
                      name={leader.rank.toLowerCase().includes('major') ? 'star.square.fill' :
                            leader.rank.toLowerCase().includes('captain') ? 'star.fill' :
                            leader.rank.toLowerCase().includes('lieutenant') ? 'shield.fill' :
                            leader.rank.toLowerCase().includes('officer') ? 'person.badge.fill' :
                            leader.rank.toLowerCase().includes('sgt') ? 'chevron.up.square.fill' :
                            'graduationcap.fill'} 
                      size={24} 
                      color={leader.rank.toLowerCase().includes('major') ? '#FFD700' :
                             leader.rank.toLowerCase().includes('captain') ? '#FF6B35' :
                             leader.rank.toLowerCase().includes('lieutenant') ? '#4A90E2' :
                             leader.rank.toLowerCase().includes('officer') ? '#50C878' :
                             leader.rank.toLowerCase().includes('sgt') ? '#9B59B6' :
                             '#E74C3C'} 
                    />
                    <View style={styles.leaderInfo}>
                      <Text style={styles.leaderName}>{leader.name}</Text>
                      <Text style={[styles.leaderRank, {
                        color: leader.rank.toLowerCase().includes('major') ? '#FFD700' :
                               leader.rank.toLowerCase().includes('captain') ? '#FF6B35' :
                               leader.rank.toLowerCase().includes('lieutenant') ? '#4A90E2' :
                               leader.rank.toLowerCase().includes('officer') ? '#50C878' :
                               leader.rank.toLowerCase().includes('sgt') ? '#9B59B6' :
                               '#E74C3C'
                      }]}>{leader.rank}</Text>
                    </View>
                    <Pressable onPress={() => handleExplorerPress(leader.id)}>
                      <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
                    </Pressable>
                  </View>
                ))
              }
            </View>
          )}
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
  specialStatCard: {
    flex: 1,
    backgroundColor: '#FFFEF7',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
    boxShadow: '0px 4px 12px rgba(255, 215, 0, 0.3)',
    elevation: 6,
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
  specialFilterButton: {
    backgroundColor: '#FFFEF7',
    borderColor: '#FFD700',
  },
  specialFilterButtonActive: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  filterButtonTextActive: {
    color: colors.card,
  },
  specialFilterButtonText: {
    color: '#B8860B',
    fontWeight: '600',
  },
  specialFilterButtonTextActive: {
    color: '#000',
    fontWeight: '700',
  },
  specialRanksHighlight: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#FFFEF7',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  specialRanksHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  specialRanksTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#B8860B',
    marginLeft: 8,
    flex: 1,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  specialRanksSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
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
    fontWeight: '700',
    marginTop: 2,
  },
});
