import * as Haptics from "expo-haptics";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

interface AgeSliderProps {
  value: number;
  onChange: (age: number) => void;
  minAge?: number;
  maxAge?: number;
}

const ITEM_WIDTH = 48;
const DEFAULT_MIN_AGE = 16;
const DEFAULT_MAX_AGE = 75;

interface AgeItemProps {
  age: number;
  index: number;
  scrollX: Animated.Value;
  onPress: (age: number) => void;
}

const AgeItem = React.memo(({ age, index, scrollX, onPress }: AgeItemProps) => {
  const inputRange = [
    (index - 2) * ITEM_WIDTH,
    (index - 1) * ITEM_WIDTH,
    index * ITEM_WIDTH,
    (index + 1) * ITEM_WIDTH,
    (index + 2) * ITEM_WIDTH,
  ];

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.22, 0.55, 1.0, 0.55, 0.22],
    extrapolate: "clamp",
  });

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.52, 0.62, 1.0, 0.62, 0.52],
    extrapolate: "clamp",
  });

  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [9, 7.5, 0, 7.5, 9],
    extrapolate: "clamp",
  });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Select age ${age}`}
      onPress={() => onPress(age)}
      style={styles.itemWrapper}
    >
      <Animated.View
        style={[
          styles.itemAnimated,
          {
            opacity,
            transform: [{ scale }, { translateY }],
          },
        ]}
      >
        <Text style={styles.ageText}>{age}</Text>
      </Animated.View>
    </Pressable>
  );
});

export function AgeSlider({
  value,
  onChange,
  minAge = DEFAULT_MIN_AGE,
  maxAge = DEFAULT_MAX_AGE,
}: AgeSliderProps) {
  const { width: windowWidth } = useWindowDimensions();
  const estimatedSliderWidth = Math.max(180, windowWidth - 40 - 36 - 78);
  const initialSpacer = Math.max(0, (estimatedSliderWidth - ITEM_WIDTH) / 2);
  const [spacerWidth, setSpacerWidth] = useState(initialSpacer);
  const scrollViewRef = useRef<ScrollView | null>(null);

  const ages = useMemo(
    () => Array.from({ length: maxAge - minAge + 1 }, (_, i) => minAge + i),
    [minAge, maxAge],
  );

  // Initial offset frozen on mount so re-renders don't reset scroll position
  const initialOffsetRef = useRef((value - minAge) * ITEM_WIDTH);
  const scrollX = useRef(new Animated.Value(initialOffsetRef.current)).current;
  const lastReportedAgeRef = useRef<number>(value);
  const isDraggingRef = useRef<boolean>(false);

  // Ensure exact initial scroll position on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const initialOffset = (value - minAge) * ITEM_WIDTH;
      scrollViewRef.current?.scrollTo({ x: initialOffset, animated: false });
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  // Sync scroll position if value changes externally (e.g. store reset)
  useEffect(() => {
    if (!isDraggingRef.current && value !== lastReportedAgeRef.current) {
      lastReportedAgeRef.current = value;
      const targetOffset = (value - minAge) * ITEM_WIDTH;
      scrollViewRef.current?.scrollTo({ x: targetOffset, animated: true });
    }
  }, [value, minAge]);

  const handleLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w > 0) {
      const calculatedSpacer = (w - ITEM_WIDTH) / 2;
      if (Math.abs(calculatedSpacer - spacerWidth) > 0.5) {
        setSpacerWidth(calculatedSpacer);
      }
    }
  };

  const handlePress = useCallback(
    (targetAge: number) => {
      const targetOffset = (targetAge - minAge) * ITEM_WIDTH;
      scrollViewRef.current?.scrollTo({ x: targetOffset, animated: true });
      lastReportedAgeRef.current = targetAge;
      onChange(targetAge);
      try {
        Haptics.selectionAsync();
      } catch {
        // ignore
      }
    },
    [minAge, onChange],
  );

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: true,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / ITEM_WIDTH);
        const clampedIndex = Math.max(0, Math.min(ages.length - 1, index));
        const currentAge = ages[clampedIndex];

        if (currentAge !== lastReportedAgeRef.current) {
          lastReportedAgeRef.current = currentAge;
          try {
            Haptics.selectionAsync();
          } catch {
            // ignore
          }
          onChange(currentAge);
        }
      },
    },
  );

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    isDraggingRef.current = false;
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / ITEM_WIDTH);
    const clampedIndex = Math.max(0, Math.min(ages.length - 1, index));
    const currentAge = ages[clampedIndex];

    if (currentAge !== lastReportedAgeRef.current) {
      lastReportedAgeRef.current = currentAge;
      onChange(currentAge);
    }
  };

  return (
    <View style={styles.container} onLayout={handleLayout}>
      {/* Static Top Tick Mark Indicator directly above center active number */}
      <View style={styles.tickIndicatorContainer} pointerEvents="none">
        <View style={styles.tickMark} />
      </View>

      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        snapToAlignment="start"
        decelerationRate="fast"
        nestedScrollEnabled={true}
        overScrollMode="never"
        bounces={false}
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: spacerWidth },
        ]}
        onScrollBeginDrag={() => {
          isDraggingRef.current = true;
        }}
        onScroll={onScroll}
        onMomentumScrollEnd={handleScrollEnd}
        onScrollEndDrag={handleScrollEnd}
      >
        {ages.map((age, index) => (
          <AgeItem
            key={age}
            age={age}
            index={index}
            scrollX={scrollX}
            onPress={handlePress}
          />
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    position: "relative",
    overflow: "hidden",
  },
  tickIndicatorContainer: {
    position: "absolute",
    top: 13,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
  },
  tickMark: {
    width: 2.5,
    height: 5.5,
    borderRadius: 1.25,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    height: "100%",
    alignItems: "flex-end",
    paddingBottom: 8,
  },
  itemWrapper: {
    width: ITEM_WIDTH,
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  itemAnimated: {
    alignItems: "center",
    justifyContent: "center",
  },
  ageText: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "900",
  },
});
