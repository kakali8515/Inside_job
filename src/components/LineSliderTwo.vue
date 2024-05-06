<template>
    <swiper
      :modules="modules"
      :slidesPerView="1"
      :spaceBetween="0"
      :pagination="{
        type: 'fraction',
      }"
      :grid="{
        rows: 3,
      }"
      :autoplay="true"
      :speed="1500"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      class="image-swiper"
    >
      <swiper-slide>
        <CardWrapper>
            <template v-slot:content>
                <h5>삼성바이오로직스</h5>
                <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
            </template>
            <template v-slot:btn>
                <h6><span>시급</span> 9,500원</h6>
            </template>
        </CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
        <template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
    </CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
        <template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
</CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
<template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
</CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
<template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
</CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
        <template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
    </CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
        <template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
    </CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
        <template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
    </CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
<template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
</CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
<template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
</CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
<template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
</CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
        <template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
    </CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
        <template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
    </CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
        <template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
    </CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
        <template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
    </CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
        <template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
    </CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
        <template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
    </CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
        <template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
    </CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
<template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3 class="gray">[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
</CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
<template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3 class="gray">[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
</CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
<template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3 class="gray">[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
</CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
        <template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
    </CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
        <template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
    </CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
        <template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
    </CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
        <template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
    </CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
<template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3 class="gray">[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
</CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
<template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3 class="gray">[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
</CardWrapper>
      </swiper-slide>
      <swiper-slide>
         <CardWrapper>
        <template v-slot:content>
            <h5>삼성바이오로직스</h5>
            <h3>[대기업]삼성바이오로직스 품질/생산 분야 자체</h3>
        </template>
        <template v-slot:btn>
            <h6><span>시급</span> 9,500원</h6>
        </template>
    </CardWrapper>
      </swiper-slide>

    </swiper>
  </template>
  <script>

    // Import Swiper Vue.js components
    import { Swiper, SwiperSlide } from 'swiper/vue';

    // import Swiper core and required modules
    import { Grid, Pagination, Autoplay } from 'swiper';

  
    // Import Swiper styles
    import 'swiper/css';
    import "swiper/css/grid";
    import "swiper/css/pagination";
    import CardWrapper from '@/components/CardWrapper.vue';
    
  
    export default {
      name: 'LineSliderTwo',
      components: {
      Swiper,
      SwiperSlide,
      Autoplay,
      Pagination,
      Grid,
      CardWrapper
},
      setup() {
        const onSwiper = (swiper) => {
          console.log(swiper);
        };
        const onSlideChange = () => {
          console.log('slide change');
        };
        return {
          onSwiper,
          onSlideChange,
          modules: [Grid, Pagination, Autoplay]
        };
      },
    };
  </script>
