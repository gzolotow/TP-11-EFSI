import { Pressable, StyleSheet, Text, View } from 'react-native';

/** Ticket presentacional: recibe todos los datos por props. */
export default function TicketConfirmacion({ datos, onNuevaInscripcion }) {
  return (
    <View style={styles.card}>
      <View style={styles.iconCircle}>
        <Text style={styles.check}>✓</Text>
      </View>
      <Text style={styles.eyebrow}>SONIDO SUR · 2026</Text>
      <Text style={styles.title}>¡Ya tenés tu lugar!</Text>
      <Text style={styles.subtitle}>Tu inscripción quedó confirmada.</Text>

      <View style={styles.divider} />
      <Dato label="NOMBRE" value={datos.nombreCompleto} />
      <Dato label="EMAIL" value={datos.email} />
      <Dato label="EDAD" value={`${datos.edad} años`} />
      <Dato label="ENTRADA" value={datos.tipoEntrada === 'vip' ? 'VIP' : 'General'} accent />
      {datos.telefono ? <Dato label="TELÉFONO" value={datos.telefono} /> : null}
      <View style={styles.divider} />
      <Text style={styles.ticketCode}>SS · {datos.email.split('@')[0].toUpperCase()}</Text>

      <Pressable onPress={onNuevaInscripcion} style={styles.button} accessibilityRole="button">
        <Text style={styles.buttonText}>Volver a inscribir a otra persona</Text>
      </Pressable>
    </View>
  );
}

function Dato({ label, value, accent }) {
  return (
    <View style={styles.dataRow}>
      <Text style={styles.dataLabel}>{label}</Text>
      <Text style={[styles.dataValue, accent && styles.accent]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1B1C24',
    borderColor: '#3C3546',
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
  },
  iconCircle: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#302239',
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    marginBottom: 18,
    width: 60,
  },
  check: { color: '#E5AEFF', fontSize: 30, fontWeight: '700' },
  eyebrow: { color: '#D98CFF', fontSize: 11, fontWeight: '800', letterSpacing: 2, textAlign: 'center' },
  title: { color: '#FFFFFF', fontSize: 27, fontWeight: '800', marginTop: 8, textAlign: 'center' },
  subtitle: { color: '#AAA9B4', fontSize: 14, marginTop: 6, textAlign: 'center' },
  divider: { borderBottomColor: '#393943', borderBottomWidth: 1, marginVertical: 21 },
  dataRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 },
  dataLabel: { color: '#8F8E9A', fontSize: 10, fontWeight: '700', letterSpacing: 1.2 },
  dataValue: { color: '#F5F3F7', fontSize: 14, fontWeight: '600', maxWidth: '65%', textAlign: 'right' },
  accent: { color: '#E5AEFF', textTransform: 'uppercase' },
  ticketCode: { color: '#8F8E9A', fontSize: 12, letterSpacing: 2, textAlign: 'center' },
  button: {
    alignItems: 'center',
    borderColor: '#D98CFF',
    borderRadius: 13,
    borderWidth: 1,
    marginTop: 25,
    minHeight: 50,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  buttonText: { color: '#E5AEFF', fontSize: 14, fontWeight: '700', textAlign: 'center' },
});
