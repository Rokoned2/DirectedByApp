import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

const SearchScreen = () => {
  const [term, setTerm] = useState('');
  const [searchApi, results, errorMessage] = useResults();


  const filterResultsByYear = year => {
    return results.filter(result => {
      if(result.release_date.includes(`${year}`)){
       return result;
      }
    });
  };

  const yearSection = () => { 
    const sortedYears = yearsOrder() 
    return sortedYears.map((year) => {
      return(
          <ResultsList
            results={filterResultsByYear(year)}
            title={`${year}`}
          />
        )
      } 
    ) 
  }

  const yearsOrder = () => {
    let years = []

    results.map(result => {
      const stringYear = result.release_date.slice(0, 4);
      const year = parseInt(stringYear);
      years.push(year)
    })

    let sortedYears = [...new Set(years.sort((a,b) => {
      if(a > b) return -1;
      if(a < b) return 1;
      return 0;
    }))];

    return sortedYears;  
  }  

  return (
    <>
      <StatusBar style="dark" />
      <Text style={styles.title}>Directed by</Text>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <ScrollView>
      {yearSection()}
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
