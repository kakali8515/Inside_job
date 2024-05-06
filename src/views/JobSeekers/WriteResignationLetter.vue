<template>
  <div class="back-wh">
    <div class="top-hdr top-hdr-br m-0">
      <div class="container">
        <InnerHeader headerTitle="사직서 작성" />
      </div>
    </div>
  </div>

  <div class="form-wrapper resig-letter-wrapper">
    <form>
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="sub-otr b-color">
              <h3 class="sub-heading mb-0">소속</h3>
            </div>
            <div class="form-group mb-0">
              <input
                type="text"
                placeholder="알바알바"
                class="form-control"
                v-model="companyName"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="sub-otr b-color">
              <h3 class="sub-heading mb-0">성명</h3>
            </div>
            <div class="form-group mb-0">
              <input
                type="text"
                placeholder="김알바"
                class="form-control"
                v-model="seekerName"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="sub-otr b-color">
              <h3 class="sub-heading mb-0">직위</h3>
            </div>
            <div class="form-group mb-0">
              <input
                type="text"
                placeholder="직위를 적어주세요"
                class="form-control"
                v-model="position"
              />
              <small class="error-msgsign">{{ errors?.position }}</small>
            </div>
          </div>
        </div>
      </div>
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="sub-otr b-color">
              <h3 class="sub-heading mb-0">업무 기간</h3>
            </div>
            <div class="form-group mb-0">
              <div class="business-period-cont">
                <div class="period-row from-row">
                  <ul class="date-info">
                    <li>
                      <span
                        ><input
                          type="text"
                          disabled
                          v-model="period_from.yy"
                          class="form-control"
                          placeholder="2022" /></span
                      >년
                    </li>
                    <li>
                      <span
                        ><input
                          type="text"
                          disabled
                          v-model="period_from.mm"
                          class="form-control"
                          placeholder="01" /></span
                      >월
                    </li>
                    <li>
                      <span
                        ><input
                          type="text"
                          disabled
                          v-model="period_from.dd"
                          class="form-control"
                          placeholder="10" /></span
                      >일
                    </li>
                  </ul>
                  <span>부터</span>
                </div>
                <div class="period-row until-row">
                  <ul class="date-info">
                    <li>
                      <span
                        ><input
                          :type="inputType()"
                          v-model="period_to.yy"
                          class="form-control"
                          placeholder="2022"
                          maxlength="4" 
                          onkeypress="return /[0-9]/i.test(event.key)"/></span
                      >년
                    </li>
                    <li>
                      <span
                        ><input
                          :type="inputType()"
                          v-model="period_to.mm"
                          class="form-control"
                          placeholder="02" 
                          maxlength="2"
                          onkeypress="return /[0-9]/i.test(event.key)"/></span
                      >월
                    </li>
                    <li>
                      <span
                        ><input
                          :type="inputType()"
                          v-model="period_to.dd"
                          class="form-control"
                          placeholder="10" 
                          maxlength="2"
                          onkeypress="return /[0-9]/i.test(event.key)"/></span
                      >일
                    </li>
                  </ul>

                  <span>까지</span>
                </div>
                <small class="error-msgsign">{{ errors?.date }}</small>
                <small class="error-msgsign" v-if="showTodateErrorMsg !== ''">{{ showTodateErrorMsg }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="sub-otr b-color">
              <h3 class="sub-heading mb-0">사직 사유</h3>
            </div>
            <div class="form-group mb-0">
              <textarea class="form-control" v-model="reason" placeholder="사직 사유를 적어주세요">
</textarea>
              <small class="error-msgsign">{{ errors?.reason }}</small>
            </div>
          </div>
        </div>
      </div>
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="sub-otr b-color">
              <h3 class="sub-heading mb-0">서명</h3>
            </div>
            <!-- <div class="worker-sign-cont"><img src="/src/assets/images/signature.png" alt=""></div> -->
            <div class="form-group mb-0 mt-16">
              <img
                :src="preview"
                v-show="dynamic"
                style="
                  width: 100%;
                  height: auto;
                  border: 1px solid lightgray;
                  border-radius: 5px;
                  margin-bottom: 15px;
                  text-align: center;
                "
              />
              <input type="button" name="file" id="file" class="inputfile" />
              <label for="file" @click="setOpenSignModal($event)"
                >서명하기</label
              >
            </div>
            <small class="error-msgsign">{{ errors.sign }}</small>
          </div>
        </div>
      </div>
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="form-group mb-0">
              <div class="date-content pb-80">
                <p>상기인은 위 사유로 인하여</p>
                <ul class="date-info">
                  <li>
                    <span>{{ period_to.yy }}</span
                    >년
                  </li>
                  <li>
                    <span>{{ period_to.mm }}</span
                    >월
                  </li>
                  <li>
                    <span>{{ period_to.dd }}</span
                    >일
                  </li>
                </ul>
                <p>사직하고자 이에 사직서를 제출합니다.</p>
              </div>
              <div class="fixed-btn-otr">
              <input
                type="submit"
                class="btn btn-primary lg"
                value="작성 완료하기"
                @click.prevent="onsubmitModal()"
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="required-fields-icon" v-if="commonstore.state.requiredToastMsgShow">
      <p><span><img src="@/assets/icons/check-circle.svg" alt="" /></span> 필수 입력값을 확인해 주세요.</p>
    </div>
    <EmploymentSignature
      :isOpen="openSignModal.isOpen"
      @save="approveContract($event)"
    />
  </div>
  <confirmResignationmodal
    :isModal="isShowModal"
    @closeModal="isShowModal = false"
    @deleteConfirm="submitResignation()"
  />
</template>

<script>
import { ref, inject, onMounted, provide, reactive } from "@vue/runtime-core";
import InnerHeader from "../../components/innerHeader.vue";
import EmploymentSignature from "@/views/JobSeekers/EmploymentSignature.vue";
import { useRoute, useRouter } from "vue-router";
import resignService from "../../service/API/resignation";
import confirmResignationmodal from "@/components/Modals/confirmResignationmodal.vue";
import writeRegValidation from "@/Validations/writeResignation.js";
export default {
  name: "WriteResignationLetter",
  components: {
    InnerHeader,
    EmploymentSignature,
    confirmResignationmodal,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const id = ref("");
    const dynamic = ref(false);
    const showTodateErrorMsg = ref('');
    const isShowModal = ref(false);
    const commonstore = inject("commonStore");
    const companyName = ref("");
    const commonRating = ref(null);
    const seekerName = ref("");
    const preview = ref(null);
    const position = ref("");
    const signn = ref("");
    const formData = new FormData();
    const openSignModal = reactive({
      isOpen: false,
    });
    const errors = ref({});
    const period_from = ref({
      yy: "",
      mm: "",
      dd: "",
    });
    const period_to = ref({
      yy: new Date().getFullYear(),
      mm: new Date().getMonth() + 1,
      dd: new Date().getDate(),
      hr: new Date().getHours(),
      min: new Date().getMinutes(),
      sec: new Date().getSeconds(),
    });
    const reason = ref("");
    const sign = ref("");
    const setOpenSignModal = (e) => {
      e.preventDefault();
      openSignModal.isOpen = true;
      console.log(openSignModal.isopen);
    };
    provide("openSignModal", openSignModal);
    let resignservice = new resignService();
    onMounted(() => {
      //   console.log(route.query.nav);
      let prefill = commonstore.state.regObj;
      companyName.value = prefill.company_name;
      seekerName.value = prefill.name;
      position.value = prefill.business_information;
      commonRating.value = prefill.employer_rating
      console.log(prefill);
      let joindate = new Date(prefill.term_start_date);
      period_from.value = {
        yy: joindate.getFullYear(),
        mm: joindate.getMonth() + 1,
        dd: joindate.getDate(),
      };
      resignservice
        .processlist(1,10)
        .then((res) => {
          console.log("process_List: ", res.data.posts);
        })
        .catch((err) => console.log(err));
    });
    const onsubmitModal = () => {
      isShowModal.value = true;
    };
    const inputType = () => {
      if (screen.width <= 480) {
        return "tel";
      } else {
        return "text";
      }
    };
    const showsetdata = () => {
      resignservice.processlist(1,10).then((res) => {
        sessionStorage.setItem("count1", res.data.total_records);
      });
      resignservice.completelist(1,10).then((res) => {
        sessionStorage.setItem("count2", res.data.total_records);
      });
      setTimeout(() => {
        router.push({ name: "CompanyStarRating" });
      }, 100);
    };
    const submitResignation = (e) => {
      isShowModal.value = false;
      let toDate = period_to.value;
      let checkData = {
        position: position.value,
        reason: reason.value,
        date: toDate.yy && toDate.mm && toDate.dd != "" ? "something" : "",
        sign: signn.value == "" ? "" : "something",
      };
      const { isInvalid, error } = writeRegValidation(checkData);
      if (error.require) {
        commonstore.methods.displayRequiredToast()
      }
      if (isInvalid) {
        if(toDate.yy < new Date().getFullYear() || toDate.mm < new Date().getMonth() + 1 || toDate.dd < new Date().getDate()){
            showTodateErrorMsg.value = '날짜를 확인해 주세요.'
         }
         if(checkData.date === "") showTodateErrorMsg.value = ''
        // commonstore.methods.displayRequiredToast()
        errors.value = error;
        console.log(errors.value, "check error");
      } else {
        // console.log('elsevvvv')
        // console.log(toDate.mm)
        // console.log(new Date().getMonth())
        // console.log('elsevvvv')
        errors.value.date = ""
        if(toDate.yy < new Date().getFullYear() || toDate.mm < new Date().getMonth() + 1 || toDate.dd < new Date().getDate()){
            showTodateErrorMsg.value = '날짜를 확인해 주세요.'
            // commonstore.methods.displayRequiredToast()
        } else {
        formData.append("id", Number(commonstore.state.regObj.id));
        formData.append("reason", reason.value);
        formData.append("position", position.value);
        formData.append(
          "business_period_start_date",
          formatDateTime(commonstore.state.regObj.term_start_date)
        );
        formData.append(
          "business_period_end_date",
          `${period_to.value.yy}-${period_to.value.mm}-${period_to.value.dd} ${period_to.value.hr}:${period_to.value.min}:${period_to.value.sec}`
        );
        router.push({ name: "WriteResignationLetter" });
        console.log(formData.get("business_period_end_date"));
        resignservice
          .writeResignation(formData)
          .then((res) => {
            showsetdata();
            console.log("result : ", res);
          })
          .catch((err) => console.log(err));
        }
      }
    };
    const approveContract = async (event) => {
      formData.delete("image");
      console.log("image", event);
      openSignModal.isOpen = false;
      //   formData.append("contract_id", pageId);
      dynamic.value = true;
      formData.append("image", event);
      signn.value = event;
      preview.value = URL.createObjectURL(event);
      //   let res = await employmentService.contractApproved(formData);
      //   console.log(res);
      //   if (res.status === 200) {
      //     // router.push({ name: "LaborContract" });
      //     alert("signture Added.");
      //   }
    };
    const formatDateTime = (value) => {
      const date = new Date(value);
      let dd = date.getDate();
      let mm = date.getMonth() + 1;
      let yyyy = date.getFullYear();
      let hr = date.getHours();
      let min = date.getMinutes();
      let sec = date.getSeconds();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      if (hr < 10) {
        hr = "0" + hr;
      }
      if (min < 10) {
        min = "0" + min;
      }
      if (sec < 10) {
        sec = "0" + sec;
      }
      return (value = `${yyyy}-${mm}-${dd} ${hr}:${min}:${sec}`);
    };

    return {
      openSignModal,
      setOpenSignModal,
      id,
      companyName,
      seekerName,
      commonRating,
      position,
      period_from,
      period_to,
      reason,
      sign,
      showTodateErrorMsg,
      approveContract,
      resignservice,
      commonstore,
      submitResignation,
      formData,
      formatDateTime,
      isShowModal,
      onsubmitModal,
      inputType,
      preview,
      dynamic,
      errors,
      signn,
      showsetdata,
    };
  },
  // data(){
  //     return{
  //         id:'',
  //         companyName:'',
  //         seekerName:'',
  //         position:'',
  //         period_from:{
  //             yy:'2021',
  //             mm:'02',
  //             dd:'09'
  //         },
  //         period_to:{
  //             yy:new Date().getFullYear(),
  //             mm:new Date().getMonth() + 1,
  //             dd:new Date().getDate()
  //         },
  //         reason:'',
  //         sign:'',
  //         commonstore :inject("commonStore"),
  //         openSignModal:false,
  //     }
  // },
  // methods:{
  //     signature(){
  //         this.openSignModal=true;
  //         console.log(this.openSignModal);
  //     },

  // },
  // mounted(){
  //     let prefill=JSON.parse(this.$route.query.nav);
  //     this.companyName=prefill.company_name;
  //     this.seekerName=prefill.name;
  //     let joindate=new Date(prefill.term_start_date);
  //     this.period_from={
  //         yy:joindate.getFullYear(),
  //         mm:joindate.getMonth() + 1,
  //         dd:joindate.getDate()
  //     }
  //     console.log(this.commonstore)
  // }
};
</script>


<style scoped>
.form-wrapper.resig-letter-wrapper .form-group textarea.form-control {
    resize: none;
    color: black;
}
</style>