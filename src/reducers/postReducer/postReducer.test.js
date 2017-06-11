import {
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  EDIT_POST_FAILURE,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_TOP_POSTS_REQUEST,
  FETCH_TOP_POSTS_SUCCESS,
  LOVE_POST_FAILURE,
  LOVE_POST_REQUEST,
  LOVE_POST_SUCCESS,
  UNLOVE_POST_FAILURE,
  UNLOVE_POST_REQUEST,
  UNLOVE_POST_SUCCESS,
} from '../../actions/actionTypes';
import posts from '../../fixtures/posts.json';
import topPosts from '../../fixtures/topPosts.json';

import postReducer from './postReducer';


describe('User Reducer test suite', () => {
  let errors;
  let state;

  beforeEach(() => {
    errors = ['There are many errors'];
    state = {
      errors: [],
      posts: [],
      topPosts: [],
      next: null,
      previous: null,
      pending: false,
      fetched: true,
    };
  });

  it('should return the initial state', () => {
    const expectedState = { ...state };
    expect(postReducer(undefined, {})).toEqual(expectedState);
  });

  it('should handle FETCH_POSTS_REQUEST', () => {
    const expectedState = { ...state, pending: true, fetched: false };
    const action = { type: FETCH_POSTS_REQUEST };
    expect(postReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle FETCH_POSTS_SUCCESS when first page', () => {
    const payload = { next: 'next', previous: null, results: posts };
    const expectedState = {
      ...state,
      fetched: true,
      pending: false,
      posts,
      next: 'next',
    };
    const action = { type: FETCH_POSTS_SUCCESS, payload };
    expect(postReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle FETCH_POSTS_SUCCESS when not first page', () => {
    state = { ...state, posts: posts.slice(0, 2) };
    const payload = { next: null, previous: 'previous', results: posts.slice(2, 3) };
    const expectedState = {
      ...state,
      fetched: true,
      pending: false,
      posts,
      next: null,
    };
    const action = { type: FETCH_POSTS_SUCCESS, payload };
    expect(postReducer(state, action)).toEqual(expectedState);
  });

  it('should handle FETCH_POSTS_FAILURE', () => {
    const expectedState = { ...state, pending: false, errors };
    const action = { type: FETCH_POSTS_FAILURE, payload: errors };
    expect(postReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle FETCH_TOP_POSTS_REQUEST', () => {
    state = { ...state, fetched: true };
    const expectedState = { ...state, pending: true, fetched: false };
    const action = { type: FETCH_TOP_POSTS_REQUEST };
    expect(postReducer(state, action)).toEqual(expectedState);
  });

  it('should handle FETCH_TOP_POSTS_SUCCESS', () => {
    const payload = { results: topPosts };
    const expectedState = {
      ...state,
      fetched: true,
      pending: false,
      topPosts,
    };
    const action = { type: FETCH_TOP_POSTS_SUCCESS, payload };
    expect(postReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle FETCH_TOP_POSTS_FAILURE', () => {
    const expectedState = { ...state, pending: false, errors };
    const action = { type: FETCH_POSTS_FAILURE, payload: errors };
    expect(postReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CREATE_POST_REQUEST', () => {
    const expectedState = { ...state, pending: true, fetched: false };
    const action = { type: CREATE_POST_REQUEST };
    expect(postReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CREATE_POST_SUCCESS', () => {
    state = { ...state, posts };
    const newPost = {
      id: 11,
      date_created: '2017-05-10T01:30:07.751578Z',
      content: 'Bailando',
      author: {
        username: 'cello_man',
        first_name: 'Enrique',
        last_name: 'Iglesias',
        about: 'musician',
        profile_pic: 'http://my-dp.png',
        num_posts: 0,
      },
    };
    const action = { type: CREATE_POST_SUCCESS, payload: newPost };

    newPost.num_loves = 0;
    newPost.in_love = false;
    const expectedState = {
      ...state,
      pending: false,
      fetched: true,
      posts: [newPost, ...posts],  // order matters here
    };
    expect(postReducer(state, action)).toEqual(expectedState);
  });

  it('should handle CREATE_POST_FAILURE', () => {
    const expectedState = { ...state, pending: false, errors };
    const action = { type: CREATE_POST_FAILURE, payload: errors };
    expect(postReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle EDIT_POST_REQUEST', () => {
    const expectedState = { ...state, pending: true, fetched: false };
    const action = { type: EDIT_POST_REQUEST };
    expect(postReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle EDIT_POST_SUCCESS', () => {
    state = { ...state, posts };
    const action = { type: EDIT_POST_SUCCESS, payload: posts[2] };

    const expectedState = {
      ...state,
      pending: false,
      fetched: true,
      posts: [posts[2], ...posts.slice(0, 2)],  // order matters here
    };
    expect(postReducer(state, action)).toEqual(expectedState);
  });

  it('should handle EDIT_POST_FAILURE', () => {
    const expectedState = { ...state, pending: false, errors };
    const action = { type: EDIT_POST_FAILURE, payload: errors };
    expect(postReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle DELETE_POST_REQUEST', () => {
    const expectedState = { ...state, pending: true, fetched: false };
    const action = { type: DELETE_POST_REQUEST };
    expect(postReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle DELETE_POST_SUCCESS', () => {
    state = { ...state, posts };
    const action = {
      type: DELETE_POST_SUCCESS,
      payload: 'core/posts/10/',
    };

    const expectedState = {
      ...state,
      pending: false,
      fetched: true,
      posts: posts.slice(0, 2),  // order matters here
    };
    expect(postReducer(state, action)).toEqual(expectedState);
  });

  it('should handle DELETE_POST_FAILURE', () => {
    const expectedState = { ...state, pending: false, errors };
    const action = { type: DELETE_POST_FAILURE, payload: errors };
    expect(postReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle LOVE_POST_REQUEST', () => {
    const expectedState = { ...state, pending: true, fetched: false };
    const action = { type: LOVE_POST_REQUEST };
    expect(postReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle LOVE_POST_SUCCESS', () => {
    state = { ...state, posts };
    const payload = {
      post_id: 10,
      in_love: true,
      num_loves: 2,
    };
    const action = { type: LOVE_POST_SUCCESS, payload };
    const lovedPost = {
      ...posts[2],
      in_love: true,
      num_loves: 2,
    };
    const expectedState = {
      ...state,
      pending: false,
      fetched: true,
      posts: [...posts.slice(0, 2), lovedPost],  // order matters here
    };
    expect(postReducer(state, action)).toEqual(expectedState);
  });

  it('should handle LOVE_POST_FAILURE', () => {
    const expectedState = { ...state, pending: false, errors };
    const action = { type: LOVE_POST_FAILURE, payload: errors };
    expect(postReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle UNLOVE_POST_REQUEST', () => {
    const expectedState = { ...state, pending: true, fetched: false };
    const action = { type: UNLOVE_POST_REQUEST };
    expect(postReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle UNLOVE_POST_SUCCESS', () => {
    state = { ...state, posts };
    const payload = {
      post_id: 10,
      in_love: false,
      num_loves: 0,
    };
    const action = { type: UNLOVE_POST_SUCCESS, payload };
    const unlovedPost = {
      ...posts[2],
      in_love: false,
      num_loves: 0,
    };

    const expectedState = {
      ...state,
      pending: false,
      fetched: true,
      posts: [...posts.slice(0, 2), unlovedPost],  // order matters here
    };
    expect(postReducer(state, action)).toEqual(expectedState);
  });

  it('should handle UNLOVE_POST_FAILURE', () => {
    const expectedState = { ...state, pending: false, errors };
    const action = { type: UNLOVE_POST_FAILURE, payload: errors };
    expect(postReducer(undefined, action)).toEqual(expectedState);
  });
});
