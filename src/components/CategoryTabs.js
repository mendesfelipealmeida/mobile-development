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
  wrapper: { paddingHorizontal: 16, paddingBottom: 12 },
  segmented: { flexDirection: 'row', backgroundColor: '#ebe4da', borderRadius: 8, padding: 4, marginBottom: 12 },
  tabButton: { flex: 1, minHeight: 42, alignItems: 'center', justifyContent: 'center', borderRadius: 6 },
  tabButtonActive: { backgroundColor: '#1d6f65' },
  tabText: { color: '#536158', fontWeight: '700' },
  tabTextActive: { color: '#fff' },
  chips: { gap: 8, paddingRight: 16 },
  chip: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 6, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e1d7ca' },
  chipActive: { backgroundColor: '#26352d', borderColor: '#26352d' },
  chipText: { color: '#526056', fontWeight: '600' },
  chipTextActive: { color: '#fff' },
});
