// gameReducers.js

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
  
  export const gameCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case GAME_CREATE_REQUEST:
        return { loading: true };
      case GAME_CREATE_SUCCESS:
        return { loading: false, game: action.payload };
      case GAME_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const gameGetAllReducer = (state = { games: [] }, action) => {
    switch (action.type) {
      case GAME_GET_ALL_REQUEST:
        return { loading: true, games: [] };
      case GAME_GET_ALL_SUCCESS:
        return { loading: false, games: action.payload };
      case GAME_GET_ALL_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const gameGetByIdReducer = (state = { game: {} }, action) => {
    switch (action.type) {
      case GAME_GET_BY_ID_REQUEST:
        return { loading: true, ...state };
      case GAME_GET_BY_ID_SUCCESS:
        return { loading: false, game: action.payload };
      case GAME_GET_BY_ID_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const gameGetByUserReducer = (state = { games: [] }, action) => {
    switch (action.type) {
      case GAME_GET_BY_USER_REQUEST:
        return { loading: true, games: [] };
      case GAME_GET_BY_USER_SUCCESS:
        return { loading: false, games: action.payload };
      case GAME_GET_BY_USER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  