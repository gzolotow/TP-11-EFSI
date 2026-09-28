import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Controller } from 'react-hook-form';
import CampoFormulario from './CampoFormulario';

const TIPOS_ENTRADA = ['general', 'vip'];

/** Renderiza los campos; el estado y la validación viven en InscripcionScreen. */
export default function FormularioInscripcion({ control, onSubmit, isValid, isSubmitting }) {
  return (
    <View>
      <Controller
        control={control}
        name="nombreCompleto"
        rules={{
          required: 'Ingresá tu nombre completo',
          validate: (value) => value.trim().length >= 3 || 'Ingresá tu nombre completo',
        }}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <CampoFormulario
            label="Nombre completo"
            placeholder="Ej. Juana Pérez"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize="words"
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Ingresá un email válido',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
            message: 'Ingresá un email válido',
          },
        }}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <CampoFormulario
            label="Email"
            placeholder="tu@email.com"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="email-address"
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="edad"
        rules={{
          required: 'La edad tiene que ser mayor a 12',
          validate: (value) => {
            const age = Number(value);
            return (Number.isInteger(age) && age >= 12 && age <= 99)
              || 'La edad tiene que ser mayor a 12';
          },
        }}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <CampoFormulario
            label="Edad"
            placeholder="12 a 99"
            value={value}
            onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ''))}
            onBlur={onBlur}
            keyboardType="numeric"
            maxLength={2}
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="tipoEntrada"
        rules={{ required: 'Elegí un tipo de entrada' }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <View style={styles.field}>
            <Text style={styles.label}>Tipo de entrada</Text>
            <View style={styles.options}>
              {TIPOS_ENTRADA.map((tipo) => {
                const selected = value === tipo;
                return (
                  <Pressable
                    key={tipo}
                    onPress={() => onChange(tipo)}
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                    style={[styles.option, selected && styles.optionSelected]}
                  >
                    <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                      {tipo === 'vip' ? 'VIP' : 'General'}
                    </Text>
                    <Text style={styles.optionHint}>
                      {tipo === 'vip' ? 'Acceso preferencial' : 'Acceso al festival'}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            {error ? <Text style={styles.error}>{error.message}</Text> : null}
          </View>
        )}
      />

      <Controller
        control={control}
        name="telefono"
        rules={{
          validate: (value) => !value || /^\d+$/.test(value) || 'Solo se permiten números',
        }}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <CampoFormulario
            label="Teléfono (opcional)"
            placeholder="1123456789"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="phone-pad"
            error={error?.message}
          />
        )}
      />

      <Pressable
        onPress={onSubmit}
        disabled={!isValid || isSubmitting}
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.submit,
          (!isValid || isSubmitting) && styles.submitDisabled,
          pressed && isValid && !isSubmitting && styles.submitPressed,
        ]}
      >
        {isSubmitting ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator color="#15131B" size="small" />
            <Text style={styles.submitText}>Enviando inscripción...</Text>
          </View>
        ) : (
          <Text style={styles.submitText}>Confirmar inscripción</Text>
        )}
      </Pressable>
      <Text style={styles.footnote}>Vas a recibir tu entrada en el email indicado.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: 18 },
  label: { color: '#F2F0F5', fontSize: 14, fontWeight: '600', marginBottom: 8 },
  options: { flexDirection: 'row', gap: 10 },
  option: {
    backgroundColor: '#1B1C24',
    borderColor: '#343641',
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    minHeight: 72,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  optionSelected: { backgroundColor: '#2C2036', borderColor: '#D98CFF' },
  optionText: { color: '#F2F0F5', fontSize: 15, fontWeight: '700', textTransform: 'capitalize' },
  optionTextSelected: { color: '#E5AEFF' },
  optionHint: { color: '#A5A5B1', fontSize: 11, marginTop: 4 },
  error: { color: '#FF858B', fontSize: 12, marginTop: 6 },
  submit: {
    alignItems: 'center',
    backgroundColor: '#D98CFF',
    borderRadius: 14,
    justifyContent: 'center',
    marginTop: 4,
    minHeight: 54,
  },
  submitDisabled: { backgroundColor: '#55515C' },
  submitPressed: { opacity: 0.85 },
  submitText: { color: '#17131B', fontSize: 15, fontWeight: '800' },
  loadingRow: { alignItems: 'center', flexDirection: 'row', gap: 10 },
  footnote: { color: '#9A99A4', fontSize: 12, marginTop: 14, textAlign: 'center' },
});
