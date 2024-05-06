import { reactive, toRaw } from "vue";
import { regionService } from "@/service/API/regionSelect.js";

const state = reactive({
  primaryList: [],
  secondaryList: [],
  tertiaryList: [],
  primarySelected: {},
  secondarySelected: {},
  tertiarySelected: [],
  totalFilters: [],
  filtersVisible: [],
  Backup: [],
  jobList: [],

  // specifically for region
  workPlaceFilterState: [],
  workPlaceVisibleState: [],
  redirectPage: "",
  isRegionOpen: false,
});

const methods = {
  setJoblist(val) {
    state.jobList = val;
  },
  setFiltervalue(state) {
    state.getPrimaryList = state;
  },
  // Getting 1st list
  async getPrimaryList() {
    // alert("hi");
    let res = await regionService.regionPrimary();
    state.primaryList = res.data;
  },

  // Getting 2nd list when selecting from 1st list
  async setSelectedPrimary(item) {
    state.primarySelected = item;
    let res = await regionService.regionSecondary(state.primarySelected.id);
    state.tertiaryList = [];
    state.tertiarySelected = [];
    state.secondarySelected = {};
    state.secondaryList = res.data;
    state.secondaryList.unshift({
      id: "second",
      "1st_level_id": state.primarySelected.id,
      text: `${state.primarySelected.text} 전체`,
    });
  },

  // methods calls when selecting any item from 2nd row
  async setSelectedSecondary(item) {
    state.secondarySelected = item;
    state.tertiaryList = [];
    state.tertiarySelected = [];
    if (Object.values(state.secondarySelected).length > 0) {
      // if user selects any option except "all of second(1st item on the list)" in the list
      if (state.secondarySelected.id != "second") {
        // fetch third row data
        let res = await regionService.regionTertiary(
          state.secondarySelected.id
        );
        // setting third row list data and adding all of third at the top
        state.tertiaryList = res.data;
        state.tertiaryList.unshift({
          id: "third",
          "2nd_level_id": state.secondarySelected.id,
          text: `${state.secondarySelected.text} 전체`,
        });
        //
        // console.log(primarySelected.value.id);
        var presentId = state.totalFilters.find(
          (ele) => ele.work_place_first === state.primarySelected.id
        );
        // console.log(presentId);
        if (
          presentId !== undefined &&
          presentId.work_place_second.length <= 0
        ) {
          let removedItem = state.totalFilters.splice(
            state.totalFilters.findIndex(
              (item) => item.work_place_first === presentId.work_place_first
            ),
            1
          );

          // console.log("removed item", removedItem);
        }
      } else {
        // if user selects "all of second(1st item on the list)" in the list
        if (state.filtersVisible.length >= 10) {
          return;
        } else {
          state.tertiaryList = [];
          state.tertiarySelected = [];
          // console.log(
          //   "searched Id",
          //   state.totalFilters.findIndex(
          //     (ele) => ele.work_place_first === state.primarySelected.id
          //   )
          // );
          // if there is no other item from 2nd list primarily selected
          if (
            state.totalFilters.findIndex(
              (ele) => ele.work_place_first === state.primarySelected.id
            ) == -1
          ) {
            state.totalFilters.push({
              work_place_first: state.primarySelected.id,
              work_place_second: "",
              name: [state.secondarySelected.text],
            });
            // console.log("no previous add ... adding", state.totalFilters);
          }
          // if other item from 2nd list primarily selected
          else {
            // console.log("checking with", state.primarySelected.id);
            let filteredArr = [
              ...state.totalFilters.filter((res, e) => {
                return res.work_place_first != state.primarySelected.id;
              }),
            ];
            state.totalFilters = [];
            // filter out previously selected
            state.totalFilters.push(...filteredArr, {
              work_place_first: state.primarySelected.id,
              work_place_second: "",
              name: [state.secondarySelected.text],
            });
            // console.log(state.totalFilters);
          }
        }
      }
    }
  },

  // Method calls when selecting any item from 3rd row list
  setSelectedTertiary(item) {
    let findId = state.tertiarySelected.findIndex((x) => x.id === item.id);
    if (findId != -1 || state.filtersVisible.length >= 10) {
      // tertiarySelected.value.splice(findId, 1);
      return;
    } else {
      state.tertiarySelected.push(item);
      if (item.id != "third") {
        var isPresentVal = state.totalFilters.find(
          (ele) => ele.work_place_second === state.secondarySelected.id
        );
        // console.log("if present", isPresentVal);
        if (isPresentVal == undefined) {
          state.totalFilters.push({
            work_place_first: state.primarySelected.id,
            work_place_second: state.secondarySelected.id,
            work_place_third: [item.id],
            name: [item.text],
          });
        } else {
          let allthirdId = state.tertiarySelected.findIndex(
            (res) => res.id === "third"
          );
          if (allthirdId > -1) {
            state.tertiarySelected.splice(allthirdId, 1);
          }
          if (
            isPresentVal.name.includes(`${state.secondarySelected.text} 전체`)
          ) {
            // console.log("here here");
            isPresentVal.name.splice(
              isPresentVal.name.findIndex((res) =>
                res.includes(`${state.secondarySelected.text} 전체`)
              ),
              1
            );
          }
          state.totalFilters.forEach((x) => {
            if (x.work_place_second === state.secondarySelected.id) {
              if (!x.work_place_third.includes(item.id)) {
                x.work_place_third.push(item.id);
                x.name.push(item.text);
              }
            }
          });
        }
      } else {
        if (
          state.totalFilters.findIndex(
            (ele) => ele.work_place_second === state.secondarySelected.id
          ) == -1
        ) {
          state.totalFilters.push({
            work_place_first: state.primarySelected.id,
            work_place_second: state.secondarySelected.id,
            work_place_third: [],
            name: [item.text],
          });
          // console.log("no previous add ... adding", totalFilters.value);
        } else {
          state.tertiarySelected = [];
          state.tertiarySelected.push({
            id: "third",
            "2nd_level_id": state.secondarySelected.id,
            text: `${state.secondarySelected.text} 전체`,
          });
          state.totalFilters.forEach((x) => {
            if (x.work_place_second === state.secondarySelected.id) {
              x.work_place_third = [];
              x.name.splice(0, x.name.length, item.text);
            }
          });
        }
      }
    }
    // console.log(totalFilters.value);
  },

  findSelectedThird(id) {
    if (
      state.tertiarySelected.findIndex((ele) => String(ele.id) === `${id}`) !==
      -1
    ) {
      return true;
    } else {
      return false;
    }
  },

  // adding filters which are visible to the user
  //   watch(
  //     () => totalFilters.value,
  //     (val) => {
  //       filtersVisible.value = [];
  //       console.log(val, "changed");
  //       val.forEach((ele, e) => {
  //         filtersVisible.value.push(...ele.name);
  //       });
  //       // console.log(filtersVisible.value, "check value after add");
  //     },
  //     { deep: true }
  //   );

  // removing added filters which are visible to the user( will update the totalFilters array)
  removeFilter(itemToRemove, index, e) {
    e.preventDefault();
    // state.Backup = [];
    // state.Backup.push();
    state.totalFilters.forEach((wholeItemRemove, wholeId) => {
      // console.log(wholeItemRemove);
      if (wholeItemRemove.name.includes(itemToRemove)) {
        // console.log(wholeItemRemove.work_place_second);
        state.workPlaceVisibleState.splice(index, 1);
        state.primarySelected = {};
        state.secondarySelected = {};
        state.tertiarySelected = [];
        state.secondaryList = [];
        state.tertiaryList = [];
        if (
          !wholeItemRemove.work_place_second ||
          wholeItemRemove.work_place_third.length == 0 ||
          wholeItemRemove.work_place_third.length == 1
        ) {
          // let filterArr = state.totalFilters.filter(
          //   (res) => !res.name.includes(itemToRemove)
          // );
          // // console.log(filterArr);
          // state.totalFilters = [...filterArr];
          state.totalFilters.splice(wholeId, 1);
          // console.log(
          //   "check state.workPlaceFilterState after",
          //   state.workPlaceFilterState
          // );
        } else {
          let itemId = wholeItemRemove.name.findIndex(
            (ocu) => ocu === itemToRemove
          );
          let itemToChange = state.totalFilters.find((res) => res.name.includes(itemToRemove))
          // console.log(itemId);
          itemToChange.name.splice(itemId, 1);
          itemToChange.work_place_third.splice(itemId, 1);
          // console.log(
          //   "check state.workPlaceFilterState after",
          //   state.workPlaceFilterState
          // );
        }
      }
    });
  },

  submitFilter() {
    state.Backup = [];
    let finalData = state.totalFilters.map(({ name, ...rest }) => {
      // console.log(isProxy(rest));
      return rest;
    });
    state.Backup.push(...finalData);
    state.workPlaceFilterState = state.Backup;
    state.workPlaceVisibleState = state.filtersVisible;
    // console.log("check after submit",state.workPlaceFilterState);
    // if (state.redirectPage) {
    //   router.push({
    //     name: state.redirectPage,
    //   });
    // }
  },

  refreshAll(e) {
    console.log("refreshing");
    e.preventDefault();
    state.secondaryList = [];
    state.tertiaryList = [];
    state.totalFilters = [];
    state.filtersVisible = [];
    state.primarySelected = {};
    state.secondarySelected = {};
    state.tertiarySelected = [];
    state.workPlaceFilterState = [];
    state.workPlaceVisibleState = [];
  },

  refreshAllData() {
    console.log("refreshing");
    // e.preventDefault();
    state.secondaryList = [];
    state.tertiaryList = [];
    state.totalFilters = [];
    state.filtersVisible = [];
    state.primarySelected = {};
    state.secondarySelected = {};
    state.tertiarySelected = [];
    state.workPlaceFilterState = [];
    state.workPlaceVisibleState = [];
  },

  refreshUnMount() {
    // e.preventDefault();
    state.secondaryList = [];
    state.tertiaryList = [];
    state.totalFilters = [];
    state.filtersVisible = [];
    state.primarySelected = {};
    state.secondarySelected = {};
    state.tertiarySelected = [];
    state.workPlaceFilterState = [];
    state.workPlaceVisibleState = [];
  },

  clearSelected() {
    state.primarySelected = {};
    state.secondarySelected = {};
    state.tertiarySelected = [];
    state.secondaryList = [];
    state.tertiaryList = [];
  }
};

export default {
  state,
  methods,
};
