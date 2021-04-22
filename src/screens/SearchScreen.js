import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

const SearchScreen = () => {
  const [term, setTerm] = useState('');
  const [searchApi, results, errorMessage] = useResults();


console.log("results", results)
  const filterResultsByYear = year => {
    return results.filter(result => {
      // console.log("result ",result.release_date.includes(`${year}`))
      if(result.release_date.includes(`${year}`)){
       return result;
      }
    });
  };

  return (
    <>
      <Text style={styles.title}>Directed by</Text>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <ScrollView>
        <ResultsList
          results={filterResultsByYear('2020')}
          title="2020"
        />
        <ResultsList results={filterResultsByYear('2019')} title="Bit Pricier" />
        <ResultsList
          results={filterResultsByYear('2010')}
          title="2010"
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5,
    textAlign: "center"
  },
});

export default SearchScreen;
