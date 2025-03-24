import {View, Text, FlatList} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Colors} from 'global/index';
import {dimensions} from 'global/Constants';
const CourseDetailLoader = () => {
  const itemdata = [1, 2, 3, 4];
  //variables : box styles
  const box_height = 200;
  const box_width = dimensions.SCREEN_WIDTH / 2.3;
  const box_radius = 10;
  const title_line_height = 40;
  return (
    <SkeletonPlaceholder
      speed={1000}
      backgroundColor={Colors.LIGHT_GRAY}
      highlightColor={Colors.LIGHT_GREY}>
      <View style={{padding: 20}}>
        <View
          style={{
            height: dimensions.SCREEN_HEIGHT / 4,
            borderRadius: 10,
            marginBottom: 10,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: title_line_height,
            marginVertical: 10,
          }}>
          <View
            style={{
              height: '100%',
              width: 300 / 1.5,
              borderRadius: 5,
            }}
          />
          <View style={{height: '100%', borderRadius: 5, width: 30}} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              height: box_height,
              width: box_width,
              borderRadius: box_radius,
              marginRight: 10,
            }}
          />
          <View
            style={{
              height: box_height,
              width: box_width,
              borderRadius: box_radius,
              marginRight: 10,
            }}
          />
          <View
            style={{
              height: box_height,
              width: box_width,
              borderRadius: box_radius,
              marginRight: 10,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: title_line_height,
            marginVertical: 10,
          }}>
          <View
            style={{
              height: '100%',
              width: dimensions.SCREEN_WIDTH / 1.5,
              borderRadius: 5,
            }}
          />
          <View style={{height: '100%', borderRadius: 5, width: 30}} />
        </View>
        <FlatList
          horizontal
          data={itemdata}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  height: box_height,
                  width: box_width,
                  borderRadius: box_radius,
                  marginRight: 10,
                }}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              height: box_height,
              width: box_width,
              borderRadius: box_radius,
              marginRight: 10,
            }}
          />
          <View
            style={{
              height: box_height,
              width: box_width,
              borderRadius: box_radius,
              marginRight: 10,
            }}
          />
          <View
            style={{
              height: box_height,
              width: box_width,
              borderRadius: box_radius,
              marginRight: 10,
            }}
          />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default CourseDetailLoader;
