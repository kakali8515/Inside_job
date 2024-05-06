<template>
  <div>
    <div v-show="maphide">
      <HeaderSearch :searchType="false" />
      <div class="back-wh pb-16">
        <div class="container">
          <div
            class="place-fliter-cont rgn region-filter"
            @click="
              // occupationhide = true;
              maphide = false;
              isOpen = true;
              store.state.isOccupationOpen = true;
            "
            style="margin-bottom: 0 !important"
          >
            <input
              type="text"
              :placeholder="
                store.state.filtersVisibleState.length === 0 ? headerreg : ''
              "
              class="form-control"
              readonly
            />
            <a href="#" class="filter-ic"
              ><img src="@/assets/icons/filter-icon.svg" alt=""
            /></a>

            <!-- add input -->
            <div class="search-input">
              <!-- <ul class="selected-list">
                <li
                  v-for="(i, e) in store.state.filtervalue"
                  :key="e"
                  style="
                    color: #666666;
                    background-color: #f1f1f1;
                    padding: 3px 10px;
                    border-radius: 5px;
                    margin: 10px 5px;
                  "
                >
                  {{ i }}
                   <a href="#" @click="removeFilter(i, e, $event)"
                    ><img src="@/assets/icons/cross.svg" class="cross" alt=""
                  /></a>
                </li>
              </ul> -->
              <!-- <span
                v-for="(i, e) in arrydata"
                :key="e"
                style="
                  color: #666666;
                  background-color: #f1f1f1;
                  padding: 4px 10px;
                  border-radius: 5px;
                  margin: 0 5px;
                "
              >
                {{ i }}
                <img
                  @click="removeItemOnce(arrydata, arrydata.indexOf(item))"
                  src="@/assets/icons/cross.svg"
                  alt=""
                />
              </span> -->
              <span
                v-for="(i, e) in store.state.filtersVisibleState"
                :key="e"
                style="
                  color: #666666;
                  background-color: #f1f1f1;
                  padding: 4px 24px 4px 5px;
                  border-radius: 5px;
                  margin: 0px 5px;
                "
              >
                {{ i }}
                <!-- $refs.childComponent.hellomap() -->
                <img
                  @click.stop="removeOccupationFilter(i, e, $event),
                  $refs.childComponent.hellomap()
                  "
                  src="@/assets/icons/cross.svg"
                  alt=""
                />
              </span>
            </div>
          </div>
        </div>
        <!-- <KakaoMap ref="childComponent" /> -->
      </div>
    </div>

    <KakaoMap
      ref="childComponent"
      v-if="!store.state.isOccupationOpen"
      @hidePage="maphide = !maphide"
    />
    <!-- <Sheet v-model:visible="store.state.isOccupationOpen"> -->
    <OccupationSetting
      @setfalse="hideoccupation($event)"
      v-show="store.state.isOccupationOpen"
    />
    <!-- </Sheet> -->
  </div>
</template>
<script>
import HeaderSearch from "@/components/HeaderSearch.vue";
import KakaoMap from "../../components/kakaoMap.vue";
import OccupationSetting from "@/views/JobSeekers/OccupationSetting.vue";
import { inject, watch, onMounted } from "@vue/runtime-core";
export default {
  data() {
    return {
      store: inject("occupationStore"),
      regionStore: inject("regionStore"),
      isOpen: false,
      maphide: true,
      hideOccupation: "",
      // arrydata: JSON.parse(localStorage.getItem('filtersearchdata')),
      arrydata: [],
      headerreg: "업직종을 선택하세요", // the placeholder text should be "업직종을 선택하세요" as per korean team 
    };
  },
  name: "Region",
  components: {
    KakaoMap,
    HeaderSearch,
    OccupationSetting,
  },
  methods: {
    // this.store.state.filtervalue
    hideoccupation(data) {
      // this.headerreg="";
      console.log("occupation result", data);
      this.hideOccupation = data;
      // this.occupationhide = false;
      this.isOpen = false;
      this.store.state.isOccupationOpen = data;
      this.arrydata = this.store.state.filtervalue;
      this.maphide = true;
      this.$refs.childComponent.hellomap();
      // this.$refs.childComponent.getJobList();
      console.log("occupation-Array", this.store.state.totalFilterState);
      window.scrollTo(0, 0);
    },
    removeItemOnce(arr, value) {
      var index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
      }
      return arr.splice(index, 1);
    },
    removeOccupationFilter(i, id, event) {
      this.store.methods.removeFilter(i, id, event),
      setTimeout(() => {
        this.store.methods.submitFilter();
      }, 100);
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.$refs.childComponent.hellomap();
    // }, 3000);
    let forwardPath =
      this.$router.options.history.state.forward == null
        ? "notmatch"
        : this.$router.options.history.state.forward;
    if (
      forwardPath.match("job-posting-details") == "job-posting-details" ||
      forwardPath.match("region-select-list") == "region-select-list"
    ) {
      console.log("Nothing");
    } else {
      this.store.methods.refreshUnMount();
      this.regionStore.methods.refreshUnMount();
      console.log("clearing");
    }
  },
  setup() {
    const store = inject("occupationStore");
    const regionStore = inject("regionStore");

    watch(
      () => store.state.totalFilters,
      (val) => {
        store.state.filtersVisible = [];
        console.log(val, "changed");
        val.forEach((ele, e) => {
          store.state.filtersVisible.push(...ele.name);
        });
        console.log(store.state.filtersVisible, "check value after add");
        // setFiltervalue
        store.state.filtervalue = store.state.filtersVisible;
        console.log(store.state.filtervalue);
      },
      { deep: true }
    );
    // onUnmounted(() => {
    //   store.methods.refreshUnMount();
    // });
    onMounted(() => {});

    return {
      store,
      regionStore,
    };
  },
};
</script>
<style scoped>
</style>
