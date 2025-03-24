//import : react component
import React, {useState, useRef, useEffect} from 'react';
import {View, TouchableOpacity, FlatList, Image} from 'react-native';
//import : custom components
import Header from 'component/Header/Header';
import MyText from 'component/MyText/MyText';
import MyButton from 'component/MyButton/MyButton';
import ChapterContent from 'component/ChapterContent/ChapterContent';
import Loader from 'component/loader/Loader';
//import : third party
import {ScrollView} from 'react-native-virtualized-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
//import : utils
import Calendar from 'assets/images/calendar.svg';
import Clock from 'assets/images/clockGreen.svg';
import TaskSvg from 'assets/svgs/task-square.svg';
import NotFavSvg from 'assets/svgs/note-favorite.svg';
import {BLACK, REGULAR} from 'global/Fonts';
import {API_Endpoints} from 'global/Service';
import {Colors, MyIcon, ScreenNames, Service} from 'global/index';
//import : styles
import {styles} from './ChapterDetailStyle';
//import : modals
import QuizResult from 'modals/QuizResult/QuizResult';
//import : redux

const ChapterDetail = ({route, navigation}) => {
  //variables
  const {data} = route.params;
  const isFocused = useIsFocused();
  const quizInfo = useRef({});
  //hook : states
  const [chapterData, setChapterData] = useState({});
  const [selectedItem, setSelectedItem] = useState({});
  const [showAppLoader, setShowAppLoader] = useState(false);
  //hook : modal states
  const [showQuizResult, setShowQuizResult] = useState(false);
  //function : nav func
  const gotoWebViewPage = url => {
    navigation.navigate(ScreenNames.WEB_VIEW_PAGE, {
      url: url,
      data: data,
    });
  };
  const openQuiz = item => {
    if (selectedItem.is_quiz_attempted) {
      quizInfo.current = item;
      setShowQuizResult(true);
    } else {
      gotoWebViewPage(item.quiz_url);
    }
  };
  const openSurvey = item => {
    navigation.navigate(ScreenNames.WEB_VIEW_PAGE, {
      url: item.survey_url,
      data: data,
    });
  };
  //function : imp func
  const handleContinuePress = () => {
    const index = chapterData?.chapter_steps?.findIndex(
      e => e.step_id == selectedItem.step_id,
    );
    if (index == chapterData.chapter_steps.length - 1) {
    } else {
      setSelectedItem(chapterData?.chapter_steps[index + 1]);
    }
  };
  const initLoader = async () => {
    setShowAppLoader(true);
    await getLessonDetails();
    setShowAppLoader(false);
  };
  //function : serv func
  const getLessonDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const endPoint = `${API_Endpoints.lesson_details}/${data.lesson_id}`;
      const {response, status} = await Service.getAPI(endPoint, token);
      if (status) {
        setSelectedItem(response?.data?.chapter_steps[0]);
        setChapterData(response.data);
      }
    } catch (error) {
      console.error('error in getLessonDetails', error);
    }
  };
  const markAsComplete = async () => {
    try {
      setShowAppLoader(true);
      const postData = {
        chapter_step_id: selectedItem.step_id,
      };
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.postAPI(
        API_Endpoints.mark_as_complete,
        postData,
        token,
      );
      if (status) {
        Toast.show({
          type: 'success',
          text1: response?.message,
        });
        getLessonDetails();
      }
    } catch (err) {
      console.error('error in markAsComplete', err);
    } finally {
      setShowAppLoader(false);
    }
  };
  //hook : useEffect
  useEffect(() => {
    initLoader();

    return () => {};
  }, [isFocused]);

  //UI
  return (
    <View style={styles.container}>
      <Header
        showBackButton={true}
        heading={chapterData.lesson_name}
        showNotification={false}
        showCart={false}
        showLearneLogo={false}
        showGridIcon={false}
      />
      <ScrollView>
        {Object.keys(selectedItem).length > 0 && (
          <ChapterContent
            course_img={chapterData.image}
            url={selectedItem?.file}
            type={selectedItem?.type}
            item={selectedItem}
            quizPress={() => openQuiz(selectedItem)}
            surveyPress={() => openSurvey(selectedItem)}
          />
        )}

        <View style={styles.mainView}>
          <MyText
            text={selectedItem.title}
            fontFamily={BLACK}
            fontSize={20}
            textColor={'black'}
            style={{width: '95%'}}
          />
          {/* <View
            style={{
              flexDirection: 'row',
              columnGap: 20,
            }}>
            <View style={{flexDirection: 'row', columnGap: 5}}>
              <Calendar />
              <MyText
                text={data?.lesson_created_at}
                fontFamily={REGULAR}
                fontSize={16}
                textColor={'black'}
              />
            </View>
            <View style={{flexDirection: 'row', columnGap: 5}}>
              <Clock />
              <MyText
                text={'10min'}
                fontFamily={REGULAR}
                fontSize={16}
                textColor={'black'}
              />
            </View>
          </View> */}
          {/* <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              columnGap: 20,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TaskSvg />
              <MyText
                text={' 26 Dec 2024'}
                fontFamily={REGULAR}
                fontSize={16}
                textColor={'black'}
              />
            </View>
            <View style={{flexDirection: 'row', columnGap: 5}}>
              <NotFavSvg />
              <MyText
                text={'10min'}
                fontFamily={REGULAR}
                fontSize={16}
                textColor={'black'}
              />
            </View>
          </View> */}
          <MyText
            text={selectedItem?.description}
            fontFamily={REGULAR}
            fontSize={14}
            textColor={'black'}
            style={{width: '95%'}}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <MyButton
              text={'Mark as complete'}
              width="48%"
              disabled={!selectedItem?.showMarkCompleteBtn}
              backgroundColor={
                selectedItem?.showMarkCompleteBtn
                  ? Colors.GREEN
                  : Colors.LIGHT_GREY
              }
              onPress={() => markAsComplete()}
            />
            <MyButton
              text={'Continue'}
              width="48%"
              backgroundColor={Colors.DARK_PURPLE}
              onPress={() => handleContinuePress()}
            />
          </View>
          <FlatList
            data={chapterData?.chapter_steps}
            renderItem={({item, index}) => {
              return (
                <ChapterTask
                  icon={item.image}
                  title={item.title}
                  item={item}
                  isSelected={item.title == selectedItem.title}
                  onPress={() => setSelectedItem(item)}
                />
              );
            }}
            keyExtractor={(item, index) => index + item}
          />
        </View>
      </ScrollView>
      <Loader visible={showAppLoader} />
      <QuizResult
        visible={showQuizResult}
        setVisibility={setShowQuizResult}
        data={quizInfo.current}
        nextFunction={() => {
          gotoWebViewPage(selectedItem.quiz_url);
        }}
      />
    </View>
  );
};

export default ChapterDetail;

const ChapterTask = ({icon, item, isSelected, title, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        columnGap: 10,
        borderRadius: 10,
        padding: 10,
        borderColor: isSelected ? Colors.YELLOW : Colors.LIGHT_PURPLE,
        borderWidth: 1,
        backgroundColor: 'white',
        marginVertical: 6,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 10,
        }}>
        <Image
          source={{uri: icon}}
          style={{
            height: 30,
            width: 30,
          }}
        />
        <MyText
          text={title}
          fontFamily={BLACK}
          fontSize={14}
          textColor={'black'}
        />
      </View>
      {item.is_completed == '1' && (
        <MyIcon.MaterialCommunityIcons
          name="check-decagram-outline"
          size={28}
          color={Colors.GREEN}
        />
      )}
    </TouchableOpacity>
  );
};
