import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Calendar,
  ChevronLeft,
  ChevronDown,
  RefreshCw,
  ArrowRight,
  Dumbbell,
  ChevronRight,
} from "lucide-react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";

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

function generateCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const data = [];

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

    let type = undefined;
    let label = "";

    // Keep the mock data exactly as it was for October 2024
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

    data.push({
      date: i,
      currentMonth: true,
      type: type,
      label: label,
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

  if (data.length === 35) {
    for (let i = paddingEnd + 1; i <= paddingEnd + 7; i++) {
      data.push({
        date: i,
        currentMonth: false,
      });
    }
  }

  return data;
}

export default function WorkoutCalendarScreen() {
  const insets = useSafeAreaInsets();

  // Starting at Oct 2024 to show the mockup design data by default
  const [currentDate, setCurrentDate] = useState(() => new Date(2024, 9, 1));

  const handlePrevMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const currentYear = currentDate.getFullYear();
  const currentMonthIdx = currentDate.getMonth();

  const prevMonthIdx = currentMonthIdx === 0 ? 11 : currentMonthIdx - 1;
  const prevMonthName = MONTH_NAMES[prevMonthIdx];

  const calendarData = useMemo(
    () => generateCalendar(currentYear, currentMonthIdx),
    [currentYear, currentMonthIdx],
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={["#6C5CFF", "#44EAC3"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.headerIconContainer}
          >
            <Calendar color="#FFFFFF" size={28} />
          </LinearGradient>
          <Text style={styles.headerTitle}>WORKOUT CALENDER</Text>
        </View>

        <View style={styles.divider} />

        {/* Month Selector */}
        <View style={styles.monthSelectorRow}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Pressable onPress={() => router.canGoBack() ? router.back() : router.replace("/")} style={styles.backBtn}>
              <ChevronLeft color="#94A3B8" size={16} />
            </Pressable>
            <Pressable onPress={handlePrevMonth} style={styles.monthBtnPrev}>
              <ChevronLeft color="#94A3B8" size={16} />
              <Text style={styles.monthBtnPrevText}>{prevMonthName}</Text>
            </Pressable>
          </View>

          <Pressable onPress={handleNextMonth} style={styles.monthBtnCurrent}>
            <Text
              style={styles.monthBtnCurrentText}
            >{`${MONTH_NAMES[currentMonthIdx]} ${currentYear}`}</Text>
            <ChevronRight color="#C5C0FF" size={16} />
          </Pressable>
        </View>

        {/* Calendar Grid Container */}
        <LinearGradient
          colors={["#50357F", "#1D8B9B"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.calendarGradientBorder}
        >
          <View style={styles.calendarInner}>
            {/* Days Header */}
            <View style={styles.daysHeader}>
              {DAYS_OF_WEEK.map((day) => (
                <Text key={day} style={styles.dayHeaderText}>
                  {day}
                </Text>
              ))}
            </View>

            {/* Calendar Grid */}
            <View style={styles.gridContainer}>
              {calendarData.map((item, index) => {
                const isCompleted = item.type === "completed";
                const isScheduled = item.type === "scheduled";
                const isToday = item.type === "today";

                return (
                  <View key={index} style={styles.cellContainer}>
                    {isToday ? (
                      <LinearGradient
                        colors={["#6C5CFF", "#44EAC3"]}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={[styles.dateBox, styles.dateBoxToday]}
                      >
                        <Text
                          style={[
                            styles.dateText,
                            styles.dateTextToday,
                            item.label === "Pull Day" && { color: "#C5C0FF" },
                          ]}
                        >
                          {item.date}
                        </Text>
                        <Image
                          source={require("../assets/dumble.svg")}
                          style={{
                            width: 16,
                            height: 16,
                            marginTop: 6,
                            tintColor:
                              item.label === "Pull Day" ? "#C5C0FF" : "#FFFFFF",
                          }}
                          contentFit="contain"
                        />
                      </LinearGradient>
                    ) : (
                      <View
                        style={[
                          styles.dateBox,
                          !item.currentMonth && styles.dateBoxInactive,
                          isCompleted && styles.dateBoxCompleted,
                          isScheduled && styles.dateBoxScheduled,
                        ]}
                      >
                        <Text
                          style={[
                            styles.dateText,
                            !item.currentMonth && styles.dateTextInactive,
                            isScheduled && styles.dateTextScheduled,
                            isCompleted && styles.dateTextCompleted,
                          ]}
                        >
                          {item.date}
                        </Text>
                        {(isCompleted || isScheduled) && (
                          <Image
                            source={
                              isCompleted
                                ? require("../assets/dumble.svg")
                                : require("../assets/scheduledDumble.svg")
                            }
                            style={{
                              width: 16,
                              height: 16,
                              marginTop: 6,
                              tintColor: isCompleted ? "#2EE8B3" : "#C5C0FF",
                            }}
                            contentFit="contain"
                          />
                        )}
                      </View>
                    )}
                    <Text style={styles.labelText}>{item.label || " "}</Text>
                  </View>
                );
              })}
            </View>

            {/* Legend */}
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <Image
                  source={require("../assets/dumble.svg")}
                  style={{ width: 14, height: 14, tintColor: "#2EE8B3" }}
                  contentFit="contain"
                />
                <Text style={[styles.legendText, { color: "#2EE8B3" }]}>
                  Completed
                </Text>
              </View>
              <View style={styles.legendItem}>
                <Image
                  source={require("../assets/scheduledDumble.svg")}
                  style={{ width: 14, height: 14, tintColor: "#C5C0FF" }}
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

        {/* Update Schedule Button */}
        <Pressable style={styles.updateButtonContainer}>
          <LinearGradient
            colors={["#1B648C", "#3FA8DD"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.updateButton}
          >
            <RefreshCw color="#FFFFFF" size={20} />
            <Text style={styles.updateButtonText}>
              UPDATE MY WORKOUT{"\n"}SCHEDULE
            </Text>
            <ArrowRight color="#FFFFFF" size={20} />
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1D23",
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 10,
  },
  headerIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "JetBrainsMono_700Bold",
    fontStyle: "italic",
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginBottom: 24,
  },
  monthSelectorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  backBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2E2E36",
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  monthBtnPrev: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E2E36",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  monthBtnPrevText: {
    color: "#94A3B8",
    fontSize: 14,
    fontFamily: "JetBrainsMono_700Bold",
    marginLeft: 4,
  },
  monthBtnCurrent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(80, 53, 127, 0.2)",
    borderWidth: 1,
    borderColor: "#50357F",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  monthBtnCurrentText: {
    color: "#C5C0FF",
    fontSize: 14,
    fontFamily: "JetBrainsMono_700Bold",
    marginRight: 8,
  },
  calendarGradientBorder: {
    padding: 1,
    borderRadius: 24,
    marginBottom: 32,
  },
  calendarInner: {
    backgroundColor: "#18181D",
    borderRadius: 23,
    padding: 20,
  },
  daysHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  dayHeaderText: {
    color: "#64748B",
    fontSize: 12,
    fontFamily: "JetBrainsMono_700Bold",
    width: 32,
    textAlign: "center",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cellContainer: {
    width: "14%",
    alignItems: "center",
    marginBottom: 16,
  },
  dateBox: {
    width: 44,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#25252D",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  dateBoxInactive: {
    backgroundColor: "transparent",
  },
  dateBoxCompleted: {
    borderWidth: 1.5,
    borderColor: "#1B6A56",
    backgroundColor: "#1C332D",
  },
  dateBoxScheduled: {
    borderWidth: 1.5,
    borderColor: "#4A4389",
    backgroundColor: "#2D2D48",
  },
  dateBoxToday: {
    borderWidth: 0,
  },
  dateText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "JetBrainsMono_700Bold",
  },
  dateTextInactive: {
    color: "#475569",
  },
  dateTextToday: {
    color: "#FFFFFF",
  },
  dateTextCompleted: {
    color: "#2EE8B3",
  },
  dateTextScheduled: {
    color: "#C5C0FF",
  },
  labelText: {
    color: "#94A3B8",
    fontSize: 8,
    fontFamily: "JetBrainsMono_700Bold",
    fontStyle: "italic",
    textAlign: "center",
    height: 12,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
    gap: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendText: {
    fontSize: 12,
    fontFamily: "JetBrainsMono_700Bold",
  },
  restDayDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#64748B",
  },
  updateButtonContainer: {
    elevation: 8,
  },
  updateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 20,
  },
  updateButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "JetBrainsMono_700Bold",
    textAlign: "center",
    letterSpacing: 1,
  },
});
