//import : react components
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  RefreshControl,
  PermissionsAndroid,
  Platform
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
//import : components
import Header from 'component/Header/Header';
import MyText from 'component/MyText/MyText';
import MyButton from 'component/MyButton/MyButton';
//import : third parties
import AsyncStorage from '@react-native-async-storage/async-storage';
//import : utils
import { Colors, MyIcon, ScreenNames, Service } from 'global/index';
import CallSvg from 'assets/svgs/call.svg';
import SmsSvg from 'assets/svgs/sms.svg';
import BagSvg from 'assets/svgs/shopping-bag.svg';
import MedalSvg from 'assets/svgs/medal-star.svg';
import NotiSvg from 'assets/svgs/notification-bing.svg';
import DollarSvg from 'assets/svgs/dollar-circle.svg';
import HeartSvg from 'assets/svgs/heart.svg';
import RightSvg from 'assets/svgs/right-arrow.svg';
import { API_Endpoints } from 'global/Service';
import { MEDIUM, SEMI_BOLD } from 'global/Fonts';
import Icon from 'react-native-vector-icons/AntDesign';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import Loader from 'component/loader/Loader';

const Profile = ({ navigation }) => {
  //variables
  const isFocused = useIsFocused();
  //hook : states
  const [profileData, setProfileData] = useState({});
  const [profileDateLoading, setProfileDataLoading] = useState(false);
  console.log('profileData ::: ', profileData);
  const [modalVisible, setModalVisible] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  //function : nav func
  const gotoEditProfile = () => {
    navigation.navigate(ScreenNames.EDIT_PROFILE, { data: profileData });
  };
  const gotoChatScreen = () => {
    navigation.navigate(ScreenNames.CHAT_SCREEN, { id: profileData.id });
  };
  const gotoNotificationList = () => {
    navigation.navigate(ScreenNames.NOTIFICATION);
  };

  const gotoCertificateList = () => {
    navigation.navigate(ScreenNames.CERTIFICATE);
  };

  const gotoWishlistList = () => {
    navigation.navigate('Wishlist');
  };
  //function : serv func
  const getProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token,'chek')
      setProfileDataLoading(true);
      const { response, status } = await Service.getAPI(
        API_Endpoints.profile,
        token,
      );
      if (status) {
        console.log(response?.data,':: Data Check')
        setProfileData(response?.data);
      }
    } catch (error) {
      console.error('error in getProfile', error);
    }
    finally {
      setProfileDataLoading(false);
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera to take pictures.',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // iOS handles it via Info.plist
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Camera access is required.');
      return;
    }
  
    console.log('openCamera');
    launchCamera({ mediaType: 'photo', quality: 0.5 }, async (response) => {
      if (!response?.didCancel && response?.assets) {
        setProfileData({ ...profileData, profile: response.assets[0].uri });
        setModalVisible(false);
        uploadProfileAlongWithImage(response?.assets[0]?.uri);
      }
    });
  };

  const openGallery = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
    }, async (response) => {
      if (!response?.didCancel && response?.assets) {
        setProfileData({ ...profileData, profile: response.assets[0].uri });
        setModalVisible(false);
        uploadProfileAlongWithImage(response?.assets[0]?.uri);
      }
    })
  };

  const uploadProfileAlongWithImage = async (uri) => {
    try {
      const uniqueFileName = `profile_${Date.now()}.jpg`;
      const data = new FormData();
      data.append('name', profileData?.name);
      data.append('email', profileData?.email);
      data.append('country_code', profileData?.country_code);
      data.append('mobile', profileData?.mobile?.replace(/\D/g, ''));
      data.append('cca2', profileData?.cca2);
      data.append('image', {
        uri: uri,
        name: uniqueFileName,
        type: 'image/jpeg'
      });
      const token = await AsyncStorage.getItem('token');
      setShowLoader(true);
      const { response, status } = await Service.postAPI(API_Endpoints.update_profile, data, token);
      if (status) {
        console.log(response,'Prince :::')
        Toast.show({
          type: 'success',
          text1: response?.message,
        });
        handleRefresh();
        setShowLoader(false);
        
          // getProfile(); 
      }
      else {
        Toast.show({
          type: 'error',
          text1: response?.message,
        });
        setShowLoader(false);
      }
    } catch (err) {
      console.error('error in uploading image', err);
      setShowLoader(false);
    }
  }

  const handleRefresh = () => {
    getProfile();
  }


  //refrence
  const gotoTabs = title => {
    title === 'Order History'
      ? navigation.navigate(ScreenNames.COURSE_HISTORY)
      : title === 'Certificate'
        ? navigation.navigate(ScreenNames.CERTIFICATE)
        : title === 'Notifications'
          ? navigation.navigate(ScreenNames.NOTIFICATION)
          : navigation.navigate(ScreenNames.CART);
    // Ensure 'EditProfile' is a valid screen
  };

  const ProfileItem = ({ icon, title, onPress = () => { } }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 2,
          backgroundColor: Colors.WHITE,
          padding: 10,
          marginVertical: 5,
          borderRadius: 5,
        }}
        onPress={() => onPress()}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: 10,
          }}>
          {icon}
          <MyText text={title} />
        </View>

        <RightSvg />
      </TouchableOpacity>
    );
  };
  //hook : useffect
  useEffect(() => {
    if (isFocused) {
      getProfile();
    }
  }, [isFocused]); 

  //UI
  return (
    <View style={styles.container}>
      <Header
        showBackButton={false}
        showNotification={true}
        showGridIcon={true}
      />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: '30%',
        }}
        refreshControl={
          <RefreshControl
            refreshing={profileDateLoading}
            onRefresh={handleRefresh}
          />
        } 
        >
        <View style={styles.mainView}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <View >
              <Image
                source={{
                  uri: profileData?.profile,
                }}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 100,
                  borderWidth: 2,
                }}
              />
              <TouchableOpacity onPress={() => setModalVisible(true)} style={{ position: 'absolute',top:0,right:0 }}>
                <Icon name="edit" size={20} color={Colors.DARK_PURPLE}  />
              </TouchableOpacity>
            </View>
            <MyText
              text={profileData.name}
              fontFamily={SEMI_BOLD}
              style={{ marginVertical: 6 }}
              fontSize={16}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 5,
              }}>
              <CallSvg />
              <MyText
                text={profileData.mobile}
                style={{ marginBottom: 5 }}
                fontSize={13}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 5,
              }}>
              <SmsSvg />
              <MyText text={profileData.email} marginBottom={7} />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <MyButton
              text={'Edit'}
              width="48%"
              onPress={() => gotoEditProfile()}
            />
            <MyButton
              text={'Change Password'}
              width="48%"
              backgroundColor={Colors.DARK_PURPLE}
            />
          </View>
          <ProfileItem
            icon={<BagSvg />}
            title={'Order History'}
            onPress={() => {
              navigation.navigate('Order');
            }}
          />
          <ProfileItem
            icon={<MedalSvg />}
            title={'Certificate'}
            onPress={gotoCertificateList}
          />
          <ProfileItem
            icon={<NotiSvg />}
            title={'Notifications'}
            onPress={() => gotoNotificationList()}
          />
          {/* <ProfileItem icon={<DollarSvg />} title={'Billing'} /> */}
          <ProfileItem
            icon={<HeartSvg />}
            title={'Wishlist'}
            onPress={gotoWishlistList}
          />
          {/* <ProfileItem
            icon={
              <MyIcon.Ionicons
                name="chatbox-ellipses-outline"
                size={45}
                color={Colors.RED}
              />
            }
            title={'Chat'}
            onPress={() => gotoChatScreen()}
          /> */}
        </View>
      </ScrollView>
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        transparent={true}>
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end', alignItems: 'center' }}
          onPress={() => {
            setModalVisible(false);
          }}
          activeOpacity={1}
        >
          <View style={styles.modalView}>
            <MyButton
              text={'Camera'}
              style={{ flex: 1 }}
              onPress={() => openCamera()} />
            <MyButton
              text={'Gallery'}
              style={{ flex: 1, backgroundColor: Colors.DARK_PURPLE }}
              onPress={() => openGallery()} />
          </View>
        </TouchableOpacity>
      </Modal>
      {showLoader && <Loader visible={showLoader} />}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainView: {
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    height: '20%',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    gap: 15,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
