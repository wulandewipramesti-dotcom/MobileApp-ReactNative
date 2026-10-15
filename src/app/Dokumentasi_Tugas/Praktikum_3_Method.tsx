
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

type BlinkProps = {
  text: string;
};

type BlinkState = {
  isShowingText: boolean;
};

class Blink extends Component<BlinkProps, BlinkState> {
  intervalId: ReturnType<typeof setInterval> | undefined;

  constructor(props: BlinkProps) {
    super(props);

    this.state = {
      isShowingText: true,
    };

    this.setStateEverySecond();
  }

  setStateEverySecond = () => {
    this.intervalId = setInterval(() => {
      this.setState((previousState) => ({
        isShowingText: !previousState.isShowingText,
      }));
    }, 1000);
  };

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  render() {
    if (!this.state.isShowingText) {
      return null;
    }

    return <Text style={styles.text}>{this.props.text}</Text>;
  }
}

export default class BlinkApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Blink text="I love to blink" />
        <Blink text="Yes blinking is so great" />
        <Blink text="Why did they ever take this out of HTML" />
        <Blink text="Look at me look at me look at me" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  text: {
    fontSize: 18,
    margin: 8,
    color: '#2563EB',
  },
});
