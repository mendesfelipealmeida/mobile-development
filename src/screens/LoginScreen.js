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
    if (!email.includes('@') || !email.includes('.')) nextErrors.email = 'Informe um e-mail valido.';
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      dispatch(login({ name: name.trim(), email: email.trim() }));
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <View style={styles.panel}>
        <Text style={styles.kicker}>Catalogo Interativo</Text>
        <Text style={styles.title}>Entre para acessar os produtos</Text>
        <Text style={styles.label}>Nome</Text>
        <TextInput style={[styles.input, errors.name && styles.inputError]} value={name} onChangeText={setName} placeholder="Seu nome" autoCapitalize="words" />
        {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}
        <Text style={styles.label}>E-mail</Text>
        <TextInput style={[styles.input, errors.email && styles.inputError]} value={email} onChangeText={setEmail} placeholder="seuemail@exemplo.com" autoCapitalize="none" keyboardType="email-address" />
        {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f7f4ef' },
  panel: { backgroundColor: '#fff', borderRadius: 8, padding: 22, borderWidth: 1, borderColor: '#e4dbcf' },
  kicker: { color: '#1d6f65', fontSize: 13, fontWeight: '800', textTransform: 'uppercase', marginBottom: 8 },
  title: { color: '#1f2a24', fontSize: 26, fontWeight: '800', lineHeight: 32, marginBottom: 24 },
  label: { color: '#39443d', fontSize: 14, fontWeight: '700', marginBottom: 8 },
  input: { minHeight: 48, borderWidth: 1, borderColor: '#d9cec0', borderRadius: 6, paddingHorizontal: 12, marginBottom: 8, backgroundColor: '#fffdf9' },
  inputError: { borderColor: '#b42318' },
  error: { color: '#b42318', marginBottom: 10, fontSize: 12 },
  button: { minHeight: 50, marginTop: 12, borderRadius: 6, backgroundColor: '#1d6f65', alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});
