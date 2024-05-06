import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home/Home.vue";
import HomeWithsheet from "@/views/Home/HomeWithsheet.vue";

// function guest(to, from, next) {
//   // console.log(localStorage.getItem("token"))
//   // console.log(localStorage.getItem("login_type"))
//   if (localStorage.getItem("token") == null) {
//     next();
//   } else {
//     if(localStorage.getItem("login_type") == 'job_recruiter'){
//       next({ name: "HomeLanding" });
//     } else {
//       next();
//     }
//   } 
  
// }

//beforeEnter: guest,

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        mainHeader: true,
        isChat: "hide",
      },
    },
    {
      path: "/homewithsheet",
      name: "homewithsheet",
      component: HomeWithsheet,
      meta: {
        mainHeader: true,
      },
    },
    {
      path: "/select-membership-type",
      name: "SelectMembershipType",
      component: () => import("@/views/Signup/SelectMembershipType.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/select-membership-registration",
      name: "SelectMembershipRegistration",
      component: () =>
        import("@/views/Signup/SelectMembershipRegistration.vue"),
        meta: {
          isFooter: "hide",
          isChat: "hide"
        }
    },
    {
      path: "/cellphone-authentication",
      name: "CellphoneAuthentication",
      component: () => import("@/views/Signup/CellphoneAuthentication.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: '/silver-bell',
      name: 'SilverBell',
      component: () => import('@/views/Signup/SilverBell.vue')
    },
    // {
    //   path: '/find-email',
    //   name: 'FindEmail',
    //   component: () => import('@/views/Signup/FindEmail.vue')
    // },
    {
      path: "/find-email-authenticate",
      name: "FindEmailAuthenticate",
      component: () => import("@/views/Signup/FindEmailAuthenticate.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: () => import("@/views/Signup/ForgotPassword.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/forgot-password-authentication",
      name: "ForgotPasswordAuthentication",
      component: () =>
        import("@/views/Signup/ForgotPasswordAuthentication.vue"),
    },
    {
      path: "/change-password",
      name: "ChangePassword",
      component: () => import("@/views/Signup/ChangePassword.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/profile-setting/change-password",
      name: "ChangeProgilePassword",
      component: () => import("@/views/Signup/ChangePassword.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    // {
    //   path: "/login",
    //   name: "LogIn",
    //   component: () => import("@/views/Signup/LogIn.vue"),
    // },
    {
      path: "/job-seekers/region",
      name: "Region",
      component: () => import("@/views/JobSeekers/Region.vue"),
      meta: {
        mainHeader: true,
      },
    },
    {
      path: "/job-seekers/occupation-setting",
      name: "OccupationSetting",
      component: () => import("@/views/JobSeekers/OccupationSetting.vue"),
    },
    {
      path: "/job-seekers/region-select",
      name: "RegionSelect",
      component: () => import("@/views/JobSeekers/RegionSelect.vue"),
    },
    {
      path: "/job-seekers/region-select-list",
      name: "RegionSelectList",
      component: () => import("@/views/JobSeekers/RegionSelectList.vue"),
    },
    {
      path: "/job-seekers/search",
      name: "Search",
      component: () => import("@/views/JobSeekers/Search.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/notice",
      name: "Notice",
      component: () => import("@/views/JobSeekers/Notice.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/scrap",
      name: "Scrap",
      component: () => import("@/views/JobSeekers/Scrap.vue"),
      meta: {
        mainHeader: true,
      },
    },
    {
      path: "/job-seekers/scrap-edit",
      name: "ScrapEdit",
      component: () => import("@/views/JobSeekers/ScrapEdit.vue"),
    },
  
    {
      path: "/job-seekers/recently-viewed-announcement",
      name: "RecentlyViewedAnnouncement",
      component: () => import("@/views/JobSeekers/RecentlyViewedAnnouncement.vue"),
      meta: {
        mainHeader: true,
      },
    },    
    {
      path: "/job-seekers/apply-choose-resume/:id",
      name: "ApplyChooseResume",
      component: () => import("@/views/JobSeekers/ApplyChooseResume.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/around", // using for both jobseeker and recruiter
      name: "Around",
      component: () => import("@/views/JobSeekers/Around.vue"),
      meta: {
        mainHeader: true,
      },
    },
    {
      path: "/job-seekers/ai-recommendation",
      name: "AiRecommendation",
      component: () => import("@/views/JobSeekers/AiRecommendation.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/ai-recommendation-list",
      name: "AiRecommendationList",
      component: () => import("@/views/JobSeekers/AiRecommendationList.vue"),
      meta: {
        mainHeader: true,
      },
    },
    {
      path: "/job-seekers/ai-recommendation-no-data",
      name: "AiRecommendationNoData",
      component: () => import("@/views/JobSeekers/AiRecommendationNoData.vue"),
    },
    {
      path: "/job-seekers/resume-no-data",
      name: "ResumeNoData",
      component: () => import("@/views/JobSeekers/ResumeNoData.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/resume",
      name: "Resume",
      component: () => import("@/views/JobSeekers/Resume.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/resume-maximum",
      name: "ResumeMaximum",
      component: () => import("@/views/JobSeekers/ResumeMaximum.vue"),
    },        
    {
      path: "/job-seekers/labor-contract",
      name: "LaborContract",
      component: () => import("@/views/JobSeekers/LaborContract.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/labor-contract-details/:type/:id",
      name: "LaborContractDetails",
      component: () => import("@/views/JobSeekers/LaborContractDetails.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/labor-contract-details-accompany/:id",
      name: "LaborContractDetailsAccompany",
      component: () => import("@/views/JobSeekers/LaborContractDetailsAccompany.vue"),
    },
    // {
    //   path: "/job-seekers/employment-signature",
    //   name: "EmploymentSignature",
    //   component: () => import("@/views/JobSeekers/EmploymentSignature.vue"),
    // },

    {
      path: "/job-seekers/job-hunting-certificate",
      name: "JobHuntingCertificate",
      component: () => import("@/views/JobSeekers/JobHuntingCertificate.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/job-hunting-certificate-select",
      name: "JobHuntingCertificateSelect",
      component: () => import("@/views/JobSeekers/JobHuntingCertificateSelect.vue"),
    },
    {
      path: "/job-seekers/resume-writing",
      name: "ResumeWriting",
      component: () => import("@/views/JobSeekers/ResumeWriting.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/resume-writing-basics/:id",
      name: "ResumeWritingBasics",
      component: () => import("@/views/JobSeekers/ResumeWritingBasics.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/resignation-letter/:tab?",
      name: "ResignationLetter",
      component: () => import("@/views/JobSeekers/ResignationLetter.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/resignation-letter-details",
      name: "ResignationLetterDetails",
      props(route) {
        return {  myprop: route.query.myprop }
      },
      component: () => import("@/views/JobSeekers/ResignationLetterDetails.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/write-resignation-letter",
      name: "WriteResignationLetter",
      props(route) {
        return {  myprop: route.query.myprop }
      },
      component: () => import("@/views/JobSeekers/WriteResignationLetter.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/company-star-rating",
      name: "CompanyStarRating",
      component: () => import("@/views/JobSeekers/CompanyStarRating.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/experience-no-data",
      name: "ExperienceNoData",
      component: () => import("@/views/JobSeekers/ExperienceNoData.vue"),
    },
    // {
    //   path: "/job-seekers/add-career",
    //   name: "AddCareer",
    //   component: () => import("@/views/JobSeekers/AddCareer.vue"),
    // },
    {
      path: "/job-seekers/add-career-complete",
      name: "AddCareerComplete",
      component: () => import("@/views/JobSeekers/AddCareerComplete.vue"),
    },
    {
      path: "/job-seekers/add-career-revision",
      name: "AddCareerRevision",
      component: () => import("@/views/JobSeekers/AddCareerRevision.vue"),
    },
    {
      path: "/job-seekers/my-page",
      name: "MyPage",
      component: () => import("@/views/JobSeekers/MyPage.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/profile-setting",
      name: "ProfileSetting",
      component: () => import("@/views/JobSeekers/ProfileSetting.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/profile-sns-login-setting",
      name: "ProfileSnsLoginSetting",
      component: () => import("@/views/JobSeekers/ProfileSnsLoginSetting.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/edit-member-information",
      name: "EditMemberInformation",
      component: () => import("@/views/JobSeekers/EditMemberInformation.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/profile-withdrawal",
      name: "ProfileWithdrawal",
      component: () => import("@/views/JobSeekers/ProfileWithdrawal.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/push-notification",
      name: "PushNotification",
      component: () => import("@/views/JobSeekers/PushNotification.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/selfPR",
      name: "SelfPR",
      component: () => import("@/views/JobSeekers/SelfPR.vue"),
    },
    {
      path: "/job-seekers/add-selfPR-file",
      name: "AddSelfPRFile",
      component: () => import("@/views/JobSeekers/AddSelfPRFile.vue"),
    },
    {
      path: "/job-seekers/add-selfPR-document-file",
      name: "AddSelfPRDocumentFile",
      component: () => import("@/views/JobSeekers/AddSelfPRDocumentFile.vue"),
    },
    {
      path: "/job-seekers/company-interest-no-data",
      name: "CompanyInterestNoData",
      component: () => import("@/views/JobSeekers/CompanyInterestNoData.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/company-interest",
      name: "CompanyInterest",
      component: () => import("@/views/JobSeekers/CompanyInterest.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/company-interest-edit",
      name: "CompanyInterestEdit",
      component: () => import("@/views/JobSeekers/CompanyInterestEdit.vue"),
    },
    {
      path: "/job-seekers/company-information/:id",
      name: "CompanyInformation",
      component: () => import("@/views/JobSeekers/CompanyInformation.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/application-status",
      name: "ApplicationStatus",
      component: () => import("@/views/JobSeekers/ApplicationStatus.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/application-status-no-data",
      name: "ApplicationStatusNoData",
      component: () => import("@/views/JobSeekers/ApplicationStatusNoData.vue"),
    },
    {
      path: "/job-seekers/cancel-application",
      name: "CancelApplication",
      component: () => import("@/views/JobSeekers/CancelApplication.vue"),
    },
    {
      path: "/job-seekers/terms-of-service",
      name: "TermsOfService",
      component: () => import("@/views/JobSeekers/TermsOfService.vue"),
    },
    {
      path: "/privacy-policy",
      name: "PrivacyPolicy",
      component: () => import("@/views/JobSeekers/PrivacyPolicy.vue"),
    },
    {
      path: "/job-seekers/customer-notice",
      name: "CustomerNotice",
      component: () => import("@/views/JobSeekers/CustomerNotice.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/customer-notice-details/:id",
      name: "CustomerNoticeDetails",
      component: () => import("@/views/JobSeekers/CustomerNoticeDetails.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/position-suggestion-disable",
      name: "PositionSuggestionDisable",
      component: () => import("@/views/JobSeekers/PositionSuggestionDisable.vue"),
    },
    {
      path: "/job-seekers/position-offer",
      name: "PositionOffer",
      component: () => import("@/views/JobSeekers/PositionOffer.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/position-suggestion-setup",
      name: "PositionSuggestionSetup",
      component: () => import("@/views/JobSeekers/PositionSuggestionSetup.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/consultation-on-labor",
      name: "ConsultationOnLabor",
      component: () => import("@/views/JobSeekers/ConsultationOnLabor.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/create-consultaion",
      name: "CreateConsultaion",
      component: () => import("@/views/JobSeekers/CreateConsultaion.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },     
    {
      path: "/job-seekers/labor-consultation-answer-X",
      name: "LaborConsultationAnswerX",
      component: () => import("@/views/JobSeekers/LaborConsultationAnswerX.vue"),
    },
    {
      path: "/job-seekers/labor-consultation-answer-O/:id",
      name: "LaborConsultationAnswerO",
      component: () => import("@/views/JobSeekers/LaborConsultationAnswerO.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/star-management",
      name: "StarManagement",
      component: () => import("@/views/JobSeekers/StarManagement.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/job-seekers/star-managemnt-lookup/:id",
      name: "StarManagementLookup",
      component: () => import("@/views/JobSeekers/StarManagementLookup.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/notice-registration",
      name: "NoticeRegistration",
      component: () => import("@/views/Recruiter/NoticeRegistration/NoticeRegistration.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/notice-registration/edit/:id/:operation?",
      name: "NoticeRegistrationEdit",
      component: () => import("@/views/Recruiter/NoticeRegistration/NoticeRegistration.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/home-landing",
      name: "HomeLanding",
      component: () => import("@/views/Recruiter/Home/HomeLanding.vue"),
      meta: {
        mainHeader: true,
      },
    },  
    {
      path: "/recruiter/job-listing/:tab?/:status?",
      name: "JobListing",
      component: () => import("@/views/Recruiter/JobPostingManagement/JobListing.vue"),
      meta: {
        mainHeader: true,
      },
    },
    {
      path: "/job-posting-details/:id",
      name: "RecruiterJobPostingDetails",
      component: () => import("@/views/Recruiter/JobPostingManagement/JobPostingDetails.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/paid-product-application",
      name: "PaidProductApplication",
      component: () => import("@/views/Recruiter/JobPostingManagement/PaidProductApplication.vue"),
    },
    {
      path: "/recruiter/paid-product-cancellation",
      name: "PaidProductCancellation",
      component: () => import("@/views/Recruiter/JobPostingManagement/PaidProductCancellation.vue"),
    },
    {
      path: "/recruiter/applicant-information/:id/:seeker_id?",
      name: "ApplicantInformation",
      component: () => import("@/views/Recruiter/ApplicantInformation.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/applicant-confirmation-list",
      name: "ApplicantConfirmationList",
      component: () => import("@/views/Recruiter/JobPostingManagement/ApplicantConfirmationList.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/particular-job-post-applicant-confirmation/:id",
      name: "ParticularJobPostApplicantConfirmation",
      component: () => import("@/views/Recruiter/JobPostingManagement/ParticularJobPostApplicantConfirmation.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/job-selection",
      name: "JobSelection",
      component: () => import("@/views/Recruiter/NoticeRegistration/JobSelection.vue"),
    },
    {
      path: "/recruiter/select-preferential-conditions",
      name: "SelectPreferentialConditions",
      component: () => import("@/views/Recruiter/NoticeRegistration/SelectPreferentialConditions.vue"),
    },
    {
      path: "/recruiter/talent-search-list",
      name: "TalentSearchList",
      component: () => import("@/views/Recruiter/TalentSearch/TalentSearchList.vue"),
      meta: {
        mainHeader: true,
      },
    },
    {
      path: "/recruiter/talent-position-offer",
      name: "TalentPositionOffer",
      component: () => import("@/views/Recruiter/TalentSearch/TalentPositionOffer.vue"),
    },
    {
      path: "/recruiter/job-selections",
      name: "JobSelection",
      component: () => import("@/views/Recruiter/TalentSearch/JobSelection.vue"),
    },
    {
      path: "/recruiter/notification-type-purchase",
      name: "NotificationTypePurchase",
      component: () => import("@/views/Recruiter/NoticeRegistration/NotificationTypePurchase.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/emergency",
      name: "Emergency",
      component: () => import("@/views/Recruiter/NoticeRegistration/Emergency.vue"),
    },
    {
      path: "/recruiter/premium",
      name: "Premium",
      component: () => import("@/views/Recruiter/NoticeRegistration/Premium.vue"),
    },
    {
      path: "/recruiter/special",
      name: "Special",
      component: () => import("@/views/Recruiter/NoticeRegistration/Special.vue"),
    },
    {
      path: "/recruiter/line",
      name: "Line",
      component: () => import("@/views/Recruiter/NoticeRegistration/Line.vue"),
    },    
    {
      path: "/recruiter/Notification-paid-product-application",
      name: "NotificationPaidProductApplication",
      component: () => import("@/views/Recruiter/NoticeRegistration/PaidProductApplication.vue"),
    },
    {
      path: "/recruiter/Notification-paid-product-payment",
      name: "NotificationPaidProductPayment",
      component: () => import("@/views/Recruiter/NoticeRegistration/PaidProductPayment.vue"),
    },
    {
      path: "/recruiter/paid-product-purchase",
      name: "PaidProductPurchase",
      component: () => import("@/views/Recruiter/PaidProductPurchase/PaidProductPurchase.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/employment-contract-writing-step-one",
      name: "EmploymentContractWritingStepOne",
      component: () => import("@/views/Recruiter/ViewMore/EmploymentContractWritingStepOne.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/standard-labor-contract-step-two",
      name: "StandardLaborContractStepTwo",
      component: () => import("@/views/Recruiter/ViewMore/StandardLaborContractStepTwo.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },  
    {
      path: "/recruiter/part-time-worker-contract-step-two",
      name: "PartTimeWorkerContractStepTwo",
      component: () => import("@/views/Recruiter/ViewMore/PartTimeWorkerContractStepTwo.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    }, 
    {
      path: "/recruiter/young-worker-contract-step-two",
      name: "YoungWorkerContractStepTwo",
      component: () => import("@/views/Recruiter/ViewMore/YoungWorkerContractStepTwo.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/constraction-day-worker-contract-step-two",
      name: "ConstractionDayWorkerContractStepTwo",
      component: () => import("@/views/Recruiter/ViewMore/ConstractionDayWorkerContractStepTwo.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/parental-authority-consent-form-step-two",
      name: "ParentalAuthorityConsentFormStepTwo",
      component: () => import("@/views/Recruiter/ViewMore/ParentalAuthorityConsentFormStepTwo.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/my-page",
      name: "RecruiterMyPage",
      component: () => import("@/views/Recruiter/MyPage/MyPage.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },   
    {
      path: "/recruiter/profile",
      name: "RecruiterProfile",
      component: () => import("@/views/Recruiter/MyPage/Profile.vue"),
    },   
    {
      path: "/recruiter/sns-login-setting",
      name: "RecruiterSnsLoginSetting",
      component: () => import("@/views/Recruiter/MyPage/SnsLoginSetting.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },  
    {
      path: "/recruiter/edit-member-information",
      name: "RecruiterEditMemberInformation",
      component: () => import("@/views/Recruiter/MyPage/EditMemberInformation.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/edit-company-information",
      name: "RecruiterEditcompanyInformation",
      component: () => import("@/views/Recruiter/MyPage/EditcompanyInformation.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/super-short-coin-shop",
      name: "SuperShortCoinShop",
      component: () => import("@/views/Recruiter/MyPage/SuperShortCoinShop.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/chodan-coin-shop-history",
      name: "ChodanCoinShopHistory",
      component: () => import("@/views/Recruiter/MyPage/ChodanCoinShopHistory.vue"),
    },
    {
      path: "/recruiter/push-notification",
      name: "RecruiterPushNotification",
      component: () => import("@/views/Recruiter/MyPage/PushNotification.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/consultation-on-labor",
      name: "RecruiterConsultationOnLabor",
      component: () => import("@/views/Recruiter/MyPage/ConsultationOnLabor.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/labor-consultation-answer-O/:id",
      name: "RecruiterLaborConsultationAnswerO",
      component: () => import("@/views/Recruiter/MyPage/LaborConsultationAnswerO.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/labor-consultation-answer-X",
      name: "RecruiterLaborConsultationAnswerX",
      component: () => import("@/views/Recruiter/MyPage/LaborConsultationAnswerX.vue"),
    },
    {
      path: "/recruiter/create-consultaion",
      name: "RecruiterCreateConsultaion",
      component: () => import("@/views/Recruiter/MyPage/CreateConsultaion.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/star-management",
      name: "RecruiterStarManagement",
      component: () => import("@/views/Recruiter/MyPage/StarManagement.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/star-management-lookup/:id",
      name: "RecruiterStarManagementLookup",
      component: () => import("@/views/Recruiter/MyPage/StarManagementLookup.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/star-management-evaluation",
      name: "RecruiterStarManagementEvaluation",
      component: () => import("@/views/Recruiter/MyPage/StarManagementEvaluation.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/paid-talent-search-history-no-data",
      name: "PaidTalentSearchHistoryNoData",
      component: () => import("@/views/Recruiter/MyPage/PaidTalentSearchHistoryNoData.vue"),
    },
    {
      path: "/recruiter/paid-talent-search-history",
      name: "PaidTalentSearchHistory",
      component: () => import("@/views/Recruiter/MyPage/PaidTalentSearchHistory.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/paid-product-locker-no-data",
      name: "PaidProductLockerNoData",
      component: () => import("@/views/Recruiter/MyPage/PaidProductLockerNoData.vue"),
    },
    {
      path: "/recruiter/paid-product-locker",
      name: "PaidProductLocker",
      component: () => import("@/views/Recruiter/MyPage/PaidProductLocker.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/apply-paid-feature",
      name: "ApplyPaidFeature",
      component: () => import("@/views/Recruiter/MyPage/ApplyPaidFeature.vue"),
    },
    {
      path: "/recruiter/terms-of-service",
      name: "RecruiterTermsOfService",
      component: () => import("@/views/Recruiter/MyPage/TermsOfService.vue"),
    },
    {
      path: "/recruiter/privacy-policy",
      name: "RecruiterPrivacyPolicy",
      component: () => import("@/views/Recruiter/MyPage/PrivacyPolicy.vue"),
    },
    {
      path: "/recruiter/notice",
      name: "RecruiterNotice",
      component: () => import("@/views/Recruiter/MyPage/Notice.vue"),
    },
    {
      path: "/recruiter/notice-details",
      name: "RecruiterNoticeDetails",
      component: () => import("@/views/Recruiter/MyPage/NoticeDetails.vue"),
    },
    {
      path: "/recruiter/customer-notice",
      name: "RecruiterCustomerNotice",
      component: () => import("@/views/Recruiter/MyPage/CustomerNotice.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/customer-notice-details/:id",
      name: "RecruiterCustomerNoticeDetails",
      component: () => import("@/views/Recruiter/MyPage/CustomerNoticeDetails.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/requestautomaticjobpostingservice",
      name: "RequestAutomaticJobPostingService",
      component: () => import("@/views/Recruiter/MyPage/RequestAutomaticJobPostingService.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/requestautomaticjobpostingservicechecked",
      name: "RequestAutomaticJobPostingServiceChecked",
      component: () => import("@/views/Recruiter/MyPage/RequestAutomaticJobPostingServiceChecked.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
    {
      path: "/recruiter/automaticjobpostingrequesthistory",
      name: "AutomaticJobPostingRequestHistory",
      component: () => import("@/views/Recruiter/MyPage/AutomaticJobPostingRequestHistory.vue"),
      meta: {
        isFooter: "hide",
        isChat: "hide"
      }
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
});
router.afterEach((to,from, next) => {
  localStorage.setItem('PreRouteName', from.name)
});

export default router;
