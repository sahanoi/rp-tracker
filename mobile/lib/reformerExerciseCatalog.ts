/**
 * Single source copied from SRC BY USER/reformer_pilates_exercise_list.html (`data`).
 * Keep in sync if the HTML list changes.
 */

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export type ReformerExerciseSourceRow = {
  name: string;
  tr: string | string[];
  levels: readonly DifficultyLevel[];
};

export type ReformerCategorySourceRow = {
  id: string;
  title: string;
  color: string;
  exercises: readonly ReformerExerciseSourceRow[];
};

/** Total exercise rows in HTML catalog (manual parity check vs HTML `data`). */
export const REFORMER_CATALOG_EXERCISE_COUNT_EXPECTED = 177;

export const REFORMER_CATEGORY_SOURCE: readonly ReformerCategorySourceRow[] = [
  {
    id: "breathing",
    title: "Nefes Egzersizleri",
    color: "#7F77DD",
    exercises: [
      { name: "Breathing", tr: "Temel Nefes", levels: ["beginner"] },
      {
        name: "Lateral Breathing",
        tr: "Lateral Nefes",
        levels: ["beginner"],
      },
      {
        name: "Diaphragmatic Breathing",
        tr: "Diyafram Nefesi",
        levels: ["beginner"],
      },
      {
        name: "Percussive Breathing",
        tr: "Perkütif Nefes",
        levels: ["intermediate"],
      },
      {
        name: "Breathing with Arm Reach",
        tr: "Kollu Nefes",
        levels: ["beginner"],
      },
      {
        name: "Rib Cage Breathing",
        tr: "Kaburga Nefesi",
        levels: ["beginner"],
      },
      {
        name: "Breathing on Reformer",
        tr: "Reformerde Nefes",
        levels: ["beginner"],
      },
      {
        name: "Cadillac Breathing",
        tr: "Cadillac Nefesi",
        levels: ["beginner"],
      },
    ],
  },
  {
    id: "reformer-core",
    title: "Reformer — Temel Serisi",
    color: "#1D9E75",
    exercises: [
      {
        name: "Footwork — Toes",
        tr: "Ayak Çalışması (Parmaklar)",
        levels: ["beginner"],
      },
      {
        name: "Footwork — Arches",
        tr: "Ayak Çalışması (Kemeri)",
        levels: ["beginner"],
      },
      {
        name: "Footwork — Heels",
        tr: "Ayak Çalışması (Topuklar)",
        levels: ["beginner"],
      },
      {
        name: "Footwork — Pilates V",
        tr: "Ayak Çalışması (V Pozisyonu)",
        levels: ["beginner"],
      },
      {
        name: "Footwork — Bird on Perch",
        tr: "Tünekteki Kuş",
        levels: ["beginner"],
      },
      {
        name: "Hundred",
        tr: "Yüzler",
        levels: ["beginner", "intermediate"],
      },
      {
        name: "Overhead / Jackknife",
        tr: "Baş Üstü / Çakı",
        levels: ["advanced"],
      },
      {
        name: "Coordination",
        tr: "Koordinasyon",
        levels: ["intermediate"],
      },
      {
        name: "Tendon Stretch",
        tr: "Tendon Gerilmesi",
        levels: ["intermediate", "advanced"],
      },
      {
        name: "Short Spine Massage",
        tr: "Kısa Omurga Masajı",
        levels: ["intermediate"],
      },
      {
        name: "Semi Circle",
        tr: "Yarım Daire",
        levels: ["intermediate", "advanced"],
      },
      {
        name: "Knee Stretches",
        tr: "Diz Germeler",
        levels: ["intermediate"],
      },
      {
        name: "Knee Stretch — Round Back",
        tr: "Diz Germe (Yuvarlak Sırt)",
        levels: ["intermediate"],
      },
      {
        name: "Knee Stretch — Flat Back",
        tr: "Diz Germe (Düz Sırt)",
        levels: ["intermediate"],
      },
      {
        name: "Knee Stretch — Knees Off",
        tr: "Diz Germe (Dizler Havada)",
        levels: ["advanced"],
      },
      {
        name: "Running",
        tr: "Koşu",
        levels: ["beginner", "intermediate"],
      },
      {
        name: "Pelvic Lift / Bridge",
        tr: "Pelvik Kaldırma / Köprü",
        levels: ["beginner"],
      },
    ],
  },
  {
    id: "reformer-rowing",
    title: "Reformer — Rowing & Kollar",
    color: "#378ADD",
    exercises: [
      {
        name: "Rowing — Into the Sternum",
        tr: "Kürek — Göğüse",
        levels: ["intermediate"],
      },
      {
        name: "Rowing — 90 Degrees",
        tr: "Kürek — 90 Derece",
        levels: ["intermediate"],
      },
      {
        name: "Rowing — From the Chest",
        tr: "Kürek — Göğüsten",
        levels: ["intermediate"],
      },
      {
        name: "Rowing — From the Hips",
        tr: "Kürek — Kalçadan",
        levels: ["intermediate"],
      },
      {
        name: "Shaving",
        tr: "Tıraş",
        levels: ["intermediate"],
      },
      { name: "Hug", tr: "Sarılma", levels: ["intermediate"] },
      {
        name: "Chest Expansion",
        tr: "Göğüs Açma",
        levels: ["beginner", "intermediate"],
      },
      {
        name: "Arm Circles",
        tr: "Kol Çevrimleri",
        levels: ["intermediate"],
      },
      {
        name: "Seated Arm Work",
        tr: "Oturarak Kol Çalışması",
        levels: ["beginner"],
      },
      {
        name: "Thigh Stretch",
        tr: "Uyluk Gerilmesi",
        levels: ["intermediate", "advanced"],
      },
      {
        name: "Kneeling Side Arm Series",
        tr: "Diz Üstü Yan Kol Serisi",
        levels: ["intermediate"],
      },
    ],
  },
  {
    id: "reformer-longbox",
    title: "Reformer — Long Box Serisi",
    color: "#D85A30",
    exercises: [
      {
        name: "Swan on Long Box",
        tr: "Kuğu (Uzun Kutu)",
        levels: ["intermediate"],
      },
      { name: "Pull Straps", tr: "Kayış Çekme", levels: ["intermediate"] },
      { name: "T Pull", tr: "T Çekme", levels: ["intermediate"] },
      {
        name: "Backstroke",
        tr: ["Sırt Vuruşu"],
        levels: ["intermediate"],
      },
      {
        name: "Teaser on Long Box",
        tr: "Teaser (Uzun Kutu)",
        levels: ["advanced"],
      },
      {
        name: "Breaststroke",
        tr: "Kurbağalama",
        levels: ["intermediate", "advanced"],
      },
      {
        name: "Hamstring Stretch",
        tr: "Hamstring Germe",
        levels: ["beginner", "intermediate"],
      },
      {
        name: "Horseback",
        tr: "At Sırtı",
        levels: ["advanced"],
      },
    ],
  },
  {
    id: "reformer-shortbox",
    title: "Reformer — Short Box Serisi",
    color: "#BA7517",
    exercises: [
      {
        name: "Short Box — Round",
        tr: "Kısa Kutu (Yuvarlak)",
        levels: ["intermediate"],
      },
      {
        name: "Short Box — Flat",
        tr: "Kısa Kutu (Düz)",
        levels: ["intermediate"],
      },
      {
        name: "Short Box — Side to Side",
        tr: "Kısa Kutu (Yan Yan)",
        levels: ["intermediate"],
      },
      {
        name: "Short Box — Twist",
        tr: "Kısa Kutu (Bükülme)",
        levels: ["intermediate", "advanced"],
      },
      {
        name: "Short Box — Around the World",
        tr: "Kısa Kutu (Dünya Turu)",
        levels: ["advanced"],
      },
      {
        name: "Tree on Short Box",
        tr: "Ağaç (Kısa Kutu)",
        levels: ["intermediate"],
      },
    ],
  },
  {
    id: "reformer-stretch",
    title: "Reformer — Uzun Germe Serisi",
    color: "#0F6E56",
    exercises: [
      { name: "Long Stretch", tr: "Uzun Germe", levels: ["intermediate"] },
      { name: "Down Stretch", tr: "Aşağı Germe", levels: ["intermediate"] },
      {
        name: "Up Stretch",
        tr: "Yukarı Germe",
        levels: ["intermediate", "advanced"],
      },
      {
        name: "Elephant",
        tr: "Fil",
        levels: ["beginner", "intermediate"],
      },
      {
        name: "One Leg Elephant",
        tr: "Tek Bacak Fil",
        levels: ["intermediate", "advanced"],
      },
      {
        name: "Long Back Stretch",
        tr: "Uzun Sırt Germe",
        levels: ["intermediate"],
      },
      {
        name: "Stomach Massage — Round",
        tr: "Mide Masajı (Yuvarlak)",
        levels: ["intermediate"],
      },
      {
        name: "Stomach Massage — Hands Back",
        tr: "Mide Masajı (Eller Arkada)",
        levels: ["intermediate"],
      },
      {
        name: "Stomach Massage — Reach",
        tr: "Mide Masajı (Uzanma)",
        levels: ["intermediate"],
      },
      {
        name: "Stomach Massage — Twist",
        tr: "Mide Masajı (Bükülme)",
        levels: ["intermediate", "advanced"],
      },
    ],
  },
  {
    id: "reformer-straps",
    title: "Reformer — Kayış (Straps) Serisi",
    color: "#534AB7",
    exercises: [
      {
        name: "Feet in Straps — Circles",
        tr: "Kayışta Bacak Çevrimleri",
        levels: ["beginner", "intermediate"],
      },
      {
        name: "Feet in Straps — Frogs",
        tr: "Kayışta Kurbağa",
        levels: ["beginner"],
      },
      {
        name: "Feet in Straps — Lower / Lift",
        tr: "Kayışta İniş / Kaldırma",
        levels: ["beginner"],
      },
      {
        name: "Feet in Straps — Bicycle",
        tr: "Kayışta Bisiklet",
        levels: ["intermediate"],
      },
      {
        name: "Feet in Straps — Scissors",
        tr: "Kayışta Makas",
        levels: ["intermediate"],
      },
      {
        name: "Side Splits",
        tr: "Yan Açılım",
        levels: ["advanced"],
      },
      {
        name: "Front Splits",
        tr: "Ön Açılım",
        levels: ["advanced"],
      },
      {
        name: "Russian Splits",
        tr: "Rus Açılımı",
        levels: ["advanced"],
      },
    ],
  },
  {
    id: "reformer-advanced",
    title: "Reformer — İleri Seviye",
    color: "#993C1D",
    exercises: [
      {
        name: "Snake",
        tr: "Yılan",
        levels: ["advanced"],
      },
      {
        name: "Snake & Twist",
        tr: "Yılan ve Bükülme",
        levels: ["advanced"],
      },
      {
        name: "Corkscrew",
        tr: "Tirbuşon",
        levels: ["advanced"],
      },
      {
        name: "Tick Tock",
        tr: "Tik Tok",
        levels: ["advanced"],
      },
      {
        name: "Star",
        tr: "Yıldız",
        levels: ["advanced"],
      },
      {
        name: "Control Balance",
        tr: "Denge Kontrolü",
        levels: ["advanced"],
      },
      {
        name: "Step Off — Control Balance",
        tr: "İnme — Denge Kontrolü",
        levels: ["advanced"],
      },
      {
        name: "Headstand on Reformer",
        tr: "Reformerde Baş Duruşu",
        levels: ["advanced"],
      },
      {
        name: "Mermaid",
        tr: "Deniz Kızı",
        levels: ["intermediate", "advanced"],
      },
    ],
  },
  {
    id: "cadillac",
    title: "Cadillac / Trapez Masası",
    color: "#D4537E",
    exercises: [
      {
        name: "Roll Down — Rollback Bar",
        tr: "Geri Yatış (Rollback Bar)",
        levels: ["beginner"],
      },
      {
        name: "One Arm Roll Down",
        tr: "Tek Kol Geri Yatış",
        levels: ["intermediate"],
      },
      {
        name: "Cadillac Breathing",
        tr: "Cadillac Nefesi",
        levels: ["beginner"],
      },
      {
        name: "Chest Expansion — Cadillac",
        tr: "Göğüs Açma (Cadillac)",
        levels: ["beginner"],
      },
      {
        name: "Thigh Stretch — Cadillac",
        tr: "Uyluk Germe (Cadillac)",
        levels: ["intermediate"],
      },
      {
        name: "Long Back Stretch — Cadillac",
        tr: "Uzun Sırt Germe (Cadillac)",
        levels: ["intermediate"],
      },
      {
        name: "Rolling Stomach Massage",
        tr: "Yuvarlanmalı Mide Masajı",
        levels: ["intermediate"],
      },
      {
        name: "Squats — Cadillac",
        tr: "Squat (Cadillac)",
        levels: ["beginner", "intermediate"],
      },
      {
        name: "Side Arm — Cadillac",
        tr: "Yan Kol (Cadillac)",
        levels: ["intermediate"],
      },
      {
        name: "Leg Springs — Circles",
        tr: "Bacak Yayları — Daireler",
        levels: ["beginner"],
      },
      {
        name: "Leg Springs — Walking",
        tr: "Bacak Yayları — Yürüyüş",
        levels: ["beginner"],
      },
      {
        name: "Leg Springs — Beats",
        tr: "Bacak Yayları — Vuruşlar",
        levels: ["intermediate"],
      },
      {
        name: "Leg Springs — Bicycle",
        tr: "Bacak Yayları — Bisiklet",
        levels: ["intermediate"],
      },
      {
        name: "Leg Springs — Frogs",
        tr: "Bacak Yayları — Kurbağa",
        levels: ["beginner"],
      },
      {
        name: "In the Air — Circles",
        tr: "Havada — Daireler",
        levels: ["advanced"],
      },
      {
        name: "In the Air — Walking",
        tr: "Havada — Yürüyüş",
        levels: ["advanced"],
      },
      {
        name: "Side Leg Springs — Front/Back",
        tr: "Yan Bacak Yayı — Ön/Arka",
        levels: ["intermediate"],
      },
      {
        name: "Side Leg Springs — Up/Down",
        tr: "Yan Bacak Yayı — Yukarı/Aşağı",
        levels: ["intermediate"],
      },
      {
        name: "Arm Springs — Flying Eagle",
        tr: "Kol Yayları — Uçan Kartal",
        levels: ["intermediate"],
      },
      {
        name: "Arm Springs — Press Down",
        tr: "Kol Yayları — Aşağı Basma",
        levels: ["intermediate"],
      },
      {
        name: "Pull Ups — Trapez",
        tr: "Çekiş (Trapez)",
        levels: ["advanced"],
      },
      {
        name: "Hanging Pull Ups",
        tr: "Asılarak Çekiş",
        levels: ["advanced"],
      },
      {
        name: "Twist Pull Ups",
        tr: "Döndürerek Çekiş",
        levels: ["advanced"],
      },
      {
        name: "Spread Eagle",
        tr: "Kartal Açılımı",
        levels: ["advanced"],
      },
      {
        name: "Squirrel / Flying Squirrel",
        tr: "Sincap / Uçan Sincap",
        levels: ["advanced"],
      },
    ],
  },
  {
    id: "mat",
    title: "Mat Egzersizleri",
    color: "#639922",
    exercises: [
      {
        name: "The Hundred",
        tr: "Yüzler (Mat)",
        levels: ["beginner"],
      },
      {
        name: "Roll Up",
        tr: "Yuvarlanarak Kalkma",
        levels: ["beginner", "intermediate"],
      },
      {
        name: "Roll Over",
        tr: "Yuvarlanarak Geçme",
        levels: ["advanced"],
      },
      {
        name: "Single Leg Circle",
        tr: "Tek Bacak Çevrimi",
        levels: ["beginner"],
      },
      {
        name: "Rolling Like a Ball",
        tr: "Top Gibi Yuvarlanma",
        levels: ["beginner"],
      },
      {
        name: "Single Leg Stretch",
        tr: "Tek Bacak Germe",
        levels: ["beginner"],
      },
      {
        name: "Double Leg Stretch",
        tr: "Çift Bacak Germe",
        levels: ["beginner"],
      },
      {
        name: "Spine Stretch Forward",
        tr: "Omurga Öne Germe",
        levels: ["beginner"],
      },
      {
        name: "Rocker with Open Legs",
        tr: "Açık Bacakla Sallantı",
        levels: ["intermediate"],
      },
      {
        name: "Corkscrew — Mat",
        tr: "Tirbuşon (Mat)",
        levels: ["intermediate", "advanced"],
      },
      {
        name: "Saw",
        tr: "Testere",
        levels: ["beginner"],
      },
      {
        name: "Swan Dive",
        tr: "Kuğu Dalışı",
        levels: ["intermediate"],
      },
      {
        name: "Single Leg Kick",
        tr: "Tek Bacak Tekme",
        levels: ["beginner"],
      },
      {
        name: "Double Leg Kick",
        tr: "Çift Bacak Tekme",
        levels: ["intermediate"],
      },
      {
        name: "Neck Pull",
        tr: "Boyun Çekme",
        levels: ["intermediate"],
      },
      {
        name: "Scissors — Mat",
        tr: "Makas (Mat)",
        levels: ["intermediate"],
      },
      {
        name: "Bicycle — Mat",
        tr: "Bisiklet (Mat)",
        levels: ["intermediate"],
      },
      {
        name: "Shoulder Bridge",
        tr: "Omuz Köprüsü",
        levels: ["intermediate"],
      },
      {
        name: "Spine Twist",
        tr: "Omurga Dönüşü",
        levels: ["beginner"],
      },
      {
        name: "Jackknife",
        tr: "Çakı",
        levels: ["advanced"],
      },
      {
        name: "Side Kicks Series",
        tr: "Yan Tekme Serisi",
        levels: ["beginner", "intermediate"],
      },
      {
        name: "Teaser",
        tr: "Teaser",
        levels: ["intermediate", "advanced"],
      },
      {
        name: "Hip Circles",
        tr: "Kalça Çevrimleri",
        levels: ["intermediate"],
      },
      {
        name: "Swimming",
        tr: "Yüzme",
        levels: ["intermediate"],
      },
      {
        name: "Leg Pull Front",
        tr: ["Öne Bacak Çekme"],
        levels: ["intermediate", "advanced"],
      },
      {
        name: "Leg Pull Back",
        tr: "Arkaya Bacak Çekme",
        levels: ["advanced"],
      },
      {
        name: "Kneeling Side Kicks",
        tr: "Diz Üstü Yan Tekme",
        levels: ["intermediate"],
      },
      {
        name: "Side Bend",
        tr: "Yan Bükülme",
        levels: ["intermediate"],
      },
      {
        name: "Boomerang",
        tr: "Bumerang",
        levels: ["advanced"],
      },
      {
        name: "Seal",
        tr: "Fok",
        levels: ["beginner"],
      },
      {
        name: "Crab",
        tr: "Yengeç",
        levels: ["advanced"],
      },
      {
        name: "Push Up Series",
        tr: "Şınav Serisi",
        levels: ["intermediate"],
      },
    ],
  },
  {
    id: "ball",
    title: "Topla Egzersizler (Small Ball / Stability Ball)",
    color: "#888780",
    exercises: [
      {
        name: "Hundred with Ball",
        tr: "Yüzler (Topla)",
        levels: ["beginner", "intermediate"],
      },
      {
        name: "Bridge with Ball",
        tr: "Köprü (Topla)",
        levels: ["beginner"],
      },
      {
        name: "Ball Between Thighs — Plié",
        tr: "Uyluklarda Top — Plié",
        levels: ["beginner"],
      },
      {
        name: "Ball Between Knees — Roll Back",
        tr: "Dizlerde Top — Geri Yatış",
        levels: ["beginner", "intermediate"],
      },
      {
        name: "Clamshell with Ball",
        tr: "Midye Kabuğu (Topla)",
        levels: ["beginner"],
      },
      {
        name: "Side-lying Leg Work with Ball",
        tr: "Yanda Bacak Çalışması",
        levels: ["beginner", "intermediate"],
      },
      {
        name: "Diamond Legs with Ball",
        tr: "Elmas Bacak (Topla)",
        levels: ["beginner"],
      },
      {
        name: "Spine Stretch with Ball",
        tr: "Omurga Germe (Topla)",
        levels: ["beginner"],
      },
      {
        name: "Swan on Stability Ball",
        tr: "Büyük Topla Kuğu",
        levels: ["intermediate"],
      },
      {
        name: "Ball Roll — Spine Massage",
        tr: "Top Yuvarlanması — Omurga",
        levels: ["beginner"],
      },
      {
        name: "Abdominal Curl on Stability Ball",
        tr: "Büyük Topla Karın Kasılması",
        levels: ["beginner", "intermediate"],
      },
      {
        name: "Plank on Stability Ball",
        tr: "Büyük Topla Plank",
        levels: ["intermediate"],
      },
      {
        name: "Side Bend with Small Ball",
        tr: "Küçük Topla Yan Bükülme",
        levels: ["intermediate"],
      },
    ],
  },
  {
    id: "magic-circle",
    title: "Magic Circle (Pilates Halkası)",
    color: "#5F5E5A",
    exercises: [
      {
        name: "Hundred with Magic Circle",
        tr: "Yüzler (Halkaya)",
        levels: ["beginner", "intermediate"],
      },
      {
        name: "Rolling Like a Ball — Circle",
        tr: "Top Yuvarlanması (Halkaya)",
        levels: ["intermediate"],
      },
      {
        name: "Bridge with Circle — Inner Thigh",
        tr: "Köprü — İç Uyluk (Halkaya)",
        levels: ["beginner"],
      },
      {
        name: "Bridge with Circle — Outer Thigh",
        tr: "Köprü — Dış Uyluk (Halkaya)",
        levels: ["beginner"],
      },
      {
        name: "Inner Thigh Squeeze — Lying",
        tr: "Yatarak İç Uyluk Sıkıştırma",
        levels: ["beginner"],
      },
      {
        name: "Outer Thigh Press — Lying",
        tr: "Yatarak Dış Uyluk Basma",
        levels: ["beginner"],
      },
      {
        name: "Single Leg Stretch — Circle",
        tr: "Tek Bacak Germe (Halkaya)",
        levels: ["intermediate"],
      },
      {
        name: "Side Bend with Circle",
        tr: "Halkaya Yan Bükülme",
        levels: ["intermediate"],
      },
      {
        name: "Standing Arm Work — Circle",
        tr: "Ayakta Kol (Halkaya)",
        levels: ["beginner"],
      },
      {
        name: "Swan — Circle Press",
        tr: "Kuğu — Halka Baskısı",
        levels: ["intermediate"],
      },
      {
        name: "Teaser with Circle",
        tr: "Teaser (Halkaya)",
        levels: ["intermediate", "advanced"],
      },
      {
        name: "Side-lying Circles — Ankle",
        tr: "Yanda Halkayla Daireler",
        levels: ["beginner"],
      },
    ],
  },
  {
    id: "chair",
    title: "Wunda Chair",
    color: "#185FA5",
    exercises: [
      {
        name: "Footwork on Chair",
        tr: "Ayak Çalışması (Sandalye)",
        levels: ["beginner"],
      },
      {
        name: "Pump — Seated",
        tr: "Oturarak Pompa",
        levels: ["beginner", "intermediate"],
      },
      {
        name: "Pump — Standing",
        tr: "Ayakta Pompa",
        levels: ["intermediate"],
      },
      {
        name: "Pike on Chair",
        tr: "Sandalyede Pike",
        levels: ["advanced"],
      },
      {
        name: "Mountain Climb",
        tr: "Dağ Tırmanışı",
        levels: ["advanced"],
      },
      {
        name: "Swan on Chair",
        tr: "Sandalyede Kuğu",
        levels: ["intermediate"],
      },
      {
        name: "Push Down — Standing",
        tr: "Ayakta Aşağı Basma",
        levels: ["intermediate"],
      },
      {
        name: "Teaser on Chair",
        tr: "Sandalyede Teaser",
        levels: ["advanced"],
      },
      {
        name: "Mermaid on Chair",
        tr: "Sandalyede Deniz Kızı",
        levels: ["intermediate"],
      },
    ],
  },
  {
    id: "barrel",
    title: "Barrel / Spine Corrector",
    color: "#A32D2D",
    exercises: [
      {
        name: "Spine Stretch on Barrel",
        tr: "Varil Üstü Omurga Germe",
        levels: ["beginner"],
      },
      {
        name: "Swan on Barrel",
        tr: "Varil Üstü Kuğu",
        levels: ["beginner", "intermediate"],
      },
      {
        name: "Side Stretch on Barrel",
        tr: "Varil Üstü Yan Germe",
        levels: ["beginner"],
      },
      {
        name: "Abdominal Series — Barrel",
        tr: "Karın Serisi (Varil)",
        levels: ["intermediate"],
      },
      {
        name: "Hip Flexor Stretch",
        tr: "Kalça Bükücü Germe",
        levels: ["beginner"],
      },
      {
        name: "Hamstring Stretch on Ladder",
        tr: "Merdivende Hamstring Germe",
        levels: ["beginner"],
      },
      {
        name: "Back Extension on Barrel",
        tr: "Varil Üstü Sırt Uzatma",
        levels: ["intermediate"],
      },
      {
        name: "Mermaid on Spine Corrector",
        tr: "Omurga Düzelticisinde Deniz Kızı",
        levels: ["intermediate"],
      },
      {
        name: "Cannonball",
        tr: "Gülle",
        levels: ["intermediate"],
      },
    ],
  },
];

/** Short equipment line for subtitles (derived from HTML category id). */
const EQUIP_HINT: Record<string, string> = {
  breathing: "Nefes",
  "reformer-core": "Reformer · Temel",
  "reformer-rowing": "Reformer · Kürek / kol",
  "reformer-longbox": "Reformer · Long box",
  "reformer-shortbox": "Reformer · Short box",
  "reformer-stretch": "Reformer · Germe",
  "reformer-straps": "Reformer · Kayış",
  "reformer-advanced": "Reformer · İleri",
  cadillac: "Cadillac / Trapez",
  mat: "Mat",
  ball: "Top",
  "magic-circle": "Magic Circle",
  chair: "Wunda Chair",
  barrel: "Barrel · Spine Corrector",
};

export function slugifyExerciseName(nameEn: string): string {
  return nameEn
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[—–/]/g, "-")
    .replace(/[&]/g, "and")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

export function normalizedExerciseTr(row: ReformerExerciseSourceRow): string {
  return Array.isArray(row.tr) ? row.tr[0] : row.tr;
}

export function makeStableExerciseId(
  categoryId: string,
  nameEn: string
): string {
  return `${categoryId}__${slugifyExerciseName(nameEn)}`;
}

/** Spring / yay UI for reformer, cadillac, chair (per catalog plan). */
export function categoryPrefersSpringTension(categoryId: string): boolean {
  return (
    categoryId.startsWith("reformer-") ||
    categoryId === "cadillac" ||
    categoryId === "chair"
  );
}

export type FlatReformerExercise = {
  id: string;
  titleTr: string;
  titleEn: string;
  categoryId: string;
  categoryTitle: string;
  categoryColor: string;
  equipmentSubtitle: string;
  difficulties: readonly DifficultyLevel[];
};

function flatRow(
  cat: ReformerCategorySourceRow,
  ex: ReformerExerciseSourceRow
): FlatReformerExercise {
  const id = makeStableExerciseId(cat.id, ex.name);
  return {
    id,
    titleTr: normalizedExerciseTr(ex),
    titleEn: ex.name,
    categoryId: cat.id,
    categoryTitle: cat.title,
    categoryColor: cat.color,
    equipmentSubtitle:
      EQUIP_HINT[cat.id] ?? cat.title.replace(/\s+/g, " ").trim(),
    difficulties: ex.levels,
  };
}

let _flatCache: FlatReformerExercise[] | null = null;
let _uniqAsserted = false;

export function listFlatReformerExercises(): FlatReformerExercise[] {
  if (_flatCache != null) return _flatCache;
  const rows: FlatReformerExercise[] = [];
  const seen = new Set<string>();

  for (const cat of REFORMER_CATEGORY_SOURCE) {
    for (const ex of cat.exercises) {
      const f = flatRow(cat, ex);
      if (seen.has(f.id)) {
        throw new Error(`Duplicate reformer catalog id: ${f.id}`);
      }
      seen.add(f.id);
      rows.push(f);
    }
  }

  if (!_uniqAsserted) {
    _uniqAsserted = true;
    const n = REFORMER_CATALOG_EXERCISE_COUNT_EXPECTED;
    if (rows.length !== n) {
      console.warn(
        `[reformerExerciseCatalog] expected ${n} exercises, got ${rows.length}`
      );
    }
  }

  _flatCache = rows;
  return rows;
}

export type SectionForPicker = {
  categoryId: string;
  categoryTitle: string;
  categoryColor: string;
  exercises: FlatReformerExercise[];
};

export function exerciseMatchesDifficultyFilter(
  ex: FlatReformerExercise,
  filter: DifficultyLevel | "all"
): boolean {
  if (filter === "all") return true;
  return ex.difficulties.includes(filter);
}

export function exerciseMatchesSearch(
  ex: FlatReformerExercise,
  needle: string
): boolean {
  if (!needle.trim()) return true;
  const q = needle.trim().toLowerCase();
  if (ex.titleEn.toLowerCase().includes(q)) return true;
  if (ex.titleTr.toLowerCase().includes(q)) return true;
  if (ex.categoryTitle.toLowerCase().includes(q)) return true;
  return false;
}

export function groupedSectionsForPicker(
  needle: string,
  difficultyFilter: DifficultyLevel | "all"
): SectionForPicker[] {
  const out: SectionForPicker[] = [];

  for (const cat of REFORMER_CATEGORY_SOURCE) {
    const exercises: FlatReformerExercise[] = [];
    for (const ex of cat.exercises) {
      const flat = flatRow(cat, ex);
      if (
        exerciseMatchesDifficultyFilter(flat, difficultyFilter) &&
        exerciseMatchesSearch(flat, needle)
      ) {
        exercises.push(flat);
      }
    }
    if (exercises.length > 0) {
      out.push({
        categoryId: cat.id,
        categoryTitle: cat.title,
        categoryColor: cat.color,
        exercises,
      });
    }
  }

  return out;
}
