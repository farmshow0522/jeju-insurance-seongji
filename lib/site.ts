// 사이트 전역 설정 — 문구/브랜드/성지 지기 정보.
// ○○ 자리는 실제 값으로 바꿔주세요 (지점명·등록번호·취급 보험사 수).

export const SITE = {
  name: "보험성지",
  slogan: "제대로 알려주는 곳",
  fullName: "제주 보험 성지",
  headline: "제주 보험, 제대로 알려주는 곳.",
  subhead: "어느 회사 보험이든 · 근거 있는 답 · 헷갈리면 여기서 확인",
  description:
    "어느 회사 보험이든 청구·가입·보장 질문에 근거 있는 답을 드려요. 가입 권유는 없어요.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",

  keeper: {
    name: "현승민",
    role: "제주 보험 성지 지기",
    company: "메타리치",
    branch: "○○지점",
    licenseNo: "○○○", // 설계사 등록번호
    insurerCount: "○○", // 취급 보험사 수
    note: "여러 보험사 상품 취급",
  },

  // 하단 "당근 카페에서도 물어보세요" 링크
  daangnCafeUrl: process.env.NEXT_PUBLIC_DAANGN_URL || "",
} as const;

// /qna 맨 아래 "내 보험 정확히 보고 싶다면" 링크.
// ANALYSIS_URL 이 비어 있으면 "내보험다보여" 안내로 대체 (2단계에서 켬).
export const ANALYSIS_URL = process.env.ANALYSIS_URL || "";
