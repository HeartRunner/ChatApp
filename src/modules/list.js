// 这里存放列表
const  {Record, List} = require('immutable');
const LOAD = 'list/load';
const LOAD_SUCCESS = 'list/load_success';
const LOAD_FAIL = 'list/load_fail';
import cheerio from 'cheerio';

const ItemRecord = Record({
  href: '',
  text: '',
  title: '',
  location: '',
  cams: '',
  img: '',
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
    const img = elem.children('a').first().children('img').first().attr('src');
    const detail = elem.children('.details');
    const title = detail.children('.subject').children().first().attr('title');
    const location = detail.children('.sub-info').children().first().text();
    const cams = detail.children('.sub-info').children().eq(1).text();
    successState = successState.update('list', list => list.push(new ItemRecord({
      href,
      text,
      title,
      location,
      cams,
      img,
    })));
  });
  return successState.set('loaded', true).set('loading', false).set('error', null);
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
