//import : react component
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
//import : custom components
import Header from 'component/Header/Header';
//import : third party
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
//import : utils
import {Colors, MyIcon} from 'global/index';
import {BOLD, MEDIUM, SEMI_BOLD} from 'global/Fonts';
//import : styles
import {styles} from './ChatScreenStyle';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {API_Endpoints, baseURL, PostApiWithToken} from 'global/Service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from 'component/loader/Loader';
import axios from 'axios';
import DocView from 'component/DocView/DocView';
import {useDispatch} from 'react-redux';
import {setChatCount} from 'reduxTooklit/CountSlice';
//import : modals
//import : redux

const ChatScreen = ({route}) => {
  //variables
  const dispatch = useDispatch();
  const {id, name} = route.params;
  const adminId = 1;
  const docId = `${adminId.toString()}-${id?.toString()}`;
  //hook : states
  const [message, setMessage] = useState('');
  const [messagesData, setMessagesData] = useState([]);
  const [openDocsDocumentModal, setOpenDocsDocumentModal] = useState(false);
  const [loader, setLoader] = useState(false);
  //function : serv func

  const sendMessage = async (imageUrl, isPdf = false) => {
    if (message == '' && !imageUrl) {
    } else {
      try {
        const Data = {
          userId: id,
          text: message,
          imageUrl: imageUrl || '',
          isPdf,
          sendBy: id.toString(),
          sendTo: adminId.toString(),
          adminName: 'Learni',
          userName: name,
          seen: false,
          user: {
            _id: id,
          },
          _id: firestore.FieldValue.serverTimestamp(),
          createdAt: new Date(),
        };
        firestore()
          .collection('Chat')
          .doc(docId)
          .collection('Messages')
          .add({...Data, createdAt: firestore.FieldValue.serverTimestamp()})
          .then(() => {});
        setMessage('');
      } catch (error) {
        console.error('error in sendMessage', error);
      }
    }
  };
  const adminSendMessage = async () => {
    if (message == '') {
    } else {
      try {
        const Data = {
          userId: 1,
          message: message,
          createdAt: new Date(),
        };
        const docId = '12';
        firestore()
          .collection('Chat')
          .doc(docId)
          .collection('Messages')
          .add({...Data, createdAt: firestore.FieldValue.serverTimestamp()})
          .then(() => {});
        setMessage('');
      } catch (error) {
        console.error('error in sendMessage', error);
      }
    }
  };
  //function : render func

  const chatRenderFunction = ({item}) => {
    return (
      <>
        {item?.imageUrl ? (
          <View
            style={{
              alignSelf: id == item?.userId ? 'flex-end' : 'flex-start',
            }}>
            <DocView uri={item?.imageUrl} isPdf={item?.isPdf} />
            <View style={{}}>
              <Text
                style={{
                  fontFamily: SEMI_BOLD,
                  fontSize: 10,
                  marginTop: 5,
                  marginHorizontal: 5,
                  textAlign: 'right',
                }}>
                {moment(item.createdAt).format('lll')}
              </Text>
            </View>
          </View>
        ) : (
          <View
            key={item.id}
            style={{
              marginVertical: 10,
              alignItems: id == item?.userId ? 'flex-end' : 'flex-start',
            }}>
            {item?.text && (
              <View
                style={{
                  backgroundColor:
                    id == item?.userId ? Colors.GREEN : Colors.DARK_PURPLE,
                  borderRadius: 10,
                  padding: 10,
                }}>
                <Text
                  style={{
                    color: Colors.WHITE,
                    fontFamily: BOLD,
                  }}>
                  {item?.text}
                </Text>
              </View>
            )}
            <View style={{}}>
              <Text
                style={{
                  fontFamily: SEMI_BOLD,
                  fontSize: 8,
                  marginTop: 5,
                  marginHorizontal: 5,
                  textAlign: 'right',
                }}>
                {moment(item.createdAt).format('lll')}
              </Text>
            </View>
          </View>
        )}
      </>
    );
  };

  //hook : useEffect
  useEffect(() => {
    const MessageRef = firestore()
      .collection('Chat')
      .doc(docId)
      .collection('Messages')
      .orderBy('createdAt', 'desc');
    const unSubscribe = MessageRef.onSnapshot(querySnap => {
      if (querySnap != null) {
        const AllMsg = querySnap.docs.map(docSnap => {
          const data = docSnap.data();
          if (data.createdAt) {
            return {
              ...docSnap.data(),
              createdAt: docSnap.data().createdAt.toDate(),
            };
          } else {
            return {
              ...docSnap.data(),
              createdAt: new Date(),
            };
          }
        });
        setMessagesData(AllMsg);
      } else {
        setMessagesData([]);
      }
    });
    return () => {
      unSubscribe();
      getSeenMessage();
    };
  }, [id]);

  const getSeenMessage = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await PostApiWithToken(
        API_Endpoints.seenMessage,
        {},
        token,
      );
      if (response?.data?.status) {
        dispatch(setChatCount({chatCount: 0}));
      }
    } catch (err) {
      console.debug('error in getting seen message', err);
    }
  };

  const handleDocs = () => {
    setOpenDocsDocumentModal(value => !value);
  };

  const uploadDocs = async (doc, isPdf = false) => {
    if (!doc) {
      return;
    }
    setLoader(true);
    const formData = new FormData();

    formData.append('image', {
      uri: isPdf ? doc[0]?.uri : doc?.sourceURL,
      name: `file_${Date.now()}`,
      type: isPdf ? 'pdf' : doc?.mime,
    });
    try {
      const authToken = await AsyncStorage.getItem('token');
      if (!authToken) {
        return;
      }
      const response = await axios.post(
        baseURL + API_Endpoints.chatImage,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      if (response?.data?.status) {
        sendMessage(response?.data?.url, isPdf);
      }
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  const pickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      handleDocs();
      uploadDocs(image);
    } catch (error) {
      console.error('Image Picker Error:', error);
    }
  };

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      handleDocs();
      uploadDocs(res, true);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.error('User cancelled document picker');
      } else {
        console.error('Document Picker Error:', error);
      }
    }
  };
  //UI
  return (
    <>
      <View style={styles.container}>
        <Header heading={'Chat'} showLearneLogo={false} showCart={false} />
        <FlatList
          inverted
          // ref={flatListRef}
          //onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: false })}
          //onLayout={() => flatListRef.current.scrollToEnd({ animated: false })}
          style={{paddingHorizontal: 20}}
          showsVerticalScrollIndicator={false}
          data={messagesData}
          renderItem={chatRenderFunction}
          keyExtractor={(item, index) => index.toString()}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
            backgroundColor: Colors.WHITE,
            borderRadius: 10,
            margin: 5,
          }}>
          <TextInput
            value={message}
            onChangeText={text => setMessage(text)}
            placeholder="Type something here"
            style={{
              width: '75%',
            }}
          />
          <Image />
          <TouchableOpacity
            onPress={handleDocs}
            style={{
              borderRadius: 100,
              paddingRight: 5,
            }}>
            <MyIcon.MaterialIcons
              name="attach-file"
              size={28}
              color="rgba(0,0,0,0.7)"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => sendMessage()}
            style={{
              backgroundColor: Colors.GREEN,
              borderRadius: 100,
              padding: 8,
            }}>
            <MyIcon.Feather name="send" size={28} color={Colors.WHITE} />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={openDocsDocumentModal}>
        <TouchableOpacity
          onPress={handleDocs}
          activeOpacity={1}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}>
          <View
            style={{
              flexDirection: 'row',
              height: responsiveHeight(20),
              backgroundColor: 'white',
            }}>
            <TouchableOpacity
              onPress={pickImage}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '50%',
              }}>
              <MyIcon.MaterialIcons
                name="photo"
                size={50}
                color={Colors.GREEN}
              />
              <Text style={{fontSize: 18, fontFamily: MEDIUM}}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={pickDocument}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '50%',
                borderLeftWidth: responsiveWidth(0.05),
                borderColor: 'rgba(0,0,0,0.3)',
              }}>
              <MyIcon.MaterialCommunityIcons
                name="file-pdf-box"
                size={50}
                color={Colors.GREEN}
              />
              <Text style={{fontSize: 18, fontFamily: MEDIUM}}>Pdf</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      {loader && <Loader />}
    </>
  );
};

export default ChatScreen;
