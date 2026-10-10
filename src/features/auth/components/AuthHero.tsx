import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

export interface AuthHeroProps {
  line1?: string;
  line2?: string;
}

export function AuthHero({ line1 = "WELCOME", line2 = "BACK" }: AuthHeroProps) {
  return (
    <View style={styles.heroSection}>
      <View style={styles.sparklePosition}>
        <Image
          source={require("../../../../assets/signInIcon/spark.svg")}
          style={{ width: 36, height: 36 }}
          contentFit="contain"
        />
      </View>

      <MaskedView
        style={styles.maskedView}
        maskElement={
          <View style={styles.maskWrapper}>
            <Text style={styles.heroTitle}>{line1}</Text>
            <Text style={styles.heroTitle}>{line2}</Text>
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

      <View style={styles.dumbbellPosition}>
        <Image
          source={require("../../../../assets/signInIcon/dumble.svg")}
          style={{ width: 32, height: 32 }}
          contentFit="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    position: "relative",
    marginBottom: 16,
    paddingLeft: 2,
  },
  sparklePosition: {
    position: "absolute",
    top: -24,
    left: -2,
    zIndex: 2,
  },
  maskedView: {
    height: 100, // Enough height for both lines
    width: "100%",
  },
  maskWrapper: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start", // Left align for auth hero
  },
  gradient: {
    flex: 1,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 42,
    lineHeight: 44,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1,
    textTransform: "uppercase",
    textShadowColor: "#FFFFFF",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    marginTop: 4,
  },
  dumbbellPosition: {
    position: "absolute",
    right: 22,
    top: 50,
    zIndex: 1,
  },
});
