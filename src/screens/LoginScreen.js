import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  function handleLogin() {
    const nextErrors = {};
    if (name.trim().length < 2) nextErrors.name = 'Informe seu nome.';
    if (!email.includes('@') || !email.includes('.')) nextErrors.email = 'Informe um e-mail válido.';
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      dispatch(login({ name: name.trim(), email: email.trim() }));
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.kicker}>Catálogo Interativo</Text>
        <Text style={styles.title}>Acesse sua loja online</Text>
        <Text style={styles.subtitle}>Explore produtos masculinos e femininos por categoria.</Text>
      </View>
      <View style={styles.panel}>
        <Text style={styles.formTitle}>Acesso</Text>
        <Text style={styles.label}>Nome</Text>
        <TextInput style={[styles.input, errors.name && styles.inputError]} value={name} onChangeText={setName} placeholder="Seu nome" placeholderTextColor="#8a97a8" autoCapitalize="words" />
        {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}
        <Text style={styles.label}>E-mail</Text>
        <TextInput style={[styles.input, errors.email && styles.inputError]} value={email} onChangeText={setEmail} placeholder="seuemail@exemplo.com" placeholderTextColor="#8a97a8" autoCapitalize="none" keyboardType="email-address" />
        {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f3f7fb' },
  header: { marginBottom: 22 },
  kicker: { color: '#0f4c81', fontSize: 13, fontWeight: '800', textTransform: 'uppercase', marginBottom: 8 },
  title: { color: '#102a43', fontSize: 30, fontWeight: '900', lineHeight: 36, marginBottom: 8 },
  subtitle: { color: '#52606d', fontSize: 15, lineHeight: 22 },
  panel: { backgroundColor: '#fff', borderRadius: 8, padding: 22, borderWidth: 1, borderColor: '#d9e2ec' },
  formTitle: { color: '#102a43', fontSize: 20, fontWeight: '800', marginBottom: 18 },
  label: { color: '#334e68', fontSize: 14, fontWeight: '700', marginBottom: 8 },
  input: { minHeight: 50, borderWidth: 1, borderColor: '#bcccdc', borderRadius: 6, paddingHorizontal: 12, marginBottom: 8, backgroundColor: '#f8fbff', color: '#102a43' },
  inputError: { borderColor: '#c2410c', backgroundColor: '#fff7ed' },
  error: { color: '#c2410c', marginBottom: 10, fontSize: 12 },
  button: { minHeight: 50, marginTop: 12, borderRadius: 6, backgroundColor: '#0f4c81', alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});
