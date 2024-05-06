<template>
  <div class="back-wh common-sec pb-80">
    <div class="top-hdr top-hdr-br">
      <div class="container">
        <InnerHeader headerTitle="기업정보 수정" />
      </div>
    </div>
    <div class="form-wrapper label-4">
      <form>
        <div class="container">
          <div class="form-group mb-16">
            <label>기업 프로필 이미지</label>
            <div class="file-input edit-comp-profile">
              <!-- <input
                type="file"
                name="file-input"
                id="file-input"
                class="file-input__input"
                ref="file"
                accept="image/gif,image/jpg,image/jpeg,image/png"
                hidden
                @change="onFileChange"
              /> -->

              <div class="profile-img-otr">
                <div class="image-wrap">
                  <!-- <img src="@/assets/images/image.png" alt=""
                /> -->
                  <span>
                    <img
                      v-if="memberData.company_profile_img !== null"
                      id="blah"
                      :src="memberData.company_profile_img"
                    />
                    <img v-else src="@/assets/images/image.png" />
                  </span>
                </div>

                <!-- <em
                  class="cross"
                  v-if="memberData.company_profile_img !== null"
                  @click="removeProfileImageTemporary"
                  ><img src="@/assets/icons/profile-cross-icon.svg" alt=""
                /></em>
                <label class="file-input__label" for="file-input">
                  <em class="edit"
                    ><img src="@/assets/icons/edit-icon.svg" alt=""
                  /></em>
                </label> -->
              </div>

              <!-- <label class="file-input__label" for="file-input">
                <span>
                  <img
                    v-if="memberData.company_profile_img == null"
                    src="@/assets/images/image.png"
                  />
                  <img v-else id="blah" :src="memberData.company_profile_img" />
                </span>
                
                <em class="edit"
                  ><img src="@/assets/icons/edit-icon.svg" alt=""
                /></em>
              </label> -->
            </div>
          </div>
          <div class="form-group">
            <label>기업명</label>
            <input
              type="text"
              placeholder="알바알바"
              class="form-control"
              v-model.trim="memberData.details.company_name"
            />
            <small
              v-if="memberData.errors && memberData.errors.company_name"
              class="error-msgsign"
              >{{ memberData.errors.company_name }}</small
            >
          </div>
          <div class="form-group" v-if="isFieldHide == true">
            <label>기업주소</label>
            <div class="group mb-12">
              <div class="group-input">
                <input
                  type="text"
                  class="form-control"
                  placeholder="123123"
                  maxlength="5"
                  v-model.trim="memberData.details.company_postal_code"
                  readonly
                />
                <small
                  v-if="
                    memberData.errors && memberData.errors.company_postal_code
                  "
                  class="error-msgsign"
                  >{{ memberData.errors.company_postal_code }}</small
                >
              </div>
              <button
                type="button"
                class="btn btn-primary-outline"
                @click="findAdd('address')"
              >
                주소찾기
              </button>
            </div>
            <input
              type="text"
              placeholder="서울 00구 00로 111-1"
              class="form-control"
              v-model.trim="memberData.details.company_address"
              readonly
            />
            <small
              v-if="memberData.errors && memberData.errors.company_address"
              class="error-msgsign"
              >{{ memberData.errors.company_address }}</small
            >
          </div>
          <div class="form-group">
            <label>상세 주소<span class="gr">[선택]</span></label>
            <div class="group-input">
              <input
                class="form-control"
                v-model="memberData.details.detailed_addr"
                placeholder="상세 주소"
              />
            </div>
          </div>
          <div class="form-group">
            <label>담당자명</label>
            <input
              type="text"
              placeholder="김알바"
              class="form-control"
              v-model.trim="memberData.details.company_contact_person"
            />
            <small
              v-if="
                memberData.errors && memberData.errors.company_contact_person
              "
              class="error-msgsign"
              >{{ memberData.errors.company_contact_person }}</small
            >
          </div>
          <div class="form-group">
            <label>산업군</label>
            <!-- <select class="form-control" v-model="memberData.details.industry">
              <option
                v-for="option in memberData.industryType"
                :value="option.id.toString()"
                :key="option.id"
              >
                {{ option.text }}
              </option> -->
            <!-- <option value="1">서비스</option>
              <option value="2">서비스</option> -->
            <!-- </select> -->
            <!-- {{ memberData.industryType }} -->
            <!-- {{ memberData.details.industry }} -->
            <selectoption
              class="my-dropdown-toggle salary-drop"
              :options="memberData.industryType"
              :selected="memberData.details.industry"
              v-on:updateOption="levelset($event)"
              :placeholder="'일급'"
              :closeOnOutsideClick="boolean"
              ref="child"
            >
            </selectoption>
          </div>
          <div class="form-group">
            <label>직원수</label>
            <input
              :type="inputType()"
              placeholder="직원수를 입력해 주세요"
              class="form-control"
              @keypress="onlyNumber"
              v-model.trim="memberData.details.no_of_employees"
            />
            <small
              v-if="memberData.errors && memberData.errors.no_of_employees"
              class="error-msgsign"
              >{{ memberData.errors.no_of_employees }}</small
            >
          </div>
          <div class="form-group mb-0">
            <label>소개글</label>
            <textarea
              id="textarea"
              class="form-control"
              placeholder="소개글을 입력해 주세요…"
              v-model.trim="memberData.details.company_introduction"
              maxlength="500"
              @input="updateTextareaValue"
            ></textarea>
            <!-- @input="getLength(memberData.details.company_introduction)" -->
            <!-- <small
              v-if="memberData.errors && memberData.errors.company_introduction"
              class="error-msgsign"
              >{{ memberData.errors.company_introduction }}</small
            > -->
            <div class="count">
              <span class="count-txt" @click="resetData"
                ><img src="@/assets/icons/initialization.svg" alt="" />
                초기화</span
              >
              <p>
                <span>{{
                  memberData.details.company_introduction !== null
                    ? textareaValueLength
                    : 0
                }}</span>
                /500
              </p>
            </div>
          </div>
        </div>
        <div class="btm-button-group fixed-btn-otr mt-64">
          <button
            type="button"
            class="btn btn-primary lg"
            @click="editCompanyInfo()"
          >
            수정하기
          </button>
          <!-- <a href="#" class="btn btn-primary lg">수정하기</a> -->
        </div>
      </form>
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
    <VueDaumPostcode
      @complete="handleAddress"
      class="modalone"
      v-show="memberData.modalshow"
    ></VueDaumPostcode>
    <LoadingBar v-if="loading.state" :loadingMsg="loading.message" />
  </div>
</template>

<script>
import InnerHeader from "@/components/innerHeader.vue";
import { CompanyInfo } from "@/service/API/CompanyInfo.js";
import { profile } from "@/service/API/profile.js";
import { occupationService } from "@/service/API/occupation.js";
import { useRouter } from "vue-router";
import { computed, inject, onMounted, ref, watch } from "@vue/runtime-core";
import { reactive } from "@vue/reactivity";
import validateCompany from "@/Validations/editCompany.js";
import { useCookies } from "vue3-cookies";
import selectoption from "@/components/selectOption.vue";
import LoadingBar from "@/components/Utils/LoadingBar.vue";
export default {
  name: "RecruiterEditcompanyInformation",
  components: {
    InnerHeader,
    selectoption,
    LoadingBar,
  },
  data() {
    return {
      cookies: new useCookies(),
      isFieldHide: JSON.parse(this.$cookies.get("isfieldHide")),
    };
  },
  setup() {
    const commonstore = inject("commonStore");
    const router = useRouter();
    const child = ref(null);
    const loading = reactive({
      state: false,
      message: "잠시만 기다려 주세요.",
    });
    const memberData = reactive({
      details: {
        company_name: "",
        company_postal_code: "",
        company_address: "",
        company_contact_person: "",
        industry: [],
        no_of_employees: "",
        company_introduction: "",
        region_1st_depth: "",
        region_2nd_depth: "",
        region_3rd_depth: "",
        y: "", //lat
        x: "", //lng
        detailed_addr: "",
      },
      file: undefined,
      fileName: "",
      company_profile_img: "src/assets/images/image.png",
      errors: {},
      isMemberConfirmModal: false,
      alladdr: "",
      modalshow: false,
      //   countDown: "180",
      cdnReset: false,
      defaultbtn: "인증하기",
      otpsendbtn: true,
      timerDisplay: "",
      formData: new FormData(),
      //   old_phone_number: '',
      isChangeBtnDisabled: true,
      industryType: [],
      lengthOfIntro: 0,
    });

    onMounted(async () => {
      await getIndustryType();
      await getCompanyInfo();
    });

    // watch(() => memberData.details.company_introduction, (newValue) => {
    //   memberData.details.lengthOfIntro = newValue !== null ? newValue.length : 0
    // })

    watch(
      () => memberData.modalshow,
      (newVal, oldVal) => {
        if (newVal) {
          document.documentElement.style.overflow = "hidden";
        } else {
          document.documentElement.style.overflow = "auto";
        }
      }
    );

    const textareaValueLength = computed(
      () => memberData.details.company_introduction.length
    );
    function updateTextareaValue(event) {
      memberData.details.company_introduction = event.target.value.trim();
    }
    function getLength(title) {
      memberData.details.lengthOfIntro = title !== null ? title.length : 0;
    }

    function levelset(payload) {
      console.log(memberData.details.industry);
      memberData.details.industry = payload;
      // alert(payload);
      // console.log(memberData.details.industry);
    }
    async function getIndustryType() {
      let res = await occupationService.occupationPrimary();
      if (res.status === 200) {
        memberData.industryType = res.data;
        // getCompanyInfo();
      }
    }

    async function getCompanyInfo() {
      let res = await CompanyInfo.getCompanyInfo();
      if (res.status === 200) {
        console.log("jjgg", res.data.company_info.no_of_emp);
        memberData.details.company_name = res.data.company_info.company_name;
        memberData.details.company_postal_code =
          res.data.company_info.company_postal_code;
        memberData.details.company_address =
          res.data.company_info.company_address;
        memberData.details.company_contact_person =
          res.data.company_info.contact_person;
        memberData.details.region_1st_depth = res.data.region_1st_depth;
        memberData.details.region_2nd_depth = res.data.region_2nd_depth;
        memberData.details.region_3rd_depth = res.data.region_3rd_depth;
        memberData.details.y = res.data.lat;
        memberData.details.x = res.data.long;
        memberData.details.detailed_addr = res.data.detail_address;
        memberData.company_profile_img =
          res.data.company_info.company_profile_img;
        memberData.details.company_introduction =
          res.data.company_info.introduction;
        memberData.details.lengthOfIntro =
          res.data.company_info.introduction !== null
            ? res.data.company_info.introduction.length
            : 0;
        // memberData.details.industry = res.data.company_info.industry.toString();
        // memberData.details.industry = memberData.industryType.find(
        //   (obj) => obj.id === res.data.company_info.industry
        // );
        if (res.data.company_info.industry == null) {
          memberData.details.industry = "";
        } else {
          memberData.details.industry = memberData.industryType.find(
            (obj) => obj.id === res.data.company_info.industry
          );
          child.value.updateOption(memberData.details.industry);
        }
        // memberData.details.industry.id = memberData.details.industry
        // if(res.data.company_info.industry !== null) {
        // child.value.updateOption(memberData.details.industry);
        // }
        memberData.details.no_of_employees =
          res.data.company_info.no_of_emp == null
            ? null
            : res.data.company_info.no_of_emp.toString();
        // levelset(memberData.details.industry);
        // setTimeout(() => {
        //   levelset(memberData.details.industry);

        // }, 3000);

        // console.log(
        //   memberData.industryType.find(obj => obj.id === res.data.company_info.industry)
        // );
      }
    }
    //--------------------------------------------------------------------------
    function setdepth(searchdata) {
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
          memberData.details.region_1st_depth =
            data.documents[0].address.region_1depth_name;
          memberData.details.region_2nd_depth =
            data.documents[0].address.region_2depth_name;
          memberData.details.region_3rd_depth =
            data.documents[0].address.region_3depth_h_name;
          memberData.details.y = data.documents[0].address.y; //lat
          memberData.details.x = data.documents[0].address.x; //lng
          console.log("Success:", data.documents[0].address.y);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    //-----------------------------------------------------------------------------
    async function editCompanyInfo() {
      console.log(memberData.details.industry);
      let validationData = {
        company_name: memberData.details.company_name,
        company_postal_code: memberData.details.company_postal_code,
        company_address: memberData.details.company_address,
        company_contact_person: memberData.details.company_contact_person,
        industry:
          memberData.details.industry == ""
            ? null
            : memberData.details.industry.id.toString(),
        no_of_employees: memberData.details.no_of_employees,
        company_introduction: memberData.details.company_introduction,
        region_1st_depth: memberData.details.region_1st_depth,
        region_2nd_depth: memberData.details.region_2nd_depth,
        region_3rd_depth: memberData.details.region_3rd_depth,
        lat: memberData.details.y,
        long: memberData.details.x,
        c_detail_address:
          memberData.details.detailed_addr == ""
            ? null
            : memberData.details.detailed_addr,
      };
      let validation = validateCompany(validationData);
      if (validation.isInvalid) {
        commonstore.methods.displayRequiredToast();
        memberData.errors = validation.error;
        console.log("error", memberData.errors);
      } else {
        let res = await CompanyInfo.updateCompanyDeatils(validationData);
        if (res.status === 200) {
          await updateProfilePhoto(memberData.formData);
          // alert("기업 정보가 수정되었습니다.");
          if (!memberData.company_profile_img) {
            await removeProfileImage();
          }
          router.push("/recruiter/sns-login-setting");
          // memberData.isMemberConfirmModal = true;
        }
      }
    }

    function findAdd(addr) {
      memberData.alladdr = addr;
      memberData.modalshow = true;
    }
    function handleAddress(data) {
      console.log(data);
      setdepth(data.address);
      if (memberData.alladdr == "addressCompany") {
        memberData.details.company_postal_code = data.zonecode;
        memberData.details.company_address = data.address;
      }
      if (memberData.alladdr == "address") {
        memberData.details.company_address = data.address;
        memberData.details.company_postal_code = data.zonecode;
      }
      memberData.modalshow = false;
    }

    function onlyNumber($event) {
      //console.log($event)
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      //console.log(keyCode)
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      } else if (keyCode === 46) {
        // dot and zero are restricted from this condition
        $event.preventDefault();
      }
    }

    function inputType() {
      if (screen.width <= 480) {
        return "tel";
      } else {
        return "text";
      }
    }

    const resetData = () => {
      // memberData.details.company_name = ''
      // memberData.details.company_postal_code = ''
      // memberData.details.company_address = ''
      // memberData.details.company_contact_person = ''
      // memberData.details.industry = '1'
      // memberData.details.no_of_employees = ''
      // memberData.company_profile_img = ''
      memberData.details.company_introduction = "";
    };
    const onFileChange = async (e) => {
      var files = e.target.files || e.dataTransfer.files;
      const [file] = files;
      if (!files.length) return;
      memberData.file = files[0];
      console.log(memberData.file);
      var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      if (!allowedExtensions.exec(memberData.file.name)) {
        //this.render1 = true;
        memberData.fileName = "";
        return false;
      } else {
        //this.render1 = false;
        memberData.fileName = memberData.file.name;
        memberData.formData.append("image", files[0]);
      }
      //this.fileExtension = memberData.fileName.replace(/^.*\./, "");
      // await updateProfilePhoto(memberData.formData)
      memberData.company_profile_img = URL.createObjectURL(file);
    };

    const updateProfilePhoto = async (data) => {
      loading.state = true;
      try {
        let res = await CompanyInfo.updateProfilePic(data);
        loading.state = false;
      } catch (e) {
        console.log(e);
        loading.state = false;
      }
    };

    function removeProfileImageTemporary() {
      memberData.company_profile_img = null;
    }

    async function removeProfileImage() {
      let res = await profile.deleteProfilePic();
      // console.log(res);
      if (res.status == 200) {
        getCompanyInfo();
      }
    }

    return {
      memberData,
      getCompanyInfo,
      editCompanyInfo,
      findAdd,
      handleAddress,
      onlyNumber,
      inputType,
      resetData,
      onFileChange,
      levelset,
      child,
      removeProfileImage,
      loading,
      removeProfileImageTemporary,
      commonstore,
      getLength,
      textareaValueLength,
      updateTextareaValue,
      // verifyotp,
    };
  },
};
</script>

<style>
#blah {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
.modalone {
  display: block;
  /* Hidden by default */
  position: fixed;
  /* Stay in place */
  z-index: 1;
  /* Sit on top */
  padding-top: 100px;
  /* Location of the box */
  left: 0;
  top: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/ opacity */
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
.container {
  scroll-padding-bottom: 100px; /* adjust value as needed */
}
</style>
