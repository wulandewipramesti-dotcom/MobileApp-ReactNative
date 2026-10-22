import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#1565C0",
        tabBarInactiveTintColor: "#777777",
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: "Home",
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarLabel: "About",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
}
