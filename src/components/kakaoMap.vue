<template>
  <div class="map-outr" v-show="!regionStore.state.isRegionOpen">
    <div class="map_wrap">
      <div id="map" @click="getlatlong()" v-if="renderComponent"></div>
      <!-- 지도타입 컨트롤 div 입니다 -->
      <!-- 지도 확대, 축소 컨트롤 div 입니다 -->
    </div>
    <div class="map-icon-list">
      <div class="container">
        <ul>
          <li>
            <a
              href="javascript:void(0);"
              @click="
                defaultset(),
                  (regionStore.state.isRegionOpen = true),
                  $emit('hidePage')
              "
            >
              <span><img src="@/assets/icons/map-icon1.svg" alt="" /></span>
              지역선택
            </a>
          </li>
          <li>
            <a href="javascript:void(0);" class="direction">
              <span @click="getlocation()"
                ><img src="@/assets/icons/map-icon2.svg" alt=""
              /></span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="map-card" v-show="detailoff" @touchmove="detailoff = false">
      <div class="container">
        <CardWrapper>
          <template v-slot:content>
            <span
              class="bookmark"
              v-if="
                (isLogin && authStore.state.loginType == 'job_seeker') ||
                !isLogin
              "
              ><img
                v-show="joblistdata.is_scraps == 0"
                @click="
                  addtoScarp(joblistdata.id),
                    loginType == 'job_seeker' || loginType == 'job_recruiter'
                      ? (joblistdata.is_scraps = 1)
                      : joblistdata.is_scraps == 0
                "
                src="@/assets/icons/bookmark-icon.svg"
                alt="" />
              <img
                v-show="joblistdata.is_scraps == 1"
                @click="
                  deleteScarp(joblistdata.scrap_id),
                    loginType == 'job_seeker' || loginType == 'job_recruiter'
                      ? (joblistdata.is_scraps = 0)
                      : joblistdata.is_scraps == 1
                "
                src="@/assets/icons/bookmark-red-icon.svg"
                alt=""
            /></span>
            <h5>{{ joblistdata.company_name }}</h5>
            <h3
              @click="
                $router.push({
                  name: 'RecruiterJobPostingDetails',
                  params: { id: joblistdata.id },
                })
              "
            >
              <!-- [{{ joblistdata.company_name }}] -->
              {{ joblistdata.announcement_title }}
              <!-- scarp {{ joblistdata.is_scraps }} -->
            </h3>
          </template>
          <template v-slot:btn>
            <!-- <h6>
              서울 전체<span>{{ joblistdata.pay_type=="hourly_wage"?"시급":joblistdata.pay_type=="daily_wage"?"일급":joblistdata.pay_type=="salary"?"월급":joblistdata.pay_type }}</span>
              {{ joblistdata.salary }}원
            </h6> -->
            <h6>
              <b>
                {{ joblistdata.rf_text }} {{ joblistdata.rs_text }}
                {{ joblistdata.rt_text }}</b
              >
              <!-- <span style="color: #e0e0e0; margin-left: 4px">&#x2022;</span> -->
              <div class="hr-wage">
                <span v-if="joblistdata.pay_type === 'hourly_wage'">시급</span>

                <span style="" v-if="joblistdata.pay_type === 'daily_wage'"
                  >일급</span
                >
                <span
                  style="margin-left: 4px"
                  v-if="joblistdata.pay_type === 'salary'"
                  >월급</span
                >
                {{
                  joblistdata.salary == undefined || null
                    ? ""
                    : commonStore.methods.formatSalary(joblistdata.salary)
                }}원
              </div>
            </h6>
            <span
              v-if="
                (isLogin && authStore.state.loginType == 'job_seeker') ||
                !isLogin
              "
              class="btn btn-primary-gradient apply-btn"
              @click="setresume(joblistdata.id)"
              >지원하기</span
            >
          </template>
        </CardWrapper>
      </div>
    </div>
    <!-- <Sheet v-model:visible="isOpen">
      <RegionSelect @setfalse="hideregion($event)" />
    </Sheet> -->
    <!-- <div class="button-group"> -->
    <!-- <button @click="changeSize(0)">Hide</button>
      <button @click="changeSize(400)">show</button>
      <button @click="displayMarker(markerPositions1)">marker set 1</button>
      <button @click="displayMarker(markerPositions2)">marker set 2</button>
      <button @click="displayMarker([])">marker set 3 (empty)</button>
      <button @click="displayInfoWindow">infowindow</button>
      <button @click="changestyl">change style</button>
      <button @click="setLocation()">gps Now</button> -->
    <!-- <button @click="getJoblistMarker">Job list marker</button> -->
    <!-- </div> -->
    <div
      class="scrapped-icon scrapped-icon-transform act region_scrap"
      v-if="popupMessageShow"
    >
      <p>
        <span><img src="@/assets/icons/scrapped-icon.svg" alt="" /></span>
        스크랩했습니다.
      </p>
    </div>
    <ApplyChooseResume
      :id="commonStore.state.job_id"
      v-if="commonStore.state.isApplyChooseResume"
    />
  </div>
  <MultipleJobList
    :jobarray="job_listAry"
    v-if="(commonStore.state.isMultipleJobList = true)"
  />
  <!-- <ScrapedToast /> -->

  <!-- <div style="background-color: #ff9; margin: 15px; padding: 10px">
     <h3>{{joblistdata.company_name}}</h3>
  </div> -->
  <!-- <Sheet v-model:visible="isOpen"> -->
  <RegionSelect
    @setfalse="hideregion($event)"
    v-show="regionStore.state.isRegionOpen"
  />
  <LoadingBar v-if="loading.state" :loadingMsg="loading.message" />
  <!-- </Sheet> -->
</template>
<script>
// D:\Insidejob-admin\Insidejob-frontend\insidejob\src\views\JobSeekers\ApplyChooseResume.vue
import LoadingBar from "@/components/Utils/LoadingBar.vue";
import ApplyChooseResume from "../views/JobSeekers/ApplyChooseResume.vue";
import MultipleJobList from "../views/JobSeekers/MultipleJobList.vue";
import mapService from "../service/API/region";
import CardWrapper from "@/components/CardWrapper.vue";
import { inject } from "@vue/runtime-core";
import RegionSelect from "@/views/JobSeekers/RegionSelect.vue";
import { useCookies } from "vue3-cookies";
export default {
  name: "KakaoMap",
  components: {
    CardWrapper,
    RegionSelect,
    ApplyChooseResume,
    MultipleJobList,
    LoadingBar,
  },
  el: "#map",
  data() {
    return {
      loading: {
        state: false,
        message: "잠시만 기다려 주세요.",
      },
      job_listAry: [],
      isOpen: false,
      regionStore: inject("regionStore"),
      authStore: inject("authenticateStore"),
      store: inject("occupationStore"),
      commonStore: inject("commonStore"),
      job_id: "",
      renderComponent: true,
      markerPositions1: [
        [33.452278, 126.567803],
        [33.452671, 126.574792],
        [33.451744, 126.572441],
      ],
      markerPositions2: [
        [37.499590490909185, 127.0263723554437],
        [37.499427948430814, 127.02794423197847],
        [37.498553760499505, 127.02882598822454],
        [37.497625593121384, 127.02935713582038],
        [37.49629291770947, 127.02587362608637],
        [37.49754540521486, 127.02546694890695],
        [37.49646391248451, 127.02675574250912],
      ],
      markers: [],
      infowindow: null,
      map: "",
      lat: "37.5665",
      long: "126.9780",
      lat1: "37.5665",
      long1: "126.9780",
      jobList: [],
      positions: [],
      joblistdata: {},
      detailoff: false,
      loginType: localStorage.getItem("login_type"),
      popupMessageShow: false,
      cookies: new useCookies(),
      latitude: JSON.parse(this.$cookies.get("lat")),
      longitude: JSON.parse(this.$cookies.get("long")),
    };
  },
  mounted() {
    console.log("latiTude : ", this.latitude);
    console.log("longiTude : ", this.longitude);
    // this.hellomap();
    this.getlocation();
    document.documentElement.style.overflow = "hidden";
  },
  computed: {
    isLogin() {
      return this.authStore.state.token ? true : false;
    }
  },
  watch: {
    // whenever question changes, this function will run
    'this.commonStore.state.isMultipleJobList':
    function(newVal, oldVal) {
        if (newVal) {
          var body = document.querySelector("html");
          body.style.overflow = "hidden";
        } else {
          var body = document.querySelector("html");
          body.style.overflow = "auto";
        }
      }
  },
  unmounted() {
    document.documentElement.style.overflow = "auto";
  },
  created() {
    this.mapservice = new mapService();
    // this.getlocation();
  },
  methods: {
    setresume(id) {
      this.commonStore.state.job_id = id;
      this.commonStore.state.isApplyChooseResume = true;
    },
    defaultset() {
      document.documentElement.style.overflow = "auto";
    },
    hideregion(data) {
      this.regionStore.state.isRegionOpen = data;
      this.$emit("hidePage");
      if (this.regionStore.state.workPlaceVisibleState.length > 0) {
        this.$router.push({ name: "RegionSelectList" });
      }
    },
    regionjobList() {
      let input = {
        region_places: this.regionStore.state.totalFilters,
        page: "1",
        limit: "10",
        silver_bell_status: 1,
      };
      this.mapservice
        .joblistRegion(input)
        .then((res) => {
          console.log("RegionjobList-", res.data.data);
        })
        .catch((err) => console.log(err));
    },
    forceRerender() {
      // Removing my-component from the DOM
      this.renderComponent = false;

      this.$nextTick(() => {
        // alert(this.renderComponent);
        // Adding the component back in
        this.renderComponent = true;
      });
    },
    forceUpdate() {
      // location.reload();
      // this.$destroy(this.$el);
      // this.$el.parentNode.removeChild(this.$el);
    },
    hellomap() {
      let mapstatus = localStorage.getItem("mapstatus");
      if (window.kakao && window.kakao.maps) {
        this.initMap();
        if (mapstatus == "load") {
          // alert("one");
          this.loading.state = true;
          setTimeout(() => {
            this.getJobList();
            this.loading.state = false;
            localStorage.removeItem("mapstatus");
          }, 5000);
        } else {
          this.getJobList();
        }
      } else {
        if (mapstatus == "load") {
          // alert("two");
          this.loading.state = true;
          setTimeout(() => {
            this.getJobList();
            this.loading.state = false;
            localStorage.removeItem("mapstatus");
          }, 5000);
        } else {
          this.getJobList();
        }
        const script = document.createElement("script");
        /* global kakao */
        script.onload = () => kakao.maps.load(this.initMap);
        script.src =
          "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=baba53ab5d2d7c1f634c44f9de972bcc&libraries=clusterer";
        document.head.appendChild(script);
      }
    },
    addtoScarp(input) {
      this.mapservice.addscarp({ id: input }).then((res) => {
        console.log(res);
        // this.hellomap();
        this.popupMessageShow = true;
        setTimeout(() => {
          this.popupMessageShow = false;
        }, 4000);
      });
    },
    deleteScarp(input) {
      this.mapservice
        .deletescarp({ id: [input] })
        .then((res) => {
          console.log(res);
          // this.hellomap();
        })
        .catch((err) => console.log(err));
    },
    getlatlong() {
      kakao.maps.event.addListener(this.map, "click", function (mouseEvent) {
        // var latlng = mouseEvent.latLng;
        if (this.detailoff == true) {
          this.detailoff = false;
        }
        // console.log(latlng);
        // alert("lat_long= " + latlng.toString());
      });
    },
    getJobList() {
      this.jobList = [];
      let input = {
        page: 1,
        limit: 10000000000,
        latitude: this.lat1,
        longitude: this.long1,
        radius: 1000, //1.5km
        silver_bell_status:
          localStorage.getItem("silverBtn-modal") == true ? 1 : 0,
        occupations: this.store.state.totalFilters,
      };
      let self = this;
      this.mapservice
        .joblist(input)
        .then((res) => {
          this.jobList = res.data.data;
          console.log("this.jobList-", this.jobList);
          this.store.methods.setJoblist(res.data.data);
          // console.log('Region data=',this.store.state.jobList)
          setTimeout(() => {
            self.getJoblistMarker();
          }, 1000);
        })
        .catch((err) => console.log(err));
    },
    getJoblistMarker() {
      console.log("markers setted successfully");
      // customOverlay.setMap(this.map);
      var positions = this.jobList.map((item) => {
        const container = {};
        container.title = item.announcement_title;
        container.paytype = item.pay_type;
        container.desc = item.salary;
        container.latlng = new kakao.maps.LatLng(item.lat, item.long);
        container.totaljob = item.totalnumber;
        return container;
      });
      // console.log(finalList);

      // var positionss = [
      //   {
      //     title: "Title 1",
      //     desc: "Desc 1",
      //     latlng: new kakao.maps.LatLng(33.450705, 126.570677),
      //   },
      //   {
      //     title: "Title 2",
      //     desc: "Desc 2",
      //     latlng: new kakao.maps.LatLng(33.45663, 126.577623),
      //   },
      //   {
      //     title: "Title 3",
      //     desc: "Desc 3",
      //     latlng: new kakao.maps.LatLng(33.447256, 126.557901),
      //   },
      //   {
      //     title: "Title 4",
      //     desc: "Desc 4",
      //     latlng: new kakao.maps.LatLng(33.456129, 126.563298),
      //   },
      // ];
      // 마커 이미지의 이미지 주소입니다
      var imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

      for (var i = 0; i < positions.length; i++) {
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(20, 30);

        // 마커 이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
          map: this.map, // 마커를 표시할 지도
          position: positions[i].latlng, // 마커를 표시할 위치
          title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          desc: positions[i].desc, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage, // 마커 이미지
          totaljob: positions[i].totaljob, // total job exists in this location
        });
        //container showing on marker Text
        //+ 더 보기
        //class: extraWrap
        var content = `<div class="wrap ${
          positions[i].totaljob > 1 ? "" : ""
        }">
            <div class="info">
              <div class="body">
                    <div class="desc">
                  <div class="ellipsis"><span style='color:red;font-weight:600;'>${
                    positions[i].paytype == "daily_wage"
                      ? "일급"
                      : positions[i].paytype == "hourly_wage"
                      ? "시급"
                      : positions[i].paytype == "salary"
                      ? "월급"
                      : positions[i].paytype
                  }</span><span style='color:#000;font-weight:600;'> ${
          positions[i].desc == undefined || null
            ? ""
            : this.commonStore.methods.formatSalary(positions[i].desc)
        } 원 <span style='color:#D3D3D3;'>${
          positions[i].totaljob > 1 ? "" : ""
        }</span></span></div>
                  <div class="ellipsis"></div>
                      </div>
                  </div>
              </div>
            </div>`;

        // Create an infowindow to display on the marker
        var infowindow = new kakao.maps.InfoWindow({
          // content: positions[i].title, // 인포윈도우에 표시할 내용
        });

        kakao.maps.event.addListener(
          marker,
          "click",
          makeOverListener(this.map, marker, infowindow)
        );
        kakao.maps.event.addListener(
          marker,
          "mouseout",
          makeOutListener(infowindow)
        );

        var overlay = new kakao.maps.CustomOverlay({
          content: content,
          map: this.map,
          position: marker.getPosition(),
        });
      }
      let jobdetailsget = (data) => {
        console.log("data--", "matched job");
        let self = this;
        self.joblistdata = data;
        console.log(data);
        if (data.totalnumber > 1) {
          console.log(data.totalnumber);
          let filteredArray = this.jobList.filter(
            (obj) => obj.lat === data.lat && obj.long === data.long
          );
          console.log(filteredArray);
          // this.detailoff = true;
          this.commonStore.state.isMultijobPostingModal = true;
          this.job_listAry = filteredArray;
          console.log(this.commonStore.state.isMultijobPostingModal);
        } else {
          this.detailoff = true;
        }
      };
      let jblist = this.jobList;
      // This function creates a closure that displays an infowindow.
      function makeOverListener(map, marker) {
        return function () {
          // infowindow.open(map, marker);
          console.log("map--", map);
          console.log("marker--", marker.getTitle());
          let item = jblist.find(
            (item) => item.announcement_title === marker.getTitle()
          );
          this.joblistdata = item;
          jobdetailsget(item);
        };
      }

      // This function creates a closure that closes the infowindow.
      function makeOutListener(infowindow) {
        return function () {
          infowindow.close();
        };
      }

      // function closeOverlay() {
      //   overlay.setMap(null);
      // }
    },

    getlocation() {
      // alert('getLocation clicked.')
      // if (
      //   JSON.parse(this.$cookies.get("deviceLat")) == null &&
      //   JSON.parse(this.$cookies.get("deviceLong")) == null
      // ) {
      //   console.log("please check GPS");
      // } else {
      //   this.lat1 = this.$cookies.get("deviceLat");
      //   this.long1 = this.$cookies.get("deviceLong");
      //   this.hellomap();
      // }
      let data = {
        type: "currentlatlong",
      };
      window.parent.postMessage(JSON.stringify(data), "*");
      // alert("currentlatlong");

      // setTimeout(() => {
      window["getcurrentlatlong"] = async (res) => {
        // alert(
        //   "TEST POPUP getcurrentlatlong -- got from app : " +
        //     JSON.stringify(res)
        // );
        if (res) {
          await this.currentLatLongHandler(res).then((ress) => {
            // alert("lat-long---" + JSON.stringify(ress));
            this.$cookies.set("deviceLat", ress?.lat);
            this.$cookies.set("deviceLong", ress?.long);
            this.lat1 = ress?.lat.toString();
            this.long1 = ress?.long.toString();
            this.hellomap();
            // alert(`latitude : ${ress?.lat} longitude : ${ress?.long}`);
          });
        } else {
          alert("no data from app");
        }
      };
      // }, 2000);
    },

    currentLatLongHandler(data) {
      return new Promise((resolve, reject) => {
        if (data) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    },

    setLocation() {
      this.lat1 = this.lat;
      this.long1 = this.long;
      // this.initMap();
      // this.getlocation();
      // alert(this.lat1, this.long1);
    },
    setMapType(maptype) {
      var roadmapControl = document.getElementById("btnRoadmap");
      var skyviewControl = document.getElementById("btnSkyview");
      if (maptype === "roadmap") {
        console.log(this.map);
        this.map.setMapTypeId(this.map.MapTypeId.ROADMAP);
        roadmapControl.className = "selected_btn";
        skyviewControl.className = "btn";
      } else {
        map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
        skyviewControl.className = "selected_btn";
        roadmapControl.className = "btn";
      }
    },
    changestyl() {
      this.map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
      this.map.setLevel(4, { animate: true });
      this.map.getDraggable();
    },
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(this.lat1, this.long1),
        // center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 4,
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
      console.log(this.map);
      this.getlatlong();
      // this.getJoblistMarker();
    },
    changeSize(size) {
      const container = document.getElementById("map");
      container.style.width = `${size}px`;
      container.style.height = `${size}px`;
      this.map.relayout();
    },
    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }

      const positions = markerPositions.map(
        (position) => new kakao.maps.LatLng(...position)
      );

      if (positions.length > 0) {
        this.markers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position,
            })
        );
        console.log(this.markers);
        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
        );

        this.map.setBounds(bounds);
      }
    },
    // 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
    zoomIn() {
      this.map.setLevel(map.getLevel() - 1);
    },
    // 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
    zoomOut() {
      this.map.setLevel(map.getLevel() + 1);
    },
    displayInfoWindow() {
      if (this.infowindow && this.infowindow.getMap()) {
        //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
        this.map.setCenter(this.infowindow.getPosition());
        return;
      }

      var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new kakao.maps.LatLng(33.450701, 126.570667), //인포윈도우 표시 위치입니다
        iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      this.infowindow = new kakao.maps.InfoWindow({
        map: this.map, // 인포윈도우가 표시될 지도
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable,
      });

      this.map.setCenter(iwPosition);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html {
  overflow-y: hidden !important;
}
body {
  overflow-y: hidden !important;
}
#map {
  width: 100%;
  height: 100vh;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}

#map .wrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  height: 132px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  line-height: 1.5;
}

#map.wrap * {
  padding: 0;
  margin: 0;
}

.wrap .info {
  width: 286px;
  height: 120px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}

.wrap .info:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}

.info .title {
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
}

.info .close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  width: 17px;
  height: 17px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
}

.info .close:hover {
  cursor: pointer;
}

.info .body {
  position: relative;
  overflow: hidden;
}

.info .desc {
  position: relative;
  margin: 13px 0 0 90px;
  height: 75px;
}

.desc .ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.desc .jibun {
  font-size: 11px;
  color: #888;
  margin-top: -2px;
}
.info .img {
  position: absolute;
  top: 6px;
  left: 5px;
  width: 73px;
  height: 71px;
  border: 1px solid #ddd;
  color: #888;
  overflow: hidden;
}

.info:after {
  content: "";
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: 0;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}

.info .link {
  color: #5085bb;
}
.region_scrap.scrapped-icon-transform {
  transform: translateY(0);
}
</style>
