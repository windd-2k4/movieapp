import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Switch,
  Alert,
  RefreshControl,
} from 'react-native';

import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import MovieCard, {
  Movie,
} from './components/MovieCard';

const API_URL = 'https://68e6909021dd31f22cc62e29.mockapi.io/movies';

function App() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isTile, setIsTile] = useState(false);

  const numColumns = isTile ? 2 : 1;

  const fetchMovies = async () => {

    try {

      const response = await fetch(API_URL);

      const data = await response.json();

      setMovies(data);

    } catch (error) {

      Alert.alert('Error', 'Cannot load movies');

    } finally {

      setLoading(false);
      setRefreshing(false);

    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const onRefresh = () => {

    setRefreshing(true);

    fetchMovies();

  };

  const handleSelect = (id: string) => {

    const movie = movies.find(item => item.id === id);

    if (movie) {
      Alert.alert(movie.title);
    }

  };

  if (loading) {

    return (
      <SafeAreaProvider>

        <SafeAreaView style={styles.loading}>

          <ActivityIndicator size="large" />

          <Text>Loading...</Text>

        </SafeAreaView>

      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>

      <SafeAreaView style={styles.container}>

        {/* Header */}

        <View style={styles.header}>

          <Text style={styles.headerTitle}>
            Movie App
          </Text>

          <View style={styles.switchContainer}>

            <Text>Dạng lưới</Text>

            <Switch
              value={isTile}
              onValueChange={setIsTile}
            />

          </View>

        </View>

        {/* Movie List */}

        <FlatList
          key={String(numColumns)}
          data={movies}
          numColumns={numColumns}
          keyExtractor={(item) => item.id}

          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              layout={isTile ? 'tile' : 'row'}
              onSelect={handleSelect}
            />
          )}

          columnWrapperStyle={
            isTile
              ? styles.columnWrapper
              : undefined
          }

          contentContainerStyle={styles.list}

          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />

      </SafeAreaView>

    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#eee',
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  list: {
    padding: 10,
  },

  columnWrapper: {
    justifyContent: 'space-between',
  },

});