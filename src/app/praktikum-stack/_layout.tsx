
import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: 'Home',
          drawerLabel: 'Home',
        }}
      />

      <Drawer.Screen
        name="about"
        options={{
          title: 'About',
          drawerLabel: 'About',
        }}
      />
    </Drawer>
  );
}
