import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import {
  Award,
  CreditCard,
  Droplet,
  Dumbbell,
  Utensils,
} from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Line as SvgLine } from "react-native-svg";

const NOTIFICATIONS = [
  {
    section: "TODAY",
    data: [
      {
        id: 1,
        type: "workout",
        title: "Workout Reminder",
        desc: "Time to complete today's workout protocol.",
        time: "2M AGO",
        unread: true,
      },
      {
        id: 2,
        type: "meal",
        title: "Meal Reminder",
        desc: "Hit your daily protein target of 180g.",
        time: "1H AGO",
        unread: true,
      },
    ],
  },
  {
    section: "YESTERDAY",
    data: [
      {
        id: 3,
        type: "achievement",
        title: "Achievement Unlocked",
        desc: "7-Day Workout Streak completed.",
        time: "YEST",
        unread: false,
      },
      {
        id: 4,
        type: "water",
        title: "Hydration Target",
        desc: "Drink 500ml water to reach daily goal.",
        time: "YEST",
        unread: false,
      },
    ],
  },
  {
    section: "EARLIER",
    data: [
      {
        id: 5,
        type: "subscription",
        title: "Subscription Active",
        desc: "Pro Cyber Athlete membership renews in 3 days.",
        time: "2D AGO",
        unread: false,
      },
    ],
  },
];

const getIconDisplay = (type: string) => {
  switch (type) {
    case "workout":
      return (
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: "rgba(99, 102, 241, 0.15)",
              borderColor: "rgba(99, 102, 241, 0.35)",
            },
          ]}
        >
          <Dumbbell color="#818CF8" size={22} />
        </View>
      );
    case "meal":
      return (
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: "rgba(247, 156, 66, 0.15)",
              borderColor: "rgba(247, 156, 66, 0.35)",
            },
          ]}
        >
          <Utensils color="#F79C42" size={22} />
        </View>
      );
    case "achievement":
      return (
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: "rgba(56, 237, 216, 0.12)",
              borderColor: "rgba(56, 237, 216, 0.32)",
            },
          ]}
        >
          <Award color="#38EDD8" size={24} />
        </View>
      );
    case "water":
      return (
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: "rgba(56, 189, 248, 0.12)",
              borderColor: "rgba(56, 189, 248, 0.32)",
            },
          ]}
        >
          <Droplet color="#38BDF8" size={22} />
        </View>
      );
    case "subscription":
      return (
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderColor: "rgba(255, 255, 255, 0.12)",
            },
          ]}
        >
          <CreditCard color="#CBD5E1" size={22} />
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
    <View style={styles.container}>
      {/* Background Gradient & Cyber Accent Lines */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <LinearGradient
          colors={["#1B182E", "#2A244A", "#151321", "#0B0B11"]}
          locations={[0, 0.25, 0.65, 1]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
          <SvgLine
            x1="420"
            y1="-20"
            x2="-40"
            y2="440"
            stroke="rgba(255, 255, 255, 0.035)"
            strokeWidth="1"
          />
          <SvgLine
            x1="460"
            y1="260"
            x2="-40"
            y2="760"
            stroke="rgba(56, 189, 248, 0.04)"
            strokeWidth="1"
          />
          <SvgLine
            x1="480"
            y1="560"
            x2="-40"
            y2="1080"
            stroke="rgba(56, 237, 216, 0.04)"
            strokeWidth="1"
          />
        </Svg>
      </View>

      <CustomHeader
        title="NOTIFICATIONS"
        titleVariant="text"
        showBackButton={true}
        showSearch={false}
        showNotifications={false}
        showAvatar={true}
        transparent={true}
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom + 20, 36) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section with Masked Gradient Title & Description */}
        <View style={styles.titleSection}>
          <View style={styles.maskedTitleWrapper}>
            <MaskedView
              style={styles.maskedTitleView}
              maskElement={
                <View style={styles.maskWrapper}>
                  <Text
                    style={styles.mainTitle}
                    numberOfLines={1}
                  >
                    YOUR UPDATES
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
            Activity logs, training reminders & system notifications
          </Text>
        </View>

        {/* Notifications List */}
        <View style={styles.listContainer}>
          {NOTIFICATIONS.map((section, sIndex) => (
            <View key={sIndex}>
              <SectionHeader title={section.section} />
              {section.data.map((item) => (
                <View
                  key={item.id}
                  style={[
                    styles.cardContainer,
                    item.unread && styles.cardUnread,
                  ]}
                >
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
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090A10",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  titleSection: {
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: 16,
  },
  maskedTitleWrapper: {
    height: 48,
    width: "100%",
  },
  maskedTitleView: {
    flex: 1,
    width: "100%",
  },
  maskWrapper: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
  },
  gradient: {
    flex: 1,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "monospace",
    fontWeight: "600",
    marginTop: 4,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 14,
  },
  sectionTitle: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "monospace",
    letterSpacing: 1.5,
    marginRight: 14,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#11141C",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  cardUnread: {
    borderColor: "rgba(56, 189, 248, 0.28)",
    backgroundColor: "#131826",
  },
  iconWrapper: {
    marginRight: 14,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  cardContent: {
    flex: 1,
    marginRight: 8,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  cardDesc: {
    color: "#94A3B8",
    fontSize: 12,
    lineHeight: 17,
    fontFamily: "monospace",
  },
  cardRight: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    color: "#64748B",
    fontSize: 10,
    fontWeight: "700",
    fontFamily: "monospace",
    letterSpacing: 0.8,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#38EDD8",
    marginLeft: 6,
  },
});
