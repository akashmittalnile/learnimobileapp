//import : react component
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
//import : custom components
import Header from 'component/Header/Header';
import SearchWithIcon from 'component/SearchWithIcon/SearchWithIcon';
//import : third party
//import : utils
//import : styles
import {styles} from './CourseListStyle';
import SizeBox from 'component/SizeBox/SizeBox';
import CourseCard from 'component/CourseCard/CourseCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreenNames, Service} from 'global/index';
import {API_Endpoints} from 'global/Service';
import Loader from 'component/loader/Loader';
import Toast from 'react-native-toast-message';
import Background from 'assets/svgs/background.svg';
import Filter from 'assets/images/settingFilter.svg';
import TrendingFiltersModal from 'component/SearchWithIcon/Component/CategoryFilter';
//import : modals
//import : redux

const CourseList = ({route, navigation}) => {
  //variables
  const {data} = route.params;
  //hook : states
  const [coursesData, setCoursesData] = useState([]);
  //hook : modal states
  const [showLoader, setShowLoader] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
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
  //function : nav func
  const gotoCourseDetails = id => {
    navigation.navigate(ScreenNames.COURSE_DETAIL, {id});
  };
  //function : imp func
  const initLoader = async () => {
    setShowLoader(true);
    await getCouseList();
    setShowLoader(false);
  };

  //function : serv func
  const addToWishlist = async id => {
    try {
      setShowLoader(true);
      const postData = {
        id: id,
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
        getCouseList();
      }
    } catch (err) {
      console.error('error in registering user', err);
    } finally {
      setShowLoader(false);
    }
  };
  const getCouseList = async (searchedName = '') => {
    try {
      const paramsData = {
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
        setCoursesData(response.data);
      }
    } catch (error) {
      console.error('error in getHome', error);
    }
  };

  ///filer data
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
  //hook : useEffect
  useEffect(() => {
    initLoader();

    return () => {};
  }, []);
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
          postData.append('title', searchParam?.toString()?.trim());
        } else {
          postData.append('title', searchValue?.toString()?.trim());
        }
      }
    }
    postData.append('limit', 10);

    // setShowLoader(true);
    try {
      const resp = await Service.postApiWithToken(
        userToken,
        `trending-course?page=${page1}`,
        postData,
      );
      if (resp?.data?.status == true) {
        setShowFilterModal(false);
        // const updatedData = await generateThumb(resp?.data?.data);
        // setCourseData(updatedData);
        if (page1 == 1) {
          setLastPage1(resp?.data?.last_page_no);
          // const updatedData = await generateThumb(resp?.data?.data);
          setCourseData(resp?.data?.data);
        } else {
          // const updatedData = await generateThumb(resp?.data?.data);
          setCourseData([...courseData, ...resp?.data?.data]);
        }
        setPage1(page1 + 1);
      } else {
        Toast.show({text1: resp.data.message});
      }
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
          postData.append('title', searchParam?.toString()?.trim());
        } else {
          postData.append('title', searchValue?.toString()?.trim());
        }
      }
    }
    postData.append('limit', 10);
    try {
      setShowLoader(true);
      const resp = await Service.postApiWithToken(
        userToken,
        Service.TRENDING_COURSE,
        postData,
      );
      if (resp?.data?.status == true) {
        setShowFilterModal(false);
        // const updatedData = await generateThumb(resp?.data?.data);
        setCourseData(resp?.data?.data);
      } else {
        Toast.show({text1: resp.data.message});
      }
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
  //UI
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <Background style={StyleSheet.absoluteFill} />

        <Header
          showNotification={true}
          heading={data.name}
          showLearneLogo={false}
          showCart={false}
          showBackButton={true}></Header>
        <View style={styles.container} onPress={() => setShowFilterModal(true)}>
          <View style={styles.mainView}>
            <SearchWithIcon
              placeholder="Search here..."
              value={''}
              onChangeText={''}
              icon={<Filter></Filter>} // Custom icon passed
              onPress={openFilterModal}
            />
            <SizeBox height={10} />
            <FlatList
              data={coursesData}
              contentContainerStyle={{
                paddingBottom: '50%',
              }}
              showsVerticalScrollIndicator={false}
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
              ItemSeparatorComponent={() => <SizeBox height={10} />}
              keyExtractor={(item, index) => item + index}
            />
          </View>
          <TrendingFiltersModal
            visible={showFilterModal}
            setVisibility={setShowFilterModal}
            courseCategries={[]}
            tempSelectedCourseCategries={''}
            setTempSelectedCourseCategries={''}
            priceFilterValues={priceFilterValues}
            tempSelectedPriceFilter={''}
            setTempSelectedPriceFilter={''}
            tempSelectedRatingValues={''}
            setTempSelectedRatingValues={''}
            applyFilters={() => {
              applyFilters();
              setApplyCheck(true);
            }}
            resetFilter={''}
          />
          <Loader visible={showLoader} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CourseList;
