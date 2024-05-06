import { reactive } from "vue";
import moment from "moment";

const state = reactive({
  isSheetOpen: false,
  loginDefault: 0,
  isPrivacySheetOpen: false,
  isScraped: false,
  isSilverBellOpen: false,
  isAddCareer: false,
  currentThemeStore: "theme-small",
  themeSetting: 0,
  isAddfileUpload: false,
  isAddOtherDoc: false,
  isSignatureOpen: false,
  isContractEmailModal: false,
  isViewmoreMenuOpen: false,
  isCancleApplication: false,
  isMobile: false,
  isiPhone: false,
  isTermsOfServiceModal: false,
  isPaidProductAppModal: false,
  isPaidProductCancelModal: false,
  isApplyChooseResume: false,
  paidProductPayment: false,
  isModalNotificationTypePurchase: false,
  showPaidProductPaymentModal: false,
  showPaidProductApplicationModal: false,
  showAutomatiocJobPostSheet: false,
  showPositionSuggestionSetup: false,
  applyPaidProductSheet: false,
  isMultijobPostingModal: false,
  searchValue: '',
  popupMessageShow: false,
  requiredToastMsgShow: false,
  appStatusTab: '지원 완료',
  AiRecommendationData: {
    page: 0, 
    limit: 10,
    career_type: "",
    work_places: [],
    occupations: [],
    working_periods: [],
    employment_type: [],
    gender: "",
    pay_type: "",
    salary: "",
    age: "",
  },
  
  regObj: {
    // id: 5,
    // employer_id: 3,
    // seeker_id: 1,
    // application_status: "accepted",
    // company_name: "inside Job",
    // name: "api issue",
    // term_start_date: "2022-09-07T04:52:37.000Z",
    // status: "writtable",
  },
  fourstepdata: {},
  edata: {}, //prefill jobposting data
  loginInfoModal: {
    isShow: false,
    message: "",
    logintype: "",
  },
  paidProductPurchaseStoreData: {},
  fromPage: ""
});

const methods = {
  sendRegObj(val) {
    state.fourstepdata = val;
  },
  storePaidProducts(val) {
    state.paidProductPurchaseStoreData = val;
  },
  seteditdata(val) {
    state.edata = val;
  },
  openSheet(val) {
    console.log("opensheethandelar");
    state.isSheetOpen = val;
  },
  fetchRegObj(val) {
    state.regObj = val;
  },
  openSilverBellModal(val) {
    state.isSilverBellOpen = val;
  },
  changeTheme(val) {
    state.currentThemeStore = val;
    state.themeSetting = state.currentThemeStore === "theme-small" ? 0 : 1;
    console.log("current theme", state.currentThemeStore);
  },

  dateFormat(dt, fm, n = "NA") {
    if (!dt) return n;
    let formatedDate = moment(String(dt)).format(fm);
    return formatedDate;
  },
  // check if it's from APP
  isFromApp() {
    // const cookies = VueCookies();
    var queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var mobile = urlParams.get("mobile");
    var iphone = urlParams.get("isiPhone");
    if (mobile == "true") {
      state.isMobile = true;
      document.cookie = "isMobile=true";
      localStorage.setItem("isMobile", true);
      if (iphone == "true") {
        state.isiPhone = true;
        document.cookie = "isiPhone=true";
        localStorage.setItem("isiPhone", true);
      }
    }
    setTimeout(() => {
      // alert(state.isMobile);
      // alert(state.isiPhone);
      console.log("state.isMobile:-", state.isMobile);
      console.log("state.isiPhone:-", state.isiPhone);
    }, 4000);
  },

  formatSalary(val) {
    if(val !== null) {
    let value = val
    let count = 0;
    let str = "";
    for (let i = value.length - 1; i >= 0; i--) {
      count = count + 1;
      str = str + value[i];
      if (count === 3 && i !== 0) {
        count = 0;
        str = str + ",";
      }
    }
    let formatedStr = "";
    for (let j = str.length - 1; j >= 0; j--) {
      formatedStr = formatedStr + str[j];
    }
    return formatedStr;
  }
  return null
  },

  scrappedSuccessful() {
    state.popupMessageShow = true
    setTimeout(() => { state.popupMessageShow = false }, 4000)
  },

  displayRequiredToast() {
    state.requiredToastMsgShow = true
    setTimeout(() => { state.requiredToastMsgShow = false }, 2000)
  },

  textFormat(text, count, insertDots){
    return text.slice(0, count) + (((text.length > count) && insertDots) ? "..." : "");
  }
};

export default {
  state,
  methods,
};
