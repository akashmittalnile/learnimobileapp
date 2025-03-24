//import : react component
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
//import : custom components
import MyText from 'component/MyText/MyText';
//import : third party
//import : utils
import {BLACK, REGULAR} from 'global/Fonts';
import {DARK_PURPLE} from 'global/Color';
import {dimensions} from 'global/Constants';
import Pdf from 'assets/svgs/chaptersvg/document-pdf.svg';
import Quiz from 'assets/images/quizQues.svg';
//import : styles
import {styles} from './ChapterCardStyle';
//import : modals
//import : redux

const ChapterCard = ({item, index, onPress = () => {}}) => {
  //UI
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.container}>
      <View
        style={[
          styles.chapterContainerow,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: dimensions.SCREEN_WIDTH * 0.87,
            marginTop: 14,
          },
        ]}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.serialContainer}>
            <MyText
              text={index}
              fontFamily={BLACK}
              fontSize={13}
              textColor={'white'}
            />
          </View>

          <View style={styles.chapterTitleView}>
            <MyText
              text={item.lesson_name}
              fontFamily={BLACK}
              fontSize={13}
              textColor={DARK_PURPLE}
            />
          </View>
        </View>
        {item?.total_quiz > 0 && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Quiz />
            <MyText
              text={`${item.total_quiz} QUIZ`}
              fontFamily={BLACK}
              fontSize={12}
              style={{textAlign: 'center', marginLeft: 5}}
            />
          </View>
        )}
        {item?.total_pdf > 0 && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Pdf />
            <MyText
              text={`${item.total_pdf} PDF`}
              fontFamily={BLACK}
              fontSize={12}
              style={{textAlign: 'center', marginLeft: 5}}
            />
          </View>
        )}
      </View>
      <MyText
        text={item.lesson_description}
        fontFamily={REGULAR}
        fontSize={13}
        numberOfLines={3}
        textColor={'black'}
        style={{width: '95%', marginHorizontal: 16, marginTop: 7}}
      />
    </TouchableOpacity>
  );
};

export default ChapterCard;
