// app/necesidades.tsx
import { useRouter } from "expo-router";
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Lista de necesidades básicas con sus IDs de ARASAAC
const needs = [
  { id: 28413, name: "Comida" },
  { id: 6061, name: "Agua" },
  { id: 7257, name: "Dormir" },
  { id: 16709, name: "Baño" },
  { id: 6627, name: "Cambio de Ropa" },
  { id: 19524, name: "Ayuda" },
  { id: 34569, name: "Abrigo" },
  { id: 6537, name: "Jugar" },
  { id: 37799, name: "Atención" },
  { id: 25083, name: "Sentarse" },
];

export default function Screen1() {
  const router = useRouter();

  // Función para obtener la URL de la imagen de ARASAAC
  const getArasaacImageUrl = (id: number) => {
    return `https://static.arasaac.org/pictograms/${id}/${id}_300.png`;
  };

  // Función para manejar la selección de una necesidad
  const handleNeedPress = (need: { id: number; name: string }) => {
    console.log(`Necesidad seleccionada: ${need.name}`);
    // Aquí puedes agregar la lógica para manejar la selección
  };

  // Crear pares de necesidades para mostrar en columnas
  const needPairs = [];
  for (let i = 0; i < needs.length; i += 2) {
    needPairs.push([needs[i], needs[i + 1]].filter(Boolean));
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>¿Qué necesitas?</Text>
        
        {needPairs.map((pair, pairIndex) => (
          <View key={pairIndex} style={styles.emotionRow}>
            {pair.map((need) => (
              <TouchableOpacity
                key={need.id}
                style={styles.emotionContainer}
                onPress={() => handleNeedPress(need)}
                accessible={true}
                accessibilityLabel={`Necesidad: ${need.name}`}
                accessibilityRole="button"
              >
                <Image
                  source={{ uri: getArasaacImageUrl(need.id) }}
                  style={styles.emotionImage}
                  resizeMode="contain"
                />
                <Text style={styles.emotionText}>{need.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        
        <View style={styles.buttonContainer}>
          <Button title="Volver" onPress={() => router.back()} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  emotionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  emotionContainer: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '45%',
    minHeight: 150,
    justifyContent: 'center',
  },
  emotionImage: {
    width: 125,
    height: 125,
    marginBottom: 10,
  },
  emotionText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 30,
    width: '100%',
  },
});