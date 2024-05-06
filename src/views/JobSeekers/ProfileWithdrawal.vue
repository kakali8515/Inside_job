<template>
  <div class="back-wh common-sec">
    <div class="top-hdr no-border">
      <div class="container">
        <InnerHeader headerTitle="회원 탈퇴" />
      </div>
    </div>

    <div class="container">
      <div class="withdral-wrapper">
        <div class="heading">
          <h2>회원 탈퇴</h2>
          <p>탈퇴 전 확인해주세요</p>
        </div>
        <ul class="list">
          <li>탈퇴 시 모든 데이터는 삭제되며 복구가 불가능합니다.</li>
          <li>
            사용하고 계신 이메일은 회원탈퇴를 진행할 경우 복구가 불가능합니다.
          </li>
        </ul>
        <div class="form-wrapper mt-32 pb-32">
          <form>
            <div class="form-group">
              <textarea
                class="form-control"
                placeholder="그동안 이용해주셔서 감사합니다. 소중한 의견을 반영하여 더 나은 서비스를 만들 수 있도록 탈퇴하시는 이유를 알려주시면 감사하겠습니다."
                v-model="withdraw_reason"
                maxlength="500"
              ></textarea>
            </div>
            <div
              class="btm-button-group btm-half-button mt-0 fixed-btn-otr p-16"
            >
              <a href="#" class="btn btn-primary-outline" @click="setWithdraw"
                >탈퇴하기</a
              >
              <router-link
                :to="{ name: 'ProfileSetting' }"
                class="btn btn-primary"
                >계속 사용하기</router-link
              >
            </div>
          </form>
        </div>
      </div>
    </div>
    <WithdrawalModal
      :isModal="showModal"
      :withdrawReason="withdraw_reason"
      @withdrawSuccess="closeModal"
      @closeModal="
        () => {
          showModal = false;
          $router.push({
            name: 'ProfileSetting',
          });
        }
      "
    />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import InnerHeader from "../../components/innerHeader.vue";
import WithdrawalModal from "../../components/Modals/WithdrawalModal.vue";
import { useRouter } from "vue-router";
export default {
  name: "ProfileWithdrawal",
  components: {
    InnerHeader,
    WithdrawalModal,
  },
  setup() {
    const withdraw_reason = ref("");
    const showModal = ref(false);
    const router = useRouter();

    const setWithdraw = async (e) => {
      e.preventDefault();
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      let data = {
        type: "logoutClicked",
        loginVia: localStorage.getItem("login_via")
      };
      window.parent.postMessage(JSON.stringify(data), "*");
      router.push({ name: "home" });
    };

    return {
      withdraw_reason,
      showModal,
      setWithdraw,
      closeModal,
    };
  },
};
</script>
