// gameActions.js

import axios from 'axios';
import {
  GAME_CREATE_REQUEST,
  GAME_CREATE_SUCCESS,
  GAME_CREATE_FAIL,
  GAME_GET_ALL_REQUEST,
  GAME_GET_ALL_SUCCESS,
  GAME_GET_ALL_FAIL,
  GAME_GET_BY_ID_REQUEST,
  GAME_GET_BY_ID_SUCCESS,
  GAME_GET_BY_ID_FAIL,
  GAME_GET_BY_USER_REQUEST,
  GAME_GET_BY_USER_SUCCESS,
  GAME_GET_BY_USER_FAIL,
} from '../constants/gameConstants';

// Action to create a new game
export const createGame = (userId, score) => async (dispatch) => {
  try {
    dispatch({ type: GAME_CREATE_REQUEST });

    const { data } = await axios.post('https://hangmanapi.onrender.com/api/games', { userId, score });

    dispatch({ type: GAME_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GAME_CREATE_FAIL,
      payload: error.response.data.error || 'Failed to create game',
    });
  }
};

// Action to get all games
export const getGames = () => async (dispatch) => {
  try {
    dispatch({ type: GAME_GET_ALL_REQUEST });

    const { data } = await axios.get('https://hangmanapi.onrender.com/api/games');

    dispatch({ type: GAME_GET_ALL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GAME_GET_ALL_FAIL,
      payload: error.response.data.error || 'Failed to fetch games',
    });
  }
};

// Action to get a game by its ID
export const getGameById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GAME_GET_BY_ID_REQUEST });

    const { data } = await axios.get(`https://hangmanapi.onrender.com/api/games/${id}`);

    dispatch({ type: GAME_GET_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GAME_GET_BY_ID_FAIL,
      payload: error.response.data.error || 'Failed to fetch game',
    });
  }
};

// Action to get games by user ID
export const getGamesByUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GAME_GET_BY_USER_REQUEST });

    const { data } = await axios.get(`https://hangmanapi.onrender.com/api/games/user/${userId}`);

    dispatch({ type: GAME_GET_BY_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GAME_GET_BY_USER_FAIL,
      payload: error.response.data.error || 'Failed to fetch games by user',
    });
  }
};
