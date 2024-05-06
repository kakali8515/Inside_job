<template>
  <div class="form-wrapper">
    <div class="back-wh">
      <div class="cm-top-space pb-32">
        <div class="container">
          <div class="sub-otr no-border">
            <h3 class="sub-heading lg">공고정보 입력</h3>
            <p>지원자가 지원할 공고에 대한 정보를 입력해 주세요</p>
          </div>
        </div>
      </div>
      <div class="border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="form-group mb-0">
              <div class="d-flex mb-8">
                <label>공고 제목 <span>[선택]</span></label>
                <p class="number lg">
                  <span>{{ anTitllength }}</span
                  >/40
                </p>
              </div>
              <input
                type="text"
                placeholder="공고 제목 입력"
                class="form-control"
                v-model="anTitle"
                @keyup="getlength(anTitle)"
                maxlength="40"
              />
              <p class="c-font mt-16">
                공고제목에는 한글,영문,숫자,일부 특수문자(-+#()[]%&,.㈜’/)만
                사용할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="form-group">
              <label
                >공고 배경사진 - 대표사진 <span class="gr">[선택]</span></label
              >
              <p class="c-font">
                공고가 올라갈 때 메인 화면에 보여지는 대표사진입니다.
              </p>
              <div class="file-input text-left mt-16">
                <input
                  type="file"
                  name="file-input"
                  id="file-input"
                  class="file-input__input"
                  :multiple="true"
                  @change="FileChangeThumnail($event)"
                />
                <span class="file-input__label video" for="file-input">
                  <img src="@/assets/icons/camara.svg" alt="" />
                  <p>{{ addthumbnaildata.image.length }} / 1</p>
                </span>
              </div>
              <!-- input -->
              <div class="selfpr-img-outr pt-16">
                <div
                  class="self-img-innr"
                  v-for="(item, i) in addthumbnaildata.image"
                  :key="i"
                >
                  <div class="self-pic-innr">
                    <figure><img :src="item.path" alt="" /></figure>
                    <span
                      ><img
                        src="@/assets/icons/cross-wh.svg"
                        alt=""
                        @click="removePreview1(i)"
                    /></span>
                  </div>
                </div>
              </div>
              <span style="color: red">{{
                addthumbnaildata.maxImagelengthError
              }}</span>
            </div>
            <div class="form-group mb-0">
              <label>공고 배경사진 <span class="gr">[선택]</span></label>
              <div class="file-input text-left mt-16">
                <input
                  type="file"
                  name="file-input"
                  id="file-input"
                  class="file-input__input"
                  :multiple="true"
                  @change="FileChangeBackground($event)"
                />
                <span class="file-input__label video" for="file-input">
                  <img src="@/assets/icons/camara.svg" alt="" />
                  <p>{{ addImagePageData.image.length }} / 3</p>
                </span>
              </div>
              <!-- input -->
              <div class="selfpr-img-outr pt-16">
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
              </div>
              <span style="color: red">{{
                addImagePageData.maxImagelengthError
              }}</span>
               <button  @click="getFinal()">get final</button>
            </div>
          </div>
        </div>
      </div>
      <div class="border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="form-group mb-0">
              <label>공고 게시기간 <span>[필수]</span></label>
              <ul class="check-list box-check col-6 mt-16">
                <li>
                  <label class="check-input">
                    <input
                      type="radio"
                      name="NoticePost"
                      value="7_days"
                      v-model="NoticePostPeriod"
                      @change="directInput()"
                    />
                    <span class="text">7일</span>
                  </label>
                </li>
                <li>
                  <label class="check-input">
                    <input
                      type="radio"
                      name="NoticePost"
                      value="15_days"
                      v-model="NoticePostPeriod"
                      @change="directInput()"
                    />
                    <span class="text">15일</span>
                  </label>
                </li>
                <li>
                  <label class="check-input">
                    <input
                      type="radio"
                      name="NoticePost"
                      value="1_month"
                      v-model="NoticePostPeriod"
                      @change="directInput()"
                    />
                    <span class="text">1개월</span>
                  </label>
                </li>
                <li>
                  <label class="check-input">
                    <input
                      type="radio"
                      name="NoticePost"
                      value="direct_input"
                      v-model="NoticePostPeriod"
                      @change="directInput()"
                    />
                    <span class="text">직접입력</span>
                  </label>
                </li>
              </ul>
              <div
                class="form-group-wrapper mt-16 text-center"
                v-show="direct_Input_center"
              >
                <div class="form-group mb-0">
                  <input
                    type="text"
                    placeholder="2022.01.01"
                    class="form-control"
                  />
                </div>
                <span>~</span>
                <div class="form-group mb-0">
                  <input
                    type="text"
                    placeholder="2022.01.07"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btm-button-group mt-32">
      <button type="button" class="btn btn-primary lg">
        공고 작성 완료하기!
      </button>
    </div>
  </div>
</template>

<script>
import jobPostingService from "../../service/API/jobPosting";
export default {
  name: "AnnouncementInformation",
  data() {
    return {
      // ^\d{0,4}$|^\d{4}[-]$|^\d{4}[-](0?[0-9]|1[012])$
      anTitle: "",
      anTitllength: "0",
      addImagePageData: {
        list: [],
        image: [],
        videoUrl: "",
        type: "",
        maxImagelengthError: "",
      },
      thumbnailRes: [],
      backgroundRes: [],
      allfinalbgAry:[],
      addthumbnaildata: {
        list: [],
        image: [],
        videoUrl: "",
        type: "",
        maxImagelengthError: "",
      },
      NoticePostPeriod: "7_days",
      direct_Input_center: false,
    };
  },
  created() {
    this.jobpostingervice = new jobPostingService();
  },
  methods: {
    getFinal(){
      this.allfinalbgAry.splice(0, 0, this.thumbnailRes);
      console.log(this.allfinalbgAry);
    },
    getlength(title) {
      this.anTitllength = title.trim().length;
    },
    directInput() {
      if (this.NoticePostPeriod == "direct_input") {
        this.direct_Input_center = true;
      } else {
        this.direct_Input_center = false;
      }
    },
    FileChangeBackground(evt) {
      let count = this.addImagePageData.image.length + evt.target.files.length;
      if (count <= 3) {
        this.addImagePageData.maxImagelengthError = "";
        for (let i = 0; i < evt.target.files.length; i++) {
          // // max 50 mb exceeds
          // if (evt.target.files[i].size > 5000000 || !/\.(jpg|png|jpeg)$/i.test(evt.target.files[i].name)) {
          // } else {
          let reader = new FileReader();
          reader.onload = (event) => {
            this.addImagePageData.image.push({
              name: evt.target.files[i].name,
              binary: evt.target.files[i],
              path: event.target.result,
            });
          };
          console.log(this.addImagePageData.image);
          reader.readAsDataURL(evt.target.files[i]);
          // }
        }
        setTimeout(() => {
          this.uploadbgFile();
        }, 300);
      } else {
        this.addImagePageData.maxImagelengthError =
          "1개의 이미지만 업로드할 수 있습니다.";
      }
    },
    async uploadbgFile() {
      let formData = new FormData();
      // formData.append('files[' + i + ']', file);
      for (let i in this.addImagePageData.image) {
        formData.append("images", this.addImagePageData.image[i].binary);
      }
      await this.jobpostingervice
        .saveBgImage(formData)
        .then((res) => {
          this.backgroundRes = res.data;
          console.log("background_Image", this.backgroundRes);
          let newbgImage = this.backgroundRes.map((obj) => {
            return { ...obj, type: "background" };
          });
          let finalBgImage = newbgImage.map(({ name, ...rest }) => {
            return rest;
          });
          console.log("Final-Background-Image", finalBgImage);
          this.allfinalbgAry=finalBgImage;
        })
        .catch((err) => console.log(err));
    },
    async uploadThumbFile() {
      let formData = new FormData();
      // formData.append('files[' + i + ']', file);
      for (let i in this.addthumbnaildata.image) {
        formData.append("image", this.addthumbnaildata.image[i].binary);
      }
      await this.jobpostingervice
        .saveThumnailImage(formData)
        .then((res) => {
          this.thumbnailRes = res.data;
          console.log("Thumbnail_Image", this.thumbnailRes.name);
          delete this.thumbnailRes.name;
          this.thumbnailRes.type="thumbnail";
          console.log("Final-Thumbnail-Image", this.thumbnailRes);
        })
        .catch((err) => console.log(err));
    },
    FileChangeThumnail(evt) {
      let count = this.addthumbnaildata.image.length + evt.target.files.length;
      if (count <= 1) {
        this.addthumbnaildata.maxImagelengthError = "";
        for (let i = 0; i < evt.target.files.length; i++) {
          // // max 50 mb exceeds
          // if (evt.target.files[i].size > 5000000 || !/\.(jpg|png|jpeg)$/i.test(evt.target.files[i].name)) {
          // } else {
          let reader = new FileReader();
          reader.onload = (event) => {
            this.addthumbnaildata.image.push({
              name: evt.target.files[i].name,
              binary: evt.target.files[i],
              path: event.target.result,
            });
          };
          console.log(this.addthumbnaildata.image);
          reader.readAsDataURL(evt.target.files[i]);
          // }
        }
        setTimeout(() => {
          this.uploadThumbFile();
        }, 300);
      } else {
        this.addthumbnaildata.maxImagelengthError =
          "이미지는 최대 1개까지 업로드 가능합니다.";
      }
    },
    removePreview(i) {
      this.addImagePageData.image.splice(i, 1);
    },
    removePreview1(i) {
      this.addthumbnaildata.image.splice(i, 1);
    },
  },
};
</script>
