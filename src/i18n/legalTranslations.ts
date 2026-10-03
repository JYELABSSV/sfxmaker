import { SupportedLanguage } from './translations';

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
  ko: {
    modalTitle: '이용약관 · 가이드 · 개인정보처리방침',
    headerButton: '약관 및 가이드',
    tabTerms: '서비스 이용약관 & 면책조항',
    tabPrivacy: '개인정보처리방침',
    tabGuide: '스튜디오 이용 가이드',
    disclaimerBadge: '중요 법적 고지 (LEGAL DISCLAIMER)',
    disclaimerTitle: '저작권 및 법적 면책 조항 (Disclaimer)',
    disclaimerText:
      '본 스튜디오에서 녹음·추출한 음원을 유튜브, 게임, 방송 등 어디에 사용하든 사용자 본인의 자유이나, 이로 인해 발생하는 저작권 분쟁, 계정 제재, 수익 창출 제한 등 모든 결과와 책임은 전적으로 사용자 본인에게 있으며, 운영자(JYE SOUNDS)는 이에 대해 어떠한 법적 책임도 지지 않는다.',
    disclaimerNotice:
      '※ 상업적·비상업적 프로젝트에 음원을 자유롭게 사용할 수 있으나, 모든 법적·플랫폼 관련 귀책사유는 전적으로 이용자 본인에게 귀속됩니다.',
    termsTitle: 'JYE SOUNDS 서비스 이용약관',
    termsSubtitle: '8-BIT SFX LAB 서비스 이용에 대한 기본 조건 및 법적 권리 의무 사항입니다.',
    termsArticles: [
      {
        title: '제1조 (목적 및 성격)',
        body: '본 약관은 JYE SOUNDS가 제공하는 8-BIT SFX LAB(웹 오디오 신디사이저 및 WAV 생성 도구)의 이용 조건, 절차 및 운영자와 이용자 간의 권리, 의무를 규정합니다. 본 서비스는 순수한 클라이언트 측 오디오 합성 도구입니다.',
      },
      {
        title: '제2조 (음원 생성 및 라이선스 권한)',
        body: '1. 사용자는 본 스튜디오에서 합성·추출한 WAV 오디오 파일을 게임, 유튜브 동영상, 애니메이션, 방송 등 상업적 및 비상업적 창작물에 자유롭게 활용할 수 있습니다.\n2. 서비스 이용 및 기본 음원 추출에 대해 별도의 로열티나 정기 구독료를 부과하지 않습니다.',
      },
      {
        title: '제3조 (저작권 분쟁 및 절대적 법적 면책)',
        body: '1. 본 스튜디오에서 녹음·추출한 음원을 유튜브, 게임, 방송 등 어디에 사용하든 사용자 본인의 자유이나, 이로 인해 발생하는 저작권 분쟁, 계정 제재, 수익 창출 제한 등 모든 결과와 책임은 전적으로 사용자 본인에게 있으며, 운영자(JYE SOUNDS)는 이에 대해 어떠한 법적 책임도 지지 않습니다.\n2. 유튜브 Content ID 등록, 방송사 음원 심의, 제3자의 기존 저작물과의 음향 유사성 주장, 플랫폼의 약관 위반 조치 등 제반 문제에 대해 운영자는 어떠한 보증이나 대리 해결, 법적 방어 의무를 제공하지 않습니다.',
      },
      {
        title: '제4조 (보증의 부인 및 서비스 변경)',
        body: '1. 본 서비스는 "있는 그대로(AS-IS)" 제공되며, 서비스의 완전성, 무결성, 무중단 작동 또는 특정 창작물에서의 적합성을 보증하지 않습니다.\n2. 운영자는 운영상, 기술상 필요에 따라 서비스의 기능이나 구성을 사전 통보 없이 변경하거나 일시 중단할 수 있습니다.',
      },
    ],
    privacyTitle: '개인정보처리방침 (Privacy Policy)',
    privacySubtitle: 'JYE SOUNDS는 사용자의 개인정보 보호를 최우선으로 생각합니다.',
    privacyArticles: [
      {
        title: '1. 개인정보 수집 부인',
        body: 'JYE SOUNDS 8-BIT SFX LAB은 회원가입이나 로그인을 요구하지 않으며, 사용자의 이름, 이메일 주소, 전화번호, IP 주소 또는 주민등록번호 등 일체의 개인정보를 서버로 수집하거나 저장하지 않습니다.',
      },
      {
        title: '2. 100% 클라이언트 브라우저 처리 (Web Audio API)',
        body: '모든 사운드 생성, 주파수 조절, 필터링 연산 및 WAV 파일 인코딩은 오직 사용자의 브라우저 내부 메모리에서 실시간으로 처리됩니다. 녹음되거나 생성된 오디오 데이터가 외부 서버로 전송되거나 보관되지 않습니다.',
      },
      {
        title: '3. 로컬 브라우저 저장소 (LocalStorage) 사용',
        body: '사운드 편집 히스토리, 즐겨찾기 목록, 언어 설정 등 사용자 편의를 위한 설정값은 오직 사용자의 브라우저 LocalStorage에만 저장되며, 브라우저 캐시 및 저장소 삭제를 통해 언제든 초기화할 수 있습니다.',
      },
      {
        title: '4. 제3자 제공 및 추적 금지',
        body: '운영자는 사용자의 어떠한 데이터도 제3자 광고 플랫폼에 판매하거나 제공하지 않으며, 무단 추적기를 운영하지 않습니다.',
      },
      {
        title: '5. 문의 안내',
        body: '서비스 이용 또는 정책과 관련된 문의는 JYE SOUNDS 공식 웹사이트(jyesounds.com)를 통해 확인하실 수 있습니다.',
      },
    ],
    guideTitle: '8-BIT SFX LAB 마스터 가이드',
    guideSubtitle: '클릭 몇 번으로 나만의 아케이드 레트로 사운드를 제작하는 방법입니다.',
    guideArticles: [
      {
        title: '1. 파형 선택 및 18종 프리셋',
        body: 'Square(8비트 아케이드 멜로디), Sawtooth(날카로운 신스 리드), Triangle(단단한 베이스), Noise(폭발·타격음), Sine(부드러운 벨) 중 기본 파형을 고르고, 상단 18종 프리셋 버튼을 클릭하여 즉각적인 사운드를 들어보세요.',
      },
      {
        title: '2. 실시간 파동 그래프 에디터',
        body: '피치 궤적(Pitch)과 볼륨 엔벨로프(Envelope) 탭에서 원형 핸들을 드래그하거나 펜 모드로 직접 곡선을 쓱 그려 소리의 주파수 변화와 ADSR 형태를 직관적으로 조각할 수 있습니다.',
      },
      {
        title: '3. 빈티지 이펙트 & 피치 오디션',
        body: '비브라토 깊이/속도, 컷오프 필터, 4비트/8비트 비트크러셔를 적용해 클래식 콘솔 특유의 거친 질감을 구현하고, 하단 피아노 건반으로 다양한 음계에서 소리가 어떻게 울리는지 실시간으로 테스트하세요.',
      },
      {
        title: '4. 무손실 WAV 파일 다운로드 & 단축키',
        body: '44.1kHz 고음질 또는 22kHz 클래식 레트로 음질을 선택한 뒤 [WAV 다운로드]를 클릭하면 즉시 무손실 오디오 파일로 저장됩니다. 스페이스바로 재생, [M]으로 변형, [R]로 랜덤 생성을 빠르게 실행할 수 있습니다.',
      },
    ],
    closeBtn: '확인 및 닫기',
    officialSiteNote: '공식 웹사이트: jyesounds.com · JYE SOUNDS LABS',
  },
  en: {
    modalTitle: 'Terms of Service · User Guide · Privacy Policy',
    headerButton: 'Terms & Guide',
    tabTerms: 'Terms of Service & Disclaimer',
    tabPrivacy: 'Privacy Policy',
    tabGuide: 'Studio User Guide',
    disclaimerBadge: 'CRITICAL LEGAL NOTICE',
    disclaimerTitle: 'Copyright & Legal Disclaimer',
    disclaimerText:
      'You are entirely free to use any audio recorded or exported from this studio wherever you wish, including on YouTube, in games, broadcasts, and other media. However, any and all consequences and responsibilities—including copyright disputes, account penalties or sanctions, and monetization restrictions—rest entirely with the user, and the operator (JYE SOUNDS) assumes no legal liability whatsoever.',
    disclaimerNotice:
      '※ While you are free to utilize synthesized audio in both commercial and non-commercial works, all legal liabilities and platform-related consequences remain exclusively with you as the user.',
    termsTitle: 'JYE SOUNDS Terms of Service',
    termsSubtitle: 'Basic terms, conditions, and legal parameters governing the use of 8-BIT SFX LAB.',
    termsArticles: [
      {
        title: 'Section 1 (Purpose & Nature)',
        body: 'These Terms of Service govern the use of the 8-BIT SFX LAB web audio synthesizer provided by JYE SOUNDS. The service is a browser-native Web Audio synthesizer and procedural audio creation tool.',
      },
      {
        title: 'Section 2 (Sound Generation & Licensing)',
        body: '1. Users are granted full liberty to incorporate audio files (WAV) generated through this studio into commercial and non-commercial productions, such as video games, YouTube videos, streams, and podcasts.\n2. The service does not require royalties or subscription fees for baseline sound generation and WAV exports.',
      },
      {
        title: 'Section 3 (Copyright Disputes & Absolute Disclaimer)',
        body: '1. You are entirely free to use any audio recorded or exported from this studio wherever you wish, including on YouTube, in games, broadcasts, and other media. However, any and all consequences and responsibilities—including copyright disputes, account penalties or sanctions, and monetization restrictions—rest entirely with the user, and the operator (JYE SOUNDS) assumes no legal liability whatsoever.\n2. The operator provides no warranties, legal representation, or indemnification regarding YouTube Content ID claims, copyright strikes, or similarity claims asserted by third parties.',
      },
      {
        title: 'Section 4 (Disclaimer of Warranties)',
        body: '1. The service is provided on an "AS-IS" and "AS-AVAILABLE" basis without warranties of uninterrupted service, fitness for a particular purpose, or zero-latency playback.\n2. The operator reserves the right to modify or temporarily suspend features for maintenance without prior notice.',
      },
    ],
    privacyTitle: 'Privacy Policy',
    privacySubtitle: 'Your privacy is paramount; 8-BIT SFX LAB operates with zero personal data collection.',
    privacyArticles: [
      {
        title: '1. No Personal Data Collected',
        body: 'JYE SOUNDS 8-BIT SFX LAB does not require registration, login, or user profiles. We never collect or store names, email addresses, phone numbers, IP addresses, or payment details on any server.',
      },
      {
        title: '2. 100% Client-Side Processing (Web Audio API)',
        body: 'All sound synthesis, parameter adjustments, and WAV encoding take place entirely in your local browser memory. No audio data generated by you is transmitted to or stored on external servers.',
      },
      {
        title: '3. Local Storage Usage (LocalStorage)',
        body: 'Your sound history, favorite presets, and language choices are stored solely within your browser LocalStorage. You can clear this data at any time via your browser settings.',
      },
      {
        title: '4. No Third-Party Tracking or Sharing',
        body: 'We do not sell, rent, or share user data with third-party data brokers or advertising platforms.',
      },
      {
        title: '5. Contact & Inquiries',
        body: 'For general inquiries regarding JYE SOUNDS, please visit our official website at jyesounds.com.',
      },
    ],
    guideTitle: '8-BIT SFX LAB User Guide',
    guideSubtitle: 'Craft authentic retro chiptune sound effects in just a few clicks.',
    guideArticles: [
      {
        title: '1. Waveforms & 18 Presets',
        body: 'Select between Square (classic NES melody), Sawtooth (arcade lead), Triangle (deep bass), Noise (explosions & hits), and Sine (soft bells), or click any of the 18 preset buttons at the top to audition sounds instantly.',
      },
      {
        title: '2. Interactive Waveform Graph Editor',
        body: 'Switch between Pitch Trajectory and Envelope tabs. Drag circular handles or draw freehand curves to sculpt precise frequency sweeps and volume envelopes (ADSR).',
      },
      {
        title: '3. Vintage Effects & Pitch Audition',
        body: 'Add authentic chiptune grit using Vibrato, Lowpass/Highpass filters, and the Bit Crusher (down to 4-bit). Use the interactive piano keyboard to test how your sound resonates across musical notes.',
      },
      {
        title: '4. Lossless WAV Export & Shortcuts',
        body: 'Choose 44.1kHz High Quality or 22kHz Retro Quality and click [Download WAV]. Use keyboard shortcuts: [SPACE] to Play, [M] to Mutate slightly, and [R] for Random surprises.',
      },
    ],
    closeBtn: 'Understood & Close',
    officialSiteNote: 'Official Website: jyesounds.com · JYE SOUNDS LABS',
  },
  'en-GB': {
    modalTitle: 'Terms of Service · User Guide · Privacy Policy',
    headerButton: 'Terms & Guide',
    tabTerms: 'Terms of Service & Disclaimer',
    tabPrivacy: 'Privacy Policy',
    tabGuide: 'Studio User Guide',
    disclaimerBadge: 'CRITICAL LEGAL NOTICE',
    disclaimerTitle: 'Copyright & Legal Disclaimer',
    disclaimerText:
      'You are entirely free to use any audio recorded or exported from this studio wherever you wish, including on YouTube, in video games, broadcasts, and other media. However, any and all consequences and liabilities—including copyright disputes, account penalties, and monetization restrictions—rest entirely with the user, and the operator (JYE SOUNDS) assumes no legal liability whatsoever.',
    disclaimerNotice:
      '※ While you are free to utilize exported audio in both commercial and non-commercial productions, all legal liabilities and platform consequences remain solely with you.',
    termsTitle: 'JYE SOUNDS Terms of Service',
    termsSubtitle: 'Standard terms and conditions governing the 8-BIT SFX LAB workstation.',
    termsArticles: [
      {
        title: 'Clause 1 (Purpose & Scope)',
        body: 'These Terms govern your use of the 8-BIT SFX LAB procedural audio synthesis service provided by JYE SOUNDS. The tool runs client-side via the Web Audio API.',
      },
      {
        title: 'Clause 2 (Audio Generation & Licences)',
        body: '1. You may freely use audio files (WAV) generated through this studio in commercial and non-commercial projects including video games, YouTube videos, and broadcasts.\n2. No licensing fees or royalties are demanded for baseline sound generation.',
      },
      {
        title: 'Clause 3 (Copyright Disputes & Absolute Disclaimer)',
        body: '1. You are entirely free to use any audio recorded or exported from this studio wherever you wish, including on YouTube, in video games, broadcasts, and other media. However, any and all consequences and liabilities—including copyright disputes, account penalties, and monetization restrictions—rest entirely with the user, and the operator (JYE SOUNDS) assumes no legal liability whatsoever.\n2. JYE SOUNDS shall not be held liable for YouTube Content ID claims, copyright notices, or account sanctions issued by third-party platforms.',
      },
      {
        title: 'Clause 4 (Limitation of Liability)',
        body: '1. The service is provided on an "AS-IS" basis without warranties of uninterrupted performance.\n2. JYE SOUNDS reserves the right to update or modify features without prior notification.',
      },
    ],
    privacyTitle: 'Privacy Policy',
    privacySubtitle: 'We respect your privacy; this application gathers zero personal data.',
    privacyArticles: [
      {
        title: '1. Zero Personal Data Collected',
        body: 'No registration, user accounts, or profile data are required. We never collect names, contact details, or IP addresses.',
      },
      {
        title: '2. 100% Client-Side Processing',
        body: 'All sound calculations, waveform rendering, and WAV encoding occur directly within your web browser. No audio is uploaded to external servers.',
      },
      {
        title: '3. LocalStorage Usage',
        body: 'Sound history, favourites, and language preferences are stored strictly in your browser LocalStorage and never transmitted outside your device.',
      },
      {
        title: '4. Third-Party Tracking',
        body: 'We do not engage in third-party user tracking, telemetry, or data reselling.',
      },
      {
        title: '5. Enquiries',
        body: 'For questions regarding JYE SOUNDS, please visit our official website at jyesounds.com.',
      },
    ],
    guideTitle: '8-BIT SFX LAB Guide',
    guideSubtitle: 'Create authentic retro arcade sound effects in moments.',
    guideArticles: [
      {
        title: '1. Waveforms & Presets',
        body: 'Choose from Square, Sawtooth, Triangle, Noise, and Sine waveforms, or click any of the 18 presets above to audition sounds instantly.',
      },
      {
        title: '2. Graph Editor',
        body: 'Switch between Pitch Trajectory and Envelope tabs. Drag handles or use draw mode to sculpt your custom sound curves.',
      },
      {
        title: '3. Vintage Effects & Audition',
        body: 'Employ Vibrato, Filters, and the Bit Crusher to emulate authentic vintage game hardware, and test your sound on the piano keyboard.',
      },
      {
        title: '4. WAV Export & Shortcuts',
        body: 'Download lossless WAV audio at 44.1kHz or 22kHz. Tap [SPACE] to Play, [M] to Mutate, and [R] to Randomise.',
      },
    ],
    closeBtn: 'Understood & Close',
    officialSiteNote: 'Official Website: jyesounds.com · JYE SOUNDS LABS',
  },
  ja: {
    modalTitle: '利用規約 · ガイド · プライバシーポリシー',
    headerButton: '規約＆ガイド',
    tabTerms: '利用規約＆免責事項',
    tabPrivacy: 'プライバシーポリシー',
    tabGuide: 'スタジオ利用ガイド',
    disclaimerBadge: '重要法的告知 (LEGAL DISCLAIMER)',
    disclaimerTitle: '著作権および法的免責事項 (Disclaimer)',
    disclaimerText:
      '本スタジオで録音・出力した音源をYouTube、ゲーム、配信等どこで使用するかはユーザー自身の自由ですが、これに起因して発生する著作権紛争、アカウント停止・ペナルティ、収益化制限等のあらゆる結果および責任はすべてユーザー自身に帰属し、運営者（JYE SOUNDS）はこれに対して一切の法的責任を負いません。',
    disclaimerNotice:
      '※ 商用・非商用問わず自由に音源をご活用いただけますが、利用に伴うすべての結果および法的責任はユーザー本人のみに帰属します。',
    termsTitle: 'JYE SOUNDS サービス利用規約',
    termsSubtitle: '8-BIT SFX LABの利用条件および権利義務に関する基本事項です。',
    termsArticles: [
      {
        title: '第1条（目的とサービスの性質）',
        body: '本規約は、JYE SOUNDSが提供する8-BIT SFX LAB（Web AudioシンセサイザーおよびWAV出力ツール）の利用条件を定めるものです。本サービスはブラウザ上でリアルタイムに波形を合成するWebツールです。',
      },
      {
        title: '第2条（音源の生成およびライセンス権限）',
        body: '1. ユーザーは、本スタジオで生成・出力したWAV音源を、ゲーム、YouTube動画、アニメ、配信等の商用および非商用プロジェクトにおいて自由に使用できます。\n2. 本サービスのご利用および音源の出力に際し、ロイヤリティや利用料は発生しません。',
      },
      {
        title: '第3条（著作権紛争および絶対的免責）',
        body: '1. 本スタジオで録音・出力した音源をYouTube、ゲーム、配信等どこで使用するかはユーザー自身の自由ですが、これに起因して発生する著作権紛争、アカウント停止・ペナルティ、収益化制限等のあらゆる結果および責任はすべてユーザー自身に帰属し、運営者（JYE SOUNDS）はこれに対して一切の法的責任を負いません。\n2. YouTubeのContent IDシステムによる警告、サードパーティからの権利侵害申し立て、配信プラットフォームのアカウント凍結などについて、運営者は一切の保証や損害賠償、紛争介入義務を負いません。',
      },
      {
        title: '第4条（保証の否認および変更）',
        body: '1. 本サービスは「現状有姿（AS-IS）」で提供され、中断なき稼働や特定目的への適合性を保証するものではありません。\n2. 運営者は事前の告知なくサービスの変更や一時停止を行う権利を有します。',
      },
    ],
    privacyTitle: 'プライバシーポリシー',
    privacySubtitle: 'JYE SOUNDSは個人情報の保護を徹底しており、個人データを一切収集しません。',
    privacyArticles: [
      {
        title: '1. 個人情報の非収集',
        body: '8-BIT SFX LABは会員登録やログインを要求しません。氏名、メールアドレス、電話番号、IPアドレス等の個人情報をサーバーに収集・保存することは一切ありません。',
      },
      {
        title: '2. 100%クライアント側処理（Web Audio API）',
        body: 'すべての音響合成、パラメータ変更、WAVファイルのエンコードはお客様のブラウザメモリ内だけで実行されます。作成された音声データが外部サーバーへ送信されることはありません。',
      },
      {
        title: '3. ローカルストレージ（LocalStorage）の利用',
        body: '作成履歴、お気に入り設定、言語選択はお使いの端末のブラウザ内LocalStorageにのみ保存されます。ブラウザ設定よりいつでも初期化可能です。',
      },
      {
        title: '4. 第三者への提供・追跡の禁止',
        body: 'ユーザーの行動履歴やデータを第三者の広告事業者へ販売・提供することは一切ありません。',
      },
      {
        title: '5. お問い合わせ',
        body: 'JYE SOUNDSに関する公式情報は、公式ウェブサイト（jyesounds.com）をご覧ください。',
      },
    ],
    guideTitle: '8-BIT SFX LAB 利用ガイド',
    guideSubtitle: '直感的な操作で本格的なレトロゲームサウンドを作成できます。',
    guideArticles: [
      {
        title: '1. 波形選択と18種のプリセット',
        body: 'Square（矩形波・ファミコンメロディ）、Sawtooth（鋸歯状波・鋭いリード）、Triangle（三角波・重低音）、Noise（ノイズ・爆発/打撃）、Sine（サイン波・ベル）から波形を選び、プリセットで即座に試聴できます。',
      },
      {
        title: '2. インタラクティブ波形エディタ',
        body: 'ピッチ軌跡（Pitch）と音量エンベロープ（Envelope）タブで、ハンドルをドラッグするかペンモードで直接曲線を描いて、直感的に音色をデザインできます。',
      },
      {
        title: '3. ヴィンテージエフェクト＆ピアノ試聴',
        body: 'ビブラート、フィルター、ビットクラッシャー（4/8ビット低減）でレトロ感を演出し、下部のピアノ鍵盤で各音階での響きを確認できます。',
      },
      {
        title: '4. WAVダウンロードとショートカット',
        body: '44.1kHz（高音質）または22kHz（レトロ）を選択してWAV保存。ショートカット：[SPACE]で再生、[M]で微変形、[R]でランダム生成が可能です。',
      },
    ],
    closeBtn: '確認して閉じる',
    officialSiteNote: '公式ウェブサイト: jyesounds.com · JYE SOUNDS LABS',
  },
  'zh-TW': {
    modalTitle: '服務條款 · 使用指南 · 隱私權政策',
    headerButton: '條款與指南',
    tabTerms: '服務條款與免責聲明',
    tabPrivacy: '隱私權政策',
    tabGuide: '工作室使用指南',
    disclaimerBadge: '重要法律告知 (LEGAL DISCLAIMER)',
    disclaimerTitle: '版權與法律免責聲明 (Disclaimer)',
    disclaimerText:
      '使用者可全權自由將從本工作室錄製、匯出的音訊使用於 YouTube、遊戲、直播等任何媒介；但由此引發的任何版權爭議、帳號懲處、營利資格受限等一切結果與法律責任，均完全由使用者本人承擔，營運方（JYE SOUNDS）對此不承擔任何法律責任。',
    disclaimerNotice:
      '※ 使用者可自由將音訊應用於商業與非商業專案，但所有衍生之法律責任與平台懲處均由使用者自行全權承擔。',
    termsTitle: 'JYE SOUNDS 服務條款',
    termsSubtitle: '8-BIT SFX LAB 服務之基本使用規範與法律權益說明。',
    termsArticles: [
      {
        title: '第一條（目的與服務性質）',
        body: '本條款旨在規範 JYE SOUNDS 所提供之 8-BIT SFX LAB（純前端 Web Audio 復古音效合成器）之使用權利與義務。本服務為即時客戶端音訊合成工具。',
      },
      {
        title: '第二條（音效生成與授權權利）',
        body: '1. 使用者可自由將透過本工作室合成與匯出之 WAV 音訊檔案應用於遊戲、YouTube 影片、動畫、直播等商業及非商業創作專案中。\n2. 本服務不收取基礎音效合成與檔案匯出之任何版稅或訂閱費用。',
      },
      {
        title: '第三條（版權爭議與絕對免責聲明）',
        body: '1. 使用者可全權自由將從本工作室錄製、匯出的音訊使用於 YouTube、遊戲、直播等任何媒介；但由此引發的任何版權爭議、帳號懲處、營利資格受限等一切結果與法律責任，均完全由使用者本人承擔，營運方（JYE SOUNDS）對此不承擔任何法律責任。\n2. 對於 YouTube Content ID 系統聲明、第三方提起的智慧財產權爭議、或影音平台之懲處措施，營運方不提供任何法律擔保、賠償或抗辯協助。',
      },
      {
        title: '第四條（免責與服務變更）',
        body: '1. 本服務以「現狀（AS-IS）」提供，不對服務永不中斷或完全符合特定目的提供保證。\n2. 營運方保留因系統維護或功能更新而變更服務內容之權利。',
      },
    ],
    privacyTitle: '隱私權政策 (Privacy Policy)',
    privacySubtitle: 'JYE SOUNDS 重視您的個人隱私，本服務絕不收集任何個人識別資料。',
    privacyArticles: [
      {
        title: '1. 不收集個人資訊',
        body: '8-BIT SFX LAB 無須註冊或登入帳號，我們絕不在伺服器端收集或儲存使用者的姓名、電子郵件、電話號碼、IP 位址或付款資訊。',
      },
      {
        title: '2. 100% 客戶端瀏覽器運算（Web Audio API）',
        body: '所有聲音波形合成、參數調整、濾波運算及 WAV 檔案編碼均僅在您的瀏覽器記憶體中即時進行，生成的音訊資料絕不會被上傳至外部伺服器。',
      },
      {
        title: '3. 本地儲存空間（LocalStorage）之使用',
        body: '音效編輯歷史、收藏清單及語言喜好僅儲存於使用者設備的瀏覽器 LocalStorage 中，使用者可隨時透過瀏覽器設定進行清除。',
      },
      {
        title: '4. 禁止第三方追蹤與數據販售',
        body: '營運方絕不向任何第三方廣告商或資料經紀商出售、出租或分享使用者資料。',
      },
      {
        title: '5. 諮詢途徑',
        body: '有關 JYE SOUNDS 之官方訊息與諮詢，請造訪官方網站：jyesounds.com。',
      },
    ],
    guideTitle: '8-BIT SFX LAB 快速指南',
    guideSubtitle: '輕鬆幾步即可製作正統 8-Bit 像素懷舊遊戲音效。',
    guideArticles: [
      {
        title: '1. 波形選擇與 18 種經典預設',
        body: '可選用 Square（紅白機經典旋律）、Sawtooth（街機尖銳導奏）、Triangle（厚實低音）、Noise（爆炸撞擊）、Sine（柔和鈴音），或直接點擊上方 18 款預設即時試聽。',
      },
      {
        title: '2. 即時波形圖表編輯器',
        body: '在音高軌跡（Pitch）與音量包絡（Envelope）標籤頁中，拖動圓形控制點或以畫筆模式隨手繪製曲線，自由雕刻專屬音頻形狀。',
      },
      {
        title: '3. 復古效果與音高試聽',
        body: '調整顫音、濾波器與降位元效果（Bit Crusher 最低可至 4-bit），並利用底部的互動式鋼琴鍵盤測試不同音階下的音色表現。',
      },
      {
        title: '4. 無損 WAV 下載與快捷鍵',
        body: '支援 44.1kHz 高音質與 22kHz 復古音質 WAV 匯出。快捷鍵支援：[空白鍵] 播放、[M] 微調變異、[R] 隨機生成。',
      },
    ],
    closeBtn: '確認並關閉',
    officialSiteNote: '官方網站: jyesounds.com · JYE SOUNDS LABS',
  },
  'en-SG': {
    modalTitle: 'Terms of Service · User Guide · Privacy Policy',
    headerButton: 'Terms & Guide',
    tabTerms: 'Terms of Service & Disclaimer',
    tabPrivacy: 'Privacy Policy',
    tabGuide: 'Studio User Guide',
    disclaimerBadge: 'CRITICAL LEGAL NOTICE',
    disclaimerTitle: 'Copyright & Legal Disclaimer',
    disclaimerText:
      'You are entirely free to use any audio recorded or exported from this studio wherever you wish, including on YouTube, in games, broadcasts, and other media. However, any and all consequences and responsibilities—including copyright disputes, account penalties, and monetization restrictions—rest entirely with the user, and the operator (JYE SOUNDS) assumes no legal liability whatsoever.',
    disclaimerNotice:
      '※ While you are free to utilize synthesized audio in both commercial and non-commercial productions, all legal liabilities remain solely with you.',
    termsTitle: 'JYE SOUNDS Terms of Service',
    termsSubtitle: 'Operating terms and legal conditions for 8-BIT SFX LAB.',
    termsArticles: [
      {
        title: 'Section 1 (Nature of Service)',
        body: 'These Terms govern the use of the 8-BIT SFX LAB synthesis tool provided by JYE SOUNDS, running entirely in-browser via the Web Audio API.',
      },
      {
        title: 'Section 2 (Permitted Usage & Licensing)',
        body: '1. You may freely use audio files (WAV) generated through this studio in commercial and non-commercial productions including indie games, YouTube videos, and streaming channels.\n2. No licensing fees or royalties are demanded for baseline exports.',
      },
      {
        title: 'Section 3 (Copyright Disputes & Absolute Disclaimer)',
        body: '1. You are entirely free to use any audio recorded or exported from this studio wherever you wish, including on YouTube, in games, broadcasts, and other media. However, any and all consequences and responsibilities—including copyright disputes, account penalties, and monetization restrictions—rest entirely with the user, and the operator (JYE SOUNDS) assumes no legal liability whatsoever.\n2. The operator assumes no liability regarding YouTube Content ID claims, copyright strikes, or platform-level sanctions.',
      },
      {
        title: 'Section 4 (Limitation of Liability)',
        body: '1. The service is provided "AS-IS" without warranties of any kind.\n2. The operator reserves the right to modify service features at any time without prior notice.',
      },
    ],
    privacyTitle: 'Privacy Policy',
    privacySubtitle: 'Zero personal data collection policy for all users.',
    privacyArticles: [
      {
        title: '1. No Personal Data Collected',
        body: '8-BIT SFX LAB does not require registration or personal identification. We do not gather or log personal data on servers.',
      },
      {
        title: '2. 100% Client-Side Computation',
        body: 'All waveform rendering and WAV generation occur strictly in your browser memory. No audio is sent to external servers.',
      },
      {
        title: '3. LocalStorage Usage',
        body: 'History and preferences are saved only in your device LocalStorage and can be wiped anytime through browser settings.',
      },
      {
        title: '4. No Tracking',
        body: 'We do not track users across the web or sell information to third parties.',
      },
      {
        title: '5. Contact Information',
        body: 'For official updates, visit jyesounds.com.',
      },
    ],
    guideTitle: '8-BIT SFX LAB Guide',
    guideSubtitle: 'Fast guide to creating 8-bit retro audio.',
    guideArticles: [
      {
        title: '1. Waveforms & Presets',
        body: 'Select Square, Sawtooth, Triangle, Noise, or Sine, or choose from 18 presets to audition retro sound effects.',
      },
      {
        title: '2. Interactive Graph Editor',
        body: 'Toggle between Pitch and Envelope to draw or drag custom synthesis curves.',
      },
      {
        title: '3. Vintage Effects & Piano Test',
        body: 'Add Vibrato, Filters, and Bit Crushing, then test keys on the interactive piano keyboard.',
      },
      {
        title: '4. WAV Download & Shortcuts',
        body: 'Export WAV files at 44.1kHz or 22kHz. Use [SPACE] to Play, [M] to Mutate, and [R] to Randomise.',
      },
    ],
    closeBtn: 'Understood & Close',
    officialSiteNote: 'Official Website: jyesounds.com · JYE SOUNDS LABS',
  },
  pt: {
    modalTitle: 'Termos de Serviço · Guia do Usuário · Política de Privacidade',
    headerButton: 'Termos e Guia',
    tabTerms: 'Termos de Serviço e Isenção Legal',
    tabPrivacy: 'Política de Privacidade',
    tabGuide: 'Guia do Estúdio',
    disclaimerBadge: 'AVISO LEGAL IMPORTANTE',
    disclaimerTitle: 'Aviso de Direitos Autorais e Isenção Legal (Disclaimer)',
    disclaimerText:
      'Você é totalmente livre para usar qualquer áudio gravado ou exportado deste estúdio onde desejar, incluindo no YouTube, em jogos, transmissões e outras mídias. No entanto, toda e qualquer consequência e responsabilidade — incluindo disputas de direitos autorais, penalidades de conta e restrições de monetização — cabe inteiramente ao usuário, e o operador (JYE SOUNDS) não assume qualquer responsabilidade legal.',
    disclaimerNotice:
      '※ Você pode usar livremente o áudio em projetos comerciais e não comerciais, mas todas as responsabilidades legais e consequências em plataformas pertencem exclusivamente a você.',
    termsTitle: 'Termos de Serviço JYE SOUNDS',
    termsSubtitle: 'Condições gerais de uso e diretrizes legais do 8-BIT SFX LAB.',
    termsArticles: [
      {
        title: 'Artigo 1 (Objeto e Natureza)',
        body: 'Estes termos regulam a utilização do sintetizador 8-BIT SFX LAB fornecido por JYE SOUNDS, operado inteiramente no navegador via Web Audio API.',
      },
      {
        title: 'Artigo 2 (Geração de Áudio e Licenciamento)',
        body: '1. Os usuários têm total liberdade para incorporar arquivos de áudio (WAV) sintetizados neste estúdio em obras comerciais e não comerciais, como jogos, vídeos e transmissões.\n2. O serviço não cobra royalties nem assinaturas para geração e exportação básica de áudio.',
      },
      {
        title: 'Artigo 3 (Disputas de Direitos Autorais e Isenção Absoluta)',
        body: '1. Você é totalmente livre para usar qualquer áudio gravado ou exportado deste estúdio onde desejar, incluindo no YouTube, em jogos, transmissões e outras mídias. No entanto, toda e qualquer consequência e responsabilidade — incluindo disputas de direitos autorais, penalidades de conta e restrições de monetização — cabe inteiramente ao usuário, e o operador (JYE SOUNDS) não assume qualquer responsabilidade legal.\n2. O operador não oferece garantias nem assistência jurídica contra reivindicações de Content ID do YouTube ou sanções de plataformas terceiras.',
      },
      {
        title: 'Artigo 4 (Isenção de Garantias)',
        body: '1. O serviço é fornecido "NO ESTADO EM QUE SE ENCONTRA" (AS-IS), sem garantias de operação ininterrupta.\n2. O operador reserva-se o direito de atualizar ou modificar recursos sem aviso prévio.',
      },
    ],
    privacyTitle: 'Política de Privacidade',
    privacySubtitle: 'Compromisso com privacidade total: nenhum dado pessoal é coletado.',
    privacyArticles: [
      {
        title: '1. Nenhum Dado Pessoal Coletado',
        body: 'Não exigimos cadastro ou login. Jamais coletamos ou armazenamos nomes, e-mails, endereços IP ou dados de pagamento em servidores.',
      },
      {
        title: '2. Processamento 100% no Cliente (Web Audio API)',
        body: 'Toda síntese de som e codificação de arquivos WAV ocorrem na memória do seu navegador. Nenhum áudio é enviado para servidores externos.',
      },
      {
        title: '3. Uso de Armazenamento Local (LocalStorage)',
        body: 'O histórico de sons, favoritos e preferências de idioma ficam salvos exclusivamente no LocalStorage do seu navegador.',
      },
      {
        title: '4. Sem Rastreamento por Terceiros',
        body: 'Não vendemos nem compartilhamos informações com plataformas de publicidade ou terceiros.',
      },
      {
        title: '5. Informações de Contato',
        body: 'Para informações oficiais sobre JYE SOUNDS, acesse jyesounds.com.',
      },
    ],
    guideTitle: 'Guia do 8-BIT SFX LAB',
    guideSubtitle: 'Crie efeitos sonoros retrô autênticos com facilidade.',
    guideArticles: [
      {
        title: '1. Formas de Onda e 18 Presets',
        body: 'Escolha entre Square, Sawtooth, Triangle, Noise ou Sine, ou clique em qualquer um dos 18 presets para ouvir instantaneamente.',
      },
      {
        title: '2. Editor de Gráficos Interativo',
        body: 'Alterne entre Trajetória de Pitch e Envelope para desenhar curvas sonoras personalizadas e ajustar o ADSR.',
      },
      {
        title: '3. Efeitos Vintage e Teste no Piano',
        body: 'Aplique Vibrato, Filtros e Bit Crusher (até 4 bits) e teste a resposta do som nas teclas do teclado de piano.',
      },
      {
        title: '4. Exportação WAV e Atalhos',
        body: 'Exporte em WAV sem perdas a 44.1kHz ou 22kHz. Use os atalhos: [ESPAÇO] para Tocar, [M] para Mutar/Variar e [R] para Aleatório.',
      },
    ],
    closeBtn: 'Entendido e Fechar',
    officialSiteNote: 'Site oficial: jyesounds.com · JYE SOUNDS LABS',
  },
  de: {
    modalTitle: 'Nutzungsbedingungen · Benutzerhandbuch · Datenschutzerklärung',
    headerButton: 'Bedingungen & Guide',
    tabTerms: 'Nutzungsbedingungen & Haftungsausschluss',
    tabPrivacy: 'Datenschutzerklärung',
    tabGuide: 'Studio-Handbuch',
    disclaimerBadge: 'WICHTIGER RECHTLICHER HINWEIS',
    disclaimerTitle: 'Urheberrechts- und Haftungsausschluss (Disclaimer)',
    disclaimerText:
      'Es steht den Nutzern völlig frei, die in diesem Studio aufgenommenen oder exportierten Audiospuren nach Belieben zu verwenden, einschließlich auf YouTube, in Spielen, Streams oder anderen Medien. Sämtliche Konsequenzen und Verantwortlichkeiten – einschließlich Urheberrechtsstreitigkeiten, Kontosanktionen oder Einschränkungen der Monetarisierung – liegen jedoch vollumfänglich beim Nutzer selbst. Der Betreiber (JYE SOUNDS) übernimmt hierfür keinerlei rechtliche Haftung.',
    disclaimerNotice:
      '※ Sie können die synthetisierten Audiodateien frei für kommerzielle und private Werke nutzen, sämtliche rechtlichen Verpflichtungen verbleiben jedoch ausschließlich beim Nutzer.',
    termsTitle: 'JYE SOUNDS Nutzungsbedingungen',
    termsSubtitle: 'Rechtliche Rahmenbedingungen für die Nutzung des 8-BIT SFX LAB.',
    termsArticles: [
      {
        title: '§ 1 (Zweck und Beschaffenheit)',
        body: 'Diese Bedingungen regeln die Nutzung des webbasierten 8-BIT SFX LAB Synthesizers von JYE SOUNDS, der über die Web Audio API im Browser ausgeführt wird.',
      },
      {
        title: '§ 2 (Klangerzeugung und Lizenzrechte)',
        body: '1. Nutzern steht es frei, die erzeugten WAV-Dateien in kommerziellen und nicht-kommerziellen Projekten (Spiele, Videos, Streams etc.) zu verwenden.\n2. Für die Erzeugung und den Download fallen keine Lizenzgebühren an.',
      },
      {
        title: '§ 3 (Urheberrechtsstreitigkeiten und Haftungsausschluss)',
        body: '1. Es steht den Nutzern völlig frei, die in diesem Studio aufgenommenen oder exportierten Audiospuren nach Belieben zu verwenden, einschließlich auf YouTube, in Spielen, Streams oder anderen Medien. Sämtliche Konsequenzen und Verantwortlichkeiten – einschließlich Urheberrechtsstreitigkeiten, Kontosanktionen oder Einschränkungen der Monetarisierung – liegen jedoch vollumfänglich beim Nutzer selbst. Der Betreiber (JYE SOUNDS) übernimmt hierfür keinerlei rechtliche Haftung.\n2. Der Betreiber leistet keine Gewähr und keinen rechtlichen Beistand bei YouTube Content-ID-Meldungen oder Kontosperrungen.',
      },
      {
        title: '§ 4 (Gewährleistungsausschluss)',
        body: '1. Der Dienst wird "WIE BESEHEN" (AS-IS) ohne Zusicherung unterbrechungsfreier Verfügbarkeit bereitgestellt.\n2. Der Betreiber behält sich Änderungen der Funktionen ohne Vorankündigung vor.',
      },
    ],
    privacyTitle: 'Datenschutzerklärung',
    privacySubtitle: 'Vollständiger Schutz Ihrer Daten: Keine Erfassung personenbezogener Daten.',
    privacyArticles: [
      {
        title: '1. Keine Erhebung personenbezogener Daten',
        body: 'Für die Nutzung ist weder Registrierung noch Login erforderlich. Wir speichern keine Namen, E-Mails, IP-Adressen oder Zahlungsdaten.',
      },
      {
        title: '2. 100% clientseitige Verarbeitung (Web Audio API)',
        body: 'Alle Audiosynthesen und WAV-Kodierungen erfolgen lokal im Arbeitsspeicher Ihres Browsers. Keine Daten werden an Server übertragen.',
      },
      {
        title: '3. Lokaler Speicher (LocalStorage)',
        body: 'Verlaufsdaten, Favoriten und Spracheinstellungen werden ausschließlich im LocalStorage Ihres Endgeräts gesichert.',
      },
      {
        title: '4. Keine Drittanbieter-Weitergabe',
        body: 'Wir verkaufen keine Daten an Werbenetzwerke und verwenden keine Tracking-Mechanismen.',
      },
      {
        title: '5. Kontakt',
        body: 'Offizielle Informationen finden Sie unter jyesounds.com.',
      },
    ],
    guideTitle: '8-BIT SFX LAB Anleitung',
    guideSubtitle: 'Retro-Soundeffekte mit wenigen Klicks gestalten.',
    guideArticles: [
      {
        title: '1. Wellenformen & Presets',
        body: 'Wählen Sie zwischen Square, Sawtooth, Triangle, Noise und Sine, oder nutzen Sie die 18 Presets zum schnellen Anhören.',
      },
      {
        title: '2. Wellenform-Grafikeditor',
        body: 'Wechseln Sie zwischen Tonhöhenverlauf und Hüllkurve, um Soundkurven per Ziehpunkten oder Stift frei zu formen.',
      },
      {
        title: '3. Vintage-Effekte & Klaviertest',
        body: 'Verfeinern Sie Sounds mit Vibrato, Filtern und Bit-Crusher und testen Sie sie auf der interaktiven Klaviertastatur.',
      },
      {
        title: '4. WAV-Export & Tastenkombinationen',
        body: 'Exportieren Sie WAV-Dateien in 44.1kHz oder 22kHz. Tasten: [LEERTASTE] Abspielen, [M] Variieren, [R] Zufall.',
      },
    ],
    closeBtn: 'Verstanden & Schließen',
    officialSiteNote: 'Offizielle Website: jyesounds.com · JYE SOUNDS LABS',
  },
  it: {
    modalTitle: 'Termini di Servizio · Guida Utente · Informativa sulla Privacy',
    headerButton: 'Termini e Guida',
    tabTerms: 'Termini di Servizio e Clausola di Manleva',
    tabPrivacy: 'Informativa sulla Privacy',
    tabGuide: 'Guida dello Studio',
    disclaimerBadge: 'AVVISO LEGALE IMPORTANTE',
    disclaimerTitle: "Diritto d'Autore e Clausola di Esclusione di Responsabilità (Disclaimer)",
    disclaimerText:
      'Sei completamente libero di utilizzare qualsiasi audio registrato o esportato da questo studio ovunque desideri, inclusi YouTube, videogiochi, trasmissioni o altri media. Tuttavia, tutte le conseguenze e le responsabilità — comprese dispute sul copyright, sanzioni sull’account e limitazioni alla monetizzazione — ricadono interamente sull’utente, e il gestore (JYE SOUNDS) non si assume alcuna responsabilità legale al riguardo.',
    disclaimerNotice:
      '※ L’utilizzo dell’audio è libero sia per scopi commerciali che non commerciali, ma ogni responsabilità legale e su piattaforme terze spetta solo all’utente.',
    termsTitle: 'Termini di Servizio JYE SOUNDS',
    termsSubtitle: 'Condizioni generali e parametri legali per l’uso di 8-BIT SFX LAB.',
    termsArticles: [
      {
        title: 'Articolo 1 (Finalità e Natura del Servizio)',
        body: 'I presenti Termini disciplinano l’uso del sintetizzatore 8-BIT SFX LAB fornito da JYE SOUNDS, elaborato nel browser tramite Web Audio API.',
      },
      {
        title: 'Articolo 2 (Creazione Audio e Licenza)',
        body: '1. L’utente può impiegare liberamente i file WAV generati in progetti commerciali e non commerciali (videogiochi, video, podcast).\n2. Non sono previste royalty per la generazione o l’esportazione dei file sonori.',
      },
      {
        title: 'Articolo 3 (Controversie sul Copyright ed Esclusione di Responsabilità)',
        body: '1. Sei completamente libero di utilizzare qualsiasi audio registrato o esportato da questo studio ovunque desideri, inclusi YouTube, videogiochi, trasmissioni o altri media. Tuttavia, tutte le conseguenze e le responsabilità — comprese dispute sul copyright, sanzioni sull’account e limitazioni alla monetizzazione — ricadono interamente sull’utente, e il gestore (JYE SOUNDS) non si assume alcuna responsabilità legale al riguardo.\n2. Il gestore non offre garanzie né tutela legale per reclami Content ID o sanzioni su piattaforme terze.',
      },
      {
        title: 'Articolo 4 (Esclusione di Garanzie)',
        body: '1. Il servizio è fornito "COSÌ COM’È" (AS-IS) senza garanzie di disponibilità continua.\n2. Il gestore si riserva il diritto di modificare le funzionalità senza preavviso.',
      },
    ],
    privacyTitle: 'Informativa sulla Privacy',
    privacySubtitle: 'Tutela assoluta della privacy: nessun dato personale viene raccolto.',
    privacyArticles: [
      {
        title: '1. Nessun Dato Personale Raccolto',
        body: 'Non è richiesta alcuna registrazione o accesso. Non raccogliamo né memorizziamo nomi, email, indirizzi IP o dati di pagamento.',
      },
      {
        title: '2. Elaborazione 100% Lato Client (Web Audio API)',
        body: 'Tutte le sintesi audio e le codifiche WAV avvengono nella memoria locale del browser. Nessun file audio viene inviato a server esterni.',
      },
      {
        title: '3. Utilizzo di LocalStorage',
        body: 'La cronologia dei suoni, i preferiti e la lingua sono conservati esclusivamente nel LocalStorage del browser dell’utente.',
      },
      {
        title: '4. Nessun Tracciamento',
        body: 'Non condividiamo né vendiamo informazioni a piattaforme pubblicitarie terze.',
      },
      {
        title: '5. Contatti',
        body: 'Per maggiori informazioni su JYE SOUNDS, visita il sito ufficiale jyesounds.com.',
      },
    ],
    guideTitle: 'Guida Rapida 8-BIT SFX LAB',
    guideSubtitle: 'Crea effetti sonori chiptune in pochi semplici passaggi.',
    guideArticles: [
      {
        title: '1. Forme d’onda e Preset',
        body: 'Scegli tra Square, Sawtooth, Triangle, Noise e Sine o clicca sui 18 preset per ascoltare campioni immediati.',
      },
      {
        title: '2. Editor Grafico Interattivo',
        body: 'Modifica la traiettoria del pitch e l’inviluppo del volume trascinando i punti di controllo o disegnando a mano libera.',
      },
      {
        title: '3. Effetti Vintage e Tastiera Piano',
        body: 'Regola vibrato, filtri e bit crusher e sperimenta le note musicali sulla tastiera pianistica interattiva.',
      },
      {
        title: '4. Download WAV e Scorciatoie',
        body: 'Scarica file WAV a 44.1kHz o 22kHz. Tasti rapidi: [SPAZIO] per Riprodurre, [M] per Variare, [R] per Suono Casuale.',
      },
    ],
    closeBtn: 'Ho Capito e Chiudi',
    officialSiteNote: 'Sito ufficiale: jyesounds.com · JYE SOUNDS LABS',
  },
  id: {
    modalTitle: 'Ketentuan Layanan · Panduan Pengguna · Kebijakan Privasi',
    headerButton: 'Ketentuan & Panduan',
    tabTerms: 'Ketentuan Layanan & Penafian',
    tabPrivacy: 'Kebijakan Privasi',
    tabGuide: 'Panduan Studio',
    disclaimerBadge: 'PEMBERITAHUAN HUKUM PENTING',
    disclaimerTitle: 'Hak Cipta & Penafian Hukum (Disclaimer)',
    disclaimerText:
      'Anda sepenuhnya bebas menggunakan audio apa pun yang direkam atau diekspor dari studio ini di mana pun Anda inginkan, termasuk di YouTube, dalam game, siaran, dan media lainnya. Namun, segala akibat dan tanggung jawab—termasuk perselisihan hak cipta, sanksi akun, dan pembatasan monetisasi—sepenuhnya berada di tangan pengguna, dan pengelola (JYE SOUNDS) tidak bertanggung jawab secara hukum dalam bentuk apa pun.',
    disclaimerNotice:
      '※ Anda bebas memakai audio untuk proyek komersial maupun non-komersial, namun segala konsekuensi hukum sepenuhnya ditanggung oleh pengguna.',
    termsTitle: 'Ketentuan Layanan JYE SOUNDS',
    termsSubtitle: 'Aturan pemakaian dan ketentuan hukum penggunaan 8-BIT SFX LAB.',
    termsArticles: [
      {
        title: 'Pasal 1 (Tujuan dan Sifat Layanan)',
        body: 'Ketentuan ini mengatur penggunaan 8-BIT SFX LAB dari JYE SOUNDS, yakni synthesizer audio berbasis peramban Web Audio API.',
      },
      {
        title: 'Pasal 2 (Pembuatan Audio dan Lisensi)',
        body: '1. Pengguna memiliki kebebasan penuh menggunakan file WAV hasil sintesis dalam karya komersial maupun non-komersial seperti game, video YouTube, dan siaran.\n2. Layanan ini tidak mengenakan royalti atau biaya langganan untuk pembuatan suara dasar.',
      },
      {
        title: 'Pasal 3 (Sengketa Hak Cipta dan Penafian Mutlak)',
        body: '1. Anda sepenuhnya bebas menggunakan audio apa pun yang direkam atau diekspor dari studio ini di mana pun Anda inginkan, termasuk di YouTube, dalam game, siaran, dan media lainnya. Namun, segala akibat dan tanggung jawab—termasuk perselisihan hak cipta, sanksi akun, dan pembatasan monetisasi—sepenuhnya berada di tangan pengguna, dan pengelola (JYE SOUNDS) tidak bertanggung jawab secara hukum dalam bentuk apa pun.\n2. Pengelola tidak memberikan jaminan atau ganti rugi atas klaim Content ID YouTube atau sanksi dari pihak ketiga.',
      },
      {
        title: 'Pasal 4 (Batasan Tanggung Jawab)',
        body: '1. Layanan disediakan "SEBAGAIMANA ADANYA" (AS-IS) tanpa jaminan ketersediaan tanpa gangguan.\n2. Pengelola berhak memperbarui fitur sewaktu-waktu tanpa pemberitahuan sebelumnya.',
      },
    ],
    privacyTitle: 'Kebijakan Privasi',
    privacySubtitle: 'Kami menghormati privasi Anda: sama sekali tidak mengumpulkan data pribadi.',
    privacyArticles: [
      {
        title: '1. Tidak Mengumpulkan Data Pribadi',
        body: 'Tidak ada pendaftaran atau login. Kami tidak pernah mengumpulkan atau menyimpan nama, email, alamat IP, atau data pembayaran.',
      },
      {
        title: '2. Pemrosesan 100% Sisi Klien (Web Audio API)',
        body: 'Semua sintesis gelombang dan ekspor WAV berjalan di memori peramban Anda. Tidak ada audio yang diunggah ke server eksternal.',
      },
      {
        title: '3. Penggunaan Penyimpanan Lokal (LocalStorage)',
        body: 'Riwayat audio, daftar favorit, dan pilihan bahasa hanya tersimpan di LocalStorage peramban lokal perangkat Anda.',
      },
      {
        title: '4. Tidak Ada Pelacakan Pihak Ketiga',
        body: 'Kami tidak menjual atau membagikan data kepada pihak ketiga atau pengiklan.',
      },
      {
        title: '5. Kontak dan Informasi',
        body: 'Kunjungi situs resmi kami di jyesounds.com untuk informasi lebih lanjut.',
      },
    ],
    guideTitle: 'Panduan Penggunaan 8-BIT SFX LAB',
    guideSubtitle: 'Buat efek suara 8-bit retro autentik dengan mudah.',
    guideArticles: [
      {
        title: '1. Bentuk Gelombang & 18 Preset',
        body: 'Pilih antara Square, Sawtooth, Triangle, Noise, dan Sine, atau klik 18 preset di bagian atas untuk mendengarkan suara seketika.',
      },
      {
        title: '2. Editor Grafik Interaktif',
        body: 'Beralih antara tab Lintasan Nada (Pitch) dan Envelope untuk menggambar atau menggeser kurva frekuensi dan volume.',
      },
      {
        title: '3. Efek Vintage & Uji Piano',
        body: 'Gunakan Vibrato, Filter, dan Bit Crusher untuk rasa retro, lalu uji nada menggunakan tuts keyboard piano interaktif.',
      },
      {
        title: '4. Unduh WAV & Pintasan Tombol',
        body: 'Simpan file WAV berkualitas 44.1kHz atau 22kHz. Pintasan keyboard: [SPASI] Putar, [M] Variasi, [R] Acak.',
      },
    ],
    closeBtn: 'Paham & Tutup',
    officialSiteNote: 'Situs resmi: jyesounds.com · JYE SOUNDS LABS',
  },
  vi: {
    modalTitle: 'Điều khoản Dịch vụ · Hướng dẫn Sử dụng · Chính sách Bảo mật',
    headerButton: 'Điều khoản & Hướng dẫn',
    tabTerms: 'Điều khoản Dịch vụ & Miễn trừ',
    tabPrivacy: 'Chính sách Bảo mật',
    tabGuide: 'Hướng dẫn Studio',
    disclaimerBadge: 'THÔNG BÁO PHÁP LÝ QUAN TRỌNG',
    disclaimerTitle: 'Bản quyền & Tuyên bố Miễn trừ Trách nhiệm Pháp lý (Disclaimer)',
    disclaimerText:
      'Người dùng hoàn toàn có quyền tự do sử dụng bất kỳ âm thanh nào được ghi âm hoặc xuất từ studio này ở bất kỳ đâu, bao gồm YouTube, trò chơi, phát sóng và các phương tiện truyền thông khác. Tuy nhiên, mọi hậu quả và trách nhiệm phát sinh—bao gồm tranh chấp bản quyền, biện pháp xử lý tài khoản và hạn chế kiếm tiền—hoàn toàn thuộc về người dùng, và nhà vận hành (JYE SOUNDS) không chịu bất kỳ trách nhiệm pháp lý nào.',
    disclaimerNotice:
      '※ Người dùng có toàn quyền sử dụng âm thanh cho các dự án thương mại và phi thương mại, tuy nhiên mọi trách nhiệm pháp lý hoàn toàn thuộc về người dùng.',
    termsTitle: 'Điều khoản Dịch vụ JYE SOUNDS',
    termsSubtitle: 'Quy định sử dụng và giới hạn pháp lý của 8-BIT SFX LAB.',
    termsArticles: [
      {
        title: 'Điều 1 (Mục đích và Bản chất Dịch vụ)',
        body: 'Các điều khoản này điều chỉnh việc sử dụng công cụ tổng hợp âm thanh 8-BIT SFX LAB của JYE SOUNDS, hoạt động trên trình duyệt thông qua Web Audio API.',
      },
      {
        title: 'Điều 2 (Tạo Âm thanh và Cấp phép)',
        body: '1. Người dùng có toàn quyền áp dụng các tệp âm thanh (WAV) tạo từ studio này vào các tác phẩm thương mại và phi thương mại như game, video YouTube, phát trực tiếp.\n2. Dịch vụ không thu phí bản quyền hoặc phí định kỳ đối với việc tạo âm thanh cơ bản.',
      },
      {
        title: 'Điều 3 (Tranh chấp Bản quyền và Miễn trừ Tuyệt đối)',
        body: '1. Người dùng hoàn toàn có quyền tự do sử dụng bất kỳ âm thanh nào được ghi âm hoặc xuất từ studio này ở bất kỳ đâu, bao gồm YouTube, trò chơi, phát sóng và các phương tiện truyền thông khác. Tuy nhiên, mọi hậu quả và trách nhiệm phát sinh—bao gồm tranh chấp bản quyền, biện pháp xử lý tài khoản và hạn chế kiếm tiền—hoàn toàn thuộc về người dùng, và nhà vận hành (JYE SOUNDS) không chịu bất kỳ trách nhiệm pháp lý nào.\n2. Nhà vận hành không chịu trách nhiệm hay đại diện pháp lý đối với khiếu nại Content ID trên YouTube hoặc hình phạt tài khoản từ bên thứ ba.',
      },
      {
        title: 'Điều 4 (Giới hạn Trách nhiệm)',
        body: '1. Dịch vụ được cung cấp "NGUYÊN TRẠNG" (AS-IS) và không có cam kết hoạt động liên tục không gián đoạn.\n2. Nhà vận hành có quyền thay đổi chức năng mà không cần báo trước.',
      },
    ],
    privacyTitle: 'Chính sách Bảo mật',
    privacySubtitle: 'Bảo vệ quyền riêng tư tuyệt đối: Không thu thập bất kỳ dữ liệu cá nhân nào.',
    privacyArticles: [
      {
        title: '1. Không thu thập Dữ liệu Cá nhân',
        body: 'Không yêu cầu đăng ký hay đăng nhập. Chúng tôi không bao giờ thu thập hay lưu trữ tên, email, địa chỉ IP hay thông tin thanh toán trên máy chủ.',
      },
      {
        title: '2. Xử lý 100% trên Trình duyệt (Web Audio API)',
        body: 'Mọi thao tác tổng hợp sóng âm và mã hóa tệp WAV đều diễn ra trong bộ nhớ trình duyệt của bạn. Không có dữ liệu âm thanh nào bị tải lên máy chủ ngoài.',
      },
      {
        title: '3. Sử dụng Bộ nhớ Cục bộ (LocalStorage)',
        body: 'Lịch sử âm thanh, danh sách yêu thích và ngôn ngữ được lưu trữ hoàn toàn trong LocalStorage của trình duyệt trên thiết bị của bạn.',
      },
      {
        title: '4. Không theo dõi hay Bán dữ liệu',
        body: 'Chúng tôi không bán hoặc chia sẻ dữ liệu người dùng cho các nhà quảng cáo bên thứ ba.',
      },
      {
        title: '5. Liên hệ',
        body: 'Vui lòng truy cập trang web chính thức tại jyesounds.com để biết thêm chi tiết.',
      },
    ],
    guideTitle: 'Hướng dẫn 8-BIT SFX LAB',
    guideSubtitle: 'Tạo hiệu ứng âm thanh cổ điển 8-bit trong tích tắc.',
    guideArticles: [
      {
        title: '1. Dạng sóng và 18 Mẫu có sẵn',
        body: 'Chọn giữa Square, Sawtooth, Triangle, Noise, Sine hoặc nhấp vào 18 nút mẫu phía trên để nghe thử ngay lập tức.',
      },
      {
        title: '2. Trình chỉnh sửa Đồ thị Sóng âm',
        body: 'Chuyển đổi giữa tab Quỹ đạo Cao độ (Pitch) và Đường bao Âm lượng (Envelope) để kéo các điểm điều khiển hoặc vẽ tự do.',
      },
      {
        title: '3. Hiệu ứng Cổ điển & Thử nghiệm Phím đàn',
        body: 'Áp dụng Rung âm (Vibrato), Bộ lọc và Bộ giảm bit (Bit Crusher), sau đó thử nghiệm âm thanh trên bàn phím piano tương tác.',
      },
      {
        title: '4. Tải xuống tệp WAV & Phím tắt',
        body: 'Tải về định dạng WAV chất lượng 44.1kHz hoặc 22kHz cổ điển. Phím tắt: [SPACE] Phát, [M] Biến tấu, [R] Ngẫu nhiên.',
      },
    ],
    closeBtn: 'Đã hiểu & Đóng',
    officialSiteNote: 'Trang web chính thức: jyesounds.com · JYE SOUNDS LABS',
  },
  th: {
    modalTitle: 'ข้อกำหนดการให้บริการ · คู่มือผู้ใช้ · นโยบายความเป็นส่วนตัว',
    headerButton: 'ข้อกำหนดและคู่มือ',
    tabTerms: 'ข้อกำหนดการให้บริการ & ข้อจำกัดความรับผิดชอบ',
    tabPrivacy: 'นโยบายความเป็นส่วนตัว',
    tabGuide: 'คู่มือการใช้งานสตูดิโอ',
    disclaimerBadge: 'ประกาศทางกฎหมายสำคัญ (LEGAL DISCLAIMER)',
    disclaimerTitle: 'ข้อจำกัดความรับผิดชอบด้านลิขสิทธิ์และกฎหมาย (Disclaimer)',
    disclaimerText:
      'ผู้ใช้มีอิสระอย่างเต็มที่ในการนำไฟล์เสียงที่บันทึกหรือส่งออกจากสตูดิโอนี้ไปใช้งานได้ทุกที่ รวมถึงบน YouTube, ในเกม, การถ่ายทอดสด และสื่ออื่นๆ แต่ผลลัพธ์และความรับผิดชอบทั้งหมดที่เกิดขึ้น ไม่ว่าจะเป็นข้อพิพาทด้านลิขสิทธิ์ การลงโทษบัญชี หรือข้อจำกัดในการสร้างรายได้ ล้วนเป็นความรับผิดชอบของผู้ใช้แต่เพียงผู้เดียว และผู้ดำเนินการ (JYE SOUNDS) จะไม่รับผิดชอบทางกฎหมายใดๆ ทั้งสิ้น',
    disclaimerNotice:
      '※ คุณสามารถนำไฟล์เสียงไปใช้ในโครงการเชิงพาณิชย์และไม่ใช่เชิงพาณิชย์ได้อย่างอิสระ แต่ความรับผิดชอบทางกฎหมายทั้งหมดตกเป็นของผู้ใช้แต่เพียงผู้เดียว',
    termsTitle: 'ข้อกำหนดการให้บริการ JYE SOUNDS',
    termsSubtitle: 'เงื่อนไขและข้อกำหนดทางกฎหมายสำหรับการใช้งาน 8-BIT SFX LAB',
    termsArticles: [
      {
        title: 'ข้อ 1 (วัตถุประสงค์และลักษณะของบริการ)',
        body: 'ข้อกำหนดนี้ใช้บังคับกับการใช้งาน 8-BIT SFX LAB ซึ่งเป็นเว็บซินธิไซเซอร์ที่ทำงานบนเบราว์เซอร์ผ่าน Web Audio API โดย JYE SOUNDS',
      },
      {
        title: 'ข้อ 2 (การสร้างเสียงและสิทธิ์การอนุญาต)',
        body: '1. ผู้ใช้มีอิสระอย่างเต็มที่ในการนำไฟล์เสียง (WAV) ที่สังเคราะห์จากสตูดิโอนี้ไปใช้ในงานเชิงพาณิชย์และไม่ใช่เชิงพาณิชย์ เช่น เกม วิดีโอบน YouTube และการถ่ายทอดสด\n2. บริการนี้ไม่มีการเรียกเก็บค่าลิขสิทธิ์หรือค่าธรรมเนียมการสมัครสมาชิกใดๆ',
      },
      {
        title: 'ข้อ 3 (ข้อพิพาทด้านลิขสิทธิ์และการปฏิเสธความรับผิดชอบโดยสิ้นเชิง)',
        body: '1. ผู้ใช้มีอิสระอย่างเต็มที่ในการนำไฟล์เสียงที่บันทึกหรือส่งออกจากสตูดิโอนี้ไปใช้งานได้ทุกที่ รวมถึงบน YouTube, ในเกม, การถ่ายทอดสด และสื่ออื่นๆ แต่ผลลัพธ์และความรับผิดชอบทั้งหมดที่เกิดขึ้น ไม่ว่าจะเป็นข้อพิพาทด้านลิขสิทธิ์ การลงโทษบัญชี หรือข้อจำกัดในการสร้างรายได้ ล้วนเป็นความรับผิดชอบของผู้ใช้แต่เพียงผู้เดียว และผู้ดำเนินการ (JYE SOUNDS) จะไม่รับผิดชอบทางกฎหมายใดๆ ทั้งสิ้น\n2. ผู้ดำเนินการไม่มีภาระผูกพันหรือความรับผิดชอบทางกฎหมายต่อการอ้างสิทธิ์ Content ID บน YouTube หรือการระงับบัญชีจากแพลตฟอร์มภายนอก',
      },
      {
        title: 'ข้อ 4 (การปฏิเสธการรับประกัน)',
        body: '1. บริการนี้จัดเตรียมไว้ "ตามสภาพที่เป็นอยู่" (AS-IS) โดยไม่มีการรับประกันการทำงานต่อเนื่องอย่างไม่หยุดชะงัก\n2. ผู้ดำเนินการขอสงวนสิทธิ์ในการแก้ไขหรือระงับคุณสมบัติโดยไม่ต้องแจ้งให้ทราบล่วงหน้า',
      },
    ],
    privacyTitle: 'นโยบายความเป็นส่วนตัว',
    privacySubtitle: 'เคารพความเป็นส่วนตัวของผู้ใช้อย่างสูงสุด: ไม่มีการเก็บข้อมูลส่วนบุคคลใดๆ ทั้งสิ้น',
    privacyArticles: [
      {
        title: '1. ไม่มีการเก็บรวบรวมข้อมูลส่วนบุคคล',
        body: 'ไม่จำเป็นต้องลงทะเบียนหรือเข้าสู่ระบบ เราไม่เคยรวบรวมหรือจัดเก็บชื่อ อีเมล หมายเลขโทรศัพท์ ที่อยู่ IP หรือข้อมูลการชำระเงินบนเซิร์ฟเวอร์',
      },
      {
        title: '2. ประมวลผลบนเบราว์เซอร์ฝั่งผู้ใช้ 100% (Web Audio API)',
        body: 'การสังเคราะห์เสียงและการแปลงไฟล์ WAV ทั้งหมดเกิดขึ้นในหน่วยความจำของเบราว์เซอร์ของคุณ ไม่มีไฟล์เสียงใดถูกอัปโหลดไปยังเซิร์ฟเวอร์ภายนอก',
      },
      {
        title: '3. การใช้พื้นที่จัดเก็บในเบราว์เซอร์ (LocalStorage)',
        body: 'ประวัติเสียง รายการโปรด และภาษาที่เลือกจะถูกบันทึกไว้ใน LocalStorage ของเบราว์เซอร์บนอุปกรณ์ของคุณเท่านั้น',
      },
      {
        title: '4. ไม่มีการติดตามหรือแบ่งปันข้อมูลแก่บุคคลที่สาม',
        body: 'เราไม่ขายหรือส่งต่อข้อมูลของผู้ใช้ให้กับแพลตฟอร์มโฆษณาภายนอก',
      },
      {
        title: '5. ช่องทางการติดต่อ',
        body: 'สามารถเยี่ยมชมเว็บไซต์อย่างเป็นทางการได้ที่ jyesounds.com สำหรับข้อมูลเพิ่มเติม',
      },
    ],
    guideTitle: 'คู่มือการใช้งาน 8-BIT SFX LAB',
    guideSubtitle: 'สร้างเอฟเฟกต์เสียงเรโทร 8 บิตได้ง่ายๆ ภายในไม่กี่ขั้นตอน',
    guideArticles: [
      {
        title: '1. รูปคลื่นเสียงและ 18 พรีเซ็ต',
        body: 'เลือกรูปคลื่นระหว่าง Square, Sawtooth, Triangle, Noise, Sine หรือคลิก 18 พรีเซ็ตด้านบนเพื่อฟังตัวอย่างเสียงได้ทันที',
      },
      {
        title: '2. เครื่องมือแก้ไขกราฟคลื่นเสียงแบบโต้ตอบ',
        body: 'สลับระหว่างแท็บเส้นทางระดับเสียง (Pitch) และแท็บความดัง (Envelope) เพื่อลากจุดควบคุมหรือวาดเส้นโค้งเสียงได้อย่างอิสระ',
      },
      {
        title: '3. เอฟเฟกต์วินเทจ & ทดสอบบนคีย์เปียโน',
        body: 'ใส่เสียงสั่น (Vibrato), ฟิลเตอร์ และลดทอนบิต (Bit Crusher) เพื่อเพิ่มเสน่ห์เรโทร แล้วทดสอบเสียงบนลิ่มเปียโน',
      },
      {
        title: '4. ดาวน์โหลดไฟล์ WAV & ปุ่มลัด',
        body: 'บันทึกเป็นไฟล์ WAV คุณภาพสูง 44.1kHz หรือเรโทร 22kHz ปุ่มลัด: [SPACE] เล่นเสียง, [M] ดัดแปลง, [R] สุ่มเสียง',
      },
    ],
    closeBtn: 'เข้าใจแล้วและปิดหน้าต่าง',
    officialSiteNote: 'เว็บไซต์อย่างเป็นทางการ: jyesounds.com · JYE SOUNDS LABS',
  },
};
