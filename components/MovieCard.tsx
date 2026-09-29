import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export type Movie = {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
};

type MovieCardProps = {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
};

const MovieCard = ({
  movie,
  layout = 'row',
  onSelect,
}: MovieCardProps) => {

  const isTile = layout === 'tile';

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isTile && styles.cardTile,
      ]}
      onPress={() => onSelect(movie.id)}
    >

      <View style={isTile ? styles.posterTileContainer : undefined}>
        <Image
          source={{ uri: movie.poster }}
          style={[
            styles.poster,
            isTile && styles.posterTile,
          ]}
        />

        {isTile && (
          <Text style={styles.ratingTile}>
            ⭐ {movie.rating.toFixed(1)}
          </Text>
        )}
      </View>

      <View style={styles.info}>

        <Text
          style={styles.title}
          numberOfLines={isTile ? 1 : 2}
        >
          {movie.title}
        </Text>

        {!isTile && (
          <>
            <Text style={styles.text}>
              {movie.genre}
            </Text>

            <Text style={styles.text}>
              {movie.year}
            </Text>
          </>
        )}

        {!isTile && (
          <Text style={styles.rating}>
            ⭐ {movie.rating.toFixed(1)}
          </Text>
        )}

        <Text style={styles.status}>
          {movie.isShowing ? '✅' : '❌'}
        </Text>

      </View>
    </TouchableOpacity>
  );
};

export default React.memo(MovieCard);

const styles = StyleSheet.create({

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    width: '100%',
  },

  cardTile: {
    flexDirection: 'column',
    width: '48%',
    padding: 0,
    overflow: 'hidden',
  },

  poster: {
    width: 70,
    height: 100,
    borderRadius: 6,
  },

  posterTileContainer: {
    width: '100%',
    position: 'relative',
  },

  posterTile: {
    width: '100%',
    height: undefined,
    aspectRatio: 2 / 3,
    borderRadius: 0,
  },

  ratingTile: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 5,
  },

  info: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 5,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  text: {
    color: '#555',
    marginBottom: 3,
  },

  rating: {
    fontWeight: 'bold',
    marginTop: 5,
  },

  status: {
    marginTop: 5,
  },
});