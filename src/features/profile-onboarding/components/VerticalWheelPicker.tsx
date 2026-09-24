import * as Haptics from "expo-haptics";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface VerticalWheelPickerProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  unit: string;
  itemHeight?: number;
}

const DEFAULT_ITEM_HEIGHT = 44;

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
      outputRange: [0.12, 0.38, 1.0, 0.38, 0.12],
      extrapolate: "clamp",
    });
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.68, 0.78, 1.0, 0.78, 0.68],
      extrapolate: "clamp",
    });
    const unitOpacity = scrollY.interpolate({
      inputRange: [
        (index - 0.45) * itemHeight,
        index * itemHeight,
        (index + 0.45) * itemHeight,
      ],
      outputRange: [0, 1, 0],
      extrapolate: "clamp",
    });

    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Select ${val} ${unit}`}
        unstable_pressDelay={0}
        hitSlop={4}
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
  },
);

export const VerticalWheelPicker = React.memo(function VerticalWheelPicker({
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
    [min, max],
  );

  const initialOffset = Math.max(0, (value - min) * itemHeight);
  const scrollY = useRef(new Animated.Value(initialOffset)).current;
  const lastReportedValRef = useRef<number>(value);
  const isUserInteractingRef = useRef<boolean>(false);
  const isProgrammaticScrollRef = useRef<boolean>(false);

  // Sync scroll position whenever value, range, or unit changes while not dragging
  useEffect(() => {
    if (isUserInteractingRef.current) return;

    isProgrammaticScrollRef.current = true;
    lastReportedValRef.current = value;
    const targetOffset = Math.max(0, (value - min) * itemHeight);
    scrollY.setValue(targetOffset);

    const node =
      (scrollViewRef.current as any)?.getNode?.() ?? scrollViewRef.current;
    node?.scrollTo({ y: targetOffset, x: 0, animated: false });

    const timer = setTimeout(() => {
      node?.scrollTo({ y: targetOffset, x: 0, animated: false });
      isProgrammaticScrollRef.current = false;
    }, 50);

    return () => clearTimeout(timer);
  }, [value, min, max, unit, itemHeight]);

  const handlePress = useCallback(
    (targetVal: number) => {
      isUserInteractingRef.current = true;
      isProgrammaticScrollRef.current = false;
      const targetOffset = Math.max(0, (targetVal - min) * itemHeight);
      const node =
        (scrollViewRef.current as any)?.getNode?.() ?? scrollViewRef.current;
      node?.scrollTo({ y: targetOffset, x: 0, animated: true });
      lastReportedValRef.current = targetVal;
      onChange(targetVal);
      requestAnimationFrame(() => {
        try {
          void Haptics.selectionAsync();
        } catch {
          // ignore
        }
      });
      setTimeout(() => {
        isUserInteractingRef.current = false;
      }, 300);
    },
    [min, itemHeight, onChange],
  );

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (isProgrammaticScrollRef.current || !isUserInteractingRef.current) {
          return;
        }

        const offsetY = event.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / itemHeight);
        const clampedIndex = Math.max(0, Math.min(values.length - 1, index));
        const currentVal = values[clampedIndex];

        if (
          currentVal !== undefined &&
          currentVal !== lastReportedValRef.current
        ) {
          lastReportedValRef.current = currentVal;
          requestAnimationFrame(() => {
            try {
              void Haptics.selectionAsync();
            } catch {
              // ignore
            }
          });
          onChange(currentVal);
        }
      },
    },
  );

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isProgrammaticScrollRef.current) {
      isProgrammaticScrollRef.current = false;
      return;
    }

    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / itemHeight);
    const clampedIndex = Math.max(0, Math.min(values.length - 1, index));
    const currentVal = values[clampedIndex];

    if (currentVal !== undefined && currentVal !== lastReportedValRef.current) {
      lastReportedValRef.current = currentVal;
      onChange(currentVal);
    }
    isUserInteractingRef.current = false;
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
          isUserInteractingRef.current = true;
          isProgrammaticScrollRef.current = false;
        }}
        onScroll={onScroll}
        onMomentumScrollEnd={handleScrollEnd}
        onScrollEndDrag={() => {
          setTimeout(() => {
            isUserInteractingRef.current = false;
          }, 150);
        }}
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
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    overflow: "hidden",
  },
  dividerLine: {
    position: "absolute",
    left: 20,
    right: 20,
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
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  numberText: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "900",
    fontStyle: "italic",
    letterSpacing: -0.5,
    includeFontPadding: false,
    textAlign: "center",
  },
  unitText: {
    position: "absolute",
    left: "50%",
    marginLeft: 140,
    color: "#2DD4BF",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1,
    includeFontPadding: false,
  },
});
