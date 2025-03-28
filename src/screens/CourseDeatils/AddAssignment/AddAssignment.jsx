//import : react component
import React, {useState, useRef, useEffect} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
//import : custom components
import SizeBox from 'component/SizeBox/SizeBox';
import Header from 'component/Header/Header';
import MyText from 'component/MyText/MyText';
import Loader from 'component/loader/Loader';
import MyButton from 'component/MyButton/MyButton';
//import : third party
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
//import : utils
import {SEMI_BOLD} from 'global/Fonts';
import {Colors, MyIcon, ScreenNames, Service} from 'global/index';
import ExportSvg from 'assets/svgs/export.svg';
import {API_Endpoints} from 'global/Service';
//import : styles
import {styles} from './AddAssignmentStyle';
import ImagePreview from 'modals/ImagePreview/ImagePreview';
//import : modals
//import : redux

const AddAssignment = ({route, navigation}) => {
  //variables
  const {data} = route.params;
  const imagesData = useRef({});
  //hook : states
  const [files, setFiles] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [enableUploadFile, setEnableUploadFile] = useState(true);
  //hook : modal states
  const [showLoader, setShowLoader] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  //function : nav func
  const gotoViewPdf = url => {
    navigation.navigate(ScreenNames.VIEW_PDF, {url});
  };
  //function : imp func

  const previewClickHandle = item => {
    if (item.type == 'IMAGE') {
      imagesData.current = [
        {
          url: item.file,
        },
      ];
      setShowImagePreview(true);
    } else {
      gotoViewPdf(item.file);
    }
  };
  //function : serv func
  const getAssignmentInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const endPoint = `${API_Endpoints.assignment_details}/${data.step_id}`;
      const {response, status} = await Service.getAPI(endPoint, token);
      if (status) {
        setEnableUploadFile(
          response?.data?.is_completed === '2' ? true : false,
        );
        setAssignments(
          response?.data?.uploads?.length > 0 ? response?.data?.uploads : [],
        );
      }
    } catch (error) {
      console.error('error in getAssignmentInfo', error);
    }
  };
  const selectFile = async () => {
    try {
      const results = await DocumentPicker.pick({
        allowMultiSelection: true,
        type: [DocumentPicker.types.allFiles],
      });
      const isValid = results?.filter(item => item?.size > 5000000);
      if (!isValid?.length > 0) {
        setFiles(results);
      } else {
        Toast.show({
          type: 'info',
          text1: 'File size should not be greater than 5MB',
        });
      }
    } catch (error) {
      console.error('error in selectFile', error);
    }
  };
  const uploadAssignment = async () => {
    setShowLoader(true);
    try {
      const formData = new FormData();
      formData.append('chapter_step_id', data.step_id);
      if (files.length > 0) {
        files.map(item => {
          return formData.append('file[]', item);
        });
      }
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.postAPI(
        API_Endpoints.upload_assignment,
        formData,
        token,
      );
      if (status) {
        Toast.show({
          type: 'success',
          text1: response?.message,
        });
        setFiles([]);
        getAssignmentInfo();
      }
    } catch (error) {
      console.error('error in uploadAssignment', error);
    } finally {
      setShowLoader(false);
    }
  };
  //hook : useEffect
  useEffect(() => {
    getAssignmentInfo();

    return () => {};
  }, []);

  const deleteHandler = (item, _index) => {
    const result = files.filter((_, index) => index != _index);
    setFiles(result);
  };

  //UI
  return (
    <View style={styles.container}>
      <Header
        showBackButton={true}
        heading={'Add Assignment'}
        showNotification={false}
        showCart={false}
        showLearneLogo={false}
        showGridIcon={false}
      />
      <View style={styles.mainView}>
        <View
          style={{
            borderStyle: 'dotted',
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#5E4AF7',
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MyText text={'Upload your file'} fontFamily={SEMI_BOLD} />
          <MyText text={'pdf, doc, docx, jpg etc Files are allowed'} />
          <MyText text={'Size: 5 MB'} />
          <SizeBox height={10} />
          {files.length > 0 ? (
            <>
              {files.map((item, index) => {
                return (
                  <View
                    key={index.toString()}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      borderStyle: 'dotted',
                      borderRadius: 5,
                      borderWidth: 2,
                      borderColor: '#5E4AF7',
                      padding: 10,
                      marginBottom: 10,
                    }}>
                    <MyIcon.AntDesign
                      name="file1"
                      size={24}
                      color={Colors.BLACK}
                    />
                    <MyText text={item.name} style={{width: '70%'}} />
                    <TouchableOpacity
                      onPress={() => {
                        deleteHandler(item, index);
                      }}>
                      <MyIcon.AntDesign
                        name="delete"
                        size={24}
                        color={Colors.RED}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
              <MyButton text={'Upload'} onPress={() => uploadAssignment()} />
            </>
          ) : (
            <>
              {(assignments?.length === 0 ||
                (assignments?.length > 0 && enableUploadFile)) && (
                <TouchableOpacity
                  onPress={() => selectFile()}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    borderStyle: 'dotted',
                    borderRadius: 5,
                    borderWidth: 2,
                    borderColor: '#5E4AF7',
                    padding: 10,
                  }}>
                  <ExportSvg />
                  <MyText text={'Upload File'} />
                  <MyIcon.AntDesign name="arrowright" size={24} />
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
        <View>
          {assignments.length > 0 && (
            <>
              {assignments.map((item, index) => {
                return (
                  <View
                    key={index.toString()}
                    style={{
                      marginVertical: 10,
                      borderRadius: 15,
                      borderWidth: 1,
                      borderColor: '#5E4AF7',
                      padding: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    {item.type == 'IMAGE' ? (
                      <Image
                        source={{uri: item.file}}
                        style={{
                          height: 50,
                          width: 50,
                        }}
                      />
                    ) : (
                      <MyIcon.AntDesign
                        name="filetext1"
                        size={30}
                        color={Colors.BLACK}
                      />
                    )}

                    <MyText text={`Assignment ${index + 1}`} />
                    <TouchableOpacity onPress={() => previewClickHandle(item)}>
                      <MyIcon.MaterialIcons
                        name="preview"
                        size={24}
                        color={Colors.GREEN}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </>
          )}
        </View>
      </View>
      <Loader visible={showLoader} />
      <ImagePreview
        visible={showImagePreview}
        images={imagesData.current}
        setVisibility={setShowImagePreview}
      />
    </View>
  );
};

export default AddAssignment;
