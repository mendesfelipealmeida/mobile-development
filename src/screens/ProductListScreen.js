import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CategoryTabs from '../components/CategoryTabs';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import ProductCard from '../components/ProductCard';
import { genderTabs } from '../data/categories';
import { getProductsByCategory } from '../services/api';
import { logout } from '../store/authSlice';

export default function ProductListScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState(genderTabs[0].key);
  const [activeCategory, setActiveCategory] = useState(genderTabs[0].categories[0].key);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const activeTabData = useMemo(() => genderTabs.find((tab) => tab.key === activeTab), [activeTab]);

  function handleChangeTab(tabKey) {
    const nextTab = genderTabs.find((tab) => tab.key === tabKey);
    setActiveTab(tabKey);
    setActiveCategory(nextTab.categories[0].key);
  }

  function handleLogout() {
    dispatch(logout());
  }

  async function loadProducts() {
    setLoading(true);
    setError('');
    try {
      const data = await getProductsByCategory(activeCategory);
      setProducts(data);
    } catch (err) {
      setError('Verifique sua conexão e tente novamente. A API usada é https://dummyjson.com.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, [activeCategory]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.greeting}>Olá, {user.name}</Text>
          <Text style={styles.title}>Produtos {activeTabData.label.toLowerCase()}</Text>
        </View>
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </Pressable>
      </View>
      <CategoryTabs tabs={genderTabs} activeTab={activeTab} onChangeTab={handleChangeTab} activeCategory={activeCategory} onChangeCategory={setActiveCategory} />
      {loading ? <LoadingState /> : null}
      {!loading && error ? <ErrorState message={error} onRetry={loadProducts} /> : null}
      {!loading && !error ? (
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <ProductCard product={item} onPress={() => navigation.navigate('ProductDetail', { productId: item.id })} />}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>Nenhum produto encontrado.</Text>}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f7fb' },
  header: { paddingHorizontal: 16, paddingTop: 18, paddingBottom: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 14, backgroundColor: '#0f4c81' },
  headerText: { flex: 1 },
  greeting: { color: '#dbeafe', fontSize: 14, marginBottom: 4 },
  title: { color: '#ffffff', fontSize: 25, lineHeight: 31, fontWeight: '900' },
  logoutButton: { minHeight: 40, paddingHorizontal: 14, borderRadius: 6, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' },
  logoutText: { color: '#0f4c81', fontWeight: '800' },
  list: { paddingTop: 4, paddingBottom: 24 },
  empty: { textAlign: 'center', color: '#52606d', marginTop: 30 },
});