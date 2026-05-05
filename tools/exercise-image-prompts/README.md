# Egzersiz görseli — Nano Banana / Gemini deneme paketi

Kaynak katalog: `mobile/lib/reformerExerciseCatalog.ts`. Stabil dosya adları: `makeStableExerciseId(categoryId, nameEn)` → örn. `reformer-core__footwork-toes`.

## Dosyalar

| Dosya | Açıklama |
|--------|-----------|
| `style-prefix.txt` | Her görüntü promptunun sabit stil paragrafı (v1). |
| `style-prefix-anti-photo.txt` | “Absolutely not photorealistic” ile başlayan alternatif stil. |
| `prompts.json` | 28 satır: `id`, kategori, EN/TR başlık, yalnızca `scene` metni. |
| `prompts.resolved.json` | `resolve-prompts.mjs` çıktısı: her satırda tam `fullPrompt`. |
| `out/prompt-text/*.txt` | Her egzersiz için tek dosyada tam prompt (toplu işlemler için). |

## Önerilen görüntü oranı

Uygulama kartına yakın **4:5** veya **1:1**.

## 1) İlk deneme (Nano Banana web) — STYLE sabit, yalnızca sahne değişsin

Aşağıdaki **üç** `id` farklı ekipman gösterir: reformer temel, mat, germe. Hepsi aynı stil dosyasından üretilir.

1. `reformer-core__footwork-toes` — `prompts.resolved.json` içinde `fullPrompt` kopyala veya `out/prompt-text/reformer-core__footwork-toes.txt`.
2. `mat__the-hundred` — mat, ekipmansız.
3. `reformer-stretch__elephant` — ayakta reformer silüeti.

Model çok fotoğrafa yakın üretirse, stili kilitlemeden önce `style-prefix-anti-photo.txt` ile yeniden çözümle:

```bash
cd tools/exercise-image-prompts
node resolve-prompts.mjs
# veya
set STYLE_FILE=style-prefix-anti-photo.txt&& node resolve-prompts.mjs
```

( PowerShell: `$env:STYLE_FILE='style-prefix-anti-photo.txt'; node resolve-prompts.mjs` )

## 2) Stili dondurma (“lock style”)

Beğendiğin çıktıya karşılık gelen metin şu dosyalardan hangisini kullandıysa onu **tek doğruluk kaynağı** yap:

- `style-prefix.txt` içeriğini güncelle (palette, kamera, M.K. konumu net ifadelerle).
- İsteğe bağlı: `style-prefix-anti-photo.txt` satırını kalıcı birleştirip tek `style-prefix.txt` yap.
- `node resolve-prompts.mjs` çalıştır → `prompts.resolved.json` ve gerekiyorsa `node generate-prompt-files.mjs` ile `out/` yenile.
- Değişikliği git’e commit’le; böylece ay sonra aynı stil ile yeni egzersizler eklenebilir.

## 3) Toplu üretim (manifest + dosya dökümü)

```bash
cd tools/exercise-image-prompts
node resolve-prompts.mjs
node generate-prompt-files.mjs
```

Çıktı: `out/prompt-text/<id>.txt`. Bu dosyaları kendi batch script’inde (Gemini API, Ollama görüntü ucu, vb.) sırayla okuyabilirsin. **Görüntü API anahtarı ve faturalandırma sende**; bu repo yalnızca prompt metnini üretir.

## 177 egzersize genişletme

Yeni satırlar `prompts.json` içine aynı şema ile eklenebilir; `id` her zaman katalogdaki `makeStableExerciseId` ile aynı olmalı.

## Demo modu (geçici 42 hareket)

Bu klasörde demo showcase için ayrıca geçici bir katman var (kalıcı modeli değiştirmez):

- `demo-selection.json`: Her kategoriden 3 hareket (toplam 42) ve kısa seçim nedeni.
- `demo-prompt-order.json`: Sohbetten tek tek prompt verirken izlenecek sabit sıra.
- `demo-image-status.json`: `SRC BY USER/exercise-images/` altında ID bazlı görsel var/yok durumu.
- `demo-manifest.json`: Geçici `isDemo` işareti + ID başına `imageStatus`.

Geçici kullanım akışı:

1. Promptu `demo-prompt-order.json` sırasına göre üret.
2. Görseli `SRC BY USER/exercise-images/<id>.jpg` olarak kaydet.
3. Sonra `demo-image-status.json` ve `demo-manifest.json` dosyalarını güncelle.

Not: Bu `demo` işaretleri temporary amaçlıdır; tam dağıtıma geçerken kaldırılacaktır.
