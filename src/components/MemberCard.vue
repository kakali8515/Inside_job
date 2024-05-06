<template>
    <div class="member-card-innr">
        <span><img src="@/assets/icons/user-icon.svg" alt="" /></span>
        <h3 class="sub-heading">{{title}}</h3>
        <p>{{desc}}</p>
        <router-link @mouseenter="setType" :to="{ name: 'SelectMembershipRegistration' }"  class="btn btn-primary lg">회원가입하기</router-link>
    </div>
</template>

<script>
    export default {
        name: 'MemberCard',
        props: ['title','desc','utype'],
        methods:{
            setType(){
                localStorage.setItem('usertype',this.utype);
                console.log(this.utype)
            }
        }
    }
</script>