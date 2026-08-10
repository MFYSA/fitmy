# FitLife — Android build & Google Play release

FitLife is wrapped with **Capacitor 8**, so the same code that runs on the web is
packaged into a real Android app (`app.fitlife.tracker`). Everything in the app
works offline — all data lives in the device's local storage.

Native project: `android/` (committed). Web bundle for the app: `dist-android/`.

---

## What is already configured

| Item | Value |
| --- | --- |
| Application ID | `app.fitlife.tracker` |
| App name | FitLife |
| Min SDK | 26 (Android 8.0) |
| Target SDK | 36 |
| Orientation | Portrait |
| Launcher icon + splash | Generated from `resources/icon.png` / `resources/splash.png` |
| AdMob | Test app id + test banner/interstitial units, banner anchored bottom, blocked on `/session` and `/onboarding` |
| Version | `versionCode 1`, `versionName "1.0"` (in `android/app/build.gradle`) |

---

## 1. Prerequisites (one time, on your machine)

- **JDK 21** — https://adoptium.net
- **Android Studio** (includes the Android SDK + `sdkmanager`) — https://developer.android.com/studio
- **Bun** — https://bun.sh

An APK/AAB cannot be produced inside Lovable because compiling Android requires
the Android SDK and a JDK. Use either **option A (local)** or **option B (CI)** below.

## 2. Option A — build locally

```bash
git clone <your-repo> && cd <your-repo>
bun install

# Builds the static web bundle and copies it into the native project
bun run android:sync

# Open in Android Studio (Build > Generate Signed App Bundle / APK)
bun run android:open
```

Command line instead of Android Studio:

```bash
bun run android:bundle   # -> android/app/build/outputs/bundle/release/app-release.aab
bun run android:apk      # -> android/app/build/outputs/apk/release/app-release.apk
```

## 3. Option B — build in GitHub Actions

`.github/workflows/android-release.yml` builds both the `.aab` and `.apk` and
uploads them as workflow artifacts. Run it from the **Actions** tab
(“Android release build” → *Run workflow*) or by pushing a `v*` tag.

Add these repository secrets so the output is signed:
`ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`,
`ANDROID_KEY_PASSWORD`.

---

## 4. Create your upload keystore (required by Play)

```bash
keytool -genkey -v -keystore upload-keystore.jks -alias fitlife \
  -keyalg RSA -keysize 2048 -validity 10000
```

Keep this file safe — losing it means you can never update the app again.

Local signing: move it to `android/upload-keystore.jks` and create
`android/keystore.properties` (already git-ignored):

```properties
storeFile=upload-keystore.jks
storePassword=YOUR_STORE_PASSWORD
keyAlias=fitlife
keyPassword=YOUR_KEY_PASSWORD
```

For CI: `base64 -w0 upload-keystore.jks` and paste the result into
`ANDROID_KEYSTORE_BASE64`.

---

## 5. Switch AdMob from test to production

Google's **test** ad units ship by default so you never risk a policy strike
during development. Before your first public release:

1. Create the app in https://apps.admob.com and create a banner + interstitial unit.
2. `src/lib/fitlife/ads.ts` → put your unit ids in `AD_UNITS.production` and set
   `AD_CONFIG.testMode = false`.
3. `android/app/src/main/AndroidManifest.xml` → replace the
   `com.google.android.gms.ads.APPLICATION_ID` value with your AdMob app id.
4. In Play Console → *App content* → **Ads**, declare that the app contains ads.

The app also keeps an in-app toggle (Settings → Ads), and ads never appear during
an active workout or the onboarding flow.

---

## 6. Play Console submission checklist

1. Play Console → **Create app** (name *FitLife*, app, free).
2. Upload the signed **`app-release.aab`** to a *Internal testing* release first.
3. Enroll in **Play App Signing** when prompted (recommended).
4. Store listing: short + full description, 512×512 icon
   (`android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png` or `resources/icon.png`),
   1024×500 feature graphic, at least 2 phone screenshots.
5. Complete **App content**: privacy policy URL, data safety (FitLife stores
   workout/water/weight data **on device only**; AdMob collects an advertising ID),
   ads declaration, content rating questionnaire, target audience.
6. Set countries, then **Send for review**.

### Shipping an update

Bump both values in `android/app/build.gradle` (`versionCode` must increase),
re-run `bun run android:bundle`, upload the new `.aab`.

---

## 7. Notes

- Web fonts load from Google Fonts; the app falls back to system fonts when the
  device is offline. All workout data, timers and tracking work fully offline.
- `bun run android:sync` must be re-run after every web change, otherwise the
  APK keeps the old bundle.
- The web deployment is unaffected: `vite.config.ts` stays the Lovable/Cloudflare
  build, `vite.config.android.ts` is only used for the app bundle.
