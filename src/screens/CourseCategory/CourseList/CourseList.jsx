//Amit Kumar  07 mar fix UI , pagination and fix filler issues
//import : react components
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Switch,
  TouchableOpacity,
  Dimensions,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
//import : custom components
import Header from 'component/Header/Header';
import MyText from 'component/MyText/MyText';
import Loader from 'component/loader/Loader';
//import : third parties
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
//import : global
import {Colors} from 'global/index';
//import : styles
import {styles} from '../CourseCategoryStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreenNames, Service} from 'global/index';
import {API_Endpoints} from 'global/Service';
import CourseCard from 'component/CourseCard/CourseCard';
import FilterIcon from 'assets/images/settingFilter.svg';

//import : modal
//import : redux
import {connect, useSelector} from 'react-redux';
import {width, height} from 'global/Constant';
import Divider from 'component/Divider/Divider';

import SearchWithIcon from 'component/SearchWithIcon/SearchWithIcon';
import Background from 'assets/svgs/background.svg';
import TrendingFiltersModal from 'component/SearchWithIcon/Component/CategoryFilter';
import VideoModal from 'component/VideoModal/VideoModal';
import Cross from 'assets/images/closecircle.svg';
// import { shareItemHandler } from '../../../global/globalMethod';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {dimensions} from 'global/Constants';
import CourseDetailLoader from 'component/SkeltonLoader/CourseDetailLoader';
import NoDataFound from 'component/NoDataFound/NoDataFound';
// import defaultImg from 'assets/images/profilePerson.svg';

let timeoutId;
let count = 0;
const CourseList = ({navigation, dispatch, route}) => {
  const {data} = route.params;
  // const defaultImgPath = Image.resolveAssetSource(defaultImg).uri;
  //variables : ref
  const scrollRef = useRef();
  //variables
  const LINE_HEIGTH = 25;
  //variables : redux
  const userToken = useSelector(state => state.user.userToken);
  const userInfo = useSelector(state => state.user.userInfo);
  const [showLoader, setShowLoader] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [courseData, setCourseData] = useState([]);

  const [courseOldData, setCourseOldData] = useState([]);

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [courseCategries, setCourseCategries] = useState([]);
  const [selectedCourseCategries, setSelectedCourseCategries] = useState([]);
  const [tempSelectedCourseCategries, setTempSelectedCourseCategries] =
    useState([]);
  useState([]);
  const [priceFilterValues, setPriceFilterValues] = useState([
    {
      id: '1',
      name: 'High to Low',
    },
    {
      id: '2',
      name: 'Low to High',
    },
  ]);
  const [tempSelectedPriceFilter, setTempSelectedPriceFilter] = useState('');
  const [selectedPriceFilter, setSelectedPriceFilter] = useState('');
  const [selectedRatingValues, setSelectedRatingValues] = useState([]);
  const [tempSelectedRatingValues, setTempSelectedRatingValues] = useState([]);
  const [showModal, setShowModal] = useState({isVisible: false, data: null});
  const [refreshing, setRefreshing] = useState(false);
  const [applyCheck, setApplyCheck] = useState(false);
  //hook : pagination states
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [page1, setPage1] = useState(1);
  const [lastPage1, setLastPage1] = useState(1);
  const [paginationDetails, setPaginationDetails] = useState({
    last_page_no: 1,
    current_page: 1,
  });
  const [isDataLoading, setIsDataLoading] = useState(false);
  const focused = useIsFocused();

  const renderFooter = () => {
    return (
      <>
        {isDataLoading ? (
          <View style={{paddingVertical: 20}}>
            <ActivityIndicator animating={true} size="large" color="#0000ff" />
          </View>
        ) : null}
      </>
    );
  };
  const initLoader = async () => {
    setShowLoader(true);
    await getCourses();
    await courseCategories();
    setShowLoader(false);
  };
  const loadMore = async () => {
    if (page <= lastPage) {
      setIsDataLoading(true);
      await getCourses();
      setIsDataLoading(false);
      // if (applyCheck == true) {
      //   if(page1 <= lastPage1){
      //     await applyFilters();
      //   }else{
      //     removeFilter()
      //   }

      // }
      // else{
      //   setIsDataLoading(true);
      //   await getCourses();
      //   setIsDataLoading(false)
      // }
      // setIsDataLoading(true);

      // setIsDataLoading(false);
    }
  };
  // const scrollToTop = () => {
  //   scrollRef?.current?.scrollToOffset({animated: true, offset: 0});
  // };

  useEffect(() => {
    setApplyCheck(false);
    setSearchValue('');
    setCourseData([]);
    setSelectedCourseCategries([]);
    setTempSelectedCourseCategries([]);
    setSelectedPriceFilter('');
    setTempSelectedPriceFilter('');
    setSelectedRatingValues('');
    setTempSelectedRatingValues('');
    setApplyCheck(false);
    initLoader();
  }, [focused]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSearchValue('');
      setCourseData([]);
      setSelectedCourseCategries([]);
      setTempSelectedCourseCategries([]);
      setSelectedPriceFilter('');
      setTempSelectedPriceFilter('');
      setSelectedRatingValues('');
      setTempSelectedRatingValues('');
      setPage(1);
      setLastPage(1);
      setPage1(1);
      setLastPage1(1);
      setApplyCheck(false);
    });
    return unsubscribe;
  }, [focused]);
  const checkcon = () => {
    setPage(1);
    setLastPage(1);
    setPage1(1);
    setLastPage1(1);
    setApplyCheck(false);
    initLoader();
  };
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setSearchValue('');
    checkcon();

    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);
  let paramsData = {}; // Global variable to store filter params
  const getCourses = async (searchedName = '') => {
    try {
      paramsData = {
        ...paramsData,
        name: searchedName,
        sub_category_id: data.id,
      };
      const token = await AsyncStorage.getItem('token');

      const {response, status} = await Service.getAPI(
        API_Endpoints.courses,
        token,
        paramsData,
      );
      if (status) {
        setCourseData(response?.data?.data);
      }
    } catch (error) {
      console.error('error in getHome', error);
    } finally {
      setShowLoader(false);
    }
  };

  const onLike = async (type, id, status) => {
    setCourseData([]);
    setPage(1);
    setLastPage(1);
    setShowLoader(true);

    const formdata = new FormData();
    formdata.append('type', type);
    formdata.append('id', id);
    formdata.append('status', status == '1' ? '0' : '1');
    const endPoint =
      status == '1' ? Service.UNLIKE_OBJECT_TYPE : Service.LIKE_OBJECT_TYPE;
    try {
      const resp = await Service.postApiWithToken(
        userToken,
        endPoint,
        formdata,
      );
      if (resp?.data?.status) {
        Toast.show({text1: resp.data.message});
        getCourses();
      } else {
        Toast.show({text1: resp.data.message});
      }
    } catch (error) {}
    showLoader && setShowLoader(false);
  };
  const gotoCourseDetails = (id, type) => {
    navigation.navigate(ScreenNames.COURSE_DETAIL, {id, type});
  };
  const isFilterApplied = () => {
    if (selectedCourseCategries?.length > 0) {
      return true;
    } else if (selectedPriceFilter !== '') {
      return true;
    } else if (selectedRatingValues?.length > 0) {
      return true;
    }

    return false;
  };
  const ShowSelectedFilters = () => {
    return (
      <View
        style={{flexWrap: 'wrap', flexDirection: 'row', paddingVertical: 10}}>
        {selectedCourseCategries?.length > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              backgroundColor: '#ede5ca',
              marginRight: 'auto',
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
              marginTop: 10,
            }}>
            <MyText
              text={'Categorie(s): '}
              fontFamily="regular"
              fontSize={13}
              textColor={Colors.THEME_BROWN}
              style={{}}
            />
            {selectedCourseCategries?.map((el, index) => (
              <View
                key={index?.toString()}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 10,
                }}>
                <MyText
                  text={el}
                  fontFamily="regular"
                  fontSize={13}
                  textColor={Colors.THEME_BROWN}
                />
                <TouchableOpacity
                  onPress={() => removeFilter('cat', el)}
                  style={{
                    marginLeft: 5,
                    marginTop: 3,
                  }}>
                  <Cross></Cross>
                  {/* <Image
                    source={require('assets/images/trash.png')}
                    style={{ height: 16, width: 16 }}
                  /> */}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}
        {selectedPriceFilter !== '' ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#ede5ca',
              marginRight: 'auto',
              marginTop: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
            }}>
            <MyText
              text={'Price: '}
              fontFamily="regular"
              fontSize={13}
              textColor={Colors.THEME_BROWN}
              style={{}}
            />
            <MyText
              text={
                priceFilterValues?.find(el => el.id === selectedPriceFilter)
                  ?.name
              }
              fontFamily="regular"
              fontSize={13}
              textColor={Colors.THEME_BROWN}
            />
            <TouchableOpacity
              onPress={() => removeFilter('price', selectedPriceFilter)}
              style={{
                marginLeft: 5,
                marginTop: 3,
              }}>
              <Cross></Cross>
              {/* <Image
                source={require('assets/images/trash.png')}
                style={{ height: 16, width: 16 }}
              /> */}
            </TouchableOpacity>
          </View>
        ) : null}
        {selectedRatingValues?.length > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              backgroundColor: '#ede5ca',
              marginRight: 'auto',
              marginTop: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
            }}>
            <MyText
              text={'Rating: '}
              fontFamily="regular"
              fontSize={13}
              textColor={Colors.THEME_BROWN}
              style={{}}
            />
            {selectedRatingValues?.map((el, index) => (
              <View
                key={index?.toString()}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 10,
                }}>
                <MyText
                  key={el}
                  text={`${el} and more`}
                  fontFamily="regular"
                  fontSize={13}
                  textColor={Colors.THEME_BROWN}
                />
                <TouchableOpacity
                  onPress={() => removeFilter('rating', el)}
                  style={{
                    marginLeft: 5,
                    marginTop: 3,
                  }}>
                  {/* <Image
                    source={require('assets/images/trash.png')}
                    style={{ height: 16, width: 16 }}
                  /> */}
                  <Cross></Cross>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    );
  };
  const openFilterModal = () => {
    setPage1(1);
    setLastPage1(1);
    setPage(1);
    setLastPage(1);
    setShowFilterModal(true);
  };
  const courseCategories = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const {response, status} = await Service.getAPI(
        API_Endpoints.get_tags,
        token,
        '',
      );

      if (status) {
        if (response?.data?.length > 0) {
          setCourseCategries(
            response?.data?.map(el => {
              return {
                id: el?.id,
                name: el?.name,
              };
            }),
          );
        } else if (!courseCategries || courseCategries.length === 0) {
          // ✅ Ensuring `courseCategries` is defined before checking length
          setCourseCategries(
            response?.data?.category?.map(el => ({
              id: el?.id,
              name: el?.name,
            })) || [], // ✅ Added fallback to empty array
          );
        }
      }
    } catch (error) {
      console.error('error in getHome', error);
    }
  };

  const setOriginalValues = () => {
    setSelectedCourseCategries(tempSelectedCourseCategries);
    setSelectedPriceFilter(tempSelectedPriceFilter);
    setSelectedRatingValues(tempSelectedRatingValues);
  };
  const setOriginalValues2 = () => {
    setSelectedCourseCategries(tempSelectedCourseCategries);
    setSelectedPriceFilter(tempSelectedPriceFilter);
    setSelectedRatingValues(tempSelectedRatingValues);
  };
  const applyFilters = async (searchParam = '') => {
    setCourseData([]);
    setPage(1);
    setLastPage(1);
    setShowLoader(true);
    setOriginalValues();
    const postData = new FormData();
    let catIds = [];
    catIds = courseCategries
      ?.filter(el => tempSelectedCourseCategries?.includes(el?.name))
      ?.map(el => el?.id);
    if (catIds?.length > 0) {
      catIds?.map(el => postData.append('category[]', el));
    }
    if (catIds?.length > 0) {
      catIds?.map(el => (paramsData.category = el)); // Adds multiple category IDs
    }
    if (tempSelectedPriceFilter !== '') {
      // postData.append('highlow', tempSelectedPriceFilter);
      paramsData.highlow = tempSelectedPriceFilter;
    }
    // if (tempSelectedRatingValues?.length > 0) {
    //   tempSelectedRatingValues?.map(el => postData.append('ratings', el));
    // }
    if (tempSelectedRatingValues?.length > 0) {
      paramsData.ratings = [...tempSelectedRatingValues]; // ✅ Save ratings in paramsData as an array
    }
    const isSearchTermExists = searchParam?.toString()?.trim()?.length > 0;
    const isSearchValueExists = searchValue?.toString()?.trim()?.length > 0;
    if (isSearchTermExists || isSearchValueExists) {
      // handling special case: while deleting last character of search, since search state would not update fast, so using searchParam instead of search state (searchValue)
      if (
        searchValue?.toString()?.trim()?.length === 1 &&
        searchParam?.toString()?.trim()?.length === 0
      ) {
        postData.append('title', searchParam?.toString()?.trim());
      } else {
        // preferring to check searchParam first, because it has the most recent search value fast. But it is not always passed, in else case using searchValue
        if (isSearchTermExists) {
          postData.append('title', searchParam?.toString()?.trim());
        } else {
          postData.append('title', searchValue?.toString()?.trim());
        }
      }
    }
    // postData.append('limit', 10);
    try {
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.getAPI(
        API_Endpoints.courses,
        token,
        paramsData,
      );
      setShowFilterModal(false);
      setCourseData(response?.data?.data);
    } catch (error) {
      console.error('error in applyFilters', error);
    }
    setShowLoader(false);
  };

  const applyFilters2 = async (searchParam = '') => {
    setCourseData([]);
    const isDeletingLastCharacterInSearch =
      searchValue?.toString()?.trim()?.length === 1 &&
      searchParam?.toString()?.trim()?.length === 0;
    const isSearching = isDeletingLastCharacterInSearch || searchParam !== '';
    setOriginalValues2();
    const postData = new FormData();
    let catIds = [];
    catIds = courseCategries
      ?.filter(el => tempSelectedCourseCategries?.includes(el?.name))
      ?.map(el => el?.id);

    if (catIds?.length > 0) {
      catIds?.map(el => postData.append('category[]', el));
    }
    if (tempSelectedPriceFilter !== '') {
      postData.append('price', tempSelectedPriceFilter);
    }
    if (tempSelectedRatingValues?.length > 0) {
      tempSelectedRatingValues?.map(el => postData.append('rating[]', el));
    }
    const isSearchTermExists = searchParam?.toString()?.trim()?.length > 0;
    const isSearchValueExists = searchValue?.toString()?.trim()?.length > 0;
    if (isSearchTermExists || isSearchValueExists) {
      // handling special case: while deleting last character of search, since search state would not update fast, so using searchParam instead of search state (searchValue)
      if (
        searchValue?.toString()?.trim()?.length === 1 &&
        searchParam?.toString()?.trim()?.length === 0
      ) {
        postData.append('title', searchParam?.toString()?.trim());
      } else {
        // preferring to check searchParam first, because it has the most recent search value fast. But it is not always passed, in else case using searchValue
        if (isSearchTermExists) {
          paramsData.name = searchParam?.toString()?.trim();
        } else {
          paramsData.name = searchValue?.toString()?.trim();
        }
      }
    }
    postData.append('limit', 10);
    try {
      setShowLoader(true);
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.getAPI(
        API_Endpoints.courses,
        token,
        paramsData,
      );

      setShowFilterModal(false);
      setCourseData(response?.data?.data);
      // if (resp?.data?.status == true) {
      //   setShowFilterModal(false);
      //   // const updatedData = await generateThumb(resp?.data?.data);
      //   setCourseData(resp?.data?.data);
      // } else {
      //   Toast.show({ text1: resp.data.message });
      // }
    } catch (error) {
      console.error('error in applyFilters', error);
    } finally {
      setShowLoader(false);
    }
  };
  const resetFilter = async () => {
    setShowFilterModal(false);
    setPage(1);
    setLastPage(1);
    setPage1(1);
    setLastPage1(1);
    setApplyCheck(false);
    setCourseData([]);
    // emptying all filter states and calling getAllType
    setSearchValue('');
    setSelectedCourseCategries([]);
    setTempSelectedCourseCategries([]);
    setSelectedPriceFilter('');
    setTempSelectedPriceFilter('');
    setSelectedRatingValues([]);
    setTempSelectedRatingValues([]);
    await initLoader();
  };
  const removeFilter = async (filterType, item) => {
    let remainingSelectedCategories = selectedCourseCategries;
    if (filterType === 'cat') {
      remainingSelectedCategories = selectedCourseCategries?.filter(
        el => el !== item,
      );

      setSelectedCourseCategries([...remainingSelectedCategories]);
      setTempSelectedCourseCategries([...remainingSelectedCategories]);
    }
    // const remainingPriceFilter = '';
    if (filterType === 'price') {
      setTempSelectedPriceFilter('');
      setSelectedPriceFilter('');
    }
    let remainingselectedRatingValues = [...selectedRatingValues];
    if (filterType === 'rating') {
      remainingselectedRatingValues = selectedRatingValues?.filter(
        el => el !== item,
      );
      setSelectedRatingValues(remainingselectedRatingValues);
      setTempSelectedRatingValues(remainingselectedRatingValues);
    }
    selectedRatingValues;
    // priceFilterValues?.find(el => el.id === selectedPriceFilter);
    const postData = new FormData();
    let catIds = [];
    catIds = courseCategries
      ?.filter(el => remainingSelectedCategories?.includes(el?.name))
      ?.map(el => el?.id);

    if (catIds?.length > 0) {
      catIds?.map(el => postData.append('category[]', el));
    }
    if (tempSelectedPriceFilter !== '') {
      postData.append('price', tempSelectedPriceFilter);
    }
    if (remainingselectedRatingValues?.length > 0) {
      remainingselectedRatingValues?.map(el => postData.append('rating[]', el));
    }
    postData.append('limit', 10);
    setShowLoader(true);
    try {
      const resp = await Service.postApiWithToken(
        userToken,
        `trending-course`,
        postData?._parts?.length === 0 ? {} : postData,
      );
      if (resp?.data?.status == true) {
        setShowFilterModal(false);
        if (postData?._parts?.length === 1) {
          setPage(1);
          await initLoader();
        } else {
          // const updatedData = await generateThumb(resp?.data?.data);
          setCourseData(resp?.data?.data);
        }

        // if (page1 == 1) {
        //   setLastPage1(resp?.data?.last_page_no);
        //   const updatedData = await generateThumb(resp?.data?.data);
        //   setCourseData(updatedData);

        // }
        // else {
        //   const updatedData = await generateThumb(resp?.data?.data);
        //   setCourseData([...courseData, ...updatedData]);
        // }
        // setPage1(1);
      } else {
        Toast.show({text1: resp.data.message});
      }
    } catch (error) {}
    setShowLoader(false);
  };

  const toggleModal = state => {
    setShowModal({
      isVisible: state.isVisible,
      data: state.data,
    });
  };

  // const paginationHandler = () => {
  //    if((paginationDetails.current_page <= paginationDetails.last_page_no  && searchValue.length === 0)){
  //     getCourses();
  //   }

  // };

  const debounceHandler = (getData, delay = 400) => {
    return function (args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      // if (searchValue.length === 0) {
      //   setPage(1);
      // setLastPage(1);
      //   // setPaginationDetails(preData => ({
      //   //   ...preData,
      //   //   current_page: 2,
      //   // }));
      //   return;
      // }

      timeoutId = setTimeout(() => {
        getData(args);
      }, delay);
    };
  };

  const debounce = debounceHandler(applyFilters2, 400);

  // const onSearch = (text) => {
  //   if(text == ''){
  //    setCourseData(courseOldData);
  //   }else{
  //     let tempList = courseData.filter(item =>{
  //       return item.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
  //     });
  //     setCourseData(tempList);
  //   }

  // }
  //UI

  const addToWishlist = async id => {
    try {
      setShowLoader(true);
      const postData = {
        id,
        type: 1,
      };
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.postAPI(
        API_Endpoints.add_wishlist,
        postData,
        token,
      );
      if (status) {
        Toast.show({
          type: 'success',
          text1: response?.message,
        });
        getCourses()
      }
    } catch (err) {
      console.error('error in registering user', err);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Background style={StyleSheet.absoluteFill} />

        <Header
          // showNotification={true}
          heading={'Courses List'}
          showLearneLogo={false}
          showCart={false}
          showBackButton={true}></Header>
        <KeyboardAwareScrollView style={{padding: 0}}>
          <View style={{flex: 1}}>
            {/* <ScrollView  
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={styles.mainView}> */}
            <View
              style={{
                width: dimensions.SCREEN_WIDTH * 0.9,
                alignSelf: 'center',
              }}>
              <SearchWithIcon
                value={searchValue}
                setValue={setSearchValue}
                placeholder="Search by Title"
                onChangeText={e => {
                  setSearchValue(e);
                  // onSearch(e)
                  debounce(e);
                }}
                onPress={openFilterModal}
                icon={
                  // <Image source={require('assets/images/filter.png')} />
                  <FilterIcon />
                }
                style={{marginTop: 10}}
                showDot={isFilterApplied}
              />
            </View>

            {showModal.isVisible ? (
              <VideoModal
                isVisible={showModal.isVisible}
                toggleModal={toggleModal}
                videoDetail={{
                  ...showModal?.data,
                  url: showModal?.data?.introduction_video,
                }}
                // {...props}
              />
            ) : null}
            <ShowSelectedFilters />

            {courseData?.length > 0 && (
              <FlatList
                ref={scrollRef}
                key={'#'}
                data={courseData}
                // style={{ marginTop: responsiveHeight(5), height: responsiveHeight(65), }}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                // keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                  return (
                    <CourseCard
                      item={item}
                      image={item.image}
                      heartPress={() => addToWishlist(item.id)}
                      onPress={() => gotoCourseDetails(item.id)}
                    />
                  );
                }}
                // onEndReached={paginationHandler}
                // onEndReachedThreshold={0.9}
                // onEndReached={loadMore}
                keyExtractor={item => item.id}
                contentContainerStyle={{paddingBottom: '30%'}}
                // onEndReachedThreshold={0.3}
                // ListFooterComponent={renderFooter}
                // ListEmptyComponent={() => (
                //   <View style={{alignItems: 'center', marginTop: 50}}>
                //     {/* <Image source={require('assets/images/no-data.png')} /> */}
                //     <MyText
                //       text={'No Trending Courses found'}
                //       fontFamily="medium"
                //       fontSize={40}
                //       textAlign="center"
                //       textColor={'black'}
                //     />
                //   </View>
                // )}
              />
            )}
          </View>
        </KeyboardAwareScrollView>
        <TrendingFiltersModal
          visible={showFilterModal}
          setVisibility={setShowFilterModal}
          courseCategries={courseCategries}
          tempSelectedCourseCategries={tempSelectedCourseCategries}
          setTempSelectedCourseCategries={setTempSelectedCourseCategries}
          priceFilterValues={priceFilterValues}
          tempSelectedPriceFilter={tempSelectedPriceFilter}
          setTempSelectedPriceFilter={setTempSelectedPriceFilter}
          tempSelectedRatingValues={tempSelectedRatingValues}
          setTempSelectedRatingValues={setTempSelectedRatingValues}
          applyFilters={() => {
            applyFilters();
            setApplyCheck(true);
          }}
          resetFilter={resetFilter}
        />
        {courseData?.length === 0 && <NoDataFound />}
      </ScrollView>

      {showLoader && <CourseDetailLoader />}

      {/* <CustomLoader showLoader={showLoader} /> */}
      {/* {courseData.length === 0 && <CustomLoader showLoader={showLoader} />} */}
    </SafeAreaView>
  );
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(null, mapDispatchToProps)(CourseList);
