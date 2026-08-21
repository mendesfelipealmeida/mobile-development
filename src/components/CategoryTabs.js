import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function CategoryTabs({ tabs, activeTab, onChangeTab, activeCategory, onChangeCategory }) {
  const selected = tabs.find((tab) => tab.key === activeTab);

  return (
    <View style={styles.wrapper}>
      <View style={styles.segmented}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.key}
            style={[styles.tabButton, activeTab === tab.key && styles.tabButtonActive]}
            onPress={() => onChangeTab(tab.key)}
          >
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>{tab.label}</Text>
          </Pressable>
        ))}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {selected.categories.map((category) => (
          <Pressable
            key={category.key}
            style={[styles.chip, activeCategory === category.key && styles.chipActive]}
            onPress={() => onChangeCategory(category.key)}
          >
            <Text style={[styles.chipText, activeCategory === category.key && styles.chipTextActive]}>{category.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 12, backgroundColor: '#f3f7fb' },
  segmented: { flexDirection: 'row', backgroundColor: '#d9e2ec', borderRadius: 8, padding: 4, marginBottom: 12 },
  tabButton: { flex: 1, minHeight: 42, alignItems: 'center', justifyContent: 'center', borderRadius: 6 },
  tabButtonActive: { backgroundColor: '#0f4c81' },
  tabText: { color: '#486581', fontWeight: '800' },
  tabTextActive: { color: '#fff' },
  chips: { gap: 8, paddingRight: 16 },
  chip: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 6, backgroundColor: '#fff', borderWidth: 1, borderColor: '#bcccdc' },
  chipActive: { backgroundColor: '#1d6fa5', borderColor: '#1d6fa5' },
  chipText: { color: '#334e68', fontWeight: '700' },
  chipTextActive: { color: '#fff' },
});