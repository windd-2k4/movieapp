import React from 'react';

import {
  render,
  fireEvent,
} from '@testing-library/react-native';

import MovieCard from '../components/MovieCard';

const movie = {
  id: '1',
  title: 'Inception',
  genre: 'Sci-Fi',
  year: 2010,
  rating: 8,
  poster: 'https://placehold.co/300x450',
  isShowing: true,
};

describe('MovieCard', () => {

  test('render movie title and rating', () => {

    const { getByText } = render(
      <MovieCard
        movie={movie}
        onSelect={jest.fn()}
      />
    );

    expect(getByText('Inception')).toBeTruthy();

    expect(getByText('⭐ 8.0')).toBeTruthy();

  });


  test('row shows genre and tile hides genre', () => {

    const { getByText, queryByText } = render(
      <MovieCard
        movie={movie}
        layout="row"
        onSelect={jest.fn()}
      />
    );

    expect(getByText('Sci-Fi')).toBeTruthy();

    const tile = render(
      <MovieCard
        movie={movie}
        layout="tile"
        onSelect={jest.fn()}
      />
    );

    expect(tile.queryByText('Sci-Fi')).toBeNull();

  });


  test('showing status', () => {

    const { getByText } = render(
      <MovieCard
        movie={movie}
        onSelect={jest.fn()}
      />
    );

    expect(getByText('✅')).toBeTruthy();

  });


  test('onSelect is called', () => {

    const onSelect = jest.fn();

    const { getByText } = render(
      <MovieCard
        movie={movie}
        onSelect={onSelect}
      />
    );

    fireEvent.press(getByText('Inception'));

    expect(onSelect).toHaveBeenCalledTimes(1);

    expect(onSelect).toHaveBeenCalledWith('1');

  });

});