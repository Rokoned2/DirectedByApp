import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const ResultsDetail = ({ result }) => {
  return (
    <>  
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri:`https://image.tmdb.org/t/p/w500/${result.poster_path}`}} />
      <Text style={styles.name}>{result.title}</Text>
      <Text>
        {result.vote_average} Stars, {result.review_count} Reviews
      </Text>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
  },
  image: {
    width: 200,
    height: 250,
    borderRadius: 4,
    marginBottom: 5
  },
  name: {
    fontWeight: 'bold'
  }
});

export default ResultsDetail;
