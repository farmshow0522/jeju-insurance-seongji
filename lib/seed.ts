// 로컬 미리보기용 시드 데이터 (Supabase 미연결 시 fallback).
// 실제 배포에서는 supabase/migrations 의 SQL 시드가 들어가며, 본문은 admin에서 채웁니다.
// 여기 채널·서류·근거는 "구조를 보여주는 자리표시자"일 뿐 사실이 아닙니다. ([확인 필요])

import type { Guide, Basic, Case, QnaItem } from "./types";

const TODAY = "2026-09-24";

const PLACEHOLDER_DOCS = `10만원 이하 · [admin에서 채워주세요]
50만원 이하 · [admin에서 채워주세요]
50만원 초과 · [admin에서 채워주세요]`;

const PLACEHOLDER_REJECT = `1. [자주 거절되는 이유 1 — admin에서 채워주세요]
2. [자주 거절되는 이유 2]
3. [자주 거절되는 이유 3]`;

const PLACEHOLDER_APPEAL = `먼저 보험사에 이의신청을 넣어요. 그래도 안 되면 금융감독원 분쟁조정을 신청할 수 있어요.
[구체 절차는 admin에서 채워주세요]`;

const PLACEHOLDER_EVIDENCE = `[근거를 채워주세요 — 약관 조항 / 금감원 자료 / 보험사 공식 안내 중 하나. 확인 전에는 [확인 필요]로 둡니다.]`;

function guide(
  slug: string,
  title: string,
  category: Guide["category"],
  one_line: string,
): Guide {
  return {
    id: slug,
    slug,
    title,
    category,
    one_line,
    channels_json: [
      { insurer: "[보험사]", app: "[admin에서 입력]", fax: "[입력]", visit: "[입력]" },
    ],
    documents_md: PLACEHOLDER_DOCS,
    rejections_md: PLACEHOLDER_REJECT,
    appeal_md: PLACEHOLDER_APPEAL,
    evidence_md: PLACEHOLDER_EVIDENCE,
    is_public: true, // 로컬 미리보기에서만 true — 실제 DB 시드는 비공개
    view_count: 0,
    updated_at: TODAY,
  };
}

export const SEED_GUIDES: Guide[] = [
  guide("silson-outpatient", "실손 통원 청구, 이렇게 하면 됩니다", "실손 청구", "한 줄 결론이 들어가요 — 되는지·안 되는지, 서류 몇 개."),
  guide("silson-inpatient", "실손 입원 청구, 서류 5가지와 순서", "실손 청구", "한 줄 결론이 들어가요."),
  guide("manual-therapy", "도수치료·비급여 청구, 세대별 한도", "실손 청구", "한 줄 결론이 들어가요."),
  guide("er-jeju", "응급실·야간진료 청구, 제주 병원 기준", "실손 청구", "한 줄 결론이 들어가요."),
  guide("child-claim", "아이 병원비 청구, 부모 대리청구 절차", "자녀·부모 대리청구", "한 줄 결론이 들어가요."),
  guide("rejection-appeal", "청구 거절됐을 때, 이의신청부터 금감원까지", "거절·이의신청", "한 줄 결론이 들어가요."),
  guide("parent-proxy", "부모님 보험 대리청구, 위임장과 서류", "자녀·부모 대리청구", "한 줄 결론이 들어가요."),
  guide("over-3-years", "3년 지난 청구, 되는 것과 안 되는 것", "거절·이의신청", "한 줄 결론이 들어가요."),
  guide("shop-fire-liability", "가게 화재·배상책임 청구, 사고 당일 할 일", "가게·사업자", "한 줄 결론이 들어가요."),
  guide("mainland-policy", "육지 보험 제주에서 청구하는 법", "실손 청구", "한 줄 결론이 들어가요."),
];

function basic(
  slug: string,
  title: string,
  principle: string,
): Basic {
  return {
    id: slug,
    slug,
    title,
    principle,
    criteria_md: `## 첫 번째 기준\n[admin에서 채워주세요]\n\n## 두 번째 기준\n[admin에서 채워주세요]\n\n## 세 번째 기준\n[admin에서 채워주세요]`,
    evidence_md: PLACEHOLDER_EVIDENCE,
    guide_id: null,
    is_public: true,
    updated_at: TODAY,
  };
}

export const SEED_BASICS: Basic[] = [
  basic("gojii-3-1-5", "고지의무 세 가지 기준 (3개월·1년·5년)", "원칙 한 줄이 들어가요."),
  basic("silson-generations", "실손 1~4세대 차이 한 장 정리", "원칙 한 줄이 들어가요."),
  basic("surrender-value", "해지환급금은 왜 낸 돈과 다른가", "원칙 한 줄이 들어가요."),
  basic("simplified-325", "유병자보험 가입 기준 (간편심사 3·2·5)", "원칙 한 줄이 들어가요."),
  basic("medical-opinion", "의료자문 요구, 거부할 수 있나", "원칙 한 줄이 들어가요."),
];

function kase(
  slug: string,
  title: string,
  amount_range: Case["amount_range"],
): Case {
  return {
    id: slug,
    slug,
    title,
    situation_md: "[상황 — admin에서 채워주세요. 병원명·날짜·금액은 범위로만.]",
    process_md: "[처리 과정 — admin에서 채워주세요.]",
    result_md: "[결과 — admin에서 채워주세요.]",
    lesson_md: "[배운 것 — admin에서 채워주세요.]",
    amount_range,
    guide_id: null,
    is_public: true,
    created_at: TODAY,
  };
}

export const SEED_CASES: Case[] = [
  kase("manual-therapy-half", "도수치료 청구 절반만 나온 사례", "50~100만원"),
  kase("nondisclosure-rejected", "고지 누락으로 거절된 사례 — 이의신청 과정", "100만원 이상"),
  kase("shop-customer-injury", "가게 손님 부상 배상 사례 — 처리 순서", "100만원 이상"),
  kase("renewal-surge-kept", "갱신 보험료 급등 사례 — 전환 안 하고 유지한 이유", null),
  kase("late-inpatient-success", "3년 지난 입원 청구 성공 사례", "50~100만원"),
];

// /qna 미리보기용 (실제로는 admin에서 답변 공개 시 생성)
export const SEED_QNA: QnaItem[] = [];
