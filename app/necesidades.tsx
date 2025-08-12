import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { getArasaacImageUrl } from '../utils/arasaac';

const needs = [
  { id: 28413, name: "Comida", color: "#FFCC80" },
  { id: 6061, name: "Agua", color: "#4FC3F7" },
  { id: 7257, name: "Dormir", color: "#9575CD" },
  { id: 16709, name: "Baño", color: "#4DB6AC" },
  { id: 6627, name: "Cambio de Ropa", color: "#F06292" },
  { id: 19524, name: "Ayuda", color: "#90A4AE" },
  { id: 34569, name: "Abrigo", color: "#A1887F" },
  { id: 6537, name: "Jugar", color: "#FFD54F" },
  { id: 37799, name: "Atención", color: "#81C784" },
  { id: 25083, name: "Sentarse", color: "#FF8A65" },
];

export default function Screen1() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const handleNeedPress = (need: { id: number; name: string; color: string }) => {
    console.log(`Necesidad seleccionada: ${need.name}`);
    // Lógica para modal
  };

  const isLargeScreen = width >= 350;

  const needPairs = [];
  for (let i = 0; i < needs.length; i += 2) {
    needPairs.push([needs[i], needs[i + 1]].filter(Boolean));
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.title, { fontSize: isLargeScreen ? 44 : 38 }]}>¿Qué necesitas?</Text>
        {needPairs.map((pair, pairIndex) => (
          <View
            key={pairIndex}
            style={[
              styles.emotionRow,
              { flexDirection: isLargeScreen ? 'row' : 'column', alignItems: 'center' },
            ]}
          >
            {pair.map((need) => (
              <TouchableOpacity
                key={need.id}
                style={[
                  styles.emotionContainer,
                  {
                    backgroundColor: need.color,
                    width: isLargeScreen ? '45%' : '90%',
                    marginBottom: isLargeScreen ? 0 : 20,
                  },
                ]}
                onPress={() => handleNeedPress(need)}
                accessible={true}
                accessibilityLabel={`Necesidad: ${need.name}`}
                accessibilityRole="button"
              >
                <Image
                  source={{ uri: getArasaacImageUrl(need.id) }}
                  style={[styles.emotionImage, { width: isLargeScreen ? 125 : 100, height: isLargeScreen ? 125 : 100 }]}
                  resizeMode="contain"
                />
                <Text style={styles.emotionText}>{need.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
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
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  emotionRow: {
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  emotionContainer: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minHeight: 150,
    justifyContent: 'center',
  },
  emotionImage: {
    marginBottom: 10,
  },
  emotionText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginTop: 5,
  },
});