//import : react component
import React, {useCallback, useRef, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
//import : custom components
import CourseCard from 'component/CourseCard/CourseCard';
import Header from 'component/Header/Header';
import MyText from 'component/MyText/MyText';
import SearchWithIcon from 'component/SearchWithIcon/SearchWithIcon';
import SizeBox from 'component/SizeBox/SizeBox';
import ListLoader from 'component/SkeltonLoader/ListLoader';
import Loader from 'component/loader/Loader';
//import : third party
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {debounce} from 'lodash';
//import : utils
import Background from 'assets/svgs/background.svg';
import {API_Endpoints} from 'global/Service';
import {Colors, MyIcon, Service} from 'global/index';
//import : styles
import {styles} from './CourseListingStyle';
//import : modals
import CourseFilter from 'modals/CourseFilter/CourseFilter';
import {BOLD, MEDIUM} from 'global/Fonts';
import NoDataFound from 'component/NoDataFound/NoDataFound';
//import : redux

const CourseListing = ({navigation, route}) => {
  //variables
  const isFocused = useIsFocused();
  const {data} = route.params;
  //hook : states
  const [coursesData, setCoursesData] = useState([]);
  //hook : modal states
  const [showLoader, setShowLoader] = useState(false);
  const [showBaseLoader, setShowBaseLoader] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [tempSearchedText, setTempSearchedText] = useState('');
  //hook : filter states
  const [tempFilters, setTempFilters] = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});
  const [isFilteredApplied, setIsFilteredAppplied] = useState(false);

  //variables : redux variables
  const gotoTrendingCourses = () => {
    // navigation.navigate(ScreenNames.TRENDING_COURSES);
  };
  //function : imp func
  const initLoader = async () => {
    setShowBaseLoader(true);
    await getCourses();
    setShowBaseLoader(false);
  };
  const debouncedSearch = useCallback(
    debounce(query => {
      getCourses({name: query});
    }, 500), // 500ms delay
    [],
  );
  const searchHandle = text => {
    setTempSearchedText(text);
    debouncedSearch(text);
  };
  const handleFilters = filters => {
    setAppliedFilters({
      Category: filters.category_name || '',
      'Sub Category': filters.sub_category_name || '',
      Price: filters.highlow_name || '',
      Ratings: filters.ratings_name ? `${filters.ratings} and up` : '',
    });
    setTempFilters(filters);
    setIsFilteredAppplied(Object.keys(filters).some(key => filters[key]));
    getCourses(filters);
  };

  const removeFilter = key => {
    const filterKeys = {
      Category: 'category_id',
      'Sub Category': 'sub_category_id',
      Price: 'highlow',
      Ratings: 'ratings',
    };

    const updatedFilters = {...tempFilters};
    delete updatedFilters[filterKeys[key]]; // ✅ Removes correct filter key

    setAppliedFilters(prev => {
      const newFilters = {...prev};
      delete newFilters[key];
      return newFilters;
    });
    console.log('updatedFilters', updatedFilters);
    setTempFilters(updatedFilters);
    getCourses(updatedFilters);
    setIsFilteredAppplied(Object.keys(updatedFilters).length > 0);
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
        getCourses();
      }
    } catch (err) {
      console.error('error in registering user', err);
    } finally {
      setShowLoader(false);
    }
  };
  const getCourses = async (filterData = {}) => {
    try {
      const paramsData = {
        name: filterData.name || '',
        highlow: filterData.highlow || '',
        ratings: filterData.ratings || '',
        category_id: filterData.category_id || '',
        sub_category_id: filterData.sub_category_id || '',
        trending: data.trending,
      };
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.getAPI(
        API_Endpoints.courses,
        token,
        paramsData,
      );
      if (status) {
        setCoursesData(response?.data?.data);
      }
    } catch (error) {
      console.error('error in getCourses', error);
    }
  };
  //hook : useEffect
  useEffect(() => {
    initLoader();
    return () => debouncedSearch.cancel();
  }, [isFocused]);

  //UI
  if (showBaseLoader) {
    return <ListLoader />;
  } else {
    return (
      <View style={styles.container}>
        <Background style={StyleSheet.absoluteFill} />
        <Header
          showBackButton={true}
          showNotification={false}
          heading={`${data.title} Courses`}
          showCart={false}
          showGridIcon={false}
          showLearneLogo={false}
        />
        <View style={styles.mainView}>
          <SearchWithIcon
            value={tempSearchedText}
            placeholder={'Search by course or product name'}
            onChangeText={text => searchHandle(text)}
            icon={
              <MyIcon.Ionicons name="filter" size={28} color={Colors.WHITE} />
            }
            onPress={() => setShowFilter(true)}
            showDot={() => (isFilteredApplied ? true : false)}
            placeholderTextColor={Colors.GRAY}
          />
          {isFilteredApplied && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginVertical: 10,
              }}>
              {Object.entries(appliedFilters).map(([key, value]) =>
                value ? (
                  <View
                    key={key}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: Colors.DARK_PURPLE,
                      borderRadius: 20,
                      paddingHorizontal: 10,
                      padding: 5,
                      margin: 5,
                      columnGap: 10,
                    }}>
                    <MyText
                      text={`${key.replace(/_/g, ' ')}: ${value}`}
                      fontSize={10}
                      textColor={Colors.WHITE}
                      fontFamily={MEDIUM}
                    />
                    <TouchableOpacity onPress={() => removeFilter(key)}>
                      <MyIcon.Ionicons
                        name="close-circle"
                        size={18}
                        color={Colors.WHITE}
                      />
                    </TouchableOpacity>
                  </View>
                ) : null,
              )}
            </View>
          )}

          <FlatList
            data={coursesData || []}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <CourseCard
                  item={item}
                  heartPress={() => addToWishlist(item.id)}
                  onPress={() => gotoCourseDetails(item.id)}
                />
              );
            }}
            onEndReachedThreshold={0.1}
            contentContainerStyle={{
              paddingBottom: '50%',
            }}
            ListEmptyComponent={() => {
              return <NoDataFound />;
            }}
          />
        </View>

        <Loader visible={showLoader} />
        <CourseFilter
          visible={showFilter}
          setVisibility={setShowFilter}
          setIsFilteredAppplied={setIsFilteredAppplied}
          nextFunction={handleFilters}
        />
      </View>
    );
  }
};

export default CourseListing;

const FilterItem = ({title, value}) => {
  return (
    <View
      style={{
        backgroundColor: '#ede5ca',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        padding: 5,
        borderRadius: 10,
      }}>
      <MyText text={title} />
      <MyText text={value} />
    </View>
  );
};
