<template>
  <div class="back-wh pb-32">
    <div class="top-hdr m-0 no-border">
      <div class="container">
        <InnerHeader headerTitle="공지사항" />
      </div>
    </div>
<!-- v-for="(item,i) in noticeDetail.details" :key="i" -->
    <div class="terms-service-wrapper pb-32 common-sec">
      <div class="container" >
        <div class="paragraph-area" >
          <h4>{{noticeDetail.details.title}}</h4>
          <p v-html="noticeDetail.details.description"></p>
          <!-- <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet
            quam netus magnis eros, cursus diam fermentum. Ut risus ante non
            nullam sit faucibus id ut quam. Mauris, sed mollis dolor et. Vitae,
            mi dapibus urna purus nunc et nibh leo. Eget posuere egestas blandit
            accumsan sed sit ligula rhoncus non. Neque suspendisse amet porta
            purus eget diam. In sagittis, nibh congue suspendisse quam arcu.
            Blandit cursus lacus, id vitae imperdiet eu interdum mattis. Mollis
            at sagittis massa lectus. Venenatis vivamus tempus sed fermentum.
            Ridiculus vel mattis dui, turpis porttitor etiam sit ac. At sit
            mauris orci amet, ornare pharetra egestas tellus.
          </p> -->
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import InnerHeader from "@/components/innerHeader.vue";
import { reactive } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import { notice } from "@/service/API/notice.js";
import { useRouter } from 'vue-router';

export default {
  name: "CustomerNoticeDetails",
  components: {
    InnerHeader,
  },

  setup() {
    const router = useRouter()
    const noticeDetail = reactive({
      details : []
    })

    onMounted(()=>{
      viewDetail()
    })

    async function viewDetail() {
      let res = await notice.view({id: router.currentRoute.value.params.id})
      if(res.status == 200) {
        noticeDetail.details = res.data
      }
    }

    return {
      noticeDetail
    }
  }
};
</script>
  