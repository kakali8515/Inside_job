<template>
    <div class="back-wh common-sec pb-32">
        <div class="top-hdr">
            <div class="container">
                <h4 class="heading"><a href="javascript:void(0);" class="left-arrow">
                </a>스페셜</h4>
            </div>
        </div>
        <div class="container">    
            <div class="slider-bck">
                <div class="slider-otr">
                    <div class="slider-container">
                        <div class="sub-otr b-color">
                        <h3 class="sub-heading mb-0">스페셜</h3>
                        </div>
                        <SpecialSlider />
                    </div>
                </div>
            </div>
            <div class="type-innr mt-16 sld-bt">
                <ul>
                    <li>상품에 대한 설명이 들어가는 영역 입니다.</li>
                    <li>상품에 대한 설명이 들어가는 영역 입니다.</li>
                    <li>상품에 대한 설명이 들어가는 영역 입니다.</li>
                    <li>상품에 대한 설명이 들어가는 영역 입니다.</li>
                </ul>
            </div>
            <button type="button" class="btn btn-primary lg mt-16">확인</button>
        </div>
    </div>
</template>


<script>
import SpecialSlider from "@/components/NoticeRegistration/SpecialSlider.vue";
    export default { 
        name: "Special",
        components: {
            SpecialSlider,
        },
    }
</script>
