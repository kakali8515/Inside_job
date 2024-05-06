<template>
    <div class="common-sec back-wh">
      <div class="top-hdr top-hdr-br mb-16">
        <div class="container">
          <InnerHeader headerTitle="취업활동 증명서" />
        </div>
      </div>
      <div class="container">        
        <div class="scrap-warpper">
                <div class="heading">
                    <div class="all-check-cont">
                        <label class="square-check-input">문서 리스트 
                            <input type="checkbox">
                            <span class="checkmark"></span>
                        </label>
                    </div>            
                    <button class="btn btn-primary-outline">선택 취소</button>
                </div>               

                <!-- Code For Job Hunting Certificate Select List -->
                <div class="scrap-list-cont ">                  
                  <div class="job-hunting-card">
                      <div class="date">
                          <div class="sub-check-cont">
                              <label class="square-check-input">
                                  <input type="checkbox">
                                  <span class="checkmark"></span>
                              </label>
                          </div> 
                          <p>2022.06.12</p></div>                       
                      <div class="info">
                          <ul>
                              <li><span>회사명</span>디비스쿨</li>
                              <li><span>지원 이력서</span>똘똘하고 일 잘한다는 말을 많이 듣습니다.</li>
                              <li><span>주소</span>서울 강남구 000 00</li>
                          </ul>                           
                      </div>
                  </div>  
                  <div class="job-hunting-card">
                      <div class="date">
                          <div class="sub-check-cont">
                              <label class="square-check-input">
                                  <input type="checkbox">
                                  <span class="checkmark"></span>
                              </label>
                          </div> 
                          <p>2022.06.12</p></div>                       
                      <div class="info">
                          <ul>
                              <li><span>회사명</span>디비스쿨</li>
                              <li><span>지원 이력서</span>똘똘하고 일 잘한다는 말을 많이 듣습니다.</li>
                              <li><span>주소</span>서울 강남구 000 00</li>
                          </ul>                           
                      </div>
                  </div> 
                  <div class="job-hunting-card">
                      <div class="date">
                          <div class="sub-check-cont">
                              <label class="square-check-input">
                                  <input type="checkbox">
                                  <span class="checkmark"></span>
                              </label>
                          </div> 
                          <p>2022.06.12</p></div>                       
                      <div class="info">
                          <ul>
                              <li><span>회사명</span>디비스쿨</li>
                              <li><span>지원 이력서</span>똘똘하고 일 잘한다는 말을 많이 듣습니다.</li>
                              <li><span>주소</span>서울 강남구 000 00</li>
                          </ul>                           
                      </div>
                  </div> 
                  <div class="job-hunting-card">
                      <div class="date">
                          <div class="sub-check-cont">
                              <label class="square-check-input">
                                  <input type="checkbox">
                                  <span class="checkmark"></span>
                              </label>
                          </div> 
                          <p>2022.06.12</p></div>                       
                      <div class="info">
                          <ul>
                              <li><span>회사명</span>디비스쿨</li>
                              <li><span>지원 이력서</span>똘똘하고 일 잘한다는 말을 많이 듣습니다.</li>
                              <li><span>주소</span>서울 강남구 000 00</li>
                          </ul>                           
                      </div>
                  </div>                                    
                 </div>                     
            </div>        
      </div>
      <div class="btm-button-group">
          <a href="#" class="btn btn-primary lg">증명서 발급</a>
      </div>
    </div>
  </template>
  
  <script>
  import InnerHeader from "../../components/innerHeader.vue";
  export default {
    name: "JobHuntingCertificateSelect",
    components: {
      InnerHeader,     
    },
  };
  </script>
  