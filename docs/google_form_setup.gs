/**
 * Reformer Pilates Discovery Survey - Google Form Generator
 * 
 * Bu script, Reformer Pilates Keşif Anketi'ni otomatik olarak oluşturur.
 * Kullanımı:
 * 1. script.google.com adresine gidin.
 * 2. Yeni Proje (New Project) oluşturun.
 * 3. Bu kodu oraya yapıştırın.
 * 4. 'Çalıştır' (Run) düğmesine basın.
 */

function createReformerPilatesSurvey() {
  var form = FormApp.create('Reformer Pilates Keşif Anketi');
  
  form.setDescription('Bu anketin amacı, standart spor salonu takibi ile Pilates sanatı arasındaki boşluğu doldurmaktır. Bir Pilates vücudunun gerçekte nasıl çalıştığını anlayan bir uygulama geliştirmek istiyoruz.');

  // Bölüm 1: Pilates'in "Ruhu"
  form.addSectionHeaderItem()
      .setTitle('Bölüm 1: Pilates\'in "Ruhu" (Prensipler)');
  
  form.addParagraphTextItem()
      .setTitle('1. Büyük Altılı: Pilates; Merkezleme, Konsantrasyon, Kontrol, Kesinlik, Nefes ve Akış prensiplerine dayanır. Eğer bunları takip etseydik, bir uygulayıcı için hangisini görmek en önemlisi olurdu?')
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle('2. "Kalite" Farkı: Bir eğitmen olarak "hareket kalitesini" sadece saymak dışında nasıl ölçersiniz?')
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle('3. Zihin-Vücut Bağlantısı: "Zihinsel Odaklanma" veya "Nefes Senkronizasyonu"nun bir metrik olarak takip edilmesinin değerli olduğunu düşünüyor musunuz?')
      .setRequired(true);

  // Bölüm 2: Mekanik ve Ekipman
  form.addSectionHeaderItem()
      .setTitle('Bölüm 2: Mekanik ve Ekipman ("Reformer" Faktörü)');

  form.addParagraphTextItem()
      .setTitle('4. Yaylar vs. Ağırlıklar: Daha az yay direnci genellikle bir egzersizi daha zor hale getirir. Yayları nasıl kaydetmeliyiz? (Örn: "İki Sarı, Bir Kırmızı" mı yoksa hesaplanmış bir "Direnç Seviyesi" mi?)')
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle('5. Ekipman Kurulumu: Tek bir egzersiz için "Ayak Barı Pozisyonu" veya "Başlık Ayarı" takip edilmesini gerektirecek kadar sık değişiyor mu?')
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle('6. Destek Ekipmanları (Props): Reformer hareketlerine ne sıklıkla aksesuar (Çember, Top vb.) eklersiniz? Uygulamanın bir "Aksesuar Ekle" seçeneğine ihtiyacı var mı?')
      .setRequired(true);

  // Bölüm 3: Takip ve İlerleme
  form.addSectionHeaderItem()
      .setTitle('Bölüm 3: Takip ve İlerleme (Kullanıcı Deneyimi)');

  form.addParagraphTextItem()
      .setTitle('7. Geçiş "Akışı": Uygulama "Geçiş Süresini" mi yoksa sadece egzersizleri mi takip etmeli?')
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle('8. İlerleme: Birinin Pilates\'te "seviye atladığını" nasıl anlarsınız? Aynı hareketi daha az destekle yapmak mı, yoksa daha fazla tekrar yapmak mı?')
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle('9. Hevy Karşılaştırması: Spor salonu uygulamalarında Pilates seansı kaydetmeye çalışırken en çok "sinir bozucu" veya "yanlış" bulduğunuz şey nedir?')
      .setRequired(true);

  // Bölüm 4: Eğitmen Perspektifi
  form.addSectionHeaderItem()
      .setTitle('Bölüm 4: Eğitmen Perspektifi');

  form.addParagraphTextItem()
      .setTitle('10. Seans Hedefleri: Bir seansı planlarken "Kas Grupları" üzerinden mi yoksa "Omurga Düzlemleri" üzerinden mi düşünürsünüz?')
      .setRequired(true);

  form.addParagraphTextItem()
      .setTitle('11. Danışan Geri Bildirimi: Danışanlarınızın ilerlemeleri hakkında size en sık sorduğu veri nedir?')
      .setRequired(true);

  Logger.log('Form Oluşturuldu! URL: ' + form.getPublishedUrl());
  Logger.log('Düzenleme URL: ' + form.getEditUrl());
}
