import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";

export default function DetailsScreen() {
  const user = FIREBASE_AUTH.currentUser;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Ionicons name="person-circle-outline" size={42} color="#FFFFFF" />
        </View>
        <Text style={styles.headerTitle}>Account Details</Text>
        <Text style={styles.headerSubtitle}>
          Your personal account information
        </Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={38} color="#2563EB" />
        </View>

        <Text style={styles.profileName}>
          {user?.email?.split("@")[0] || "MobileApp User"}
        </Text>
        <Text style={styles.profileEmail}>
          {user?.email || "No email available"}
        </Text>

        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Authenticated</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Account Information</Text>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons name="mail-outline" size={21} color="#2563EB" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Email Address</Text>
            <Text style={styles.infoValue}>
              {user?.email || "Not available"}
            </Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons name="finger-print-outline" size={21} color="#2563EB" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>User ID</Text>
            <Text style={styles.infoValue} numberOfLines={2}>
              {user?.uid || "Not available"}
            </Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons
              name="shield-checkmark-outline"
              size={21}
              color="#2563EB"
            />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Authentication Provider</Text>
            <Text style={styles.infoValue}>
              {user?.providerData?.[0]?.providerId || "Firebase"}
            </Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons name="calendar-outline" size={21} color="#2563EB" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Account Created</Text>
            <Text style={styles.infoValue}>
              {user?.metadata.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString(
                    "id-ID",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )
                : "Not available"}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.securityCard}>
        <Ionicons name="shield-checkmark" size={24} color="#16A34A" />
        <View style={styles.securityContent}>
          <Text style={styles.securityTitle}>Account Secured</Text>
          <Text style={styles.securityDescription}>
            Your account is currently authenticated using Firebase
            Authentication.
          </Text>
        </View>
      </View>

      <Text style={styles.footer}>MobileApp • Firebase Authentication</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  content: {
    padding: 20,
    paddingBottom: 35,
  },
  header: {
    backgroundColor: "#0F1F3D",
    borderRadius: 22,
    padding: 24,
    alignItems: "center",
    marginBottom: 22,
  },
  headerIcon: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 13,
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    color: "#CBD5E1",
    fontSize: 12,
    marginTop: 6,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    alignItems: "center",
    padding: 24,
    marginBottom: 25,
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 13,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#172554",
  },
  profileEmail: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 5,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 14,
    gap: 7,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#16A34A",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#15803D",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#172554",
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 5,
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  infoIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },
  infoContent: {
    flex: 1,
    marginLeft: 13,
  },
  infoLabel: {
    fontSize: 11,
    color: "#94A3B8",
    marginBottom: 5,
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
  },
  separator: {
    height: 1,
    backgroundColor: "#F1F5F9",
  },
  securityCard: {
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
    gap: 12,
  },
  securityContent: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#166534",
  },
  securityDescription: {
    fontSize: 11,
    color: "#4B7C5B",
    lineHeight: 17,
    marginTop: 4,
  },
  footer: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 11,
    marginTop: 25,
  },
});
