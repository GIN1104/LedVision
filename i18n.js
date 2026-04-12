(function (global) {
  "use strict";

  var STORAGE_KEY = "ledvision-lang";
  var DEFAULT_LANG = "he";

  var STRINGS = {
    he: {
      meta: {
        title: "LedVision | מסכי LED לבית, לעסק ולחוץ",
        description:
          "מסכי LED מודולריים (Video Wall / DVLED) מול טלוויזיה: גודל ללא הגבלה, תמונה רציפה ללא מסגרות, בהירות לחוץ. ייעוץ, התקנה ואחריות.",
      },
      a11y: { menu: "תפריט", lang: "בחירת שפה", skipToContent: "דלג לתוכן", closeMenu: "סגירת תפריט" },
      nav: {
        solutions: "פתרונות",
        business: "לעסקים",
        home: "לבית",
        projects: "פרויקטים",
        contact: "צור קשר",
        call: "התקשרו",
      },
      mobileCta: {
        whatsapp: "וואטסאפ",
        call: "להתקשר",
      },
      hero: {
        eyebrow: "LED מודולרי — לא «טלוויזיה רגילה»",
        titleLine1: "מסכי לד:",
        titleLine2: "סקיילביליות, בהירות ומקצועיות",
        text:
          "מדברים על מסכי LED מודולריים (Video Wall / DVLED) — לא על טלוויזיה מהמדף. פאנלים קטנים שמתחברים לקיר בכל גודל, גם קיר שלם, בלי תקרת אינץ׳ קבועה.",
        cta1: "ייעוץ חינם",
        cta2: "לצפייה בפרויקטים",
      },
      promo: {
        badge: "מבצע",
        title: "עונת הספורט הגדול — הנחות על כל סדרת ה-LED",
        text: "להזמנה עד סוף החודש — התקנה מקצועית במתנה.",
        btn: "התקשרו עכשיו",
      },
      clients: {
        label: "סומכים עלינו",
        tags: ["קמעונאות", "סוכנויות רכב", "מסעדות", "אולמות אירועים", "כושר", "טלקום"],
      },
      solutions: {
        title: "יתרונות מסכי LED מודולריים מול טלוויזיות",
        lead:
          "מורכבים מפאנלים קטנים שמתחברים — אפשר לבנות מסך בכל גודל, גם קיר שלם. להלן ההבדלים העיקריים מול טלוויזיה רגילה.",
      },
      cards: [
        {
          title: "גודל בלתי מוגבל",
          text: "מודולים שמתחברים יחד — מסך בכל גודל, בלי מגבלה כמו 65″ או 85″. אפשר להתאים לכל חלל או פרויקט.",
        },
        {
          title: "ללא מסגרות (Seamless)",
          text: "אין «פסים» בין חלקי המסך — תמונה רציפה. בווידאו־וול של טלוויזיות תמיד רואים חיבורים.",
        },
        {
          title: "בהירות חזקה גם בשמש",
          text: "הרבה יותר בהירים מטלוויזיות — מתאים לחוץ ולאור יום. LED יכול להגיע לעוצמות תאורה גבוהות מאוד.",
        },
        {
          title: "תחזוקה קלה וחכמה",
          text: "מתקלקל חלק קטן? מחליפים רק אותו — לא את כל המסך. בטלוויזיה תקלה לעיתים אומרת החלפת פאנל שלם.",
        },
        {
          title: "גמישות בעיצוב",
          text: "מסך קעור, עגול, גלילי — מתאים לאדריכלות. טלוויזיה נשארת מלבן רגיל; מודולריות מאפשרת התאמה לצורה.",
        },
        {
          title: "צפייה לקהל ומרחוק",
          text: "זוויות צפייה רחבות וקריאות מרחוק — אידיאלי לאצטדיונים, קניונים והופעות. מיועד לקהל גדול, לא רק לספה בבית.",
        },
        {
          title: "עמידות ו־24/7",
          text: "אורך חיים ארוך (בערך 100,000 שעות), בנוי לעבודה רציפה — פרסום, שלטים, שדות תעופה ועוד.",
        },
        {
          title: "סיכום קצר",
          text: "LED מודולרי — גודל ענק, בהירות, גמישות, מקצועי. טלוויזיה — זולה ופשוטה לבית. נייעץ לפי השימוש שלכם.",
        },
      ],
      features: {
        title: "הבדלים שמרגישים מיד — ובטיחות באתר",
        items: [
          {
            title: "ללא מסגרות",
            text: "אין הפרעה ויזואלית בין מודולים — תמונה אחת רציפה. בטלוויזיות שמחברים לווידאו־וול תמיד רואים חיבורים.",
          },
          {
            title: "בהירות לשמש ולחוץ",
            text: "טלוויזיות כמעט לא נראות באור חזק; LED מגיע לעוצמות תאורה גבוהות — מתאים לרחוב ולשמש.",
          },
          {
            title: "סקיילביליות אמיתית",
            text: "זה היתרון המשמעותי ביותר: גודל לפי חלל ולא לפי דגם מהמדף — עד קיר שלם.",
          },
          {
            title: "הגנה מפני התקפות",
            text: "פיתוח עם סינון קלט בצד הלקוח, מדיניות אבטחת תוכן (CSP) בשרת, והימנעות מהזרקת HTML לתוך DOM. בצד השרת: שאילתות פרמטריות (מניעת SQL injection) וקידוד פלט נכון נגד XSS — כאשר יחובר backend.",
          },
        ],
      },
      business: {
        title: "לעסק, אולם ופרויקט — גם את הצד השני",
        lead:
          "אם זה עסק / אולם / פרויקט גדול — LED מודולרי מנצח. להלן גם החסרונות (כדי להיות הוגנים) ומה חשוב לזכור.",
        items: [
          {
            title: "עלות גבוהה מטלוויזיה",
            text: "יקר משמעותית — מתאים כשהערך הוא חשיפה, מותג או קהל, לא רק צפייה משפחתית.",
          },
          {
            title: "דורש התקנה מקצועית",
            text: "לא תלויים מהקיר כמו מסך קונסומר — תכנון, חיווט ובקרה; אנחנו מלווים מהשדה ועד ההפעלה.",
          },
          {
            title: "פחות «חד» מקרוב (תלוי פיקסל פיץ׳)",
            text: "מרחק הצפייה והצפיפות נבחרים נכון — נבחן יחד תוכן ומרחק ישיבה.",
          },
          {
            title: "איפה זה הכי נכון?",
            text: "שילוט, חזיתות, אולמות, משרדים — LED במקום הנכון. לבית פשוט לרוב טלוויזיה עדיפה.",
          },
        ],
      },
      homeSection: {
        title: "לבית — מתי טלוויזיה ומתי LED?",
        lead:
          "אם אתם מדברים על בית — טלוויזיה לרוב עדיפה. אם החזון הוא גודל חריג, חוץ או קולנוע אמיתי — בואו נדבר על מודולרי.",
        items: [
          {
            title: "טלוויזיה: זולה ופשוטה",
            text: "לסלון רגיל — פתרון נוח וכלכלי. כמו בסיכום: לבית פשוט TV במקום הנכון.",
          },
          {
            title: "LED כשהחלום גדול",
            text: "קיר וידאו, חצר ובריכה, פורמט שלא קיים במדף — כאן הבשורה היא מודולריות ובהירות.",
          },
          {
            title: "פיקסל פיץ׳ ומרחק",
            text: "מקרוב רואים את הצפיפות — נבחן יחד מרחק ישיבה וגודל כדי שהתמונה תהיה נכונה.",
          },
          {
            title: "ספרו לנו: בית / עסק / אולם / משרד",
            text: "נגיד מה באמת מתאים לכם — בלי להמציא צורך ב-LED כשטלוויזיה מספיקה.",
          },
        ],
      },
      projects: {
        title: "המסכים שלנו בפעולה",
        lead: "דוגמאות לפרויקטים שבוצעו (הדגמה).",
        list: [
          { title: "קיר וידאו 4×3 מ׳ במרכז אירועים", loc: "תל אביב" },
          { title: "LED חיצוני לסוכנות רכב", loc: "חיפה" },
          { title: "מסך 137 אינץ׳ ליד בריכה", loc: "ירושלים" },
          { title: "שלושה מסכים במרכז משחקים", loc: "באר שבע" },
        ],
      },
      trust: [
        { strong: "עד 3 שנים", span: "אחריות על ציוד ועבודה" },
        { strong: "מלאי", span: "קונפיגורציות פופולריות — אספקה מהירה" },
        { strong: "15+ שנים", span: "ניסיון ב-LED ואינטגרציה" },
      ],
      reviews: {
        title: "מה הלקוחות אומרים",
        items: [
          {
            quote:
              "«שירות ברמה הגבוהה ביותר, מוצר מצוין. עזרו בחישוב פיקסל פיץ׳, התקנה נקייה. ממליץ בחום.»",
            footer: "— חברת קמעונאות",
          },
          {
            quote:
              "«הזמנו מסך לאולם. מחיר טוב יותר מהמתחרים, ליווי מהבקשה ועד ההפעלה — בלי הפתעות.»",
            footer: "— סוכנות אירועים, תל אביב",
          },
          {
            quote: "«מסך ליד הבריכה — בדיוק למסיבות. תמונה בהירה והכל אטום למים.»",
            footer: "— לקוח פרטי",
          },
        ],
      },
      fbFeed: {
        title: "עוד מהשטח",
        lead: "תמונות ועדכונים מהעמוד שלנו בפייסבוק.",
        more: "לכל התמונות בפייסבוק",
        note: "התאריכים ליד הסרטונים מוצגים כפי שמופיעים בפייסבוק.",
      },
      blog: {
        title: "חומרים מקצועיים",
        items: [
          {
            meta: "6 דק׳ קריאה",
            title: "LED מודולרי מול טלוויזיה — סיכום פשוט",
            text: "מתי בוחרים בקיר וידאו ומתי במסך מהמדף: גודל, בהירות, מחיר ושימוש (בית מול עסק).",
          },
          {
            meta: "7 דק׳ קריאה",
            title: "בהירות במסכי LED — ניטס ותנאי שטח",
            text: "למה למסך חוץ נדרשת בהירות שונה מפנים.",
          },
          {
            meta: "10 דק׳ קריאה",
            title: "איך בנוי מסך LED",
            text: "מודולים, ספקי כוח, בקרים — בקצרה.",
          },
        ],
      },
      contact: {
        title: "בואו נדבר",
        lead:
          "צריכים חישוב או ביקור טכנאי? ציינו אם זה בית, עסק, אולם או משרד — נחזור תוך יום עסקים עם כיוון ראשוני.",
        addr: "החרש 18, חיפה, ישראל",
      },
      map: {
        title: "איך מגיעים",
        waze: "פתיחה ב-Waze",
        google: "פתיחה ב-Google Maps",
        iframeTitle: "מפה — החרש 18, חיפה",
      },
      form: {
        name: "שם",
        phone: "טלפון",
        comment: "הערה",
        placeholder: "בית / עסק / אולם / משרד, שטח, פנים או חוץ…",
        submit: "שליחה",
        note: "בלחיצה על השליחה אתם מסכימים לעיבוד המידע האישי.",
        validationError: "נא למלא שם וטלפון תקינים.",
      },
      footer: {
        copy: "© {year} LedVision",
        a11yLink: "הצהרת נגישות",
        a11yDoc: "להצהרה המלאה",
      },
      a11yDrawer: {
        title: "הצהרת נגישות",
        intro:
          "אנו מחויבים לאפשר שימוש נוח ושוויוני באתר לאנשים עם מוגבלויות, בהתאם להנחיות נגישות תכנים באינטרנט ולתקן הישראלי הרלוונטי.",
        subtitle: "באתר זה בוצעו, בין היתר, ההתאמות הבאות:",
        bullets: [
          "שימוש במבנה סמנטי (כותרות, אזורים וניווט) לתמיכה בטכנולוגיות מסייעות.",
          "אפשרות ניווט באמצעות מקלדת באזורים המרכזיים של הממשק.",
          "שמירה על ניגודיות צבעים וגודל טקסט המאפשרים קריאה נוחה.",
          "טפסים עם שדות מתויגים במפורש.",
          "אפשרות בחירת שפה (עברית, אנגלית ורוסית) עם כיוון טקסט מתאים (ימין־שמאל / שמאל־ימין).",
        ],
        outro: "למסמך משפטי מלא, פרטי קשר בנושא נגישות והליכי ערעור — עברו לעמוד ההצהרה המלאה.",
        fullLink: "מעבר להצהרה המלאה",
        closeLabel: "סגירת חלון נגישות",
      },
      toolbar: {
        title: "התאמות נגישות",
        openFab: "פתיחת כלי נגישות",
        closeFab: "סגירת כלי נגישות",
        panelLabel: "כלי נגישות",
        textInc: "הגדלת טקסט",
        textLevel0: "רגיל",
        textLevel1: "בינוני",
        textLevel2: "גדול",
        highContrast: "ניגודיות גבוהה",
        links: "הדגשת קישורים",
        readableFont: "גופן קריא",
        stopMotion: "עצירת אנימציות",
        largeCursor: "סמן מוגדל",
        grayscale: "מצב אפור",
        reset: "איפוס כל ההתאמות",
      },
      formAlert: "תודה! בגרסת הדגמה הבקשה לא נשלחת — חברו backend או שירות טפסים.",
    },
    en: {
      meta: {
        title: "LedVision | LED screens for home, business & outdoors",
        description:
          "Modular LED video walls (DVLED) vs TVs: unlimited size, seamless image, outdoor brightness. Consultation, installation, warranty.",
      },
      a11y: { menu: "Menu", lang: "Language", skipToContent: "Skip to content", closeMenu: "Close menu" },
      nav: {
        solutions: "Solutions",
        business: "Business",
        home: "Home",
        projects: "Projects",
        contact: "Contact",
        call: "Call us",
      },
      mobileCta: {
        whatsapp: "WhatsApp",
        call: "Call",
      },
      hero: {
        eyebrow: "Modular LED — not a “regular TV”",
        titleLine1: "LED video walls:",
        titleLine2: "scale, brightness, pro quality",
        text:
          "We mean modular LED screens (video wall / DVLED), not an off‑the‑shelf TV. Small panels tile into any size — even a full wall — with no fixed inch limit.",
        cta1: "Free consultation",
        cta2: "View projects",
      },
      promo: {
        badge: "Offer",
        title: "Big sports season — discounts across our LED range",
        text: "Order before month end — professional installation on us.",
        btn: "Call now",
      },
      clients: {
        label: "Trusted by",
        tags: ["Retail", "Car dealers", "Restaurants", "Event halls", "Fitness", "Telecom"],
      },
      solutions: {
        title: "Modular LED vs TVs — the advantages",
        lead:
          "Built from small panels that lock together — any size, even a full wall. Here is how it differs from a standard television.",
      },
      cards: [
        {
          title: "Unlimited size",
          text: "Modules tile together — any format, not stuck at 65″ or 85″. Fits the room or the brief.",
        },
        {
          title: "Seamless (no bezels)",
          text: "No gaps between tiles — one continuous image. TV video walls always show seams.",
        },
        {
          title: "Very high brightness",
          text: "Much brighter than typical TVs — works outdoors and in daylight. LEDs reach very high nit levels.",
        },
        {
          title: "Smart maintenance",
          text: "One module fails? Replace just that tile — not the whole screen. Saves time and money vs swapping an entire TV panel.",
        },
        {
          title: "Design flexibility",
          text: "Curved, cylindrical, creative shapes — fits architecture. A TV stays a plain rectangle.",
        },
        {
          title: "Long‑distance viewing",
          text: "Wide angles and readable from afar — stadiums, malls, concerts. Built for crowds, not only a sofa.",
        },
        {
          title: "Durability & 24/7",
          text: "Long lifespan (~100,000 h), built to run continuously — signage, airports, advertising.",
        },
        {
          title: "In short",
          text: "Modular LED: huge scale, brightness, flexibility, pro use. TV: simpler and cheaper for home. We advise by use case.",
        },
      ],
      features: {
        title: "What you notice — plus site security",
        items: [
          {
            title: "Seamless image",
            text: "No visible joints between modules — one canvas. Tiled consumer TVs always show bezels.",
          },
          {
            title: "Brightness for outdoors",
            text: "Regular TVs wash out in sun; LED walls reach the nit levels needed for streets and daylight.",
          },
          {
            title: "True scalability",
            text: "The biggest edge: size follows your space — up to a full wall — not a fixed retail size.",
          },
          {
            title: "Protection against attacks",
            text: "Client-side input filtering, Content Security Policy headers, and no unsafe HTML injection into the DOM. With a backend: parameterized queries (SQL injection mitigation) and output encoding (XSS mitigation).",
          },
        ],
      },
      business: {
        title: "For business, halls & large projects — the honest side",
        lead:
          "For shops, venues and big installs, modular LED wins. Below are drawbacks too — cost, install, pixel pitch — so you decide with clarity.",
        items: [
          {
            title: "Higher cost than a TV",
            text: "Significantly pricier — makes sense when the return is exposure, brand or footfall, not only a living‑room screen.",
          },
          {
            title: "Professional installation",
            text: "Not a single plug‑and‑play box — planning, power and controllers; we support from survey to go‑live.",
          },
          {
            title: "Up‑close sharpness (pixel pitch)",
            text: "From very close, pitch matters — we size the wall for viewing distance and content.",
          },
          {
            title: "Where it shines",
            text: "Facades, signage, venues, offices — the right tool. For a simple lounge, a TV is often enough.",
          },
        ],
      },
      homeSection: {
        title: "At home — TV or LED?",
        lead:
          "For most houses, a TV is simpler and cheaper. Choose modular LED when you want an unusual size, outdoor cinema, or a real video wall.",
        items: [
          {
            title: "TV: simple & affordable",
            text: "For a normal living room, a television is usually the right call — simple and cost‑effective.",
          },
          {
            title: "LED when the dream is big",
            text: "Garden, pool, or a wall that does not exist in stores — that is where modular LED and brightness matter.",
          },
          {
            title: "Pitch & viewing distance",
            text: "Up close you see pixel density — we match seating distance to wall size.",
          },
          {
            title: "Tell us: home / business / hall / office",
            text: "We will say what actually fits — no upsell when a TV is enough.",
          },
        ],
      },
      projects: {
        title: "Our screens in action",
        lead: "Sample completed projects (demo).",
        list: [
          { title: "4×3 m video wall in an event centre", loc: "Tel Aviv" },
          { title: "Outdoor LED for a car dealership", loc: "Haifa" },
          { title: "137″ screen by the pool", loc: "Jerusalem" },
          { title: "Three large screens in a gaming centre", loc: "Beersheba" },
        ],
      },
      trust: [
        { strong: "Up to 3 years", span: "warranty on equipment and labour" },
        { strong: "Stock", span: "popular configs — fast dispatch" },
        { strong: "15+ years", span: "experience in LED and integration" },
      ],
      reviews: {
        title: "What clients say",
        items: [
          {
            quote:
              "«Top‑tier service, excellent product. Helped with pixel pitch, neat installation. Highly recommend.»",
            footer: "— Retail company",
          },
          {
            quote:
              "«We ordered a screen for our hall. Better price than competitors, smooth process from request to go‑live.»",
            footer: "— Event agency, Tel Aviv",
          },
          {
            quote: "«A screen by the pool — perfect for parties. Bright picture, fully sealed.»",
            footer: "— Private client",
          },
        ],
      },
      fbFeed: {
        title: "More from the field",
        lead: "Photos and updates from our Facebook page.",
        more: "See more on Facebook",
        note: "Video dates match what Facebook shows on each post.",
      },
      blog: {
        title: "Useful resources",
        items: [
          {
            meta: "6 min read",
            title: "Modular LED vs TV — short take",
            text: "When to pick a video wall vs a retail set: size, brightness, price, home vs business.",
          },
          {
            meta: "7 min read",
            title: "LED brightness — nits and real conditions",
            text: "Why outdoor screens need different brightness than indoor.",
          },
          {
            meta: "10 min read",
            title: "How an LED screen is built",
            text: "Modules, power supplies, controllers — in brief.",
          },
        ],
      },
      contact: {
        title: "Get in touch",
        lead:
          "Need a quote or site visit? Say if it is home, business, hall or office — we reply within one business day with first guidance.",
        addr: "18 HaHarash St, Haifa, Israel",
      },
      map: {
        title: "How to find us",
        waze: "Open in Waze",
        google: "Open in Google Maps",
        iframeTitle: "Map — 18 HaHarash St, Haifa",
      },
      form: {
        name: "Name",
        phone: "Phone",
        comment: "Message",
        placeholder: "Home / business / hall / office, area, indoor or outdoor…",
        submit: "Send",
        note: "By submitting, you agree to the processing of personal data.",
        validationError: "Please enter a valid name and phone.",
      },
      footer: {
        copy: "© {year} LedVision",
        a11yLink: "Accessibility statement",
        a11yDoc: "Full statement",
      },
      a11yDrawer: {
        title: "Accessibility statement",
        intro:
          "We are committed to providing equitable access to this website for people with disabilities, in line with recognized web accessibility guidelines and applicable Israeli standards.",
        subtitle: "This site includes, among other measures:",
        bullets: [
          "Semantic structure (headings, landmarks, navigation) for assistive technologies.",
          "Keyboard access to the main areas of the interface.",
          "Sufficient colour contrast and readable text sizing.",
          "Forms with clearly labelled fields.",
          "Language selection (Hebrew, English, Russian) with appropriate text direction (RTL/LTR).",
        ],
        outro: "For the full legal statement, accessibility contacts and appeals — open the full accessibility page.",
        fullLink: "Open full accessibility statement",
        closeLabel: "Close accessibility panel",
      },
      toolbar: {
        title: "Accessibility options",
        openFab: "Open accessibility tools",
        closeFab: "Close accessibility tools",
        panelLabel: "Accessibility tools",
        textInc: "Larger text",
        textLevel0: "Default",
        textLevel1: "Medium",
        textLevel2: "Large",
        highContrast: "High contrast",
        links: "Highlight links",
        readableFont: "Readable font",
        stopMotion: "Stop animations",
        largeCursor: "Large cursor",
        grayscale: "Grayscale",
        reset: "Reset all",
      },
      formAlert: "Thanks! In this demo the form is not sent — connect a backend or form service.",
    },
    ru: {
      meta: {
        title: "LedVision | LED-экраны для дома, бизнеса и улицы",
        description:
          "Модульные LED-видеостены (DVLED) и телевизоры: безлимитный размер, стык без швов, яркость для улицы. Консультация, монтаж, гарантия.",
      },
      a11y: { menu: "Меню", lang: "Язык", skipToContent: "Перейти к содержимому", closeMenu: "Закрыть меню" },
      nav: {
        solutions: "Решения",
        business: "Для бизнеса",
        home: "Для дома",
        projects: "Проекты",
        contact: "Контакты",
        call: "Позвонить",
      },
      mobileCta: {
        whatsapp: "WhatsApp",
        call: "Позвонить",
      },
      hero: {
        eyebrow: "Модульный LED — не «обычный телевизор»",
        titleLine1: "LED-видеостены:",
        titleLine2: "масштаб, яркость, профуровень",
        text:
          "Речь о модульных LED-экранах (video wall / DVLED), а не о ТВ с полки. Маленькие панели собираются в любой размер — хоть целую стену, без жёсткого лимита в дюймах.",
        cta1: "Бесплатная консультация",
        cta2: "Смотреть проекты",
      },
      promo: {
        badge: "Акция",
        title: "Сезон большого спорта — скидки на весь модельный ряд LED",
        text: "При заказе до конца месяца — профессиональный монтаж в подарок.",
        btn: "Позвонить сейчас",
      },
      clients: {
        label: "Нам доверяют",
        tags: ["Ритейл", "Автосалоны", "Рестораны", "Ивент-залы", "Фитнес", "Телеком"],
      },
      solutions: {
        title: "Преимущества модульного LED перед телевизорами",
        lead:
          "Собирается из малых панелей — экран любого размера, хоть на всю стену. Ниже — ключевые отличия от обычного ТВ.",
      },
      cards: [
        {
          title: "Неограниченный размер",
          text: "Модули стыкуются — любой формат, не как фиксированные 65″ или 85″. Подходит под помещение и задачу.",
        },
        {
          title: "Без швов (seamless)",
          text: "Нет «полос» между частями — одна картинка. У стен из телевизоров швы всегда видны.",
        },
        {
          title: "Очень высокая яркость",
          text: "Существенно ярче обычных ТВ — для улицы и солнца. LED выходит на очень высокие уровни яркости (нит).",
        },
        {
          title: "Удобное обслуживание",
          text: "Сломался один модуль — меняете только его, не весь экран. У ТВ часто меняют панель целиком.",
        },
        {
          title: "Гибкость дизайна",
          text: "Вогнутый, круглый, цилиндр — под архитектуру. Телевизор остаётся прямоугольником с полки.",
        },
        {
          title: "Обзор с расстояния",
          text: "Широкие углы и читаемость издалека — стадионы, ТЦ, концерты. Для толпы, не только для дивана.",
        },
        {
          title: "Надёжность и 24/7",
          text: "Долгий ресурс (около 100 000 ч), режим непрерывной работы — реклама, табло, аэропорты.",
        },
        {
          title: "Кратко",
          text: "Модульный LED — масштаб, яркость, гибкость, профи. ТВ — проще и дешевле для дома. Подскажем по сценарию.",
        },
      ],
      features: {
        title: "Отличия, которые видно сразу — и безопасность сайта",
        items: [
          {
            title: "Без швов",
            text: "Нет визуальных разрывов между модулями — одно полотно. У стен из ТВ соединения заметны.",
          },
          {
            title: "Яркость для улицы",
            text: "Обычные телевизоры в ярком свете «пропадают»; LED выходит на нужные ниты для улицы и солнца.",
          },
          {
            title: "Настоящая масштабируемость",
            text: "Главный плюс: размер под пространство — до целой стены, а не диагональ с витрины.",
          },
          {
            title: "Защита от атак",
            text: "Санитизация данных на клиенте, заголовки Content Security Policy, без небезопасной вставки HTML в DOM. На сервере при подключении backend — параметризованные запросы (против SQL-инъекций) и экранирование вывода (против XSS).",
          },
        ],
      },
      business: {
        title: "Для бизнеса, залов и крупных проектов — честно",
        lead:
          "Для магазинов, площадок и больших инсталляций модульный LED выигрывает. Ниже — и минусы: цена, монтаж, шаг пикселя.",
        items: [
          {
            title: "Дороже телевизора",
            text: "Существенно дороже — оправдано, когда важны охват, бренд или поток людей, а не только диван.",
          },
          {
            title: "Нужен профмонтаж",
            text: "Не «воткнул в розетку» — проектирование, питание, контроллеры; ведём от замера до запуска.",
          },
          {
            title: "С «вплотную» и шаг пикселя",
            text: "Вблизи важна плотность пикселей — подбираем размер стены под дистанцию и контент.",
          },
          {
            title: "Где это уместно",
            text: "Фасады, вывески, залы, офисы — там модульный LED уместен. Для простой гостиной часто хватит ТВ.",
          },
        ],
      },
      homeSection: {
        title: "Дома — телевизор или LED?",
        lead:
          "В большинстве квартир проще и дешевле ТВ. Модульный LED — когда нужен нестандартный размер, улица или настоящая видеостена.",
        items: [
          {
            title: "ТВ: проще и доступнее",
            text: "Для обычной гостиной телевизор чаще всего правильный выбор — проще и экономичнее.",
          },
          {
            title: "LED, когда мечта большая",
            text: "Двор, бассейн, стена, которой нет в магазине — здесь важны модули и яркость.",
          },
          {
            title: "Шаг пикселя и дистанция",
            text: "Вблизи видна сетка — подбираем размер и расстояние до дивана вместе с вами.",
          },
          {
            title: "Напишите сценарий: дом / бизнес / зал / офис",
            text: "Скажем, что реально подходит — без навязывания LED, если достаточно ТВ.",
          },
        ],
      },
      projects: {
        title: "Наши экраны в работе",
        lead: "Примеры реализованных проектов (демо).",
        list: [
          { title: "Видеостена 4×3 м в ивент-центре", loc: "Тель-Авив" },
          { title: "Фасадный LED для автосалона", loc: "Хайфа" },
          { title: "Экран 137″ у бассейна", loc: "Иерусалим" },
          { title: "Комплекс из трёх экранов в игровом центре", loc: "Беэр-Шева" },
        ],
      },
      trust: [
        { strong: "До 3 лет", span: "гарантия на оборудование и работы" },
        { strong: "Склад", span: "популярные конфигурации — быстрая отгрузка" },
        { strong: "15+ лет", span: "опыта в LED и интеграции мультимедиа" },
      ],
      reviews: {
        title: "Отзывы клиентов",
        items: [
          {
            quote:
              "«Сервис на высшем уровне, продукт отличный. Помогли с расчётом пиксельного шага, монтаж аккуратный. Рекомендую.»",
            footer: "— ООО «Ритейл Групп»",
          },
          {
            quote:
              "«Заказывали экран для зала. Цена лучше конкурентов, сопровождение от заявки до пуска — без сюрпризов.»",
            footer: "— Ивент-агентство, Москва",
          },
          {
            quote: "«Экран у бассейна — то, что нужно для вечеринок. Картинка яркая, всё герметично.»",
            footer: "— Частный заказчик",
          },
        ],
      },
      fbFeed: {
        title: "Ещё примеры работ",
        lead: "Фото и обновления с нашей страницы в Facebook.",
        more: "Больше на Facebook",
        note: "Даты у видео совпадают с датой публикации в Facebook.",
      },
      blog: {
        title: "Полезные материалы",
        items: [
          {
            meta: "6 мин",
            title: "Модульный LED и телевизор — коротко",
            text: "Когда выбирают видеостену, а когда ТВ с полки: размер, яркость, цена, дом и бизнес.",
          },
          {
            meta: "7 мин",
            title: "Яркость LED: ниты и реальные условия",
            text: "Почему уличному экрану нужна другая яркость, чем комнатному.",
          },
          {
            meta: "10 мин",
            title: "Из чего собирается LED-экран",
            text: "Модули, блоки питания, контроллеры — кратко о конструкции.",
          },
        ],
      },
      contact: {
        title: "Свяжитесь с нами",
        lead:
          "Нужен расчёт или выезд? Укажите, это дом, бизнес, зал или офис — ответим в рабочий день с первым ориентиром.",
        addr: "ул. а-Хараш 18, Хайфа, Израиль",
      },
      map: {
        title: "Как добраться",
        waze: "Открыть в Waze",
        google: "Открыть в Google Maps",
        iframeTitle: "Карта — а-Хараш 18, Хайфа",
      },
      form: {
        name: "Имя",
        phone: "Телефон",
        comment: "Комментарий",
        placeholder: "Дом / бизнес / зал / офис, площадь, помещение или улица…",
        submit: "Отправить",
        note: "Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.",
        validationError: "Укажите имя и телефон.",
      },
      footer: {
        copy: "© {year} LedVision",
        a11yLink: "Заявление о доступности",
        a11yDoc: "Полный текст",
      },
      a11yDrawer: {
        title: "Заявление о доступности",
        intro:
          "Мы стремимся обеспечить удобный и равноправный доступ к сайту для людей с ограниченными возможностями в соответствии с рекомендациями по доступности веб-контента и применимыми израильскими нормами.",
        subtitle: "На сайте реализованы, в том числе, следующие меры:",
        bullets: [
          "Семантическая разметка (заголовки, области страницы, навигация) для вспомогательных технологий.",
          "Навигация с клавиатуры по основным разделам интерфейса.",
          "Достаточный контраст текста и размер шрифта для комфортного чтения.",
          "Формы с явными подписями полей.",
          "Выбор языка (иврит, английский, русский) с корректным направлением текста (RTL/LTR).",
        ],
        outro: "Полный юридический текст, контакты по доступности и порядок обжалования — на отдельной странице заявления.",
        fullLink: "Перейти к полному заявлению",
        closeLabel: "Закрыть панель доступности",
      },
      toolbar: {
        title: "Параметры доступности",
        openFab: "Открыть инструменты доступности",
        closeFab: "Закрыть инструменты доступности",
        panelLabel: "Инструменты доступности",
        textInc: "Увеличить текст",
        textLevel0: "Обычный",
        textLevel1: "Средний",
        textLevel2: "Крупный",
        highContrast: "Высокий контраст",
        links: "Выделение ссылок",
        readableFont: "Читабельный шрифт",
        stopMotion: "Остановить анимации",
        largeCursor: "Крупный курсор",
        grayscale: "Оттенки серого",
        reset: "Сбросить всё",
      },
      formAlert: "Спасибо! В демо-версии заявка не отправляется — подключите backend или форму-сервис.",
    },
  };

  function getLang() {
    try {
      var params = new URLSearchParams(window.location.search);
      var q = params.get("lang");
      if (q && STRINGS[q]) return q;
    } catch (e) {}
    try {
      var s = localStorage.getItem(STORAGE_KEY);
      if (s && STRINGS[s]) return s;
    } catch (e) {}
    return DEFAULT_LANG;
  }

  function setLang(lang) {
    if (!STRINGS[lang]) lang = DEFAULT_LANG;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    var url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    }
    document.documentElement.setAttribute("lang", lang === "he" ? "he" : lang === "ru" ? "ru" : "en");
    document.documentElement.setAttribute("dir", lang === "he" ? "rtl" : "ltr");
    apply(lang);
    updateLangButtons(lang);
  }

  function apply(lang) {
    var t = STRINGS[lang] || STRINGS[DEFAULT_LANG];
    document.title = t.meta.title;
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", t.meta.description);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = resolve(t, key);
      if (val == null) return;
      if (typeof val !== "string" && typeof val !== "number") return;
      if (el.tagName === "TITLE") {
        document.title = String(val);
        return;
      }
      el.textContent = String(val);
    });

    var year = new Date().getFullYear();
    var footerCopy = t.footer.copy.replace("{year}", String(year));
    var fc = document.querySelector("[data-i18n-footer]");
    if (fc) fc.textContent = footerCopy;

    var track = document.getElementById("clients-track");
    if (track) {
      var spans = track.querySelectorAll("[data-client-i]");
      spans.forEach(function (span) {
        var i = parseInt(span.getAttribute("data-client-i"), 10);
        if (!isNaN(i) && t.clients.tags[i]) span.textContent = t.clients.tags[i];
      });
    }

    var cards = document.querySelectorAll("[data-card-i]");
    cards.forEach(function (card) {
      var i = parseInt(card.getAttribute("data-card-i"), 10);
      if (isNaN(i) || !t.cards[i]) return;
      var h = card.querySelector("[data-i18n-card-title]");
      var p = card.querySelector("[data-i18n-card-text]");
      if (h) h.textContent = t.cards[i].title;
      if (p) p.textContent = t.cards[i].text;
    });

    var fItems = document.querySelectorAll("[data-feature-i]");
    fItems.forEach(function (box) {
      var i = parseInt(box.getAttribute("data-feature-i"), 10);
      if (isNaN(i) || !t.features.items[i]) return;
      var h = box.querySelector("h3");
      var p = box.querySelector("p");
      if (h) h.textContent = t.features.items[i].title;
      if (p) p.textContent = t.features.items[i].text;
    });

    var bItems = document.querySelectorAll("[data-business-i]");
    bItems.forEach(function (box) {
      var i = parseInt(box.getAttribute("data-business-i"), 10);
      if (isNaN(i) || !t.business.items[i]) return;
      var h = box.querySelector("h3");
      var p = box.querySelector("p");
      if (h) h.textContent = t.business.items[i].title;
      if (p) p.textContent = t.business.items[i].text;
    });

    var hItems = document.querySelectorAll("[data-home-i]");
    hItems.forEach(function (box) {
      var i = parseInt(box.getAttribute("data-home-i"), 10);
      if (isNaN(i) || !t.homeSection.items[i]) return;
      var h = box.querySelector("h3");
      var p = box.querySelector("p");
      if (h) h.textContent = t.homeSection.items[i].title;
      if (p) p.textContent = t.homeSection.items[i].text;
    });

    var proj = document.querySelectorAll("[data-project-i]");
    proj.forEach(function (article) {
      var i = parseInt(article.getAttribute("data-project-i"), 10);
      if (isNaN(i) || !t.projects.list[i]) return;
      var h = article.querySelector("h3");
      var loc = article.querySelector(".project__loc");
      if (h) h.textContent = t.projects.list[i].title;
      if (loc) loc.textContent = t.projects.list[i].loc;
    });

    var trust = document.querySelectorAll("[data-trust-i]");
    trust.forEach(function (div) {
      var i = parseInt(div.getAttribute("data-trust-i"), 10);
      if (isNaN(i) || !t.trust[i]) return;
      var strong = div.querySelector("strong");
      var span = div.querySelector("span");
      if (strong) strong.textContent = t.trust[i].strong;
      if (span) span.textContent = t.trust[i].span;
    });

    var rev = document.querySelectorAll("[data-review-i]");
    rev.forEach(function (bq) {
      var i = parseInt(bq.getAttribute("data-review-i"), 10);
      if (isNaN(i) || !t.reviews.items[i]) return;
      var pq = bq.querySelector("p");
      var ft = bq.querySelector("footer");
      if (pq) pq.textContent = t.reviews.items[i].quote;
      if (ft) ft.textContent = t.reviews.items[i].footer;
    });

    var blogCards = document.querySelectorAll("[data-blog-i]");
    blogCards.forEach(function (a) {
      var i = parseInt(a.getAttribute("data-blog-i"), 10);
      if (isNaN(i) || !t.blog.items[i]) return;
      var meta = a.querySelector(".blog-card__meta");
      var h = a.querySelector("h3");
      var p = a.querySelector("p");
      if (meta) meta.textContent = t.blog.items[i].meta;
      if (h) h.textContent = t.blog.items[i].title;
      if (p) p.textContent = t.blog.items[i].text;
    });

    var ph = document.querySelector("[data-i18n-placeholder]");
    if (ph && t.form.placeholder) ph.setAttribute("placeholder", t.form.placeholder);

    var burger = document.getElementById("burger");
    if (burger && t.a11y.menu) burger.setAttribute("aria-label", t.a11y.menu);

    var navClose = document.getElementById("nav-close");
    if (navClose && t.a11y.closeMenu) navClose.setAttribute("aria-label", t.a11y.closeMenu);

    var langNav = document.getElementById("lang-switch");
    if (langNav && t.a11y.lang) langNav.setAttribute("aria-label", t.a11y.lang);

    var mapIframe = document.getElementById("map-iframe");
    if (mapIframe && t.map && t.map.iframeTitle) {
      mapIframe.setAttribute("title", t.map.iframeTitle);
    }

    if (t.a11yDrawer) {
      document.querySelectorAll("[data-a11y-bullet]").forEach(function (li) {
        var i = parseInt(li.getAttribute("data-a11y-bullet"), 10);
        if (!isNaN(i) && t.a11yDrawer.bullets && t.a11yDrawer.bullets[i]) {
          li.textContent = t.a11yDrawer.bullets[i];
        }
      });
      var closeDrawerBtn = document.getElementById("a11y-drawer-close");
      if (closeDrawerBtn && t.a11yDrawer.closeLabel) {
        closeDrawerBtn.setAttribute("aria-label", t.a11yDrawer.closeLabel);
      }
      var backdrop = document.getElementById("a11y-drawer-backdrop");
      if (backdrop && t.a11yDrawer.closeLabel) {
        backdrop.setAttribute("aria-label", t.a11yDrawer.closeLabel);
      }
    }

    if (window.LedVisionA11yToolbar && typeof window.LedVisionA11yToolbar.refresh === "function") {
      window.LedVisionA11yToolbar.refresh();
    }

    global.__formAlertMsg = t.formAlert;
    global.__formValidationMsg = t.form && t.form.validationError ? t.form.validationError : "";
  }

  /** Floating a11y toolbar only (e.g. accessibility.html — avoids overwriting legal page title). */
  function applyToolbarLangOnly() {
    var lang = getLang();
    document.documentElement.setAttribute("lang", lang === "he" ? "he" : lang === "ru" ? "ru" : "en");
    document.documentElement.setAttribute("dir", lang === "he" ? "rtl" : "ltr");
    var t = STRINGS[lang] || STRINGS[DEFAULT_LANG];
    document.querySelectorAll("#a11y-toolbar [data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = resolve(t, key);
      if (val == null) return;
      if (typeof val !== "string" && typeof val !== "number") return;
      el.textContent = String(val);
    });
    if (global.LedVisionA11yToolbar && typeof global.LedVisionA11yToolbar.refresh === "function") {
      global.LedVisionA11yToolbar.refresh();
    }
  }

  function resolve(obj, path) {
    var parts = path.split(".");
    var o = obj;
    for (var i = 0; i < parts.length; i++) {
      if (o == null) return null;
      var k = parts[i];
      var n = parseInt(k, 10);
      if (!isNaN(n) && String(n) === k && Array.isArray(o)) o = o[n];
      else o = o[k];
    }
    return o;
  }

  function updateLangButtons(active) {
    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      var l = btn.getAttribute("data-set-lang");
      btn.classList.toggle("is-active", l === active);
      btn.setAttribute("aria-pressed", l === active ? "true" : "false");
    });
  }

  function init() {
    var lang = getLang();
    document.documentElement.setAttribute("lang", lang === "he" ? "he" : lang === "ru" ? "ru" : "en");
    document.documentElement.setAttribute("dir", lang === "he" ? "rtl" : "ltr");
    apply(lang);
    updateLangButtons(lang);

    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var l = btn.getAttribute("data-set-lang");
        setLang(l);
      });
    });
  }

  global.LedVisionI18n = {
    init: init,
    setLang: setLang,
    getLang: getLang,
    STRINGS: STRINGS,
    applyToolbarLangOnly: applyToolbarLangOnly,
  };
})(typeof window !== "undefined" ? window : this);
