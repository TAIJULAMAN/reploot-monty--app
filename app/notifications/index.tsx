import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import { LinearGradient } from "expo-linear-gradient";
import { Award, CreditCard, Droplet, Dumbbell, Sparkles, Utensils } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const NOTIFICATIONS = [
  {
    section: "TODAY",
    data: [
      { id: 1, type: "workout", title: "Workout Reminder", desc: "Time to complete today's workout.", time: "2M AGO", unread: true },
      { id: 2, type: "meal", title: "Meal Reminder", desc: "Don't forget lunch.", time: "1H AGO", unread: true }
    ]
  },
  {
    section: "YESTERDAY",
    data: [
      { id: 3, type: "achievement", title: "Achievement", desc: "7-Day Workout Streak unlocked.", time: "YEST", unread: false },
      { id: 4, type: "water", title: "Water Reminder", desc: "Drink another glass of water.", time: "YEST", unread: false }
    ]
  },
  {
    section: "EARLIER",
    data: [
      { id: 5, type: "subscription", title: "Subscription", desc: "Premium renews in 3 days.", time: "2D AGO", unread: false }
    ]
  }
];

const getIconDisplay = (type: string) => {
  switch (type) {
    case 'workout':
      return (
        <View style={[styles.iconContainer, { backgroundColor: "#6366F1" }]}>
          <Dumbbell color="#FFFFFF" size={24} />
        </View>
      );
    case 'meal':
      return (
        <View style={[styles.iconContainer, { backgroundColor: "#E37B24" }]}>
          <Utensils color="#FFFFFF" size={24} />
        </View>
      );
    case 'achievement':
      return (
        <View style={[styles.iconContainer, { backgroundColor: "transparent" }]}>
          <Award color="#2DD4BF" size={28} />
        </View>
      );
    case 'water':
      return (
        <View style={[styles.iconContainer, { borderWidth: 1, borderColor: "#2DD4BF", backgroundColor: "transparent" }]}>
          <Droplet color="#2DD4BF" size={22} />
        </View>
      );
    case 'subscription':
      return (
        <View style={[styles.iconContainer, { backgroundColor: "#2A2A35" }]}>
          <CreditCard color="#94A3B8" size={22} />
        </View>
      );
    default:
      return null;
  }
};

const SectionHeader = ({ title }: { title: string }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionLine} />
  </View>
);

export default function NotificationsRoute() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={["#1E1C2E", "#111822", "#0A1215"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, { paddingBottom: insets.bottom }]}
    >
      <CustomHeader
        title="NOTIFICATION"
        titleVariant="text"
        showBackButton={true}
        showSearch={false}
        showNotifications={false}
        showAvatar={true}
        transparent={true}
      />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Title Section */}
        <View style={styles.titleSection}>
          <View>
            <Text style={styles.mainTitle}>YOUR{"\n"}UPDATES</Text>
            <LinearGradient
              colors={["#818CF8", "#2DD4BF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.titleUnderline}
            />
          </View>
          <View style={styles.sparklesContainer}>
            <Sparkles color="rgba(255,255,255,0.2)" size={32} />
          </View>
        </View>

        {/* Notifications List */}
        <View style={styles.listContainer}>
          {NOTIFICATIONS.map((section, sIndex) => (
            <View key={sIndex}>
              <SectionHeader title={section.section} />
              {section.data.map((item) => (
                <LinearGradient
                  key={item.id}
                  colors={["#6366F1", "#2DD4BF"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.cardGradientBorder}
                >
                  <View style={styles.cardInner}>
                    <View style={styles.iconWrapper}>
                      {getIconDisplay(item.type)}
                    </View>
                    <View style={styles.cardContent}>
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <Text style={styles.cardDesc}>{item.desc}</Text>
                    </View>
                    <View style={styles.cardRight}>
                      <View style={styles.timeRow}>
                        <Text style={styles.timeText}>{item.time}</Text>
                        {item.unread && <View style={styles.unreadDot} />}
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              ))}
            </View>
          ))}
        </View>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 24,
    marginTop: 20,
    marginBottom: 10,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 48,
    fontWeight: "900",
    lineHeight: 52,
    letterSpacing: -1,
    textShadowColor: "rgba(255,255,255,0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  titleUnderline: {
    height: 4,
    width: "70%",
    borderRadius: 2,
    marginTop: 12,
  },
  sparklesContainer: {
    marginTop: -10,
    marginRight: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    marginRight: 16,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  cardGradientBorder: {
    borderRadius: 20,
    padding: 1, // 1px gradient border
    marginBottom: 16,
  },
  cardInner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161722",
    borderRadius: 19,
    padding: 16,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  cardDesc: {
    color: "#94A3B8",
    fontSize: 14,
    lineHeight: 20,
  },
  cardRight: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    height: "100%",
    paddingTop: 4,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#2DD4BF",
    marginLeft: 6,
    shadowColor: "#2DD4BF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
});
