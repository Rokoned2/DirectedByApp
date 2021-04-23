import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import tmdb from '../api/tmdb';
import ResultsList from '../components/ResultsList';

const ResultsShowScreen = ({ navigation, route }) => {
  const [result, setResult] = useState(null);
  const id = route.params.id ; 
  const movieIds = route.params.movieIds; 
  const results = route.params.results; 
  console.log("results ", results )

  const getResult = async id => {
    const response = await tmdb.get(`movie/${id}`, {
      params: {
        api_key: "d123ec1dfc61dd7ae05d4b0d2fc4d345",
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

  const resultListTitle = `Otras del mismo año (${result.release_date.slice(0, 4)})`


  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>
       {result.title}
      </Text>
      <View style={styles.row}>
        <Image 
          style={styles.image} 
          source={{ uri:`https://image.tmdb.org/t/p/w500/${result.poster_path}`}} 
        />
        <View style={styles.rightCol}>
          <Text style={styles.sinopsisTitle}>SINOPSIS</Text>
          <Text>{result.overview}</Text>
        </View>
      </View>

      <View>
        <ResultsList 
          results={results}
          title={resultListTitle}
        />        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 250
  },
  row: {
    flexDirection: "row",
    flex: 0,
    paddingHorizontal: 10 
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5,
    textAlign: "center"
 },
 sinopsisTitle: {
    fontWeight: 'bold',
 },
 rightCol: {
  paddingLeft: 5,
  flex: 1
 }
});

export default ResultsShowScreen;
