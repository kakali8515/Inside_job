import { reactive, toRaw } from "vue";
import { occupationService } from "@/service/API/occupation.js";

const state = reactive({
  totalFilterState: [],
  filtersVisibleState: [],
  filtervalue: [],
  primaryList: [],
  secondaryList: [],
  tertiaryList: [],
  primarySelected: {},
  secondarySelected: {},
  tertiarySelected: [],
  totalFilters: [],
  filtersVisible: [],
  Backup: [],
  // specifically for region 
  workPlaceFilterState: [],
  workPlaceVisibleState: [],
  redirectPage: "",
  isOccupationOpen: false,
  joblist:[]
});

const methods = {
  setState(state) {
    state.contractDetailsState = state;
  },
  setJoblist (state) {
    state.joblist = state;
  },
  setFiltervalue(state) {
    state.filtervalue = state;
  },

  async getPrimaryList() {
    let res = await occupationService.occupationPrimary();
    state.primaryList = res.data;
  },
  // Getting 2nd list when selecting from 1st list
  async setSelectedPrimary(item) {
    state.primarySelected = item;
    let res = await occupationService.occupationSecondary(
      state.primarySelected.id
    );
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
        let res = await occupationService.occupationTertiary(
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
          (ele) => ele.occupation_first === state.primarySelected.id
        );
        // console.log(presentId);
        if (
          presentId !== undefined &&
          presentId.occupation_second.length <= 0
        ) {
          let removedItem = state.totalFilters.splice(
            state.totalFilters.findIndex(
              (item) => item.occupation_first === presentId.occupation_first
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
          //     (ele) => ele.occupation_first === state.primarySelected.id
          //   )
          // );
          // if there is no other item from 2nd list primarily selected
          if (
            state.totalFilters.findIndex(
              (ele) => ele.occupation_first === state.primarySelected.id
            ) == -1
          ) {
            state.totalFilters.push({
              occupation_first: state.primarySelected.id,
              occupation_second: "",
              name: [state.secondarySelected.text],
            });
            // console.log("no previous add ... adding", state.totalFilters);
          }
          // if other item from 2nd list primarily selected
          else {
            // console.log("checking with", state.primarySelected.id);
            let filteredArr = [
              ...state.totalFilters.filter((res, e) => {
                return res.occupation_first != state.primarySelected.id;
              }),
            ];
            state.totalFilters = [];
            // filter out previously selected
            state.totalFilters.push(...filteredArr, {
              occupation_first: state.primarySelected.id,
              occupation_second: "",
              name: [state.secondarySelected.text],
            });
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
          (ele) => ele.occupation_second === state.secondarySelected.id
        );
        // console.log("if present", isPresentVal);
        if (isPresentVal == undefined) {
          state.totalFilters.push({
            occupation_first: state.primarySelected.id,
            occupation_second: state.secondarySelected.id,
            occupation_third: [item.id],
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
          // state.totalFilters.forEach((x) => {
          //   if (x.occupation_second === state.secondarySelected.id) {
              if (!isPresentVal.occupation_third.includes(item.id)) {
                isPresentVal.occupation_third.push(item.id);
                isPresentVal.name.push(item.text);
              }
            // }
          // });
        }
      } else {
        if (
          state.totalFilters.findIndex(
            (ele) => ele.occupation_second === state.secondarySelected.id
          ) == -1
        ) {
          state.totalFilters.push({
            occupation_first: state.primarySelected.id,
            occupation_second: state.secondarySelected.id,
            occupation_third: [],
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
            if (x.occupation_second === state.secondarySelected.id) {
              x.occupation_third = [];
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

  // adding filters which are visible to the use

  // removing added filters which are visible to the user( will update the totalFilters array)
  removeFilter(itemToRemove, index, e) {
    e.preventDefault();
    console.log(itemToRemove, "item to remove");
    state.totalFilters.forEach((wholeItem, wholeId) => {
      console.log(wholeItem);
      if (wholeItem.name.includes(itemToRemove)) {
        // state.filtersVisibleState.splice(index, 1);
        console.log("is present");
        state.primarySelected = {};
        state.secondarySelected = {};
        state.tertiarySelected = [];
        state.secondaryList = [];
        state.tertiaryList = [];
        if (
          !wholeItem.occupation_second ||
          wholeItem.occupation_third.length == 0 ||
          wholeItem.occupation_third.length == 1
        ) {
          let filterArr = state.totalFilters.filter(
            (res) => !res.name.includes(itemToRemove)
          );
          console.log(filterArr);
          state.totalFilters = toRaw([...filterArr]);
        } else {
          let itemId = wholeItem.name.findIndex((ocu) => ocu === itemToRemove);
          console.log(itemId);
          wholeItem.name.splice(itemId, 1);
          wholeItem.occupation_third.splice(itemId, 1);
          // let itemToChange = state.totalFilters.find((res) => res.name.includes(itemToRemove))
          // console.log(itemId);
          // itemToChange.name.splice(itemId, 1);
          // itemToChange.work_place_third.splice(itemId, 1);
          // console.log(
          //   "check state.workPlaceFilterState after",
          //   state.workPlaceFilterState
          // );
        }
      } else {
        return;
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
    state.totalFilterState = toRaw(state.Backup);
    state.filtersVisibleState = state.filtersVisible;
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
    state.totalFilterState = [];
    state.filtersVisibleState = [];
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
    state.totalFilterState = [];
    state.filtersVisibleState = [];
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
    state.totalFilterState = [];
    state.filtersVisibleState = [];
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
