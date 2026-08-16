import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function ProductCard({ product, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="contain" />
      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.title}>{product.title}</Text>
        <Text numberOfLines={2} style={styles.description}>{product.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>$ {Number(product.price).toFixed(2)}</Text>
          <Text style={styles.discount}>{Math.round(product.discountPercentage)}% OFF</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#ffffff', borderRadius: 8, marginHorizontal: 16, marginBottom: 12, padding: 12, borderWidth: 1, borderColor: '#e7e0d6' },
  image: { width: 92, height: 92, borderRadius: 6, backgroundColor: '#f2eee8' },
  info: { flex: 1, marginLeft: 12, justifyContent: 'space-between' },
  title: { color: '#1f2a24', fontSize: 16, fontWeight: '700', lineHeight: 20 },
  description: { color: '#657067', fontSize: 13, lineHeight: 18, marginVertical: 6 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  price: { color: '#1d6f65', fontSize: 16, fontWeight: '800' },
  discount: { color: '#8a4b12', fontSize: 12, fontWeight: '700', backgroundColor: '#fff0d9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
});
