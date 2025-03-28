//react components
import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Platform,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
//global
import Header from '../../component/Header/Header';
import ViewAll from '../../component/ViewAll/ViewAll';
import FastImage from 'react-native-fast-image';
//styles
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from 'assets/svgs/background.svg';
import Logo from 'assets/svgs/logoLearne.svg';
import MySearchBarForHome from '../../component/MySearchBarForHome';
import {LIGHT_PURPLE, WHITE} from '../../global/Color';
import {dimensions} from '../../global/Constants';
import {SvgUri} from 'react-native-svg';
import {
  DARK_GREY,
  BLACK,
  GREEN,
  DARK_PURPLE,
  LIGHT_GRAY,
} from '../../global/Color';
import MyText from '../../component/MyText/MyText';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {REGULAR} from '../../global/Fonts';
import SearchWithIcon from '../../component/SearchWithIcon/SearchWithIcon';
import {Colors} from 'global/index';
import {MEDIUM} from '../../global/Fonts';
import Divider from '../../component/Divider/Divider';
///svg images
import Like from 'assets/images/heartActive.svg';
import Share from 'assets/images/share.svg';
import Rating from 'assets/images/rating.svg';
import Profile from 'assets/images/profilePerson.svg';
import Lesson from 'assets/images/lesson.svg';
import Quiz from 'assets/images/quiz.svg';
import TickCircle from 'assets/images/tickCircle.svg';
import {ScrollView} from 'react-native-gesture-handler';
import MyButton from '../../component/MyButton/MyButton';
import {ScreenNames, Service} from 'global/index';
import {API_Endpoints} from 'global/Service';
const Order = ({navigation}) => {
  const trending = [
    {
      id: 1,
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
      price: '$599',
      rating: '4.7',
      name: 'Jane Doe',
      image: require('assets/images/trending1.png'),
    },
    {
      id: 2,
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
      price: '$599',
      rating: '4.7',
      name: 'Jane Doe',
      image: require('assets/images/trending2.png'),
    },
  ];

  const [orderData, setOrderData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const getHome = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.getAPI(
        API_Endpoints.my_order,
        token,
      );
      if (status) {
        setOrderData(response?.data);
      }
    } catch (error) {
      console.error('error in getHome', error);
    } finally {
      setRefreshing(false);
    }
  };
  //hook : useEffect
  useEffect(() => {
    getHome();
  }, []);
  const requestDownloadingPermission = async () => {
    if (Platform.OS == 'ios') {
      downloadInvoice();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Downloading Permission',
            message: 'Arkansas needs access to your downloading manager ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          downloadInvoice();
        } else {
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const downloadInvoice = async () => {
    setShowLoader(true);
    let pdfUrl = orderData?.invoice;
    let DownloadDir =
      Platform.OS == 'ios'
        ? RNFetchBlob.fs.dirs.DocumentDir
        : RNFetchBlob.fs.dirs.DownloadDir;
    const {dirs} = RNFetchBlob.fs;
    const dirToSave =
      Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
    const configfb = {
      fileCache: true,
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      title: 'Arkansas',
      path: `${dirToSave}.pdf`,
    };
    const configOptions = Platform.select({
      ios: {
        fileCache: configfb.fileCache,
        title: configfb.title,
        path: configfb.path,
        appendExt: 'pdf',
      },
      android: configfb,
    });
    Platform.OS == 'android'
      ? RNFetchBlob.config({
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: `${DownloadDir}/.pdf`,
            description: 'Arkansas',
            title: `${orderData?.order_number} invoice.pdf`,
            mime: 'application/pdf',
            mediaScannable: true,
          },
        })
          .fetch('GET', `${pdfUrl}`)
          .then(res => {
            setShowLoader(false);
          })
          .catch(error => {
            setShowLoader(false);
            console.warn(error.message);
          })
      : RNFetchBlob.config(configOptions)
          .fetch('GET', `${pdfUrl}`, {})
          .then(res => {
            setShowLoader(false);
            if (Platform.OS === 'ios') {
              RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
              RNFetchBlob.ios.previewDocument(configfb.path);
            }
          })
          .catch(e => {
            setShowLoader(false);
          });
  };
  const renderCourse = ({item}) => {
    return (
      <View style={styles.courseContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 12,
          }}>
          <View style={{flexDirection: 'row'}}>
            <MyText
              text={'Order No: '}
              fontFamily={MEDIUM}
              fontSize={14}
              textColor={'#000000'}
              style={{}}
            />
            <MyText
              text={item?.order_number}
              fontFamily={MEDIUM}
              fontSize={14}
              textColor={'#5E4AF7'}
              style={{}}
            />
          </View>

          <MyText
            text={item?.category_name}
            fontFamily={MEDIUM}
            fontSize={14}
            textColor={'#5E4AF7'}
            style={{}}
          />
        </View>
        <Divider style={{marginBottom: 15}} color="#E0E0E0"></Divider>
        <View style={styles.courseSubContainer}>
          <Image
            source={{uri: item?.image}}
            style={{width: 130, height: 97}}></Image>
          <View style={{marginLeft: 11, width: dimensions.SCREEN_WIDTH * 0.5}}>
            <MyText
              text={item.name}
              fontFamily={MEDIUM}
              fontSize={14}
              textColor={'#000000'}
              style={{width: dimensions.SCREEN_WIDTH * 0.55}}
            />
            <View style={styles.middleRow}>
              <View style={styles.crtrRow}>
                <MyText
                  text={'$'}
                  fontFamily={MEDIUM}
                  fontSize={16}
                  textColor={'#000000'}
                  letterSpacing={0.13}
                  style={{}}
                />
                <MyText
                  text={item?.price}
                  fontFamily={MEDIUM}
                  fontSize={16}
                  textColor={'#5E4AF7'}
                  letterSpacing={0.13}
                  style={{}}
                />
              </View>
              <View style={[styles.ratingRow, {marginLeft: 16}]}>
                <View
                  style={{
                    height: 10,
                    width: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Rating
                    style={{marginLeft: 24}}
                    height={18}
                    width={18}></Rating>
                </View>
                <MyText
                  text={item.rating}
                  fontFamily={REGULAR}
                  fontSize={13}
                  textColor={'#000000'}
                  letterSpacing={0.13}
                  style={{marginLeft: 20, marginTop: 2}}
                />
              </View>
            </View>
          </View>
        </View>
        <Divider style={{marginTop: 12}} color="#E0E0E0"></Divider>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '98%',
            marginTop: 10,
          }}>
          <MyButton
            text={'View Order Details'}
            style={{flex: 1, marginRight: 10, backgroundColor: '#5E4AF7'}}
            onPress={() => {
              navigation.navigate(ScreenNames.ORDER_DETAIL, {order: item?.id});
            }}
          />
          <MyButton
            text={'Download Invoice'}
            style={{flex: 1, backgroundColor: '#00B44B'}}
            onPress={requestDownloadingPermission}
          />
        </View>
      </View>
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getHome();
  }, []);
  //UI
  return (
    <SafeAreaView style={{flex: 1}}>
      <Background style={StyleSheet.absoluteFill} />
      <Header
        showBackButton={false}
        showNotification={true}
        showGridIcon={true}
      />

      <FlatList
        data={orderData || []}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCourse}
        onEndReachedThreshold={0.1}
        nestedScrollEnabled={true} // Allows inner scrolling
        contentContainerStyle={{
          paddingHorizontal: 16, // Equal left-right padding
          paddingBottom: 50, // Ensure enough space to scroll to bottom
          flexGrow: 1, // Ensures FlatList takes full height
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={() => (
          <View style={{marginVertical: 12}}>
            <SearchWithIcon
              disabled
              placeholder={'Search by course or product name'}
              placeholderTextColor={'#8F93A0'}
            />
          </View>
        )}
        ListFooterComponent={
          () =>
            trending.length === 0 ? (
              <MyText
                text={`No Trending Courses found`}
                fontFamily="medium"
                fontSize={18}
                textColor={'#455A64'}
                style={{textAlign: 'center', marginTop: 20}}
              />
            ) : (
              <View style={{height: 20}} />
            ) // Empty space for better scrolling
        }
      />
    </SafeAreaView>
  );
};

export default Order;
const styles = StyleSheet.create({
  courseContainer: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginBottom: 11,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.05,
    elevation: 2,
    borerRadius: 1,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    width: dimensions.SCREEN_WIDTH * 0.93,
    alignSelf: 'center',
    borderRadius: 10,
  },
  courseSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  crseImg: {
    height: 99,
    width: dimensions.SCREEN_WIDTH * 0.33,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  crtrRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  iconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 11,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: Colors.THEME_BROWN,
  },
  courseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  tickRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
});
