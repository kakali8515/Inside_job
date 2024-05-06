<template>
  <div class="common-sec back-wh">
    <div class="top-hdr">
      <div class="container">
        <InnerHeader headerTitle="이메일 찾기" />
      </div>
    </div>
    <div class="container">
      <div class="form-wrapper-findid">
        <div class="form-wrapper">
          <form>
            <div class="form-group">
              <label>핸드폰번호</label>
              <div class="group">
                <div class="group-input">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="-를 제외하고 입력"
                  />
                </div>
                <button type="button" class="btn btn-default">전송하기</button>
              </div>
            </div>
            <input
              type="submit"
              value="이메일 찾기"
              class="btn btn-primary lg"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InnerHeader from "../../components/innerHeader.vue";
export default {
  name: "FindEmail",
  components: {
    InnerHeader,
  },
};
</script>
