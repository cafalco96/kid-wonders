import React, { useEffect, useMemo, useRef } from "react";
import { Modal, View, Text, Image, Pressable, AccessibilityInfo, Animated, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import * as Speech from "expo-speech";
import { Ionicons } from "@expo/vector-icons";

type PictogramModalProps = {
  visible: boolean;
  /** Frase a pronunciar y mostrar, ej: "Estoy Feliz" */
  label: string;
  /** Fuente de la imagen (require(...) o { uri }) */
  imageSource: any;
  /** Cerrar modal */
  onClose: () => void;
  /** milisegundos para autocierre (default 5000) */
  autoCloseMs?: number;
  /** leer en voz alta al abrir (default true) */
  speakOnOpen?: boolean;
  /** idioma para TTS (default "es-ES") */
  speechLang?: string;
};

export default function PictogramModal({
  visible,
  label,
  imageSource,
  onClose,
  autoCloseMs = 5000,
  speakOnOpen = true,
  speechLang = "es-ES",
}: PictogramModalProps) {
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.95)).current;
  const announcement = useMemo(() => ` ${label}`, [label]); // evita recálculos

  useEffect(() => {
    if (!visible) return;

    // animación
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 220, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
    ]).start();

    // háptica sutil
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft).catch(() => {});

    // focus + anuncio de accesibilidad
    AccessibilityInfo.announceForAccessibility?.(announcement);

    // speech
    if (speakOnOpen) {
      Speech.stop();
      Speech.speak(label, {
        language: speechLang,
        pitch: 1.0,
        rate: 1.0,
      });
    }

    // autocierre
    const t = setTimeout(() => {
      handleClose();
    }, autoCloseMs);

    return () => {
      clearTimeout(t);
      Speech.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, label]);

  const handleClose = () => {
    Animated.timing(fade, { toValue: 0, duration: 180, useNativeDriver: true }).start(({ finished }) => {
      if (finished) onClose();
    });
  };

  if (!visible) return null;

  return (
    <Modal
      animationType="none"
      transparent
      visible={visible}
      onRequestClose={handleClose}
      statusBarTranslucent
      presentationStyle="overFullScreen"
      accessibilityViewIsModal
    >
      <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />

      {/* Capa para cerrar al tocar fuera (segura para lectores) */}
      <Pressable
        style={styles.backdropTouch}
        onPress={handleClose}
        accessibilityLabel="Cerrar"
        accessibilityHint="Cierra el mensaje actual"
        accessibilityRole="button"
      />

      <Animated.View
        style={[
          styles.card,
          {
            opacity: fade,
            transform: [{ scale }],
          },
        ]}
        accessible
        accessibilityRole="alert"
        accessibilityLabel={`Mensaje: ${label}`}
        accessibilityHint="Se cerrará automáticamente"
      >
        {/* botón cerrar */}
        <Pressable
          onPress={handleClose}
          accessibilityRole="button"
          accessibilityLabel="Cerrar"
          style={styles.closeBtn}
          hitSlop={12}
        >
          <Ionicons name="close" size={28} />
        </Pressable>

        {/* pictograma */}
        <Image
          source={imageSource}
          style={styles.image}
          resizeMode="contain"
          accessibilityIgnoresInvertColors
        />

        {/* texto grande */}
        <Text
          style={styles.title}
          accessibilityRole="header"
          maxFontSizeMultiplier={1.6}
        >
          {label}
        </Text>

        {/* mic icono decorativo (no anunciamos a lectores) */}
        <Ionicons
          name="mic-outline"
          size={26}
          style={{ marginTop: 8, opacity: 0.8 }}
          accessibilityElementsHidden
          importantForAccessibility="no"
        />
        <Text style={styles.caption} accessibilityElementsHidden importantForAccessibility="no">
          Se cerrará en {Math.round(autoCloseMs / 1000)} s
        </Text>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdropTouch: {
    ...StyleSheet.absoluteFillObject,
  },
  card: {
    position: "absolute",
    left: 16,
    right: 16,
    top: "18%",
    borderRadius: 24,
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  closeBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    padding: 6,
    borderRadius: 999,
  },
  image: {
    width: 220,
    height: 140,
    marginTop: 20,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: "#F1F1F1",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
  },
  caption: {
    marginTop: 4,
    fontSize: 12,
    opacity: 0.6,
  },
});
