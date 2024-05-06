const employmentType = [
    {
      name: "정규직",
      value: "full_time",
    },
    {
      name: "아르바이트",
      value: "part_time_job",
    },
    {
      name: "계약직",
      value: "contract_worker",
    },
    {
      name: "파견직",
      value: "dispatch",
    },
    {
      name: "인턴직",
      value: "internship",
    },
    {
      name: "프리랜서",
      value: "freelancer",
    },
    {
      name: "기타",
      value: "etc",
    },
  ];

  const desiredPeriods = [
    {
      name: "하루(1일)",
      value: "1_day",
    },
    {
      name: "1주일이하",
      value: "less_than_1_week",
    },
    {
      name: "1주일~1개월",
      value: "1_week_to_1_month",
    },
    {
      name: "1개월~3개월",
      value: "1_month_to_3_months",
    },
    {
      name: "3개월~6개월",
      value: "3_months_to_6_months",
    },
    {
      name: "6개월~1년",
      value: "6_months_to_1_year",
    },
    {
      name: "1년 이상",
      value: "more_than_1_year",
    },
  ];

  const career_type = [
    {
      name: "신입",
      value: "newcomer",
    },
    {
      name: "경력",
      value: "experience",
    }
  ]

  const gender = [
    {
      name: "남자",
      value: "male",
    },
    {
      name: "여자",
      value: "female",
    }
  ]

  const pay_type = [
    {
      name: "시급",
      value: "hourly_wage",
    },
    {
      name: "일급",
      value: "daily_wage",
    },
    {
      name: "월급",
      value: "salary",
    }
  ]
  
  export const aiLists = {
    employmentType,
    desiredPeriods,
    career_type,
    gender,
    pay_type
  };