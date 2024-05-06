<template>
  <div class="back-wh mb-16">
    <div class="top-hdr mb-0">
      <div class="container">
        <InnerHeader headerTitle="근로계약서" />
      </div>
    </div>
    <div class="container">
      <div class="step-otr">
        <ul class="step-list">
          <li class="active">STEP.1 <br />유형선택</li>
          <li class="active">STEP.2 <br />계약서 작성</li>
          <li>STEP.3 <br />작성완료</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="form-wrapper employment-form-wrap">
    <form>
      <!-- Business Owners name -->
      <div class="back-wh">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div
              :class="`form-group mb-0 ${
                errors && errors?.businessOwner && 'valid-error'
              }`"
            >
              <label>사업주 명<span>[필수]</span></label>
              <input
                type="text"
                placeholder="대표자 명을 입력해 주세요"
                class="form-control"
                v-model="businessOwnerName"
              />
              <p v-if="errors && errors?.businessOwner" class="error-msg">
                {{ errors?.businessOwner }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Term -->
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="form-group mb-0">
              <div class="business-period-cont">
                <label>계약 기간<span>[필수]</span></label>
                <div class="period-row from-row">
                  <ul
                    :class="`date-info ${
                      errors?.term_date ? 'date-error' : ''
                    }`"
                  >
                    <li>
                      <span
                        ><input
                          type="number"
                          class="form-control"
                          placeholder="YYYY"
                          v-model="startDate.year" /></span
                      >년
                    </li>
                    <li>
                      <span
                        ><input
                          type="number"
                          class="form-control"
                          placeholder="MM"
                          :value="startDate.month.toString()"
                          @change="
                            (e) => (startDate.month = e.target.value)
                          " /></span
                      >월
                    </li>
                    <li>
                      <span
                        ><input
                          type="number"
                          class="form-control"
                          placeholder="DD"
                          :value="startDate.day.toString()"
                          @change="
                            (e) => (startDate.day = e.target.value)
                          " /></span
                      >일
                    </li>
                  </ul>
                  <span>부터</span>
                </div>
                <div class="period-row until-row">
                  <ul class="date-info">
                    <li>
                      <span
                        ><input
                          type="number"
                          class="form-control"
                          placeholder="YYYY"
                          v-model="endDate.year"
                          @change="
                            (e) => (endDate.year = e.target.value)
                          " /></span
                      >년
                    </li>
                    <li>
                      <span
                        ><input
                          type="number"
                          class="form-control"
                          placeholder="MM"
                          :value="endDate.month.toString()"
                          @change="
                            (e) => (endDate.month = e.target.value)
                          " /></span
                      >월
                    </li>
                    <li>
                      <span
                        ><input
                          type="number"
                          class="form-control"
                          placeholder="DD"
                          :value="endDate.day.toString()"
                          @change="
                            (e) => (endDate.day = e.target.value)
                          " /></span
                      >일
                    </li>
                  </ul>
                  <span>까지</span>
                </div>
                <span class="note"
                  >* 근로계약기간을 정하지 않은 경우 근로개시일만 기재</span
                >
              </div>
              <p v-if="errors && errors?.term_date" class="error-msg">
                {{ errors?.term_date }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- place of work -->
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div
              :class="`form-group mb-0 ${
                errors && errors?.place_of_work && 'valid-error'
              }`"
            >
              <label>근무장소<span>[필수]</span></label>
              <input
                type="text"
                placeholder="근무장소를 작성해 주세요"
                class="form-control"
                v-model="place_of_work"
              />
              <p v-if="errors && errors?.place_of_work" class="error-msg">
                {{ errors?.place_of_work }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Business information -->
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div
              :class="`form-group mb-0 ${
                errors && errors?.business_information && 'valid-error'
              }`"
            >
              <label>업무 내용<span>[필수]</span></label>
              <input
                type="text"
                placeholder="업무 내용을 작성해 주세요"
                class="form-control"
                v-model="Business_information"
              />
              <p
                v-if="errors && errors?.business_information"
                class="error-msg"
              >
                {{ errors?.business_information }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Working days and hours -->
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="working-day-wrap">
              <div class="form-group mb-0">
                <label>근로일 및 근로일별 근로시간<span>[필수]</span></label>
                <span class="note">* 근무요일 및 근무시간을 선택하세요.</span>
                <div class="working-otr">
                  <div class="header-row">
                    <div class="item">근무일 선택</div>
                    <div class="item">근로시간</div>
                  </div>
                  <div class="bdy-cont">
                    <div
                      class="day-otr"
                      v-for="(item, e) in working_days_hours"
                      :key="e"
                    >
                      <div class="item-row">
                        <div class="lft-part">
                          <div class="check-list squre mbt-0">
                            <label class="check-input mbt-0 wght"
                              >{{ item.name }}
                              <input
                                type="checkbox"
                                :value="item.day"
                                v-model="checkDate"
                                @change="setDays($event, item, 'day')"
                              />
                              <span class="checkmark"></span>
                            </label>
                          </div>
                        </div>
                        <div class="rht-part rht-part-nobreak">
                          <input
                            type="number"
                            class="form-control"
                            placeholder="0"
                            v-model="item.working_hours"
                            :disabled="!checkDate.includes(item.day)"
                            @change="
                              setDaysHours($event, item, 'working_hours')
                            "
                          />
                          <span>시간</span>
                        </div>
                      </div>
                      <div
                        class="hidden-box"
                        v-if="checkDate.includes(item.day)"
                      >
                        <div class="hrs-row">
                          <label>근무시간<span>[필수]</span></label>
                          <div
                            :class="`form-group-wrapper bord ${
                              errors &&
                              errors?.[`working_hours_${item.day}`] &&
                              'bord-error'
                            }`"
                          >
                            <div class="form-group mb-0">
                              <input
                                type="time"
                                placeholder="12:30"
                                class="form-control"
                                v-model="item.working_hour_from"
                                @change="
                                  setDaysHours(
                                    $event,
                                    item,
                                    'working_hour_from'
                                  )
                                "
                              />
                              <em>부터</em>
                            </div>
                            <span>~</span>
                            <div class="form-group mb-0">
                              <input
                                type="time"
                                placeholder="17:30"
                                class="form-control"
                                v-model="item.working_hour_end"
                                @change="
                                  setDaysHours($event, item, 'working_hour_end')
                                "
                              />
                              <em>까지</em>
                            </div>
                          </div>
                        </div>
                        <p
                          v-if="errors && errors?.[`working_hours_${item.day}`]"
                          class="error-msg"
                        >
                          {{ errors?.[`working_hours_${item.day}`] }}
                        </p>
                        <template v-if="item.no_break.includes('0')">
                          <div class="hrs-row">
                            <label>휴게시간<span>[필수]</span></label>
                            <div
                              :class="`form-group-wrapper bord ${
                                errors &&
                                errors?.[`working_breaks_${item.day}`] &&
                                'bord-error'
                              }`"
                            >
                              <div class="form-group mb-0">
                                <input
                                  type="time"
                                  placeholder="14:00"
                                  class="form-control"
                                  v-model="item.break_hour_from"
                                  :disabled="item.no_break.includes('1')"
                                  @change="
                                    setDaysHours(
                                      $event,
                                      item,
                                      'break_hour_from'
                                    )
                                  "
                                />
                                <em>부터</em>
                              </div>
                              <span>~</span>
                              <div class="form-group mb-0">
                                <input
                                  type="time"
                                  placeholder="14:30"
                                  class="form-control"
                                  v-model="item.break_hour_end"
                                  :disabled="item.no_break.includes('1')"
                                  @change="
                                    setDaysHours($event, item, 'break_hour_end')
                                  "
                                />
                                <em>까지</em>
                              </div>
                            </div>
                          </div>
                          <p
                            v-if="
                              errors && errors?.[`working_breaks_${item.day}`]
                            "
                            class="error-msg"
                          >
                            {{ errors?.[`working_breaks_${item.day}`] }}
                          </p>
                        </template>
                        <div class="hrs-row">
                          <div class="check-list squre mbt-0">
                            <label class="check-input mbt-0 wght"
                              >휴게시간 없음
                              <input
                                type="checkbox"
                                value="1"
                                v-model="item.no_break"
                                :id="`no_break_${item.day}`"
                                @change="setDaysHours($event, item, 'no_break')"
                              />
                              <span class="checkmark"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group mb-0">
                <div class="rest-day-otr">
                  <label>주휴일<span>[필수]</span></label>
                  <ul>
                    <li :class="`${backup_dayOff.length > 0 ? 'active' : ''}`">
                      주휴일 있음
                    </li>
                    <li :class="`${backup_dayOff.length == 0 ? 'active' : ''}`">
                      주휴일 없음
                    </li>
                  </ul>
                  <p class="date-box" v-if="backup_dayOff.length > 0">
                    주휴일은
                    <span v-for="(i, e) in backup_dayOff" :key="e">{{
                      i.name
                    }}</span>
                    <!-- 입니다. -->
                  </p>
                </div>
                <p v-if="errors && errors?.[`working_days`]" class="error-msg">
                  {{ errors?.[`working_days`] }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <!-- wage -->
            <div class="form-group mb-0">
              <label>임금<span>[필수]</span></label>
              <div class="radio-wrapper cl-4">
                <label class="radio-input mb-0"
                  >시급
                  <input
                    type="radio"
                    value="hourly_wage"
                    name="wage"
                    v-model="wage"
                  />
                  <span class="checkmark"></span>
                </label>
                <label class="radio-input mb-0"
                  >일급
                  <input
                    type="radio"
                    name="wage"
                    value="daily_wage"
                    v-model="wage"
                  />
                  <span class="checkmark"></span>
                </label>
                <label class="radio-input mb-0"
                  >월급
                  <input
                    type="radio"
                    name="wage"
                    value="salary"
                    v-model="wage"
                  />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
            <!-- wage amount -->
            <div
              :class="`form-group mb-0 ${
                errors && errors?.pay_type && 'valid-error'
              }`"
            >
              <div class="wage-input-wrap">
                <input
                  type="number"
                  class="form-control"
                  placeholder="0"
                  v-model="salary"
                />
                <span class="won">원</span>
              </div>
              <p v-if="errors && errors?.pay_type" class="error-msg mb-16">
                {{ errors?.pay_type }}
              </p>
            </div>

            <!-- bonus -->
            <div class="bonus-wrapper mb-16">
              <h5 class="heading">상여금</h5>
              <div class="employment-tab bonus-tab">
                <div class="tab-outr">
                  <TabWrapper
                    :defaultSelect="bonus.defaultVal"
                    @getResponseTitle="setBonusState($event)"
                  >
                    <Tabs title="상여금 없음">
                      <div class="outerside">
                        <div class="tab-inner-cont"></div>
                      </div>
                    </Tabs>
                    <Tabs title="상여금 있음">
                      <div class="outerside">
                        <div class="tab-inner-cont">
                          <div class="form-group mb-0">
                            <div class="wage-input-wrap">
                              <input
                                type="text"
                                class="form-control"
                                placeholder="0"
                                v-model="bonus.amount"
                              />
                              <span class="won">원</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tabs>
                  </TabWrapper>
                </div>
              </div>
            </div>

            <!-- other salary -->
            <div class="bonus-wrapper mb-16">
              <h5 class="heading">기타 급여</h5>
              <div class="employment-tab bonus-tab">
                <div class="tab-outr">
                  <TabWrapper
                    :defaultSelect="other_salary.defaultVal"
                    @getResponseTitle="getOtherSalaryStatus"
                  >
                    <Tabs title="기타급여 없음">
                      <div class="outerside">
                        <div class="tab-inner-cont"></div>
                      </div>
                    </Tabs>
                    <Tabs title="기타급여 있음">
                      <div class="outerside">
                        <div class="tab-inner-cont">
                          <div class="form-group mb-0">
                            <div
                              class="salary-group"
                              v-for="(i, e) in other_salary.salaries"
                              :key="e"
                            >
                              <div class="salary-lft-col">
                                <input
                                  type="text"
                                  placeholder="항목명 입력"
                                  class="form-control"
                                  v-model="i.type"
                                  @change="setType($event, e)"
                                />
                              </div>
                              <div class="salary-rht-col">
                                <input
                                  type="text"
                                  placeholder="0"
                                  class="form-control"
                                  v-model="i.amount"
                                  @change="setAmount($event, e)"
                                />
                                <span>원</span>
                                <button
                                  type="button"
                                  class="cross-btn"
                                  v-if="
                                    other_salary.salaries.length > 1 && e != 0
                                  "
                                  @click="removeOtherSalary(e)"
                                >
                                  <img
                                    src="@/assets/icons/salary-cross-icon.svg"
                                    alt=""
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            class="btn btn-border-gray-outline"
                            @click="addOtherSalary"
                          >
                            항목 추가
                          </button>
                        </div>
                      </div>
                    </Tabs>
                  </TabWrapper>
                </div>
              </div>
            </div>
            <div class="bonus-wrapper">
              <div class="form-group mb-0">
                <label>가산임금률</label>
                <div class="wage-input-wrap center-align">
                  <input type="text" class="form-control" placeholder="0" />
                  <span class="won">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- wage payment date -->
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="form-group mb-0 wage-pay-wrap">
              <label>임금지급일<span>[필수]</span></label>
              <div class="wage-radio-wrapper">
                <label class="radio-input"
                  >매월
                  <input
                    type="radio"
                    name="paymentDate"
                    value="monthly"
                    v-model="wage_payment_type"
                  />
                  <span class="checkmark"></span>
                </label>
                <div
                  :class="`wage-input-wrap ${
                    errors?.wage_payment_date && 'valid-error'
                  }`"
                  v-if="wage_payment_type == 'monthly'"
                >
                  <input
                    type="number"
                    class="form-control"
                    placeholder="0"
                    v-model="wage_payment_date_monthly"
                  />
                  <span class="won">일</span>
                </div>
                <label class="radio-input"
                  >매주
                  <input
                    type="radio"
                    name="paymentDate"
                    value="weekly"
                    v-model="wage_payment_type"
                  />
                  <span class="checkmark"></span>
                </label>
                <label class="radio-input"
                  >매일
                  <input
                    type="radio"
                    name="paymentDate"
                    value="everyday"
                    v-model="wage_payment_type"
                  />
                  <span class="checkmark"></span>
                </label>
              </div>
              <p v-if="errors && errors?.wage_payment_date" class="error-msg">
                {{ errors?.wage_payment_date }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment method -->
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="form-group mb-0 wage-pay-wrap">
              <label>지급방법<span>[필수]</span></label>
              <div class="wage-radio-wrapper">
                <label class="radio-input"
                  >직접 지급
                  <input
                    type="radio"
                    value="direct_payment"
                    name="paymentMethod"
                    v-model="payment_method"
                  />
                  <span class="checkmark"></span>
                </label>
                <label class="radio-input"
                  >예금통장에 입금
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="deposit_into_savings_account"
                    v-model="payment_method"
                  />
                  <span class="checkmark"></span>
                </label>
              </div>
              <p v-if="errors && errors?.payment_method" class="error-msg">
                {{ errors?.payment_method }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Social insurance coverage -->
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="form-group mb-0 wage-pay-wrap">
              <!-- <label>사회보험 적용여부<span>[필수]</span></label> -->
              <label class="mb-12">사회보험 적용여부<span class="gr">[선택]</span></label>
              <p>월 60시간 이상 근무 시에는 사회보험을 필수로 적용해야 합니다.</p>
              <div class="checkbox-wrapper insurance-checkbox">
                <label class="square-check-input"
                  >고용보험
                  <input
                    type="checkbox"
                    value="employment_insurance"
                    v-model="social_ins_cover"
                  />
                  <span class="checkmark"></span>
                </label>
                <label class="square-check-input"
                  >산재보험
                  <!-- <input type="checkbox" /> -->
                  <input
                    type="checkbox"
                    value="industrial_accident_insurance"
                    v-model="social_ins_cover"
                  />
                  <span class="checkmark"></span>
                </label>
                <label class="square-check-input"
                  >국민연금
                  <!-- <input type="checkbox" /> -->
                  <input
                    type="checkbox"
                    value="national_pension"
                    v-model="social_ins_cover"
                  />
                  <span class="checkmark"></span>
                </label>
                <label class="square-check-input"
                  >건강보험
                  <input
                    type="checkbox"
                    value="health_insurance"
                    v-model="social_ins_cover"
                  />
                  <span class="checkmark"></span>
                </label>
              </div>
              <!-- <p v-if="errors && errors?.social_ins_cover" class="error-msg">
                {{ errors?.social_ins_cover }}
              </p> -->
            </div>
          </div>
        </div>
      </div>

      <!-- Recruiter details -->
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="form-group mb-0 business-info">
              <label>사업주 정보</label>
              <ul class="post-list">
                <li>
                  <p class="p-left">사업체명</p>
                  <p class="p-right">
                    {{ companyName }}
                  </p>
                </li>
                <li>
                  <p class="p-left">전화번호</p>
                  <p class="p-right">{{ formatPhoneNumber(companyPhoneNo) }}</p>
                </li>
                <li>
                  <p class="p-left">주소</p>
                  <p class="p-right">{{ companyAddress }}</p>
                </li>
                <li>
                  <p class="p-left">대표자 명</p>
                  <p class="p-right">{{ businessOwnerName }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- representative signature -->
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div class="form-group mb-0">
              <label class="mb-16">대표자 서명<span>[필수]</span></label>
              <div
                class="worker-sign-cont mb-16"
                v-if="signatureBase64.length > 0"
              >
                <img :src="signatureBase64" alt="" />
              </div>
              <button
                class="btn btn-outline-primary lg"
                type="button"
                @click="
                  () => {
                    openSignModal.isOpen = true;
                  }
                "
              >
                서명하기
              </button>
              <p v-if="errors && errors?.signature" class="error-msg">
                {{ errors?.signature }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- worker name -->
      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <div
              :class="`form-group mb-16 ${
                errors && errors?.name_of_worker && 'valid-error'
              }`"
            >
              <label>근로자 명<span>[필수]</span></label>
              <input
                type="text"
                placeholder="근로자 명을 작성해 주세요"
                class="form-control"
                v-model="name_of_worker"
              />
              <p v-if="errors && errors?.name_of_worker" class="error-msg">
                {{ errors?.name_of_worker }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="back-wh border-top">
        <div class="cm-top-space pb-32">
          <div class="container">
            <!-- worker email -->
            <div
              :class="`form-group mb-16 ${
                errors && errors?.email && 'valid-error'
              }`"
            >
              <label>근로자 이메일<span>[필수]</span></label>
              <input
                type="text"
                placeholder="근로자 이메일을 작성해 주세요."
                class="form-control"
                v-model="worker_email"
              />
              <p v-if="errors && errors?.email" class="error-msg">
                {{ errors?.email }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="back-wh border-top">
        <div class="cm-top-space pb-100">
          <div class="container condition-cont">
            <!-- Accept the terms and conditions -->
            <div class="form-group mb-0">
              <label>이용약관 동의<span>[필수]</span></label>
              <div class="condition-checkbox-otr">
                <label class="check-input"
                  >개인정보수집 및 이용동의
                  <input type="checkbox" value="" v-model="privacy.check" />
                  <span class="checkmark"></span>
                </label>
                <button type="button" class="exe" @click="openPrivacyPolicy">
                  보기
                </button>
              </div>
              <p v-if="errors && errors?.terms" class="error-msg">
                {{ errors?.terms }}
              </p>
            </div>
            <p class="date-box" v-if="functionType == 'edit'">
              작성일은
              <em>{{ commonStore.methods.dateFormat(createdDate, "YYYY") }}</em>
              <span>년</span>
              <em>{{ commonStore.methods.dateFormat(createdDate, "M") }}</em>
              <span>월</span
              ><em>{{ commonStore.methods.dateFormat(createdDate, "D") }}</em
              ><span>일</span> 입니다.
            </p>
            <div class="fixed-btn-otr">
              <button
                class="btn btn-primary lg"
                type="button"
                @click="isSubmit"
                :disabled="disabledSubmit"
              >
                계약서 작성 완료하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div
      class="required-fields-icon"
      v-if="commonStore.state.requiredToastMsgShow"
    >
      <p>
        <span><img src="@/assets/icons/check-circle.svg" alt="" /></span> 필수
        입력값을 확인해 주세요.
      </p>
    </div>
    <EmploymentSignature
      :isOpen="openSignModal.isOpen"
      @save="approveContract($event)"
      @closeModal="
        () => {
          openSignModal.isOpen = false;
        }
      "
    />
    <CompletionOfLaborContract
      :isModal="showSuccessModal"
      @closeModal="closeSuccessModal"
    />
    <TermsOfService
      v-if="commonStore.state.isTermsOfServiceModal"
      :modalName="privacy.type"
    />
  </div>
</template>

<script>
import InnerHeader from "@/components/innerHeader.vue";
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import EmploymentSignature from "@/views/JobSeekers/EmploymentSignature.vue";
import TermsOfService from "@/views/JobSeekers/TermsOfService.vue";
import {
  inject,
  onMounted,
  onUnmounted,
  provide,
  reactive,
  ref,
  watch,
} from "@vue/runtime-core";
import { standardContractFormLists } from "@/config/standardContractForm.js";
import PartTimeContractValidation from "../../../Validations/partTimeContract.js";
import CompletionOfLaborContract from "@/components/Modals/CompletionOfLaborContract.vue";
import { employmentService } from "@/service/API/EmplymentContract.js";
import { profile } from "@/service/API/profile.js";
import { useRouter } from "vue-router";
export default {
  name: "PartTimeWorkerContractStepTwo",
  components: {
    InnerHeader,
    Tabs,
    TabWrapper,
    EmploymentSignature,
    CompletionOfLaborContract,
    TermsOfService,
  },

  setup() {
    const employmentStore = inject("employmentStore");
    const commonStore = inject("commonStore");
    const businessOwnerName = ref("");
    const startDate = reactive({
      year: "",
      month: "",
      day: "",
    });
    const endDate = reactive({
      year: "",
      month: "",
      day: "",
    });
    const place_of_work = ref("");
    const Business_information = ref("");
    const working_hours = reactive({
      from: "",
      till: "",
    });
    const break_time = reactive({
      from: "",
      till: "",
      noBreak: 0,
    });
    const working_days = ref([]);
    const day_off = ref([
      {
        name: "월",
        value: "1",
      },
      {
        name: "화",
        value: "2",
      },
      {
        name: "수",
        value: "3",
      },
      {
        name: "목",
        value: "4",
      },
      {
        name: "금",
        value: "5",
      },
      {
        name: "토",
        value: "6",
      },
      {
        name: "일",
        value: "7",
      },
    ]);
    const working_days_hours = ref([
      {
        day: "1",
        name: "월요일",
        working_hours: "",
        working_hour_from: "",
        working_hour_end: "",
        break_hour_from: "",
        break_hour_end: "",
        no_break: ["0"],
      },
      {
        day: "2",
        name: "화요일",
        working_hours: "",
        working_hour_from: "",
        working_hour_end: "",
        break_hour_from: "",
        break_hour_end: "",
        no_break: ["0"],
      },
      {
        day: "3",
        name: "수요일",
        working_hours: "",
        working_hour_from: "",
        working_hour_end: "",
        break_hour_from: "",
        break_hour_end: "",
        no_break: ["0"],
      },
      {
        day: "4",
        name: "목요일",
        working_hours: "",
        working_hour_from: "",
        working_hour_end: "",
        break_hour_from: "",
        break_hour_end: "",
        no_break: ["0"],
      },
      {
        day: "5",
        name: "금요일",
        working_hours: "",
        working_hour_from: "",
        working_hour_end: "",
        break_hour_from: "",
        break_hour_end: "",
        no_break: ["0"],
      },
      {
        day: "6",
        name: "토요일",
        working_hours: "",
        working_hour_from: "",
        working_hour_end: "",
        break_hour_from: "",
        break_hour_end: "",
        no_break: ["0"],
      },
      {
        day: "7",
        name: "일요일",
        working_hours: "",
        working_hour_from: "",
        working_hour_end: "",
        break_hour_from: "",
        break_hour_end: "",
        no_break: ["0"],
      },
    ]);
    const backup_dayOff = ref([]);
    const wage = ref("hourly_wage");
    const salary = ref("");
    const bonus = reactive({
      status: "no_bonus",
      amount: "",
      defaultVal: 0,
    });
    const other_salary = reactive({
      status: "no",
      defaultVal: 0,
      salaries: [
        {
          type: "",
          amount: "",
        },
      ],
    });
    const wage_payment_type = ref("");
    const wage_payment_date_monthly = ref("");
    const payment_method = ref("");
    const social_ins_cover = ref([]);
    const name_of_worker = ref("");
    const worker_email = ref("");
    const openSignModal = reactive({
      isOpen: false,
    });
    const privacy = reactive({
      check: false,
      type: "",
    });
    const signature = ref(null);
    const signatureBase64 = ref("");
    const errors = ref({});
    const showSuccessModal = ref(false);
    const checkDate = ref([]);
    const companyAddress = ref("");
    const companyPhoneNo = ref("");
    const companyrepresentative = ref("");
    const companyName = ref("");
    const createdDate = ref("");
    const editId = ref(localStorage.getItem("contractId"));
    const functionType = ref(localStorage.getItem("contractFormType"));
    const noBreak_Time = ref(null);
    const disabledSubmit = ref(false);

    const router = useRouter();
    provide("openSignModal", openSignModal);

    const checkTypeForm = () => {
      if (functionType.value == "add") {
        if (!employmentStore.state.employmentFormtype) {
          router.push({ name: "EmploymentContractWritingStepOne" });
        }
      } else {
        if (!editId.value) {
          router.go(-1);
        }
      }
    };
    const formatPhoneNumber = (num) => {
      var cleaned = ("" + num).replace(/\D/g, "");
      if (num.toString().length == "11") {
        var match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
        if (match) {
          return "" + match[1] + "-" + match[2] + "-" + match[3];
        }
        return null;
      } else if (num.toString().length == "10") {
        var match1 = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);
        if (match1) {
          return "" + match1[1] + "-" + match1[2] + "-" + match1[3];
        }
        return null;
      } else if (num.toString().length == "9") {
        var match2 = cleaned.match(/^(\d{1})(\d{4})(\d{4})$/);
        if (match2) {
          return "" + match2[1] + "-" + match2[2] + "-" + match2[3];
        }
        return null;
      }
    };

    onMounted(() => {
      checkTypeForm();
      employerDetails();
      if (functionType.value == "edit") {
        formDetails();
      }
    });

    onUnmounted(() => {
      localStorage.removeItem("contractFormType");
      localStorage.removeItem("contractId");
      functionType.value = "";
      editId.value = "";
    });

    // watch(
    //   () => privacy.check,
    //   (val) => {
    //     console.log(val);
    //   }
    // );

    // get details for prefield data for edit screen
    const formDetails = async () => {
      let res = await employmentService.formDetails(editId.value);
      // console.log(res);
      employmentStore.state.employmentFormtype = res.data.type;
      if (functionType.value == "edit") {
        businessOwnerName.value = res.data.business_owner_name;
      }
      startDate.year = commonStore.methods.dateFormat(
        res.data.term_start_date,
        "YYYY"
      );
      startDate.month = commonStore.methods.dateFormat(
        res.data.term_start_date,
        "MM"
      );
      startDate.day = commonStore.methods.dateFormat(
        res.data.term_start_date,
        "DD"
      );
      endDate.year = commonStore.methods.dateFormat(
        res.data.term_end_date,
        "YYYY",""
      );
      endDate.month = commonStore.methods.dateFormat(
        res.data.term_end_date,
        "MM",""
      );
      endDate.day = commonStore.methods.dateFormat(
        res.data.term_end_date,
        "DD",""
      );
      place_of_work.value = res.data.place_of_work;
      Business_information.value = res.data.business_information;
      wage.value = res.data.wage;
      salary.value = res.data.salary;
      // working_days.value = [...res.data.parttime_work_day];
      res.data.parttime_work_day.forEach((res) => {
        checkDate.value.push(String(res.day));
        working_days.value.push({
          day: res.day,
          working_hours: res.working_hours == null ? "" : res.working_hours,
          working_hour_from: res.working_hour_from,
          working_hour_end: res.working_hour_end,
          break_hour_from:
            res.break_hour_from == null ? "" : res.break_hour_from,
          break_hour_end: res.break_hour_end == null ? "" : res.break_hour_end,
          no_break: res.no_break,
        });
      });
      // console.log(checkDate.value, "checking");
      wage_payment_type.value = res.data.wage_payment_type;
      if (res.data.wage_payment_type === "monthly") {
        wage_payment_date_monthly.value = String(res.data.wage_payment_date);
      }
      payment_method.value = res.data.payment_method;
      social_ins_cover.value = [...res.data.social_ins_cover];
      signatureBase64.value = res.data.signature;
      name_of_worker.value = res.data.name_of_worker;
      worker_email.value = res.data.seeker_email;
      privacy.check = true;
      bonus.status = res.data.bonus;
      if (res.data.bonus == "bonus_available") {
        bonus.defaultVal = 1;
      } else {
        bonus.defaultVal = 0;
      }
      bonus.amount = res.data.bonus_amount;
      other_salary.status = res.data.other_salaries;
      if (res.data.other_salaries == "available") {
        other_salary.defaultVal = 1;
      } else {
        other_salary.defaultVal = 0;
      }
      other_salary.salaries = [...res.data.other_salaries_type_amount];
      createdDate.value = res.data.created_at;
      // console.log(bonus, other_salary);
    };

    // Check if there is no break time
    // watch(
    //   () => break_time.noBreak,
    //   (val) => {
    //     console.log(val);
    //     if (val == "1") {
    //       noBreak_Time.value.checked = true;
    //     }
    //   }
    // );

    const employerDetails = async () => {
      let res = await profile.userDeatils();
      // console.log(res);
      companyAddress.value = res.data.address;
      companyPhoneNo.value = res.data.phone_number;
      companyrepresentative.value = res.data.name;
      companyName.value = res.data.company_info.company_name;
      businessOwnerName.value = res.data.company_info.contact_person;
    };

    const setDays = (e, item, type) => {
      if (e.target.checked) {
        working_days.value.push({
          day: Number(item.day),
          working_hours: "",
          working_hour_from: "",
          working_hour_end: "",
          break_hour_from: "",
          break_hour_end: "",
          no_break: ["0"],
        });
      } else {
        let presentId = working_days.value.findIndex(
          (res) => res.day == item.day
        );
        working_days.value.splice(presentId, 1);
        let presentEle = working_days_hours.value.find(
          (res) => res.day == item.day
        );
        if (presentEle != undefined) {
          presentEle.working_hours = "";
          presentEle.working_hour_from = "";
          presentEle.working_hour_end = "";
          presentEle.break_hour_from = "";
          presentEle.break_hour_end = "";
          presentEle.no_break = ["0"];
        }
      }
    };

    const setDaysHours = (e, item, type) => {
      let isPresent = working_days.value.find((res) => res.day == item.day);
      if (isPresent != undefined) {
        // console.log("key present");
        if (type !== "no_break") {
          isPresent[type] = String(e.target.value);
        } else {
          // console.log(e);
          isPresent[type] = e.target.checked ? ["1"] : ["0"];
          if (isPresent.hasOwnProperty("break_hour_from")) {
            isPresent["break_hour_from"] = "";
          }
          if (isPresent.hasOwnProperty("break_hour_from")) {
            isPresent["break_hour_end"] = "";
          }
        }
        // console.log(isPresent);
      } else {
        working_days.value.push({
          day: item.day,
          [type]: e.target.value,
        });
      }

      // console.log("check data", working_days.value);
    };

    // get the days off
    watch(
      () => working_days.value,
      (val) => {
        // console.log(val, "chutti");

        backup_dayOff.value = day_off.value.filter(
          (res) => !checkDate.value.includes(res.value)
        );
        val.forEach((res) => {
          let changeEle = working_days_hours.value.find(
            (ele) => String(ele.day) === String(res.day)
          );
          if (changeEle != undefined) {
            changeEle.working_hours = res.working_hours;
            changeEle.working_hour_from = res.working_hour_from;
            changeEle.working_hour_end = res.working_hour_end;
            changeEle.break_hour_from = res.break_hour_from;
            changeEle.break_hour_end = res.break_hour_end;
            changeEle.no_break = [String(res.no_break)];
          }
          // console.log(changeEle, "check change");
          if (changeEle.no_break.includes("1")) {
            // console.log("checked");
          }
        });

        // console.log(backup_dayOff.value);
      },
      { deep: true }
    );

    const addOtherSalary = () => {
      other_salary.salaries.push({
        type: "",
        amount: "",
      });
    };

    const removeOtherSalary = (id) => {
      other_salary.salaries.splice(id, 1);
    };

    const setAmount = (event, id) => {
      // console.log(event, id);
      other_salary.salaries.map((ele, index) => {
        if (index === id) {
          return (ele.amount = event.target.value);
        }
      });
      // console.log(other_salary.salaries);
    };

    const setType = (event, id) => {
      // console.log(event, id);
      other_salary.salaries.map((ele, index) => {
        if (index === id) {
          return (ele.type = event.target.value);
        }
      });
      // console.log(other_salary.salaries);
    };

    const setNoBreakTime = (e) => {
      // console.log(e);
      break_time.noBreak = e.target.checked ? "1" : "0";
      if (e.target.checked) {
        break_time.from = "";
        break_time.till = "";
      }
    };

    const setBonusState = (e) => {
      if (e == "상여금 없음") {
        bonus.status = "no_bonus";
        bonus.amount = "";
      } else {
        bonus.status = "bonus_available";
      }
    };

    const getOtherSalaryStatus = (e) => {
      if (e == "기타급여 없음") {
        other_salary.status = "no";
        other_salary.salaries = [
          {
            type: "",
            amount: "",
          },
        ];
      } else {
        other_salary.status = "available";
      }
    };

    const approveContract = (event) => {
      // console.log("image", event);
      openSignModal.isOpen = false;
      signature.value = event;
      const reader = new FileReader();
      reader.onload = (e) => {
        signatureBase64.value = e.target.result;
      };
      reader.readAsDataURL(event);
      // console.log(signatureBase64.value);
    };

    const checkError = (data) => {
      const { isInvalid, error } = PartTimeContractValidation(data);
      if (error.require) {
        commonStore.methods.displayRequiredToast();
      }
      if (isInvalid) {
        errors.value = error;
        // console.log(errors.value, "check error");
        return false;
      } else {
        errors.value = {};
        return true;
      }
    };

    const isSubmit = async () => {
      disabledSubmit.value = true;
      let inputData = {
        type: employmentStore.state.employmentFormtype,
        email: worker_email.value,
        business_owner_name: businessOwnerName.value,
        term_start_date:
          startDate.year + "-" + startDate.month + "-" + startDate.day,
        term_end_date:
          endDate?.year.length > 0 ||
          endDate?.month.length > 0 ||
          endDate?.day.length > 0
            ? endDate.year + "-" + endDate.month + "-" + endDate.day
            : "",
        place_of_work: place_of_work.value,
        business_information: Business_information.value,
        working_days: [...working_days.value],
        // days_off: day_off.value,
        pay_type: wage.value,
        salary: String(salary.value),
        bonus: bonus.status,
        bonus_amount: String(bonus.amount),
        other_salaries: other_salary.status,
        other_salaries_type_amount: other_salary.salaries,
        wage_payment_type: wage_payment_type.value,
        wage_payment_date_monthly: String(wage_payment_date_monthly.value),
        payment_method: payment_method.value,
        social_ins_cover: social_ins_cover.value,
        name_of_worker: name_of_worker.value,
        image: signature.value,
        termsOfservice: privacy.check,
        pageState: functionType.value,
      };
      // console.log(inputData);
      if (!checkError(inputData)) {
        // commonStore.methods.displayRequiredToast()
        disabledSubmit.value = false;
        return;
      } else {
        // console.log("ready");
        const formData = new FormData();
        formData.append("type", employmentStore.state.employmentFormtype);
        formData.append("email", worker_email.value);
        formData.append("business_owner_name", businessOwnerName.value);
        formData.append("term_end_date", inputData.term_end_date);
        formData.append("term_start_date", inputData.term_start_date);
        formData.append("place_of_work", inputData.place_of_work);
        formData.append("business_information", inputData.business_information);
        inputData.working_days.forEach((res, id) => {
          formData.append(
            `working_days_and_working_hours[${id}][day]`,
            String(res.day)
          );
          formData.append(
            `working_days_and_working_hours[${id}][working_hours]`,
            String(res.working_hours)
          );
          formData.append(
            `working_days_and_working_hours[${id}][working_hour_from]`,
            String(res.working_hour_from)
          );
          formData.append(
            `working_days_and_working_hours[${id}][working_hour_end]`,
            String(res.working_hour_end)
          );
          formData.append(
            `working_days_and_working_hours[${id}][break_hour_from]`,
            String(res.break_hour_from)
          );
          formData.append(
            `working_days_and_working_hours[${id}][break_hour_end]`,
            String(res.break_hour_end)
          );
          formData.append(
            `working_days_and_working_hours[${id}][no_break]`,
            res.no_break.toString()
          );
        });
        formData.append("pay_type", inputData.pay_type);
        formData.append("salary", inputData.salary);
        formData.append("bonus", inputData.bonus);
        formData.append("bonus_amount", inputData.bonus_amount);
        formData.append("other_salaries", inputData.other_salaries);
        if (other_salary.status != "no") {
          inputData.other_salaries_type_amount.forEach((res, id) => {
            formData.append(
              `other_salaries_type_amount[${id}][type]`,
              String(res.type)
            );
            formData.append(
              `other_salaries_type_amount[${id}][ammount]`,
              String(res.amount)
            );
          });
        }
        formData.append("wage_payment_type", inputData.wage_payment_type);
        formData.append(
          "wage_payment_date_monthly",
          inputData.wage_payment_date_monthly
        );
        formData.append("payment_method", inputData.payment_method);
        inputData.social_ins_cover.forEach((res, id) => {
          formData.append(`social_ins_cover[${id}]`, res);
        });

        formData.append("name_of_worker", inputData.name_of_worker);
        if (signature.value != null) {
          formData.append("image", inputData.image);
        }

        // add
        if (functionType.value == "add") {
          let res = await employmentService.contractAdd(formData);
          // console.log(res);
          if (res.status === 200) {
            showSuccessModal.value = true;
            disabledSubmit.value = false;
          } else if (res.response.data.error == "invalidEmail") {
            errors.value["email"] = "존재하지 않는 이메일입니다.";
            disabledSubmit.value = false;
          } else {
            disabledSubmit.value = false;
          }
        } else {
          // edit
          formData.delete("email");
          let res = await employmentService.contractEdit(
            editId.value,
            formData
          );
          // console.log(res);
          if (res.status === 200) {
            showSuccessModal.value = true;
          } else {
            disabledSubmit.value = false;
          }
        }
      }
    };

    const closeSuccessModal = () => {
      showSuccessModal.value = false;
      router.push({ name: "LaborContract" });
    };

    function openPrivacyPolicy() {
      commonStore.state.isTermsOfServiceModal = true;
      privacy.type = "privacyPolicy";
    }

    return {
      employmentStore,
      businessOwnerName,
      startDate,
      endDate,
      place_of_work,
      Business_information,
      working_hours,
      break_time,
      working_days,
      day_off,
      wage,
      salary,
      bonus,
      other_salary,
      wage_payment_type,
      wage_payment_date_monthly,
      payment_method,
      social_ins_cover,
      name_of_worker,
      standardContractFormLists,
      openSignModal,
      privacy,
      worker_email,
      errors,
      addOtherSalary,
      removeOtherSalary,
      getOtherSalaryStatus,
      isSubmit,
      setAmount,
      setType,
      setNoBreakTime,
      setBonusState,
      approveContract,
      showSuccessModal,
      closeSuccessModal,
      signatureBase64,
      checkDate,
      setDaysHours,
      companyAddress,
      companyPhoneNo,
      companyrepresentative,
      companyName,
      setDays,
      backup_dayOff,
      createdDate,
      working_days_hours,
      noBreak_Time,
      commonStore,
      functionType,
      formatPhoneNumber,
      disabledSubmit,
      openPrivacyPolicy,
    };
  },
};
</script>

<style scoped>
.error-msg {
  color: rgb(212, 52, 52);
  margin-top: 4px;
}
</style>
