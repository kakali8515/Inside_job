<template>
  <CustomModal v-if="isModal" modalSize="modal-lg">
    <template v-slot:header>
      <span
        class="cross-btn"
        @click="
          () => {
            $emit('closeModal');
          }
        "
      >
        <img src="@/assets/icons/modal-cross-icon.svg" alt="" />
      </span>
    </template>
    <template v-slot:body>
      <h3 class="sub-heading lg xxl">우대조건 직접 추가</h3>
      <div class="form-group">
      <div class="prefer-modal-cont">
          <div class="group-input border-und-txt input-100">
            <input
              type="text"
              class="form-control"
              placeholder="옵션 입력"
              v-model="addinput"
            />
          </div>
          <button type="button" class="btn btn-primary-outline" @click="setList(addinput)">
            추가
          </button>
        </div>
    </div>
      <div class="cm-bk" style="margin:16px 0 32px;">
        <h4 class="pro-hdr" style="text-align:left;">직접 추가한 우대조건</h4>
        <ul class="selected-list m-0">
              <li v-for="item in inputList" :key="item">
                {{ item }}
                <img src="@/assets/icons/cross-lg.svg" alt="" class="cross" @click="removeItemOnce(inputList,inputList.indexOf(item))" />
              </li>
        </ul>
      </div>
    </template>
    <template v-slot:footer>
      <div class="btn-grp">
        <button
          class="btn btn-primary lg"
          @click="
            () => {
              $emit('EntryData', inputList);
              
            }
          "
        >
          확인
        </button>
      </div>
    </template>
  </CustomModal>
</template>

<script>
import CustomModal from "@/components/Utils/CustomModal.vue";
export default {
  props: { isModal: Boolean },
  components: { CustomModal },
  data() {
    return {
      reason: "",
      addinput:"",
      inputList:[],
    };
  },
  methods:{
    seteditData(d_data){
    this.inputList=d_data;
    },
    setList(input){
       this.inputList.push(input);
       this.addinput='';
    },
    removeItemOnce(arr, value) {
      var index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
      }
      return arr.splice(index, 1);
    },
  },
  watch: {
    async isModal () {
      if(this.isModal === true) {
        this.inputList = []
        this.addinput = ''
      }
    }
  },
};
</script>

