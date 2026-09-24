import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useProfileSetupStore } from "../store/profileSetupStore";
import { AgeSlider } from "./AgeSlider";
import { AvatarUploadSection } from "./AvatarUploadSection";
import { GenderSelectionRow } from "./GenderSelectionRow";
import { ProfileFormInputs } from "./ProfileFormInputs";
import { ProfileNavigationButton } from "./ProfileNavigationButton";

export function Step1LetsStart() {
  const { data, updateData, nextStep } = useProfileSetupStore();

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>LET'S</Text>
          <Svg
            width="24"
            height="30"
            viewBox="0 0 24 30"
            fill="none"
            style={styles.titleZap}
          >
            <Path
              opacity="0.4"
              d="M6 30L7.5 19.5H0L13.5 0H16.5L15 12H24L9 30H6Z"
              fill="#56B5D2"
            />
          </Svg>
        </View>
        <Text style={styles.title}>START</Text>
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
      <ProfileNavigationButton
        title="CONTINUE"
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
    marginTop: 0,
    marginBottom: 6,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleZap: {
    marginLeft: 6,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 55,
    lineHeight: 50,
    fontWeight: "900",
    letterSpacing: -0.5,
    textShadowColor: "rgba(56, 189, 248, 0.75)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
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
    fontWeight: "400",
    letterSpacing: 1.6,
  },
  ageSubtitle: {
    color: "#64748B",
    fontSize: 14,
    lineHeight: 11,
    fontWeight: "400",
    marginTop: 5,
  },
});
