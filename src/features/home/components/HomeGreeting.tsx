import { StyleSheet, Text, View } from "react-native";

export interface HomeGreetingProps {
  name: string;
}

export const HomeGreeting = ({ name }: HomeGreetingProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.greetingSub}>GOOD MORNING, {name.toUpperCase()}</Text>
      <Text style={styles.greetingTitle}>TRAIN</Text>
      <Text style={styles.greetingTitle}>TODAY</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 28,
  },
  greetingSub: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 2.5,
    fontFamily: "monospace",
    marginBottom: 8,
  },
  greetingTitle: {
    color: "#FFFFFF",
    fontSize: 42,
    lineHeight: 44,
    fontWeight: "900",
    letterSpacing: -0.5,
    textShadowColor: "rgba(56, 237, 216, 0.7)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
});
