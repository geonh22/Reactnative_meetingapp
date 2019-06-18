import React from 'react';
import { ScrollView, StyleSheet, Text, Button, Alert, View, Image } from 'react-native';

export default function SettingsScreen() {

  return (
    <ScrollView style={styles.container}>
      <Text
        style={{ fontSize: 20, margin: 10 }}>마이페이지</Text>
      <View style={styles.elem}>
        <View style={styles.userInfo}>
          <Image source={require('../assets/images/user-icon.png')} style={styles.profileImage} />
        </View>
        <View style={styles.Info}>
          <Text style={styles.Text}>아이디 : advix920</Text>
          <Text style={styles.Text}>생년월일 : 1998.07.31</Text>
          <Text style={styles.Text}>성별 : 여</Text>
        </View>

      </View>
      <View style={styles.Info}>
        <Text style={styles.Text}>나의 특징은 : 키가큰</Text>
        <Text style={styles.Text}>혈액형 : A</Text>
        <Text style={styles.Text}>종교 : 무교</Text>
        <Text style={styles.Text}>음주 : 가끔 마심</Text>
        <Text style={styles.Text}>흡연 : 비흡연</Text>
        <Text style={styles.Text}>거주지 : 서울</Text>
        <Text style={styles.Text}>직업 : 대학생</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff4e6',
  },
  elem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#eee',
    borderBottomWidth: 0.5,
    padding: 5,
    margin: 10,
  },
  Text: {
    fontSize: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Info: {
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 25,
    backgroundColor: 'lightgray',
    marginRight: 10,
  },
});