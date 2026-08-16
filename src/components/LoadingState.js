import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function LoadingState({ message = 'Carregando produtos...' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1d6f65" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', padding: 28, gap: 12 },
  text: { color: '#5f665f', fontSize: 15 },
});
