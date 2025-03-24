import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Modal,
  ImageBackground,
  RefreshControl,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Background from 'assets/svgs/background.svg';
import Header from 'component/Header/Header';
import NewModal from 'react-native-modal';
import MyButton from 'component/MyButton/MyButton';
import {Colors, ScreenNames, Service} from 'global/index';
import {REGULAR} from 'global/Fonts';
import {dimensions} from 'global/Constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NoDataFound from 'component/NoDataFound/NoDataFound';
const Disclamers = ({route}) => {
  const flatListRef = useRef(null);
  const [completeModal, setcompleteModal] = useState(false);
  const [completeModalMsg, setcompleteModalMsg] = useState('');
  const [quizModal, setquizModal] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [clickedItem, setclickedItem] = useState('');
  const [courseMainData, setCourseMainData] = useState(courseData);
  const [videoIndex, setvideoIndex] = useState(null);
  const renderSessionList = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          width: (dimensions.SCREEN_WIDTH * 95) / 100,
          alignSelf: 'center',
          marginTop: 5,
          backgroundColor: videoIndex == index ? '#bfbfbf' : '#fff',
          borderRadius: 7,
          padding: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        onPress={() => {
          // if (item?.type == "pdf") {
          //   props.navigation.navigate("DisclaimersPdf", { pdfData: item?.file })

          //   return

          // }

          if (item?.type == 'video' || item?.type == 'pdf') {
            setclickedItem(item);
            setvideoIndex(index);
            setlod(!lode);
            // flatListRef?.current?.scrollToOffset({ animated: true, offset: 0 });
            flatListRef?.current?.scrollTo({});
            return;
          } else {
            setclickedItem(item);
            setvideoIndex(index);
          }
        }}>
        <View style={{flexDirection: 'row'}}>
          {/* <Image style={{ height: 25, width: 25, borderRadius: 5, top: 5, tintColor: '#000', alignSelf: 'center', padding: 7, resizeMode: 'stretch' }} 
          source={require("../../assets/book.png")}
          
          ></Image> */}
          <View style={{marginLeft: 15}}>
            <View style={{width: (dimensions.SCREEN_WIDTH * 70) / 100}}>
              <Text
                style={{
                  fontFamily: FONTFAMILY,
                  fontSize: 13,
                  color: '#000',
                  marginVertical: 5,
                }}>
                {item.title}
              </Text>
            </View>
            {/* <View style={{ flexDirection: "row" }}>
              <Image style={{ height: 15, width: 15, borderRadius: 7 }} source={require("../../assets/TImezone_clock.png")}></Image>
              <Text style={{fontFamily:FONTFAMILY, fontSize: 10, color: "#000", marginLeft: 5 }}>01:25</Text>
            </View> */}
          </View>
        </View>
        {/* {videoIndex == index ? <Image style={{ height: 20, width: 20, }} source={require("../../assets/play.png")}></Image> :
          <>
            {(item?.is_completed != 0 && item?.is_completed != null) && <Image style={{ height: 20, width: 20, }} source={require("../../assets/verify.png")}></Image>}
          </>
        } */}
        {/* <Image style={{ height: 20, width: 20, }} source={videoIndex == index ? require("../../assets/play.png") : require("../../assets/verify.png")}></Image> */}
      </TouchableOpacity>
    );
  };

  const {data, courseImage, courseData, courseID} = route.params;

  const myData = courseMainData?.lessons?.filter(
    lesson => lesson?.lesson_id == data?.lesson_id,
  )[0];

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        {/* Ensure Background is imported or defined */}
        <Background style={StyleSheet.absoluteFill} />
        <Header
          showBackButton={false}
          showNotification={true}
          showGridIcon={true}></Header>
        {/* Ensure Header is imported or defined */}
        {/* <Header
          showBackButton={false}
          showNotification={true}
          showGridIcon={true}
        /> */}

        <NewModal
          isVisible={completeModal}
          swipeDirection="down"
          // onSwipeComplete={e => {
          //   setcompleteModal(false);
          //   reloadCoursesScreens()
          // }}
          coverScreen={true}
          backdropColor="transparent"
          style={{
            flex: 1,
            justifyContent: 'center',
            margin: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              height: 'auto',
              backgroundColor: Colors.BG_COLOR,
              borderRadius: 10,
              padding: 20,
              margin: 0,
              bottom: 0,
              marginHorizontal: 20,
            }}>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.mainView}>
                <View style={{justifyContent: 'center', alignSelf: 'center'}}>
                  {/* <Image
                  source={require('../../assets/success.png')}
                  style={{
                    width: 150,
                    height: 100,
                    alignSelf: 'center',
                    borderRadius: 5,
                    resizeMode: 'stretch',
                  }} /> */}
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 8,
                    color: '#B357C3',
                    fontWeight: '500',
                    marginBottom: 8,
                  }}>
                  {'jjjjjjjj'}
                </Text>
                {/* <Text style={{fontFamily:FONTFAMILY, textAlign: 'center', marginTop: 8, color: '#000', fontWeight: '400', fontSize: 11, lineHeight: 18 }}>Thank you for purchasing course . We received your order and Successfully placed. </Text> */}

                {/* <View style={{height: 20}} /> */}
                <MyButton
                  title="OK"
                  height={45}
                  width={'100%'}
                  borderRadius={5}
                  fontWeight={'600'}
                  alignSelf="center"
                  press={() => {
                    setcompleteModal(false);
                    reloadCoursesScreens();
                    // props.navigation.navigate("MyorderStack")
                  }}
                  marginHorizontal={20}
                  titlecolor={Colors.BG_COLOR}
                  backgroundColor={Colors.DARK_PURPLE}
                  marginVertical={10}
                />
              </View>
            </KeyboardAwareScrollView>
          </View>
        </NewModal>

        <Modal
          visible={quizModal}
          onRequestClose={() => {
            setquizModal(false);
            reloadCoursesScreens();
          }}>
          <View style={{flex: 1}}>
            <SafeAreaView />
            <ScrollView>
              <ImageBackground
                style={{
                  width: dimensions.SCREEN_WIDTH,
                  height: dimensions.SCREEN_HEIGHT * 0.5,
                }}>
                <View style={{flex: 1, backgroundColor: 'transparent'}}>
                  <View
                    style={{
                      height: '80%',
                      width: '100%',
                      backgroundColor: 'transparent',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                    }}>
                    <Text
                      // adjustsFontSizeToFit={true}
                      style={{
                        fontSize: 22,
                        color: 'white',
                        fontWeight: '600',
                      }}>
                      {quizData?.is_completed == '1'
                        ? ' Congratulations! '
                        : 'Oops!'}
                    </Text>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '90%',
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: 'white',
                          textAlign: 'center',
                          textAlignVertical: 'center',
                        }}>
                        {quizData?.is_completed == '1'
                          ? 'Great! You Have Successfully Completed & Passed The Course Download Your Certificate Now!'
                          : 'You failed this quiz with a score of'}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: 150,
                        height: 150,
                        backgroundColor: 'transparent',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: 150,
                          height: 150,
                          backgroundColor: '#E67FF8',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 140,
                          position: 'absolute',
                          opacity: 0.3,
                        }}
                      />
                      <View
                        style={{
                          width: 136,
                          height: 136,
                          backgroundColor: '#E67FF8',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 136,
                          position: 'absolute',
                          opacity: 0.5,
                        }}
                      />
                      <View
                        style={{
                          width: 125.5,
                          height: 125.5,
                          backgroundColor: '#E67FF8',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 125.5,
                          position: 'absolute',
                        }}>
                        <Text
                          style={{
                            fontSize: 22,
                            color: 'white',
                          }}>
                          {quizData?.percentage_obtained}%
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            color: 'black',
                            marginTop: 8,
                          }}>
                          OVERALL
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            color: 'black',
                          }}>
                          SCORE
                        </Text>
                      </View>
                    </View>
                    {/* {quizData?.is_completed == '2' &&  */}
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'white',
                        fontWeight: '500',
                      }}>
                      {`You need ${quizData?.passing_percentage}% to pass`}
                    </Text>
                    {/* } */}
                  </View>
                </View>
              </ImageBackground>
              <View
                style={{
                  width: dimensions.SCREEN_WIDTH,
                  height: dimensions.SCREEN_HEIGHT / 2,
                  backgroundColor: 'transparent',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '90%',
                    height: 250,
                    backgroundColor: '#4556A6',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: -50,
                    borderRadius: 10,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: '50%',
                      backgroundColor: 'transparent',
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        width: '45%',
                        height: '75%',
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 22,
                          color: '#4556A6',
                        }}>
                        {quizData?.total_question}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#505667',
                        }}>
                        Total Question
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '45%',
                        height: '75%',
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        marginLeft: 7,
                      }}>
                      <Text
                        style={{
                          fontSize: 22,
                          color: '#B357C3',
                        }}>
                        {quizData?.total_question}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#505667',
                        }}>
                        Total attempt Questions
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      height: '50%',
                      backgroundColor: 'transparent',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <View
                      style={{
                        width: '45%',
                        height: '75%',
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 22,
                          color: '#B357C3',
                        }}>
                        {quizData?.total_correct}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#505667',
                        }}>
                        Correct Question
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '45%',
                        height: '75%',
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        marginLeft: 7,
                      }}>
                      <Text
                        style={{
                          fontSize: 22,
                          color: '#EB001B',
                        }}>
                        {quizData?.total_question &&
                          quizData?.total_question - quizData?.total_correct}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#505667',
                        }}>
                        Wrong Question
                      </Text>
                    </View>
                  </View>
                </View>

                {quizData?.is_completed == '2' ? (
                  <TouchableOpacity
                    onPress={() => {
                      setquizModal(false);
                      props.navigation.navigate('QuizWebViewModal', {
                        quiz_url: quizData?.quiz_url,
                      });
                    }}
                    style={{
                      width: '85%',
                      height: 80,
                      backgroundColor: '#4556A6',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 40,
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'white',
                      }}>
                      Retake Quiz
                    </Text>
                  </TouchableOpacity>
                ) : (
                  // <TouchableOpacity style={{ width: '85%', height: 80, backgroundColor: '#4556A6', justifyContent: 'center', alignItems: 'center', marginTop: 40, borderRadius: 10 }}>
                  //   <Text style={{fontFamily:FONTFAMILY,
                  //     fontSize: 15,
                  //     color: 'white'
                  //   }}>
                  //     Download Certificate
                  //   </Text>
                  // </TouchableOpacity>
                  <></>
                )}
              </View>
            </ScrollView>
          </View>
        </Modal>
        <SafeAreaView style={{flex: 1}}>
          {/* <HomeHeader2
          height={60}
          // paddingHorizontal={15}
          title={'Course Details'}
          press1={() => {
            props.navigation.goBack();
          }}
          img1={require('../../assets/arrow_right_black.png')}
          img1width={25}
          img1height={25}
          press2={() => { props.navigation.navigate('Notification') }}
          img2={require('../../assets/notification.png')}
          img2width={25}
          img2height={25}
          press3={() => { }}
          img3={require('../../assets/shoppingbag.png')}
          img3width={25}
          img3height={25}
          backgroundColor={'transparent'}
        /> */}
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => {
                  reloadCoursesScreens();
                }}
              />
            }
            ref={flatListRef}>
            <View
              style={{
                width: dimensions.SCREEN_WIDTH - 20,
                height: 220,
                // backgroundColor: 'green',
                alignSelf: 'center',
                borderRadius: 10,
                overflow: 'hidden',
              }}>
              <>
                {clickedItem?.type == 'video' && (
                  <VideoPlayer pus={pus} file={clickedItem?.file} />
                )}
              </>

              {clickedItem?.type == 'pdf' && (
                <>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={{uri: courseImage}}
                    resizeMode="contain"
                  />
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'black',
                      position: 'absolute',
                      opacity: 0.1,
                    }}
                  />

                  <TouchableOpacity
                    style={{
                      height: 30,
                      width: '18%',
                      backgroundColor: '#B357C3',
                      borderRadius: 7,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      position: 'absolute',
                      top: '48%',
                      left: '44%',
                    }}
                    onPress={() => {
                      // props.navigation.navigate('HomeViewAll');
                      props.navigation.navigate('DisclaimersPdf', {
                        pdfData: clickedItem?.file,
                      });
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#fff',
                        textAlign: 'center',
                      }}>
                      View PDF
                    </Text>
                  </TouchableOpacity>
                </>
              )}

              {clickedItem?.type == 'content' && (
                <>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={{uri: courseImage}}
                    resizeMode="contain"
                  />
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'black',
                      position: 'absolute',
                      opacity: 0.1,
                    }}
                  />

                  <TouchableOpacity
                    style={{
                      height: 30,
                      width: '22%',
                      backgroundColor: '#B357C3',
                      borderRadius: 7,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      position: 'absolute',
                      top: '48%',
                      left: '44%',
                      zIndex: 887,
                    }}
                    onPress={() => {
                      // props.navigation.navigate('HomeViewAll');
                      // props.navigation.navigate("DisclaimersPdf", { pdfData: clickedItem?.file })
                      executeContent(clickedItem);
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#fff',
                        textAlign: 'center',
                      }}>
                      View Content
                    </Text>
                  </TouchableOpacity>
                </>
              )}

              {clickedItem?.type == 'ppt' && (
                <>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={{uri: courseImage}}
                    resizeMode="contain"
                  />
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'black',
                      position: 'absolute',
                      opacity: 0.1,
                    }}
                  />

                  <TouchableOpacity
                    style={{
                      height: 30,
                      width: '18%',
                      backgroundColor: '#B357C3',
                      borderRadius: 7,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      position: 'absolute',
                      top: '48%',
                      left: '44%',
                      zIndex: 555,
                    }}
                    onPress={() => {
                      // props.navigation.navigate('HomeViewAll');
                      Linking.openURL(clickedItem?.file);
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#fff',
                        textAlign: 'center',
                      }}>
                      View PPT
                    </Text>
                  </TouchableOpacity>
                </>
              )}

              {!(
                clickedItem?.type == 'pdf' || clickedItem?.type == 'video'
              ) && (
                <>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={{uri: courseImage}}
                    resizeMode="contain"
                  />
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'black',
                      position: 'absolute',
                      opacity: 0.1,
                    }}
                  />
                </>
              )}

              {/* // <Video
    //   source={{ uri: clickedItem?.file}}
    //  style={{ width:'100%', height: 200,resizeMode:'stretch'}}
     
    //   controls={true}
    //  paused={pus}
    //  resizeMode="stretch"
    //   />  */}
            </View>

            <View style={{width: '100%', padding: 10}}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#fff',
                  paddingVertical: 5,
                  lineHeight: 19,
                  fontWeight: '600',
                }}>
                About: {myData?.lesson_name}
              </Text>

              {myData?.chapter_steps?.length > 0 && (
                <View style={{flexDirection: 'row', marginTop: 5}}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#fff',
                      lineHeight: 19,
                      fontWeight: '700',
                    }}>
                    {videoIndex + 1}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#B357C3',
                      lineHeight: 19,
                      fontWeight: '700',
                    }}>
                    /{myData?.chapter_steps?.length}
                  </Text>
                </View>
              )}

              <View
                style={{
                  width: '100%',
                  height: 40,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                {/* <TouchableOpacity style={{ height: 35, justifyContent: 'center', backgroundColor: '#fff', borderRadius: 5, width: '32%' }}>
                <Text style={{fontFamily:FONTFAMILY, textAlign: 'center', color: '#4556A6', fontSize: 12, fontWeight: '600' }}>Course List</Text>
              </TouchableOpacity> */}

                <TouchableOpacity
                  disabled={!(videoIndex + 1 < myData?.chapter_steps?.length)}
                  style={{
                    height: 35,
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    width: '32%',
                    opacity:
                      videoIndex + 1 < myData?.chapter_steps?.length ? 1 : 0.5,
                  }}
                  onPress={() => {
                    if (videoIndex + 1 < myData?.chapter_steps?.length) {
                      setclickedItem(myData?.chapter_steps[videoIndex + 1]);
                      setvideoIndex(videoIndex + 1);
                    }
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#4556A6',
                      fontSize: 12,
                      fontWeight: '600',
                    }}>
                    Continue
                  </Text>
                </TouchableOpacity>

                {courseMainData?.purchased && (
                  <TouchableOpacity
                    onPress={() => {
                      // return
                      markAsComplete();
                    }}
                    disabled={
                      clickedItem?.type == 'survey' ||
                      clickedItem?.type == 'assignment' ||
                      clickedItem?.type == 'quiz' ||
                      myData?.chapter_steps?.length == 0
                    }
                    style={{
                      height: 35,
                      justifyContent: 'center',
                      backgroundColor: '#fff',
                      borderRadius: 5,
                      width: '32%',
                      opacity:
                        clickedItem?.type == 'survey' ||
                        clickedItem?.type == 'assignment' ||
                        clickedItem?.type == 'quiz' ||
                        myData?.chapter_steps?.length == 0
                          ? 0.5
                          : 1,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#4556A6',
                        fontSize: 12,
                        fontWeight: '600',
                      }}>
                      {markIsCompletedUpdatedIndexData?.is_completed == 1
                        ? 'Mark Incomplete'
                        : 'Mark Complete'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={{marginTop: 10}}>
                <FlatList
                  scrollEnabled={false}
                  // ref={flatListRef}
                  data={myData?.chapter_steps}
                  showsHorizontalScrollIndicator={false}
                  renderItem={renderSessionList}
                  keyExtractor={item => item?.step_id}
                  ListEmptyComponent={
                    <View style={{marginTop: '25%'}}>
                      <NoDataFound />
                    </View>
                  }
                />
              </View>
            </View>

            {myData?.recommended_product.length != 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: (dimensions.SCREEN_WIDTH * 95) / 100,
                  // alignSelf: 'center',
                  marginTop: 20,
                  marginLeft: 10,
                  // backgroundColor: 'white'
                }}>
                <Text style={{fontSize: 18, color: 'white'}}>
                  Recommended Product
                </Text>

                {/* <TouchableOpacity
              style={{
                height: 30,
                width: '18%',
                backgroundColor: '#B357C3',
                borderRadius: 7,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              onPress={() => {
                // props.navigation.navigate('HomeViewAll');
              }}>
              <Text style={{fontFamily:FONTFAMILY, fontSize: 13, color: '#fff', textAlign: 'center' }}>
                View All
              </Text>
            </TouchableOpacity> */}
              </View>
            )}
            <View
              style={{
                marginTop: 20,
                width: '100%',
                marginBottom: 10,
                // backgroundColor: 'red'
              }}>
              <FlatList
                data={myData?.recommended_product}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <RenderRecommendedProduct
                    key={index}
                    item={item}
                    index={index}
                    handleWishlist={async () => {
                      await handleWishlist(item?.product_id, 2);
                      // await getCourseDetail()
                    }}
                    startLoader={() => setLoading(true)}
                    stopLoader={() => setLoading(false)}
                    onAddRemoveSuccess={async () => {
                      // setLoading(true)
                      // setLoading(true)
                      await getCourseDetail();
                      // await handleWishlist(item?.product_id, 2)

                      // setLoading(false)
                    }}
                  />
                )}
                keyExtractor={item => item.id}
              />
            </View>

            <View style={{marginTop: 50}} />
          </ScrollView>

          {/* {My_Alert ? (
          <MyAlert
            sms={alert_sms}
            okPress={() => {
              setMy_Alert(false);
            }}
          />
        ) : null} */}
          {loading ? <Loader /> : null}
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ProfileBG,
  },
  textStyle: {
    fontSize: 13,
    alignSelf: 'center',
    // color: Mycolors.ORANGE,
  },

  signupinput: {
    height: 50,
    width: '100%',
    fontSize: 12,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 10,
    color: Colors.TEXT_COLOR,
    paddingLeft: 20,
    paddingRight: 10,
    backgroundColor: Colors.LogininputBox,
  },
});
export default Disclamers;
