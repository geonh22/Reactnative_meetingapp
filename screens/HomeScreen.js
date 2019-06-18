import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Picker
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import firebase from 'firebase';
import DatePicker from 'react-native-datepicker'
// import firebase from 'react-native-firebase';
import * as Facebook from 'expo-facebook';
import { MonoText } from '../components/StyledText';
import { exportSpecifier } from '@babel/types';

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      });
    });
  }
  componentWillUnmount() {
    this.authSubscription();
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <Text
            style={{ fontSize: 60, fontWeight:'bold'}}>우리두리</Text>
          <View style={styles.welcomeContainer}>
            <Image source={require('../assets/images/ring.png')} style={styles.welcomeImage} />
          </View>
          <View style={styles.ButtonContainer}>
            <Button style={styles.Button}
              onPress={() => this.props.navigation.navigate('Signup')}
              title="회원가입"
            />
            <Button style={styles.Button}
              onPress={() => this.props.navigation.navigate('Login')}
              title="로그인"
            />
          </View>
        </ScrollView>


        <View
          style={[styles.codeHighlightContainer, styles.navigationFilename]}>

        </View>
      </View>
    );
  }
}
// ##############################################################################
class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      age: "",
      selected1: undefined,
      selected2: undefined,
      selected3: undefined,
      date: "1998-07-31",
      errorMessage: null
    };
  }

  onValueChange1(value) {
    this.setState({
      selected1: value
    });
  }

  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }

  onValueChange3(value) {
    this.setState({
      selected3: value
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="이메일을 입력하세요!"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="비밀번호를 입력하세요!"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Text>성별은</Text>
        <Picker
          selectedValue={this.state.selected1}
          style={{ height: 50, width: 300 }}
          onValueChange={this.onValueChange1.bind(this)}>


          <Picker.Item label="남" value="male" />
          <Picker.Item label="여" value="female" />
        </Picker>
        <Text>나의 특징은</Text>
        <Picker
          selectedValue={this.state.selected2}
          style={{ height: 50, width: 300 }}
          onValueChange={this.onValueChange2.bind(this)}>
          <Picker.Item label="지적인" value="smart" />
          <Picker.Item label="섹시한" value="sexy" />
          <Picker.Item label="귀여운" value="cute" />
          <Picker.Item label="키가큰" value="tall" />
          <Picker.Item label="잘생긴" value="handsome" />
        </Picker>

        <Text>생년월일</Text>
        <DatePicker
          style={{ width: 200 }}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="1900-01-01"
          maxDate="2000-12-31"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(date) => { this.setState({ date: date }) }}
        />
        <Text>혈액형은</Text>
        <Picker
          selectedValue={this.state.selected3}
          style={{ height: 50, width: 300 }}
          onValueChange={this.onValueChange3.bind(this)}>
          <Picker.Item label="A" value="A" />
          <Picker.Item label="B" value="B" />
          <Picker.Item label="AB" value="AB" />
          <Picker.Item label="O" value="O" />
        </Picker>
        <Button title="회원가입"
          onPress={() => this.props.navigation.navigate('Main')} />
        <Button
          title="이미 계정이 있으신가요? 로그인"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    );
  }
}
// ################################################
class LoginScreen extends React.Component {
  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user)
      }
    })
  }
  state = { email: '', password: '', errorMessage: null }

  async logInWithFacebook() {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync('260275714842238', { permissions: ['public_profile'] })

    if (type == 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token)
      firebase.auth().signInWithCredential(credential).catch((error) => {
        console.log(error)
      })
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);

      console.log("페이스북 로그인 되었습니다.")
      this.props.navigation.navigate('Main')

    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="이메일 입력하세요!"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="비밀번호를 입력하세요!"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="확인"
          onPress={() => this.props.navigation.navigate('Main')} />
        <Button title="페이스북으로 로그인"
          onPress={() => this.logInWithFacebook()} />
        <Button style={styles.Button}
          title="계정이 없으신가요? 회원가입"
          onPress={() => this.props.navigation.navigate('Signup')}
        />
      </View>
    );
  }
}
class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  };

  componentDidMount() {
    const ref = firebase.database().ref();
    ref.on("value", snapshot => {
      this.setState({ data: snapshot.val() });
    });

  }
  render() {
    return (
      <ScrollView style={styles.container}>
      <View>
        <Text
          style={{ fontSize: 20, margin: 10 }}>나에게 호감을 보낸 이성</Text>
        <View style={styles.profileContainer}>
          <Image source={require('../assets/images/profile1.png')} style={styles.profileImage} />
          <Text>나이 : 38세</Text>
          <Text>직업 : 핫도그 푸드트럭 운영</Text>
        </View>
        
        <View style={styles.profileContainer}>
          <Image source={require('../assets/images/profile2.png')} style={styles.profileImage} />
          <Text>나이 : 33세</Text>
          <Text>직업 : 변호사</Text>
        </View>
        <View style={styles.profileContainer}>
          <Image source={require('../assets/images/profile3.png')} style={styles.profileImage} />
          <Text>나이 : 37세</Text>
          <Text>직업 : 저승사자</Text>
        </View>
        
        <View style={styles.container}>
          {this.state.data.map(value => {
            return (
              <View><Image style={{ width: 110, height: 110 }}
                source={{ uri: value.image }} />
                <Text>{value.name}</Text>
              </View>
            )
          })}
        </View>

      </View>
      </ScrollView>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Signup: SignupScreen,
    Login: LoginScreen,
    Main: MainScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}


HomeScreen.navigationOptions = {
  header: null,
};
MainScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff4e6',
    margin: 20
  },
  ButtonContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  Button: {
    backgroundColor: 'red',
  },
  contentContainer: {
    paddingTop: 30,
    alignItems: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 300,
    height: 240,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  profileImage: {
    width: 200,
    height: 160,
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
