<template>
    <CustomModal v-if="isModal" modalSize="modal-lg modal-hg modal-hd">
        <template v-slot:header>
            <div class="top-hdr">
                <h4 class="heading">
                    <span>유료상품 구매</span> 
                </h4>
                <span class="cross-btn">
                    <img src="@/assets/icons/modal-cross-icon.svg" alt="" @click="$emit('closeModal')"/>
                </span>
            </div>
    </template>
       <template v-slot:body>
    <div class="back-wh common-sec">
        <div class="container">    
            <div class="mb-197">
                <div class="storage-box-innr no-border">
                    <h4>선택한 상품</h4>
                    
                    <table class="table-otr">
                        <tr>
                            <th>상품명</th>
                            <th>가격</th>
                        </tr>
                        <tr v-for="(i, e) in productDetails" :key="e">
                            <td>{{i.sub_type}} - {{i.validity_date}}일</td>
                            <td>{{i.discounted_price}} 초코</td>
                        </tr>
                        
                    </table>
                    <div class="total-amount">
                        <span class="gray">합계</span>
                        <p class="red">{{productDetails.reduce((n, {discounted_price}) => n + discounted_price, 0) }} 초코</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="border-top-1">
            <div class="cm-top-space pb-32">
                <div class="container">
                    <div class="storage-box-innr no-border">
                        <h4>구매</h4>
                    </div>
                    <div class="choco-balance">
                        <span>보유 초코</span>
                        <p>{{balance}} 초코</p>
                    </div>
                    <p class="fnt-12">구매 후 해당 공고에 유료상품이 자동으로 적용됩니다.</p>
                    <button type="button" @click="$emit('confirm')" class="btn btn-primary lg mt-12">결제하기</button>
                </div>
            </div>
        </div>
    </div>
</template>
   
</CustomModal>
</template>


<script>
import InnerHeader from '@/components/innerHeader.vue'
import CustomModal from "@/components/Utils/CustomModal.vue";
    export default {
    components: { InnerHeader, CustomModal },
    props: { isModal: Boolean, productDetails: Array, balance: Number},
    }
</script>
