// 도메인 타입 — DB 스키마와 1:1

export const GUIDE_CATEGORIES = [
  "실손 청구",
  "진단비·수술비",
  "가게·사업자",
  "자녀·부모 대리청구",
  "거절·이의신청",
] as const;
export type GuideCategory = (typeof GUIDE_CATEGORIES)[number];

export const INSURERS = [
  "모르겠어요",
  "삼성화재",
  "DB손보",
  "현대해상",
  "KB손보",
  "메리츠",
  "한화손보",
  "롯데손보",
  "흥국화재",
  "삼성생명",
  "한화생명",
  "교보생명",
  "기타",
] as const;
export type Insurer = (typeof INSURERS)[number];

export const QNA_CATEGORIES = [
  "청구 되나요",
  "청구 어떻게",
  "가입 되나요",
  "이거 왜 이래요",
  "이거 맞아요",
] as const;
export type QnaCategory = (typeof QNA_CATEGORIES)[number];

export const EVIDENCE_TYPES = ["약관", "금감원", "보험사 안내"] as const;
export type EvidenceType = (typeof EVIDENCE_TYPES)[number];

export const AMOUNT_RANGES = [
  "10만원 이하",
  "10~50만원",
  "50~100만원",
  "100만원 이상",
] as const;
export type AmountRange = (typeof AMOUNT_RANGES)[number];

export const REFERER_SOURCES = ["네이버", "당근", "쓰레드", "직접", "기타"] as const;
export type RefererSource = (typeof REFERER_SOURCES)[number];

// 회사별 청구 채널 표 — 사실만 (앱/팩스/방문). 평가 열 금지.
export interface ChannelRow {
  insurer: string;
  app: string;
  fax: string;
  visit: string;
}

export interface Guide {
  id: string;
  slug: string;
  title: string;
  category: GuideCategory;
  one_line: string;
  channels_json: ChannelRow[];
  documents_md: string;
  rejections_md: string;
  appeal_md: string;
  evidence_md: string;
  is_public: boolean;
  view_count: number;
  updated_at: string;
  created_at?: string;
}

export interface Basic {
  id: string;
  slug: string;
  title: string;
  principle: string;
  criteria_md: string;
  evidence_md: string;
  guide_id: string | null;
  is_public: boolean;
  updated_at: string;
}

export interface Case {
  id: string;
  slug: string;
  title: string;
  situation_md: string;
  process_md: string;
  result_md: string;
  lesson_md: string;
  amount_range: AmountRange | null;
  guide_id: string | null;
  is_public: boolean;
  created_at: string;
}

export interface Question {
  id: string;
  body: string;
  insurer: Insurer;
  contact: string | null;
  contact_type: "phone" | "kakao" | "email" | null;
  status: "new" | "answered";
  category: QnaCategory | null;
  is_public: boolean;
  guide_id: string | null;
  referer_source: RefererSource;
  led_to_consult: boolean;
  created_at: string;
}

export interface Answer {
  id: string;
  question_id: string;
  body: string;
  evidence_type: EvidenceType | null;
  evidence_text: string | null;
  evidence_url: string | null;
  created_at: string;
}

// /qna 목록·상세에서 쓰는 질문+답변 결합형
export interface QnaItem extends Question {
  answer: Answer | null;
  guide?: { slug: string; title: string } | null;
}
