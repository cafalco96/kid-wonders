import React from "react";
import { Button, ButtonProps } from "react-native";
import { useOneTap } from "@/hooks/useOneTap";

type Props = ButtonProps & { lockMs?: number };

export default function OneTapButton({ onPress, lockMs = 800, disabled, ...rest }: Props) {
  const { onPress: safePress, locked } = useOneTap(onPress as any, lockMs);
  return <Button onPress={safePress} disabled={disabled || locked} {...rest} />;
}
