<template>
    <CustomModal v-if="isModal" modalSize="modal-lg" class="location-modal">
    <template v-slot:body>
     <span class="cross-btn">
        <img src="@/assets/icons/modal-cross-icon.svg" alt="" @click="$emit('closeModal')"/>
      </span>

<div class="locattion-otr-wrap">
      <div class="locattion-otr">
        <div class="left-part">
            <ul>
              <span v-for="(i, e) in region1stLeveldata.lists" :key="e">
                <li :class="[activeLiFirst == i.text ? 'active' : '']">
                  <span @click="tabClick(i, 'first')">{{i.short_text}}</span>
                </li>
              </span>
            </ul>
        </div>
        <div class="right-part">
            <ul>
              <span v-for="(i, e) in region2ndLeveldata.lists" :key="e">
                <li :class="[activeLiSecond == i.text ? 'active' : '']">
                  <span  @click="tabClick(i, 'second')">{{i.text}}</span>
                </li>
              </span>
            </ul>
        </div>
        <div class="reset-btn">
          <button @click="refresh"><img src="@/assets/icons/refresh.svg" alt=""
          /></button>
        </div>
      </div>
      </div>
      </template>
    </CustomModal>
  </template>
  
  <script>
  import CustomModal from "@/components/Utils/CustomModal.vue";
  import { HomeService } from '../../service/API/Home';
  export default {
    props: { isModal: Boolean, firstLocation: Object, secondLocation: Object, close: Boolean},
    components: { 
        CustomModal
    },
    data() {
    return {
      activeLiSecond: '',
      activeLiFirst: '',
      selected1stRegion: {id: '' , text: ''},
      region2ndLeveldata: {
        limit: 10,
        page: 1,
        totalItem: null,
        lists: [],
      },
      region1stLeveldata: {
        limit: 10,
        page: 1,
        totalItem: null,
        lists: [],
      }
    };
  },
  
  created() {
    this.region1stLevelList();
  },
  methods: {

    async region1stLevelList() {
      try{  
      let res = await HomeService.region1stLevel();
      this.region1stLeveldata.lists = res.data;
      } catch(e) {
      }
    }, 

    async tabClick(i, type) {
      if(type == 'first') {
        this.activeLiFirst = i.text
        this.activeLiSecond = ''
        await this.fetch2ndRegionList(i)
      } else {
        this.activeLiSecond = i.text
        this.$emit('selectedRegion', i, this.selected1stRegion)
      }

    },

    async fetch2ndRegionList(i) {
      try{  
      let res = await HomeService.region2ndLevel(i.id);
      this.selected1stRegion.id = i.id
      this.selected1stRegion.text = i.text
      this.region2ndLeveldata.lists = res.data;
      this.region2ndLeveldata.lists.unshift({level_id: 0 , id: 0 , text: "전체"})
      } catch(e) {
      }
    },

    async refresh() {
      this.activeLiFirst = ''
      this.activeLiSecond = ''
      this.region2ndLeveldata.lists = []
      this.$emit('refresh')
    }
  },
  watch: {
    async isModal () {
      if(this.isModal === true) {
        //console.log(this.firstLocation.text +'------------' + this.firstLocation.id +'------------' +this.secondLocation.text)
        //console.log(this.firstLocation.text +this.secondLocation.text)
        this.activeLiFirst = this.firstLocation.text
        if(this.firstLocation.id !== '' && this.close === true){
          //this.activeLiFirst = this.firstLocation.text
          await this.fetch2ndRegionList(this.firstLocation)
          this.activeLiSecond = this.secondLocation.text
        }
      }
    }
  },
  };
  </script>
   