<template>
    <div class="back-wh common-sec">
        <div class="top-hdr top-hdr-br">
            <div class="container">
                <h4 class="heading"><a href="javascript:void(0);" class="left-arrow">
                <img src="@/assets/icons/left-arrow.svg" alt="" /></a>직무선택
                <a href="javascript:void(0);" class="refresh"><img src="@/assets/icons/refresh.svg" alt="" /></a></h4>
            </div>
        </div>
        <div class="container">    
            <p class="number">선택가능갯수 <span>3</span>/10</p>
            <div class="table">
                <div class="table-col">
                    <div class="table-head">
                        <span>시/도</span>
                    </div>
                    <div class="table-body">
                        <ul>
                            <li class="active">서울</li>
                            <li>경기</li>
                            <li>인천</li>
                            <li>강원</li>
                            <li>대전</li>
                            <li>세종</li>
                            <li>충남</li>
                            <li>충북</li>
                            <li>부산</li>
                            <li>울산</li>
                            <li>경남</li>
                        </ul>
                    </div>
                </div>
                <div class="table-col">
                    <div class="table-head">
                        <span>시/구/군</span>
                    </div>
                    <div class="table-body">
                        <ul>
                            <li>서울 전체</li>
                            <li>강남구</li>
                            <li>강동구</li>
                            <li class="active">강북구</li>
                            <li>강서구</li>
                            <li>관악구</li>
                            <li>광진구</li>
                            <li>구로구</li>
                            <li>금천구</li>
                            <li>노원구</li>
                            <li>도봉구</li>
                            <li>동대문구</li>
                        </ul>
                    </div>
                </div>
                <div class="table-col">
                    <div class="table-head">
                        <span>읍/면/동</span>
                    </div>
                    <div class="table-body">
                        <ul>
                            <li>강북구 전체</li>
                            <li>강일동</li>
                            <li>고덕동</li>
                            <li>고덕1동</li>
                            <li>고덕2동</li>
                            <li class="active">길동</li>
                            <li class="active">둔촌동</li>
                            <li>둔촌1동</li>
                            <li>둔촌2동</li>
                            <li>명일동</li>
                            <li>명일1동</li>
                            <li>명일2동</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="setting-btm">
            <div class="container">    
                <div class="sub-otr mb-21">
                    <h3 class="sub-heading mb-0">선택한 지역</h3>
                </div>  
                <ul class="selected-list">
                    <li>신설동 <a href="#"><img src="@/assets/icons/cross.svg" alt="" /></a></li>
                    <li>용두동 <a href="#"><img src="@/assets/icons/cross.svg" alt="" /></a></li>
                    <li>금천구 전체 <a href="#"><img src="@/assets/icons/cross.svg" alt="" /></a></li>
                </ul>
                <a href="#" class="btn btn-primary lg">설정하기</a>
            </div>
        </div>
    </div>
</template>


<script>
    export default { 
        name: "JobSelection",
    }
</script>
