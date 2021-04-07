import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import {RootState} from '@/models/index';

const CAROUSEL_URL = '/carousel';
const GUESS_URL = '/guess';
const CHANNEL_URL = '/channel';

export interface ICarousel {
  id: string;
  image: string;
  colors: [string, string];
}

export interface IGuess {
  id: string;
  image: string;
  title: string;
}

export interface IPagination {
  current: number;
  total: number;
  hasMore: boolean;
}

export interface IChannel {
  id: string;
  title: string;
  image: string;
  remark: string;
  played: number;
  playing: number;
}

export interface HomeState {
  carouselList: ICarousel[];
  guessList: IGuess[];
  channelList: IChannel[];
  pagination: IPagination;
  activeCarouselIndex: number; //  当前轮播图的下标
  gradientVisible: boolean; // 是否显示渐变色
}

interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
  reducers: {
    setState: Reducer<HomeState>;
  };
  effects: {
    fetchCarouselList: Effect;
    fetchGuessList: Effect;
    fetchChannelList: Effect;
  };
}

const initialState: HomeState = {
  carouselList: [],
  guessList: [],
  channelList: [],
  pagination: {
    current: 1,
    total: 0,
    hasMore: true,
  },
  activeCarouselIndex: 0,
  gradientVisible: true,
};

const homeModel: HomeModel = {
  namespace: 'home',
  state: initialState,
  reducers: {
    setState(state = initialState, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *fetchCarouselList(_, {call, put}) {
      const {data} = yield call(axios.get, CAROUSEL_URL);
      yield put({
        type: 'setState',
        payload: {
          carouselList: data,
        },
      });
    },
    *fetchGuessList(_, {call, put}) {
      const {data} = yield call(axios.get, GUESS_URL);
      console.log(data);
      yield put({
        type: 'setState',
        payload: {
          guessList: data,
        },
      });
    },
    *fetchChannelList({callback, payload}, {call, put, select}) {
      const {channelList, pagination} = yield select(
        (state: RootState) => state.home,
      );
      let page = 1;
      if (payload && payload.loadMore) {
        page = pagination.current + 1;
      }
      const {data} = yield call(axios.get, CHANNEL_URL, {
        params: {
          page,
        },
      });

      let newChannelList = data.results;

      if (payload && payload.loadMore) {
        newChannelList = channelList.concat(newChannelList);
      }
      yield put({
        type: 'setState',
        payload: {
          channelList: newChannelList,
          pagination: {
            current: data.pagination.current,
            total: data.pagination.total,
            hasMore: channelList.length < data.pagination.total,
          },
        },
      });
      if (typeof callback === 'function') {
        callback();
      }
    },
  },
};

export default homeModel;
