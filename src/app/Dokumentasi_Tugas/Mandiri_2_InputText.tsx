
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';

type InputState = {
  inputText: string;
  submittedText: string;
};

export default class InputTextApp extends Component<
  {},
  InputState
> {
  constructor(props: {}) {
    super(props);

    this.state = {
      inputText: '',
      submittedText: '',
    };
  }

  handleSubmit = () => {
    this.setState({
      submittedText: this.state.inputText,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Masukkan Teks
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ketik teks di sini..."
          value={this.state.inputText}
          onChangeText={(text) =>
            this.setState({ inputText: text })
          }
        />

        <Button
          title="Submit"
          onPress={this.handleSubmit}
        />

        {this.state.submittedText !== '' && (
          <Text style={styles.result}>
            {this.state.submittedText}
          </Text>
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
    padding: 20,
    backgroundColor: '#F2F2F2',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginBottom: 15,
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
    marginTop: 20,
  },
});
