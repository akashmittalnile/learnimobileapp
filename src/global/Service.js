//import : third party
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import : BASE URL
export const baseURL = 'https://nileprojects.in/learni/api/';
//import : endpoints
export const API_Endpoints = {
  login: 'login',
  register: 'register',
  logout: 'logout',
  forgotPassword: 'forgot-password',
  otpVerification: 'otp-verfication',
  resetPassword: 'reset-password',
  change_password: 'change-password',
  profile: 'profile',
  home: 'home',
  categories: 'categories',
  subcategories: 'subcategories',
  update_profile: 'update-profile',
  course_details: 'course-details',
  courses: 'courses',
  add_wishlist: 'add-wishlist',
  wishlist: 'wishlist',
  notification: 'notifications',
  clearNotification: 'clear-notifications',
  cartList: 'cart-list',
  add_cart: 'add-cart',
  remove_cart: 'remove-cart',
  submit_rating: 'submit-rating',
  cartList: 'cart-list',
  get_tags: 'tags',
  my_rating: 'my-rating',
  mark_as_complete: 'mark-as-complete',
  edit_rating: 'edit-rating',
  upload_assignment: 'upload-assignment',
  lesson_details: 'lesson-details',
  assignment_details: 'assignment-details',
  add_card: 'add-card',
  save_order: 'save-order',
  buy_now: 'buy-now',
  card_list: 'card-list',
  cart_detail: 'cart-details',
  my_order: 'my-order?type=1',
  order_detail: 'order-details',
  my_courses: 'my-courses',
  chatImage: 'chat-image',
  certificates: 'certificates',
  unseenMessageCount: 'unseen-message-count',
  seenMessage: 'seen-message',
  chatRecord: 'chat-record'
};

//function : imp function
const objToQueryString = obj => {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(
      encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]),
    );
  }
  return keyValuePairs.length == 0 ? '' : '?' + keyValuePairs.join('&');
};
const loginHandler = async message => {
  try {
    Toast.show({
      type: 'error',
      text1: message,
    });
    await AsyncStorage.clear();
  } catch (err) {
    console.log('err for invalid token', err && err.message);
  }
};

const convertJsonToFormData = data => {
  const formData = new FormData();
  for (const key in data) {
    if (Array.isArray(data[key]) && key === 'file') {
      for (let i = 0; i < data[key].length; i++) {
        formData.append('file[]', {
          uri: data[key][i].uri,
          name: data[key][i].filename,
          type: data[key][i].type,
        });
      }
    } else if (Array.isArray(data[key]) && key === 'deleteFile') {
      for (let i = 0; i < data[key].length; i++) {
        formData.append('deletefile[]', data[key][i]);
      }
    } else {
      formData.append(key, data[key]);
    }
  }
  return formData;
};

export const PostApi = async (endPoint, data) => {
  try {
    const formData = convertJsonToFormData(data);
    console.log('formdata', formData);
    const response = await fetch(`${baseURL}${endPoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
    const resp = await response.json();
    return {data: resp};
  } catch (err) {
    console.log('err in postApi', err.message);
  }
};

export const PostApiWithToken = async (endPoint, data, token) => {
  try {
    let formData;
    if (Object.keys(data).length === 0) {
      formData = data;
    } else {
      formData = convertJsonToFormData(data);
    }
    console.log('formdata', formData);
    const response = await fetch(`${baseURL}${endPoint}`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    const resp = await response.json();
    if (response.status === 401) {
      loginHandler(resp && resp.message);
    }
    return {data: resp};
  } catch (err) {
    console.log('err in postApi', err && err.message);
  }
};

export const GetApi = async endPoint => {
  try {
    const response = await fetch(`${baseURL}${endPoint}`);
    const resp = await response.json();
    return {data: resp};
  } catch (err) {
    console.log('err in GetApi', err.message);
  }
};
//function : get function
export const getAPI = async (endPoint, token = '', paramsData = {}) => {
  const url = baseURL + endPoint + objToQueryString(paramsData);
  console.log('GET URL:', url);
  return await axios
    .get(url, {
      headers: {
        Authorization: `${
          token == null || token == '' ? '' : 'Bearer ' + token
        } `,
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
    })
    .then(res => {
      return {response: res?.data, status: res?.data?.status};
    })
    .catch(err => {
      return {response: err, status: false};
    });
};
//function : post api
export const postAPI = async (endPoint, data, token = '') => {
  const url = baseURL + endPoint;
  console.log('POST URL', url);
  console.log('POST DATA', data);
  const header = {
    headers: {
      Authorization: `${
        token == null || token == '' ? '' : 'Bearer ' + token
      } `,
      'Content-Type': data.hasOwnProperty('_parts')
        ? 'multipart/form-data'
        : 'application/json',
      Accept: '*/*',
    },
  };
  return await axios
    .post(url, data, header)
    .then(res => {
      return {response: res?.data, status: res?.data?.status};
    })
    .catch(err => {
      return {
        response: String(err?.response?.data).substring(0, 700),
        status: false,
      };
    });
};
export const GetApiWithToken = async (endPoint, token) => {
  try {
    const response = await fetch(`${baseURL}${endPoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const resp = await response.json();
    if (response.status === 401) {
      loginHandler(resp && resp.message);
    }
    return {data: resp};
  } catch (err) {
    console.log('err in GetApi', err.message);
  }
};

export const DeleteApi = async (endPoint, token) => {
  try {
    const response = await fetch(`${baseURL}${endPoint}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const resp = await response.json();
    return {data: resp};
  } catch (err) {
    console.log('err in postApi', err && err.message);
  }
};
