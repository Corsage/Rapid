import React, { Component } from 'react';
import { Container, Header, Content, Toast, Button, Text } from 'native-base';
export default class LoginToast extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content padder>
          <Button onPress={()=> Toast.show({
              text: {this.props.text},
              buttonText: 'Okay'
            })}>
            <Text>Toast</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}