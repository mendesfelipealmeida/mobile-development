import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ErrorState({ message, onRetry }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Não foi possível carregar</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Tentar novamente</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { margin: 18, padding: 18, borderRadius: 8, backgroundColor: '#fff7ed', borderWidth: 1, borderColor: '#fed7aa' },
  title: { fontSize: 17, fontWeight: '800', color: '#c2410c', marginBottom: 6 },
  message: { fontSize: 14, color: '#7c2d12', marginBottom: 14, lineHeight: 20 },
  button: { alignSelf: 'flex-start', backgroundColor: '#0f4c81', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 6 },
  buttonText: { color: '#fff', fontWeight: '800' },
});