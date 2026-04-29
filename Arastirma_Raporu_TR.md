# Reformer Pilates Takip Uygulaması — Araştırma ve Bilgi Bankası

Reformer Pilates için özelleştirilmiş bir **Hevy benzeri takip uygulaması** oluşturmak amacıyla Hevy uygulamasının analizini, Reformer Pilates alan bilgisini ve özellik eşleştirmesini içeren kapsamlı bir rapor.

---

## 1. Hevy Uygulaması İncelemesi

### 1.1 Temel Mimari — Üç Ana Sütun

| Sütun | Açıklama |
|---|---|
| **Antrenman Kaydı (Logging)** | Setler, tekrarlar, ağırlık, RPE (Zorluk Algısı) ve süre ile gerçek zamanlı seans takibi |
| **Gelişim Analitiği (Analytics)** | Grafikler, Kişisel Rekorlar (PR), kas grubu analizi, vücut ölçümleri |
| **Sosyal / Topluluk** | Arkadaşları takip etme, antrenmanları paylaşma, liderlik tablosu, yorumlar |

### 1.2 Veri Modeli

Hevy'nin veri modeli akışı şu şekildedir: **Kullanıcı → Rutinler → Antrenmanlar → Egzersizler → Setler**

```text
Kullanıcı
├── Rutinler (yeniden kullanılabilir şablonlar)
│   ├── Rutin Adı
│   ├── Egzersizler[]
│   │   ├── Egzersiz Şablonu ID'si
│   │   ├── Setler[]  (hedef tekrar/ağırlık aralıkları)
│   │   ├── Dinlenme Süresi (saniye)
│   │   └── Notlar
│   └── Klasör Organizasyonu
│
├── Antrenmanlar (kaydedilmiş seanslar)
│   ├── Tarih, Süre, Ad, Notlar
│   ├── Egzersizler[]
│   │   ├── Egzersiz Şablonu
│   │   ├── Setler[]
│   │   │   ├── Set Sırası
│   │   │   ├── Ağırlık + Birim (kg/lb)
│   │   │   ├── Tekrar Sayısı
│   │   │   ├── RPE (1-10)
│   │   │   ├── Süre (saniye)
│   │   │   ├── Mesafe + Birim
│   │   │   ├── Set Türü: Normal | Isınma | Tükeniş (Failure) | Drop Set
│   │   │   └── Notlar
│   │   └── Egzersiz Notları
│   └── Antrenman Notları
│
├── Egzersiz Şablonları (varsayılan + özel)
│   ├── Ad, Hedef Kas Grupları, Ekipman
│   ├── Talimatlar, Demo Animasyonu
│   └── Kişisel Geçmiş & Rekorlar (PR)
│
└── Vücut Ölçümleri & Gelişim Fotoğrafları
```

### 1.3 Temel Özelliklerin Kırılımı

#### Antrenman Kaydı (Logging)
- Boş bir sayfa ile veya rutin şablonu seçerek başlama
- 400'den fazla egzersiz içeren kütüphaneden egzersiz ekleme
- Her set için ağırlık, tekrar ve RPE kaydı
- Set türleri: Normal, Isınma (Warm-up), Drop Set, Tükeniş (Failure)
- Önceki antrenman verilerini otomatik doldurma
- Her egzersiz için özelleştirilebilir otomatik dinlenme sayaçları
- Ağırlık plakası hesaplayıcı
- Isınma seti hesaplayıcı
- Egzersiz bazlı ve set bazlı notlar
- Süperset desteği (egzersizleri eşleştirme)
- Seans süresinin otomatik takibi

#### Rutinler ve Programlar
- Sınırsız özel rutin (yeniden kullanılabilir antrenman şablonları)
- 8 farklı kategoride 26 adet hazır antrenman programı
- Rutinleri klasörler halinde düzenleme
- Diğer kullanıcıların rutinlerini kopyalama
- Set başına hedef tekrar/ağırlık belirleme

#### Gelişim ve Analitik
- Hacim, en iyi ağırlık, toplam tekrar için tam ekran grafikler
- Canlı Kişisel Rekor (PR) bildirimleri
- Tahmini 1RM (Tekrar Maksimumu) hesaplaması
- Kas grubu aktivite grafikleri / haftalık kas grubu set sayısı
- Antrenman tutarlılık serileri (streak)
- Vücut ölçümlerini takip etme
- Gelişim fotoğrafları
- Yıl sonu özeti (Year-in-review)
- Yaş/kilo/cinsiyet gruplarına göre güç seviyesi kıyaslaması (Başlangıç → Elit)

#### Sosyal Özellikler
- Arkadaşları takip etme, antrenmanlarını görme
- Antrenmanları beğenme ve yorum yapma
- Rutin paylaşma/kopyalama
- Sosyal akış ve liderlik tabloları
- Strava entegrasyonu

### 1.4 Hevy Coach (Eğitmen Özellikleri)

| Özellik | Açıklama |
|---|---|
| **Müşteri Yönetimi** | Organize profiller, aktiviteye genel bakış, atanan programlar |
| **Antrenman Oluşturucu** | Egzersiz, set, tekrar ve dinlenme sürelerini içeren program oluşturma |
| **Toplu Atama** | Programları aynı anda birden fazla müşteriye atayabilme |
| **Canlı Seans Kaydı** | Birebir (1-on-1) ders sırasında hastanın/müşterinin antrenmanını kaydetme |
| **Anlık Düzenlemeler** | Egzersiz değiştirme, set ekleme/çıkarma, set türünü değiştirme |
| **Gelişim Paneli** | Müşteri istatistiklerini, ölçümlerini ve vücut verilerini takip etme |
| **Özel Egzersiz Kütüphanesi** | Kendi video ve bağlantılarınızı içeren özel egzersizler yaratma |
| **Uygulama İçi Sohbet** | Müşterilerle doğrudan mesajlaşma, resim/video paylaşımı |
| **Ekip İşbirliği** | Ortak kütüphane ile eğitmen ekipleri kurma |
| **Müşteri Katılımı (Onboarding)** | Kolay kurulum süreci ve e-posta ile davet |
| **Eğitmene Özel Notlar** | Sadece eğitmenin görebileceği müşteri notları |

### 1.5 UI/UX Tasarım Prensipleri

- Hızlı taramaya olanak sağlayan, temiz ve minimal arayüz
- Parlama (glow) efektleri ile zenginleştirilmiş koyu mod (dark mode) estetiği
- Rozet sistemi ve görsel motive ediciler
- Enerjik ama sade bir tasarım dili
- Çoklu platform: iOS, Android, Web, Apple Watch, Wear OS

---

## 2. Reformer Pilates — Alan Bilgisi (🇹🇷 Türkiye Odaklı)

### 2.1 Reformer Pilates Nedir?

Reformer Pilates, özel olarak tasarlanmış bir alet ("reformer") üzerinde, **yay (spring) sistemi** ile direnç sağlayarak uygulanan bir egzersiz yöntemidir. Mat pilatesinden farklı olarak:

- Yaylar aracılığıyla ayarlanabilir direnç sunar.
- Hem yüzeysel hem de derin kasları aktive eder.
- Kişiye özel zorluk seviyesi ayarlanabilir.
- Eklemlere zarar vermeyen, düşük etkili (low-impact) bir egzersiz şeklidir.

### 2.2 Temel Faydalar

| Fayda | Detay |
|---|---|
| **Kas Güçlendirme** | Tüm vücut kaslarını dengeli çalıştırır; özellikle core, sırt ve kalça |
| **Esneklik Artışı** | Tam hareket aralığında (full ROM) yapılarak eklem sağlığını destekler |
| **Postür Düzeltme** | Omurga hizalamasını iyileştirir, kamburluğu (kifoz) önler |
| **Rehabilitasyon** | Fizyoterapist eşliğinde sakatlık sonrası iyileşme sağlar |
| **Stres Azaltma** | Nefes teknikleri ve odaklanma ile zihinsel rahatlama |
| **Vücut Şekillendirme** | Uzun, ince ve sıkı bir kas yapısı oluşturur |

### 2.3 Egzersiz Kütüphanesi — Temel Hareketler

#### Başlangıç Seviyesi (Beginner)
| Hareket | Hedef Bölge | Açıklama |
|---|---|---|
| **Footwork (Ayak Çalışmaları)** | Bacak, kalça, diz | Isınma ve alt gövde kontrolü |
| **The Hundred** | Core, karın | Nefes kontrolüyle karın aktivasyonu |
| **Mermaid (Deniz Kızı)** | Yan gövde | Esneklik ve rahatlama sağlayan esneme |
| **Leg Circles in Straps** | Kalça, iç/dış bacak | Kalça mobilitesi (hareketliliği) |

#### Orta Seviye (Intermediate)
| Hareket | Hedef Bölge | Açıklama |
|---|---|---|
| **Short Box Serisi** | Karın, bel, omurga | Omurga mobilitesi ve esneklik |
| **Side Splits (Yan Ayırmalar)** | Kalça, iç bacak | Denge ve iç bacak kaslarını geliştirme |
| **Short Spine Massage** | Omurga | Sırtı uzatma, beli rahatlatma |
| **Arm Work Series** | Kol, omuz | Üst gövdeyi güçlendirme |
| **Rowing (Kürek Çekme)** | Kol, sırt | Omuz dengesi sağlama |

#### İleri Seviye (Advanced)
| Hareket | Hedef Bölge | Açıklama |
|---|---|---|
| **Elephant** | Tüm Vücut, core | Tüm vücut entegrasyonu ve kontrol |
| **Long Stretch** | Tüm Vücut | Üst gövde + core için yüksek zorluklu plank |
| **Cobra (Kobra)** | Omurga, sırt | İleri seviye sırt ve bel çalışması |
| **Snake & Snake Twist** | Omurga, core | Omurga rotasyonu ve karın kontrolü |
| **Plank Varyasyonları** | Core | Çekirdek (core) kaslarını maksimum düzeyde çalıştırma |

### 2.4 Spring (Yay) Sistemi

Reformer Pilates'in en önemli değişkeni **yay (spring)** ayarıdır. Bu, Hevy'deki "ağırlık (weight)" kavramının Reformer'daki eşdeğeridir.

| Özellik | Detay |
|---|---|
| **Renk Kodlaması** | Markadan markaya değişir (örn: Balanced Body'de Kırmızı=ağır, Mavi=yarı ağır, Sarı=hafif) |
| **Direnç Seviyeleri** | Hafif, Orta, Ağır (genellikle 1 ila 5 yayın kombinasyonu ile sağlanır) |
| **Yay Kombinasyonları** | Farklı yay renk/sayı kombinasyonları egzersiz zorluğunu belirler (Örn: 1 Kırmızı + 1 Mavi) |
| **Kişiselleştirme** | Eğitmen, kişinin seviyesine ve hedeflenen kasa göre yay ayarı önerir |

> **Önemli**: Yanlış yay seçimi (daha ağır veya daha hafif) hareketin formunu bozabilir ve etkisiz olmasına neden olabilir.

### 2.5 Zorluk Seviyeleri

Geçiş süreci: **Başlangıç (Beginner) → Orta (Intermediate) → İleri (Advanced)**

- **Başlangıç**: Temel hareketler, doğru nefes ve doğru form öğrenme.
- **Orta**: Asimetrik hareketler, daha fazla denge gereksinimi ve yay direncinin amacı doğrultusunda değiştirilmesi (direnci artırmak veya destek miktarını azaltmak).
- **İleri**: Yüksek seviyede denge, güç ve kontrol gerektiren sofistike ve karmaşık hareket dizileri.

### 2.6 Türkiye'deki Reformer Pilates Pazarı

| Veri | Detay |
|---|---|
| **Küresel Pazar (2025)** | ~$630M (dar kapsamlı) veya ~$7.6B (geniş kapsamlı tahmin) |
| **Türkiye'nin Payı** | Küresel pazarın ~%0.91'i (Orta Doğu bölgesinin payı %5.10) |
| **Büyüme Oranı** | Yıllık %8.2 bileşik büyüme (CAGR) (2025-2035 arası beklenti) |
| **Stüdyo Yaygınlığı** | Neredeyse "her semtte bir stüdyo" seviyesine ulaştı |
| **Stüdyo Genişlemesi** | Stüdyo sahiplerinin %38'i 12 ay içinde yeni bir şube açmayı planlıyor |
| **Popülerlik** | Sosyal medyada (özellikle TikTok "Pilates Girls" akımı) yüksek görünürlük |

### 2.7 Türkiye'deki Mevcut Uygulamalar

Türkiye'deki mevcut pilates uygulamaları büyük ölçüde **stüdyo yönetimi ve ders rezervasyonu** odaklıdır, gelişmiş **egzersiz takibi/logging** sunmazlar:

| Uygulama | Temel Odak Noktası |
|---|---|
| Reformer Pilates 24/7 | Stüdyo kapı erişimi (7/24), üyelik yönetimi |
| Reformer Pilates Studio Duygu | Ders bilgisi, paket satın alma |
| Reforme Pilates | Ders rezervasyonu, paket satın alma |
| Glow Reformer Pilates | Ders programı görüntüleme, kayıt |
| Reform Pilates | Rezervasyon, QR kod ile giriş, stüdyo ölçüm listeleme |
| Pilates Reformer Studio | Seans rezervasyonu, haftalık program takibi |

> **Piyasa Boşluğu**: Türkiye'deki mevcut uygulamaların HİÇBİRİ Hevy tarzında **detaylı egzersiz takibi, set/tekrar/yay loglama veya ilerleme analizi** sunmuyor. Tamamı stüdyo rezervasyon ve paket takip sistemi. Bu alan büyük bir fırsat barındırmaktadır!

---

## 3. Özellik Eşleştirmesi: Hevy → Reformer Pilates Tracker

### 3.1 Doğrudan Konsept Çevirisi

| Hevy Konsepti | Reformer Pilates Karşılığı |
|---|---|
| Ağırlık / Weight (kg/lb) | **Yay Ayarı / Spring Setting** (renk ve sayı konfigürasyonu) |
| Tekrar / Reps | **Tekrar / Reps** (aynı kalır) |
| Setler / Sets | **Setler / Sets** (aynı kalır) |
| RPE (1-10) | **RPE + Form Kalitesi** (zorluk algısı + hareketin ne kadar doğru yapıldığı) |
| Egzersiz Kütüphanesi | **Reformer Hareket Kütüphanesi** (reformer aletine özgü) |
| Kas Grupları (Muscle Groups) | **Hedef Bölgeler** (core, kalça, sırt, omuz, vb.) |
| Ekipman Filtresi (Equipment) | **Reformer Aksesuarları** (box, strap, ring, jumpboard, pole) |
| Set Türleri (warm-up, failure vb.) | **Set Türleri** (ısınma, modifiye/kolaylaştırılmış, ileri/zorlaştırılmış) |
| Routine (Rutin) | **Ders Programı / Akış (Flow) Şablonu** |
| Workout (Antrenman) | **Seans** (ders veya kişisel antrenman kaydı) |
| 1RM / PR (Kişisel Rekor) | **Gelişim Metrikleri** (esneklik artışı, direnç/yay ilerlemesi, tutma süresi) |
| Rest Timer (Dinlenme Sayacı) | **Geçiş Süresi** (hareketler ve pozisyonlar arası süre) |

### 3.2 Reformer'a Özgü Yeni Özellikler (Hevy'de Olmayanlar)

Hevy'nin varsayılan yapısında bulunmayan, ancak bir Reformer uygulaması için kritik özellikler:

| Özellik | Açıklama |
|---|---|
| **Yay Konfigürasyonu Kaydı** | Egzersiz başına tam yay kombinasyonunu kaydetme (örn: 1 Kırmızı + 1 Mavi yay) |
| **Vücut Pozisyonu Takibi** | Sırtüstü (supine), yüzüstü (prone), yan yatış (side-lying), oturma, ayakta durma vb. parametreleri |
| **Bekleme Süresi (Hold Duration)** | İzometrik egzersizler (plank vb.) için gerilim altında kalma süresi (Time-under-tension) |
| **Hareket Açıklığı (ROM)** | Her egzersiz için esneklik artışını grafiksel takip edebilme yeteneği |
| **Taşıyıcı (Carriage) Pozisyonu** | Hareketin nerede başladığı/bittiği (Reformer üzerindeki mesafe noktaları) |
| **Ek Aksesuarlar** | Hangi aksesuarın takılı olduğu (Box, Jumpboard, Platform Extender, Magic Circle, vb.) |
| **Taraf (Side) Takibi** | Asimetrik (tek bacak/tek kol) egzersizler için Sağ/Sol taraf verisini ayrı girme |
| **Form Kalitesi Puanı** | Bireyin kendi değerlendirmesi veya eğitmenin verdiği "doğru form" puanı (Yıldız veya 1-10) |
| **Nefes Deseni Notları** | Nerede nefes alınıp (inhale), nerede verileceğine (exhale) dair hatırlatmalar |
| **Ağrı/Rahatsızlık Kaydı** | Egzersiz sırasında bel, boyun veya eklemlerde hissedilen rahatsızlıkların kaydı (Klinik pilates için çok önemli) |
| **Eğitmen Akış Oluşturucu** | Hareketleri sıralı ve zamanlı bir "Ders Akışı" (Class Flow) formatında birleştirme |

### 3.3 Önerilen Kullanıcı Rolleri

| Rol | Yetkiler ve Özellikler |
|---|---|
| **Pratisyen / Kullanıcı** | Kendi seanslarını kaydetme, gelişim grafiği izleme, egzersiz kütüphanesine erişim. |
| **Eğitmen (Instructor)** | Ders akışları oluşturma, müşterilere (üyelere) program atama, gelişimi takip etme. |
| **Stüdyo Sahibi (Gelecek Vizyon)**| Analitik kontrol paneli, eğitmen performansı ölçümü, genel müşteri raporları. |

### 3.4 Reformer Pilatese Özgü Gelişim Takibi Yöntemleri

| Metrik | Nasıl Takip Edilir? |
|---|---|
| **Direnç (Yay) Gelişimi** | Zaman içerisinde daha ağır (veya harekete göre daha destekleyici/hafif) yaylara geçiş yapılıyor mu? |
| **Egzersiz Karmaşıklığı** | Başlangıç seviyesinden → İleri seviye varyasyonlara geçiş oranı. |
| **Esneklik (ROM)** | Vücut ölçümleri veya öznel form puanı ile hareket genişliğinin artışı. |
| **Seans Tutarlılığı** | Haftalık antrenman sıklığı "streak" (seri) takibi. |
| **Vücut Dengesi** | Sağ ve sol tarafın tekrar/direnç eşitleme oranı. |
| **Postür (Duruş) Puanı** | Düzenli aralıklarla yapılan fotoğraflı postür değerlendirmesi. |

---

## 4. Rekabet Analizi Özeti

| Özellik | Hevy (Gym Odaklı) | Mevcut Türk Pilates Appleri | **Bizim Hedeflediğimiz App** |
|---|---|---|---|
| Detaylı egzersiz kaydı (Logging) | ✅ Var | ❌ Yok | ✅ **Var** |
| Yay (Spring) / Direnç takibi | N/A (Ağırlık bazlı) | ❌ Yok | ✅ **Var** |
| Egzersiz kütüphanesi (Video animasyon) | ✅ Var (Spor Salonu) | ❌ Yok | ✅ **Var** (Reformer odaklı) |
| İlerleme analitiği ve grafikler | ✅ Var | ❌ Yok | ✅ **Var** |
| Program/Akkış (Routine) şablonları | ✅ Var | ❌ Yok | ✅ **Ders Akış Oluşturucu** |
| Ders / Stüdyo rezervasyonu | ❌ Yok | ✅ **VAR** (Temel odakları) | 🟡 Opsiyonel (V3 Entegrasyonu) |
| Eğitmen Takibi / Coach Modu | ✅ Var (Hevy Coach) | ❌ Yok | ✅ **Var** |
| Sosyal özellikler (Takip, beğeni) | ✅ Var | ❌ Yok | 🟡 Faz 2 Hedefi |

---

## 5. Önerilen MVP (Minimum Uygulanabilir Ürün) Kapsamı

### 1. Aşama (Faz 1) — Temel Altyapı ve Kayıt
1. **Egzersiz Kütüphanesi:** Zorluk seviyeleri, hedef kaslar, önerilen yay ayarları, vücut pozisyonları ve aksesuar gereksinimleriyle tam donanımlı reformer veritabanı.
2. **Seans Kaydı (Logger):** Egzersizler, setler, tekrarlar, yay konfigürasyonu, tutma süreleri ve sağ/sol taraf bilgisi ile gerçek zamanlı kayıt yapabilme.
3. **Akış / Şablon Oluşturucu:** Tekrar kullanılabilir seans/ders akışları yaratma.
4. **Gelişim Paneli:** Yaylardaki ilerleme, seans tutarlılığı (consistency) ve zorluk seviyelerinde kaydedilen ilerleme için temel grafikler.
5. **Kullanıcı Profili:** Hedefler, tecrübe seviyesi ve vücut bilgisini içeren genel profil alanı.

### 2. Aşama (Faz 2) — Eğitmen Modu ve Sosyal Özellikler
6. **Eğitmen Paneli (Instructor Mode):** Müşteri (üye) yönetimi, kişiye özel seans atama, öğrencilerin verilerini ekrandan izleme.
7. **Sosyal Akış:** Çalışmaları paylaşma, diğer reformer severleri takip etme, topluluk hissi.
8. **Gelişmiş Analitikler:** Esneklik takibi, postür derecelendirmesi ve sağ/sol vücut dengesi analizi.

### 3. Aşama (Faz 3) — Platform Genişlemesi ve İşletme Entegrasyonu
9. **Rezervasyon Entegrasyonu:** Mevcut stüdyo yazılımlarının açık API'leri ile rezervasyon sistemine bağlantı kurulması.
10. **Akıllı Saat Desteği (Apple Watch):** Ders esnasında telefona bakmadan yay ve set kaydı girebilme (Özellikle grup derslerindeki eğitmenler için kolaylık).
11. **Yapay Zeka (AI) Form Asistanı:** Yüklenen videodan form analizi ve duruş geri bildirimleri.

---

> [!TIP]
> **Kritik Çıkarım:** Türkiye Reformer Pilates pazarında kullanıcının yaptığı egzersizi, yayı veya seti kaydeden **hiçbir özel uygulama yoktur**. Pazardaki tüm uygulamalar rezervasyon yazılımıdır. Reformer Pilates'e özel geliştirilmiş "Hevy tarzı" bir tracker / kayıt sistemi, **kendi dikeyinde pazarın İLKİ olma potansiyeli taşımaktadır.**
