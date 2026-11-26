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
      Alert.alert("Perhatian", "Email dan password wajib diisi.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Perhatian", "Password minimal 6 karakter.");
      return;
    }

    setLoading(true);

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(
          FIREBASE_AUTH,
          email.trim(),
          password,
        );

        Alert.alert("Berhasil", "Registrasi berhasil!");
      } else {
        await signInWithEmailAndPassword(FIREBASE_AUTH, email.trim(), password);
      }

      router.replace("/firebase-auth/home" as any);
    } catch (error: any) {
      Alert.alert("Gagal", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Ionicons name="lock-closed" size={35} color="#FFFFFF" />
          </View>

          <Text style={styles.appName}>MobileApp</Text>
          <Text style={styles.subtitle}>
            Welcome! Please access your account
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.title}>
            {isRegister ? "Create Account" : "Welcome Back!"}
          </Text>

          <Text style={styles.description}>
            {isRegister
              ? "Register your account to get started."
              : "Login to continue to your account."}
          </Text>

          <Text style={styles.label}>Email Address</Text>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#64748B" />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
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
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#64748B"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>
                {isRegister ? "Create Account" : "Login"}
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>
              {isRegister
                ? "Already have an account? "
                : "Don't have an account? "}
            </Text>

            <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
              <Text style={styles.switchLink}>
                {isRegister ? "Login" : "Register"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 35,
  },
  logo: {
    width: 75,
    height: 75,
    borderRadius: 22,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
  appName: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#1E293B",
    marginTop: 15,
  },
  subtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 6,
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    elevation: 3,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1E293B",
  },
  description: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 7,
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
  },
  inputContainer: {
    height: 52,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 11,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: "#1E293B",
  },
  button: {
    height: 52,
    backgroundColor: "#2563EB",
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 22,
  },
  switchText: {
    color: "#64748B",
    fontSize: 13,
  },
  switchLink: {
    color: "#2563EB",
    fontWeight: "bold",
    fontSize: 13,
  },
});
