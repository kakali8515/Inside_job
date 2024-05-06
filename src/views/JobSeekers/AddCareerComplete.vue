<template>
    <div class="back-wh common-sec">
        <div class="top-hdr top-hdr-br">
            <div class="container">
                <h4 class="heading"><a href="javascript:void(0);" class="left-arrow">
                <img src="@/assets/icons/left-arrow.svg" alt="" /></a>경력사항</h4>
            </div>
        </div>
        <div class="container">
            <p class="date-box">지원자의 경력은 <span>총</span> <em>0</em> <span>년</span> <em>5</em> <span>개월</span> 입니다.</p>
            <CareerCard>
                <template v-slot:cr-date>
                    <span>2022.01 ~ 2022.06</span>
                </template>
                <template v-slot:cr-title>
                    <h3 class="sb-heading">쿠팡</h3>
                </template>
                <template v-slot:cr-link>
                    <a href="javascript:void(0);" class="detail-link">
                        상세 내역
                    </a>
                </template>
                <template v-slot:edit>
                    <div class="edit-innr">
                        <a href="javascript:void(0);"><img src="@/assets/icons/edit.svg" alt="" /></a>
                        <a href="javascript:void(0);"><img src="@/assets/icons/cross.svg" alt="" /></a>
                    </div>   
                </template>
            </CareerCard>
            <a href="#" class="btn btn-border-outline lg">경력 추가하기</a>
        </div>
    </div>
    <div class="btm-button-group">
        <a href="#" class="btn btn-primary lg">저장하기</a>
    </div>
</template>


<script>
import CareerCard from '@/components/CareerCard.vue';
  export default {
    name: "AddCareerComplete",
    components: { CareerCard }
}
  </script>