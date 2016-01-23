// 这里存放列表
const  {Record, List} = require('immutable');
const LOAD = 'list/load';
const LOAD_SUCCESS = 'list/load_success';
const LOAD_FAIL = 'list/load_fail';
import cheerio from 'cheerio';

const itemRecord = Record({
  href: '',
  text: '',
});

const INITIAL_STATE = new Record({
  loading: false,
  loaded: false,
  error: null,
  list: new List(),
})();

function handleLoadSuccess(state, action) {
  const $ = cheerio.load(action.result._bodyText);
  let successState = state;
  $('.list>li').each( (index, element) => {
    const elem = $(element);
    const text = elem.text();
    const href = elem.children('a').first().attr('href');
    successState = successState.update('list', list => list.push(new itemRecord({
      href,
      text,
    })));
  });
  return successState.set('loaded', true).set('loading', true).set('error', null);
}

export default function news(state = INITIAL_STATE, action = {}) {
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

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get('https://chaturbate.com', {
    }),
  };
}
