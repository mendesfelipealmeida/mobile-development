import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ErrorState({ message, onRetry }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nao foi possivel carregar</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Tentar novamente</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { margin: 18, padding: 18, borderRadius: 8, backgroundColor: '#fff5f2', borderWidth: 1, borderColor: '#ffd4c8' },
  title: { fontSize: 17, fontWeight: '700', color: '#9a3412', marginBottom: 6 },
  message: { fontSize: 14, color: '#6f4a3b', marginBottom: 14, lineHeight: 20 },
  button: { alignSelf: 'flex-start', backgroundColor: '#9a3412', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 6 },
  buttonText: { color: '#fff', fontWeight: '700' },
});
