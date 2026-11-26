import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";

export default function HomeScreen() {
  const user = FIREBASE_AUTH.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      //    router.replace("/firebase-auth/home" as any);
      router.replace("/firebase-auth" as any);
    } catch (error: any) {
      Alert.alert("Logout Gagal", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="checkmark-circle" size={65} color="#2563EB" />
      </View>

      <Text style={styles.title}>Welcome Home!</Text>
      <Text style={styles.subtitle}>Kamu berhasil login ke MobileApp.</Text>

      <View style={styles.card}>
        <Ionicons name="person-circle-outline" size={35} color="#2563EB" />
        <View style={styles.userInfo}>
          <Text style={styles.label}>Login sebagai:</Text>
          <Text style={styles.email}>{user?.email || "Pengguna"}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.detailButton}
        onPress={() => router.push("/firebase-auth/details" as any)}
      >
        <Text style={styles.buttonText}>Open Details</Text>
        <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#DC2626" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#1E293B",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 8,
    marginBottom: 30,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#64748B",
  },
  email: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1E293B",
    marginTop: 4,
  },
  detailButton: {
    width: "100%",
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
  logoutButton: {
    marginTop: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoutText: {
    color: "#DC2626",
    fontWeight: "bold",
    fontSize: 15,
  },
});
