<template>
    <div class="">
    <div class="back-wh pb-32">
        <!-- <div class="top-hdr m-0"> -->
            <div class="top-hdr no-border">
            <div class="container">
                <h4 class="heading mh-24"><a href="javascript:void(0);" class="left-arrow">
                <img src="@/assets/icons/left-arrow.svg" @click="$router.go(-1)" alt="" /></a></h4>
            </div>
            </div>
        <!-- </div> -->
        <form>
            <div class="form-wrapper">
                <div class="cm-top-space pt-0">
                    <div class="container">
                        <div class="sub-otr b-color d-flex">
                            <h3 class="sub-heading mb-0">상담 제목</h3>
                            <p v-if="consultationCreatedDate !== ''" class="date gray">{{store.methods.dateFormat(consultationCreatedDate, "YYYY.MM.DD")}}</p>
                        </div> 
                        <div class="form-group mb-0">
                            <input type="text" class="form-control" v-model="consultationOfLaborData.title" readonly />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <form>
        <div class="form-wrapper">
            <div class="back-wh border-top">
                <div class="cm-top-space pb-32">
                    <div class="container">
                        <div class="sub-otr b-color">
                            <h3 class="sub-heading mb-0">상담 내용</h3>
                        </div> 
                        <div class="form-group mb-0">
                            <textarea class="form-control" v-model="consultationOfLaborData.consultation" placeholder="" readonly></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="back-wh border-top pb-32">
                <div class="cm-top-space pb-32">
                    <div class="container lab-con-ans-area">
                        <div class="sub-otr b-color d-flex">
                            <h3 class="sub-heading mb-0">상담 답변</h3>
                            <p class="date gray" v-if="consultationOfLaborData.answer !== null">{{store.methods.dateFormat(answerDate, "YYYY.MM.DD")}}</p>
                        </div> 
                        <div class="form-group mb-0 ver-center-text">
                            <textarea class="form-control hgt" readonly v-model="consultationOfLaborData.answer" placeholder="등록된 답변이 없습니다."></textarea>
                        </div>
                    </div>
                </div>
            </div>
         </div>
   </form>
   <div v-if="(consultationOfLaborData.answer == null || consultationOfLaborData.answer == '') && userId == loggedInId " class="btm-button-group mt-32 w-50 fixed-btn-otr">
        <button @click="openDeleteConfirmModal" class="btn btn-primary-outline lg">삭제하기</button>
        <button @click="editConsultationPage" class="btn btn-primary lg">수정하기</button>
    </div>
    <DeleteConsultation
    :isModal="isShowModal"
    :consultationId="consultationId"
    @closeModal="isShowModal = false"
    @deleteConfirm="deleteConfirm"
  />
</div>

  </template>
<script>
  import { reactive, ref } from "@vue/reactivity";
  import { inject } from "vue";
  import { onBeforeMount } from "@vue/runtime-core";
  import DeleteConsultation from "../../components/Modals/DeleteConsultation.vue";
  import { ConsultationOfLaborService } from '../../service/API/ConsultationOfLabor';
  import { useRoute, useRouter } from "vue-router";
  export default {
    name: "LaborConsultationAnswerO",
    components: {
        DeleteConsultation
    },
    setup() {
    const store = inject("commonStore");
    const route = useRoute();
    const router = useRouter();
    const isShowModal = ref(false)
    const consultationId = ref('')
    const answerDate = ref('')
    const loggedInId = ref('')
    const userId = ref('')
    const consultationCreatedDate = ref('')
    const consultationOfLaborData = reactive({
        title: '',
        consultation: '',
        answer: ''
    });

    onBeforeMount(async () => {
      loggedInId.value = localStorage.getItem('user_id')
      await consultationData()
    });

    const consultationData = async () => {
        try{ 
            consultationId.value = route.params.id
            let data = {}
            if (Object.keys(route.query).length !== 0) {
                let res = await ConsultationOfLaborService.consultationDetails(
                route.params.id, route.query.password
            );
            consultationOfLaborData.title = res.data.title
            consultationOfLaborData.consultation = res.data.consultation
            consultationOfLaborData.answer = res.data.answer
            answerDate.value = res.data.updated_at
            consultationCreatedDate.value = res.data.created_at
            userId.value = res.data.user_id
             
            } else {
                let res = await ConsultationOfLaborService.consultationDetails(
                route.params.id
            );
            consultationOfLaborData.title = res.data.title
            consultationOfLaborData.consultation = res.data.consultation
            consultationOfLaborData.answer = res.data.answer
            answerDate.value = res.data.updated_at
            consultationCreatedDate.value = res.data.created_at
            userId.value = res.data.user_id
            }
            
        } catch (e) {
            console.log(e)
        }
      
    };

    const deleteConfirm = async (id) => {
        try{
            let res = await ConsultationOfLaborService.deleteConsultation(id);
            isShowModal.value = false
            router.push({name: 'ConsultationOnLabor'})
        } catch(e) {
            console.log(e)
        }
    }

    const editConsultationPage = async () => {
        let queryData = {
            id: route.params.id, 
            password: route.query.password
        }
        router.push({name: 'CreateConsultaion', query: queryData})
    }

    const openDeleteConfirmModal = async () => {
        isShowModal.value = true
    };

    return {
        consultationOfLaborData,
        isShowModal,
        consultationId,
        answerDate,
        userId,
        loggedInId,
        consultationCreatedDate,
        store,
        deleteConfirm,
        openDeleteConfirmModal,
        editConsultationPage
    };
  },
  };
  </script>
  <!-- <style scoped>
    textarea::placeholder {
        text-align: center;
    }
    
  </style> -->
  
  