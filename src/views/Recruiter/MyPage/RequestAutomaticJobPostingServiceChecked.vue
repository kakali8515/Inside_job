<template>
    <div class="back-wh">        
        <div class="top-hdr top-hdr-new m-0">
            <div class="container">
                <h4 class="heading">
                <a href="javascript:void(0);" class="cross-arrow"
                    ><img src="@/assets/icons/cross-icon2.svg" alt=""  @click="$router.push('/job-seekers/scrap')"/></a
                >자동 채용공고 등록 신청
                </h4>
            </div>
        </div>     
    <div class="auto-job-wrapper">
      <div class="container">        
            <div class="paragraph-area">        
                <h4>자동 채용공고 등록 신청</h4> 
                <p>자동 채용공고 등록을 신청하시면 초단알바가 타 웹사이트에 게재된 사용자의 구인 정보를 토대로 새로운 채용공고를 등록해 드립니다.</p>
                <div class="auto-icon">
                    <img src="@/assets/images/document_case.svg" alt=""/>
                </div> 
                <ul>
                    <li>본 기능은 타 웹사이트에 기 게재된 구인정보를 토대로 게재되므로 타 웹사이트에서 동일 회원(사업자)의 ‘구인정보’를 찾지 못하였거나 충분한 정보를 검색할 수 없는 경우, 부득이하게 반려 처리 될 수 있습니다.</li>
                    <li>타 웹사이트에 기재된 내용이 많을 경우, 가장 최근 채용공고를 기준으로 등록됩니다.</li>
                    <li>본 기능은 자동 등록 과정에서 타사와 다른 포맷과 표기규정으로 인해 일부 정보가 누락, 오기 될 수 있습니다.</li>
                    <li>이 공고는
                        <ul>
                            <li>구인자의 이름과 회사명으로 등록됩니다.</li>
                            <li>무료 라인 상품이 적용됩니다.</li>
                            <li>수정 및 삭제가 가능합니다.</li>
                            <li>하나의 공고가 등록됩니다. 더 많은 공고를 등록하기를 원하신다면 재신청 해 주세요.</li>
                            <li>자동 공고 등록에는 1 - 2일이 소요되며 게재 완료 후 알림이 발송됩니다.</li>
                        </ul>
                    </li>
                </ul>
                <div class="agree-txt">
                    <div class="form-wrapper">
                        <div class="form-group">
                            <div class="radio-wrapper">
                                <label class="radio-input">서비스 이용에 동의합니다. 
                                    <input type="radio" name="radio" checked value="hourly_wage">
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <p>초단알바 회원가입 시 등록한 정보를 활용하여 다른 서비스에 등록된 구인공고 정보와 사진 등을 검색하고 이를 ‘초단알바’ 서비스에서 등록하고 활용하는데 동의합니다.</p>
                </div>
            </div>

            <div class="fixed-btn-otr">
                <!-- <input type="button" class="btn btn-disable-gray-bg lg" value="신청하기"> -->
                <input type="button" class="btn btn-primary lg" value="신청하기">
            </div>
        </div>
      </div>
            
    </div>

   

  </template>
  
  <script>
  import InnerHeader from "@/components/innerHeader.vue";  
  export default {
    name: "RecruiterPrivacyPolicy",
    components: {
      InnerHeader,
    },
  };
  </script>
  