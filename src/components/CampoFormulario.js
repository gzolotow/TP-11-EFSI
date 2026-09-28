import { StyleSheet, Text, TextInput, View } from 'react-native';

/** Campo de texto reutilizable con etiqueta y mensaje de validación. */
export default function CampoFormulario({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  placeholder,
  keyboardType = 'default',
  autoCapitalize = 'none',
  maxLength,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor="#777985"
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        maxLength={maxLength}
        style={[styles.input, error && styles.inputError]}
        accessibilityLabel={label}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 18 },
  label: { color: '#F2F0F5', fontSize: 14, fontWeight: '600', marginBottom: 8 },
  input: {
    backgroundColor: '#1B1C24',
    borderColor: '#343641',
    borderRadius: 12,
    borderWidth: 1,
    color: '#FFFFFF',
    fontSize: 16,
    minHeight: 52,
    paddingHorizontal: 15,
  },
  inputError: { borderColor: '#FF6B74' },
  error: { color: '#FF858B', fontSize: 12, marginTop: 6 },
});
