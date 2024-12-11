import { Stack, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function freeCouseLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
