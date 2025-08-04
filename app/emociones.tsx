// app/emociones.tsx
import { useRouter } from "expo-router";
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Lista de emociones con sus IDs de ARASAAC
const emotions = [
  { id: 13354, name: "Feliz" },
  { id: 35545, name: "Triste" },
  { id: 35567, name: "Enojado" },
  { id: 35529, name: "Sorprendido" },
  { id: 35535, name: "Asustado" },
  { id: 35537, name: "Cansado" },
  { id: 35531, name: "Aburrido" },
  { id: 30391, name: "Nervioso" },
  { id: 30620, name: "Adolorido" },
  { id: 38481, name: "Enfermo" },
  { id: 38050, name: "Tranquilo" },
  { id: 6992, name: "Confundido" },
];

export default function Screen1() {
  const router = useRouter();

  // Función para obtener la URL de la imagen de ARASAAC
  const getArasaacImageUrl = (id: number) => {
    return `https://api.arasaac.org/v1/pictograms/${id}`;
  };

  // Función para manejar la selección de una emoción
  const handleEmotionPress = (emotion: { id: number; name: string }) => {
    console.log(`Emoción seleccionada: ${emotion.name}`);
    // Aquí puedes agregar la lógica para manejar la selección
  };

  // Crear pares de emociones para mostrar en columnas
  const emotionPairs = [];
  for (let i = 0; i < emotions.length; i += 2) {
    emotionPairs.push([emotions[i], emotions[i + 1]].filter(Boolean));
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>¿Cómo te sientes?</Text>
        
        {emotionPairs.map((pair, pairIndex) => (
          <View key={pairIndex} style={styles.emotionRow}>
            {pair.map((emotion) => (
              <TouchableOpacity
                key={emotion.id}
                style={styles.emotionContainer}
                onPress={() => handleEmotionPress(emotion)}
                accessible={true}
                accessibilityLabel={`Emoción: ${emotion.name}`}
                accessibilityRole="button"
              >
                <Image
                  source={{ uri: getArasaacImageUrl(emotion.id) }}
                  style={styles.emotionImage}
                  resizeMode="contain"
                />
                <Text style={styles.emotionText}>{emotion.name}</Text>
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