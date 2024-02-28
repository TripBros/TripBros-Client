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

export const scheduleListState = atom<ScheduleData[]>({
  key: 'scheduleListState',
  default: [], // 타입이 ScheduleData[]임을 명시
});
