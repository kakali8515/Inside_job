<template>
    <div>
    <div class="back-wh">
        <div class="top-hdr m-0 top-hdr-br">
            <div class="container">
                <h4 class="heading"><a href="javascript:void(0);" class="left-arrow">
                <img src="@/assets/icons/left-arrow.svg" @click="$router.go(-1)" alt="" /></a>상담 작성</h4>
            </div>
        </div>
    </div>
    <form>
        <div class="form-wrapper">
            <form>
                <div class="back-wh border-top  border-f2">
                    <div class="cm-top-space pb-32">
                        <div class="container">
                            <div class="sub-otr b-color">
                                <h3 class="sub-heading mb-0">상담 제목</h3>
                            </div> 
                            <div class="form-group mb-0">
                               <input type="text" class="form-control" v-model.trim="consultationOfLaborData.title" placeholder="제목을 입력해주세요" />
                               <small v-if="errors && errors.title" class="error-msgsign">{{errors.title}}</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="back-wh border-top border-f2">
                    <div class="cm-top-space pb-32">
                        <div class="container">
                            <div class="sub-otr b-color">
                                <h3 class="sub-heading mb-0">상담 내용</h3>
                            </div> 
                            <div class="form-group mb-0">
                                <!-- <textarea class="form-control" v-model.trim="consultationOfLaborData.consultation" maxlength="2000" placeholder="문의 내용을 입력해주세요"></textarea> -->
                                <textarea @input="(e) => setSelfIntro(e)" class="form-control" :value="selfIntro" ref="consultation" placeholder="문의 내용을 입력해주세요"></textarea>
                                <div class="count">
                                    <span class="count-txt" @click="reInitialize"
                                        ><img src="@/assets/icons/initialization.svg" alt="" />
                                        초기화</span
                                    >
                                    <p>
                                        <span>{{ selfIntro && selfIntro?.length }}</span> /2000
                                    </p>
                                </div>
                                <small v-if="errors && errors.consultation" class="error-msgsign">{{errors.consultation}}</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="back-wh border-top border-f2">
                    <div class="cm-top-space pb-32">
                        <div class="container">
                            <div class="sub-otr b-color">
                                <h3 class="sub-heading mb-0">비밀글 설정</h3>
                            </div>
                            <div class="check-list squre">
                                <label class="check-input"> 해당 문의글을 <span>비밀글</span>로 설정하시겠습니까?
                                    <input type="checkbox" v-model="locked" :disabled="(consultationOfLaborData.title == '' || consultationOfLaborData.consultation == '')">
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                            <div class="form-group" v-if="locked == true">
                                <label>비밀번호 입력</label>
                                <div class="password-input">
                                    <input :type="passwordFieldType" maxlength="16" v-model="consultationOfLaborData.password" class="form-control" placeholder="**********" />
                                    <!-- <span @click="switchVisibility" class="eye"><img src="@/assets/icons/eye.svg" alt="" /></span> -->
                                    <span @click="switchVisibility" v-if="passwordFieldType !== 'password'" class="eye"><img src="@/assets/icons/eye.svg" alt="" /></span>
                                    <span @click="switchVisibility" v-else class="eye"><img src="@/assets/icons/eye-open.svg" alt=""/></span>
                                    <small v-if="passwordError !== '' && locked == true" class="error-msgsign">{{passwordError}}</small>
                                </div>
                            </div>
                            <div class="btnn-group">
                                <div class="btn-group-innr">
                                    <button type="button" @click="isShowModal = true"  class="btn btn-primary-outline lg">취소</button>
                                </div>
                                <div class="btn-group-innr">
                                    <button type="button" @click="submitConsultation" class="btn btn-primary lg" >{{buttonName}}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
   </form>
   <CancelConsultationModal
    :isModal="isShowModal"
    @closeModal="isShowModal = false"
    @cancelConfirm="openConsultationListPage()"
  />
    <div class="required-fields-icon" v-if="commonStore.state.requiredToastMsgShow">
        <p><span><img src="@/assets/icons/check-circle.svg" alt="" /></span> 필수 입력값을 확인해 주세요.</p>
    </div>
</div>
  </template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { onBeforeMount, inject  } from "@vue/runtime-core";
//import EmploymentContractUnwrittenModal from "@/components/Modals/EmploymentContractUnwrittenModal.vue";
import consultationOnLaborValidate from "../../../Validations/consultationOnLabor";
//import consultationOnLaborPasswordValidate from "../../../Validations/consultationOnLaborPassword";
import CancelConsultationModal from "../../../components/Modals/CancelConsultation.vue";
import { ConsultationOfLaborService } from '../../../service/API/ConsultationOfLabor';
import { useRouter, useRoute } from 'vue-router';
export default {
  name: "RecruiterCreateConsultaion",
  components: {
      CancelConsultationModal,
      //EmploymentContractUnwrittenModal,
  },
  setup() {
     const errors = ref({});
     const router = useRouter();
     const route = useRoute()
     const commonStore = inject("commonStore");
     const isShowModal = ref(false)
     const locked = ref(false)
     const buttonName = ref('작성 완료하기')
     const passwordFieldType = ref('password')
     const passwordError = ref('')
     const consultationOfLaborData = reactive({
          title: '',
          consultation: '',
          password: ''
     });
     const consultation = ref(null);
     const selfIntro = ref("");

  onBeforeMount(async () => {
      if (Object.keys(route.query).length !== 0) {
          await fetchConsultationData()
          buttonName.value = '수정하기'
      }
  });

  const setSelfIntro = (event) => {
      console.log("event", event);
      console.log(consultation.value.value.length, consultation.value.maxLength);
      selfIntro.value = event.target.value;
      if (
        consultation.value.value.length > 2000 &&
        event.inputType != "deleteContentBackward"
      ) {
        // alert("input method called");
        // event.preventDefault();

        selfIntro.value = consultation.value.value.slice(0, 2000);
        console.log("input method called");
        consultation.value.blur();
        return false;
      }
      // else {
      //   console.log("set val", event.target.value);
      //   selfIntro.value = event.target.value;
      // }
    };
    const reInitialize = () => {
      selfIntro.value = "";
      // resumeStore.state.selfIntro = "";
    };

  const fetchConsultationData = async () => {
      try{ 
          let data = {}
          if (Object.keys(route.query).length !== 0) {
              let res = await ConsultationOfLaborService.consultationDetails(
              route.query.id, route.query.password
          );
          consultationOfLaborData.title = res.data.title
          consultation.value = res.data.consultation
          selfIntro.value = res.data.consultation
          consultationOfLaborData.password = res.data.password
           
          } else {
              let res = await ConsultationOfLaborService.consultationDetails(
              route.params.id
          );
          consultationOfLaborData.title = res.data.title
          consultation.value = res.data.consultation
          consultationOfLaborData.password = res.data.password
          }
          if(consultationOfLaborData.password !==  null) {
              locked.value = true
          }
          
      } catch (e) {
          console.log(e)
      }
    
  };

  const checkValidate = (data) => {
      const { isInvalid, error } = consultationOnLaborValidate(data);
      if (isInvalid) {
        errors.value = error;
        commonStore.methods.displayRequiredToast()
        //console.log(errors.value, "check error");
        return false;
      } else {
        errors.value = {};
        return true;
      }
    };


    // const checkValidPassword = (password) => {
    //   let checkData = {
    //     password: password
    //   };
    //   const { isInvalid, error } = consultationOnLaborPasswordValidate(checkData);
    //   if (isInvalid) {
    //     passwordError.value = error.password;
    //     //console.log(errors.value, "check error");
    //     return false;
    //   } else {
    //     errors.value = {};
    //     return true;
    //   }
    // };

  const submitConsultation = async () => {
      let data = {
                title: consultationOfLaborData.title,
                consultation: consultation.value.value,
                password: consultationOfLaborData.password
            }
            if (locked.value == false) {
                delete data.password
                if (checkValidate(data)) { 
                    if (Object.keys(route.query).length !== 0) {
                        await updateConsultation(data)
                    } else {
                        await saveConsultation(data)
                    }
                }
            } else {
                if(data.password == null || data.password == '') {
                    passwordError.value = '필수 입력항목입니다.'
                    commonStore.methods.displayRequiredToast()
               } else {
                if (checkValidate(data)) { 
                    if (Object.keys(route.query).length !== 0) {
                        await updateConsultation(data)
                    } else {
                        await saveConsultation(data)
                    }
                }
               }
            //    else if (!checkValidPassword(data.password)) {
            //         return;
            //     }
                
            } 
  }

  const updateConsultation = async (data) => {
      try{
          let res = await ConsultationOfLaborService.editConsultation(route.query.id, data);
          router.push({name: 'RecruiterConsultationOnLabor'})
      } catch(e) {
          console.log(e)
      }
  }

  const saveConsultation = async (data) => {
      try{
          let res = await ConsultationOfLaborService.addConsultation(
              data
          );
          openConsultationListPage()
      } catch (e) {
          console.log(e)
      }
    
  };

  const switchVisibility = () => {
      passwordFieldType.value = passwordFieldType.value === 'password' ? 'test' : 'password'
  }

  const openConsultationListPage = () => {
      router.push({name: 'RecruiterConsultationOnLabor'})
  };

  return {
      consultationOfLaborData,
      isShowModal,
      passwordFieldType,
      locked,
      buttonName,
      errors,
      passwordError,
      commonStore,
      switchVisibility,
      saveConsultation,
      openConsultationListPage,
      fetchConsultationData,
      updateConsultation,
      submitConsultation,
      reInitialize,
      setSelfIntro,
      consultation,
      selfIntro
      
  };
}
}
</script>
  
  