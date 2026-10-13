import { Search } from "lucide-react-native";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export function SearchInput() {
  return (
    <View style={styles.searchContainer}>
      <Search size={18} color="#38BDF8" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Find athlete..."
        placeholderTextColor="#64748B"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.2)",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "monospace",
    ...( { outlineStyle: "none" } as any ),
  },
});
