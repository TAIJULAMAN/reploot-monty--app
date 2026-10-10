import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Search, Bell, Droplet } from "lucide-react-native";

const { width } = Dimensions.get("window");

export default function DrinkWaterScreen() {
  const insets = useSafeAreaInsets();
  const [waterInput, setWaterInput] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.logoText}>KINETQX</Text>
        <View style={styles.headerRight}>
          <Search color="#FFFFFF" size={20} />
          <Bell color="#FFFFFF" size={20} />
          <Image
            source={require("../assets/coachOnline/coachOnline.png")}
            style={styles.avatar}
            contentFit="cover"
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.titleGlow}>DRINK WATER</Text>
          <Text style={styles.subtitle}>STAY KINETIC • HYDRATION TASK</Text>
        </View>

        {/* Main Hydration Card */}
        <LinearGradient
          colors={["#7552E8", "#2EE8B3"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardBorder}
        >
          <View style={styles.cardInner}>
            <View style={styles.currentHydrationBadge}>
              <View style={styles.dot} />
              <Text style={styles.currentHydrationText}>CURRENT HYDRATION</Text>
            </View>

            <View style={styles.amountRow}>
              <Text style={styles.mainAmount}>1.8</Text>
              <Text style={styles.unitAmount}>L</Text>
            </View>

            <View style={styles.goalRow}>
              <Text style={styles.goalText}>GOAL: 3.0L</Text>
              <View style={styles.separator} />
              <View style={styles.progressBarBg}>
                <LinearGradient
                  colors={["#38A1D6", "#2EE8B3"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.progressBarFill, { width: "60%" }]}
                />
              </View>
              <Text style={styles.percentageText}>60%</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Add Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>QUICK ADD</Text>
          <Text style={styles.sectionSub}>TAP TO LOG</Text>
        </View>

        <View style={styles.quickAddGrid}>
          <Pressable style={styles.quickAddBox}>
            <Droplet color="#38A1D6" size={20} />
            <Text style={styles.quickAddText}>+250ml</Text>
          </Pressable>
          <Pressable style={styles.quickAddBox}>
            <Droplet color="#38A1D6" size={20} />
            <Text style={styles.quickAddText}>+500ml</Text>
          </Pressable>
          <Pressable style={styles.quickAddBox}>
            <Droplet color="#38A1D6" size={20} />
            <Text style={styles.quickAddText}>+750ml</Text>
          </Pressable>
          <Pressable style={styles.quickAddBox}>
            <Droplet color="#38A1D6" size={20} />
            <Text style={styles.quickAddText}>+1 LITER</Text>
          </Pressable>
        </View>

        {/* Custom Amount Section */}
        <Text style={[styles.sectionTitle, { marginBottom: 16 }]}>CUSTOM AMOUNT</Text>
        <View style={styles.customInputContainer}>
          <TextInput
            style={styles.customInput}
            placeholder="Enter amount... (ml)"
            placeholderTextColor="#64748B"
            keyboardType="numeric"
            value={waterInput}
            onChangeText={setWaterInput}
          />
          <Text style={styles.customInputUnit}>ML</Text>
        </View>

        {/* Save Button */}
        <Pressable onPress={() => router.back()} style={styles.saveBtnWrapper}>
          <LinearGradient
            colors={["#1B648C", "#3FA8DD"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveBtn}
          >
            <Text style={styles.saveBtnText}>SAVE WATER</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111114",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
    paddingBottom: 16,
  },
  logoText: {
    color: "#38A1D6",
    fontSize: 20,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2EE8B3",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  titleSection: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 10,
  },
  titleGlow: {
    color: "#FFFFFF",
    fontSize: 36,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: -1,
    textShadowColor: "#38A1D6",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  subtitle: {
    color: "#A0A0B0",
    fontSize: 10,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 2,
    marginTop: 8,
  },
  cardBorder: {
    padding: 1,
    borderRadius: 24,
    marginBottom: 40,
  },
  cardInner: {
    backgroundColor: "#1A1A22",
    borderRadius: 23,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  currentHydrationBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(46, 232, 179, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(46, 232, 179, 0.2)",
    marginBottom: 16,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#2EE8B3",
    marginRight: 6,
  },
  currentHydrationText: {
    color: "#2EE8B3",
    fontSize: 10,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 20,
  },
  mainAmount: {
    color: "#FFFFFF",
    fontSize: 72,
    fontFamily: "JetBrainsMono_700Bold",
    lineHeight: 80,
  },
  unitAmount: {
    color: "#2EE8B3",
    fontSize: 24,
    fontFamily: "JetBrainsMono_700Bold",
    marginLeft: 4,
  },
  goalRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  goalText: {
    color: "#A0A0B0",
    fontSize: 10,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
  },
  separator: {
    width: 1,
    height: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginHorizontal: 12,
  },
  progressBarBg: {
    width: 40,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 2,
    marginRight: 10,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 2,
  },
  percentageText: {
    color: "#2EE8B3",
    fontSize: 10,
    fontFamily: "JetBrainsMono_700Bold",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
  },
  sectionSub: {
    color: "#8A8A93",
    fontSize: 9,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
  },
  quickAddGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
    marginBottom: 40,
  },
  quickAddBox: {
    width: (width - 48 - 16) / 2, // 50% width minus padding and gap
    backgroundColor: "#16161A",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    paddingVertical: 24,
    alignItems: "center",
    gap: 12,
  },
  quickAddText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "JetBrainsMono_700Bold",
  },
  customInputContainer: {
    backgroundColor: "#16161A",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 60,
    marginBottom: 40,
  },
  customInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Inter_400Regular", // Using a clean font for input
  },
  customInputUnit: {
    color: "#8A8A93",
    fontSize: 12,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
  },
  saveBtnWrapper: {
    marginBottom: 20,
  },
  saveBtn: {
    paddingVertical: 20,
    borderRadius: 24,
    alignItems: "center",
    shadowColor: "#38A1D6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  saveBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "JetBrainsMono_700Bold",
    letterSpacing: 1,
  },
});
