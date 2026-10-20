import { CustomHeader } from "@/shared/components/navigation/CustomHeader";
import MaskedView from "@react-native-masked-view/masked-view";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  GripHorizontal,
  Plus,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Line as SvgLine } from "react-native-svg";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const DAYS_OF_WEEK = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
const MONTH_NAMES = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export interface WorkoutTemplate {
  id: string;
  name: string;
  tag: string;
  color: string;
  bgColor: string;
  borderColor: string;
  bgGrad: [string, string];
}

export const WORKOUT_SPLITS: WorkoutTemplate[] = [
  {
    id: "push",
    name: "Push Day",
    tag: "PUSH",
    color: "#38BDF8",
    bgColor: "rgba(56, 189, 248, 0.22)",
    borderColor: "#38BDF8",
    bgGrad: ["#0284C7", "#38BDF8"],
  },
  {
    id: "pull",
    name: "Pull Day",
    tag: "PULL",
    color: "#2DD4BF",
    bgColor: "rgba(45, 212, 191, 0.22)",
    borderColor: "#2DD4BF",
    bgGrad: ["#0F766E", "#2DD4BF"],
  },
  {
    id: "upper",
    name: "Upper Body",
    tag: "UPPER",
    color: "#C084FC",
    bgColor: "rgba(192, 132, 252, 0.22)",
    borderColor: "#C084FC",
    bgGrad: ["#7E22CE", "#C084FC"],
  },
  {
    id: "lower",
    name: "Lower Body",
    tag: "LOWER",
    color: "#FFB68C",
    bgColor: "rgba(255, 182, 140, 0.22)",
    borderColor: "#FFB68C",
    bgGrad: ["#C2410C", "#FFB68C"],
  },
  {
    id: "full",
    name: "Full Body",
    tag: "FULL",
    color: "#F43F5E",
    bgColor: "rgba(244, 63, 94, 0.22)",
    borderColor: "#F43F5E",
    bgGrad: ["#BE123C", "#F43F5E"],
  },
];

interface CalendarCell {
  date: number;
  currentMonth: boolean;
  type?: "completed" | "scheduled" | "today";
  label?: string;
  color?: string;
  bgColor?: string;
  borderColor?: string;
  isCustom?: boolean;
}

// Helper to resolve workout category theme colors by label
function getCategoryColors(label?: string) {
  if (!label) return null;
  const normalized = label.trim().toLowerCase();
  const matchedSplit = WORKOUT_SPLITS.find(
    (s) =>
      s.name.toLowerCase() === normalized ||
      s.tag.toLowerCase() === normalized ||
      normalized.includes(s.name.toLowerCase()) ||
      normalized.includes(s.tag.toLowerCase()),
  );
  if (matchedSplit) {
    return {
      color: matchedSplit.color,
      bgColor: matchedSplit.bgColor,
      borderColor: matchedSplit.borderColor,
    };
  }
  if (normalized.includes("chest")) {
    return {
      color: "#38BDF8",
      bgColor: "rgba(56, 189, 248, 0.22)",
      borderColor: "#38BDF8",
    };
  }
  return null;
}

function generateInitialCalendar(year: number, month: number): CalendarCell[] {
  const firstDay = new Date(year, month, 1).getDay();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const data: CalendarCell[] = [];

  for (let i = startOffset - 1; i >= 0; i--) {
    data.push({
      date: daysInPrevMonth - i,
      currentMonth: false,
    });
  }

  const today = new Date();
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday =
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === i;

    let type: CalendarCell["type"] = undefined;
    let label = "";

    // Mockup data for October 2024
    if (year === 2024 && month === 9) {
      if ([2, 4, 6, 9, 11, 13, 16].includes(i)) {
        type = "completed";
        label = i % 2 === 0 ? "Push Day" : "Pull Day";
      }
      if (i === 9 || i === 16) label = "Chest Day";
      if (isToday || i === 18) {
        type = "today";
        label = "Pull Day";
      }
      if ([20, 23, 25, 27, 30].includes(i)) {
        type = "scheduled";
        label = i === 30 ? "Chest Day" : i === 20 ? "Push Day" : "Pull Day";
      }
    } else {
      if (isToday) type = "today";
    }

    const theme = getCategoryColors(label);

    data.push({
      date: i,
      currentMonth: true,
      type,
      label,
      color: theme?.color,
      bgColor: theme?.bgColor,
      borderColor: theme?.borderColor,
    });
  }

  const remainingCells = data.length % 7;
  const paddingEnd = remainingCells === 0 ? 0 : 7 - remainingCells;

  for (let i = 1; i <= paddingEnd; i++) {
    data.push({
      date: i,
      currentMonth: false,
    });
  }

  return data;
}

// Draggable Chip Component using Gesture.Pan() and Reanimated
function DraggableSplitChip({
  split,
  isActive,
  onPress,
  onDragStart,
  onDragMove,
  onDragEnd,
}: {
  split: WorkoutTemplate;
  isActive: boolean;
  onPress: () => void;
  onDragStart: (split: WorkoutTemplate, startX: number, startY: number) => void;
  onDragMove: (x: number, y: number) => void;
  onDragEnd: (split: WorkoutTemplate, endX: number, endY: number) => void;
}) {
  const panGesture = useMemo(() => {
    return Gesture.Pan()
      .minDistance(4)
      .onStart((e) => {
        "worklet";
        runOnJS(onDragStart)(split, e.absoluteX, e.absoluteY);
      })
      .onUpdate((e) => {
        "worklet";
        runOnJS(onDragMove)(e.absoluteX, e.absoluteY);
      })
      .onEnd((e) => {
        "worklet";
        runOnJS(onDragEnd)(split, e.absoluteX, e.absoluteY);
      })
      .onFinalize(() => {
        "worklet";
      });
  }, [split, onDragStart, onDragMove, onDragEnd]);

  return (
    <GestureDetector gesture={panGesture}>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={onPress}
        style={[
          styles.splitBadge,
          { borderColor: split.color },
          isActive && styles.splitBadgeActive,
        ]}
      >
        <LinearGradient
          colors={
            isActive
              ? split.bgGrad
              : ["rgba(255, 255, 255, 0.05)", "rgba(255, 255, 255, 0.02)"]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.splitBadgeGrad}
        >
          <Dumbbell
            size={12}
            color={isActive ? "#FFFFFF" : split.color}
            style={{ marginRight: 6 }}
          />
          <Text
            style={[
              styles.splitBadgeText,
              { color: isActive ? "#FFFFFF" : split.color },
            ]}
          >
            {split.name}
          </Text>
          {isActive && (
            <View style={styles.splitActiveCheck}>
              <Check size={10} color="#FFFFFF" />
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </GestureDetector>
  );
}

export default function WorkoutCalendarScreen() {
  const insets = useSafeAreaInsets();
  const calendarGridRef = useRef<View>(null);

  // Month navigation
  const [currentDate, setCurrentDate] = useState(() => new Date(2024, 9, 1));
  const currentYear = currentDate.getFullYear();
  const currentMonthIdx = currentDate.getMonth();

  // Custom schedule store: map of "year-month-date" -> workout properties
  const [schedules, setSchedules] = useState<
    Record<
      string,
      {
        label: string;
        type: "scheduled" | "today";
        color: string;
        bgColor: string;
        borderColor: string;
      }
    >
  >({});

  // Active workout split selection (for tap-to-place)
  const [activeSelectedSplit, setActiveSelectedSplit] =
    useState<WorkoutTemplate | null>(null);

  // Modal Sheet for inspecting or modifying a specific date
  const [dateModalCell, setDateModalCell] = useState<CalendarCell | null>(null);

  // Drag State (JS state + Reanimated Shared Values)
  const [activeDragSplit, setActiveDragSplit] =
    useState<WorkoutTemplate | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<number | null>(null);

  // Shared values for high-frequency 60 FPS animation
  const dragX = useSharedValue(0);
  const dragY = useSharedValue(0);
  const isGlobalDragging = useSharedValue(false);

  // Grid bounding box state in screen coordinates
  const [gridBounds, setGridBounds] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const triggerHaptic = useCallback(
    (
      style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light,
    ) => {
      if (Platform.OS !== "web") {
        Haptics.impactAsync(style).catch(() => {});
      }
    },
    [],
  );

  const handlePrevMonth = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const [scheduleFeedback, setScheduleFeedback] = useState(false);

  const prevMonthIdx = currentMonthIdx === 0 ? 11 : currentMonthIdx - 1;
  const prevMonthName = MONTH_NAMES[prevMonthIdx];
  const nextMonthIdx = currentMonthIdx === 11 ? 0 : currentMonthIdx + 1;
  const nextMonthName = MONTH_NAMES[nextMonthIdx];

  // Base calendar data merged with custom scheduled items
  const calendarData = useMemo(() => {
    const base = generateInitialCalendar(currentYear, currentMonthIdx);
    return base.map((item) => {
      if (!item.currentMonth) return item;
      const key = `${currentYear}-${currentMonthIdx}-${item.date}`;
      if (schedules[key]) {
        return {
          ...item,
          type: schedules[key].type,
          label: schedules[key].label,
          color: schedules[key].color,
          bgColor: schedules[key].bgColor,
          borderColor: schedules[key].borderColor,
          isCustom: true,
        };
      }
      return item;
    });
  }, [currentYear, currentMonthIdx, schedules]);

  const applyWorkoutToDate = useCallback(
    (targetDate: number, split: WorkoutTemplate) => {
      triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
      const key = `${currentYear}-${currentMonthIdx}-${targetDate}`;
      const today = new Date();
      const isToday =
        today.getFullYear() === currentYear &&
        today.getMonth() === currentMonthIdx &&
        today.getDate() === targetDate;

      setSchedules((prev) => ({
        ...prev,
        [key]: {
          label: split.name,
          type: isToday ? "today" : "scheduled",
          color: split.color,
          bgColor: split.bgColor,
          borderColor: split.borderColor,
        },
      }));
    },
    [currentYear, currentMonthIdx, triggerHaptic],
  );

  const removeWorkoutFromDate = useCallback(
    (targetDate: number) => {
      triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
      const key = `${currentYear}-${currentMonthIdx}-${targetDate}`;
      setSchedules((prev) => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    },
    [currentYear, currentMonthIdx, triggerHaptic],
  );

  // Measure calendar grid on screen in window coordinates
  const measureCalendarGrid = useCallback(() => {
    calendarGridRef.current?.measureInWindow((x, y, width, height) => {
      if (width > 0 && height > 0) {
        setGridBounds({ x, y, width, height });
      }
    });
  }, []);

  // Determine which calendar date is under touch coordinate
  const getDateFromCoords = useCallback(
    (touchX: number, touchY: number): number | null => {
      if (!gridBounds || gridBounds.width === 0 || gridBounds.height === 0) {
        return null;
      }
      const relX = touchX - gridBounds.x;
      const relY = touchY - gridBounds.y;

      if (
        relX < 0 ||
        relX > gridBounds.width ||
        relY < 0 ||
        relY > gridBounds.height
      ) {
        return null;
      }

      const colWidth = gridBounds.width / 7;
      const numRows = Math.ceil(calendarData.length / 7);
      const rowHeight = gridBounds.height / numRows;

      const col = Math.floor(relX / colWidth);
      const row = Math.floor(relY / rowHeight);

      if (col >= 0 && col < 7 && row >= 0 && row < numRows) {
        const idx = row * 7 + col;
        const cell = calendarData[idx];
        if (cell && cell.currentMonth) {
          return cell.date;
        }
      }
      return null;
    },
    [gridBounds, calendarData],
  );

  // Drag Gesture Callbacks
  const handleDragStart = useCallback(
    (split: WorkoutTemplate, startX: number, startY: number) => {
      measureCalendarGrid();
      triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
      setActiveDragSplit(split);
      setIsDragging(true);

      dragX.value = startX;
      dragY.value = startY;
      isGlobalDragging.value = true;
    },
    [measureCalendarGrid, triggerHaptic, dragX, dragY, isGlobalDragging],
  );

  const handleDragMove = useCallback(
    (x: number, y: number) => {
      dragX.value = x;
      dragY.value = y;

      const target = getDateFromCoords(x, y);
      if (target !== hoveredDate) {
        setHoveredDate(target);
        if (target !== null) {
          triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
        }
      }
    },
    [dragX, dragY, getDateFromCoords, hoveredDate, triggerHaptic],
  );

  const handleDragEnd = useCallback(
    (split: WorkoutTemplate, endX: number, endY: number) => {
      const target = getDateFromCoords(endX, endY);
      if (target !== null) {
        applyWorkoutToDate(target, split);
      }

      setIsDragging(false);
      setActiveDragSplit(null);
      setHoveredDate(null);
      isGlobalDragging.value = false;
    },
    [getDateFromCoords, applyWorkoutToDate, isGlobalDragging],
  );

  // Floating follower badge animated style (butter-smooth with Reanimated)
  const floatingBadgeStyle = useAnimatedStyle(() => {
    return {
      opacity: isGlobalDragging.value ? 1 : 0,
      transform: [
        { translateX: dragX.value - 60 },
        { translateY: dragY.value - 24 },
        { scale: isGlobalDragging.value ? 1.08 : 0.8 },
      ],
    };
  });

  const handleCellPress = (item: CalendarCell) => {
    if (!item.currentMonth) return;

    // If an active split is selected from tray, apply it right away
    if (activeSelectedSplit) {
      applyWorkoutToDate(item.date, activeSelectedSplit);
      return;
    }

    // Otherwise, open bottom selector sheet
    triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
    setDateModalCell(item);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />

      {/* Top Navigation Bar with Avatar & Actions */}
      <CustomHeader
        titleVariant="text"
        title=""
        showBackButton={true}
        showSearch={true}
        showNotifications={true}
        showAvatar={true}
        transparent={true}
        onPressBack={() =>
          router.canGoBack() ? router.back() : router.replace("/(tabs)/home")
        }
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom + 60, 80) },
        ]}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!isDragging}
        onScroll={() => measureCalendarGrid()}
        scrollEventThrottle={16}
      >
        {/* Title Section with Masked Gradient Title & Description */}
        <View style={styles.titleSection}>
          <View style={styles.maskedTitleWrapper}>
            <MaskedView
              style={styles.maskedTitleView}
              maskElement={
                <View style={styles.maskWrapper}>
                  <Text style={styles.mainTitle} numberOfLines={1}>
                    WORKOUT CALENDAR
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
            Training telemetry, schedule cycles & session history.
          </Text>
        </View>

        {/* WORKOUT SPLITS TRAY: REANIMATED & GESTURE HANDLER DRAG & DROP */}
        <View style={styles.trayCard}>
          <View style={styles.trayHeaderRow}>
            <View style={styles.trayTitleCol}>
              <View style={styles.trayBadgeRow}>
                <GripHorizontal size={13} color="#38BDF8" />
                <Text style={styles.trayBadgeText}>
                  DRAG & DROP TO SCHEDULE
                </Text>
              </View>
              <Text style={styles.traySubText}>
                Drag onto a date, or tap a split to assign
              </Text>
            </View>

            {activeSelectedSplit && (
              <TouchableOpacity
                onPress={() => {
                  triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
                  setActiveSelectedSplit(null);
                }}
                style={styles.clearActiveBtn}
                activeOpacity={0.7}
              >
                <X size={12} color="#94A3B8" />
                <Text style={styles.clearActiveText}>CLEAR</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Draggable split chips: 3 in first line, 2 in next line */}
          <View style={styles.splitsGridContainer}>
            <View style={styles.splitsRow}>
              {WORKOUT_SPLITS.slice(0, 3).map((split) => {
                const isActive = activeSelectedSplit?.id === split.id;

                return (
                  <View key={split.id} style={styles.splitItemWrap}>
                    <DraggableSplitChip
                      split={split}
                      isActive={isActive}
                      onPress={() => {
                        triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
                        setActiveSelectedSplit((prev) =>
                          prev?.id === split.id ? null : split,
                        );
                      }}
                      onDragStart={handleDragStart}
                      onDragMove={handleDragMove}
                      onDragEnd={handleDragEnd}
                    />
                  </View>
                );
              })}
            </View>

            <View style={styles.splitsRow}>
              {WORKOUT_SPLITS.slice(3, 5).map((split) => {
                const isActive = activeSelectedSplit?.id === split.id;

                return (
                  <View key={split.id} style={styles.splitItemWrap}>
                    <DraggableSplitChip
                      split={split}
                      isActive={isActive}
                      onPress={() => {
                        triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
                        setActiveSelectedSplit((prev) =>
                          prev?.id === split.id ? null : split,
                        );
                      }}
                      onDragStart={handleDragStart}
                      onDragMove={handleDragMove}
                      onDragEnd={handleDragEnd}
                    />
                  </View>
                );
              })}
            </View>
          </View>

          {activeSelectedSplit && (
            <View style={styles.placementHintBanner}>
              <Plus size={12} color="#38BDF8" style={{ marginRight: 6 }} />
              <Text style={styles.placementHintText}>
                Active: Tap any calendar date to assign{" "}
                <Text
                  style={{
                    color: activeSelectedSplit.color,
                    fontWeight: "900",
                  }}
                >
                  {activeSelectedSplit.name}
                </Text>
              </Text>
            </View>
          )}
        </View>

        {/* Month Selector Row */}
        <View style={styles.monthSelectorRow}>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={handlePrevMonth}
            style={styles.monthBtnPrev}
          >
            <ChevronLeft color="#94A3B8" size={16} />
            <Text style={styles.monthBtnPrevText}>{prevMonthName}</Text>
          </TouchableOpacity>

          <View style={styles.monthBtnCurrent}>
            <Text style={styles.monthBtnCurrentText}>
              {`${MONTH_NAMES[currentMonthIdx]} ${currentYear}`}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.75}
            onPress={handleNextMonth}
            style={styles.monthBtnNext}
          >
            <Text style={styles.monthBtnNextText}>{nextMonthName}</Text>
            <ChevronRight color="#94A3B8" size={16} />
          </TouchableOpacity>
        </View>

        {/* Calendar Grid Container with Vibrant Gradient Border */}
        <LinearGradient
          colors={["#50357F", "#1D8B9B"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.calendarGradientBorder}
        >
          <View style={styles.calendarInner}>
            {/* Days of Week Header */}
            <View style={styles.daysHeader}>
              {DAYS_OF_WEEK.map((day) => (
                <Text key={day} style={styles.dayHeaderText}>
                  {day}
                </Text>
              ))}
            </View>

            {/* Calendar Grid Container measured in window */}
            <View
              ref={calendarGridRef}
              onLayout={measureCalendarGrid}
              style={styles.gridContainer}
            >
              {calendarData.map((item, index) => {
                const isCompleted = item.type === "completed";
                const isScheduled = item.type === "scheduled";
                const isToday = item.type === "today";
                const isHovered =
                  hoveredDate === item.date && item.currentMonth;

                // Dynamic colors for assigned or scheduled workout splits
                const categoryTheme = getCategoryColors(item.label);

                const cellBorderColor =
                  isHovered && activeDragSplit
                    ? activeDragSplit.color
                    : item.borderColor ||
                      categoryTheme?.borderColor ||
                      (isCompleted
                        ? "#1B6A56"
                        : isScheduled
                          ? "#4A4389"
                          : "rgba(255, 255, 255, 0.04)");

                const cellBgColor =
                  isHovered && activeDragSplit
                    ? activeDragSplit.bgColor
                    : item.bgColor ||
                      categoryTheme?.bgColor ||
                      (isCompleted
                        ? "#1C332D"
                        : isScheduled
                          ? "#2D2D48"
                          : "#25252D");

                const cellTextColor =
                  isHovered && activeDragSplit
                    ? activeDragSplit.color
                    : item.color ||
                      categoryTheme?.color ||
                      (isCompleted
                        ? "#2EE8B3"
                        : isScheduled
                          ? "#C5C0FF"
                          : "#FFFFFF");

                const dumbbellColor =
                  isHovered && activeDragSplit
                    ? activeDragSplit.color
                    : item.color || categoryTheme?.color || cellTextColor;

                return (
                  <View key={index} style={styles.cellContainer}>
                    <TouchableOpacity
                      activeOpacity={0.75}
                      onPress={() => handleCellPress(item)}
                      disabled={!item.currentMonth}
                      style={{ alignItems: "center" }}
                    >
                      {isToday ? (
                        <LinearGradient
                          colors={["#6C5CFF", "#44EAC3"]}
                          start={{ x: 0, y: 0.5 }}
                          end={{ x: 1, y: 0.5 }}
                          style={[
                            styles.dateBox,
                            styles.dateBoxToday,
                            isHovered && styles.dateBoxHovered,
                          ]}
                        >
                          <Text style={[styles.dateText, styles.dateTextToday]}>
                            {item.date}
                          </Text>
                          <Image
                            source={require("../assets/dumble.svg")}
                            style={{
                              width: 15,
                              height: 15,
                              marginTop: 4,
                              tintColor: dumbbellColor,
                            }}
                            contentFit="contain"
                          />
                        </LinearGradient>
                      ) : (
                        <View
                          style={[
                            styles.dateBox,
                            !item.currentMonth && styles.dateBoxInactive,
                            item.currentMonth && {
                              backgroundColor: cellBgColor,
                              borderColor: cellBorderColor,
                              borderWidth: 1.5,
                            },
                            isHovered && styles.dateBoxHovered,
                          ]}
                        >
                          <Text
                            style={[
                              styles.dateText,
                              !item.currentMonth && styles.dateTextInactive,
                              item.currentMonth && { color: cellTextColor },
                            ]}
                          >
                            {item.date}
                          </Text>
                          {Boolean(
                            item.currentMonth &&
                            (isCompleted || isScheduled || Boolean(item.label)),
                          ) ? (
                            <Image
                              source={require("../assets/dumble.svg")}
                              style={{
                                width: 15,
                                height: 15,
                                marginTop: 4,
                                tintColor: dumbbellColor,
                              }}
                              contentFit="contain"
                            />
                          ) : null}
                        </View>
                      )}
                      <Text
                        style={[
                          styles.labelText,
                          !item.currentMonth && { opacity: 0 },
                          item.currentMonth && { color: cellTextColor },
                        ]}
                        numberOfLines={1}
                      >
                        {item.label ? item.label : " "}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>

            {/* Legend */}
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <Image
                  source={require("../assets/dumble.svg")}
                  style={{ width: 13, height: 13, tintColor: "#2EE8B3" }}
                  contentFit="contain"
                />
                <Text style={[styles.legendText, { color: "#2EE8B3" }]}>
                  Completed
                </Text>
              </View>
              <View style={styles.legendItem}>
                <Image
                  source={require("../assets/scheduledDumble.svg")}
                  style={{ width: 13, height: 13, tintColor: "#C5C0FF" }}
                  contentFit="contain"
                />
                <Text style={[styles.legendText, { color: "#C5C0FF" }]}>
                  Scheduled
                </Text>
              </View>
              <View style={styles.legendItem}>
                <View style={styles.restDayDot} />
                <Text style={[styles.legendText, { color: "#94A3B8" }]}>
                  Rest Day
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Bottom Update Schedule Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.updateButtonContainer}
          onPress={() => {
            triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
            setScheduleFeedback(true);
            setTimeout(() => {
              setScheduleFeedback(false);
            }, 3000);
          }}
        >
          <LinearGradient
            colors={["#00f2fe", "#4facfe"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.updateButton}
          >
            <RefreshCw color="#050811" size={18} />
            <Text style={styles.updateButtonText}>UPDATE WORKOUT SCHEDULE</Text>
            <ArrowRight color="#050811" size={18} />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      {/* Floating HUD Sync Toast */}
      {scheduleFeedback && (
        <View style={styles.floatingToast}>
          <Check size={16} color="#00f2fe" style={{ marginRight: 8 }} />
          <Text style={styles.floatingToastText}>
            WORKOUT SCHEDULE SYNCHRONIZED
          </Text>
        </View>
      )}

      {/* Floating Drag Item Follower (Powered by Reanimated) */}
      {activeDragSplit && (
        <Animated.View
          pointerEvents="none"
          style={[styles.floatingDragBadge, floatingBadgeStyle]}
        >
          <LinearGradient
            colors={activeDragSplit.bgGrad}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.floatingDragGrad}
          >
            <Dumbbell size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.floatingDragText}>{activeDragSplit.name}</Text>
          </LinearGradient>
        </Animated.View>
      )}

      {/* Quick Select Modal Sheet when tapping a Date */}
      <Modal
        visible={!!dateModalCell}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDateModalCell(null)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setDateModalCell(null)}
        >
          <Pressable
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>
                  {`${MONTH_NAMES[currentMonthIdx]} ${dateModalCell?.date}, ${currentYear}`}
                </Text>
                <Text style={styles.modalSub}>
                  {dateModalCell?.label
                    ? `Current Routine: ${dateModalCell.label}`
                    : "No routine assigned for this date"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setDateModalCell(null)}
                style={styles.modalCloseBtn}
                activeOpacity={0.7}
              >
                <X size={16} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSectionLabel}>ASSIGN WORKOUT SPLIT:</Text>

            <View style={styles.modalSplitsList}>
              {WORKOUT_SPLITS.map((split) => {
                const isCurrent = dateModalCell?.label === split.name;

                return (
                  <TouchableOpacity
                    key={split.id}
                    activeOpacity={0.75}
                    onPress={() => {
                      if (dateModalCell) {
                        applyWorkoutToDate(dateModalCell.date, split);
                        setDateModalCell(null);
                      }
                    }}
                    style={[
                      styles.modalSplitItem,
                      { borderColor: split.color },
                      isCurrent && styles.modalSplitItemActive,
                    ]}
                  >
                    <View style={styles.modalSplitLeft}>
                      <View
                        style={[
                          styles.modalSplitDot,
                          { backgroundColor: split.color },
                        ]}
                      />
                      <Text style={styles.modalSplitName}>{split.name}</Text>
                    </View>
                    {isCurrent ? (
                      <View style={styles.modalActiveBadge}>
                        <Check size={12} color="#2DD4BF" />
                        <Text style={styles.modalActiveText}>ASSIGNED</Text>
                      </View>
                    ) : (
                      <ArrowRight size={14} color="#64748B" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {dateModalCell?.label && (
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => {
                  if (dateModalCell) {
                    removeWorkoutFromDate(dateModalCell.date);
                    setDateModalCell(null);
                  }
                }}
                style={styles.modalClearBtn}
              >
                <Trash2 size={14} color="#F43F5E" />
                <Text style={styles.modalClearText}>REMOVE WORKOUT</Text>
              </TouchableOpacity>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070A11",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },

  /* Title Section */
  titleSection: {
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
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "900",
    fontFamily: "monospace",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 12,
    lineHeight: 17,
    fontFamily: "monospace",
    fontWeight: "600",
    marginTop: 4,
  },

  /* Drag Tray Card */
  trayCard: {
    backgroundColor: "rgba(17, 20, 28, 0.95)",
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    marginBottom: 16,
  },
  trayHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  trayTitleCol: {
    flex: 1,
  },
  trayBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  trayBadgeText: {
    color: "#38BDF8",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1,
  },
  traySubText: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
  },
  clearActiveBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  clearActiveText: {
    color: "#94A3B8",
    fontSize: 9,
    fontFamily: "monospace",
    fontWeight: "700",
  },
  splitsGridContainer: {
    gap: 8,
    paddingVertical: 4,
  },
  splitsRow: {
    flexDirection: "row",
    gap: 8,
  },
  splitItemWrap: {
    flex: 1,
  },
  splitBadge: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  splitBadgeActive: {
    shadowColor: "#38BDF8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 4,
  },
  splitBadgeGrad: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  splitBadgeText: {
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  splitActiveCheck: {
    marginLeft: 6,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  placementHintBanner: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.05)",
  },
  placementHintText: {
    color: "#94A3B8",
    fontSize: 10,
    fontFamily: "monospace",
  },

  /* Month Selector Row */
  monthSelectorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  monthBtnPrev: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 12,
  },
  monthBtnPrevText: {
    color: "#94A3B8",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    marginLeft: 4,
  },
  monthBtnCurrent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(80, 53, 127, 0.25)",
    borderWidth: 1,
    borderColor: "rgba(112, 123, 255, 0.4)",
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 12,
  },
  monthBtnCurrentText: {
    color: "#C5C0FF",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  monthBtnNext: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 12,
  },
  monthBtnNextText: {
    color: "#94A3B8",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "800",
    marginRight: 4,
  },

  /* Calendar Card */
  calendarGradientBorder: {
    padding: 1.5,
    borderRadius: 24,
    marginBottom: 20,
  },
  calendarInner: {
    backgroundColor: "#11141C",
    borderRadius: 22.5,
    padding: 16,
    paddingTop: 18,
  },
  daysHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 14,
  },
  dayHeaderText: {
    color: "#64748B",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "700",
    width: 36,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cellContainer: {
    width: "14%",
    alignItems: "center",
    marginBottom: 12,
  },
  dateBox: {
    width: 42,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#25252D",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  dateBoxInactive: {
    backgroundColor: "transparent",
  },
  dateBoxToday: {
    borderWidth: 0,
    shadowColor: "#6C5CFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  dateBoxHovered: {
    borderWidth: 2,
    transform: [{ scale: 1.15 }],
  },
  dateText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  dateTextInactive: {
    color: "#334155",
  },
  dateTextToday: {
    color: "#FFFFFF",
  },
  labelText: {
    fontSize: 8,
    fontFamily: "monospace",
    fontWeight: "700",
    fontStyle: "italic",
    textAlign: "center",
    height: 11,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.05)",
    gap: 18,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendText: {
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "700",
  },
  restDayDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#64748B",
  },

  /* Bottom CTA */
  updateButtonContainer: {
    borderRadius: 18,
    overflow: "hidden",
    elevation: 8,
  },
  updateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 18,
  },
  updateButtonText: {
    color: "#050811",
    fontSize: 13,
    fontFamily: "monospace",
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 0.8,
  },
  floatingToast: {
    position: "absolute",
    bottom: 92,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(7, 10, 17, 0.95)",
    borderWidth: 1.5,
    borderRadius: 14,
    zIndex: 9999,
    elevation: 12,
  },
  floatingToastText: {
    color: "#00f2fe",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 0.6,
  },

  /* Floating Drag Preview */
  floatingDragBadge: {
    position: "absolute",
    zIndex: 99999,
    elevation: 20,
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
  },
  floatingDragGrad: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  floatingDragText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  /* Modal Sheet */
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#11141C",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 34,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "monospace",
    fontWeight: "900",
  },
  modalSub: {
    color: "#94A3B8",
    fontSize: 11,
    fontFamily: "monospace",
    marginTop: 2,
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalSectionLabel: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 10,
  },
  modalSplitsList: {
    gap: 8,
    marginBottom: 16,
  },
  modalSplitItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
  },
  modalSplitItemActive: {
    backgroundColor: "rgba(56, 189, 248, 0.15)",
  },
  modalSplitLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  modalSplitDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  modalSplitName: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  modalActiveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  modalActiveText: {
    color: "#2DD4BF",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  modalClearBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "rgba(244, 63, 94, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(244, 63, 94, 0.25)",
  },
  modalClearText: {
    color: "#F43F5E",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "800",
  },
});
