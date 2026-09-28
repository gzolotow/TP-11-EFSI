import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from 'react-hook-form';
import FormularioInscripcion from '../components/FormularioInscripcion';
import TicketConfirmacion from '../components/TicketConfirmacion';

const EMAIL_KEY = '@sonido-sur/ultimo-email';
const FORMULARIO_VACIO = {
  nombreCompleto: '',
  email: '',
  edad: '',
  tipoEntrada: '',
  telefono: '',
};

export default function InscripcionScreen() {
  const [ticket, setTicket] = useState(null);
  const { control, handleSubmit, reset, setValue, formState: { isValid, isSubmitting } } = useForm({
    defaultValues: FORMULARIO_VACIO,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  // Recupera el último email al abrir la app. El resto de los campos empiezan vacíos.
  useEffect(() => {
    let activa = true;
    AsyncStorage.getItem(EMAIL_KEY)
      .then((email) => {
        if (activa && email) {
          setValue('email', email, { shouldValidate: true });
        }
      })
      .catch(() => {
        // Si el almacenamiento no está disponible, el formulario sigue funcionando.
      });
    return () => { activa = false; };
  }, [setValue]);

  const confirmarInscripcion = async (datos) => {
    const datosLimpios = {
      ...datos,
      nombreCompleto: datos.nombreCompleto.trim(),
      email: datos.email.trim(),
    };

    // Simula el envío al servidor y conserva el email para la próxima apertura.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      await AsyncStorage.setItem(EMAIL_KEY, datosLimpios.email);
    } catch {
      // Una falla al guardar el email no impide mostrar el ticket confirmado.
    }
    setTicket(datosLimpios);
  };

  const nuevaInscripcion = () => {
    reset(FORMULARIO_VACIO);
    setTicket(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : Platform.OS === 'android' ? 'height' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor="#101116" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
      >
        <View style={styles.content}>
          <View style={styles.brandRow}>
            <View style={styles.brandMark}><Text style={styles.brandIcon}>♫</Text></View>
            <Text style={styles.brand}>SONIDO SUR</Text>
            <Text style={styles.edition}>FESTIVAL · 2026</Text>
          </View>

          {!ticket ? (
            <>
              <Text style={styles.title}>Tu música empieza acá.</Text>
              <Text style={styles.subtitle}>Completá tus datos y asegurá tu lugar en el festival.</Text>
              <View style={styles.formCard}>
                <Text style={styles.sectionTitle}>Inscripción</Text>
                <Text style={styles.requiredHint}>Todos los campos son obligatorios, excepto teléfono.</Text>
                <FormularioInscripcion
                  control={control}
                  onSubmit={handleSubmit(confirmarInscripcion)}
                  isValid={isValid}
                  isSubmitting={isSubmitting}
                />
              </View>
            </>
          ) : (
            <TicketConfirmacion datos={ticket} onNuevaInscripcion={nuevaInscripcion} />
          )}
          <Text style={styles.footer}>BUENOS AIRES · ARGENTINA</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#101116', flex: 1 },
  scrollContent: { alignItems: 'center', flexGrow: 1, paddingHorizontal: 20, paddingVertical: 34 },
  content: { maxWidth: 520, width: '100%' },
  brandRow: { alignItems: 'center', flexDirection: 'row', marginBottom: 34 },
  brandMark: {
    alignItems: 'center',
    backgroundColor: '#302239',
    borderRadius: 11,
    height: 36,
    justifyContent: 'center',
    marginRight: 10,
    width: 36,
  },
  brandIcon: { color: '#E5AEFF', fontSize: 21, fontWeight: '700' },
  brand: { color: '#FFFFFF', fontSize: 14, fontWeight: '800', letterSpacing: 1.5 },
  edition: { color: '#9695A1', fontSize: 10, letterSpacing: 1.1, marginLeft: 'auto' },
  title: { color: '#FFFFFF', fontSize: 31, fontWeight: '800', letterSpacing: -0.8, lineHeight: 38 },
  subtitle: { color: '#AAA9B4', fontSize: 15, lineHeight: 22, marginBottom: 24, marginTop: 8 },
  formCard: {
    backgroundColor: '#16171E',
    borderColor: '#2B2C35',
    borderRadius: 22,
    borderWidth: 1,
    padding: 20,
  },
  sectionTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
  requiredHint: { color: '#93929E', fontSize: 12, lineHeight: 18, marginBottom: 22, marginTop: 5 },
  footer: { color: '#777681', fontSize: 10, fontWeight: '700', letterSpacing: 2, marginTop: 28, textAlign: 'center' },
});
