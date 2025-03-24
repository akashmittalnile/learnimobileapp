//import : react component
import React from 'react';
import {View, Modal, TouchableOpacity} from 'react-native';
//import : custom components
import MyText from 'component/MyText/MyText';
import MyButton from 'component/MyButton/MyButton';
//import : third party
//import : utils
import {Colors, Constants} from 'global/index';
import {BOLD, MEDIUM, SEMI_BOLD} from 'global/Fonts';
//import : styles
import {styles} from './QuizResultStyle';
//import : modals
//import : redux

const QuizResult = ({
  data,
  visible,
  setVisibility,
  nextFunction = () => {},
}) => {
  //function : modal func
  const closeModal = () => {
    setVisibility(false);
  };
  const retakeQuizPress = () => {
    closeModal();
    nextFunction();
  };
  //UI
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <TouchableOpacity style={styles.blurView} onPress={closeModal} />
        <View style={styles.mainView}>
          <View
            style={{
              backgroundColor: Colors.LIGHT_GRAY,
              height: Constants.width / 2,
              width: Constants.width / 2,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <View
              style={{
                backgroundColor: Colors.BLACK,
                height: Constants.width / 3,
                width: Constants.width / 3,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                borderWidth: 6,
                borderColor: Colors.GRAY,
              }}>
              <MyText
                text={`${data?.percentage_obtained}%`}
                textColor="white"
                fontSize={28}
                fontFamily={BOLD}
              />
              <MyText
                text={'Your Score'}
                textColor="white"
                fontFamily={SEMI_BOLD}
              />
            </View>
          </View>
          <MyText
            text={`The percentage required to pass the quiz is ${data?.passing_percentage}%`}
            fontFamily={MEDIUM}
            fontSize={16}
            marginVertical={15}
            textAlign="center"
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginVertical: 20,
            }}>
            <ItemBox value={data.total_question} title={'Total Questions'} />
            <ItemBox
              value={data.total_question}
              valueTxtColor={Colors.PINK}
              title={'Total Attempted Questions'}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginVertical: 20,
            }}>
            <ItemBox
              value={data.total_correct}
              valueTxtColor={Colors.GREEN}
              title={'Correct Answers'}
            />
            <ItemBox
              value={data.total_question - data.total_correct}
              valueTxtColor={Colors.RED}
              title={'Wrong Answers'}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 5,
            }}>
            <MyButton
              text={'CLOSE'}
              width="48%"
              backgroundColor={Colors.BLACK}
              onPress={() => closeModal()}
            />
            <MyButton
              text={'RETAKE QUIZ'}
              width="48%"
              onPress={() => retakeQuizPress()}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default QuizResult;

const ItemBox = ({value, valueTxtColor, title}) => {
  return (
    <View
      style={{
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        width: Constants.width / 2.5,
        height: 80,
      }}>
      <MyText
        text={value}
        fontFamily={BOLD}
        fontSize={16}
        textColor={valueTxtColor}
      />
      <MyText text={title} textAlign="center" />
    </View>
  );
};
