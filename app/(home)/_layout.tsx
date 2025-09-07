import { Stack } from "expo-router";
import colors from "@/config/color";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{ contentStyle: { backgroundColor: colors.background } }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
    </Stack>
  );
}
