import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { useProfileSetupStore } from "../store/profileSetupStore";
import { AgeSlider } from "./AgeSlider";
import { AvatarUploadSection } from "./AvatarUploadSection";
import { GenderSelectionRow } from "./GenderSelectionRow";
import { ProfileFormInputs } from "./ProfileFormInputs";
import { OnboardingButton } from "@/features/onboarding/components/OnboardingButton";

export function Step1LetsStart() {
  const { data, updateData, nextStep } = useProfileSetupStore();

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
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
                  LET'S START
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
        <Text style={styles.subtitle}>
          Tell us about yourself to personalize your training
        </Text>
      </View>
      <AvatarUploadSection />
      <ProfileFormInputs />
      <GenderSelectionRow />
      <View style={styles.ageCard}>
        <View style={styles.ageInfo}>
          <Text style={styles.ageTitle}>SELECT</Text>
          <Text style={styles.ageTitle}>AGE</Text>
          <Text style={styles.ageSubtitle}>Years of</Text>
          <Text style={styles.ageSubtitle}>power</Text>
        </View>

        <AgeSlider value={data.age} onChange={(age) => updateData({ age })} />
      </View>
      <OnboardingButton
        text="CONTINUE"
        onPress={nextStep}
        subtext="BY PROCEEDING YOU AGREE TO OUR TERMS OF FORCE"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "stretch",
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  hero: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 20,
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
    textShadowColor: "#FFFFFF",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 14,
    fontFamily: "monospace",
    fontWeight: "600",
    marginTop: 8,
    textAlign: "left",
  },

  ageCard: {
    width: "100%",
    height: 80,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: "#2DD4BF",
    backgroundColor: "#12131C",
    paddingLeft: 18,
    paddingRight: 8,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#2DD4BF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
  },
  ageInfo: {
    width: 76,
    justifyContent: "center",
  },
  ageTitle: {
    color: "#FFFFFF",
    fontSize: 10,
    lineHeight: 13,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 1.6,
    textTransform: "uppercase",
  },
  ageSubtitle: {
    color: "#22D3EE",
    fontSize: 12,
    lineHeight: 14,
    fontFamily: "monospace",
    fontWeight: "600",
    marginTop: 4,
  },
});
