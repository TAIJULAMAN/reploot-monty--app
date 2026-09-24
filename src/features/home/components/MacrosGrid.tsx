import { Beef, Droplets, Egg, Wheat } from "lucide-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { MacroBox } from "./MacroBox";

export const MacrosGrid = () => {
  return (
    <View style={styles.macrosGrid}>
      <MacroBox
        icon={<Egg size={24} color="#9D7DFD" strokeWidth={2} />}
        percent="80%"
        label="PROTEIN"
        current="145g"
        target="180g"
        color="#9D7DFD"
        pillBgColor="#44EAC330"
        pillBorderColor="#44EAC3"
      />
      <MacroBox
        icon={<Wheat size={24} color="#F79C42" strokeWidth={2} />}
        percent="84%"
        label="CARBS"
        current="210g"
        target="250g"
        color="#F79C42"
        pillBgColor="#C5C0FF30"
        pillBorderColor="#C5C0FF"
      />
      <MacroBox
        icon={<Beef size={24} color="#F04949" strokeWidth={2} />}
        percent="74%"
        label="FATS"
        current="52g"
        target="70g"
        color="#F04949"
        pillBgColor="#FFB68C30"
        pillBorderColor="#FFB68C"
      />
      <MacroBox
        icon={<Droplets size={24} color="#5599F5" strokeWidth={2} />}
        percent="70%"
        label="HYDRATION"
        current="2.1L"
        target="3.0L"
        color="#5599F5"
        pillBgColor="#60A5FA30"
        pillBorderColor="#60A5FA"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  macrosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
});
