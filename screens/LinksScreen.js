import React from 'react';
import { ScrollView, StyleSheet, Text, Button, Alert,View,Image } from 'react-native';

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container}>

      <Text
        style={{ fontSize: 20, margin: 10 }}>쪽지함</Text>
        <View style={styles.elem}>
      <View style={styles.userInfo}>
        <Image source={require('../assets/images/profile1.png')} style={styles.profileImage} />
        <Text>aefix23</Text>
        </View>
        <View style={styles.userComment}>
        <Text>핫도그 좋아해요?</Text>
        </View>
      </View>
      <View style={styles.elem}>
      <View style={styles.userInfo}>
        <Image source={require('../assets/images/profile2.png')} style={styles.profileImage} />
        <Text>93jdjf8</Text>
        </View>
        <View style={styles.userComment}>
        <Text>안녕하세요?</Text>
        </View>
      </View>
      <View style={styles.elem}>
      <View style={styles.userInfo}>
        <Image source={require('../assets/images/profile3.png')} style={styles.profileImage} />
        <Text>냠냠22</Text>
        </View>
        <View style={styles.userComment}>
        <Text>종강 언제해요?</Text>
        </View>
      </View>
      
      
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'Links',
};

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
    borderColor:'#eee',
    borderBottomWidth:0.5,
    padding: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userComment: {
    padding:8,
    backgroundColor:'yellow',
    borderRadius:5,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'yellow',
    marginRight:10,
  },
});
