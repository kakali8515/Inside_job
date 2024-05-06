import { reactive } from "vue";

const state = reactive({
  contractDetailsState: "",
  employmentFormtype: "",
  editId: localStorage.getItem("contractId"),
  formPageType: localStorage.getItem("contractFormType"),
  contractListTabState: 0,
});

const methods = {
  setState(state) {
    state.contractDetailsState = state;
  },
};

export default {
  state,
  methods,
};
