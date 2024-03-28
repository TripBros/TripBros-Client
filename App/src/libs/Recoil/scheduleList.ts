import { atom } from 'recoil';

export interface ScheduleData {
  scheduleId: number;
  startDate: string;
  endDate: string;
  country: string;
  city: string;
  image: any;
  memo: string;
}

export interface PromiseData {
  promiseId: number;
  startDate: string;
  endDate: string;
  country: string;
  city: string;
  postTitle: string;
  placeName?: string;
  placeId?: string;
  isAuthor: Boolean;
  memo?: string;
}

export const scheduleListState = atom<ScheduleData[]>({
  key: 'scheduleListState',
  default: [],
});

export const promiseListState = atom<PromiseData[]>({
  key: 'promiseListState',
  default: [],
});
