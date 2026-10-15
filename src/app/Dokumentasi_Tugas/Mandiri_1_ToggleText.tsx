
import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';

type HelloWorldState = {
  isShowingText: boolean;
};

export default class HelloWorldApp extends Component<
  {},
  HelloWorldState
> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isShowingText: false,
    };
  }

  toggleText = () => {
    this.setState((previousState) => ({
      isShowingText: !previousState.isShowingText,
    }));
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title={this.state.isShowingText ? 'Sembunyikan' : 'Tampilkan'}
          onPress={this.toggleText}
        />

        {this.state.isShowingText && (
          <Text style={styles.text}>Hello World</Text>
        )}
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
    padding: 20,
  },
  text: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
  },
});
