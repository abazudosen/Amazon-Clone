import React, { useState, useCallback } from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

const ImageCarousel = ({images}: {images: string[]}) => {

  const [activeIndex, setActiveIndex] = useState(1);
  const windowWidth = useWindowDimensions().width;

  const onFlatListUpdated = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }, [])

  return (
    <View style={styles.root}>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <Image
            style={[styles.image, {width: windowWidth - 40}]}
            source={{uri: item}}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={windowWidth - 20}
        snapToAlignment={'end'}
        decelerationRate={'fast'}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
        onViewableItemsChanged={onFlatListUpdated}
      />

      <View style={styles.dots}>
        {images.map((image, index) => (
          <View
            style={[
              styles.dot,
              {
                backgroundColor: index === activeIndex ? '#c9c9c9' : '#ededed',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  image: {
    height: 250,
    resizeMode: 'contain',
    margin: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#c9c9c9',
    backgroundColor: '#ededed',
    margin: 5,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default ImageCarousel;
