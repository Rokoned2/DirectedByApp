import React, { useState, useEffect } from 'react';
import {TouchableOpacity, Pressable, View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import tmdb from '../api/tmdb';
import ResultsList from '../components/ResultsList';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';


const ResultsShowScreen = ({ navigation, route }) => {
  const [result, setResult] = useState(null);
  const id = route.params.id ; 
  const results = route.params.results; 

  const getResult = async id => {
    const response = await tmdb.get(`movie/${id}`, {
      params: {
        api_key: "d123ec1dfc61dd7ae05d4b0d2fc4d345",
        language: 'es-ES'
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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
{/*      <Pressable
        onPress={() => {
          navigation.navigate("Search")
        }}
        style={{
           marginTop: 10,
           marginLeft: 10,
           backgroundColor: "blue",
           flex: 1,
        }}
      > 
        <Ionicons name="arrow-back-outline" size={32} color="black"  
        style={{
           flex: 1,
           backgroundColor: "red",
           alignSelf: "flex-start",
        }}
        />
      </Pressable>
*/}      
      <Text style={styles.title}>
       {result.title}
      </Text>
      <View style={styles.row}>
      {result.poster_path ? (
        <Image 
          style={styles.image} 
          source={{ uri:`https://image.tmdb.org/t/p/w500/${result.poster_path}`}} 
        />) : (
          <View style={styles.imagePlaceholder}>
           <Text style={styles.mockText}>IMAGEN</Text>
           <Text style={styles.mockText}>NO DISPONIBLE</Text>
          </View>
        )
        }
        <View style={styles.rightCol}>
          <Text style={styles.sinopsisTitle}>SINOPSIS</Text>
          <Text>{result.overview}</Text>
        </View>
      </View>
        <ResultsList 
          results={results.filter((result) => id !== result.id)}
          title={resultListTitle}
        />        
      </ScrollView>
    </SafeAreaView> 
  );
};

const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 250
  },
  imagePlaceholder: {
    width: 160,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray"
  },
  row: {
    flexDirection: "row",
    flex: 0,
    marginVertical: 30,
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
   },
   mockText: {
    color: "black",
    fontWeight: "bold"
   }
});

export default ResultsShowScreen;
