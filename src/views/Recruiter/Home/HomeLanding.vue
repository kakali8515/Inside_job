<template>
  <div v-if="Object.keys(profileDetailsData).length !== 0">
    <div class="back-wh">
      <div class="container">
        <div class="pb-32 pt-12">
          <div class="user-profile-otr">
            <div class="profile-image">
              <img
                :src="profileDetailsData.company_info.company_profile_img"
                v-if="profileDetailsData.company_info.company_profile_img != null"
                alt=""
              />
              <img v-else src="@/assets/images/mypage-profile-img.png" alt="" />
            </div>
            <div class="info-cont">
              <h6>안녕하세요!</h6>
              <h5 class="sub-heading mb-0 lg">
                {{ profileDetailsData.company_info.company_name }}
              </h5>
              <div class="point-btn">
                <img src="@/assets/icons/database-icon.svg" alt="" />
                <p>
                  <span>{{
                    profileDetailsData.company_info.total_ammount.toLocaleString(
                      "en-US"
                    )
                  }}</span
                  >초코
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="counter-wrapper">
      <div class="container">
        <div class="counter-cont">
          <div class="counter-otr">
            <ul>
              <li class="published" @click="showPublished">
                {{ profileDetailsData.company_info.publish_job_count }}
                <span>게재중</span>
              </li>
              <li class="closed" @click="showClosed">
                {{ profileDetailsData.company_info.cancel_job_count }}
                <span>마감</span>
              </li>
              <li class="unread" @click="showUnread">
                {{ profileDetailsData.company_info.unread_applicant_count }}
                <span>미열람 지원서</span>
              </li>
            </ul>
          </div>

          <!-- Code For No Data -->
          <div
            v-if="
              profileDetailsData.company_info.publish_job_count == 0 &&
              profileDetailsData.company_info.cancel_job_count == 0 &&
              profileDetailsData.company_info.unread_applicant_count == 0
            "
          >
            <NoData>
              <template v-slot:no-data-image>
                <img
                  class="no-job-icon"
                  src="@/assets/icons/no-job-icon.svg"
                  alt=""
                />
              </template>
              <template v-slot:no-data-content>
                <p>등록한 공고가 없습니다.</p>
              </template>
            </NoData>
          </div>
          <div v-else>
            <ul class="post-list" v-if="publishedTab">
              <li
                v-for="(
                  i, e
                ) in profileDetailsData.company_info.publish_data.slice(0, 5)"
                :key="e"
              >
                <div class="p-left">
                  <span class="published" v-if="i.status === 'published'"
                    >게재중</span
                  >{{ i.announcement_title }}
                </div>
                <div class="p-right">
                  <span
                    ><img
                      src="@/assets/icons/user-gray-icon.svg"
                      alt="" /></span
                  >{{ i.applicant_cnt }}
                </div>
              </li>
              <div
                v-if="profileDetailsData.company_info.publish_job_count == 0"
              >
                <NoData>
                  <template v-slot:no-data-image>
                    <img
                      class="no-job-icon"
                      src="@/assets/icons/no-job-icon.svg"
                      alt=""
                    />
                  </template>
                  <template v-slot:no-data-content>
                    <p>등록한 공고가 없습니다.</p>
                  </template>
                </NoData>
              </div>
            </ul>

            <ul class="post-list" v-if="closedTab">
              <li
                v-for="(
                  i, e
                ) in profileDetailsData.company_info.cancel_job_post_data.slice(
                  0,
                  5
                )"
                :key="e"
              >
                <div class="p-left">
                  <span class="closed">마감</span>{{ i.announcement_title }}
                </div>
                <div class="p-right">
                  <span
                    ><img
                      src="@/assets/icons/user-gray-icon.svg"
                      alt="" /></span
                  >{{ i.applicant_cnt }}
                </div>
              </li>
              <div v-if="profileDetailsData.company_info.cancel_job_count == 0">
                <NoData>
                  <template v-slot:no-data-image>
                    <img
                      class="no-job-icon"
                      src="@/assets/icons/no-job-icon.svg"
                      alt=""
                    />
                  </template>
                  <template v-slot:no-data-content>
                    <p>등록한 공고가 없습니다.</p>
                  </template>
                </NoData>
              </div>
            </ul>
          </div>
        </div>

        <div class="btn-otr">
          <button
            @click="$router.push({ name: 'NoticeRegistration' })"
            type="button"
            class="btn btn-white lg line-height-16"
          >
            공고 추가 등록하기<span
              ><img src="@/assets/icons/plus-icon.svg" alt=""
            /></span>
          </button>
        </div>
      </div>
    </div>
    <div class="back-wh">
      <div class="container">
        <div class="locker-otr">
          <div class="sub-otr b-color">
            <h3 class="sub-heading mb-0">유료서비스 보관함</h3>
          </div>
          <ul class="post-list">
            <li v-for="(i, e) in lockerDetailsData" :key="e">
              <div class="p-left" v-if="i.type_name === 'emergency'">긴급</div>
              <div class="p-left" v-if="i.type_name === 'premium'">
                프리미엄
              </div>
              <div class="p-left" v-if="i.type_name === 'special'">스페셜</div>
              <div class="p-left" v-if="i.type_name === 'line'">줄공고</div>
              <div class="p-right">
                <span>{{ i.total_count }}</span
                >건
              </div>
            </li>
          </ul>
          <div class="btn-otr">
            <button
              @click="$router.push({ name: 'PaidProductLocker' })"
              type="button"
              class="btn btn-outline-primary lg line-height-16"
            >
              보관함 가기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoData from "@/components/NoData.vue";
import { onBeforeMount } from "@vue/runtime-core";
import { reactive, ref } from "@vue/reactivity";
import { HomeService } from "../../../service/API/Home";
import { useRouter } from "vue-router";
export default {
  name: "HomeLanding.vue",
  components: { NoData },
  setup() {
    const router = useRouter();
    const profileDetailsData = ref({});
    const lockerDetailsData = ref([]);
    const publishedTab = ref(true);
    const closedTab = ref(false);

    onBeforeMount(async () => {
      await fetchProfileDatails();
      await fetchLockerDatails();
    });

    const fetchProfileDatails = async () => {
      try {
        let res = await HomeService.profileDetails();
        console.log(res);
        Object.assign(profileDetailsData.value, res.data);
      } catch (e) {}
    };

    const showPublished = () => {
      publishedTab.value = true;
      closedTab.value = false;
    };
    const showClosed = () => {
      closedTab.value = true;
      publishedTab.value = false;
    };
    const showUnread = () => {
      router.push({ name: "ApplicantConfirmationList" });
    };

    const fetchLockerDatails = async () => {
      try {
        let res = await HomeService.lockerDetails();
        console.log(res);
        lockerDetailsData.value = res.data;
      } catch (e) {}
    };

    //NotificationTypePurchase
    return {
      profileDetailsData,
      lockerDetailsData,
      publishedTab,
      closedTab,
      showPublished,
      showClosed,
      showUnread,
    };
  },
};
</script>
