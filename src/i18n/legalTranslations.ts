import type { SupportedLanguage } from './translations';

export interface LegalArticle {
  title: string;
  body: string;
}

export interface LegalTranslation {
  modalTitle: string;
  headerButton: string;
  tabTerms: string;
  tabPrivacy: string;
  tabGuide: string;
  disclaimerBadge: string;
  disclaimerTitle: string;
  disclaimerText: string;
  disclaimerNotice: string;
  termsTitle: string;
  termsSubtitle: string;
  termsArticles: LegalArticle[];
  privacyTitle: string;
  privacySubtitle: string;
  privacyArticles: LegalArticle[];
  guideTitle: string;
  guideSubtitle: string;
  guideArticles: LegalArticle[];
  closeBtn: string;
  officialSiteNote: string;
}

export const LEGAL_TRANSLATIONS: Record<Exclude<SupportedLanguage, 'auto'>, LegalTranslation> = {
  "ko": {
    "modalTitle": "이용약관 · 가이드 · 개인정보처리방침",
    "headerButton": "약관 및 가이드",
    "tabTerms": "서비스 이용약관 & 면책조항",
    "tabPrivacy": "개인정보처리방침",
    "tabGuide": "스튜디오 이용 가이드",
    "disclaimerBadge": "중요 법적 고지 (LEGAL DISCLAIMER)",
    "disclaimerTitle": "저작권 및 법적 면책 조항 (Disclaimer)",
    "disclaimerText": "사용 허용과 제3자 플랫폼의 자동 판정은 별개입니다. 잘못된 등록이나 자동 매칭으로 클레임이 발생할 수 있으며, 플랫폼 수익 창출이나 클레임 부재를 보증하지 않습니다. 외부에서 추가한 음원·샘플은 해당 권리자의 이용조건도 확인해 주세요.",
    "disclaimerNotice": "자세한 조건: /license/ · 문의: lbhl7585@naver.com",
    "termsTitle": "JYE SOUNDS 서비스 이용약관",
    "termsSubtitle": "8-BIT SFX LAB 서비스 이용에 대한 기본 조건 및 법적 권리 의무 사항입니다.",
    "termsArticles": [
      {
        "title": "서비스",
        "body": "회원가입 없이 라이브러리를 탐색하거나 BGM·SFX 도구를 이용할 수 있습니다. 오디오 재생과 제작 기능에는 JavaScript와 지원되는 브라우저가 필요합니다."
      },
      {
        "title": "음원 이용",
        "body": "라이브러리 및 제작 도구 오디오의 허용 범위는 음원 이용조건 페이지에서 확인해 주세요. 외부에 추가한 자료의 권리는 이용자가 확인해야 합니다."
      },
      {
        "title": "정상적인 이용",
        "body": "서비스를 공격하거나 과도한 요청으로 방해하지 마세요. 다른 이용자에게 허위 권리 주장을 하거나 타인의 개인정보를 문의 양식에 불필요하게 포함하지 마세요."
      },
      {
        "title": "이용상 한계",
        "body": "브라우저, 기기와 외부 플랫폼에 따라 재생·다운로드·수익 창출 결과가 달라질 수 있습니다. 기능 변경이나 장애가 있을 수 있으며, 중요한 설정과 오디오 파일은 별도로 보관해 주세요. 이 안내는 관련 법률에 따른 이용자의 권리를 배제하지 않습니다."
      },
      {
        "title": "문의",
        "body": "기능 오류, 이용조건 또는 권리 확인 문의: lbhl7585@naver.com. 이름과 주소가 정확한 음원 및 재현 절차를 알려 주시면 확인에 도움이 됩니다."
      }
    ],
    "privacyTitle": "개인정보처리방침 (Privacy Policy)",
    "privacySubtitle": "JYE SOUNDS 라이브러리와 BGM·SFX 제작 도구의 정보 처리 안내입니다.",
    "privacyArticles": [
      {
        "title": "오디오와 브라우저 저장",
        "body": "BGM 및 SFX 합성·WAV 내보내기는 브라우저에서 처리합니다. 언어 선택, 즐겨찾기 및 BGM 사용자 프리셋은 기기의 로컬 저장소에 저장될 수 있습니다. 브라우저의 사이트 데이터 삭제 기능으로 지울 수 있습니다. SFX 보관함은 현재 열린 세션에서만 유지됩니다."
      },
      {
        "title": "사이트 접속 및 외부 서비스",
        "body": "페이지와 음원 전달을 위해 Cloudflare를 사용하고, 일부 페이지는 Google Fonts를 요청합니다. 이러한 요청에는 IP 주소와 브라우저 정보 등이 포함될 수 있습니다. 호스팅의 보안·접속 로그 및 활성화된 분석 기능은 관련 제공자의 정책에 따라 처리될 수 있습니다. 회원가입이 없다는 사실이 모든 접속 정보가 전송되지 않는다는 뜻은 아닙니다."
      },
      {
        "title": "Google 광고",
        "body": "메인 라이브러리에는 Google AdSense 코드가 포함되어 있습니다. Google과 광고 파트너는 광고 제공·측정 및 부정 트래픽 방지를 위해 쿠키, 웹 비콘, IP 주소 또는 기타 식별자를 사용할 수 있습니다. 맞춤 광고는 방문 기록과 해당 지역의 동의 요건에 따라 제공될 수 있습니다. Google 광고 설정과 브라우저 설정에서 관련 선택을 관리할 수 있습니다."
      },
      {
        "title": "문의 이메일",
        "body": "이메일 문의를 보내면 작성한 이름, 회신 주소, 내용 및 첨부 자료가 이메일 서비스로 전송됩니다. 문의와 권리 확인에 필요한 내용만 보내 주세요. 문의 처리 및 자료 삭제 요청은 lbhl7585@naver.com으로 연락해 주세요."
      },
      {
        "title": "관련 안내",
        "body": "Google의 파트너 사이트 데이터 사용 안내: https://policies.google.com/technologies/partner-sites · 광고 설정: https://adssettings.google.com · Cloudflare 개인정보 안내: https://www.cloudflare.com/privacypolicy/"
      }
    ],
    "guideTitle": "8-BIT SFX LAB 마스터 가이드",
    "guideSubtitle": "클릭 몇 번으로 나만의 아케이드 레트로 사운드를 제작하는 방법입니다.",
    "guideArticles": [
      {
        "title": "효과음 선택",
        "body": "효과음을 원래 프로젝트의 대사·음악과 함께 들어 보고 장면에 맞는 길이와 질감인지 확인하세요. 단독 미리듣기 볼륨이 실제 프로젝트의 적절한 음량을 뜻하지는 않습니다."
      },
      {
        "title": "자르기와 페이드",
        "body": "편집 도구에서 필요 없는 앞뒤 구간을 자르고 짧은 페이드를 적용하면 경계의 클릭을 줄이는 데 도움이 됩니다. 원본은 따로 보관하고 편집 사본을 사용하세요."
      },
      {
        "title": "음량과 피크",
        "body": "대사가 묻히지 않도록 효과음 볼륨을 먼저 낮춘 뒤 천천히 올리세요. 순간 피크와 전체 음량은 다른 값입니다. 최종 파일을 헤드폰과 스피커에서 확인하고 프로젝트 전체의 클리핑을 점검하세요."
      },
      {
        "title": "SFX 제작",
        "body": "프리셋 선택 → 피치·엔벨로프 조절 → 재생 확인 → WAV 다운로드 순서로 작업하세요. 고음질 옵션은 44.1kHz·16-bit, 레트로 옵션은 22.05kHz·8-bit입니다. 변형한 소리는 리셋으로 원본 프리셋으로 돌아갈 수 있습니다."
      },
      {
        "title": "BGM 제작",
        "body": "트랙을 고르고 템포, 음높이, EQ와 환경음을 조절하세요. 녹음 버튼을 누른 뒤 정지·저장 버튼으로 WAV 저장을 요청합니다. 한 번의 녹음은 최대 2분이며, 필요한 구간만 녹음하면 메모리 사용을 줄일 수 있습니다."
      },
      {
        "title": "프로젝트와 라이선스",
        "body": "Unity 등 프로젝트 설정에 맞게 mono/stereo와 샘플레이트를 확인하세요. 사이트의 이용허락이 플랫폼 자동 판정을 보증하지는 않습니다. 라이선스 페이지 주소와 사용한 파일 이름을 작업 기록에 함께 남겨 두세요."
      }
    ],
    "closeBtn": "확인 및 닫기",
    "officialSiteNote": "공식 웹사이트: jyesounds.com · JYE SOUNDS LABS"
  },
  "en": {
    "modalTitle": "Terms of Service · User Guide · Privacy Policy",
    "headerButton": "Terms & Guide",
    "tabTerms": "Terms of Service & Disclaimer",
    "tabPrivacy": "Privacy Policy",
    "tabGuide": "Studio User Guide",
    "disclaimerBadge": "CRITICAL LEGAL NOTICE",
    "disclaimerTitle": "Copyright & Legal Disclaimer",
    "disclaimerText": "Permission to use audio is separate from a platform’s automated decisions. Incorrect registrations or automated matches can still produce claims. Claim-free use and platform monetization are not guaranteed. Check separate permissions for any outside samples or music that you add.",
    "disclaimerNotice": "Full conditions: /license/ · Contact: lbhl7585@naver.com",
    "termsTitle": "JYE SOUNDS Terms of Service",
    "termsSubtitle": "Basic terms, conditions, and legal parameters governing the use of 8-BIT SFX LAB.",
    "termsArticles": [
      {
        "title": "Service",
        "body": "Browse the library and use the BGM and SFX tools without registering an account. Playback and synthesis require JavaScript and a compatible browser."
      },
      {
        "title": "Audio permissions",
        "body": "The audio use conditions page describes permission for library and generated audio. Check the rights to any outside materials you add."
      },
      {
        "title": "Responsible use",
        "body": "Do not attack the service or disrupt it with excessive requests. Do not make false rights claims against other users or include unnecessary personal information about others in inquiries."
      },
      {
        "title": "Practical limitations",
        "body": "Playback, downloads and monetization decisions can vary by browser, device and external platform. Features may change or become unavailable. Keep your important settings and exported audio separately. This notice does not exclude rights provided by applicable law."
      },
      {
        "title": "Contact",
        "body": "Report errors, ask about permissions or submit rights inquiries to lbhl7585@naver.com. Include the exact sound and URL and steps to reproduce a problem."
      }
    ],
    "privacyTitle": "Privacy Policy",
    "privacySubtitle": "Information handling for the JYE SOUNDS library and the BGM and SFX tools.",
    "privacyArticles": [
      {
        "title": "Audio and browser storage",
        "body": "The BGM and SFX tools synthesize audio and export WAV files in your browser. Language, library favorites and saved BGM presets may use local browser storage. Clear the site data in your browser to remove it. The SFX history currently lasts only for the open session."
      },
      {
        "title": "Hosting and external services",
        "body": "Pages and library audio are delivered through Cloudflare. Some pages request Google Fonts. These requests can include IP addresses and browser information. Hosting security logs and enabled analytics may be processed under the providers’ policies. Having no account registration does not mean that no connection information is transmitted."
      },
      {
        "title": "Google advertising",
        "body": "The main library includes Google AdSense code. Google and advertising partners may use cookies, web beacons, IP addresses or other identifiers to serve and measure ads and prevent invalid traffic. Personalized advertising depends on visit history and applicable consent requirements. Manage your choices in Google Ads Settings and your browser settings."
      },
      {
        "title": "Email inquiries",
        "body": "When you send an inquiry, your name, reply address, message and attachments are sent through your email service. Send only what is necessary to answer the inquiry or verify rights. Contact lbhl7585@naver.com for inquiry handling or a request to delete submitted materials."
      },
      {
        "title": "Provider information",
        "body": "Google partner-site data information: https://policies.google.com/technologies/partner-sites · Ads settings: https://adssettings.google.com · Cloudflare privacy policy: https://www.cloudflare.com/privacypolicy/"
      }
    ],
    "guideTitle": "8-BIT SFX LAB User Guide",
    "guideSubtitle": "Craft authentic retro chiptune sound effects in just a few clicks.",
    "guideArticles": [
      {
        "title": "Choose in context",
        "body": "Listen with the dialogue and music of the intended scene. A comfortable preview volume is not necessarily the correct level in your mix."
      },
      {
        "title": "Trim and fade",
        "body": "Trim unwanted leading or trailing audio and use short fades to reduce boundary clicks. Keep the original and edit a copy."
      },
      {
        "title": "Set levels",
        "body": "Start quietly and raise effects until they support the scene without masking dialogue. Peak level and overall loudness are different. Check the final mix on headphones and speakers and inspect it for clipping."
      },
      {
        "title": "Make SFX",
        "body": "Choose a preset, edit pitch and envelope, audition it and export WAV. The high-quality option uses 44.1kHz/16-bit and the retro option uses 22.05kHz/8-bit. Reset returns a variation to its source preset."
      },
      {
        "title": "Make BGM",
        "body": "Choose a track, set tempo, pitch, EQ and ambience, then record. Stop and save requests a WAV download. A recording is limited to 2 minutes. Recording only the section you need reduces memory use."
      },
      {
        "title": "Project settings and permissions",
        "body": "Check mono/stereo and sample rate against your project settings. Site permission does not guarantee a platform’s automated decisions. Keep the license URL and sound filename in your project notes."
      }
    ],
    "closeBtn": "Understood & Close",
    "officialSiteNote": "Official Website: jyesounds.com · JYE SOUNDS LABS"
  },
  "en-GB": {
    "modalTitle": "Terms of Service · User Guide · Privacy Policy",
    "headerButton": "Terms & Guide",
    "tabTerms": "Terms of Service & Disclaimer",
    "tabPrivacy": "Privacy Policy",
    "tabGuide": "Studio User Guide",
    "disclaimerBadge": "CRITICAL LEGAL NOTICE",
    "disclaimerTitle": "Copyright & Legal Disclaimer",
    "disclaimerText": "Permission to use audio is separate from a platform’s automated decisions. Incorrect registrations or automated matches can still produce claims. Claim-free use and platform monetization are not guaranteed. Check separate permissions for any outside samples or music that you add.",
    "disclaimerNotice": "Full conditions: /license/ · Contact: lbhl7585@naver.com",
    "termsTitle": "JYE SOUNDS Terms of Service",
    "termsSubtitle": "Standard terms and conditions governing the 8-BIT SFX LAB workstation.",
    "termsArticles": [
      {
        "title": "Service",
        "body": "Browse the library and use the BGM and SFX tools without registering an account. Playback and synthesis require JavaScript and a compatible browser."
      },
      {
        "title": "Audio permissions",
        "body": "The audio use conditions page describes permission for library and generated audio. Check the rights to any outside materials you add."
      },
      {
        "title": "Responsible use",
        "body": "Do not attack the service or disrupt it with excessive requests. Do not make false rights claims against other users or include unnecessary personal information about others in inquiries."
      },
      {
        "title": "Practical limitations",
        "body": "Playback, downloads and monetization decisions can vary by browser, device and external platform. Features may change or become unavailable. Keep your important settings and exported audio separately. This notice does not exclude rights provided by applicable law."
      },
      {
        "title": "Contact",
        "body": "Report errors, ask about permissions or submit rights inquiries to lbhl7585@naver.com. Include the exact sound and URL and steps to reproduce a problem."
      }
    ],
    "privacyTitle": "Privacy Policy",
    "privacySubtitle": "Information handling for the JYE SOUNDS library and the BGM and SFX tools.",
    "privacyArticles": [
      {
        "title": "Audio and browser storage",
        "body": "The BGM and SFX tools synthesize audio and export WAV files in your browser. Language, library favorites and saved BGM presets may use local browser storage. Clear the site data in your browser to remove it. The SFX history currently lasts only for the open session."
      },
      {
        "title": "Hosting and external services",
        "body": "Pages and library audio are delivered through Cloudflare. Some pages request Google Fonts. These requests can include IP addresses and browser information. Hosting security logs and enabled analytics may be processed under the providers’ policies. Having no account registration does not mean that no connection information is transmitted."
      },
      {
        "title": "Google advertising",
        "body": "The main library includes Google AdSense code. Google and advertising partners may use cookies, web beacons, IP addresses or other identifiers to serve and measure ads and prevent invalid traffic. Personalized advertising depends on visit history and applicable consent requirements. Manage your choices in Google Ads Settings and your browser settings."
      },
      {
        "title": "Email inquiries",
        "body": "When you send an inquiry, your name, reply address, message and attachments are sent through your email service. Send only what is necessary to answer the inquiry or verify rights. Contact lbhl7585@naver.com for inquiry handling or a request to delete submitted materials."
      },
      {
        "title": "Provider information",
        "body": "Google partner-site data information: https://policies.google.com/technologies/partner-sites · Ads settings: https://adssettings.google.com · Cloudflare privacy policy: https://www.cloudflare.com/privacypolicy/"
      }
    ],
    "guideTitle": "8-BIT SFX LAB Guide",
    "guideSubtitle": "Create authentic retro arcade sound effects in moments.",
    "guideArticles": [
      {
        "title": "Choose in context",
        "body": "Listen with the dialogue and music of the intended scene. A comfortable preview volume is not necessarily the correct level in your mix."
      },
      {
        "title": "Trim and fade",
        "body": "Trim unwanted leading or trailing audio and use short fades to reduce boundary clicks. Keep the original and edit a copy."
      },
      {
        "title": "Set levels",
        "body": "Start quietly and raise effects until they support the scene without masking dialogue. Peak level and overall loudness are different. Check the final mix on headphones and speakers and inspect it for clipping."
      },
      {
        "title": "Make SFX",
        "body": "Choose a preset, edit pitch and envelope, audition it and export WAV. The high-quality option uses 44.1kHz/16-bit and the retro option uses 22.05kHz/8-bit. Reset returns a variation to its source preset."
      },
      {
        "title": "Make BGM",
        "body": "Choose a track, set tempo, pitch, EQ and ambience, then record. Stop and save requests a WAV download. A recording is limited to 2 minutes. Recording only the section you need reduces memory use."
      },
      {
        "title": "Project settings and permissions",
        "body": "Check mono/stereo and sample rate against your project settings. Site permission does not guarantee a platform’s automated decisions. Keep the license URL and sound filename in your project notes."
      }
    ],
    "closeBtn": "Understood & Close",
    "officialSiteNote": "Official Website: jyesounds.com · JYE SOUNDS LABS"
  },
  "ja": {
    "modalTitle": "利用規約 · ガイド · プライバシーポリシー",
    "headerButton": "規約＆ガイド",
    "tabTerms": "利用規約＆免責事項",
    "tabPrivacy": "プライバシーポリシー",
    "tabGuide": "スタジオ利用ガイド",
    "disclaimerBadge": "重要法的告知 (LEGAL DISCLAIMER)",
    "disclaimerTitle": "著作権および法的免責事項 (Disclaimer)",
    "disclaimerText": "Permission to use audio is separate from a platform’s automated decisions. Incorrect registrations or automated matches can still produce claims. Claim-free use and platform monetization are not guaranteed. Check separate permissions for any outside samples or music that you add.",
    "disclaimerNotice": "Full conditions: /license/ · Contact: lbhl7585@naver.com",
    "termsTitle": "JYE SOUNDS サービス利用規約",
    "termsSubtitle": "8-BIT SFX LABの利用条件および権利義務に関する基本事項です。",
    "termsArticles": [
      {
        "title": "Service",
        "body": "Browse the library and use the BGM and SFX tools without registering an account. Playback and synthesis require JavaScript and a compatible browser."
      },
      {
        "title": "Audio permissions",
        "body": "The audio use conditions page describes permission for library and generated audio. Check the rights to any outside materials you add."
      },
      {
        "title": "Responsible use",
        "body": "Do not attack the service or disrupt it with excessive requests. Do not make false rights claims against other users or include unnecessary personal information about others in inquiries."
      },
      {
        "title": "Practical limitations",
        "body": "Playback, downloads and monetization decisions can vary by browser, device and external platform. Features may change or become unavailable. Keep your important settings and exported audio separately. This notice does not exclude rights provided by applicable law."
      },
      {
        "title": "Contact",
        "body": "Report errors, ask about permissions or submit rights inquiries to lbhl7585@naver.com. Include the exact sound and URL and steps to reproduce a problem."
      }
    ],
    "privacyTitle": "プライバシーポリシー",
    "privacySubtitle": "Information handling for the JYE SOUNDS library and the BGM and SFX tools.",
    "privacyArticles": [
      {
        "title": "Audio and browser storage",
        "body": "The BGM and SFX tools synthesize audio and export WAV files in your browser. Language, library favorites and saved BGM presets may use local browser storage. Clear the site data in your browser to remove it. The SFX history currently lasts only for the open session."
      },
      {
        "title": "Hosting and external services",
        "body": "Pages and library audio are delivered through Cloudflare. Some pages request Google Fonts. These requests can include IP addresses and browser information. Hosting security logs and enabled analytics may be processed under the providers’ policies. Having no account registration does not mean that no connection information is transmitted."
      },
      {
        "title": "Google advertising",
        "body": "The main library includes Google AdSense code. Google and advertising partners may use cookies, web beacons, IP addresses or other identifiers to serve and measure ads and prevent invalid traffic. Personalized advertising depends on visit history and applicable consent requirements. Manage your choices in Google Ads Settings and your browser settings."
      },
      {
        "title": "Email inquiries",
        "body": "When you send an inquiry, your name, reply address, message and attachments are sent through your email service. Send only what is necessary to answer the inquiry or verify rights. Contact lbhl7585@naver.com for inquiry handling or a request to delete submitted materials."
      },
      {
        "title": "Provider information",
        "body": "Google partner-site data information: https://policies.google.com/technologies/partner-sites · Ads settings: https://adssettings.google.com · Cloudflare privacy policy: https://www.cloudflare.com/privacypolicy/"
      }
    ],
    "guideTitle": "8-BIT SFX LAB 利用ガイド",
    "guideSubtitle": "直感的な操作で本格的なレトロゲームサウンドを作成できます。",
    "guideArticles": [
      {
        "title": "Choose in context",
        "body": "Listen with the dialogue and music of the intended scene. A comfortable preview volume is not necessarily the correct level in your mix."
      },
      {
        "title": "Trim and fade",
        "body": "Trim unwanted leading or trailing audio and use short fades to reduce boundary clicks. Keep the original and edit a copy."
      },
      {
        "title": "Set levels",
        "body": "Start quietly and raise effects until they support the scene without masking dialogue. Peak level and overall loudness are different. Check the final mix on headphones and speakers and inspect it for clipping."
      },
      {
        "title": "Make SFX",
        "body": "Choose a preset, edit pitch and envelope, audition it and export WAV. The high-quality option uses 44.1kHz/16-bit and the retro option uses 22.05kHz/8-bit. Reset returns a variation to its source preset."
      },
      {
        "title": "Make BGM",
        "body": "Choose a track, set tempo, pitch, EQ and ambience, then record. Stop and save requests a WAV download. A recording is limited to 2 minutes. Recording only the section you need reduces memory use."
      },
      {
        "title": "Project settings and permissions",
        "body": "Check mono/stereo and sample rate against your project settings. Site permission does not guarantee a platform’s automated decisions. Keep the license URL and sound filename in your project notes."
      }
    ],
    "closeBtn": "確認して閉じる",
    "officialSiteNote": "公式ウェブサイト: jyesounds.com · JYE SOUNDS LABS"
  },
  "zh-TW": {
    "modalTitle": "服務條款 · 使用指南 · 隱私權政策",
    "headerButton": "條款與指南",
    "tabTerms": "服務條款與免責聲明",
    "tabPrivacy": "隱私權政策",
    "tabGuide": "工作室使用指南",
    "disclaimerBadge": "重要法律告知 (LEGAL DISCLAIMER)",
    "disclaimerTitle": "版權與法律免責聲明 (Disclaimer)",
    "disclaimerText": "Permission to use audio is separate from a platform’s automated decisions. Incorrect registrations or automated matches can still produce claims. Claim-free use and platform monetization are not guaranteed. Check separate permissions for any outside samples or music that you add.",
    "disclaimerNotice": "Full conditions: /license/ · Contact: lbhl7585@naver.com",
    "termsTitle": "JYE SOUNDS 服務條款",
    "termsSubtitle": "8-BIT SFX LAB 服務之基本使用規範與法律權益說明。",
    "termsArticles": [
      {
        "title": "Service",
        "body": "Browse the library and use the BGM and SFX tools without registering an account. Playback and synthesis require JavaScript and a compatible browser."
      },
      {
        "title": "Audio permissions",
        "body": "The audio use conditions page describes permission for library and generated audio. Check the rights to any outside materials you add."
      },
      {
        "title": "Responsible use",
        "body": "Do not attack the service or disrupt it with excessive requests. Do not make false rights claims against other users or include unnecessary personal information about others in inquiries."
      },
      {
        "title": "Practical limitations",
        "body": "Playback, downloads and monetization decisions can vary by browser, device and external platform. Features may change or become unavailable. Keep your important settings and exported audio separately. This notice does not exclude rights provided by applicable law."
      },
      {
        "title": "Contact",
        "body": "Report errors, ask about permissions or submit rights inquiries to lbhl7585@naver.com. Include the exact sound and URL and steps to reproduce a problem."
      }
    ],
    "privacyTitle": "隱私權政策 (Privacy Policy)",
    "privacySubtitle": "Information handling for the JYE SOUNDS library and the BGM and SFX tools.",
    "privacyArticles": [
      {
        "title": "Audio and browser storage",
        "body": "The BGM and SFX tools synthesize audio and export WAV files in your browser. Language, library favorites and saved BGM presets may use local browser storage. Clear the site data in your browser to remove it. The SFX history currently lasts only for the open session."
      },
      {
        "title": "Hosting and external services",
        "body": "Pages and library audio are delivered through Cloudflare. Some pages request Google Fonts. These requests can include IP addresses and browser information. Hosting security logs and enabled analytics may be processed under the providers’ policies. Having no account registration does not mean that no connection information is transmitted."
      },
      {
        "title": "Google advertising",
        "body": "The main library includes Google AdSense code. Google and advertising partners may use cookies, web beacons, IP addresses or other identifiers to serve and measure ads and prevent invalid traffic. Personalized advertising depends on visit history and applicable consent requirements. Manage your choices in Google Ads Settings and your browser settings."
      },
      {
        "title": "Email inquiries",
        "body": "When you send an inquiry, your name, reply address, message and attachments are sent through your email service. Send only what is necessary to answer the inquiry or verify rights. Contact lbhl7585@naver.com for inquiry handling or a request to delete submitted materials."
      },
      {
        "title": "Provider information",
        "body": "Google partner-site data information: https://policies.google.com/technologies/partner-sites · Ads settings: https://adssettings.google.com · Cloudflare privacy policy: https://www.cloudflare.com/privacypolicy/"
      }
    ],
    "guideTitle": "8-BIT SFX LAB 快速指南",
    "guideSubtitle": "輕鬆幾步即可製作正統 8-Bit 像素懷舊遊戲音效。",
    "guideArticles": [
      {
        "title": "Choose in context",
        "body": "Listen with the dialogue and music of the intended scene. A comfortable preview volume is not necessarily the correct level in your mix."
      },
      {
        "title": "Trim and fade",
        "body": "Trim unwanted leading or trailing audio and use short fades to reduce boundary clicks. Keep the original and edit a copy."
      },
      {
        "title": "Set levels",
        "body": "Start quietly and raise effects until they support the scene without masking dialogue. Peak level and overall loudness are different. Check the final mix on headphones and speakers and inspect it for clipping."
      },
      {
        "title": "Make SFX",
        "body": "Choose a preset, edit pitch and envelope, audition it and export WAV. The high-quality option uses 44.1kHz/16-bit and the retro option uses 22.05kHz/8-bit. Reset returns a variation to its source preset."
      },
      {
        "title": "Make BGM",
        "body": "Choose a track, set tempo, pitch, EQ and ambience, then record. Stop and save requests a WAV download. A recording is limited to 2 minutes. Recording only the section you need reduces memory use."
      },
      {
        "title": "Project settings and permissions",
        "body": "Check mono/stereo and sample rate against your project settings. Site permission does not guarantee a platform’s automated decisions. Keep the license URL and sound filename in your project notes."
      }
    ],
    "closeBtn": "確認並關閉",
    "officialSiteNote": "官方網站: jyesounds.com · JYE SOUNDS LABS"
  },
  "en-SG": {
    "modalTitle": "Terms of Service · User Guide · Privacy Policy",
    "headerButton": "Terms & Guide",
    "tabTerms": "Terms of Service & Disclaimer",
    "tabPrivacy": "Privacy Policy",
    "tabGuide": "Studio User Guide",
    "disclaimerBadge": "CRITICAL LEGAL NOTICE",
    "disclaimerTitle": "Copyright & Legal Disclaimer",
    "disclaimerText": "Permission to use audio is separate from a platform’s automated decisions. Incorrect registrations or automated matches can still produce claims. Claim-free use and platform monetization are not guaranteed. Check separate permissions for any outside samples or music that you add.",
    "disclaimerNotice": "Full conditions: /license/ · Contact: lbhl7585@naver.com",
    "termsTitle": "JYE SOUNDS Terms of Service",
    "termsSubtitle": "Operating terms and legal conditions for 8-BIT SFX LAB.",
    "termsArticles": [
      {
        "title": "Service",
        "body": "Browse the library and use the BGM and SFX tools without registering an account. Playback and synthesis require JavaScript and a compatible browser."
      },
      {
        "title": "Audio permissions",
        "body": "The audio use conditions page describes permission for library and generated audio. Check the rights to any outside materials you add."
      },
      {
        "title": "Responsible use",
        "body": "Do not attack the service or disrupt it with excessive requests. Do not make false rights claims against other users or include unnecessary personal information about others in inquiries."
      },
      {
        "title": "Practical limitations",
        "body": "Playback, downloads and monetization decisions can vary by browser, device and external platform. Features may change or become unavailable. Keep your important settings and exported audio separately. This notice does not exclude rights provided by applicable law."
      },
      {
        "title": "Contact",
        "body": "Report errors, ask about permissions or submit rights inquiries to lbhl7585@naver.com. Include the exact sound and URL and steps to reproduce a problem."
      }
    ],
    "privacyTitle": "Privacy Policy",
    "privacySubtitle": "Information handling for the JYE SOUNDS library and the BGM and SFX tools.",
    "privacyArticles": [
      {
        "title": "Audio and browser storage",
        "body": "The BGM and SFX tools synthesize audio and export WAV files in your browser. Language, library favorites and saved BGM presets may use local browser storage. Clear the site data in your browser to remove it. The SFX history currently lasts only for the open session."
      },
      {
        "title": "Hosting and external services",
        "body": "Pages and library audio are delivered through Cloudflare. Some pages request Google Fonts. These requests can include IP addresses and browser information. Hosting security logs and enabled analytics may be processed under the providers’ policies. Having no account registration does not mean that no connection information is transmitted."
      },
      {
        "title": "Google advertising",
        "body": "The main library includes Google AdSense code. Google and advertising partners may use cookies, web beacons, IP addresses or other identifiers to serve and measure ads and prevent invalid traffic. Personalized advertising depends on visit history and applicable consent requirements. Manage your choices in Google Ads Settings and your browser settings."
      },
      {
        "title": "Email inquiries",
        "body": "When you send an inquiry, your name, reply address, message and attachments are sent through your email service. Send only what is necessary to answer the inquiry or verify rights. Contact lbhl7585@naver.com for inquiry handling or a request to delete submitted materials."
      },
      {
        "title": "Provider information",
        "body": "Google partner-site data information: https://policies.google.com/technologies/partner-sites · Ads settings: https://adssettings.google.com · Cloudflare privacy policy: https://www.cloudflare.com/privacypolicy/"
      }
    ],
    "guideTitle": "8-BIT SFX LAB Guide",
    "guideSubtitle": "Fast guide to creating 8-bit retro audio.",
    "guideArticles": [
      {
        "title": "Choose in context",
        "body": "Listen with the dialogue and music of the intended scene. A comfortable preview volume is not necessarily the correct level in your mix."
      },
      {
        "title": "Trim and fade",
        "body": "Trim unwanted leading or trailing audio and use short fades to reduce boundary clicks. Keep the original and edit a copy."
      },
      {
        "title": "Set levels",
        "body": "Start quietly and raise effects until they support the scene without masking dialogue. Peak level and overall loudness are different. Check the final mix on headphones and speakers and inspect it for clipping."
      },
      {
        "title": "Make SFX",
        "body": "Choose a preset, edit pitch and envelope, audition it and export WAV. The high-quality option uses 44.1kHz/16-bit and the retro option uses 22.05kHz/8-bit. Reset returns a variation to its source preset."
      },
      {
        "title": "Make BGM",
        "body": "Choose a track, set tempo, pitch, EQ and ambience, then record. Stop and save requests a WAV download. A recording is limited to 2 minutes. Recording only the section you need reduces memory use."
      },
      {
        "title": "Project settings and permissions",
        "body": "Check mono/stereo and sample rate against your project settings. Site permission does not guarantee a platform’s automated decisions. Keep the license URL and sound filename in your project notes."
      }
    ],
    "closeBtn": "Understood & Close",
    "officialSiteNote": "Official Website: jyesounds.com · JYE SOUNDS LABS"
  },
  "pt": {
    "modalTitle": "Termos de Serviço · Guia do Usuário · Política de Privacidade",
    "headerButton": "Termos e Guia",
    "tabTerms": "Termos de Serviço e Isenção Legal",
    "tabPrivacy": "Política de Privacidade",
    "tabGuide": "Guia do Estúdio",
    "disclaimerBadge": "AVISO LEGAL IMPORTANTE",
    "disclaimerTitle": "Aviso de Direitos Autorais e Isenção Legal (Disclaimer)",
    "disclaimerText": "Permission to use audio is separate from a platform’s automated decisions. Incorrect registrations or automated matches can still produce claims. Claim-free use and platform monetization are not guaranteed. Check separate permissions for any outside samples or music that you add.",
    "disclaimerNotice": "Full conditions: /license/ · Contact: lbhl7585@naver.com",
    "termsTitle": "Termos de Serviço JYE SOUNDS",
    "termsSubtitle": "Condições gerais de uso e diretrizes legais do 8-BIT SFX LAB.",
    "termsArticles": [
      {
        "title": "Service",
        "body": "Browse the library and use the BGM and SFX tools without registering an account. Playback and synthesis require JavaScript and a compatible browser."
      },
      {
        "title": "Audio permissions",
        "body": "The audio use conditions page describes permission for library and generated audio. Check the rights to any outside materials you add."
      },
      {
        "title": "Responsible use",
        "body": "Do not attack the service or disrupt it with excessive requests. Do not make false rights claims against other users or include unnecessary personal information about others in inquiries."
      },
      {
        "title": "Practical limitations",
        "body": "Playback, downloads and monetization decisions can vary by browser, device and external platform. Features may change or become unavailable. Keep your important settings and exported audio separately. This notice does not exclude rights provided by applicable law."
      },
      {
        "title": "Contact",
        "body": "Report errors, ask about permissions or submit rights inquiries to lbhl7585@naver.com. Include the exact sound and URL and steps to reproduce a problem."
      }
    ],
    "privacyTitle": "Política de Privacidade",
    "privacySubtitle": "Information handling for the JYE SOUNDS library and the BGM and SFX tools.",
    "privacyArticles": [
      {
        "title": "Audio and browser storage",
        "body": "The BGM and SFX tools synthesize audio and export WAV files in your browser. Language, library favorites and saved BGM presets may use local browser storage. Clear the site data in your browser to remove it. The SFX history currently lasts only for the open session."
      },
      {
        "title": "Hosting and external services",
        "body": "Pages and library audio are delivered through Cloudflare. Some pages request Google Fonts. These requests can include IP addresses and browser information. Hosting security logs and enabled analytics may be processed under the providers’ policies. Having no account registration does not mean that no connection information is transmitted."
      },
      {
        "title": "Google advertising",
        "body": "The main library includes Google AdSense code. Google and advertising partners may use cookies, web beacons, IP addresses or other identifiers to serve and measure ads and prevent invalid traffic. Personalized advertising depends on visit history and applicable consent requirements. Manage your choices in Google Ads Settings and your browser settings."
      },
      {
        "title": "Email inquiries",
        "body": "When you send an inquiry, your name, reply address, message and attachments are sent through your email service. Send only what is necessary to answer the inquiry or verify rights. Contact lbhl7585@naver.com for inquiry handling or a request to delete submitted materials."
      },
      {
        "title": "Provider information",
        "body": "Google partner-site data information: https://policies.google.com/technologies/partner-sites · Ads settings: https://adssettings.google.com · Cloudflare privacy policy: https://www.cloudflare.com/privacypolicy/"
      }
    ],
    "guideTitle": "Guia do 8-BIT SFX LAB",
    "guideSubtitle": "Crie efeitos sonoros retrô autênticos com facilidade.",
    "guideArticles": [
      {
        "title": "Choose in context",
        "body": "Listen with the dialogue and music of the intended scene. A comfortable preview volume is not necessarily the correct level in your mix."
      },
      {
        "title": "Trim and fade",
        "body": "Trim unwanted leading or trailing audio and use short fades to reduce boundary clicks. Keep the original and edit a copy."
      },
      {
        "title": "Set levels",
        "body": "Start quietly and raise effects until they support the scene without masking dialogue. Peak level and overall loudness are different. Check the final mix on headphones and speakers and inspect it for clipping."
      },
      {
        "title": "Make SFX",
        "body": "Choose a preset, edit pitch and envelope, audition it and export WAV. The high-quality option uses 44.1kHz/16-bit and the retro option uses 22.05kHz/8-bit. Reset returns a variation to its source preset."
      },
      {
        "title": "Make BGM",
        "body": "Choose a track, set tempo, pitch, EQ and ambience, then record. Stop and save requests a WAV download. A recording is limited to 2 minutes. Recording only the section you need reduces memory use."
      },
      {
        "title": "Project settings and permissions",
        "body": "Check mono/stereo and sample rate against your project settings. Site permission does not guarantee a platform’s automated decisions. Keep the license URL and sound filename in your project notes."
      }
    ],
    "closeBtn": "Entendido e Fechar",
    "officialSiteNote": "Site oficial: jyesounds.com · JYE SOUNDS LABS"
  },
  "de": {
    "modalTitle": "Nutzungsbedingungen · Benutzerhandbuch · Datenschutzerklärung",
    "headerButton": "Bedingungen & Guide",
    "tabTerms": "Nutzungsbedingungen & Haftungsausschluss",
    "tabPrivacy": "Datenschutzerklärung",
    "tabGuide": "Studio-Handbuch",
    "disclaimerBadge": "WICHTIGER RECHTLICHER HINWEIS",
    "disclaimerTitle": "Urheberrechts- und Haftungsausschluss (Disclaimer)",
    "disclaimerText": "Permission to use audio is separate from a platform’s automated decisions. Incorrect registrations or automated matches can still produce claims. Claim-free use and platform monetization are not guaranteed. Check separate permissions for any outside samples or music that you add.",
    "disclaimerNotice": "Full conditions: /license/ · Contact: lbhl7585@naver.com",
    "termsTitle": "JYE SOUNDS Nutzungsbedingungen",
    "termsSubtitle": "Rechtliche Rahmenbedingungen für die Nutzung des 8-BIT SFX LAB.",
    "termsArticles": [
      {
        "title": "Service",
        "body": "Browse the library and use the BGM and SFX tools without registering an account. Playback and synthesis require JavaScript and a compatible browser."
      },
      {
        "title": "Audio permissions",
        "body": "The audio use conditions page describes permission for library and generated audio. Check the rights to any outside materials you add."
      },
      {
        "title": "Responsible use",
        "body": "Do not attack the service or disrupt it with excessive requests. Do not make false rights claims against other users or include unnecessary personal information about others in inquiries."
      },
      {
        "title": "Practical limitations",
        "body": "Playback, downloads and monetization decisions can vary by browser, device and external platform. Features may change or become unavailable. Keep your important settings and exported audio separately. This notice does not exclude rights provided by applicable law."
      },
      {
        "title": "Contact",
        "body": "Report errors, ask about permissions or submit rights inquiries to lbhl7585@naver.com. Include the exact sound and URL and steps to reproduce a problem."
      }
    ],
    "privacyTitle": "Datenschutzerklärung",
    "privacySubtitle": "Information handling for the JYE SOUNDS library and the BGM and SFX tools.",
    "privacyArticles": [
      {
        "title": "Audio and browser storage",
        "body": "The BGM and SFX tools synthesize audio and export WAV files in your browser. Language, library favorites and saved BGM presets may use local browser storage. Clear the site data in your browser to remove it. The SFX history currently lasts only for the open session."
      },
      {
        "title": "Hosting and external services",
        "body": "Pages and library audio are delivered through Cloudflare. Some pages request Google Fonts. These requests can include IP addresses and browser information. Hosting security logs and enabled analytics may be processed under the providers’ policies. Having no account registration does not mean that no connection information is transmitted."
      },
      {
        "title": "Google advertising",
        "body": "The main library includes Google AdSense code. Google and advertising partners may use cookies, web beacons, IP addresses or other identifiers to serve and measure ads and prevent invalid traffic. Personalized advertising depends on visit history and applicable consent requirements. Manage your choices in Google Ads Settings and your browser settings."
      },
      {
        "title": "Email inquiries",
        "body": "When you send an inquiry, your name, reply address, message and attachments are sent through your email service. Send only what is necessary to answer the inquiry or verify rights. Contact lbhl7585@naver.com for inquiry handling or a request to delete submitted materials."
      },
      {
        "title": "Provider information",
        "body": "Google partner-site data information: https://policies.google.com/technologies/partner-sites · Ads settings: https://adssettings.google.com · Cloudflare privacy policy: https://www.cloudflare.com/privacypolicy/"
      }
    ],
    "guideTitle": "8-BIT SFX LAB Anleitung",
    "guideSubtitle": "Retro-Soundeffekte mit wenigen Klicks gestalten.",
    "guideArticles": [
      {
        "title": "Choose in context",
        "body": "Listen with the dialogue and music of the intended scene. A comfortable preview volume is not necessarily the correct level in your mix."
      },
      {
        "title": "Trim and fade",
        "body": "Trim unwanted leading or trailing audio and use short fades to reduce boundary clicks. Keep the original and edit a copy."
      },
      {
        "title": "Set levels",
        "body": "Start quietly and raise effects until they support the scene without masking dialogue. Peak level and overall loudness are different. Check the final mix on headphones and speakers and inspect it for clipping."
      },
      {
        "title": "Make SFX",
        "body": "Choose a preset, edit pitch and envelope, audition it and export WAV. The high-quality option uses 44.1kHz/16-bit and the retro option uses 22.05kHz/8-bit. Reset returns a variation to its source preset."
      },
      {
        "title": "Make BGM",
        "body": "Choose a track, set tempo, pitch, EQ and ambience, then record. Stop and save requests a WAV download. A recording is limited to 2 minutes. Recording only the section you need reduces memory use."
      },
      {
        "title": "Project settings and permissions",
        "body": "Check mono/stereo and sample rate against your project settings. Site permission does not guarantee a platform’s automated decisions. Keep the license URL and sound filename in your project notes."
      }
    ],
    "closeBtn": "Verstanden & Schließen",
    "officialSiteNote": "Offizielle Website: jyesounds.com · JYE SOUNDS LABS"
  },
  "it": {
    "modalTitle": "Termini di Servizio · Guida Utente · Informativa sulla Privacy",
    "headerButton": "Termini e Guida",
    "tabTerms": "Termini di Servizio e Clausola di Manleva",
    "tabPrivacy": "Informativa sulla Privacy",
    "tabGuide": "Guida dello Studio",
    "disclaimerBadge": "AVVISO LEGALE IMPORTANTE",
    "disclaimerTitle": "Diritto d'Autore e Clausola di Esclusione di Responsabilità (Disclaimer)",
    "disclaimerText": "Permission to use audio is separate from a platform’s automated decisions. Incorrect registrations or automated matches can still produce claims. Claim-free use and platform monetization are not guaranteed. Check separate permissions for any outside samples or music that you add.",
    "disclaimerNotice": "Full conditions: /license/ · Contact: lbhl7585@naver.com",
    "termsTitle": "Termini di Servizio JYE SOUNDS",
    "termsSubtitle": "Condizioni generali e parametri legali per l’uso di 8-BIT SFX LAB.",
    "termsArticles": [
      {
        "title": "Service",
        "body": "Browse the library and use the BGM and SFX tools without registering an account. Playback and synthesis require JavaScript and a compatible browser."
      },
      {
        "title": "Audio permissions",
        "body": "The audio use conditions page describes permission for library and generated audio. Check the rights to any outside materials you add."
      },
      {
        "title": "Responsible use",
        "body": "Do not attack the service or disrupt it with excessive requests. Do not make false rights claims against other users or include unnecessary personal information about others in inquiries."
      },
      {
        "title": "Practical limitations",
        "body": "Playback, downloads and monetization decisions can vary by browser, device and external platform. Features may change or become unavailable. Keep your important settings and exported audio separately. This notice does not exclude rights provided by applicable law."
      },
      {
        "title": "Contact",
        "body": "Report errors, ask about permissions or submit rights inquiries to lbhl7585@naver.com. Include the exact sound and URL and steps to reproduce a problem."
      }
    ],
    "privacyTitle": "Informativa sulla Privacy",
    "privacySubtitle": "Information handling for the JYE SOUNDS library and the BGM and SFX tools.",
    "privacyArticles": [
      {
        "title": "Audio and browser storage",
        "body": "The BGM and SFX tools synthesize audio and export WAV files in your browser. Language, library favorites and saved BGM presets may use local browser storage. Clear the site data in your browser to remove it. The SFX history currently lasts only for the open session."
      },
      {
        "title": "Hosting and external services",
        "body": "Pages and library audio are delivered through Cloudflare. Some pages request Google Fonts. These requests can include IP addresses and browser information. Hosting security logs and enabled analytics may be processed under the providers’ policies. Having no account registration does not mean that no connection information is transmitted."
      },
      {
        "title": "Google advertising",
        "body": "The main library includes Google AdSense code. Google and advertising partners may use cookies, web beacons, IP addresses or other identifiers to serve and measure ads and prevent invalid traffic. Personalized advertising depends on visit history and applicable consent requirements. Manage your choices in Google Ads Settings and your browser settings."
      },
      {
        "title": "Email inquiries",
        "body": "When you send an inquiry, your name, reply address, message and attachments are sent through your email service. Send only what is necessary to answer the inquiry or verify rights. Contact lbhl7585@naver.com for inquiry handling or a request to delete submitted materials."
      },
      {
        "title": "Provider information",
        "body": "Google partner-site data information: https://policies.google.com/technologies/partner-sites · Ads settings: https://adssettings.google.com · Cloudflare privacy policy: https://www.cloudflare.com/privacypolicy/"
      }
    ],
    "guideTitle": "Guida Rapida 8-BIT SFX LAB",
    "guideSubtitle": "Crea effetti sonori chiptune in pochi semplici passaggi.",
    "guideArticles": [
      {
        "title": "Choose in context",
        "body": "Listen with the dialogue and music of the intended scene. A comfortable preview volume is not necessarily the correct level in your mix."
      },
      {
        "title": "Trim and fade",
        "body": "Trim unwanted leading or trailing audio and use short fades to reduce boundary clicks. Keep the original and edit a copy."
      },
      {
        "title": "Set levels",
        "body": "Start quietly and raise effects until they support the scene without masking dialogue. Peak level and overall loudness are different. Check the final mix on headphones and speakers and inspect it for clipping."
      },
      {
        "title": "Make SFX",
        "body": "Choose a preset, edit pitch and envelope, audition it and export WAV. The high-quality option uses 44.1kHz/16-bit and the retro option uses 22.05kHz/8-bit. Reset returns a variation to its source preset."
      },
      {
        "title": "Make BGM",
        "body": "Choose a track, set tempo, pitch, EQ and ambience, then record. Stop and save requests a WAV download. A recording is limited to 2 minutes. Recording only the section you need reduces memory use."
      },
      {
        "title": "Project settings and permissions",
        "body": "Check mono/stereo and sample rate against your project settings. Site permission does not guarantee a platform’s automated decisions. Keep the license URL and sound filename in your project notes."
      }
    ],
    "closeBtn": "Ho Capito e Chiudi",
    "officialSiteNote": "Sito ufficiale: jyesounds.com · JYE SOUNDS LABS"
  },
  "id": {
    "modalTitle": "Ketentuan Layanan · Panduan Pengguna · Kebijakan Privasi",
    "headerButton": "Ketentuan & Panduan",
    "tabTerms": "Ketentuan Layanan & Penafian",
    "tabPrivacy": "Kebijakan Privasi",
    "tabGuide": "Panduan Studio",
    "disclaimerBadge": "PEMBERITAHUAN HUKUM PENTING",
    "disclaimerTitle": "Hak Cipta & Penafian Hukum (Disclaimer)",
    "disclaimerText": "Permission to use audio is separate from a platform’s automated decisions. Incorrect registrations or automated matches can still produce claims. Claim-free use and platform monetization are not guaranteed. Check separate permissions for any outside samples or music that you add.",
    "disclaimerNotice": "Full conditions: /license/ · Contact: lbhl7585@naver.com",
    "termsTitle": "Ketentuan Layanan JYE SOUNDS",
    "termsSubtitle": "Aturan pemakaian dan ketentuan hukum penggunaan 8-BIT SFX LAB.",
    "termsArticles": [
      {
        "title": "Service",
        "body": "Browse the library and use the BGM and SFX tools without registering an account. Playback and synthesis require JavaScript and a compatible browser."
      },
      {
        "title": "Audio permissions",
        "body": "The audio use conditions page describes permission for library and generated audio. Check the rights to any outside materials you add."
      },
      {
        "title": "Responsible use",
        "body": "Do not attack the service or disrupt it with excessive requests. Do not make false rights claims against other users or include unnecessary personal information about others in inquiries."
      },
      {
        "title": "Practical limitations",
        "body": "Playback, downloads and monetization decisions can vary by browser, device and external platform. Features may change or become unavailable. Keep your important settings and exported audio separately. This notice does not exclude rights provided by applicable law."
      },
      {
        "title": "Contact",
        "body": "Report errors, ask about permissions or submit rights inquiries to lbhl7585@naver.com. Include the exact sound and URL and steps to reproduce a problem."
      }
    ],
    "privacyTitle": "Kebijakan Privasi",
    "privacySubtitle": "Information handling for the JYE SOUNDS library and the BGM and SFX tools.",
    "privacyArticles": [
      {
        "title": "Audio and browser storage",
        "body": "The BGM and SFX tools synthesize audio and export WAV files in your browser. Language, library favorites and saved BGM presets may use local browser storage. Clear the site data in your browser to remove it. The SFX history currently lasts only for the open session."
      },
      {
        "title": "Hosting and external services",
        "body": "Pages and library audio are delivered through Cloudflare. Some pages request Google Fonts. These requests can include IP addresses and browser information. Hosting security logs and enabled analytics may be processed under the providers’ policies. Having no account registration does not mean that no connection information is transmitted."
      },
      {
        "title": "Google advertising",
        "body": "The main library includes Google AdSense code. Google and advertising partners may use cookies, web beacons, IP addresses or other identifiers to serve and measure ads and prevent invalid traffic. Personalized advertising depends on visit history and applicable consent requirements. Manage your choices in Google Ads Settings and your browser settings."
      },
      {
        "title": "Email inquiries",
        "body": "When you send an inquiry, your name, reply address, message and attachments are sent through your email service. Send only what is necessary to answer the inquiry or verify rights. Contact lbhl7585@naver.com for inquiry handling or a request to delete submitted materials."
      },
      {
        "title": "Provider information",
        "body": "Google partner-site data information: https://policies.google.com/technologies/partner-sites · Ads settings: https://adssettings.google.com · Cloudflare privacy policy: https://www.cloudflare.com/privacypolicy/"
      }
    ],
    "guideTitle": "Panduan Penggunaan 8-BIT SFX LAB",
    "guideSubtitle": "Buat efek suara 8-bit retro autentik dengan mudah.",
    "guideArticles": [
      {
        "title": "Choose in context",
        "body": "Listen with the dialogue and music of the intended scene. A comfortable preview volume is not necessarily the correct level in your mix."
      },
      {
        "title": "Trim and fade",
        "body": "Trim unwanted leading or trailing audio and use short fades to reduce boundary clicks. Keep the original and edit a copy."
      },
      {
        "title": "Set levels",
        "body": "Start quietly and raise effects until they support the scene without masking dialogue. Peak level and overall loudness are different. Check the final mix on headphones and speakers and inspect it for clipping."
      },
      {
        "title": "Make SFX",
        "body": "Choose a preset, edit pitch and envelope, audition it and export WAV. The high-quality option uses 44.1kHz/16-bit and the retro option uses 22.05kHz/8-bit. Reset returns a variation to its source preset."
      },
      {
        "title": "Make BGM",
        "body": "Choose a track, set tempo, pitch, EQ and ambience, then record. Stop and save requests a WAV download. A recording is limited to 2 minutes. Recording only the section you need reduces memory use."
      },
      {
        "title": "Project settings and permissions",
        "body": "Check mono/stereo and sample rate against your project settings. Site permission does not guarantee a platform’s automated decisions. Keep the license URL and sound filename in your project notes."
      }
    ],
    "closeBtn": "Paham & Tutup",
    "officialSiteNote": "Situs resmi: jyesounds.com · JYE SOUNDS LABS"
  },
  "vi": {
    "modalTitle": "Điều khoản Dịch vụ · Hướng dẫn Sử dụng · Chính sách Bảo mật",
    "headerButton": "Điều khoản & Hướng dẫn",
    "tabTerms": "Điều khoản Dịch vụ & Miễn trừ",
    "tabPrivacy": "Chính sách Bảo mật",
    "tabGuide": "Hướng dẫn Studio",
    "disclaimerBadge": "THÔNG BÁO PHÁP LÝ QUAN TRỌNG",
    "disclaimerTitle": "Bản quyền & Tuyên bố Miễn trừ Trách nhiệm Pháp lý (Disclaimer)",
    "disclaimerText": "Permission to use audio is separate from a platform’s automated decisions. Incorrect registrations or automated matches can still produce claims. Claim-free use and platform monetization are not guaranteed. Check separate permissions for any outside samples or music that you add.",
    "disclaimerNotice": "Full conditions: /license/ · Contact: lbhl7585@naver.com",
    "termsTitle": "Điều khoản Dịch vụ JYE SOUNDS",
    "termsSubtitle": "Quy định sử dụng và giới hạn pháp lý của 8-BIT SFX LAB.",
    "termsArticles": [
      {
        "title": "Service",
        "body": "Browse the library and use the BGM and SFX tools without registering an account. Playback and synthesis require JavaScript and a compatible browser."
      },
      {
        "title": "Audio permissions",
        "body": "The audio use conditions page describes permission for library and generated audio. Check the rights to any outside materials you add."
      },
      {
        "title": "Responsible use",
        "body": "Do not attack the service or disrupt it with excessive requests. Do not make false rights claims against other users or include unnecessary personal information about others in inquiries."
      },
      {
        "title": "Practical limitations",
        "body": "Playback, downloads and monetization decisions can vary by browser, device and external platform. Features may change or become unavailable. Keep your important settings and exported audio separately. This notice does not exclude rights provided by applicable law."
      },
      {
        "title": "Contact",
        "body": "Report errors, ask about permissions or submit rights inquiries to lbhl7585@naver.com. Include the exact sound and URL and steps to reproduce a problem."
      }
    ],
    "privacyTitle": "Chính sách Bảo mật",
    "privacySubtitle": "Information handling for the JYE SOUNDS library and the BGM and SFX tools.",
    "privacyArticles": [
      {
        "title": "Audio and browser storage",
        "body": "The BGM and SFX tools synthesize audio and export WAV files in your browser. Language, library favorites and saved BGM presets may use local browser storage. Clear the site data in your browser to remove it. The SFX history currently lasts only for the open session."
      },
      {
        "title": "Hosting and external services",
        "body": "Pages and library audio are delivered through Cloudflare. Some pages request Google Fonts. These requests can include IP addresses and browser information. Hosting security logs and enabled analytics may be processed under the providers’ policies. Having no account registration does not mean that no connection information is transmitted."
      },
      {
        "title": "Google advertising",
        "body": "The main library includes Google AdSense code. Google and advertising partners may use cookies, web beacons, IP addresses or other identifiers to serve and measure ads and prevent invalid traffic. Personalized advertising depends on visit history and applicable consent requirements. Manage your choices in Google Ads Settings and your browser settings."
      },
      {
        "title": "Email inquiries",
        "body": "When you send an inquiry, your name, reply address, message and attachments are sent through your email service. Send only what is necessary to answer the inquiry or verify rights. Contact lbhl7585@naver.com for inquiry handling or a request to delete submitted materials."
      },
      {
        "title": "Provider information",
        "body": "Google partner-site data information: https://policies.google.com/technologies/partner-sites · Ads settings: https://adssettings.google.com · Cloudflare privacy policy: https://www.cloudflare.com/privacypolicy/"
      }
    ],
    "guideTitle": "Hướng dẫn 8-BIT SFX LAB",
    "guideSubtitle": "Tạo hiệu ứng âm thanh cổ điển 8-bit trong tích tắc.",
    "guideArticles": [
      {
        "title": "Choose in context",
        "body": "Listen with the dialogue and music of the intended scene. A comfortable preview volume is not necessarily the correct level in your mix."
      },
      {
        "title": "Trim and fade",
        "body": "Trim unwanted leading or trailing audio and use short fades to reduce boundary clicks. Keep the original and edit a copy."
      },
      {
        "title": "Set levels",
        "body": "Start quietly and raise effects until they support the scene without masking dialogue. Peak level and overall loudness are different. Check the final mix on headphones and speakers and inspect it for clipping."
      },
      {
        "title": "Make SFX",
        "body": "Choose a preset, edit pitch and envelope, audition it and export WAV. The high-quality option uses 44.1kHz/16-bit and the retro option uses 22.05kHz/8-bit. Reset returns a variation to its source preset."
      },
      {
        "title": "Make BGM",
        "body": "Choose a track, set tempo, pitch, EQ and ambience, then record. Stop and save requests a WAV download. A recording is limited to 2 minutes. Recording only the section you need reduces memory use."
      },
      {
        "title": "Project settings and permissions",
        "body": "Check mono/stereo and sample rate against your project settings. Site permission does not guarantee a platform’s automated decisions. Keep the license URL and sound filename in your project notes."
      }
    ],
    "closeBtn": "Đã hiểu & Đóng",
    "officialSiteNote": "Trang web chính thức: jyesounds.com · JYE SOUNDS LABS"
  },
  "th": {
    "modalTitle": "ข้อกำหนดการให้บริการ · คู่มือผู้ใช้ · นโยบายความเป็นส่วนตัว",
    "headerButton": "ข้อกำหนดและคู่มือ",
    "tabTerms": "ข้อกำหนดการให้บริการ & ข้อจำกัดความรับผิดชอบ",
    "tabPrivacy": "นโยบายความเป็นส่วนตัว",
    "tabGuide": "คู่มือการใช้งานสตูดิโอ",
    "disclaimerBadge": "ประกาศทางกฎหมายสำคัญ (LEGAL DISCLAIMER)",
    "disclaimerTitle": "ข้อจำกัดความรับผิดชอบด้านลิขสิทธิ์และกฎหมาย (Disclaimer)",
    "disclaimerText": "Permission to use audio is separate from a platform’s automated decisions. Incorrect registrations or automated matches can still produce claims. Claim-free use and platform monetization are not guaranteed. Check separate permissions for any outside samples or music that you add.",
    "disclaimerNotice": "Full conditions: /license/ · Contact: lbhl7585@naver.com",
    "termsTitle": "ข้อกำหนดการให้บริการ JYE SOUNDS",
    "termsSubtitle": "เงื่อนไขและข้อกำหนดทางกฎหมายสำหรับการใช้งาน 8-BIT SFX LAB",
    "termsArticles": [
      {
        "title": "Service",
        "body": "Browse the library and use the BGM and SFX tools without registering an account. Playback and synthesis require JavaScript and a compatible browser."
      },
      {
        "title": "Audio permissions",
        "body": "The audio use conditions page describes permission for library and generated audio. Check the rights to any outside materials you add."
      },
      {
        "title": "Responsible use",
        "body": "Do not attack the service or disrupt it with excessive requests. Do not make false rights claims against other users or include unnecessary personal information about others in inquiries."
      },
      {
        "title": "Practical limitations",
        "body": "Playback, downloads and monetization decisions can vary by browser, device and external platform. Features may change or become unavailable. Keep your important settings and exported audio separately. This notice does not exclude rights provided by applicable law."
      },
      {
        "title": "Contact",
        "body": "Report errors, ask about permissions or submit rights inquiries to lbhl7585@naver.com. Include the exact sound and URL and steps to reproduce a problem."
      }
    ],
    "privacyTitle": "นโยบายความเป็นส่วนตัว",
    "privacySubtitle": "Information handling for the JYE SOUNDS library and the BGM and SFX tools.",
    "privacyArticles": [
      {
        "title": "Audio and browser storage",
        "body": "The BGM and SFX tools synthesize audio and export WAV files in your browser. Language, library favorites and saved BGM presets may use local browser storage. Clear the site data in your browser to remove it. The SFX history currently lasts only for the open session."
      },
      {
        "title": "Hosting and external services",
        "body": "Pages and library audio are delivered through Cloudflare. Some pages request Google Fonts. These requests can include IP addresses and browser information. Hosting security logs and enabled analytics may be processed under the providers’ policies. Having no account registration does not mean that no connection information is transmitted."
      },
      {
        "title": "Google advertising",
        "body": "The main library includes Google AdSense code. Google and advertising partners may use cookies, web beacons, IP addresses or other identifiers to serve and measure ads and prevent invalid traffic. Personalized advertising depends on visit history and applicable consent requirements. Manage your choices in Google Ads Settings and your browser settings."
      },
      {
        "title": "Email inquiries",
        "body": "When you send an inquiry, your name, reply address, message and attachments are sent through your email service. Send only what is necessary to answer the inquiry or verify rights. Contact lbhl7585@naver.com for inquiry handling or a request to delete submitted materials."
      },
      {
        "title": "Provider information",
        "body": "Google partner-site data information: https://policies.google.com/technologies/partner-sites · Ads settings: https://adssettings.google.com · Cloudflare privacy policy: https://www.cloudflare.com/privacypolicy/"
      }
    ],
    "guideTitle": "คู่มือการใช้งาน 8-BIT SFX LAB",
    "guideSubtitle": "สร้างเอฟเฟกต์เสียงเรโทร 8 บิตได้ง่ายๆ ภายในไม่กี่ขั้นตอน",
    "guideArticles": [
      {
        "title": "Choose in context",
        "body": "Listen with the dialogue and music of the intended scene. A comfortable preview volume is not necessarily the correct level in your mix."
      },
      {
        "title": "Trim and fade",
        "body": "Trim unwanted leading or trailing audio and use short fades to reduce boundary clicks. Keep the original and edit a copy."
      },
      {
        "title": "Set levels",
        "body": "Start quietly and raise effects until they support the scene without masking dialogue. Peak level and overall loudness are different. Check the final mix on headphones and speakers and inspect it for clipping."
      },
      {
        "title": "Make SFX",
        "body": "Choose a preset, edit pitch and envelope, audition it and export WAV. The high-quality option uses 44.1kHz/16-bit and the retro option uses 22.05kHz/8-bit. Reset returns a variation to its source preset."
      },
      {
        "title": "Make BGM",
        "body": "Choose a track, set tempo, pitch, EQ and ambience, then record. Stop and save requests a WAV download. A recording is limited to 2 minutes. Recording only the section you need reduces memory use."
      },
      {
        "title": "Project settings and permissions",
        "body": "Check mono/stereo and sample rate against your project settings. Site permission does not guarantee a platform’s automated decisions. Keep the license URL and sound filename in your project notes."
      }
    ],
    "closeBtn": "เข้าใจแล้วและปิดหน้าต่าง",
    "officialSiteNote": "เว็บไซต์อย่างเป็นทางการ: jyesounds.com · JYE SOUNDS LABS"
  }
};
