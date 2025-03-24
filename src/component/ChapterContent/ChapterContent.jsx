//import : react component
import React from 'react';
import {View, Image, TouchableOpacity, Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
//import : custom components
import MyText from 'component/MyText/MyText';
//import : third party
import Video from 'react-native-video';
//import : utils
import {Colors, ScreenNames} from 'global/index';
import {BOLD} from 'global/Fonts';
//import : styles
//import : modals
//import : redux
var content_height = 250;
const ChapterContent = ({
  course_img,
  type,
  url,
  item,
  quizPress = () => {},
  surveyPress = () => {},
}) => {
  //variables
  const navigation = useNavigation();
  //function : nav func
  const gotoViewPdf = () => {
    navigation.navigate(ScreenNames.VIEW_PDF, {url});
  };
  const gotoViewContent = () => {
    navigation.navigate(ScreenNames.VIEW_CONTENT, {data: item});
  };
  const gotoAddAssignment = () => {
    navigation.navigate(ScreenNames.ADD_ASSIGNMENT, {data: item});
  };
  //UI
  if (type == 'video') {
    return (
      <Video
        source={{
          uri: url,
        }}
        controls
        style={{height: content_height, width: '100%'}}
      />
    );
  } else if (type == 'pdf') {
    return (
      <OnlyViewSection
        course_img={course_img}
        btn_title={'View PDF'}
        onPress={() => gotoViewPdf()}
      />
    );
  } else if (type == 'quiz') {
    return (
      <OnlyViewSection
        course_img={course_img}
        btn_title={'View Quiz'}
        onPress={() => quizPress()}
      />
    );
  } else if (type == 'assignment') {
    return (
      <OnlyViewSection
        course_img={course_img}
        btn_title={'Add Assignment'}
        onPress={() => gotoAddAssignment()}
      />
    );
  } else if (type == 'survey') {
    return (
      <OnlyViewSection
        course_img={course_img}
        btn_title={'View survey'}
        onPress={() => surveyPress()}
      />
    );
  } else if (type == 'content') {
    return (
      <OnlyViewSection
        course_img={course_img}
        btn_title={'View Content'}
        onPress={() => gotoViewContent()}
      />
    );
  }
};

export default ChapterContent;

const OnlyViewSection = ({btn_title, course_img, onPress = () => {}}) => {
  return (
    <View
      style={{
        height: content_height,
        width: '100%',
      }}>
      <Image
        source={{
          uri: course_img,
        }}
        style={{
          height: '100%',
          width: '100%',
          opacity: 0.7,
        }}
      />
      <TouchableOpacity
        onPress={() => onPress()}
        style={{
          position: 'absolute',
          alignSelf: 'center',
          top: '40%',
          backgroundColor: Colors.DARK_PURPLE,
          padding: 10,
          paddingHorizontal: 20,
          borderRadius: 10,
        }}>
        <MyText text={btn_title} textColor={Colors.WHITE} fontFamily={BOLD} />
      </TouchableOpacity>
    </View>
  );
};
