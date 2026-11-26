
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Incomplete Information", "Please enter your email and password.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Invalid Password", "Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(
          FIREBASE_AUTH,
          email.trim(),
          password
        );
      } else {
        await signInWithEmailAndPassword(
          FIREBASE_AUTH,
          email.trim(),
          password
        );
      }

      // Firebase onAuthStateChanged will redirect the user to Home.
      router.replace("/firebase-auth/home" as any);
    } catch (error: any) {
      let message = "Something went wrong. Please try again.";

      if (error.code === "auth/email-already-in-use") {
        message = "This email is already registered. Please login instead.";
      } else if (error.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      } else if (error.code === "auth/invalid-credential") {
        message = "Incorrect email or password.";
      } else if (error.code === "auth/weak-password") {
        message = "Please use a stronger password.";
      }

      Alert.alert("Authentication Failed", message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsRegister(!isRegister);
    setPassword("");
    setShowPassword(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logo}>
            <Ionicons name="shield-checkmark" size={34} color="#FFFFFF" />
          </View>

          <Text style={styles.appName}>MobileApp</Text>
          <Text style={styles.tagline}>Simple. Secure. Connected.</Text>

          <View style={styles.secureBadge}>
            <Ionicons name="lock-closed" size={12} color="#BFDBFE" />
            <Text style={styles.secureBadgeText}>SECURE AUTHENTICATION</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeading}>
            <Text style={styles.title}>
              {isRegister ? "Create Account" : "Welcome Back!"}
            </Text>
            <Text style={styles.description}>
              {isRegister
                ? "Create your account and get started with MobileApp."
                : "Sign in to continue to your account."}
            </Text>
          </View>

          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#64748B" />
            <TextInput
              style={styles.input}
              placeholder="name@example.com"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#64748B" />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              accessibilityLabel={showPassword ? "Hide password" : "Show password"}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={21}
                color="#64748B"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleAuth}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Text style={styles.buttonText}>
                  {isRegister ? "Create Account" : "Sign In"}
                </Text>
                <Ionicons name="arrow-forward" size={19} color="#FFFFFF" />
              </>
            )}
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}
            </Text>
            <TouchableOpacity onPress={switchMode}>
              <Text style={styles.switchLink}>
                {isRegister ? " Sign In" : " Sign Up"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Ionicons name="shield-checkmark-outline" size={15} color="#64748B" />
          <Text style={styles.footerText}>
            Your account is protected by Firebase Authentication.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1F3D",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 22,
    paddingVertical: 35,
  },
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  logo: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#60A5FA",
  },
  appName: {
    fontSize: 29,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 14,
    letterSpacing: 0.5,
  },
  tagline: {
    color: "#CBD5E1",
    fontSize: 13,
    marginTop: 5,
    letterSpacing: 0.4,
  },
  secureBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E3A5F",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 16,
    gap: 6,
  },
  secureBadgeText: {
    color: "#BFDBFE",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 24,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 15,
    elevation: 8,
  },
  cardHeading: {
    marginBottom: 25,
  },
  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#172554",
  },
  description: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 20,
    marginTop: 7,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 9,
  },
  inputContainer: {
    height: 54,
    borderWidth: 1,
    borderColor: "#DCE4F0",
    borderRadius: 13,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#F8FAFC",
  },
  input: {
    flex: 1,
    marginLeft: 11,
    color: "#172554",
    fontSize: 14,
  },
  button: {
    height: 54,
    backgroundColor: "#2563EB",
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    marginTop: 5,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 23,
    gap: 12,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2E8F0",
  },
  dividerText: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "700",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    flexWrap: "wrap",
  },
  switchText: {
    color: "#64748B",
    fontSize: 13,
  },
  switchLink: {
    color: "#2563EB",
    fontWeight: "800",
    fontSize: 13,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginTop: 22,
  },
  footerText: {
    color: "#CBD5E1",
    fontSize: 10,
    textAlign: "center",
  },
});
