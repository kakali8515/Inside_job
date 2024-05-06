<template>
  <div class="back-wh pb-24">
    <div class="top-hdr top-hdr-br">
      <div class="container">
        <h4 class="heading">
          <a href="javascript:void(0);" class="left-arrow" @click="$router.go(-1)">
            <img src="@/assets/icons/left-arrow.svg" alt="" /></a
          ><span v-if="loginType === 'job_recruiter'">인재 정보</span>
          <span v-else>이력서 상세</span>
          
          <!-- <a href="javascript:void(0);" class="bookmark-icon">
            <img src="@/assets/icons/bookmark-grey-icon.svg" alt=""
          /></a> -->
        </h4>
      </div>
    </div>
    <div class="container">
      <div class="sub-otr b-color">
        <h3 class="sub-heading mb-0">
          {{ applicantInfoData.details.resume_title }}
        </h3>
      </div>
      <div class="app-outr">
        <div class="app-innr">
          <div class="app-left">
            <figure class="profile-img">
              <img v-if="applicantInfoData.details.profile_image == null" src="@/assets/images/image.png" />
              <img v-else :src="applicantInfoData.details.profile_image" alt="" />
            </figure>
          </div>
          <div class="app-right">
            <h3 class="sub-heading mb-0">
              {{ applicantInfoData.details.name }}
            </h3>
            <ul class="app-list">
              <li v-if="applicantInfoData.details.gender === 'm'">남자</li>
              <li v-if="applicantInfoData.details.gender === 'f'">여자</li>
              <li>{{ applicantInfoData.details.age }}세</li>
            </ul>
            <p>
              <span><img src="@/assets/icons/star.svg" alt="" /></span>
              <span v-if="applicantInfoData.details.seeker_avg_rating == 0 || applicantInfoData.details.seeker_avg_rating == null || applicantInfoData.details.seeker_avg_rating == ''">5점</span>
              <span v-else>{{ applicantInfoData.details.seeker_avg_rating }}점</span>
            </p>
          </div>
        </div>
        <ul class="post-list">
          <li>
            <p class="p-left">근로자 주소</p>
            <p class="p-right">
              {{ applicantInfoData.details.region_1st_depth_name }}
              {{ applicantInfoData.details.region_2nd_depth_name }}
              {{ applicantInfoData.details.region_3rd_depth_name }}
            </p>
          </li>
          <li>
            <p class="p-left">상세 주소</p>
            <p class="p-right">
              {{ applicantInfoData.details.detail_address }}
            </p>
          </li>
          <li>
            <p class="p-left">연락처</p>
            <p class="p-right">{{ applicantInfoData.details.phone_number }}</p>
          </li>
          <li>
            <p class="p-left">이메일</p>
            <p class="p-right">{{ applicantInfoData.details.email }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="back-wh border-top">
    <div class="cm-top-space pb-24">
      <div class="container">
        <div class="sub-otr b-color">
          <h3 class="sub-heading mb-0">최종학력</h3>
        </div>
        <p class="c-txt" v-for="(item,i) in resumeLists.academics" :key="i" v-show="item.value === applicantInfoData.details.last_educational_background">
          <!-- {{item.name}} -->
          {{item.text}}
          <!-- {{ applicantInfoData.details.last_educational_background }} -->
        </p>
      </div>
    </div>
  </div>
  <div class="back-wh border-top">
    <div class="cm-top-space pb-32">
      <div class="container">
        <div class="sub-otr b-color">
          <h3 class="sub-heading mb-0">경력사항</h3>
        </div>
        <p class="date-box">
          지원자의 경력은 <span>총</span>
          <em>{{ applicantInfoData.details['0']?.years }}</em><span>년</span>
          <em>{{ applicantInfoData.details['0']?.months }}</em>
          <span>개월</span>입니다.
        </p>
        <div class="timeline-otr" :class="{ 'show-all': active }">
          <ul class="timeline">
            <li
              v-for="(item, i) in applicantInfoData.details.career_list"
              :key="i"
            >
              <CareerCard>
                <template v-slot:cr-date>
                  <span
                    >{{
                      commonStore.methods.dateFormat(
                        item.emp_period_from,
                        "YYYY.MM"
                      )
                    }}
                    ~
                    {{
                      commonStore.methods.dateFormat(
                        item.emp_period_until,
                        "YYYY.MM"
                      )
                    }}</span
                  >
                </template>
                <template v-slot:cr-title>
                  <h3 class="sb-heading">{{ item.company_name }}</h3>
                </template>
                <template v-slot:cr-link>
                  <a href="javascript:void(0);" class="detail-link">
                    {{ item.responsiblities }}
                  </a>
                </template>
              </CareerCard>
            </li>
          </ul>
          <a
            href="javascript:void(0);"
            class="vw-more-btn vw-more-btn-opacity"
            @click="active = !active"
          >
            <span class="more-txt"
              >더보기<img src="@/assets/icons/down-arrow.svg" alt=""
            /></span>
            <span class="fold-txt"
              >접기<img src="@/assets/icons/down-arrow.svg" alt=""
            /></span>
            <!-- <span>접기 <img src="@/assets/icons/up-arrow.svg" alt=""></span> -->
          </a>
        </div>
      </div>
    </div>
  </div>
  <div class="back-wh border-top">
    <div class="cm-top-space pb-32">
      <div class="container">
        <div class="sub-otr b-color">
          <h3 class="sub-heading mb-0">희망사항</h3>
        </div>
        <ul class="post-list">
          <li>
            <p class="p-left">희망근무지</p>
            <p class="p-right">
              {{ applicantInfoData.details.work_place_details }}
            </p>
          </li>
          <li>
            <p class="p-left">희망업직종</p>
            <p class="p-right">
              {{ applicantInfoData.details.occupation_details }}
            </p>
          </li>
          <!-- <li>
            <p class="p-left">근무형태</p>
            <p class="p-right">서울 송파구 000 000</p>
          </li> -->
          <li>
            <p class="p-left">근무기간</p>
            <p class="p-right" v-for="(item,i) in resumeLists.desiredPeriods" :key="i" v-show="item.value === applicantInfoData.details.employment_period_details">
              {{item.name}}
              <!-- {{ applicantInfoData.details.employment_period_details }} -->
            </p>
          </li>
          <li>
            <p class="p-left">근무일시</p>
            <p class="p-right" v-for="(item,i) in resumeLists.desiredDays" :key="i" v-show="item.value === applicantInfoData.details.workdate_details">
              {{item.name}}
              <!-- {{ applicantInfoData.details.workdate_details }} -->
            </p>
          </li>
          <li>
            <p class="p-left">근무시간</p>
            <p class="p-right" v-for="(item,i) in resumeLists.desiredHours" :key="i" v-show="item.value === applicantInfoData.details.workhours_details">
              {{item.name}}
              <!-- {{ applicantInfoData.details.workhours_details }} -->
            </p>
          </li>
          <li>
            <p class="p-left">고용형태</p>
            <p class="p-right" v-for="(item,i) in resumeLists.employmentType" :key="i" v-show="item.value === applicantInfoData.details.emp_types_details">
              {{item.name}}
              <!-- {{ applicantInfoData.details.emp_types_details }} -->
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="back-wh border-top">
    <div class="cm-top-space pb-32">
      <div class="container">
        <div class="sub-otr b-color">
          <h3 class="sub-heading mb-0">자기소개서</h3>
        </div>
        <div class="form-wrapper">
          <div class="form-group mb-0">
            <textarea
              readonly
              v-model="applicantInfoData.details.self_introduction"
              class="form-control"
              placeholder="안녕하십니까 김알바라고 합니다. 최고의 열정으로 회사와 함께 정상에 서고 싶습니다. 감사합니다."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="back-wh border-top pb-80">
    <div class="cm-top-space pb-32">
      <div class="container">
        <div class="sub-otr b-color">
          <h3 class="sub-heading mb-0">자기 PR</h3>
        </div>
        <div class="back">
          <h4 class="hdr">사진/동영상</h4>
          <SelfPRSlider :selfPrPhotoVideo="applicantInfoData.details.selfPrPhotoVideo" />
          <div
            class="pr-box-otr mt-12"
            v-for="(item, i) in applicantInfoData.details.selfPrPhotoVideo" :key="i"
          >
            <CareerCard>
              <template v-slot:cr-date>
                <span>{{ commonStore.methods.dateFormat(item.created_at, "YYYY년 M월 D일") }}</span>
              </template>
              <template v-slot:cr-title>
                <h3 class="sb-heading" v-if="item.type === 'image'">
                  {{ item.name }}
                </h3>
                <h3 class="sb-heading" v-else>{{ item.image_url }}</h3>
              </template>
              <template v-slot:cr-link>
                <span v-if="item.type === 'image'"
                  >사진
                  {{ item.size }} KB</span
                >
                 <span v-if="item.type === 'video'"
                  >동영상
                  {{ item.size }} KB</span
                >
              </template>
            </CareerCard>
          </div>
        </div>
        <div class="back mt-12">
          <h4 class="hdr">기타 문서</h4>
          <div class="pr-box-otr" >
            <CareerCard v-for="(item, i) in applicantInfoData.details.selfPrOtherDocs" :key="i">
              <template v-slot:cr-date>
                <span>{{ commonStore.methods.dateFormat(item.created_at, "YYYY년 M월 D일") }}</span>
              </template>
              <template v-slot:cr-title>
                <h3 class="sb-heading"  v-if="item.type === 'doc'">{{ item.name }}</h3>
                <h3 class="sb-heading"  v-if="item.type === 'url'">{{ item.doc_url}}</h3>
              </template>
              <template v-slot:cr-link>
                <span v-if="item.type === 'doc'"
                  >증명서
                  {{ item.size }} KB</span
                >
                 <span v-if="item.type === 'url'"
                  >포트폴리오
                  {{ item.size }} KB</span
                >
                <!-- <a href="javascript:void(0);" class="detail-link">
                  상세 내역
                </a> -->
              </template>
            </CareerCard>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="btm-button-group mt-32 fixed-btn-otr" v-if="loginType === 'job_recruiter'">
    <button
      class="btn btn-primary lg"
      @click="$route.query.fromPage === 'candidateConfirmation' ? $router.push({name: 'EmploymentContractWritingStepOne'}) : commonStore.state.isTalentPositionOffer = true"
    >
      <span v-if="$route.query.fromPage === 'candidateConfirmation'">근로계약서 작성하기</span>
      <span v-else>포지션 제안하기</span>
    </button>
  </div>

  <TalentPositionOffer
    v-if="commonStore.state.isTalentPositionOffer"
    :seekr_id="$route.params.seeker_id"
  />
</template>


<script>
import SelfPRSlider from "@/components/SelfPRSlider.vue";
import CareerCard from "@/components/CareerCard.vue";
import TalentPositionOffer from "@/views/Recruiter/TalentSearch/TalentPositionOffer.vue";
import { inject, onMounted, reactive, ref, watch } from "@vue/runtime-core";
import { resume } from "@/service/API/resume.js";
import { useRouter } from "vue-router";
import { resumeLists } from "@/config/resumeOptions.js";

export default {
  name: "ApplicantInformation",
  components: { SelfPRSlider, CareerCard, TalentPositionOffer },
  setup() {
    const commonStore = inject("commonStore");
    const active = ref(false);
    const loginType = localStorage.getItem('login_type');
    const router = useRouter();
    const applicantInfoData = reactive({
      details: [],
    });

    onMounted(() => {
      viewResume();
    });

    watch(
      () => commonStore.state.isTalentPositionOffer,
      (newVal, oldVal) => {
        if (newVal) {
          var body = document.querySelector("html");
          body.style.overflow = "hidden";
        } else {
          var body = document.querySelector("html");
          body.style.overflow = "auto";
        }
      }
    );

    async function viewResume() {
      let res = await resume.viewResume(router.currentRoute.value.params.id);
      if (res.status === 200) {
        applicantInfoData.details = res.data;
      }
    }

    return {
      active,
      commonStore,
      applicantInfoData,
      loginType,
      resumeLists
    };
  },
  //     data() {
  //     return {
  //       active: false
  //     }

  //     },
};
</script>
