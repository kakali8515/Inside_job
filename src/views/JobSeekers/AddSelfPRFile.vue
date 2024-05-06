<template>
  <Sheet
    maxWidth="768px"
    height="100%"
    v-slot="{ closeSelf }"
    v-model:visible="commonstore.state.isAddfileUpload"
  >
    <div :class="`back-wh common-sec ${commonstore.state.currentThemeStore}`">
      <div class="top-hdr top-hdr-new">
        <div class="container">
          <h4 class="heading">
            파일 추가
            <a @click="popClose(true, closeSelf())" class="cross-arrow"
              ><img src="@/assets/icons/cross-icon2.svg" alt=""
            /></a>
          </h4>
        </div>
      </div>

      <form @submit.prevent="uploadFile()">
        <div class="container">
          <div class="cm-back form-wrapper">
            <div class="form-group gap-small-16">
              <label>사진 파일 선택</label>
              <div class="file-input text-left">
                <input
                  type="file"
                  name="file-input"
                  id="file-input"
                  class="file-input__input"
                  :multiple="true"
                  @change="onFileChange($event)"
                />
                <span class="file-input__label video video-rr" for="file-input">
                  <img src="@/assets/icons/camara.svg" alt="" />
                  <p>{{ addImagePageData.image.length }} / 4</p>
                </span>
              </div>
              <div class="selfpr-img-outr announcement-info-img pt-16" :class="addImagePageData.image.length === 0 ? 'hide' : ''">
                <div
                  class="self-img-innr"
                  v-for="(item, i) in addImagePageData.image"
                  :key="i"
                >
                  <div class="self-pic-innr">
                    <figure><img :src="item.path" alt="" /></figure>
                    <span
                      ><img
                        src="@/assets/icons/cross-wh.svg"
                        alt=""
                        @click="removePreview(i)"
                    /></span>
                  </div>
                </div>
                <!-- <div class="self-img-innr">
                            <div class="self-pic-innr">
                                <figure><img src="@/assets/images/pic1.jpg" alt="" /></figure>
                                <span><img src="@/assets/icons/cross-wh.svg" alt="" /></span>
                            </div>
                        </div>
                        <div class="self-img-innr">
                            <div class="self-pic-innr">
                                <figure><img src="@/assets/images/pic2.jpg" alt="" /></figure>
                                <span><img src="@/assets/icons/cross-wh.svg" alt="" /></span>
                            </div>
                        </div>
                        <div class="self-img-innr">
                            <div class="self-pic-innr">
                                <figure><img src="@/assets/images/pic3.jpg" alt="" /></figure>
                                <span><img src="@/assets/icons/cross-wh.svg" alt="" /></span>
                            </div>
                        </div>
                        <div class="self-img-innr">
                            <div class="self-pic-innr">
                                <figure><img src="@/assets/images/pic4.jpg" alt="" /></figure>
                                <span><img src="@/assets/icons/cross-wh.svg" alt="" /></span>
                            </div>
                        </div> -->
              </div>
              <!-- <span style="color: red;">{{addImagePageData.maxImagelengthError}}</span> -->
              <small class="error-msgsign">{{addImagePageData.maxImagelengthError}}</small>
            </div>
            <div class="form-group">
              <label>동영상 URL 추가</label>
              <input
                type="text"
                class="form-control"
                placeholder="URL을 입력해주세요"
                v-model="addImagePageData.videoUrl"
              />
            </div>
            <div class="fixed-btn-otr"><input type="submit" value="추가하기" class="btn btn-primary lg" /></div>
          </div>
        </div>
      </form>
        <LoadingBar v-if="loading.state" :loadingMsg="loading.message" />
        <MaxFileSizeModal
          :isModal="isMaxFileSizeModal"
          @confirmModal="isMaxFileSizeModal = false"
        />
    </div>
  </Sheet>
</template>


<script>
import { reactive, inject, ref } from "vue";
import { resume } from "@/service/API/resume.js";
import LoadingBar from "@/components/Utils/LoadingBar.vue";
import MaxFileSizeModal from "@/components/Modals/MaxFileSizeModal.vue";

export default {
  name: "AddSelfPRFile",
  emits: ["AddSuccess"],
  components: {
    LoadingBar,
    MaxFileSizeModal
  },
  setup(props, { emit }) {
    const commonstore = inject("commonStore");
    const addImagePageData = reactive({
      list: [],
      image: [],
      videoUrl: "",
      type: "",
      maxImagelengthError: '',
      totalImageSize: 0
    });
    const isMaxFileSizeModal = ref(false)
     const loading = reactive({
      state: false,
      message: "잠시만 기다려 주세요."
    })
    
    function onFileChange(evt) {
      loading.state = true;
      let count = addImagePageData.image.length + evt.target.files.length;
      if (count <= 4) {
        addImagePageData.maxImagelengthError = ""
      
        for (let i = 0; i < evt.target.files.length; i++) {
          // // max 50 mb exceeds
          // if (evt.target.files[i].size > 5000000 || !/\.(jpg|png|jpeg)$/i.test(evt.target.files[i].name)) {
          // } else {
          addImagePageData.totalImageSize = addImagePageData.totalImageSize + evt.target.files[i].size
          let reader = new FileReader();
          reader.onload = (event) => {
            addImagePageData.image.push({
              name: evt.target.files[i].name,
              binary: evt.target.files[i],
              path: event.target.result,
              size: evt.target.files[i].size
            });
            if(addImagePageData.image.length == count ) {
              loading.state = false;
            }
          };
          reader.readAsDataURL(evt.target.files[i]);
          // }
          
        }
      } else {
        addImagePageData.maxImagelengthError = "이미지는 최대 4개까지 업로드 가능합니다."
      }
    }

    function removePreview(i) {
      addImagePageData.totalImageSize = addImagePageData.totalImageSize - addImagePageData.image[i].size
      addImagePageData.image.splice(i, 1);
    }

    async function uploadFile() {

      let formData = new FormData();
      if(addImagePageData.totalImageSize > 1000000) {
        addImagePageData.maxImagelengthError = "최대 10MB의 jpg, jpeg 파일을 업로드 할 수 있습니다. "
        // isMaxFileSizeModal.value = true
      }
      for (let i in addImagePageData.image) {
        formData.append("files", addImagePageData.image[i].binary);
      }
      let res = await resume.uploadFile(formData);
      // console.log(res.response.data.error === "invalidFile")
      if (res.status === 200) {
        let currentDate = new Date();
        for (let i in res.data) {
          addImagePageData.list.push({
            url: res.data[i].url,
            name: res.data[i].name,
            size: res.data[i].size,
            type: "image",
            created_at: currentDate,
          });
        }
        if (addImagePageData.videoUrl) {
          addImagePageData.list.push({
            url: addImagePageData.videoUrl,
            type: "video",
            created_at: currentDate,
          });
        }
        commonstore.state.isAddfileUpload = false;
        emit("AddSuccess", addImagePageData.list);
      }
      if(res.response.data.error === "invalidFile") {
        addImagePageData.maxImagelengthError = "최대 10MB의 jpg, jpeg 파일을 업로드 할 수 있습니다. "
      }
    }
    const popClose = (event) => {
      console.log("closeSelf", event);
      if (event) {
        console.log("Bottom Sheet Closed!!");
      }
    };

    return {
      addImagePageData,
      isMaxFileSizeModal,
      onFileChange,
      removePreview,
      uploadFile,
      commonstore,
      popClose,
      loading
    };
  },
};
</script>
<style scoped>
.hide {
  display: none !important;
}
</style>
