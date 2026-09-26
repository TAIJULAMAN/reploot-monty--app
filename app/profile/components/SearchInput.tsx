import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Search } from "lucide-react-native";

export function SearchInput() {
  return (
    <View style={styles.searchContainer}>
      <Search size={20} color="#64748B" style={styles.searchIcon} />
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
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
    ...( { outlineStyle: "none" } as any ),
  },
});
