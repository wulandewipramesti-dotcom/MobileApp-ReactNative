import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";

export default function HomeScreen() {
  const user = FIREBASE_AUTH.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      router.replace("/firebase-auth" as any);
    } catch (error: any) {
      Alert.alert("Logout Gagal", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F1F3D" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="shield-checkmark" size={27} color="#FFFFFF" />
        </View>

        <Text style={styles.brand}>MobileApp</Text>
        <Text style={styles.headerSubtitle}>FIREBASE AUTHENTICATION</Text>

        <View style={styles.welcomeIcon}>
          <Ionicons name="checkmark-circle" size={72} color="#60A5FA" />
        </View>

        <Text style={styles.welcomeTitle}>Welcome Home!</Text>
        <Text style={styles.welcomeSubtitle}>Senang melihatmu kembali.</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.statusCard}>
          <View style={styles.statusIcon}>
            <Ionicons name="checkmark" size={18} color="#16A34A" />
          </View>
          <View style={styles.statusInfo}>
            <Text style={styles.statusTitle}>Login Berhasil</Text>
            <Text style={styles.statusSubtitle}>
              Akun kamu berhasil terautentikasi
            </Text>
          </View>
          <View style={styles.activeBadge}>
            <Text style={styles.activeText}>Active</Text>
          </View>
        </View>

        {/* User Profile */}
        <Text style={styles.sectionTitle}>Informasi Akun</Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={34} color="#2563EB" />
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.label}>Login sebagai</Text>
            <Text style={styles.email} numberOfLines={2}>
              {user?.email || "Pengguna"}
            </Text>
          </View>
          <Ionicons name="checkmark-circle" size={23} color="#16A34A" />
        </View>

        {/* Details Button */}
        <TouchableOpacity
          style={styles.detailButton}
          onPress={() => router.push("/firebase-auth/details" as any)}
          activeOpacity={0.85}
        >
          <View style={styles.buttonIcon}>
            <Ionicons name="person-outline" size={21} color="#FFFFFF" />
          </View>
          <View style={styles.buttonInfo}>
            <Text style={styles.buttonTitle}>Account Details</Text>
            <Text style={styles.buttonSubtitle}>
              Lihat informasi lengkap akun
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.85}
        >
          <Ionicons name="log-out-outline" size={21} color="#DC2626" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>MobileApp • Secure Authentication</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  header: {
    backgroundColor: "#0F1F3D",
    paddingTop: 55,
    paddingBottom: 38,
    paddingHorizontal: 25,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logoContainer: {
    width: 48,
    height: 48,
    backgroundColor: "#2563EB",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  brand: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#93C5FD",
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 5,
  },
  welcomeIcon: {
    marginTop: 25,
    marginBottom: 8,
  },
  welcomeTitle: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "bold",
  },
  welcomeSubtitle: {
    color: "#CBD5E1",
    fontSize: 14,
    marginTop: 7,
  },
  content: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 25,
  },
  statusCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  statusIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
  },
  statusInfo: {
    flex: 1,
    marginLeft: 11,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E293B",
  },
  statusSubtitle: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 4,
  },
  activeBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  activeText: {
    color: "#15803D",
    fontSize: 10,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 12,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    flex: 1,
    marginLeft: 13,
    marginRight: 8,
  },
  label: {
    color: "#64748B",
    fontSize: 11,
  },
  email: {
    color: "#1E293B",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  detailButton: {
    backgroundColor: "#2563EB",
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonInfo: {
    flex: 1,
    marginLeft: 13,
  },
  buttonTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonSubtitle: {
    color: "#DBEAFE",
    fontSize: 11,
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
    marginTop: 14,
  },
  logoutText: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "bold",
  },
  footer: {
    color: "#94A3B8",
    fontSize: 11,
    textAlign: "center",
    marginTop: 22,
  },
});
