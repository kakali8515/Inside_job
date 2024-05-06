<template>
    <div class="common-sec back-wh">
            <div class="top-hdr top-hdr-br">
                <div class="container">
                    <h4 class="heading"><a href="javascript:void(0);" class="left-arrow"><img src="@/assets/icons/left-arrow.svg" alt="" /></a>비밀번호 찾기</h4>
                </div> 
            </div>
            <div class="container">
                <div class="form-wrapper-findid">
                    <div class="form-wrapper">
                        <form>              
                            <div class="form-group">
                                <label>이메일</label>
                                <input type="text" class="form-control" placeholder="alba1234@naver.com"  />
                            </div>
                            <!-- use this code for validation error msg -->
                            <!-- <div class="form-group valid-error">
                                <label>이메일</label>
                                <input type="text" class="form-control" placeholder="alba1234@naver.com"  />
                                <span class="error-msg">error message</span>
                            </div> -->
                            <div class="form-group">
                                <label>핸드폰번호</label>
                                <div class="group mb-16">
                                    <div class="group-input">
                                        <input type="text" class="form-control" placeholder="01012341234"  />
                                    </div>
                                    <button type="button" class="btn btn-default">전송하기</button>
                                </div>
                                <div class="group">
                                    <div class="group-input">
                                        <input type="text" class="form-control" placeholder="인증번호 입력"  />
                                        <span class="time">2:59</span>
                                    </div>
                                    <button type="button" class="btn btn-primary-outline">재전송</button>
                                </div> 
                            </div>
                            <input type="submit" value="비밀번호 찾기" class="btn btn-primary lg" />
                        </form>
                    </div>
                  </div>             
            </div>
          </div>
  
         
  </template>
  
  <script>
  export default { 
      name: "ForgotPasswordAuthentication",
  }
  </script>
  
  