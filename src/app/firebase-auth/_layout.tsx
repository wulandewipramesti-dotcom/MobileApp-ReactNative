import { router, Stack, usePathname } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";

export default function FirebaseAuthLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  // Memantau perubahan status Login dan Logout
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Mengatur halaman berdasarkan status Login
  useEffect(() => {
    if (loading) return;

    const isLoginPage =
      pathname === "/firebase-auth" || pathname === "/firebase-auth/index";

    if (!user && !isLoginPage) {
      router.replace("/firebase-auth" as any);
    } else if (user && isLoginPage) {
      router.replace("/firebase-auth/home" as any);
    }
  }, [user, loading, pathname]);

  // Menampilkan loading selama Firebase memeriksa status pengguna
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Login",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="details"
        options={{
          title: "Details",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
