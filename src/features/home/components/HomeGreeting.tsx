import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "lucide-react-native";

export interface HomeGreetingProps {
  name: string;
}

export const HomeGreeting = ({ name }: HomeGreetingProps) => {
  const formattedDate = new Date()
    .toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();

  return (
    <View style={styles.container}>
      <Text style={styles.greetingSub}>GOOD MORNING, {name.toUpperCase()}</Text>
      <Text style={styles.greetingTitle}>TRAIN TODAY</Text>
      <Text style={styles.greetingTitle}>TODAY</Text>
      <View style={styles.dateContainer}>
        <Calendar size={14} color="#fff" />
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>
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
    color: "#fff",
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
    fontWeight: "700",
    letterSpacing: -0.5,
    textShadowColor: "rgba(56, 237, 216, 0.7)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 6,
  },
  dateText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 1.5,
    fontFamily: "monospace",
  },
});
