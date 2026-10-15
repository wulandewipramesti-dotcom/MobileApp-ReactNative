import React from "react";
import { StyleSheet, Text, View } from "react-native";

type GreetingProps = {
  name: string;
};

class Greeting extends React.Component<GreetingProps> {
  render() {
    return <Text style={styles.greeting}>Hello {this.props.name}!</Text>;
  }
}

export default class LotsOfGreetings extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Greeting name="Rexxar" />
        <Greeting name="Jaina" />
        <Greeting name="Valeera" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
  },
  greeting: {
    margin: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});
