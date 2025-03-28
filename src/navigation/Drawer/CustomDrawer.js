//import : react components
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  NativeModules,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {useDrawerStatus} from '@react-navigation/drawer';
//import : custom components
import MyText from 'component/MyText/MyText';
import SizeBox from 'component/SizeBox/SizeBox';
//import : third parties
import AsyncStorage from '@react-native-async-storage/async-storage';
//import : utils
import Logo from 'assets/images/logoDrawer.svg';
import HomeSvg from 'assets/svgs/drawersvgs/home.svg';
import HeartSvg from 'assets/svgs/drawersvgs/heart.svg';
import BookSvg from 'assets/svgs/drawersvgs/book.svg';
import InfoSvg from 'assets/svgs/drawersvgs/info-circle.svg';
import HeadPhoneSvg from 'assets/svgs/drawersvgs/headphone.svg';
import NoteSvg from 'assets/svgs/drawersvgs/stickynote.svg';
import PrivacySvg from 'assets/svgs/drawersvgs/privacy.svg';
import LogoutSvg from 'assets/svgs/drawersvgs/logout.svg';
import FBSvg from 'assets/svgs/drawersvgs/fb.svg';
import YTSvg from 'assets/svgs/drawersvgs/youtube.svg';
import INSTASvg from 'assets/svgs/drawersvgs/insta.svg';
import {BOLD} from 'global/Fonts';
import {ScreenNames, Service} from 'global/index';
import {API_Endpoints, GetApiWithToken} from 'global/Service';
//import : styles
import {styles} from './CustomDrawerStyle';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {setCartCount} from 'reduxTooklit/CountSlice';
import { responsiveWidth } from 'react-native-responsive-dimensions';
const {StatusBarManager} = NativeModules;
const CustomDrawer = ({navigation}) => {
  //variables
  const dispatch = useDispatch();
  const chatCount = useSelector(state => state.count.chatCount);
  const isDrawerOpen = useDrawerStatus();
  //hook : states
  const [profileData, setProfileData] = useState({});
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    const adminId = 1;
    const docId = `${adminId.toString()}-${profileData?.id?.toString()}`;
    const MessageRef = firestore()
      .collection('Chat')
      .doc(docId)
      .collection('Messages')
      .orderBy('createdAt', 'desc');
    const unSubscribe = MessageRef.onSnapshot(_ => {
      setTimeout(() => {
        getUnseenMessageCount();
      }, 300);
    });
    return () => unSubscribe();
  }, [profileData?.id]);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight(({height}) => {
        setStatusBarHeight(height);
      });
    } else {
      setStatusBarHeight(StatusBarManager.HEIGHT);
    }
  }, []);

  const getUnseenMessageCount = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await GetApiWithToken(
        API_Endpoints.unseenMessageCount,
        token,
      );
      if (response?.data?.status) {
        dispatch(setCartCount({chatCount: response?.data?.data}));
      }
    } catch (err) {
      console.log('getting error in unseen message count', err);
    }
  };

  //function : nav func
  const resetIndexGoToSplash = CommonActions.reset({
    index: 1,
    routes: [{name: 'AuthStack'}],
  });
  const gotoHome = () => {
    navigation.navigate(ScreenNames.BOTTOM_TAB, {
      screen: 'Home',
    });
  };
  const gotoProfile = () => {
    navigation.navigate(ScreenNames.BOTTOM_TAB, {
      screen: 'Profile',
    });
  };
  const gotoWishlist = () => {
    navigation.navigate(ScreenNames.BOTTOM_TAB, {
      screen: 'Wishlist',
    });
  };
  const gotoMyCourses = () => {
    navigation.navigate('AuthStack', {
      screen: ScreenNames.MY_COURSES,
    });
  };
  const gotoChatScreen = () => {
    navigation.navigate('AuthStack', {
      screen: ScreenNames.CHAT_SCREEN,
      params: {id: profileData.id, name: profileData.name},
    });
  };

  //function : imp func
  const logoutUser = async () => {
    await AsyncStorage.clear();
    navigation.closeDrawer();
    navigation.dispatch(resetIndexGoToSplash);
  };
  //function : serv func
  const getProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.getAPI(
        API_Endpoints.profile,
        token,
      );
      console.log('response', response);
      if (status) {
        setProfileData(response.data);
      }
    } catch (error) {
      console.error('error in getProfile', error);
    }
  };
  //hook : useEffect
  useEffect(() => {
    getProfile();

    return () => {};
  }, [isDrawerOpen === 'open']);

  //UI
  return (
    <View style={styles.container}>
      <View style={{...styles.logoStyle, marginTop: statusBarHeight}}>
        <Logo height={59}></Logo>
      </View>
      <ScrollView>
        <View style={styles.mainView}>
          <DrawerItem
            title={'Home'}
            icon={<HomeSvg />}
            onPress={() => gotoHome()}
          />
          <DrawerItem
            title={'My Wishlist'}
            icon={<HeartSvg />}
            onPress={() => gotoWishlist()}
          />
          <DrawerItem
            title={'My Courses'}
            icon={<BookSvg />}
            onPress={() => gotoMyCourses()}
          />
          <DrawerItem title={'About us'} icon={<InfoSvg />} />
          <DrawerItem
            title={`Chat ${chatCount > 0 ? `(${chatCount})` : ''}`}
            icon={<HeadPhoneSvg />}
            onPress={() => gotoChatScreen()}
          />
          <DrawerItem title={'Terms & Conditions'} icon={<NoteSvg />} />
          <DrawerItem title={'Privacy Policy'} icon={<PrivacySvg />} />
          <DrawerItem
            title={'Logout'}
            icon={<LogoutSvg />}
            onPress={() => logoutUser()}
          />
          <SizeBox height={20} />
          <MyText text={'Follow Us!'} fontSize={12} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 10,
              marginVertical: 5,
            }}>
            <FBSvg />
            <YTSvg />
            <INSTASvg />
          </View>
        </View>
        <View style={styles.profileContentStyle}>
          <View style={styles.flexRowView}>
            <Image
              source={{
                uri: profileData.profile,
              }}
              style={styles.profileImgStyle}
            />
            <View>
              <MyText
                text={profileData.name}
                fontFamily={BOLD}
                textColor="white"
              />
              <MyText
                text={profileData.email}
                textColor="white"
                style={{maxWidth: responsiveWidth(45)}}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => gotoProfile()}
            style={styles.viewProfileBtn}>
            <MyText text={'View Profile'} fontFamily={BOLD} fontSize={10} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.versionText}>
        <MyText text={'App Version: V1.0'} fontSize={10} />
      </View>
    </View>
  );
};
export default CustomDrawer;

const DrawerItem = ({title, icon, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        marginVertical: 10,
      }}
      onPress={onPress}>
      {icon}
      <MyText text={title} />
    </TouchableOpacity>
  );
};
