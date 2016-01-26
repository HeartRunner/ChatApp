// 这里存放列表
const { Map } = require('immutable');
const LOAD = 'detail/load';
const LOAD_SUCCESS = 'detail/load_success';
const LOAD_FAIL = 'detail/load_fail';
// import cheerio from 'cheerio';


const INITIAL_STATE = new Map({
  loading: false,
  loaded: false,
  error: null,
});

function handleLoadSuccess(state, action) {
  const reg = /http:.*?\.m3u8+/;
  const test = reg.exec(action.result._bodyText);
  const url = test ? test[0] : null;
  return state.set('loaded', true)
    .set('loading', false)
    .set('error', null)
    .set(action.key, url);
}

export default function detail(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case LOAD:
      return state.set('loading', true).set('loaded', false).set('error', null);
    case LOAD_FAIL:
      return state.set('loading', false).set('loaded', false).set('error', action.error);
    case LOAD_SUCCESS:
      return handleLoadSuccess(state, action);
    default:
      return state;
  }
}

export function load(href) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get('https://chaturbate.com' + href, {
    }),
    key: href
  };
}
