const working_days = [
  {
    name: "주1일",
    value: "1_day_a_week",
    validationCheck: "6",
  },
  {
    name: "주2일",
    value: "2_days_a_week",
    validationCheck: "5",
  },
  {
    name: "주3일",
    value: "3_days_a_week",
    validationCheck: "4",
  },
  {
    name: "주4일",
    value: "4_days_a_week",
    validationCheck: "3",
  },
  {
    name: "주5일",
    value: "5_days_a_week",
    validationCheck: "2",
  },
  {
    name: "주6일",
    value: "6_days_a_week",
    validationCheck: "1",
  },
  {
    name: "매일",
    value: "everyday",
  },
];

const holidays = [
  {
    name: "월",
    value: "1",
  },
  {
    name: "화",
    value: "2",
  },
  {
    name: "수",
    value: "3",
  },
  {
    name: "목",
    value: "4",
  },
  {
    name: "금",
    value: "5",
  },
  {
    name: "토",
    value: "6",
  },
  {
    name: "일",
    value: "7",
  },
];

const working_days_hours = [
  {
    id: "1",
    name: "Monday",
  },
  {
    id: "2",
    name: "화요일",
  },
  {
    id: "3",
    name: "수요일",
  },
  {
    id: "4",
    name: "목요일",
  },
  {
    id: "5",
    name: "금요일",
  },
  {
    id: "6",
    name: "토요일",
  },
  {
    id: "7",
    name: "일요일",
  },
];

export const standardContractFormLists = {
  working_days,
  holidays,
  working_days_hours,
};
