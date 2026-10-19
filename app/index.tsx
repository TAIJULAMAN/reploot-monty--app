import React from "react";
import { Redirect } from "expo-router";
import { useAppSelector } from "@/store/hooks";

export default function RootIndex() {
  return <Redirect href="/(tabs)/home" />;
}
