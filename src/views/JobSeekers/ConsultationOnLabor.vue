<template>
   <div class="back-wh">  
         <div class="top-hdr top-hdr-br">
            <div class="container">
                <InnerHeader headerTitle="노무 상담하기" @backButtonPressed="store.state.fromPage == 'mypage'? $router.push('/job-seekers/my-page') : $router.push({ name: 'home'})"  />
                <!-- <h4 class="heading">
                    <a href="javascript:void(0);" class="left-arrow">
                <img src="@/assets/icons/left-arrow.svg" @click="$router.go(-1)" alt="" />
                </a>노무 상담하기
                </h4> -->
            </div>
        </div> 
        <div class="pb-32">
            <div class="container">
                <div class="labor-top">
                    <h3 class="sub-heading lg">노무 상담하기</h3>
                    <p>노동관계 분야 전반에 대한 사항을 분석하여 합리적인 개선방안을 제시하며, 근로자의 법률문제를 상담합니다.</p>
                </div>
                <div class="text-right">
                    <button class="btn btn-primary" @click="openConsultationForm">상담 작성하기 <span class="edt"><img src="@/assets/icons/edit.svg" alt="" /></span></button>
                </div>
            </div>
        </div>
        <div class="border-top"> 
            <div class="cm-top-space pb-32">
                <div class="container">   
                    <div class="sub-otr mb-16 b-color">
                        <h3 class="sub-heading mb-0">상담 리스트</h3>
                    </div> 
                    <!-- Code For No Data -->

                    <div class="no-data-otr" v-if="consultationOfLaborData.lists.length === 0">
                        <NoData>
                        <template v-slot:no-data-image>
                            <img class="no-job-icon" src="@/assets/icons/no-job-icon.svg" alt="" />
                        </template>
                        <template v-slot:no-data-content>
                            <p><span>작성된 내역이 없습니다.</span></p>
                            <p>상담이 필요하다면 언제든지 문의해 주세요.</p>
                        </template>
                    </NoData> 
                </div>
                <div v-if="consultationOfLaborData.lists.length > 0">

                    <ul class="consultation-list">
                        <li v-for="(i, e) in consultationOfLaborData.lists" :key="e">
                            <div class="c-list-top c-list-top-right" @click="openDetailsModal(i.id, i.password)">
                                <h3 v-if="i.title.length > 28" class="sub-heading mb-0"><span class="img-spn" v-if="i.password !== null"><img src="@/assets/icons/lock-icon.svg" alt="" /></span><label>{{i.title.substring(0, 28)}}...</label></h3>
                                <h3 v-if="i.title.length < 28" class="sub-heading mb-0"><span class="img-spn" v-if="i.password !== null"><img src="@/assets/icons/lock-icon.svg" alt="" /></span><label>{{i.title}}</label></h3>
                                <!-- {{i.title.substring(0, 28)}} <span v-if="i.title.length > 28">...</span> -->
                                <span>{{store.methods.dateFormat(i.created_at, "YYYY.MM.DD")}}</span>
                            </div>
                            <div v-if="i.answer !== null" class="answer" @click="openDetailsModal(i.id, i.password)">
                                <p><em><img src="@/assets/icons/share-icon.svg" alt="" /></em>답변입니다</p>
                                <span>{{store.methods.dateFormat(i.updated_at, "YYYY.MM.DD")}}</span>
                            </div>
                        </li>   
                    </ul>
                    <!-- <Pagination
                    :totalRecords="consultationOfLaborData.totalItem"
                    v-on:setNumber="setPage($event)"
                />  -->
                <VuePaginate
                    :limit="consultationOfLaborData.limit"
                    :page="consultationOfLaborData.page"
                    :totalItems="consultationOfLaborData.totalItem"
                    v-on:setNumber="setPage($event)"
                  />
                </div>                    
                </div>  
            </div>
        </div>
    </div>
    <PasswordForm
    :isModal="isShowModal"
    :errors="errors"
    :consultationId="consultationId"
    @closeModal="isShowModal = false"
    @confirm="confirmPassword"
  />

</template>


<script>

  import NoData  from '@/components/NoData.vue';
  import { inject, watch } from "vue";
  import Pagination from "@/components/Pagination.vue";
  import consultationOnLaborPasswordValidate from "../../Validations/consultationOnLaborPassword";
  import PasswordForm from "../../components/Modals/PasswordForm.vue";
  import InnerHeader from "@/components/innerHeader.vue";
  import { reactive, ref } from "@vue/reactivity";
  import { onBeforeMount } from "@vue/runtime-core";
  import { ConsultationOfLaborService } from '../../service/API/ConsultationOfLabor';
  import VuePaginate from "@/components/Utils/VuePaginate.vue";
  import { useRouter } from 'vue-router';
  export default {
    name: "ConsultationOnLabor",
    components: {
    NoData,
    Pagination,
    PasswordForm,
    InnerHeader,
    VuePaginate,
    },
    setup() {
    const store = inject("commonStore");
    const router = useRouter();
    const isShowModal = ref(false)
    const errors = ref({});
    const consultationId = ref(null)
    const consultationOfLaborData = reactive({
      limit: 10,
      page: 1,
      totalItem: 0,
      lists: [],
    });

    onBeforeMount(async () => {
      await consultationOfLaborList();
    });

    const consultationOfLaborList = async () => {
      window.scrollTo(0, 0);
      let res = await ConsultationOfLaborService.consultationList(
        consultationOfLaborData.page,
        consultationOfLaborData.limit
      );
      console.log(res.data)
      consultationOfLaborData.totalItem = res.data.total_records;
      consultationOfLaborData.lists = res.data.consultations;
    
    };

    const openDetailsModal = async (id, password) => {
        consultationId.value = id
        if (password !== null) {
            errors.value = {}
            isShowModal.value = true
        } else {
            router.push({name: 'LaborConsultationAnswerO', params: {id: id}})
        }
    };

    // for pagination getting page no.
    const setPage = (event) => {
        consultationOfLaborData.page = event;
        consultationOfLaborList();
    };

    const openConsultationForm = () => {
        router.push({name: 'CreateConsultaion'})
    };

    watch(() => isShowModal.value, async (first, second) => {
        if (isShowModal.value == true) {
          document.documentElement.style.overflow = "hidden";
        } else {
          document.documentElement.style.overflow = "auto";
        }
    });

    const checkValid = (password) => {
      let checkData = {
        password: password
      };
      const { isInvalid, error } = consultationOnLaborPasswordValidate(checkData);
      if (isInvalid) {
        errors.value = error;
        return false;
      } else {
        errors.value = {};
        return true;
      }
    };

    const confirmPassword = async (id, password) => {
        try{ 
            if (!checkValid(password)) {
                return;
            } else {
                let res = await ConsultationOfLaborService.consultationDetails(
                id, password
                );
                isShowModal.value = false
                router.push({name: 'LaborConsultationAnswerO', params: {id: id}, query: {password: password}})
            }
        } catch (e) {
            console.log(e)
            Object.assign(errors.value, {password: '비밀번호가 일치하지 않습니다.'}) 
        }
      
    };

    return {
        consultationOfLaborData,
        isShowModal,
        consultationId,
        errors,
        store,
        openConsultationForm,
        setPage,
        openDetailsModal,
        confirmPassword
    };
  },
  };
  </script>
  
  