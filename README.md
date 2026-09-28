# Sonido Sur · Inscripción

Aplicación móvil para inscribirse al festival ficticio Sonido Sur, hecha con Expo y React Native.

## Cómo ejecutar

```bash
npm install
npx expo start
```

Escaneá el QR con Expo Go o abrí el proyecto en un emulador. Para web, ejecutá `npx expo start --web`.

## Validación elegida

Usamos React Hook Form (`useForm`, `Controller` y reglas por campo) para mantener los valores y errores del formulario en un único estado controlado y mostrar los errores junto a cada campo.

## Bonus

- El email de la última inscripción se guarda con AsyncStorage y se precarga al abrir la app.
- La confirmación muestra un indicador de envío durante un segundo antes de presentar el ticket.

## Capturas

Guardá las capturas solicitadas en `screenshots/` con estos nombres:

- `formulario-errores.png`
- `formulario-valido.png`
- `ticket.png`

