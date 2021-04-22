import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import yelp from '../api/tmdb';

const ResultsShowScreen = ({ navigation, route }) => {
  const [result, setResult] = useState(null);
  // const id = navigation.getParam('id');
  const id = route.params.id

  const getResult = async id => {
    const response = await tmdb.get(`search/person/${id}/movie_credits`, {
      params: {
        api_key: d123ec1dfc61dd7ae05d4b0d2fc4d345,
        language: 'es-MX'
      },
    });
    setResult(response.data);
  };
  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }

  return (
    <View>
      <Text>{result.name}</Text>
      <FlatList
        data={result.photos}
        keyExtractor={photo => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 300
  }
});

export default ResultsShowScreen;
