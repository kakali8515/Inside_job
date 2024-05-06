<template>
  <h4 class="heading">
    <div class="innr-search">
      <a
        href="javascript:void(0);"
        class="left-arrow"
        @click="redirectPage($event)"
        ><img src="@/assets/icons/left-arrow.svg" alt="" /></a
      ><span v-if="searchType !== true">{{ headerTitle }}</span>
      <span v-else class="search-field search-box">
        <form>
          <span class="search-innr">
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              class="search-input"
              v-model="searchValProps"
              @input="changeSearchVal"
            />
            <input value="" class="submit" @click="search()" />
          </span>
        </form>
      </span>
      <a
        v-if="$route.name === 'PaidProductLocker'"
        href="javascript:void(0);"
        @click="$router.push({ name: 'PaidProductPurchase' })"
        class="right-arrow"
        ><img src="@/assets/icons/paid-product-icon.svg" alt=""
      /></a>
    </div>
  </h4>
</template>

<script>
import { inject } from "@vue/runtime-core";
export default {
  props: {
    headerTitle: String,
    searchValProps: String,
    searchType: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.commonStore = inject("commonStore");
  },
  data() {
    return {
      searchValue: "",
      tempLen: 0,
      periousSerachVal: "",
    };
  },
  methods: {
    redirectPage(e) {
      // e.preventDefault();

      console.log(window.history.state);
      // let viewMoreNames = [
      //   // "JobHuntingCertificate",
      //   // "Resume",
      //   // "LaborContract",
      //   // "ResignationLetter",
      //   // "PositionOffer",
      //   // "ConsultationOnLabor",
      //   // "PaidProductPurchase",
      // ];
      // console.log(this.$route.name);
      // if (viewMoreNames.includes(this.$route.name)) {
      //   this.$router.push({
      //     name: "home",
      //   });
      //   // this.commonStore.state.isViewmoreMenuOpen = true;
      // }
      //  if (this.$route.name == "LaborContractDetails") {
      //   this.$router.push({
      //     name: "LaborContract",
      //   });
      // }
      if (
        this.$route.name == "CompanyStarRating" ||
        this.$route.name == "RecruiterStarManagementEvaluation" ||
        this.$route.name == "LaborContract" ||
        this.$route.name == "FindEmailAuthenticate" ||
        this.$route.name == "ForgotPassword" ||
        this.$route.name == "ProfileSetting" ||
        this.$route.name == "EditMemberInformation" ||
        this.$route.name == "RecruiterEditMemberInformation" ||
        this.$route.name == "ConsultationOnLabor" ||
        this.$route.name == "JobHuntingCertificate" ||
        this.$route.name == "RecruiterMyPage" ||
        this.$route.name == "RecruiterSnsLoginSetting" ||
        this.$route.name == "LaborContractDetails" ||
        this.$route.name == "PaidProductLocker"
      ) {
        this.$emit("backButtonPressed");
      } else if (
        this.$route.name == "SuperShortCoinShop" &&
        Object.keys(this.$route.query).length !== 0
      ) {
        if (this.$route.query.fromPurchase == "fromAdTypePurchase") {
          this.$router.push({
            name: "NoticeRegistration",
            query: { backPressed: true },
          });
        } else {
          this.$router.push({
            name: "PaidProductPurchase",
            query: { backPressed: true },
          });
        }
      } else {
        if (window.history.state == null) {
          this.$router.push({ name: "home" });
        } else {
          this.$router.go(-1);
        }
      }
    },

    search() {
      this.$emit("searchData", this.searchValProps, true);
    },

    changeSearchVal() {
      // this.searchValue=val1
      // alert(this.searchValProps)
      if (this.searchValProps.length === 0) {
        this.$emit("changeSearchVal", this.searchValProps);
        return (this.tempLen = 0);
      }
      if (this.periousSerachVal !== this.searchValProps) {
        this.periousSerachVal = this.searchValProps;
        this.tempLen = this.tempLen + 1;
      }
      if (this.tempLen === 3) {
        this.$emit("changeSearchVal", this.searchValProps);
        this.tempLen = 0;
      }
    },
  },
};
</script>
