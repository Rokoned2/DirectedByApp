import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import ResultsDetail from './ResultsDetail';


const ResultsList = ({ title, results, navigation }) => {
  if (!results.length) {
    return null;
  }
  const movieIds = results.map(movie => movie.id)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={results}
        keyExtractor={result => {
          // console.log("result ", result.id, result.title )
          result.id}}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>{
                  // navigation.navigate('ResultsShow', { id: item.id, movieIds: movieIds, results: results })
                  navigation.push('ResultsShow', { id: item.id, movieIds: movieIds, results: results })
                }
              }
            >
              <ResultsDetail result={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5
  },
  container: {
  }
});

export default withNavigation(ResultsList);