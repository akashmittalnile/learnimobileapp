import {View, Text, FlatList} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Colors} from 'global/index';
import {dimensions} from 'global/Constants';
const ListLoader = () => {
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
      <View
        style={{
          height: 60,
          marginBottom: 10,
        }}
      />
      <View style={{padding: 20}}>
        <View
          style={{
            height: 100,
            marginBottom: 10,
            borderRadius: 10,
          }}
        />
        <View
          style={{
            height: 100,
            marginBottom: 10,
            borderRadius: 10,
          }}
        />
        <View
          style={{
            height: 100,
            marginBottom: 10,
            borderRadius: 10,
          }}
        />
        <View
          style={{
            height: 100,
            marginBottom: 10,
            borderRadius: 10,
          }}
        />
        <View
          style={{
            height: 100,
            marginBottom: 10,
            borderRadius: 10,
          }}
        />
        <View
          style={{
            height: 100,
            marginBottom: 10,
            borderRadius: 10,
          }}
        />
        <View
          style={{
            height: 100,
            marginBottom: 10,
            borderRadius: 10,
          }}
        />
      </View>
    </SkeletonPlaceholder>
  );
};

export default ListLoader;
