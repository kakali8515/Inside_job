<template>
  <div class="back-wh">
    <div class="top-hdr top-hdr-br">
      <div class="container">
        <h4 class="heading">
          <div class="innr-search">
            <span href="javascript:void(0);" class="left-arrow"
              ><img
                src="@/assets/icons/left-arrow.svg"
                alt=""
                @click="stepback()" /></span
            ><span>초단코인샵</span>
            <!-- <span class="cross-btn"
              ><img
                @click="writeModal = true"
                src="/src/assets/icons/modal-cross-icon.svg"
                alt=""
            /></span> -->
          </div>
        </h4>

        <!-- <InnerHeader headerTitle="초단코인샵" /> -->
      </div>
    </div>
    <div class="pb-32">
      <div class="container">
        <div class="super-coin-top">
          <div class="s-coin">
            <h3 class="sub-heading mb-0 lg">내 초코</h3>
            <p class="choco-btn">
              <img src="@/assets/icons/database-icon.svg" alt="" />
              <span>{{
                myPageData.details.total_ammount?.toLocaleString("en-US")
              }}</span>
              초코
            </p>
          </div>
          <router-link
            :to="{ name: 'ChodanCoinShopHistory' }"
            class="d-flex his-ic"
            >이용내역 <img src="@/assets/icons/right-arrow.svg" alt=""
          /></router-link>
        </div>
      </div>
    </div>
    <div class="border-top">
      <div class="cm-top-space pb-32">
        <div class="container">
          <div class="sub-otr b-color mb-0">
            <h3 class="sub-heading mb-0">초단코인 리스트</h3>
          </div>
          <ul class="super-coin-list">
            <li v-for="item in coinlist" :key="item.id">
              <p>
                <img src="@/assets/icons/database-icon-red.svg" alt="" />
                {{ item.coin_count?.toLocaleString("en-US") }}
                <span>초코</span>
              </p>
              <span class="btn btn-primary" @click="purches(item.id)">
                {{ item.coin_package_name }}
              </span>
            </li>
          </ul>
          <a
            href="javascript:void(0);"
            :class="{ show: active }"
            @click="active = !active"
            class="down-btn mt-16"
            >초단코인 이용방법
            <span class="arr1"
              ><img src="@/assets/icons/down-arrow-gray.svg" alt=""
            /></span>
            <span class="arr2"
              ><img src="@/assets/icons/up-arrow-gray.svg" alt=""
            /></span>
          </a>
          <div class="short-coin-content" :class="{ dropdownshow: active }">
            <p>
              초단코인을 이용하여 유료 공고 유형 적용 시 더 많은 <br />
              인재에게 내 공고를 노출 할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <InfoModal
    :isModal="isShowModal"
    :message="infoMessage"
    @closeModal="isShowModal = false"
  />
</template>

<script>
import coinService from "../../../service/API/coinManage";
import { recruitermypage } from "@/service/API/recruitermypage.js";
import InnerHeader from "@/components/innerHeader.vue";
// import testData from "../../../config/snssupport.json";
import InfoModal from "@/components/Modals/InfoModal.vue";
export default {
  name: "SuperShortCoinShop",
  components: {
    InnerHeader,
    InfoModal,
  },
  data() {
    return {
      active: false,
      coinlist: [],
      deviceType: "",
      coindata: [],
      coindata2: [],
      iscoinUpdate: false,
      isShowModal: false,
      infoMessage: "",
      myPageData: {
        details: "",
      },
    };
  },
  created() {
    this.coinservice = new coinService();
    this.loadCoinshop();
    this.myPageDetails();
    // console.log("testData--", testData.paymentsuccess);
  },
  mounted() {
    this.getCoinlist();

    window["getDevicetype"] = (ress) => {
      this.devicetypeHandler(ress);
    };
    window["getCoindata"] = (ress) => {
      this.coindataHandler(ress);
    };
    window["getPaymentresponse"] = (ress) => {
      this.paymentresponseHandler(ress);
    };
  },

  methods: {
    stepback() {
      if (this.$route.query.fromPurchase == "fromAdTypePurchase") {
          //console.log('from ad type')
          this.$router.push({
            name: "NoticeRegistration",
            query: {
              successful: false,
              totalBalance: "nothing",
            },
          });
        } else if(this.$route.query.fromPurchase == "fromPaidProductPurchase") {
          this.$router.push({
            name: "PaidProductPurchase",
            query: {
              successful: false,
              totalBalance: "nothing",
            },
          });
        }
        
        else {
          this.$router.go(-1);
          
        }

    },
    devicetypeHandler(res) {
      let data = res;
      this.deviceType = data.toLowerCase();
    },
    async myPageDetails() {
      let res = await recruitermypage.userRecruiterDeatils();
      if (res.status === 200) {
        this.myPageData.details = res.data.company_info;
        console.log("mydetails---", this.myPageData.details.total_ammount);
      }
    },
    async totalCoinsetter() {
      let res = await recruitermypage.userRecruiterDeatils();
      if (res.status === 200) {
        this.myPageData.details = res.data.company_info;
        if (this.$route.query.fromPurchase == "fromAdTypePurchase") {
          //console.log('from ad type')
          this.$router.push({
            name: "NoticeRegistration",
            query: {
              successful: true,
              totalBalance: res.data.company_info.total_ammount,
            },
          });
        } else if (this.$route.query.fromPurchase == 'fromPaidProductPurchase') {
          this.$router.push({
            name: "PaidProductPurchase",
            query: {
              successful: true,
              totalBalance: res.data.company_info.total_ammount,
            },
          });
        } 
        console.log("mydetails---", this.myPageData.details.total_ammount);
      }
    },
    getcoinfilter() {
      let product;
      if (this.deviceType == "android") {
        product = this.coinlist.filter(
          (item) => item.play_store_product_id != null
        );
      } else if (this.deviceType == "ios") {
        product = this.coinlist.filter(
          (item) => item.app_store_product_id != null
        );
      }
      return product;
    },
    getformatPrice(pid) {
      let product = this.coindata.data.find((item) => {
        return item.productId === pid;
      });
      if (this.deviceType == "android")
        return product?.oneTimePurchaseOfferDetails.formattedPrice;
      else if (this.deviceType == "ios") return product?.localizedPrice;
    },
    getformatName(pid) {
      let product = this.coindata.data.find((item) => {
        return item.productId === pid;
      });
      if (this.deviceType == "android")
        return parseInt(product?.name.replaceAll("초코", ""));
      else if (this.deviceType == "ios")
        return parseInt(product?.title.replaceAll("초코", ""));
    },
    getCoinlist() {
      this.coinservice
        .coinlist()
        .then((res) => {
          this.coinlist = res.data.data;
          console.log("this.coinlist--", this.coinlist);
          this.sendFiltercoin();
          this.coinlist = this.getcoinfilter();
        })
        .catch((err) => console.log(err));
    },
    coindataHandler(res) {
      if (res) {
        this.coindata = res;
        // this.coindata2 = JSON.stringify(res);
        this.coinlist.map((obj) => {
          if (this.deviceType == "android") {
            obj.coin_package_name =
              this.getformatPrice(obj.play_store_product_id) ||
              obj.coin_package_name;
            obj.coin_count =
              this.getformatName(obj.play_store_product_id) || obj.coin_count;
          } else if (this.deviceType == "ios") {
            obj.coin_package_name =
              this.getformatPrice(obj.app_store_product_id) ||
              obj.coin_package_name;
            obj.coin_count =
              this.getformatName(obj.app_store_product_id) || obj.coin_count;
          }
        });
        console.log("updated--", this.coinlist);
      } else {
        alert("No response from APP");
      }
    },
    paymentresponseHandler(res) {
      let paydata = res;
      let paydata2 = JSON.stringify(res);
      // alert(paydata2);
      if (this.deviceType == "android") {
        let paysdata = {
          device_type: "android",
          purchase_data: paydata,
        };

        this.coinservice
          .paymentsuccess(paysdata)
          .then((res) => {
            // alert("Android-Payment successfuly after reload" + JSON.stringify(res));
            //redirect methods
            this.totalCoinsetter();
            if (res.response.status == 200) {
              // this.isShowModa = true;
              // this.infoMessage = "Payment successfuly done";
              // this.$router.push({ name: 'RecruiterMyPage' });
              this.myPageDetails();
              // alert("Android-Payment successfuly done")
              // window.location.reload();
              // alert("Android-Payment successfuly after reload" + res);
              //redirect methods
              this.totalCoinsetter();

              //end redirect methods
            } else if (res.response.status == 400) {
              // this.isShowModa = true;
              // this.infoMessage = "Payment Failed";
              // this.$router.push({ name: 'RecruiterMyPage' });
              this.myPageDetails();
              // window.location.reload();
            }
          })
          .catch((err) => console.log(err));
      } else if (this.deviceType == "ios") {
        let paysdata = {
          device_type: "ios",
          purchase_data: paydata,
        };
        this.coinservice
          .paymentsuccess(paysdata)
          .then((res) => {
            // alert("ios-Payment successfuly after reload" + JSON.stringify(res));
            //redirect methods
            this.totalCoinsetter();
            if (res.response.status == 200) {
              // this.isShowModa = true;
              // this.infoMessage = "Payment successfuly done"
              // this.$router.push({ name: 'RecruiterMyPage' });
              // this.myPageDetails();
              // alert("ios-Payment successfuly done")
              window.location.reload();
              this.loadCoinshop();
              this.myPageDetails();
              // alert("ios-Payment successfuly after reload" + res);
              //redirect methods
              this.totalCoinsetter();

              //end redirect methods
              this.getCoinlist();
            } else if (res.response.status == 400) {
              // this.isShowModa = true;
              // this.infoMessage = "Payment Failed";
              // this.$router.push({ name: 'RecruiterMyPage' });
              //   this.myPageDetails();
              //   window.location.reload();
              this.loadCoinshop();
              this.myPageDetails();
              this.getCoinlist();
            }
          })
          .catch((err) => console.log(err));
      }
    },
    purches(res) {
      // this.paymentresponseHandler(testData.paymentsuccess);
      function filterCoindata(coin) {
        return coin.id == res;
      }
      let coinItem = this.coinlist.find(filterCoindata);
      if (this.deviceType == "android") {
        this.sendCoindataHandaler(coinItem.play_store_product_id);
      } else if (this.deviceType == "ios") {
        this.sendCoindataHandaler(coinItem.app_store_product_id);
      }
    },
    loadCoinshop() {
      let data = {
        type: "loadCoinshop",
      };
      window.parent.postMessage(JSON.stringify(data), "*");
    },
    sendFiltercoin() {
      let data = {
        type: "sendFiltercoin",
        products: this.getcoinfilter(),
      };
      window.parent.postMessage(JSON.stringify(data), "*");
    },
    sendCoindataHandaler(pid) {
      let data = {
        type: "sendCoindata",
        id: pid,
      };
      window.parent.postMessage(JSON.stringify(data), "*");
    },
  },
};
</script>
