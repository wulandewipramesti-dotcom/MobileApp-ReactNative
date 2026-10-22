import { useNavigation } from "expo-router";
import { DrawerActions } from "expo-router/react-navigation";
import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();

  const openDrawer = () => {
    let current = navigation as any;

    while (current) {
      if (current.getState?.().type === "drawer") {
        current.dispatch(DrawerActions.openDrawer());
        return;
      }

      current = current.getParent?.();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home Page</Text>

      <View style={styles.buttons}>
        <Button
          title="GOTO ABOUT PAGE"
          onPress={() => navigation.navigate("about" as never)}
          color="#2196F3"
        />

        <Button title="DRAWER" onPress={openDrawer} color="#2196F3" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },
  header: {
    fontSize: 16,
    color: "#333333",
    backgroundColor: "#ffffff",
    paddingVertical: 4,
  },
  buttons: {
    backgroundColor: "#eeeeee",
    paddingVertical: 4,
    gap: 8,
  },
});
