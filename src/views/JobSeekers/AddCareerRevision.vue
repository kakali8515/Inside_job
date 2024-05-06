<template>
    <div class="back-wh common-sec">
        <div class="top-hdr">
            <div class="container">
                <h4 class="heading"><a href="javascript:void(0);" class="left-arrow">
                <img src="@/assets/icons/left-arrow.svg" alt="" /></a>경력 수정</h4>
            </div>
        </div>
        <div class="pb-32">
            <div class="container">
                <div class="cm-back form-wrapper">
                    <div class="form-group">
                        <label>회사명</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="회사명"
                        />
                    </div>
                    <div class="form-group">
                        <label>근무형태</label>
                        <select class="form-control">
                            <option>아르바이트</option>
                            <option>아르바이트</option>
                            <option>아르바이트</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>근무기간</label>
                        <div class="business-period-cont">
                            <div class="period-row from-row">
                                <ul class="date-info">
                                    <li><span><input type="text" class="form-control" placeholder="2022"></span>년</li>
                                    <li><span><input type="text" class="form-control" placeholder="01"></span>월</li>
                                </ul>   
                                <span>부터</span>  
                            </div>
                            <div class="period-row until-row">
                                <ul class="date-info">
                                    <li><span><input type="text" class="form-control" placeholder="2022"></span>년</li>
                                    <li><span><input type="text" class="form-control" placeholder="02"></span>월</li>
                                </ul>   
                                <span>까지</span>  
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>담당업무</label>
                        <textarea class="form-control" placeholder="담당업무를 입력해 주세요"></textarea>
                        <div class="count">
                            <span class="count-txt"><img src="@/assets/icons/initialization.svg" alt="" /> 초기화</span>
                            <p><span>121</span> /500</p>
                        </div>
                    </div>
                    <input type="submit"  class="btn btn-primary lg" value="수정하기" />
                </div>
            </div>
        </div>
    </div>
</template>


<script>
  export default {
    name: "AddCareerRevision",
}
  </script>