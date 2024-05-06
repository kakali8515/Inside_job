<template>    
    <div class="applicant-area">
        <div class="info">             
            <div class="left-part">
                <slot name="applicant-lft-content"> </slot>               
            </div>
            <div class="rht-part rht-part-aic">
                <slot name="applicant-rht-content"> </slot>                                                                               
            </div>
        </div>
        
        <slot name="applicant-btn"> </slot>
               
    </div>
</template>
 
<script>
 export default {
     name: 'ApplicantCard',
 }
</script>