import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Pressable, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

interface PaginationPillsProps {
  total?: number;
  activeIndex: number;
  onSelectIndex?: (index: number) => void;
}

export const PaginationPills: React.FC<PaginationPillsProps> = ({
  total = 3,
  activeIndex,
  onSelectIndex,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => (
        <PillItem
          key={index}
          isActive={index === activeIndex}
          onPress={() => {
            if (onSelectIndex && index !== activeIndex) {
              try {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              } catch {
                // ignore
              }
              onSelectIndex(index);
            }
          }}
        />
      ))}
    </View>
  );
};

const PillItem: React.FC<{
  isActive: boolean;
  onPress: () => void;
}> = ({ isActive, onPress }) => {
  const widthAnim = useRef(new Animated.Value(isActive ? 46 : 22)).current;
  const opacityAnim = useRef(new Animated.Value(isActive ? 1 : 0.3)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(widthAnim, {
        toValue: isActive ? 46 : 22,
        tension: 50,
        friction: 8,
        useNativeDriver: false, // width requires layout driver
      }),
      Animated.timing(opacityAnim, {
        toValue: isActive ? 1 : 0.25,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isActive]);

  return (
    <Pressable
      onPress={onPress}
      hitSlop={{ top: 12, bottom: 12, left: 6, right: 6 }}
      style={styles.pillPressable}
    >
      <Animated.View
        style={[
          styles.pillBase,
          {
            width: widthAnim,
            opacity: opacityAnim,
          },
        ]}
      >
        {isActive ? (
          <LinearGradient
            colors={["#818CF8", "#2DD4BF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        ) : (
          <View style={styles.inactivePill} />
        )}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginVertical: 20,
  },
  pillPressable: {
    paddingVertical: 4,
  },
  pillBase: {
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  inactivePill: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.28)",
  },
});
