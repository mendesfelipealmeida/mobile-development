import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { store } from './src/store/store';
import LoginScreen from './src/screens/LoginScreen';
import ProductListScreen from './src/screens/ProductListScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';

function RootNavigator() {
  const user = useSelector((state) => state.auth.user);
  const [selectedProductId, setSelectedProductId] = useState(null);

  if (!user) {
    return <LoginScreen />;
  }

  if (selectedProductId) {
    return (
      <ProductDetailScreen
        productId={selectedProductId}
        onBack={() => setSelectedProductId(null)}
      />
    );
  }

  return <ProductListScreen onOpenProduct={setSelectedProductId} />;
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#f7f4ef" />
        <RootNavigator />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f4ef',
  },
});
