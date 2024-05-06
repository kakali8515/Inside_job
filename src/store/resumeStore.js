import { reactive } from "vue";

const state = reactive({
  title: "",
  desired_periods: [],
  desired_days: [],
  desired_hours: [],
  employment_type: [],
  selfIntro: "",
  resumeTitle: "",
  academics: "",
});

const methods = {
  refreshData() {
    state.title = "";
    state.academics= "";
    state.desired_days = [];
    state.desired_hours = [];
    state.desired_periods = [];
    state.employment_type = [];
    state.selfIntro = "";
    state.resumeTitle = "";
  }
};

export default {
  state,
  methods,
};
