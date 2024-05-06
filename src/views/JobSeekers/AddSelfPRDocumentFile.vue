<template>
  <Sheet
    maxWidth="768px"
    height="100%"
    v-slot="{ closeSelf }"
    v-model:visible="commonstore.state.isAddOtherDoc"
  >
    <div :class="`back-wh common-sec ${commonstore.state.currentThemeStore}`">
      <div class="top-hdr top-hdr-new">
        <div class="container">
          <h4 class="heading">
            <a
              href="javascript:void(0);"
              class="cross-arrow"
              @click="popClose(true, closeSelf())"
            >
              <img src="@/assets/icons/cross-icon2.svg" alt="" /></a
            >파일 추가
          </h4>
        </div>
      </div>
      <form @submit.prevent="add()">
        <div class="container">
          <div class="cm-back form-wrapper">
            <div class="form-group mb-16">
              <label>문서 구분 선택</label>
              <div
                :class="`group ${
                  addDocFileData.errors && addDocFileData.errors?.documentType
                    ? 'valid-error'
                    : ''
                }`"
              >
                <!-- <select
                  class="form-control"
                  v-model="addDocFileData.selectedDoc"
                >
                  <option value="">선택</option>
                  <option
                    v-for="(item, i) in addDocFileData.document"
                    :key="i"
                    :value="item.value"
                  >
                    {{ item.title }}
                  </option>
                </select> -->

                <selectoption
                  class="my-dropdown-toggle salary-drop"
                  :options="addDocFileData.document"
                  :selected="addDocFileData.select"
                  v-on:updateOption="educationset"
                  :placeholder="'선택'"
                  :closeOnOutsideClick="boolean"
                >
                </selectoption>
              </div>
              <small
                style="color: red"
                v-if="
                  addDocFileData.errors && addDocFileData.errors?.documentType
                "
                class="error-msg"
                >{{ addDocFileData.errors?.documentType }}</small
              >
            </div>
            <div class="form-group mb-0">
              <label>첨부파일</label>
              <TabWrapper @getResponseTitle="getTitle($event)">
                <Tabs title="파일">
                  <div class="tab-space">
                    <div class="form-group mb-0 other-doc-cont">
                      <div class="file-input">
                        <input
                          type="file"
                          name="file-input"
                          id="file-input"
                          class="file-input__input"
                          @change="onFileChange($event)"
                        />
                        <span
                          class="
                            file-input__label
                            btn btn-border-gray-outline
                            lg
                          "
                          for="file-input"
                        >
                          파일 선택
                        </span>
                      </div>
                      <small
                        style="color: red"
                        v-if="addDocFileData.errors?.image"
                      >
                        {{ addDocFileData.errors?.image }}
                      </small>
                      <small style="color: red">
                        {{ addDocFileData.fileError }}
                      </small>
                      <div
                        class="
                          attach-input
                          btn btn-primary-gray-outline
                          lg
                          mt-16
                        "
                        v-for="(item, i) in addDocFileData.image"
                        :key="i"
                      >
                        <p>{{ item.name }}</p>
                        <span
                          ><img @click="remove(i)" src="@/assets/icons/cross-icon.svg" alt=""
                        /></span>
                      </div>
                    </div>
                    <ul class="file-doc-list">
                      <li>
                        파일은 최대 30MB(pdf,jpg,png,jpeg)까지 등록 가능합니다.
                      </li>
                      <li>
                        용량이 큰 파일은 외부 링크를 활용하여 등록해주세요.
                      </li>
                      <li>
                        부적절하거나 저작권에 위배되는 영상, 문서 링크 시 법적
                        처벌을 받을 수 있습니다.
                      </li>
                    </ul>
                  </div>
                </Tabs>
                <Tabs title="URL">
                  <div class="form-group mb-0">
                    <div
                      :class="`group ${
                        addDocFileData.errors &&
                        addDocFileData.errors?.url
                          ? 'valid-error'
                          : ''
                      }`"
                    >
                      <input
                        type="text"
                        class="form-control"
                        placeholder="http://"
                        v-model="addDocFileData.url"
                      />
                    </div>
                    <small
                      style="color: red"
                      v-if="
                        addDocFileData.errors &&
                        addDocFileData.errors?.url
                      "
                      class="error-msg"
                      >{{ addDocFileData.errors?.url }}</small
                    >
                  </div>
                  <ul class="file-doc-list">
                    <li>
                      파일은 최대 30MB(pdf,jpg,png,jpeg)까지 등록 가능합니다.
                    </li>
                    <li>용량이 큰 파일은 외부 링크를 활용하여 등록해주세요.</li>
                    <li>
                      부적절하거나 저작권에 위배되는 영상, 문서 링크 시 법적
                      처벌을 받을 수 있습니다.
                    </li>
                  </ul>
                </Tabs>
              </TabWrapper>
            </div>
          </div>
          <div class="fixed-btn-otr">
          <input
            type="submit"
            value="추가하기"
            class="btn btn-primary lg mt-16"
          />
          </div>
        </div>
      </form>
    </div>
    <div class="required-fields-icon" v-if="commonstore.state.requiredToastMsgShow">
        <p><span><img src="@/assets/icons/check-circle.svg" alt="" /></span> 필수 입력값을 확인해 주세요.</p>
    </div>
  </Sheet>
</template>

<script>
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import { inject, reactive, ref } from "vue";
import { resume } from "@/service/API/resume.js";
import validate from "@/Validations/addSelfPrDocumentFile.js";
import validateUrl from "@/Validations/addSelfPrUrl.js";
import selectoption from "@/components/selectOption.vue";

export default {
  name: "AddSelfPRDocumentFile",
  emits: ["AddDocSuccess"],
  components: {
    Tabs,
    TabWrapper,
    selectoption,
  },
  setup(props, { emit }) {
    const commonstore = inject("commonStore");
    const addDocFileData = reactive({
      document: [
        // { id: 1, title: "증명서", value: "doc" },
        // { id: 2, title: "포트폴리오", value: "url" },
        // { id: 3, title: "Etc", value: ""},

        { id: 1, text: "증명서", value: "증명서" },
        { id: 2, text: "자격증", value: "자격증" },
        { id: 3, text: "포트폴리오", value: "포트폴리오" },
        { id: 4, text: "기타", value: "기타" },
      ],
      selectedDoc: "",
      image: [],
      url: "",
      list: [],
      fileSize: 0,
      fileError: "",
      errors: {},
      urlErrors: {},
      selcetedTab: "파일",
      select: {}
    });

    const popClose = (event) => {
      console.log("closeSelf", event);
      if (event) {
        console.log("Bottom Sheet Closed!!");
      }
    };

    function onFileChange(evt) {
      // // max 30 mb exceed
      addDocFileData.fileError = "";
      addDocFileData.errors.image = "";
      let count = addDocFileData.image.length + evt.target.files.length;
      if (count <= 5) {
        addDocFileData.fileSize =
          addDocFileData.fileSize + evt.target.files[0].size;
        if (!/\.(jpg|png|jpeg|pdf)$/i.test(evt.target.files[0].name)) {
          addDocFileData.fileError = "Please enter valid file format";
        } else if (addDocFileData.fileSize > 31457280) {
          addDocFileData.fileSize =
            addDocFileData.fileSize - evt.target.files[0].size;
          addDocFileData.fileError = "파일은 최대 30MB까지 등록 가능";
        } else {
          let reader = new FileReader();
          reader.onload = (event) => {
            addDocFileData.image.push({
              name: evt.target.files[0].name,
              binary: evt.target.files[0],
              path: event.target.result,
            });
          };
          reader.readAsDataURL(evt.target.files[0]);
        }
      } else {
        addDocFileData.fileError = "파일은 최대 5개까지 업로드 가능합니다.";
      }
    }

    function getTitle(e) {
      if (e === "파일") {
        addDocFileData.selcetedTab = "파일";
      }
      if (e === "URL") {
        addDocFileData.selcetedTab = "URL";
      }
    }
    function add() {
      addDocFileData.selectedDoc = addDocFileData.select.value
      let validationData = {
        documentType: addDocFileData.selectedDoc,
        image: addDocFileData.image.length,
        url: addDocFileData.url,
      };

      if (addDocFileData.selcetedTab === "파일") {
        addFile(validationData)
      } else {
        addUrl(validationData)
      }
    }

    async function addFile(validationData) {
      let validation = validate(validationData);
        if (validation.isInvalid) {
          commonstore.methods.displayRequiredToast()
          addDocFileData.errors.documentType = validation.error.documentType;
          addDocFileData.errors.image = validation.error.image;
          addDocFileData.fileError = "";
        } else {
          let currentDate = new Date();
          if (addDocFileData.image.length !== 0) {
            let formData = new FormData();
            formData.append("files", addDocFileData.image[0].binary);
            let res = await resume.uploadFile(formData);
            if (res.status === 200) {
              if(addDocFileData.selcetedTab === '파일') {
              for (let i in res.data) {
                addDocFileData.list.push({
                  url: res.data[i].url,
                  name: res.data[i].name,
                  size: res.data[i].size,
                  type: 'doc',
                  created_at: currentDate,
                  title: addDocFileData.selectedDoc
                });
              }
              } else {
                for (let i in res.data) {
                addDocFileData.list.push({
                  url: res.data[i].name,
                  size: res.data[i].size,
                  type: 'url',
                  created_at: currentDate,
                  title: addDocFileData.selectedDoc
                });
              }
              }
            }
          }
          commonstore.state.isAddOtherDoc = false;
          emit("AddDocSuccess", addDocFileData.list);
        }
    }

    function addUrl(validationData) {
      let validationUrl = validateUrl(validationData);
        if (validationUrl.isInvalid) {
          commonstore.methods.displayRequiredToast()
          addDocFileData.errors.documentType = validationUrl.error.documentType;
          addDocFileData.errors.url = validationUrl.error.url;
        } else {
          let currentDate = new Date();
          if(addDocFileData.selcetedTab === 'URL') {
          if (addDocFileData.url) {
            addDocFileData.list.push({
              url: addDocFileData.url,
              type: 'url',
              created_at: currentDate,
              title: addDocFileData.selectedDoc
            });
          }
          } else {
            addDocFileData.list.push({
              url: addDocFileData.url,
              name: addDocFileData.url,
              type: 'doc',
              created_at: currentDate,
              title: addDocFileData.selectedDoc
            });
          }
          commonstore.state.isAddOtherDoc = false;
          emit("AddDocSuccess", addDocFileData.list);
        }

    }

    function remove(i) {
      addDocFileData.image.splice(i, 1);
    }

    function educationset(payload) {
      addDocFileData.select = payload;
      addDocFileData.selectedDoc = payload.value;
    }

    return {
      commonstore,
      popClose,
      addDocFileData,
      onFileChange,
      add,
      getTitle,
      addFile,
      addUrl,
      remove,
      educationset,
    };
  },
};
</script>
