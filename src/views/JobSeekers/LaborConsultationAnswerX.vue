<template>
    <div class="back-wh">
        <div class="top-hdr m-0">
            <div class="container">
                <h4 class="heading mh-24"><a href="javascript:void(0);" class="left-arrow">
                <img src="@/assets/icons/left-arrow.svg" alt="" /></a></h4>
            </div>
        </div>
        <form>
            <div class="form-wrapper">
                <div class="cm-top-space pb-32">
                    <div class="container">
                        <div class="sub-otr b-color d-flex">
                            <h3 class="sub-heading mb-0">상담 제목</h3>
                            <p class="date gray">2022.01.10</p>
                        </div> 
                        <div class="form-group mb-0">
                            <input type="text" class="form-control" value="0000에 대한 문의 드립니다." />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <form>
        <div class="form-wrapper">
            <div class="back-wh border-top">
                <div class="cm-top-space pb-32">
                    <div class="container">
                        <div class="sub-otr b-color">
                            <h3 class="sub-heading mb-0">상담 내용</h3>
                        </div> 
                        <div class="form-group mb-0">
                            <textarea class="form-control" placeholder="">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Luctus tincidunt non et aliquam risus est vitae. A neque vitae vivamus in ultricies nibh tellus sed </textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="back-wh border-top">
                <div class="cm-top-space pb-32">
                    <div class="container">
                        <div class="sub-otr b-color">
                            <h3 class="sub-heading mb-0">상담 답변</h3>
                        </div> 
                        <div class="no-registere-box">
                            <p>등록된 답변이 없습니다.</p>
                        </div>
                    </div>
                </div>
            </div>
         </div>
   </form>
   <div class="btm-button-group mt-32 w-50">
        <a href="#" class="btn btn-primary-outline lg">삭제하기</a>
        <a href="#" class="btn btn-primary lg">수정하기</a>
    </div>
  </template>
  
  <script>
  export default {
    name: "LaborConsultationAnswerX",
}
  </script>
  
  