import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function DetailsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="document-text-outline" size={65} color="#2563EB" />
      </View>

      <Text style={styles.title}>Details Page</Text>

      <Text style={styles.description}>
        Selamat datang di halaman Details MobileApp. Halaman ini dapat diakses
        setelah pengguna berhasil login.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1E293B",
  },
  description: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
    marginTop: 12,
  },
});
