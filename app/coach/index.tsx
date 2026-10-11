import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import MaskedView from "@react-native-masked-view/masked-view";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Send, Sparkles } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Line as SvgLine } from "react-native-svg";

interface ChatMessage {
  id: string;
  sender: "coach" | "user";
  text: string;
  time: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    sender: "coach",
    text: "Welcome to KINETQX Neural Coaching. Ready to crush your goals today? What are we optimizing?",
    time: "10:42 AM",
  },
  {
    id: "2",
    sender: "user",
    text: "I need a high-intensity leg day workout.",
    time: "10:43 AM",
  },
  {
    id: "3",
    sender: "coach",
    text: "Lethal choice! Let's build explosive power.\n\nRecommended Protocol:\n1. Goblet Squats (4×12)\n2. Bulgarian Split Squats (3×10 per leg)\n3. Box Jumps (3×15)\n\nReady to begin session?",
    time: "10:43 AM",
  },
];

const SUGGESTIONS = [
  "CREATE TODAY'S WORKOUT",
  "ADJUST MACROS",
  "RECOVERY PROTOCOL",
  "CHECK MY FORM",
  "HYDRATION TARGETS",
  "PRE-WORKOUT MEAL",
  "STRETCHING ROUTINE",
];

export default function CoachRoute() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);
  const chipsScrollRef = useRef<ScrollView>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (Platform.OS !== "web") return;

    const scrollNode =
      (chipsScrollRef.current as any)?.getScrollableNode?.() ||
      (chipsScrollRef.current as any)?._inputRef;

    if (!scrollNode) return;

    scrollNode.style.cursor = "grab";

    // 1. Mouse wheel horizontal scrolling
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        scrollNode.scrollLeft += e.deltaY;
      }
    };

    // 2. Mouse click-and-drag horizontal scrolling
    let isDown = false;
    let startX = 0;
    let initialScrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      isDraggingRef.current = false;
      startX = e.pageX - scrollNode.offsetLeft;
      initialScrollLeft = scrollNode.scrollLeft;
      scrollNode.style.cursor = "grabbing";
      scrollNode.style.userSelect = "none";
    };

    const onMouseUp = () => {
      if (isDown) {
        isDown = false;
        scrollNode.style.cursor = "grab";
        scrollNode.style.userSelect = "auto";
        setTimeout(() => {
          isDraggingRef.current = false;
        }, 60);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      const x = e.pageX - scrollNode.offsetLeft;
      const walk = (x - startX) * 1.5;
      if (Math.abs(x - startX) > 5) {
        isDraggingRef.current = true;
      }
      scrollNode.scrollLeft = initialScrollLeft - walk;
    };

    scrollNode.addEventListener("wheel", onWheel, { passive: false });
    scrollNode.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      scrollNode.removeEventListener("wheel", onWheel);
      scrollNode.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSend = (textToSend?: string) => {
    const messageContent = (textToSend ?? inputText).trim();
    if (!messageContent) return;

    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: messageContent,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Simulate smart coach response
    setTimeout(() => {
      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
      }
      const coachReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "coach",
        text: `Protocol acknowledged: "${messageContent}". Analyzing bio-metrics and loading your optimized set...`,
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, coachReply]);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 800);
  };

  const handleSuggestionPress = (suggestion: string) => {
    if (isDraggingRef.current) return;
    handleSend(suggestion);
  };

  return (
    <View style={styles.container}>
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
      <CustomHeader showBackButton={true} transparent={true} />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Screen Title & Description */}
          <View style={styles.titleSection}>
            <View style={styles.maskedTitleWrapper}>
              <MaskedView
                style={styles.maskedTitleView}
                maskElement={
                  <View style={styles.maskWrapper}>
                    <Text
                      style={styles.title}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                    >
                      YOUR COACH
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
              Adaptive intelligence for training, nutrition & daily protocols
            </Text>
          </View>

          {/* Coach Status Card */}
          <View style={styles.coachCard}>
            <View style={styles.coachAvatarContainer}>
              <Image
                source={require("../../assets/coach/coach.png")}
                style={styles.coachAvatar}
                contentFit="cover"
              />
              <View style={styles.onlineDotOuter}>
                <View style={styles.onlineDotInner} />
              </View>
            </View>
            <View style={styles.coachInfo}>
              <View style={styles.coachNameRow}>
                <Text style={styles.coachName}>KINETQX AI</Text>
                <View style={styles.onlineBadge}>
                  <View style={styles.miniDot} />
                  <Text style={styles.onlineBadgeText}>ONLINE</Text>
                </View>
              </View>
              <Text style={styles.coachDesc}>
                Neural workout planning & real-time biometric adaptation.
              </Text>
            </View>
          </View>

          {/* Chat Messages */}
          <View style={styles.chatSection}>
            {messages.map((item) => {
              const isCoach = item.sender === "coach";
              return (
                <View
                  key={item.id}
                  style={
                    isCoach ? styles.msgLeftWrapper : styles.msgRightWrapper
                  }
                >
                  {isCoach ? (
                    <View style={styles.msgBubbleLeft}>
                      <Text style={styles.msgTextLeft}>{item.text}</Text>
                    </View>
                  ) : (
                    <LinearGradient
                      colors={["#00f2fe", "#4facfe"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.msgBubbleRight}
                    >
                      <Text style={styles.msgTextRight}>{item.text}</Text>
                    </LinearGradient>
                  )}
                  <Text
                    style={isCoach ? styles.timeText : styles.timeTextRight}
                  >
                    {item.time}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>

        {/* Suggestion Chips (Horizontally Scrollable) */}
        <View style={styles.suggestionsWrapper}>
          <ScrollView
            ref={chipsScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestionsContainer}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
          >
            {SUGGESTIONS.map((suggestion, index) => (
              <Pressable
                key={index}
                style={({ pressed }) => [
                  styles.suggestionChip,
                  pressed && styles.chipPressed,
                ]}
                onPress={() => handleSuggestionPress(suggestion)}
                accessibilityRole="button"
              >
                <Sparkles size={11} color="#38EDD8" />
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        <View
          style={[
            styles.inputContainer,
            { paddingBottom: Math.max(insets.bottom + 8, 18) },
          ]}
        >
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Type message or ask AI Coach..."
              placeholderTextColor="#64748B"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={() => handleSend()}
              returnKeyType="send"
            />
            <Pressable
              style={({ pressed }) => [
                styles.sendBtn,
                pressed && styles.sendBtnPressed,
              ]}
              onPress={() => handleSend()}
              accessibilityRole="button"
            >
              <LinearGradient
                colors={["#00f2fe", "#4facfe"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.sendBtnGradient}
              >
                <Send size={15} color="#0B0E14" strokeWidth={2.6} />
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090A10",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  titleSection: {
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: 18,
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
  title: {
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
  coachCard: {
    flexDirection: "row",
    backgroundColor: "#11141C",
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  coachAvatarContainer: {
    position: "relative",
    marginRight: 14,
  },
  coachAvatar: {
    width: 54,
    height: 54,
    borderRadius: 16,
  },
  onlineDotOuter: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#11141C",
    justifyContent: "center",
    alignItems: "center",
  },
  onlineDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#38EDD8",
  },
  coachInfo: {
    flex: 1,
    justifyContent: "center",
  },
  coachNameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 8,
  },
  coachName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  onlineBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(56, 237, 216, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(56, 237, 216, 0.28)",
  },
  miniDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#38EDD8",
  },
  onlineBadgeText: {
    color: "#38EDD8",
    fontSize: 9,
    fontWeight: "700",
    fontFamily: "monospace",
    letterSpacing: 0.8,
  },
  coachDesc: {
    color: "#94A3B8",
    fontSize: 12,
    lineHeight: 17,
    fontFamily: "monospace",
  },
  chatSection: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  msgLeftWrapper: {
    marginBottom: 16,
    alignItems: "flex-start",
  },
  msgBubbleLeft: {
    backgroundColor: "#11141C",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 14,
    borderRadius: 18,
    borderTopLeftRadius: 4,
    maxWidth: "88%",
    marginBottom: 4,
  },
  msgTextLeft: {
    color: "#E2E8F0",
    fontSize: 13,
    lineHeight: 19,
    fontFamily: "monospace",
  },
  timeText: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "600",
    marginLeft: 4,
  },
  msgRightWrapper: {
    marginBottom: 16,
    alignItems: "flex-end",
  },
  msgBubbleRight: {
    padding: 14,
    borderRadius: 18,
    borderBottomRightRadius: 4,
    maxWidth: "88%",
    marginBottom: 4,
  },
  msgTextRight: {
    color: "#0B0E14",
    fontSize: 13,
    lineHeight: 19,
    fontFamily: "monospace",
    fontWeight: "700",
  },
  timeTextRight: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "600",
    marginRight: 4,
  },
  suggestionsWrapper: {
    paddingVertical: 6,
  },
  suggestionsContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  suggestionChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#11141C",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  chipPressed: {
    opacity: 0.75,
  },
  suggestionText: {
    color: "#CBD5E1",
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "monospace",
    letterSpacing: 0.8,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    backgroundColor: "transparent",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#11141C",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "monospace",
    height: 40,
  },
  sendBtn: {
    borderRadius: 10,
    overflow: "hidden",
    marginLeft: 8,
  },
  sendBtnPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  sendBtnGradient: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
