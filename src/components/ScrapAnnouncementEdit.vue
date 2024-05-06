<template>
   
   <div class="scrap-announce-card scrap-edit-card" v-for="(item,i) in scrapListData" :key="i">
        <div class="left-part">
            <div class="sub-check-cont">
                <label class="square-check-input">
                    <input type="checkbox">
                    <span class="checkmark"></span>
                </label>
            </div> 
        </div>
        <div class="right-part">
            <h6>{{scrapListData[i].company_name}}</h6>
            <h5>{{scrapListData[i].announcement_title}}</h5>
            <div class="bottom-cont">
                <ul>
                    <li>{{scrapListData[i].region_1st_depth_name}}</li>
                    <li>{{scrapListData[i].region_2nd_depth_name}} </li>
                    <li>{{scrapListData[i].region_3rd_depth_name}}</li>
                    
                    <li><span>{{scrapListData[i].pay_type}}</span>{{scrapListData[i].salary}}원</li>
                </ul>
                <!-- <a href="#" class="btn btn-primary-gradient">지원하기</a> -->
                <router-link :to="{ name: 'ApplyChooseResume' }" class="btn btn-primary-gradient">지원하기</router-link>
            </div>
        </div>
        
    </div>   

</template>

<script>
export default {
    name: 'ScrapAnnouncementEdit',
    props: {
    scrapListData: {
      type: Array,
    },
  },
}
</script>