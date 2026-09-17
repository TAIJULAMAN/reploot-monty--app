import React, { useRef, useEffect, useMemo, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Pressable,
  ScrollView,
} from "react-native";
import * as Haptics from "expo-haptics";

interface VerticalWheelPickerProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  unit: string;
  itemHeight?: number;
}

const DEFAULT_ITEM_HEIGHT = 36;

interface WheelItemProps {
  val: number;
  index: number;
  unit: string;
  itemHeight: number;
  scrollY: Animated.Value;
  onPress: (val: number) => void;
}

const WheelItem = React.memo(
  ({ val, index, unit, itemHeight, scrollY, onPress }: WheelItemProps) => {
    const inputRange = [
      (index - 2) * itemHeight,
      (index - 1) * itemHeight,
      index * itemHeight,
      (index + 1) * itemHeight,
      (index + 2) * itemHeight,
    ];

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.15, 0.45, 1.0, 0.45, 0.15],
      extrapolate: "clamp",
    });

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.68, 0.76, 1.0, 0.76, 0.68],
      extrapolate: "clamp",
    });

    // Only display unit when item is in the active center slot
    const unitOpacity = scrollY.interpolate({
      inputRange: [
        (index - 0.5) * itemHeight,
        index * itemHeight,
        (index + 0.5) * itemHeight,
      ],
      outputRange: [0, 1, 0],
      extrapolate: "clamp",
    });

    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Select ${val} ${unit}`}
        onPress={() => onPress(val)}
        style={[styles.itemRow, { height: itemHeight }]}
      >
        <Animated.View
          style={[
            styles.itemContent,
            {
              opacity,
              transform: [{ scale }],
            },
          ]}
        >
          <Text style={styles.numberText}>{val}</Text>
          <Animated.Text style={[styles.unitText, { opacity: unitOpacity }]}>
            {unit}
          </Animated.Text>
        </Animated.View>
      </Pressable>
    );
  }
);

export function VerticalWheelPicker({
  value,
  onChange,
  min,
  max,
  unit,
  itemHeight = DEFAULT_ITEM_HEIGHT,
}: VerticalWheelPickerProps) {
  const scrollViewRef = useRef<ScrollView | null>(null);

  const values = useMemo(
    () => Array.from({ length: max - min + 1 }, (_, i) => min + i),
    [min, max]
  );

  const initialOffsetRef = useRef((value - min) * itemHeight);
  const scrollY = useRef(new Animated.Value(initialOffsetRef.current)).current;
  const lastReportedValRef = useRef<number>(value);
  const isDraggingRef = useRef<boolean>(false);

  // Position on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const targetOffset = (value - min) * itemHeight;
      const node = (scrollViewRef.current as any)?.getNode?.() ?? scrollViewRef.current;
      node?.scrollTo({ y: targetOffset, x: 0, animated: false });
    }, 50);
    return () => clearTimeout(timer);
  }, [min, itemHeight]);

  // Sync scroll position if value changes externally (e.g. unit toggle or reset)
  useEffect(() => {
    if (!isDraggingRef.current && value !== lastReportedValRef.current) {
      lastReportedValRef.current = value;
      const targetOffset = (value - min) * itemHeight;
      const node = (scrollViewRef.current as any)?.getNode?.() ?? scrollViewRef.current;
      node?.scrollTo({ y: targetOffset, x: 0, animated: true });
    }
  }, [value, min, itemHeight]);

  const handlePress = useCallback(
    (targetVal: number) => {
      const targetOffset = (targetVal - min) * itemHeight;
      const node = (scrollViewRef.current as any)?.getNode?.() ?? scrollViewRef.current;
      node?.scrollTo({ y: targetOffset, x: 0, animated: true });
      lastReportedValRef.current = targetVal;
      onChange(targetVal);
      try {
        Haptics.selectionAsync();
      } catch {
        // ignore
      }
    },
    [min, itemHeight, onChange]
  );

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / itemHeight);
        const clampedIndex = Math.max(0, Math.min(values.length - 1, index));
        const currentVal = values[clampedIndex];

        if (currentVal !== lastReportedValRef.current) {
          lastReportedValRef.current = currentVal;
          try {
            Haptics.selectionAsync();
          } catch {
            // ignore
          }
          onChange(currentVal);
        }
      },
    }
  );

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    isDraggingRef.current = false;
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / itemHeight);
    const clampedIndex = Math.max(0, Math.min(values.length - 1, index));
    const currentVal = values[clampedIndex];

    if (currentVal !== lastReportedValRef.current) {
      lastReportedValRef.current = currentVal;
      onChange(currentVal);
    }
  };

  const pickerHeight = itemHeight * 3;

  return (
    <View style={[styles.container, { height: pickerHeight }]}>
      {/* Top Viewfinder Divider Line */}
      <View
        style={[styles.dividerLine, { top: itemHeight }]}
        pointerEvents="none"
      />

      {/* Bottom Viewfinder Divider Line */}
      <View
        style={[styles.dividerLine, { top: itemHeight * 2 }]}
        pointerEvents="none"
      />

      <Animated.ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        snapToAlignment="start"
        decelerationRate="fast"
        nestedScrollEnabled={true}
        overScrollMode="never"
        bounces={false}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingVertical: itemHeight,
        }}
        onScrollBeginDrag={() => {
          isDraggingRef.current = true;
        }}
        onScroll={onScroll}
        onMomentumScrollEnd={handleScrollEnd}
        onScrollEndDrag={handleScrollEnd}
      >
        {values.map((val, index) => (
          <WheelItem
            key={val}
            val={val}
            index={index}
            unit={unit}
            itemHeight={itemHeight}
            scrollY={scrollY}
            onPress={handlePress}
          />
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    overflow: "hidden",
  },
  dividerLine: {
    position: "absolute",
    left: 16,
    right: 16,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    zIndex: 5,
  },
  itemRow: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
  },
  numberText: {
    color: "#FFFFFF",
    fontSize: 32,
    lineHeight: 36,
    fontWeight: "900",
    fontStyle: "italic",
    letterSpacing: -0.5,
    includeFontPadding: false,
  },
  unitText: {
    color: "#2DD4BF",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 1,
    marginLeft: 8,
    includeFontPadding: false,
  },
});
