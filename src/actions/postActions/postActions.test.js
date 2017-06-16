import {
  createPost,
  deletePost,
  editPost,
  fetchPosts,
  fetchTopPosts,
  lovePost,
  unlovePost,
  receiveWebSocketLoveUpdate,
  receiveWebSocketPostDelete,
  receiveWebSocketPostUpdate,
} from './postActions';
import {
  RECEIVED_LOVE_UPDATE_VIA_WEBSOCKET,
  RECEIVED_POST_DELETE_VIA_WEBSOCKET,
  RECEIVED_POST_UPDATE_VIA_WEBSOCKET,
} from '../actionTypes';

import posts from '../../fixtures/posts.json';

jest.mock('../../middlewares/api', () => ({
  CALL_API: 'CALL_API',
}));


describe('posts actions test suite when authenticated', () => {
  test('fetchPosts calls CALL_API with the right props', () => {
    const result = fetchPosts();
    expect(result.CALL_API).toBeDefined();
    expect(result.CALL_API.authenticated).toBe(true);
    expect(result.CALL_API.endpoint).toBeDefined();
    expect(result.CALL_API.httpMethod).toBe('get');
    expect(result.CALL_API.types).toHaveLength(3);
  });

  test('fetchPosts includes queryParams supplied in the endpoint', () => {
    const queryParams = '?page_size=7&next=2';
    const result = fetchPosts(queryParams);
    expect(result.CALL_API.endpoint).toContain(queryParams);
  });

  test('fetchTopPosts calls CALL_API with right props',
  () => {
    const result = fetchTopPosts();
    expect(result.CALL_API).toBeDefined();
    expect(result.CALL_API.authenticated).toBe(true);
    expect(result.CALL_API.endpoint).toBeDefined();
    expect(result.CALL_API.httpMethod).toBe('get');
    expect(result.CALL_API.types).toHaveLength(3);
  });

  test('fetchTopPosts includes queryParams supplied in the endpoint', () => {
    const queryParams = '?page_size=7&next=2';
    const result = fetchTopPosts(queryParams);
    expect(result.CALL_API.endpoint).toContain(queryParams);
  });

  test('createPost calls CALL_API with right props', () => {
    const content = 'This is a real note';
    const result = createPost(content);
    expect(result.CALL_API).toBeDefined();
    expect(result.CALL_API.authenticated).toBe(true);
    expect(result.CALL_API.endpoint).toBeDefined();
    expect(result.CALL_API.httpMethod).toBe('post');
    expect(result.CALL_API.types).toHaveLength(3);
    expect(result.CALL_API.data).toEqual({ content });
  });

  test('editPost calls CALL_API with right props', () => {
    const id = 1;
    const content = 'This is a real note';
    const result = editPost(id, content);
    expect(result.CALL_API).toBeDefined();
    expect(result.CALL_API.authenticated).toBe(true);
    expect(result.CALL_API.endpoint).toContain(id);
    expect(result.CALL_API.httpMethod).toBe('put');
    expect(result.CALL_API.types).toHaveLength(3);
    expect(result.CALL_API.data).toEqual({ content });
  });

  test('deletePost calls CALL_API with right props', () => {
    const id = 1;
    const result = deletePost(id);
    expect(result.CALL_API).toBeDefined();
    expect(result.CALL_API.authenticated).toBe(true);
    expect(result.CALL_API.endpoint).toContain(id);
    expect(result.CALL_API.httpMethod).toBe('delete');
    expect(result.CALL_API.types).toHaveLength(3);
  });

  test('lovePost calls CALL_API with right props', () => {
    const postId = 1;
    const result = lovePost(postId);
    expect(result.CALL_API).toBeDefined();
    expect(result.CALL_API.authenticated).toBe(true);
    expect(result.CALL_API.endpoint).toContain(postId);
    expect(result.CALL_API.httpMethod).toBe('post');
    expect(result.CALL_API.types).toHaveLength(3);
    expect(result.CALL_API.data).toEqual({});
  });

  test('unlovePost calls CALL_API with right props', () => {
    const postId = 1;
    const result = unlovePost(postId);
    expect(result.CALL_API).toBeDefined();
    expect(result.CALL_API.authenticated).toBe(true);
    expect(result.CALL_API.endpoint).toContain(postId);
    expect(result.CALL_API.httpMethod).toBe('delete');
    expect(result.CALL_API.types).toHaveLength(3);
    expect(result.CALL_API.data).toEqual({});
  });
});


describe('posts actions test suite when not authenticated', () => {
  let originalLocalStorage;

  beforeEach(() => {
    originalLocalStorage = global.localStorage;
    global.localStorage = {
      getItem: () => null,
    };
  });

  afterEach(() => {
    global.localStorage = originalLocalStorage;
  });

  test('fetchTopPosts calls CALL_API with right props',
  () => {
    const result = fetchPosts();
    expect(result.CALL_API).toBeDefined();
    expect(result.CALL_API.authenticated).toBe(false);
    expect(result.CALL_API.endpoint).toBeDefined();
    expect(result.CALL_API.httpMethod).toBe('get');
    expect(result.CALL_API.types).toHaveLength(3);
  });

  test('fetchTopPosts calls CALL_API with right props',
  () => {
    const result = fetchTopPosts();
    expect(result.CALL_API).toBeDefined();
    expect(result.CALL_API.authenticated).toBe(false);
    expect(result.CALL_API.endpoint).toBeDefined();
    expect(result.CALL_API.httpMethod).toBe('get');
    expect(result.CALL_API.types).toHaveLength(3);
  });
});

describe('recieveWebSocket actions', () => {
  it('creates RECEIVED_LOVE_UPDATE_VIA_WEBSOCKET', () => {
    const data = { post_id: 1, num_loves: 2 };
    expect(receiveWebSocketLoveUpdate(data)).toEqual({
      type: RECEIVED_LOVE_UPDATE_VIA_WEBSOCKET,
      payload: data,
    });
  });

  it('creates RECEIVED_POST_DELETE_VIA_WEBSOCKET', () => {
    expect(receiveWebSocketPostDelete(posts[2].id)).toEqual({
      type: RECEIVED_POST_DELETE_VIA_WEBSOCKET,
      payload: posts[2].id,
    });
  });

  it('creates RECEIVED_POST_UPDATE_VIA_WEBSOCKET', () => {
    expect(receiveWebSocketPostUpdate(posts[2])).toEqual({
      type: RECEIVED_POST_UPDATE_VIA_WEBSOCKET,
      payload: posts[2],
    });
  });
});
