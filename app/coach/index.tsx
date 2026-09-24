import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowLeft, Bell, Search, Send } from "lucide-react-native";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CoachRoute() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={["#231F33", "#131521", "#0B0D14"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Pressable 
          style={styles.backBtn} 
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/(tabs)/home");
            }
          }}
        >
          <ArrowLeft size={20} color="#60A5FA" />
        </Pressable>
        <View style={styles.headerRight}>
          <Search size={20} color="#FFFFFF" style={styles.iconSpacing} />
          <View style={styles.bellWrapper}>
            <Bell size={20} color="#FFFFFF" style={styles.iconSpacing} />
            <View style={styles.notificationDot} />
          </View>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=11" }}
            style={styles.avatar}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.title}>YOUR COACH</Text>

        {/* Coach Card */}
        <View style={styles.coachCard}>
          <View style={styles.coachAvatarContainer}>
            <Image
              source={require("../../assets/coach/coach.png")}
              style={styles.coachAvatar}
            />
            <View style={styles.onlineDotOuter}>
              <View style={styles.onlineDotInner} />
            </View>
          </View>
          <View style={styles.coachInfo}>
            <View style={styles.coachNameRow}>
              <Text style={styles.coachName}>Friendly Coach</Text>
              <View style={styles.onlineBadge}>
                <Text style={styles.onlineBadgeText}>ONLINE</Text>
              </View>
            </View>
            <Text style={styles.coachDesc}>
              Ask anything about workouts, nutrition or fitness.
            </Text>
          </View>
        </View>

        {/* Chat Section */}
        <View style={styles.chatSection}>
          {/* Coach Msg 1 */}
          <View style={styles.msgLeftWrapper}>
            <View style={styles.msgBubbleLeft}>
              <Text style={styles.msgTextLeft}>
                Yo! I'm your AI Coach. Ready to crush your goals today? What's
                on your mind?
              </Text>
            </View>
            <Text style={styles.timeText}>10:42 AM</Text>
          </View>

          {/* User Msg */}
          <View style={styles.msgRightWrapper}>
            <LinearGradient
              colors={["#818CF8", "#6366F1"]}
              style={styles.msgBubbleRight}
            >
              <Text style={styles.msgTextRight}>
                I need a high-intensity leg day workout.
              </Text>
            </LinearGradient>
            <Text style={styles.timeTextRight}>10:43 AM</Text>
          </View>

          {/* Coach Msg 2 */}
          <View style={styles.msgLeftWrapper}>
            <View style={styles.msgBubbleLeft}>
              <Text style={styles.msgTextLeft}>
                Lethal choice! Let's build that explosive power. I'm thinking:
                {"\n\n"}
                1. Goblet Squats (4×12){"\n"}
                2. Bulgarian Split Squats (3×10 per leg){"\n"}
                3. Box Jumps (3×15){"\n\n"}
                Should we start?
              </Text>
            </View>
            <Text style={styles.timeText}>10:43 AM</Text>
          </View>
        </View>

        {/* Suggestion Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.suggestionsContainer}
        >
          <Pressable style={styles.suggestionChip}>
            <Text style={styles.suggestionText}>Create today's workout</Text>
          </Pressable>
          <Pressable style={styles.suggestionChip}>
            <Text style={styles.suggestionText}>How much protein sh...</Text>
          </Pressable>
        </ScrollView>
      </ScrollView>

      {/* Input Area */}
      <View
        style={[
          styles.inputContainer,
          { paddingBottom: Math.max(insets.bottom + 10, 20) },
        ]}
      >
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Ask your AI Coach..."
            placeholderTextColor="#64748B"
          />
          <Pressable style={styles.sendBtn}>
            <Send size={16} color="#FFFFFF" style={{ marginLeft: -2 }} />
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSpacing: {
    marginRight: 16,
  },
  bellWrapper: {
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: -2,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2DD4BF",
    borderWidth: 1,
    borderColor: "#161722",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2DD4BF",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
    textShadowColor: "rgba(255, 255, 255, 0.7)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  coachCard: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  coachAvatarContainer: {
    position: "relative",
    marginRight: 16,
  },
  coachAvatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  onlineDotOuter: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#161722",
    justifyContent: "center",
    alignItems: "center",
  },
  onlineDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2DD4BF",
  },
  coachInfo: {
    flex: 1,
    justifyContent: "center",
  },
  coachNameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  coachName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
  },
  onlineBadge: {
    backgroundColor: "rgba(45, 212, 191, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(45, 212, 191, 0.3)",
  },
  onlineBadgeText: {
    color: "#2DD4BF",
    fontSize: 10,
    fontWeight: "700",
  },
  coachDesc: {
    color: "#94A3B8",
    fontSize: 14,
    lineHeight: 20,
  },
  chatSection: {
    paddingHorizontal: 20,
  },
  msgLeftWrapper: {
    marginBottom: 20,
    alignItems: "flex-start",
  },
  msgBubbleLeft: {
    backgroundColor: "#2A2D3A",
    padding: 16,
    borderRadius: 16,
    borderTopLeftRadius: 4,
    maxWidth: "85%",
    marginBottom: 6,
  },
  msgTextLeft: {
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 22,
  },
  timeText: {
    color: "#64748B",
    fontSize: 11,
    fontWeight: "600",
  },
  msgRightWrapper: {
    marginBottom: 20,
    alignItems: "flex-end",
  },
  msgBubbleRight: {
    padding: 16,
    borderRadius: 16,
    borderBottomRightRadius: 4,
    maxWidth: "85%",
    marginBottom: 6,
  },
  msgTextRight: {
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 22,
  },
  timeTextRight: {
    color: "#64748B",
    fontSize: 11,
    fontWeight: "600",
  },
  suggestionsContainer: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 10,
  },
  suggestionChip: {
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  suggestionText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
    height: 40,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6366F1",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
});
