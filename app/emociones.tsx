import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { getArasaacImageUrl } from '../utils/arasaac';

const emotions = [
  { id: 13354, name: "Feliz", color: "#FFD54F" },
  { id: 35545, name: "Triste", color: "#64B5F6" },
  { id: 35567, name: "Enojado", color: "#E57373" },
  { id: 35529, name: "Sorprendido", color: "#BA68C8" },
  { id: 35535, name: "Asustado", color: "#4DD0E1" },
  { id: 35537, name: "Cansado", color: "#A1887F" },
  { id: 35531, name: "Aburrido", color: "#90A4AE" },
  { id: 30391, name: "Nervioso", color: "#FF8A65" },
  { id: 30620, name: "Adolorido", color: "#F06292" },
  { id: 38481, name: "Enfermo", color: "#81C784" },
  { id: 38050, name: "Tranquilo", color: "#4DB6AC" },
  { id: 6992, name: "Confundido", color: "#7986CB" },
];

export default function Screen1() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const handleEmotionPress = (emotion: { id: number; name: string; color: string }) => {
    console.log(`Emoción seleccionada: ${emotion.name}`);
    //Lógica de boton para que vaya al modal
  };

  const isTwoColumns = width >= 350;

  const emotionPairs = [];
  for (let i = 0; i < emotions.length; i += 2) {
    emotionPairs.push([emotions[i], emotions[i + 1]].filter(Boolean));
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.title, { fontSize: isTwoColumns ? 44 : 38 }]}>¿Cómo te sientes?</Text>
        {emotionPairs.map((pair, pairIndex) => (
          <View
            key={pairIndex}
            style={[
              styles.emotionRow,
              { flexDirection: isTwoColumns ? 'row' : 'column', alignItems: 'center' },
            ]}
          >
            {pair.map((emotion) => (
              <TouchableOpacity
                key={emotion.id}
                style={[
                  styles.emotionContainer,
                  {
                    backgroundColor: emotion.color,
                    width: isTwoColumns ? '45%' : '90%',
                    marginBottom: isTwoColumns ? 0 : 20,
                  },
                ]}
                onPress={() => handleEmotionPress(emotion)}
                accessible={true}
                accessibilityLabel={`Emoción: ${emotion.name}`}
                accessibilityRole="button"
              >
                <Image
                  source={{ uri: getArasaacImageUrl(emotion.id) }}
                  style={[styles.emotionImage, { width: isTwoColumns ? 125 : 100, height: isTwoColumns ? 125 : 100 }]}
                  resizeMode="contain"
                />
                <Text style={styles.emotionText}>{emotion.name}</Text>
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
