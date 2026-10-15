import { useState } from "react";
import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Activity = {
  id: string;
  title: string;
  completed: boolean;
};

export default function DailyActivityTracker() {
  const [activityText, setActivityText] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);

  const addActivity = () => {
    const text = activityText.trim();

    if (text === "") {
      return;
    }

    const newActivity: Activity = {
      id: Date.now().toString(),
      title: text,
      completed: false,
    };

    setActivities((current) => [...current, newActivity]);
    setActivityText("");
  };

  const toggleActivity = (id: string) => {
    setActivities((current) =>
      current.map((activity) =>
        activity.id === id
          ? { ...activity, completed: !activity.completed }
          : activity,
      ),
    );
  };

  const deleteActivity = (id: string) => {
    setActivities((current) =>
      current.filter((activity) => activity.id !== id),
    );
  };

  const completedCount = activities.filter(
    (activity) => activity.completed,
  ).length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FB" />

      <View style={styles.header}>
        <Text style={styles.greeting}>DAILY PLANNER</Text>
        <Text style={styles.title}>Aktivitas Harian</Text>
        <Text style={styles.subtitle}>
          Catat kegiatanmu dan selesaikan satu per satu.
        </Text>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Progres Hari Ini</Text>
        <Text style={styles.summaryNumber}>
          {completedCount} dari {activities.length} selesai
        </Text>
        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressBar,
              {
                width:
                  activities.length === 0
                    ? "0%"
                    : `${(completedCount / activities.length) * 100}%`,
              },
            ]}
          />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Tambah Aktivitas</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Contoh: Belajar React Native"
          placeholderTextColor="#8993A4"
          value={activityText}
          onChangeText={setActivityText}
          onSubmitEditing={addActivity}
          returnKeyType="done"
        />

        <Pressable
          style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
          onPress={addActivity}
          accessibilityRole="button"
          accessibilityLabel="Tambah aktivitas"
        >
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Daftar Aktivitas</Text>

      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          activities.length === 0 ? styles.emptyContainer : styles.list
        }
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={styles.emptyTitle}>Belum ada aktivitas</Text>
            <Text style={styles.emptyText}>
              Tambahkan kegiatan pertamamu di atas.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.activityCard}>
            <Pressable
              style={styles.activityContent}
              onPress={() => toggleActivity(item.id)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: item.completed }}
            >
              <View
                style={[
                  styles.checkbox,
                  item.completed && styles.checkboxCompleted,
                ]}
              >
                {item.completed && <Text style={styles.checkmark}>✓</Text>}
              </View>

              <Text
                style={[
                  styles.activityTitle,
                  item.completed && styles.completedTitle,
                ]}
              >
                {item.title}
              </Text>
            </Pressable>

            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteActivity(item.id)}
              accessibilityRole="button"
              accessibilityLabel={`Hapus ${item.title}`}
            >
              <Text style={styles.deleteText}>Hapus</Text>
            </Pressable>
          </View>
        )}
      />

      <Text style={styles.footer}>Daily Activity Tracker · React Native</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    paddingTop: 45,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 22,
  },
  greeting: {
    fontSize: 12,
    fontWeight: "700",
    color: "#5265D4",
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#202945",
  },
  subtitle: {
    fontSize: 14,
    color: "#737E92",
    marginTop: 8,
    lineHeight: 21,
  },
  summary: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E8ECF4",
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#202945",
  },
  summaryNumber: {
    fontSize: 13,
    color: "#737E92",
    marginTop: 8,
    marginBottom: 12,
  },
  progressBackground: {
    height: 8,
    borderRadius: 8,
    backgroundColor: "#E9ECF5",
    overflow: "hidden",
  },
  progressBar: {
    height: 8,
    borderRadius: 8,
    backgroundColor: "#5265D4",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#202945",
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E5EF",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#202945",
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#5265D4",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "400",
    marginTop: -2,
  },
  pressed: {
    opacity: 0.7,
  },
  list: {
    paddingBottom: 12,
  },
  emptyContainer: {
    flexGrow: 1,
  },
  emptyBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8ECF4",
    borderStyle: "dashed",
  },
  emptyIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#202945",
  },
  emptyText: {
    fontSize: 13,
    color: "#737E92",
    marginTop: 6,
    textAlign: "center",
  },
  activityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E8ECF4",
  },
  activityContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: "#AAB3C5",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxCompleted: {
    backgroundColor: "#5265D4",
    borderColor: "#5265D4",
  },
  checkmark: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  activityTitle: {
    flex: 1,
    fontSize: 14,
    color: "#202945",
  },
  completedTitle: {
    color: "#8993A4",
    textDecorationLine: "line-through",
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  deleteText: {
    color: "#D64C5B",
    fontSize: 12,
    fontWeight: "600",
  },
  footer: {
    textAlign: "center",
    color: "#9AA3B3",
    fontSize: 11,
    paddingVertical: 12,
  },
});
