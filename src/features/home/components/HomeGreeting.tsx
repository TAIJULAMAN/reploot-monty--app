import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

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
      <View style={styles.titleWrapper}>
        <MaskedView
          style={styles.maskedTitleView}
          maskElement={
            <View style={styles.maskWrapper}>
              <Text
                style={styles.title}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                TRAIN TODAY
              </Text>
            </View>
          }
        >
          <LinearGradient
            colors={["#00f2fe", "#4facfe"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          />
        </MaskedView>
      </View>
      <View style={styles.dateContainer}>
        <Calendar size={14} color="#38BDF8" />
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 24,
  },
  greetingSub: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 2,
    fontFamily: "monospace",
    marginBottom: 6,
  },
  titleWrapper: {
    alignItems: "flex-start",
    width: "100%",
  },
  maskedTitleView: {
    height: 52,
    width: "100%",
  },
  maskWrapper: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  gradient: {
    flex: 1,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 38,
    lineHeight: 44,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1.5,
    textAlign: "left",
    textTransform: "uppercase",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 6,
  },
  dateText: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1.5,
    fontFamily: "monospace",
  },
});
