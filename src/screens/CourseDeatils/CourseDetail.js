//import : react components
import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Platform,
  RefreshControl,
} from 'react-native';
//import : custom components
import Header from 'component/Header/Header';
import MyText from 'component/MyText/MyText';
import ViewAll from 'component/ViewAll/ViewAll';
import MyButton from 'component/MyButton/MyButton';
import Divider from 'component/Divider/Divider';
import ChapterCard from 'component/ChapterCard/ChapterCard';
import CourseDetailLoader from 'component/SkeltonLoader/CourseDetailLoader';
import TagsItem from 'component/TagsItem/TagsItem';
import Loader from 'component/loader/Loader';
//import : third parties
import Video from 'react-native-video';
import Toast from 'react-native-toast-message';
import {ScrollView} from 'react-native-virtualized-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'react-native-blob-util';
import * as Progress from 'react-native-progress';
import {responsiveWidth} from 'react-native-responsive-dimensions';
//import : utils
import {API_Endpoints} from 'global/Service';
import {Colors, ScreenNames, Service} from 'global/index';
import Background from 'assets/svgs/background.svg';
import Calendar from 'assets/images/calendar.svg';
import Rating from 'assets/images/rating.svg';
import Chapter from 'assets/images/chapter.svg';
import Quiz from 'assets/images/quizQues.svg';
import {BLACK, MEDIUM, REGULAR} from 'global/Fonts';
import {DARK_PURPLE, YELLOW} from 'global/Color';
//import : styles
import {styles} from './CourseDetailStyle';
//import : modal
import Review from 'modals/Review/Review';
import NotPurchase from 'modals/NotPurchase/NotPurchase';
import EditReview from 'modals/EditReview/EditReview';
//import : redux
import {useDispatch, useSelector} from 'react-redux';
import {setCartCount} from 'reduxTooklit/CountSlice';
import {useIsFocused} from '@react-navigation/native';
import useKeyboardListener from 'component/useKeyboardListener/useKeyboardListener';

const CourseDetail = ({navigation, route}) => {
  // variables : ref
  const {isKeyboardVisible, keyboardHeight} = useKeyboardListener();
  const {id} = route?.params;
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const cartCount = useSelector(state => state.count?.cartCount);
  //variables
  const LINE_HEIGTH = 25;
  //variables : redux
  const [courseData, setCourseData] = useState({});
  //hook : modal states
  const [showLoader, setShowLoader] = useState(false);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [showNotPurchased, setShowNotPurchased] = useState(false);
  const [showAppLoader, setShowAppLoader] = useState(false);
  const [showEditReview, setShowEditReview] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  //function : nav func
  const gotoChapterDetail = data => {
    navigation.navigate(ScreenNames.CHAPTER_DETAIL, {data});
  };
  const gotoViewCertificate = () => {
    navigation.navigate(ScreenNames.VIEW_PDF, {url: courseData.certificate});
  };

  useEffect(() => {
    focused && initLoader();
  }, [focused]);

  //function : imp func
  const initLoader = async () => {
    setShowLoader(true);
    await getCourseDetail();
    setShowLoader(false);
  };
  const downloadCertificate = async () => {
    try {
      let pdfUrl = courseData?.certificate;
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
        title: 'Learni',
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
              description: 'Learni',
              title: `${courseData.name} certificate.pdf`,
              mime: 'application/pdf',
              mediaScannable: true,
            },
          })
            .fetch('GET', `${pdfUrl}`)
            .then(res => {})
            .catch(error => {
              setShowLoader(false);
              console.warn(error.message);
            })
        : RNFetchBlob.config(configOptions)
            .fetch('GET', `${pdfUrl}`, {})
            .then(res => {
              if (Platform.OS === 'ios') {
                RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
                RNFetchBlob.ios.previewDocument(configfb.path);
              }
            })
            .catch(e => {});
    } catch (error) {
      console.error('error in downloadCertificate', error);
    }
  };
  //function : serv func
  const getCourseDetail = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const endPoint = `${API_Endpoints.course_details}/${id}`;
      console.log('qwer id', endPoint);
      const {response, status} = await Service.getAPI(endPoint, token);
      if (status) {
        setCourseData(response.data);
      }
    } catch (error) {
      console.error('error in getCourseDetail', error);
    } finally {
      setRefreshing(false);
    }
  };
  const addCourseInToCart = async () => {
    setShowAppLoader(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const endPoint = `${API_Endpoints.add_cart}?id=${id}&type=1`;
      const {response, status} = await Service.postAPI(endPoint, {}, token);
      if (status) {
        dispatch(setCartCount({cartCount: cartCount + 1}));
        Toast.show({
          type: 'success',
          text1: response?.message,
        });
        getCourseDetail();
      }
    } catch (error) {
      console.error('error in addCourseInToCart', error);
    }
    setShowAppLoader(false);
  };

  const buyNowHandler = async () => {
    setShowAppLoader(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const endPoint = `${API_Endpoints.add_cart}?id=${id}&type=1`;
      const {response, status} = await Service.postAPI(endPoint, {}, token);
      if (status) {
        dispatch(setCartCount({cartCount: cartCount + 1}));
        navigation.navigate(ScreenNames.CART);
      } else {
        Toast.show({
          type: 'success',
          text1: response?.message,
        });
      }
    } catch (error) {
      console.error('error in addCourseInToCart', error);
    }
    setShowAppLoader(false);
  };

  const removeCourseFromCart = async () => {
    setShowAppLoader(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const data = {
        id: id,
        type: 1,
      };
      const {response, status} = await Service.postAPI(
        API_Endpoints.remove_cart,
        data,
        token,
      );
      if (status) {
        dispatch(setCartCount({cartCount: cartCount - 1}));
        Toast.show({
          type: 'success',
          text1: response?.message,
        });
        getCourseDetail();
      }
    } catch (error) {
      console.error('error in removeCourseFromCart', error);
    }
    setShowAppLoader(false);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    initLoader();
  }, []);

  //UI
  if (showLoader) {
    return <CourseDetailLoader />;
  } else {
    return (
      <View style={styles.container}>
        <Background style={StyleSheet.absoluteFill} />
        <Header
          showBackButton={true}
          heading={courseData.name}
          showNotification={false}
          showCart={false}
          showLearneLogo={false}
          showGridIcon={false}
        />
        <Video
          source={{uri: courseData.video}}
          style={{
            height: 200,
            width: '100%',
            backgroundColor: Colors.BLACK,
          }}
          controls={true}
        />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.mainView}>
            <MyText
              text={courseData.name}
              fontFamily={MEDIUM}
              fontSize={20}
              textColor={'black'}
              style={{width: '95%'}}
            />
            <View style={{flexDirection: 'row'}}>
              <MyText
                text={'$'}
                fontFamily={MEDIUM}
                fontSize={20}
                textColor={BLACK}
                letterSpacing={0.14}
              />
              <MyText
                text={courseData.course_fee}
                fontFamily={MEDIUM}
                fontSize={20}
                textColor={DARK_PURPLE}
                letterSpacing={0.14}
                style={{}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 5,
                }}>
                <Calendar />
                <MyText
                  text={courseData.created_at}
                  fontFamily={MEDIUM}
                  fontSize={12}
                  textColor={'black'}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Rating height={20} />
                <MyText
                  text={courseData.rating}
                  fontFamily={REGULAR}
                  fontSize={16}
                  textColor={Colors.DARK_PURPLE}
                  letterSpacing={0.14}
                  style={{marginLeft: 3}}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 5,
                  width: '55%',
                }}>
                <Image
                  source={{uri: courseData.creator_profile}}
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 100,
                  }}
                />
                <MyText
                  text={courseData.creator_name}
                  fontFamily={MEDIUM}
                  fontSize={12}
                  textColor={'black'}
                  style={{flex: 1}}
                  numberOfLines={1}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 7,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 5,
                }}>
                <Chapter />
                <MyText
                  text={`${courseData.lesson_count} Lessons`}
                  fontFamily={MEDIUM}
                  fontSize={12}
                  textColor={'black'}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 5,
                }}>
                <Quiz />
                <MyText
                  text={`${courseData.total_quiz} Quiz Questions`}
                  fontFamily={MEDIUM}
                  fontSize={12}
                  textColor={'black'}
                />
              </View>
            </View>
            {courseData?.purchased && (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <MyText
                    text={`Course Progress`}
                    fontFamily={MEDIUM}
                    fontSize={16}
                    textColor={'black'}
                    style={{marginBottom: 5}}
                  />
                  <MyText
                    text={`${courseData?.completion_status}%`}
                    fontFamily={MEDIUM}
                    fontSize={16}
                    textColor={'black'}
                    style={{marginBottom: 5}}
                  />
                </View>
                <Progress.Bar
                  progress={courseData?.completion_status / 100}
                  height={13}
                  width={responsiveWidth(90)}
                  style={{marginBottom: 15}}
                  color={Colors.PINK}
                />
              </>
            )}
            <MyText
              text={'Description'}
              fontFamily={MEDIUM}
              fontSize={16}
              textColor={'black'}
            />
            <MyText
              text={courseData.description}
              fontFamily={REGULAR}
              fontSize={14}
              textColor={'black'}
              style={{width: '95%', LINE_HEIGTH}}
            />
            <Divider
              color={Colors.LIGHT_PURPLE}
              borderBottomWidth={2}
              marginVertical={10}
            />
            {!courseData.purchased && (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {courseData.in_cart ? (
                  <MyButton
                    text={'Remove from cart'}
                    backgroundColor="#FF0000"
                    width="48%"
                    onPress={() => removeCourseFromCart()}
                  />
                ) : (
                  <MyButton
                    text={'Add to cart'}
                    backgroundColor="#00B44B"
                    width="48%"
                    onPress={() => addCourseInToCart()}
                  />
                )}

                <MyButton
                  text={'Buy Now'}
                  backgroundColor="#5E4AF7"
                  width="48%"
                  onPress={buyNowHandler}
                />
              </View>
            )}
            {courseData?.tags?.length > 0 && (
              <ViewAll text="Tags" showSeeAll={false} style={{marginTop: 20}} />
            )}
            {courseData?.tags?.length > 0 ? (
              <FlatList
                data={[courseData?.tags[0]]}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{marginTop: 11}}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => <TagsItem item={item} />}
              />
            ) : (
              <MyText
                text={'No Tags found!'}
                fontFamily="medium"
                fontSize={18}
                textAlign="center"
                textColor={'black'}
              />
            )}
            <Divider
              color={Colors.LIGHT_PURPLE}
              borderBottomWidth={2}
              marginVertical={10}
            />
            {[courseData?.category_name]?.length > 0 && (
              <ViewAll
                text="Category"
                showSeeAll={false}
                style={{marginTop: 20}}
              />
            )}
            {courseData?.tags?.length > 0 ? (
              <FlatList
                data={[{name: courseData?.category_name}]}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{marginTop: 11}}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <TagsItem
                    item={item}
                    style={{backgroundColor: Colors.DARK_PURPLE}}
                  />
                )}
              />
            ) : (
              <MyText
                text={'No Tags found!'}
                fontFamily="medium"
                fontSize={18}
                textAlign="center"
                textColor={'black'}
              />
            )}
            <Divider
              color={Colors.LIGHT_PURPLE}
              borderBottomWidth={2}
              marginVertical={10}
            />
            <ViewAll
              text="Lessons "
              showSeeAll={false}
              style={{marginTop: 10}}
            />
            {courseData?.lessons?.length > 0 ? (
              <FlatList
                data={courseData?.lessons}
                style={{marginTop: 11}}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <ChapterCard
                    item={item}
                    index={index + 1}
                    onPress={() => {
                      if (courseData.purchased) {
                        gotoChapterDetail(item);
                      } else {
                        setShowNotPurchased(true);
                      }
                    }}
                  />
                )}
              />
            ) : (
              <MyText
                text={'No Chapters found!'}
                fontFamily="medium"
                fontSize={18}
                textAlign="center"
                textColor={'black'}
              />
            )}
            <View style={styles.ratingCotainer}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 10,
                }}>
                <Rating height={60} width={60} />
                <View>
                  <MyText
                    text={'Rating & Review'}
                    fontFamily="medium"
                    fontSize={14}
                    textAlign="center"
                    textColor={'black'}
                  />
                  <MyText
                    text={`${courseData.rating}(${courseData?.review_list?.length})`}
                    fontFamily="medium"
                    fontSize={14}
                    textColor={YELLOW}
                  />
                </View>
              </View>

              {courseData.purchased && (
                <>
                  {courseData.is_reviewed ? (
                    <TouchableOpacity
                      onPress={() => setShowEditReview(true)}
                      style={styles.buttonReview}>
                      <MyText
                        text={'Edit your Review'}
                        fontFamily="medium"
                        fontSize={14}
                        textAlign="center"
                        textColor={'white'}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => setShowReviewPopup(true)}
                      style={styles.buttonReview}>
                      <MyText
                        text={'Write your Review'}
                        fontFamily="medium"
                        fontSize={14}
                        textAlign="center"
                        textColor={'white'}
                      />
                    </TouchableOpacity>
                  )}
                </>
              )}
            </View>
            {courseData?.review_list?.length > 0 ? (
              courseData?.review_list?.map((item, index) => (
                <View key={index?.toString()} style={styles.reviewContainer}>
                  <View style={styles.reviewTopLeftRow}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={
                          item?.review_by_profile
                            ? {uri: item?.review_by_profile}
                            : require('assets/images/ReviewPerson1.png')
                        }
                        style={styles.reviewImg}
                      />
                      <View style={{marginLeft: 10}}>
                        <MyText
                          text={item.review_by_name}
                          fontFamily={REGULAR}
                          fontSize={16}
                          numberOfLines={2}
                          textColor={'black'}
                        />
                        <View
                          style={{
                            flexDirection: 'row',
                            columnGap: 5,
                          }}>
                          <Rating />
                          <MyText text={item.rating} />
                        </View>
                      </View>
                    </View>

                    <MyText
                      text={item.review_on}
                      fontFamily="medium"
                      fontSize={13}
                      textColor={'gray'}
                      textAlign={'right'}
                      style={{marginLeft: 10}}
                    />
                  </View>
                  <MyText
                    text={item.review}
                    fontFamily="medium"
                    fontSize={13}
                    textColor={'gray'}
                    style={{marginTop: 10}}
                  />
                </View>
              ))
            ) : (
              <MyText
                text={'No Reviews found'}
                fontFamily="medium"
                fontSize={18}
                textAlign="center"
                textColor={'black'}
              />
            )}
          </View>
        </ScrollView>
        {courseData?.course_completed == '1' && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <MyButton
              text={'View Certificate'}
              width="48%"
              onPress={() => gotoViewCertificate()}
            />
            <MyButton
              text={'Download Certificate'}
              width="48%"
              backgroundColor={Colors.DARK_PURPLE}
              onPress={() => downloadCertificate()}
            />
          </View>
        )}

        <Review
          id={id}
          visible={showReviewPopup}
          setVisibility={setShowReviewPopup}
          nextFunction={msg => {
            Toast.show({
              type: 'success',
              text1: msg,
            });
            getCourseDetail();
          }}
          style={{
            marginBottom: Platform.OS === 'ios' ? keyboardHeight : 0,
          }}
        />
        <EditReview
          id={id}
          visible={showEditReview}
          setVisibility={setShowEditReview}
          nextFunction={msg => {
            Toast.show({
              type: 'success',
              text1: msg,
            });
            getCourseDetail();
          }}
          style={{
            marginBottom: Platform.OS === 'ios' ? keyboardHeight : 0,
          }}
        />
        <NotPurchase
          visible={showNotPurchased}
          setVisibility={setShowNotPurchased}
        />
        <Loader visible={showAppLoader} />
      </View>
    );
  }
};

export default CourseDetail;
