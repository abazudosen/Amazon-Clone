import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {DataStore} from 'aws-amplify'
import {Product} from '../../models'

import ProductItem from '../../components/ProductItem';

const HomeScreen = ({searchValue}: {searchValue: string}) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    DataStore.query(Product).then(setProducts);
  }, [])

  return (
    <View style={styles.page}>
      {/* Render Product Component */}

      <FlatList 
        data={products}
        renderItem={({item}) => <ProductItem item={item} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
})

export default HomeScreen;
