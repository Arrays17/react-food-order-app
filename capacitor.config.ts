import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.foodorderapp",
  appName: "Food Order App",
  webDir: "build",
  bundledWebRuntime: false,
  server: {
    url: "http://192.168.1.2:3000",
    cleartext: true,
  },
};

export default config;
