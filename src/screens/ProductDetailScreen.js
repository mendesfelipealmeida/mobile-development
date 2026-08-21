import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import { formatDiscount, formatUsdPrice, getProductPresentation } from '../data/productPresentation';
import { getProductById } from '../services/api';

export default function ProductDetailScreen({ navigation, route }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadProduct() {
    setLoading(true);
    setError('');
    try {
      const data = await getProductById(productId);
      setProduct(data);
    } catch (err) {
      setError('Não foi possível abrir os detalhes deste produto.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const presentation = product ? getProductPresentation(product) : null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Voltar</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Detalhes</Text>
      </View>
      {loading ? <LoadingState message="Carregando detalhes..." /> : null}
      {!loading && error ? <ErrorState message={error} onRetry={loadProduct} /> : null}
      {!loading && product ? (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.imagePanel}>
            <Image source={{ uri: product.thumbnail }} resizeMode="contain" style={styles.image} />
          </View>
          <Text style={styles.title}>{presentation.displayTitle}</Text>
          <Text style={styles.description}>{presentation.displayDescription}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatUsdPrice(product.price)}</Text>
            <Text style={styles.discount}>{formatDiscount(product.discountPercentage, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</Text>
          </View>
          <View style={styles.infoBox}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Marca</Text>
              <Text style={styles.infoValue}>{product.brand || 'Não informado'}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Avaliação</Text>
              <Text style={styles.infoValue}>{product.rating} / 5</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Estoque</Text>
              <Text style={styles.infoValue}>{product.stock} unidades</Text>
            </View>
          </View>
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f7fb' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 18, paddingBottom: 16, gap: 14, backgroundColor: '#0f4c81' },
  backButton: { minHeight: 40, paddingHorizontal: 14, borderRadius: 6, backgroundColor: '#ffffff', justifyContent: 'center' },
  backText: { color: '#0f4c81', fontWeight: '800' },
  headerTitle: { color: '#ffffff', fontSize: 22, fontWeight: '900' },
  content: { padding: 16, paddingBottom: 30 },
  imagePanel: { width: '100%', height: 280, borderRadius: 8, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#d9e2ec', marginBottom: 18, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: '100%' },
  title: { color: '#102a43', fontSize: 28, fontWeight: '900', lineHeight: 34, marginBottom: 10 },
  description: { color: '#52606d', fontSize: 16, lineHeight: 23, marginBottom: 18 },
  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 18 },
  price: { color: '#0f4c81', fontSize: 26, fontWeight: '900' },
  discount: { color: '#0f4c81', fontSize: 14, fontWeight: '800', backgroundColor: '#dbeafe', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 6 },
  infoBox: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#d9e2ec', borderRadius: 8, padding: 16 },
  infoItem: { paddingVertical: 6 },
  infoLabel: { color: '#627d98', fontSize: 12, fontWeight: '800', textTransform: 'uppercase', marginBottom: 3 },
  infoValue: { color: '#102a43', fontSize: 16, fontWeight: '700' },
});