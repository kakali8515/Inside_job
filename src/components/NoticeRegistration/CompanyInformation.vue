<template>
  <!-- start conpany information default -->
  <div>
    <div>
      <div class="form-wrapper">
        <div class="back-wh">
          <div class="cm-top-space pb-32">
            <div class="container">
              <div class="sub-otr no-border">
                <h3 class="sub-heading lg">기업정보 입력</h3>
                <p>기업정보를 확인해 주세요</p>
              </div>
            </div>
          </div>
          <div class="border-top">
            <div class="cm-top-space pb-32">
              <div class="container">
                <div class="form-group mb-0">
                  <label>담당자 이름 <span>[필수]</span></label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="김알바"
                    v-model.trim="ManagerName"
                    readonly
                  />
                  <small class="error-msgsign">{{ error.mName }}</small>
                  <div class="check-list squre mt-16 mbt-0">
                    <label class="check-input mbt-0 wght"
                      >비공개
                      <input type="checkbox" v-model.trim="hideMangerName" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="border-top">
            <div class="cm-top-space pb-32">
              <div class="container">
                <div class="form-group mb-0">
                  <label>담당자 연락처 <span>[필수]</span></label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="01012341234"
                    v-model.trim="managerContact"
                    onkeypress="return /[0-9]/i.test(event.key)"
                    maxlength="11"
                    readonly
                  />
                  <small class="error-msgsign">{{ error.mContact }}</small>
                  <div class="check-list squre mt-16 mbt-0">
                    <label class="check-input mbt-0 wght"
                      >비공개
                      <input
                        type="checkbox"
                        v-model.trim="hidemanagerContact"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="border-top">
            <div class="cm-top-space pb-32">
              <div class="container">
                <div class="form-group mb-0">
                  <label>담당자 이메일 <span>[필수]</span></label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="alba123@gmail.com"
                    v-model.trim="managerEmail"
                    readonly
                  />
                  <small class="error-msgsign">{{ error.mEmail }}</small>
                  <div class="check-list squre mt-16 mbt-0">
                    <label class="check-input mbt-0 wght"
                      >비공개
                      <input type="checkbox" v-model.trim="hidemanagerEmail" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="border-top" v-show="hidedefaultAdd">
            <div class="cm-top-space pb-80">
              <div class="container">
                <div class="form-group mb-0">
                  <label>근무지역 <span>[필수]</span></label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="123123"
                    v-model.trim="defaultPIN"
                    disabled
                  />
                  <small class="error-msgsign">{{ error.cPIN }}</small>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="서울 00구 00로 111-1"
                    v-model.trim="defaultAddress"
                    disabled
                  />
                  <small class="error-msgsign">{{ error.cAddr }}</small>
                  <div class="form-group mt-16">
                    <label>상세 주소<span class="gr">[선택]</span></label>
                    <div class="group-input">
                      <input
                        class="form-control"
                        v-model="detailed_addr_default"
                        placeholder="상세 주소"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    class="btn btn-secondary-gray lg mt-16"
                    v-show="adress_show"
                    @click="
                      button_clicked(),
                        (adress_show = false),
                        (showfulladdress = true),
                        (hidedefaultAdd = false),
                        (nxtupdateAddress = true),
                        (addressradio = 'new')
                    "
                  >
                    근무지역이 기업의 위치와 다른가요?
                  </button>
                  <div class="check-list squre mt-16 mbt-0">
                    <label class="check-input mbt-0 wght"
                      >비공개
                      <input type="checkbox" v-model.trim="hideAddress" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end  conpany information default -->
    <div class="form-wrapper">
      <div class="back-wh">
        <div class="cm-top-space pb-32" v-show="showfulladdress">
          <div class="border-top">
            <div class="cm-top-space pb-32">
              <div class="container">
                <div class="form-group mb-0">
                  <label>근무지역</label>
                  <input
                    type="text"
                    class="form-control border b-cl"
                    placeholder="근로자가 일하게 될 근무지역을 입력해주세요"
                    disabled
                  />
                  <ul class="work-area">
                    <li>
                      <label class="radio-input mb-16"
                        >기업 주소지
                        <input
                          type="radio"
                          name="radio"
                          :checked="nxtdefaultAddress"
                          @change="
                            (nxtdefaultAddress = true),
                              (nxtupdateAddress = false),
                              (error = {}),
                              (addressradio = 'old')
                          "
                        />
                        <span class="checkmark"></span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="123123"
                        v-model.trim="defaultPIN1"
                        disabled
                      />
                      <input
                        type="text"
                        class="form-control"
                        placeholder="서울 00구 00로 111-1"
                        v-model.trim="defaultAddress1"
                        disabled
                      />
                      <div class="form-group mt-16">
                        <label>상세 주소<span class="gr">[선택]</span></label>
                        <div class="group-input">
                          <input
                            class="form-control"
                            v-model="detailed_addr_default"
                            placeholder="상세 주소"
                          />
                        </div>
                      </div>
                    </li>
                    <li>
                      <label class="radio-input mb-16"
                        >새로 입력한 주소지
                        <input
                          type="radio"
                          name="radio"
                          :checked="nxtupdateAddress"
                          @change="
                            (nxtdefaultAddress = false),
                              (nxtupdateAddress = true),
                              (addressradio = 'new')
                          "
                        />
                        <span class="checkmark"></span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="123124"
                        v-model.trim="updatePIN"
                        disabled
                      />
                      <small class="error-msgsign">{{ error.cPIN }}</small>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="서울 **구 **로 123-12"
                        v-model.trim="updateAddress"
                        disabled
                      />
                      <small class="error-msgsign">{{ error.cAddr }}</small>
                      <div class="form-group mt-16">
                        <label>상세 주소<span class="gr">[선택]</span></label>
                        <div class="group-input">
                          <input
                            class="form-control"
                            v-model="detailed_addr_updated"
                            placeholder="상세 주소"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        class="btn btn-white lg mt-16"
                        @click="modalshow = true"
                      >
                        주소찾기
                      </button>
                    </li>
                  </ul>
                  <div class="check-list squre mt-16 mbt-0">
                    <label class="check-input mbt-0 wght"
                      >비공개
                      <input type="checkbox" v-model.trim="hideAddress" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="btm-button-group fixed-btn-otr">
          <button
            type="button"
            class="btn btn-primary lg"
            @click="submitData()"
          >
            다음으로
          </button>
        </div>
      </div>
      <VueDaumPostcode
        @complete="handleAddress"
        class="modalone"
        v-show="modalshow"
      ></VueDaumPostcode>
      <!-- <errorModal
      :isModal="showErrorModal"
      @closeModal="showErrorModal=false"
    /> -->
      <div
        class="required-fields-icon"
        v-if="commonstore.state.requiredToastMsgShow"
      >
        <p>
          <span><img src="@/assets/icons/check-circle.svg" alt="" /></span> 필수
          입력값을 확인해 주세요.
        </p>
      </div>
    </div>
    <LoadingBar v-if="loading.state" :loadingMsg="loading.message" />
  </div>
</template>
<script>
import jobPostingService from "../../service/API/jobPosting";
import LoadingBar from "@/components/Utils/LoadingBar.vue";
import companyinfoValidation from "@/Validations/noticeRegistratin/companyinfo.js";
// import errorModal from "@/components/Modals/EmploymentContractUnwrittenModal.vue";
import { inject } from "@vue/runtime-core";
export default {
  name: "RecruiterCompanyInformation",
  components: {
    // errorModal
    LoadingBar,
  },
  data() {
    return {
      loading: {
        state: false,
        message: "잠시만 기다려 주세요.",
      },
      commonstore: inject("commonStore"),
      addressradio: "old",
      // showErrorModal: false,
      modalshow: false,
      ManagerName: "",
      hideMangerName: false,
      managerContact: "",
      hidemanagerContact: false,
      managerEmail: "",
      hidemanagerEmail: false,
      defaultPIN: "",
      defaultPIN1: "",
      defaultAddress: "",
      defaultAddress1: "",
      hideAddress: false,
      adress_show: true,
      showfulladdress: false,
      hidedefaultAdd: true,
      updatePIN: "",
      updateAddress: "",
      addressdepth: {},
      addressdepthNew: {},
      error: {},
      nxtdefaultAddress: true,
      nxtupdateAddress: false,
      detailed_addr_default: "",
      detailed_addr_updated: "",
    };
  },
  created() {
    this.jobpostservice = new jobPostingService();
  },

  watch: {
    modalshow(newVal, oldVal) {
      if (newVal) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "auto";
      }
    },
  },
  methods: {
    button_clicked() {
      setTimeout(() => {
        window.scrollTo(
          0,
          document.body.scrollHeight || document.documentElement.scrollHeight
        );
      }, 100);
    },
    handleAddress(data) {
      this.updatePIN = data.zonecode;
      this.updateAddress = data.address;
      this.modalshow = false;
      console.log(data);
      this.setdepth(data.address);
    },
    // closeErrorModal (){
    //   this.showErrorModal = false;
    // },
    setdepth(searchdata) {
      this.loading.state = true;
      fetch(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${searchdata}`,
        {
          method: "get",
          headers: {
            Authorization: `KakaoAK 5118e62bb72b728896d88de20f4b265b`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          this.addressdepthNew = data.documents[0].address;
          console.log("Success:", data.documents[0].address);
          this.loading.state = false;
        })
        .catch((error) => {
          console.error("Error:", error);
          this.loading.state = false;
        });
    },
    seteditData() {
      const edata = this.commonstore.state.edata;
      if (this.$route.name == "NoticeRegistrationEdit") {
        this.ManagerName = edata.contact_name;
        this.hideMangerName = edata.is_private_name == 0 ? false : true;
        this.managerContact = edata.contact_person_num;
        this.hidemanagerContact =
          edata.is_private_person_num == 0 ? false : true;
        this.managerEmail = edata.contact_email;
        this.hidemanagerEmail = edata.is_private_email == 0 ? false : true;
        this.defaultPIN = edata.workarea_code;
        this.defaultAddress = edata.workarea_address;
        this.hideAddress = edata.is_private_address == 0 ? false : true;
        this.detailed_addr_default = edata.job_detail_address;
        this.addressdepth = {
          region_1depth_name: edata.region_1st_depth_name,
          region_2depth_name: edata.region_2nd_depth_name,
          region_3depth_h_name: edata.region_3rd_depth_name,
          y: edata.lat, //latitude
          x: edata.long, //longitude
        };
        // this.updatePIN = edata.contact_name;
        // this.updateAddress = edata.contact_name;
      }
    },
    submitData() {
      // if (this.nxtupdateAddress == true && this.updatePIN != "" && this.updateAddress != "") {
      //   this.defaultPIN = this.updatePIN;
      //   this.defaultAddress = this.updateAddress;
      // }
      let vcheckData;
      if (this.nxtupdateAddress == true) {
        vcheckData = {
          mName: this.ManagerName,
          mContact: this.managerContact,
          mEmail: this.managerEmail,
          cPIN: this.updatePIN,
          cAddr: this.updateAddress,
        };
      } else if (this.nxtdefaultAddress == true) {
        vcheckData = {
          mName: this.ManagerName,
          mContact: this.managerContact,
          mEmail: this.managerEmail,
          cPIN: this.defaultPIN,
          cAddr: this.defaultAddress,
        };
      }
      const { isInvalid, error } = companyinfoValidation(vcheckData);
      if (isInvalid) {
        this.error = error;
        // this.showErrorModal = true;
        this.commonstore.methods.displayRequiredToast();
        console.log(error);
      } else {
        this.error = {};
        window.scrollTo(0, 0);
        localStorage.setItem("jobstep", "step1");
        this.$emit("passData", {
          name: this.ManagerName,
          hideName: this.hideMangerName,
          phone: this.managerContact,
          hidePhone: this.hidemanagerContact,
          email: this.managerEmail,
          hideEmail: this.hidemanagerEmail,
          ZCode_default: this.defaultPIN,
          ZAddress_default: this.defaultAddress,
          hide_Addres: this.hideAddress,
          New_zCode: this.updatePIN,
          New_zAddress: this.updateAddress,
          add_depth: this.addressdepth,
          add_Newdepth: this.addressdepthNew,
          addresscheck: this.addressradio,
          detailedAddrDefault: this.detailed_addr_default,
          detailedAddrUpdated: this.detailed_addr_updated,
        });
      }
    },
  },
  mounted() {
    console.log(this.commonstore.state.edata);
    console.log(this.$route.name);
    this.jobpostservice
      .getRecuiterDetails()
      .then((res) => {
        // console.log(res.data);
        this.defaultPIN = res.data.company_info.company_postal_code;
        this.defaultAddress = res.data.company_info.company_address;
        this.defaultPIN1 = res.data.company_info.company_postal_code;
        this.defaultAddress1 = res.data.company_info.company_address;
        this.addressdepth = {
          region_1depth_name: res.data.region_1st_depth,
          region_2depth_name: res.data.region_2nd_depth,
          region_3depth_h_name: res.data.region_3rd_depth,
          y: res.data.lat, //latitude
          x: res.data.long, //longitude
        };
        this.ManagerName = res.data.company_info.contact_person;
        this.managerContact = res.data.phone_number;
        this.managerEmail = res.data.email;
        this.detailed_addr_default = res.data.detail_address;
      })
      .catch((err) => console.log(err));
  },
};
</script>
<style>
.modalone {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
.vue-daum-postcode-container {
  height: 350px !important;
  max-width: 330px;
  margin: 0 auto;
  border-radius: 8px !important;
  overflow: hidden;
}
</style>
