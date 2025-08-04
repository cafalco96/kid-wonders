# 🌈 Wonder Kids

**Wonder Kids** es una aplicación móvil inclusiva diseñada para ayudar a niños con parálisis cerebral infantil (PCI) a **comunicarse de forma accesible** usando pictogramas, colores diferenciados, audio, vibración y una interfaz simple e intuitiva.

---

## 🚀 Características principales

- ⏳ **Pantalla de inicio animada (Splash)** que muestra el logo por 3 segundos.
- 🧠 **Pantalla principal** con dos opciones:  
  - **Emociones** (con icono y color distintivo)  
  - **Necesidades** (con icono y color distinto)
- 🖼️ **Pantalla de pictogramas** según la categoría elegida:
  - Botones grandes en **rejilla 2x3** para facilitar el acceso.
  - **Texto grande** y pictograma claro (alto contraste).
  - Al tocar:  
    - 🗣️ Reproduce audio (5 segundos)  
    - 🔤 Muestra texto en pantalla completa  
    - 📳 Vibra ligeramente (feedback háptico)
- 🎨 **Colores bien diferenciados** para facilitar la elección.
- ♿ **Modo accesible** (un solo toque) para usuarios con dificultades motoras.

---

## 🛠️ Tecnologías utilizadas

- [Expo](https://expo.dev/) (con `expo-router`)
- React Native
- TypeScript
- API de pictogramas [ARASAAC](https://arasaac.org/)
- Accesibilidad integrada (vibración, contraste, texto grande, etc.)

---

### 📦 Requisitos previos

- Tener instalado **Node.js** y **npm** o **yarn**

# Clona el repositorio
git clone https://github.com/cafalco96/kid-wonders

cd wonder-kids

# Instala dependencias
npm install
# o
yarn install

# Inicia el servidor de desarrollo de Expo
npx expo start

# Ejecutar con emulador o dispositivo conectado
npx expo start --android
npx expo start --ios

# Limpiar caché (si hay errores raros)
npx expo start --clear

# Crear build para producción (requiere EAS)
npx expo export
