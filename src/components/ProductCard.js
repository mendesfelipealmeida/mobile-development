import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { formatDiscount, formatUsdPrice, getProductPresentation } from '../data/productPresentation';

export default function ProductCard({ product, onPress }) {
  const presentation = getProductPresentation(product);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="contain" />
      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.title}>{presentation.displayTitle}</Text>
        <Text numberOfLines={2} style={styles.description}>{presentation.displayDescription}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{formatUsdPrice(product.price)}</Text>
          <Text style={styles.discount}>{formatDiscount(product.discountPercentage)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#ffffff', borderRadius: 8, marginHorizontal: 16, marginBottom: 12, padding: 12, borderWidth: 1, borderColor: '#d9e2ec' },
  image: { width: 92, height: 92, borderRadius: 6, backgroundColor: '#eef4fb' },
  info: { flex: 1, marginLeft: 12, justifyContent: 'space-between' },
  title: { color: '#102a43', fontSize: 16, fontWeight: '800', lineHeight: 20 },
  description: { color: '#52606d', fontSize: 13, lineHeight: 18, marginVertical: 6 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  price: { color: '#0f4c81', fontSize: 16, fontWeight: '900' },
  discount: { color: '#0f4c81', fontSize: 12, fontWeight: '800', backgroundColor: '#dbeafe', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
});