import * as Haptics from "expo-haptics";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { useProfileSetupStore } from "../store/profileSetupStore";

export function GenderSelectionRow() {
  const { width } = useWindowDimensions();
  const cardWidth = Math.floor((width - 40 - 12) / 2);
  const { data, updateData } = useProfileSetupStore();

  const handleSelectGender = (gender: "male" | "female") => {
    updateData({ gender });
    requestAnimationFrame(() => {
      try {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {
        // ignore
      }
    });
  };

  return (
    <View style={styles.genderRow}>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Select Male"
        activeOpacity={0.8}
        onPress={() => handleSelectGender("male")}
      >
        <View
          style={[
            styles.genderCard,
            { width: cardWidth },
            styles.maleBorder,
            data.gender === "male" && styles.maleActiveCard,
          ]}
        >
          <View style={styles.iconContainer}>
            <Svg width="32" height="48" viewBox="0 0 32 48" fill="none">
              <Path
                d="M32 0V12H28V6.85L20.05 14.75C20.6833 15.6833 21.1667 16.675 21.5 17.725C21.8333 18.775 22 19.8667 22 21C22 24.0667 20.9333 26.6667 18.8 28.8C16.6667 30.9333 14.0667 32 11 32C7.93333 32 5.33333 30.9333 3.2 28.8C1.06667 26.6667 0 24.0667 0 21C0 17.9333 1.06667 15.3333 3.2 13.2C5.33333 11.0667 7.93333 10 11 10C12.1 10 13.1833 10.1583 14.25 10.475C15.3167 10.7917 16.3 11.2833 17.2 11.95L25.15 4H20V0H32ZM11 14C9.06667 14 7.41667 14.6833 6.05 16.05C4.68333 17.4167 4 19.0667 4 21C4 22.9333 4.68333 24.5833 6.05 25.95C7.41667 27.3167 9.06667 28 11 28C12.9333 28 14.5833 27.3167 15.95 25.95C17.3167 24.5833 18 22.9333 18 21C18 19.0667 17.3167 17.4167 15.95 16.05C14.5833 14.6833 12.9333 14 11 14Z"
                fill="#44B3EA"
              />
            </Svg>
          </View>
          <Text style={styles.genderLabel}>MALE</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Select Female"
        activeOpacity={0.8}
        onPress={() => handleSelectGender("female")}
      >
        <View
          style={[
            styles.genderCard,
            { width: cardWidth },
            styles.femaleBorder,
            data.gender === "female" && styles.femaleActiveCard,
          ]}
        >
          <View style={styles.iconContainer}>
            <Svg width="22" height="50" viewBox="0 0 22 50" fill="none">
              <Path
                d="M9 34V30H5V26H9V21.8C6.36667 21.3333 4.20833 20.075 2.525 18.025C0.841667 15.975 0 13.6 0 10.9C0 7.86667 1.075 5.29167 3.225 3.175C5.375 1.05833 7.96667 0 11 0C14.0333 0 16.625 1.05833 18.775 3.175C20.925 5.29167 22 7.86667 22 10.9C22 13.6 21.1583 15.975 19.475 18.025C17.7917 20.075 15.6333 21.3333 13 21.8V26H17V30H13V34H9ZM11 18C12.9333 18 14.5833 17.3167 15.95 15.95C17.3167 14.5833 18 12.9333 18 11C18 9.06667 17.3167 7.41667 15.95 6.05C14.5833 4.68333 12.9333 4 11 4C9.06667 4 7.41667 4.68333 6.05 6.05C4.68333 7.41667 4 9.06667 4 11C4 12.9333 4.68333 14.5833 6.05 15.95C7.41667 17.3167 9.06667 18 11 18Z"
                fill="#FF42E6"
              />
            </Svg>
          </View>
          <Text style={styles.genderLabel}>FEMALE</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  genderRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  genderPressable: {
    width: "48%",
  },
  genderCard: {
    width: "100%",
    height: 140,
    borderRadius: 20,
    borderWidth: 1.5,
    backgroundColor: "#12131C",
    alignItems: "center",
    justifyContent: "center",
  },
  maleBorder: {
    borderColor: "#38BDF8",
  },
  maleActiveCard: {
    borderColor: "#38BDF8",
    backgroundColor: "#161D2E",
  },
  femaleBorder: {
    borderColor: "#2DD4BF",
  },
  femaleActiveCard: {
    borderColor: "#EC4899",
    backgroundColor: "#221526",
  },
  iconContainer: {
    marginBottom: 14,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  genderLabel: {
    fontSize: 14,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 2,
    color: "#FFFFFF",
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },
});
