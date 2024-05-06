<template>
  <div class="back-wh common-sec">
    <div class="top-hdr mb-16" style="border: none !important">
      <div class="container">
        <h4 class="heading">
          <a
            href="javascript:void(0);"
            class="left-arrow"
            @click="$emit('closePr')"
          >
            <img src="@/assets/icons/left-arrow.svg" alt="" /></a
          >자기 PR
        </h4>
      </div>
    </div>

    <div class="container">
      <div class="tab-outr pr-tab">
        <TabWrapper @getResponseTitle="getTitle($event)">
          <Tabs title="사진,동영상">
            <div class="cm-top-space pb-60">
              <div class="sub-otr mb-16 b-color">
                <h3 class="sub-heading mb-0">문서 리스트</h3>
              </div>
              <!-- Code For No Data -->
              <NoData v-if="selfPrList.list.length === 0">
                <template v-slot:no-data-image>
                  <img
                    class="no-job-icon"
                    src="@/assets/icons/no-job-icon.svg"
                    alt=""
                  />
                </template>
                <template v-slot:no-data-content>
                  <p><span>작성한 자기 PR이 없습니다.</span></p>
                  <p>PR을 추가해보세요!</p>
                </template>
              </NoData>
              <div class="pt-28" v-if="selfPrList.list.length === 0">
                <a
                  href="#"
                  class="btn btn-border-outline lg"
                  @click="addSelfPrFileModel($event)"
                  >PR 추가하기</a
                >
              </div>

              <!-- end  -->

              <ul class="doct-list" v-else>
                <li v-for="(item, i) in selfPrList.list" :key="i">
                  <div class="add-wrap">
                    <div class="add-wrap-left">
                      <p>
                        <a href="#" v-if="item.type === 'image'">{{
                          item.name
                        }}</a>
                        <a href="#" v-if="item.type === 'video'">{{
                          item.url
                        }}</a>
                      </p>
                      <h6 v-if="item.type === 'image'">
                        사진
                        <span>{{
                          store.methods.dateFormat(
                            item.created_at,
                            "YYYY년 M월 D일"
                          )
                        }}</span>
                        <span>{{ item.size }} KB</span>
                      </h6>
                      <h6 v-if="item.type === 'video'">
                        동영상
                        <span>{{
                          store.methods.dateFormat(
                            item.created_at,
                            "YYYY년 M월 D일"
                          )
                        }}</span>
                      </h6>
                    </div>
                    <a @click="deleteData(item.id, item.temp_id, i)"
                      ><img src="@/assets/icons/cross-icon2.svg" alt=""
                    /></a>
                  </div>
                </li>
                <!-- <li>
                  <div class="add-wrap">
                    <div class="add-wrap-left">
                      <p><a href="#">증명서.png</a></p>
                      <h6>사진 <span>2022.01.01</span> <span>30KB</span></h6>
                    </div>
                    <a href="#"
                      ><img src="@/assets/icons/cross-icon2.svg" alt=""
                    /></a>
                  </div>
                </li>
                <li>
                  <div class="add-wrap">
                    <div class="add-wrap-left">
                      <p><a href="#">증명서.png</a></p>
                      <h6>사진 <span>2022.01.01</span> <span>30KB</span></h6>
                    </div>
                    <a href="#"
                      ><img src="@/assets/icons/cross-icon2.svg" alt=""
                    /></a>
                  </div>
                </li>
                <li>
                  <div class="add-wrap">
                    <div class="add-wrap-left">
                      <p><a href="#">증명서.png</a></p>
                      <h6>사진 <span>2022.01.01</span> <span>30KB</span></h6>
                    </div>
                    <a href="#"
                      ><img src="@/assets/icons/cross-icon2.svg" alt=""
                    /></a>
                  </div>
                </li>
                <li>
                  <div class="add-wrap">
                    <div class="add-wrap-left">
                      <p><a href="#">http://www.google.com</a></p>
                      <h6>동영상 <span>2022.01.01</span></h6>
                    </div>
                    <a href="#"
                      ><img src="@/assets/icons/cross-icon2.svg" alt=""
                    /></a>
                  </div>
                </li> -->
              </ul>
              <a
                href="#"
                v-if="selfPrList.list.length !== 0"
                class="btn btn-border-outline lg"
                @click="addSelfPrFileModel($event)"
                >PR 추가하기</a
              >
            </div>
          </Tabs>
          <Tabs title="기타 문서">
            <div class="cm-top-space pb-60">
              <div class="sub-otr mb-21 b-color">
                <h3 class="sub-heading mb-0">문서 리스트</h3>
              </div>
              <!-- Code For No Data -->
              <NoData v-if="selfPrList.otherDocList.length === 0">
                <template v-slot:no-data-image>
                  <img
                    class="no-job-icon"
                    src="@/assets/icons/no-job-icon.svg"
                    alt=""
                  />
                </template>
                <template v-slot:no-data-content>
                  <p><span>작성한 자기 PR이 없습니다.</span></p>
                  <p>PR을 추가해보세요!</p>
                </template>
              </NoData>
              <div class="pt-28" v-if="selfPrList.otherDocList.length === 0">
                <a
                  href="#"
                  class="btn btn-border-outline lg"
                  @click="addSelfPrOtherDocModel($event)"
                  >PR 추가하기</a
                >
              </div>

              <!-- end  -->
              <ul v-else class="doct-list">
                <li v-for="(item, i) in selfPrList.otherDocList" :key="i">
                  <div class="add-wrap">
                    <div class="add-wrap-left">
                      <p>
                        <a href="#" v-if="item.type === 'doc'">{{
                          item.name
                        }}</a>
                        <a href="#" v-if="item.type === 'url'">{{
                          item.url
                        }}</a>
                      </p>
                      <h6>
                        <span style="margin-left: 0"
                          >{{item.title}}</span
                        >
                        <!-- <span style="margin-left: 0" v-if="item.type === 'url'"
                          >포트폴리오</span
                        > -->
                        <span>{{
                          store.methods.dateFormat(
                            item.created_at,
                            "YYYY년 M월 D일"
                          )
                        }}</span>
                        <span v-if="item.size">{{ item.size }}KB</span>
                      </h6>
                    </div>
                    <a @click="deleteDocData(item.id, item.tempDoc_id, i)"
                      ><img src="@/assets/icons/cross-icon2.svg" alt=""
                    /></a>
                  </div>
                </li>
                <!-- <li>
                    <div class="add-wrap">
                      <div class="add-wrap-left">
                        <p><a href="#">http://www.google.com</a></p>
                        <h6>포트폴리오 <span>2022.01.01</span></h6>
                      </div>
                      <a href="#"
                        ><img src="@/assets/icons/cross-icon2.svg" alt=""
                      /></a>
                    </div>
                  </li> -->
                <a
                  href="#"
                  class="btn btn-border-outline lg"
                  @click="addSelfPrOtherDocModel($event)"
                  >PR 추가하기</a
                >
              </ul>
            </div>
          </Tabs>
        </TabWrapper>
      </div>
    </div>
  </div>
  <div class="btm-button-group fixed-btn-otr">
    <a href="#" class="btn btn-primary lg" @click="toSave()">저장하기</a>
  </div>
  <AddSelfPRFile @AddSuccess="reloadPage" v-if="store.state.isAddfileUpload" />
  <AddSelfPRDocumentFile
    @AddDocSuccess="docReloadPage"
    v-if="store.state.isAddOtherDoc"
  />
</template>

<script>
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import NoData from "@/components/NoData.vue";
import { resume } from "@/service/API/resume.js";
import { onMounted, reactive, inject, watch } from "vue";
import AddSelfPRFile from "./AddSelfPRFile.vue";
import AddSelfPRDocumentFile from "./AddSelfPRDocumentFile.vue";
import { useRouter } from "vue-router";

export default {
  name: "SelfPR",
  components: {
    Tabs,
    TabWrapper,
    NoData,
    AddSelfPRFile,
    AddSelfPRDocumentFile,
  },
  emits: ["closePr", "setPr","deletePR","deleteOtherDoc"],
  props: {
    selfPrId: String,
    selfPr_photo_video: Array,
    selfPr_otherDoc: Array,
  },
  setup(props, { emit }) {
    const router = useRouter();
    const store = inject("commonStore");
    const selfPrList = reactive({
      list: [],
      tempPhotoData: [],
      otherDocList: [],
      tempOtherDocData: [],
      selcetedTab: "image_video",
      temp_id: 0,
      tempDoc_id: 0,
    });

    onMounted(async () => {
      selfPrList.list = props.selfPr_photo_video;
      selfPrList.otherDocList = props.selfPr_otherDoc;
      console.log(props.selfPr_photo_video);
      //  if (props.selfPrId !== "add") {
      //   selfPrList.list = localStorage.getItem("PhotoData");
      //  }
      // await list();
    });

    watch(
      () => store.state.isAddfileUpload,
      (newVal, oldVal) => {
        if (newVal === true) {
          document.documentElement.style.overflow = "hidden";
        } else {
          document.documentElement.style.overflow = "auto";
        }
      }
    );

    watch(
      () => store.state.isAddOtherDoc,
      (newVal, oldVal) => {
        if (newVal === true) {
          document.documentElement.style.overflow = "hidden";
        } else {
          document.documentElement.style.overflow = "auto";
        }
      }
    );

    async function list() {
      if (props.selfPrId !== "add") {
        let parms = {
          id: router.currentRoute.value.params.id,
          type: selfPrList.selcetedTab,
        };

        let res = await resume.selfPrList(parms);

        if (res.status === 200) {
          if (selfPrList.selcetedTab === "image_video") {
            // selfPrList.list = props.selfPr_photo_video;
            // if (res.data.length !== 0) selfPrList.list.push(res.data);
            for (let j in res.data) {
              selfPrList.list.push(res.data[j]);
            }
            // for (let i in selfPrList.tempPhotoData) {
            //   console.log(selfPrList.tempPhotoData[i]);
            //   selfPrList.list.push(selfPrList.tempPhotoData[i]);
            // }
          } else {
            // selfPrList.otherDocList = props.selfPr_otherDoc;
            // if (res.data.length !== 0) selfPrList.otherDocList.push(res.data);
            // for (let i in selfPrList.tempOtherDocData) {
            //   selfPrList.otherDocList.push(selfPrList.tempOtherDocData[i]);
            // }
          }
        }
      } else {
        // selfPrList.list = [];
        if (selfPrList.selcetedTab === "image_video") {
          console.log(selfPrList.tempPhotoData);
          for (let i in selfPrList.tempPhotoData) {
            selfPrList.list.push(selfPrList.tempPhotoData[i]);
          }
        } else {
          for (let i in selfPrList.tempOtherDocData) {
            selfPrList.otherDocList.push(selfPrList.tempOtherDocData[i]);
          }
        }
      }
    }

    function getTitle(e) {
      if (e === "사진,동영상") {
        selfPrList.selcetedTab = "image_video";
      }
      if (e === "기타 문서") {
        selfPrList.selcetedTab = "doc";
      }
      // list();
    }

    function addSelfPrFileModel(e) {
      e.preventDefault();
      store.state.isAddfileUpload = true;
    }

    function reloadPage(e) {
      selfPrList.temp_id = selfPrList.temp_id + 1;
      for (let i in e) {
        e[i].temp_id = selfPrList.temp_id;
        selfPrList.list.push(e[i]);
        selfPrList.tempPhotoData.push(e[i]);
      }
    }

    function docReloadPage(e) {
      selfPrList.tempDoc_id = selfPrList.tempDoc_id + 1;
      for (let i in e) {
        e[i].tempDoc_id = selfPrList.tempDoc_id;
        selfPrList.otherDocList.push(e[i]);
        selfPrList.tempOtherDocData.push(e[i]);
      }
    }

    function addSelfPrOtherDocModel(e) {
      e.preventDefault();
      store.state.isAddOtherDoc = true;
    }

    function toSave() {
      if (localStorage.getItem("PhotoData")) {
        let tempPhotosData = [...props.selfPr_photo_video];
        console.log("if already present", selfPrList.tempPhotoData);
        // if (props.selfPrId !== "add")
        //   tempPhotosData.push(...selfPrList.tempPhotoData);
        localStorage.setItem("PhotoData", JSON.stringify(tempPhotosData));
      } else {
        console.log("if not present", selfPrList.tempPhotoData);
        localStorage.setItem(
          "PhotoData",
          JSON.stringify(selfPrList.tempPhotoData)
        );
      }
      if (localStorage.getItem("OtherDocData")) {
        let tempOtherData = [...props.selfPr_otherDoc];
        // if (props.selfPrId !== "add")
        //   tempOtherData.push(...selfPrList.tempOtherDocData);
        localStorage.setItem("OtherDocData", JSON.stringify(tempOtherData));
      } else {
        localStorage.setItem(
          "OtherDocData",
          JSON.stringify(selfPrList.tempOtherDocData)
        );
      }
      // localStorage.setItem(
      //   "PhotoData",
      //   JSON.stringify(selfPrList.tempPhotoData)
      // );
      // localStorage.setItem(
      //   "OtherDocData",
      //   JSON.stringify(selfPrList.tempOtherDocData)
      // );
      emit("closePr");
      emit("setPr");
    }

    function deleteData(id, temp_id, i) {
      // alert(id)
      // alert(temp_id)
      if (id) {
        emit("deletePR",i)
        // actualDelete(id);
      }
      if (temp_id) {
        for (let j in selfPrList.tempPhotoData) {
          if (selfPrList.tempPhotoData[j].temp_id === temp_id) {
            selfPrList.tempPhotoData.splice(j, 1);
          }
        }
        selfPrList.list.splice(i, 1);
      }
    }

    function deleteDocData(id, tempDoc_id, i) {
      if (id) {
        emit("deleteOtherDoc",i)
        // actualDelete(id);
      }
      if (tempDoc_id) {
        for (let j in selfPrList.tempOtherDocData) {
          if (selfPrList.tempOtherDocData[j].tempDoc_id === tempDoc_id) {
            selfPrList.tempOtherDocData.splice(j, 1);
          }
        }
        selfPrList.otherDocList.splice(i, 1);
      }
    }

    async function actualDelete(id) {
      let parms = {
        id: id,
        type: selfPrList.selcetedTab,
      };
      let res = await resume.deleteSelfPr(parms);
      if (res.status === 200) {
        list();
      }
    }

    return {
      selfPrList,
      getTitle,
      store,
      addSelfPrFileModel,
      reloadPage,
      docReloadPage,
      addSelfPrOtherDocModel,
      toSave,
      deleteData,
      deleteDocData,
    };
  },
};
</script>
