import { delay } from 'dva-react2/saga';

export default {

  namespace: 'example',

  state: {

    count: 1,

  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({ type: 'watch' });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },

    *watch(_, { call, put }) {
      while (true) {
        yield call(delay, 1000);
        yield put({ type: 'plus' });
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },

    plus(state) {
      return { ...state, count: state.count + 1 };
    },
  },

};
