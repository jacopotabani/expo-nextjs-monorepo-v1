import "@/globals.css";
import { Stack } from "expo-router";
import { GluestackUIProvider } from "@acme/ui/gluestack-ui-provider";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <Stack />
    </GluestackUIProvider>
  );
}
