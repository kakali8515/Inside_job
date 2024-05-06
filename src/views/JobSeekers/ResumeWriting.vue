<template>
    <div class="back-wh">
        <div class="top-hdr m-0">
            <div class="container">
                <h4 class="heading"><a href="javascript:void(0);" class="left-arrow">
                <img src="@/assets/icons/left-arrow.svg" alt="" /></a>이력서 작성</h4>
            </div>
        </div>
        <div class="cm-top-space pb-32">
            <div class="container">
                <div class="app-outr form-wrapper">
                    <div class="app-innr">
                        <div class="app-left">
                            <div class="form-group mb-0">
                                <div class="file-input">
                                    <input
                                        type="file"
                                        name="file-input"
                                        id="file-input"
                                        class="file-input__input"
                                    />
                                    <label class="file-input__label" for="file-input">
                                        <span><img src="@/assets/images/image.png" alt="" /></span>
                                        <em class="edit"><img src="@/assets/icons/edit-icon.svg" alt="" /></em>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="app-right">
                            <div class="app-top">
                                <h3 class="sub-heading mb-0">김알바 님</h3>
                                <a href="#"><img src="@/assets/icons/setting-icon.svg" alt="" /></a>
                            </div>
                            <ul class="app-list">
                                <li>여자</li>
                                <li>30세</li>
                            </ul>
                        </div>
                    </div>
                    <ul class="post-list">
                        <li>
                            <p class="p-left">근로자 주소</p>
                            <p class="p-right">서울 강남구 000 000</p>
                        </li>
                        <li>
                            <p class="p-left">연락처</p>
                            <p class="p-right">010-1234-1234</p>
                        </li>
                        <li>
                            <p class="p-left">이메일</p>
                            <p class="p-right">alba123@naver.com</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <form>
        <div class="form-wrapper">
            <form>
                <div class="back-wh border-top">
                    <div class="cm-top-space pb-32">
                        <div class="container">
                            <div class="form-group mb-0">
                                <label>이력서 제목 <span>[필수]</span></label>
                                <select class="form-control">
                                    <option>이력서 제목을 선택해 주세요</option>
                                    <option>이력서 제목을 선택해 주세요</option>
                                    <option>이력서 제목을 선택해 주세요</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="back-wh border-top">
                    <div class="cm-top-space pb-32">
                        <div class="container">
                            <div class="form-group mb-0">
                                <label>최종학력 <span>[필수]</span></label>
                                <select class="form-control">
                                    <option>학력을 선택해 주세요</option>
                                    <option>학력을 선택해 주세요</option>
                                    <option>학력을 선택해 주세요</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="back-wh border-top">
                    <div class="cm-top-space pb-32">
                        <div class="container">
                            <div class="form-group mb-0">
                                <label>경력사항 <span>[필수]</span></label>
                                <ul class="check-list box-check col-6">
                                    <li>
                                        <label class="check-input">
                                            <input type="radio" name="radio">
                                            <span class="text">신입</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label class="check-input">
                                            <input type="radio" name="radio">
                                            <span class="text">경력</span>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="back-wh border-top">
                    <div class="cm-top-space pb-32">
                        <div class="container">
                            <div class="form-group mb-0">
                                <div class="d-flex mb-8">
                                    <label>희망 근무지 <span>[필수]</span></label>
                                    <p class="number lg"><span>0</span>/3</p>
                                </div>
                                <select class="form-control">
                                    <option>업직종을 선택해 주세요</option>
                                    <option>업직종을 선택해 주세요</option>
                                    <option>업직종을 선택해 주세요</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="back-wh border-top">
                    <div class="cm-top-space pb-32">
                        <div class="container">
                            <div class="form-group mb-0">
                                <div class="d-flex mb-8">
                                    <label>업직종 <span>[필수]</span></label>
                                    <p class="number lg"><span>0</span>/20</p>
                                </div>
                                <select class="form-control">
                                    <option>업직종을 선택해 주세요</option>
                                    <option>업직종을 선택해 주세요</option>
                                    <option>업직종을 선택해 주세요</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="back-wh border-top">
                    <div class="cm-top-space pb-32">
                        <div class="container">
                            <div class="form-group mb-0">
                                    <div class="d-flex mb-8">
                                        <label>희망 근무 일수 <span>[필수]</span></label>
                                        <p class="number lg"><span>0</span>/3</p>
                                    </div>
                                    <ul class="check-list box-check">
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">하루(1일)</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">1주일이하</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">1주일~1개월</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">1개월~3개월</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">3개월~6개월</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">6개월~1년</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">1년 이상</span>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                        </div>
                    </div>
                </div>
                <div class="back-wh border-top">
                    <div class="cm-top-space pb-32">
                        <div class="container">
                            <div class="form-group mb-0">
                                    <div class="d-flex mb-8">
                                        <label>희망 근무 요일 <span>[필수]</span></label>
                                        <p class="number lg"><span>0</span>/3</p>
                                    </div>
                                    <ul class="check-list box-check">
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">월~금</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">월~토</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">월~일</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">주말</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">월~토(격주)</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">주 6일</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">주 5일</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">주 4일</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">주 3일</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">주 2일</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">주 1일</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">요일 협의</span>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                        </div>
                    </div>
                </div>
                <div class="back-wh border-top">
                    <div class="cm-top-space pb-32">
                        <div class="container">
                            <div class="form-group mb-0">
                                    <div class="d-flex mb-8">
                                        <label>희망 근무 시간 <span>[필수]</span></label>
                                        <p class="number lg"><span>0</span>/3</p>
                                    </div>
                                    <ul class="check-list box-check">
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">오전</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">오후</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">저녁</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">종일</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">새벽</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">오전~오후</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">오후~저녁</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">저녁~새벽</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">새벽~오전</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="check-input">
                                                <input type="checkbox">
                                                <span class="text">시간협의</span>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                        </div>
                    </div>
                </div>
                <div class="back-wh border-top">
                    <div class="cm-top-space pb-32">
                        <div class="container">
                            <div class="form-group mb-0">
                                <div class="d-flex mb-8">
                                    <label>희망 근무 시간 <span>[필수]</span></label>
                                    <p class="number lg"><span>0</span>/5</p>
                                </div>
                                <ul class="check-list box-check">
                                    <li>
                                        <label class="check-input">
                                            <input type="checkbox">
                                            <span class="text">아르바이트</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label class="check-input">
                                            <input type="checkbox">
                                            <span class="text">정규직</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label class="check-input">
                                            <input type="checkbox">
                                            <span class="text">계약직</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label class="check-input">
                                            <input type="checkbox">
                                            <span class="text">파견직</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label class="check-input">
                                            <input type="checkbox">
                                            <span class="text">인턴직</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label class="check-input">
                                            <input type="checkbox">
                                            <span class="text">프리랜서</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label class="check-input">
                                            <input type="checkbox">
                                            <span class="text">기타</span>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="back-wh border-top">
                    <div class="cm-top-space pb-32">
                        <div class="container">
                            <div class="form-group mb-0">
                                <label>자기소개서<span>[선택]</span></label>
                                <textarea class="form-control" placeholder="내용을 자유롭게 입력해 주세요 ex) 최선을 다하는 모습을 보여드리겠습니다. 제가 바로 누구보다 열심히 일하는 성실한 일꾼입니다."></textarea>
                                <div class="count">
                                    <span class="count-txt"><img src="@/assets/icons/initialization.svg" alt="" /> 초기화</span>
                                    <p><span>0</span> /500</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="back-wh border-top">
                    <div class="cm-top-space pb-32">
                        <div class="container">
                            <div class="form-group mb-0">
                                <label>자기 PR<span class="gr">[선택]</span></label>
                                <div class="no-data-content">
                                    <img class="no-job-icon" src="@/assets/icons/doc-icon.svg" alt="">
                                    <p><span>작성한 이력서가 없습니다.</span></p>
                                    <p>이력서를 작성하고 구직활동을 시작해 보세요! </p>
                                    <a href="#" class="btn btn-border-outline lg">관리하기</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="back-wh border-top">
                    <div class="cm-top-space pb-32">
                        <div class="container">
                            <div class="sub-otr b-color">
                                <h3 class="sub-heading mb-0">기본 이력서</h3>
                            </div>
                            <div class="check-list squre">
                                <label class="check-input"> 해당 이력서를 <span>기본이력서로 저장</span>하시겠습니까?
                                    <input type="checkbox">
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                            <div class="btnn-group">
                                <div class="btn-group-innr">
                                    <button type="button" class="btn btn-primary-outline lg">임시 저장하기</button>
                                </div>
                                <div class="btn-group-innr">
                                    <input type="submit"  class="btn btn-primary lg" value="작성 완료하기" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
   </form>
  </template>
  
  <script>
  export default {
    name: "ResumeWriting",
}
  </script>
  
  