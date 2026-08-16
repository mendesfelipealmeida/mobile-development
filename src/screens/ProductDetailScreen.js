import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
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
          <Image source={{ uri: product.thumbnail }} resizeMode="contain" style={styles.image} />
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>$ {Number(product.price).toFixed(2)}</Text>
            <Text style={styles.discount}>{Number(product.discountPercentage).toFixed(1)}% de desconto</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Marca</Text>
            <Text style={styles.infoValue}>{product.brand || 'Não informado'}</Text>
            <Text style={styles.infoLabel}>Avaliação</Text>
            <Text style={styles.infoValue}>{product.rating} / 5</Text>
            <Text style={styles.infoLabel}>Estoque</Text>
            <Text style={styles.infoValue}>{product.stock} unidades</Text>
          </View>
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f4ef' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 18, paddingBottom: 14, gap: 14 },
  backButton: { minHeight: 40, paddingHorizontal: 14, borderRadius: 6, backgroundColor: '#26352d', justifyContent: 'center' },
  backText: { color: '#fff', fontWeight: '800' },
  headerTitle: { color: '#1f2a24', fontSize: 22, fontWeight: '800' },
  content: { padding: 16, paddingBottom: 30 },
  image: { width: '100%', height: 280, borderRadius: 8, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e7e0d6', marginBottom: 18 },
  title: { color: '#1f2a24', fontSize: 28, fontWeight: '800', lineHeight: 34, marginBottom: 10 },
  description: { color: '#56635a', fontSize: 16, lineHeight: 23, marginBottom: 18 },
  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 18 },
  price: { color: '#1d6f65', fontSize: 26, fontWeight: '900' },
  discount: { color: '#8a4b12', fontSize: 14, fontWeight: '800', backgroundColor: '#fff0d9', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 6 },
  infoBox: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e7e0d6', borderRadius: 8, padding: 16 },
  infoLabel: { color: '#718074', fontSize: 12, fontWeight: '800', textTransform: 'uppercase', marginTop: 8 },
  infoValue: { color: '#26352d', fontSize: 16, fontWeight: '700', marginTop: 3 },
});