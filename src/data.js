export const pertemuanData = {
  1: [
    {
      title: "Spesifikasi Minimum dan Rekomendasi untuk Flutter",
      description: `<h2 class="text-2xl font-bold text-gray-800">Spesifikasi Minimum dan Rekomendasi</h2>
        <ul class="list-disc list-inside mt-2 text-gray-700">
          <li><strong>Sistem Operasi:</strong>
            <ul class="list-inside ml-4">
              <li>Windows: Windows 10 (64-bit) atau lebih baru</li>
              <li>macOS: macOS 13 (Ventura) atau lebih baru</li>
              <li>Linux: Distribusi 64-bit dengan bash, curl, git, dan unzip</li>
            </ul>
          </li>
          <li><strong>Penyimpanan:</strong> Minimum 10 GB, Direkomendasikan 20+ GB</li>
          <li><strong>RAM:</strong> Minimum 4 GB, Direkomendasikan 8 GB atau lebih</li>
          <li><strong>Prosesor:</strong> Minimum 64-bit CPU, Direkomendasikan Intel i5/i7, AMD Ryzen 5/7, atau Apple Silicon</li>
          <li><strong>Perangkat Lunak Tambahan:</strong>
            <ul class="list-inside ml-4">
              <li>Git (untuk mengelola proyek dan dependensi)</li>
              <li>Android Studio (untuk emulator dan pengembangan Android)</li>
              <li>VS Code atau IDE lain (opsional, untuk coding lebih nyaman)</li>
            </ul>
          </li>
        </ul>`,
      image: "",
      code: ``,
      language: "bash",
    },
    {
      title: "Panduan Instalasi Android Studio",
      description: `<h2 class="text-2xl font-bold text-gray-800">Cara Instal Android Studio</h2>
        <p class="mt-2 text-gray-700">Ikuti langkah-langkah berikut untuk menginstal Android Studio di sistem operasi yang kamu gunakan.</p>
        
        <h3 class="text-xl font-semibold text-gray-800 mt-4">1. Unduh Android Studio</h3>
        <p class="text-gray-700">Kunjungi situs resmi Android Studio dan unduh versi terbaru:</p>
        <p class="text-gray-700"><a href="https://developer.android.com/studio" class="text-blue-500 underline">Download Android Studio</a></p>
        
        <h3 class="text-xl font-semibold text-gray-800 mt-4">2. Instalasi di Windows</h3>
        <ul class="list-disc list-inside mt-2 text-gray-700">
          <li>Jalankan file <code class="bg-gray-200 p-1 rounded">.exe</code> yang telah diunduh.</li>
          <li>Ikuti wizard instalasi dan pilih opsi default.</li>
          <li>Pastikan opsi "Android Virtual Device (AVD)" dicentang.</li>
          <li>Setelah selesai, buka Android Studio dan lakukan konfigurasi awal.</li>
        </ul>

        <h3 class="text-xl font-semibold text-gray-800 mt-4">3. Instalasi di macOS</h3>
        <ul class="list-disc list-inside mt-2 text-gray-700">
          <li>Ekstrak file <code class="bg-gray-200 p-1 rounded">.dmg</code> yang telah diunduh.</li>
          <li>Seret ikon Android Studio ke folder <code class="bg-gray-200 p-1 rounded">Applications</code>.</li>
          <li>Buka Android Studio dan ikuti wizard konfigurasi.</li>
        </ul>

        <h3 class="text-xl font-semibold text-gray-800 mt-4">4. Instalasi di Linux</h3>
        <ul class="list-disc list-inside mt-2 text-gray-700">
          <li>Ekstrak file ZIP yang telah diunduh.</li>
          <li>Jalankan perintah berikut di terminal:</li>
          <pre class="bg-gray-900 text-white p-2 rounded"><code>cd android-studio/bin && ./studio.sh</code></pre>
          <li>Ikuti wizard instalasi untuk menyelesaikan konfigurasi.</li>
        </ul>

        <h3 class="text-xl font-semibold text-gray-800 mt-4">5. Instal SDK dan Emulator</h3>
        <ul class="list-disc list-inside mt-2 text-gray-700">
          <li>Setelah instalasi selesai, buka Android Studio.</li>
          <li>Pilih opsi "More Actions" > "SDK Manager".</li>
          <li>Pastikan SDK terbaru telah diinstal.</li>
          <li>Untuk menguji aplikasi, buka "AVD Manager" dan buat emulator.</li>
        </ul>`,
      image: "",
      code: `# Instalasi Android Studio di Linux
        tar -xvf android-studio-*.tar.gz
        cd android-studio/bin
        ./studio.sh`,
      language: "bash",
    },
    {
      title: "Panduan Instalasi Visual Studio Code dan Ekstensi untuk Flutter",
      description: `<h2 class="text-2xl font-bold text-gray-800">Cara Instal Visual Studio Code</h2>
        <p class="mt-2 text-gray-700">Ikuti langkah-langkah berikut untuk menginstal Visual Studio Code serta ekstensi yang dibutuhkan untuk pengembangan Android dan Flutter.</p>

        <h3 class="text-xl font-semibold text-gray-800 mt-4">1. Unduh Visual Studio Code</h3>
        <p class="text-gray-700">Kunjungi situs resmi dan unduh VS Code sesuai sistem operasi kamu:</p>
        <p class="text-gray-700"><a href="https://code.visualstudio.com/" class="text-blue-500 underline">Download Visual Studio Code</a></p>

        <h3 class="text-xl font-semibold text-gray-800 mt-4">2. Instal Visual Studio Code</h3>
        <ul class="list-disc list-inside mt-2 text-gray-700">
          <li>Jalankan file installer yang telah diunduh.</li>
          <li>Ikuti petunjuk instalasi dan centang opsi **"Add to PATH"** agar bisa diakses dari terminal.</li>
          <li>Klik **Next**, lalu **Install**, dan tunggu hingga proses selesai.</li>
        </ul>

        <h3 class="text-xl font-semibold text-gray-800 mt-4">3. Instal Ekstensi Wajib</h3>
        <p class="text-gray-700">Buka VS Code, lalu instal ekstensi berikut untuk pengembangan Flutter:</p>
        <ul class="list-disc list-inside mt-2 text-gray-700">
          <li><strong>Flutter & Dart</strong> - Untuk mengembangkan aplikasi Flutter.</li>
          <li><strong>Android iOS Emulator</strong> - Untuk menjalankan emulator langsung dari VS Code.</li>
          <li><strong>Material Icon Theme</strong> - Untuk ikon yang lebih menarik di file explorer.</li>
          <li><strong>Code Runner</strong> - Untuk menjalankan kode langsung di VS Code.</li>
        </ul>
        <p class="text-gray-700">Kamu bisa menginstal ekstensi ini dengan membuka <strong>Extensions Marketplace (Ctrl+Shift+X)</strong>, lalu cari nama ekstensi dan klik **Install**.</p>`,
      image: "",
      code: "",
      language: "bash",
    },
    {
      title: "Tutorial Instalasi Flutter dan Sinkronisasi dengan VS Code",
      description: `
        <h2 class="text-2xl font-bold text-gray-800">Tutorial Instalasi Flutter</h2>
        <p class="mt-2 text-gray-600">Berikut adalah langkah-langkah untuk menginstal Flutter di sistem Anda dan menyinkronkan Android Studio dengan Visual Studio Code:</p>
        <ol class="list-decimal list-inside mt-4 space-y-2 text-gray-700">
          <li><strong>Unduh Flutter SDK</strong>: Kunjungi situs resmi Flutter <a href="https://flutter.dev" target="_blank" class="text-blue-600 hover:underline">di sini</a> dan unduh Flutter SDK sesuai sistem operasi Anda.</li>
          <li><strong>Ekstrak Flutter SDK</strong>: Ekstrak file yang telah diunduh ke direktori yang diinginkan, misalnya <code class="bg-gray-200 px-1 rounded">C:\\flutter</code> (Windows) atau <code class="bg-gray-200 px-1 rounded">/opt/flutter</code> (Linux/macOS).</li>
          <li><strong>Tambahkan Flutter ke PATH</strong>: Buka terminal atau command prompt dan tambahkan path Flutter ke variabel lingkungan PATH.</li>
          <li><strong>Cek Instalasi</strong>: Jalankan perintah <code class="bg-gray-200 px-1 rounded">flutter doctor</code> untuk memastikan Flutter terinstal dengan benar.</li>
          <li><strong>Instal Plugin Flutter dan Dart di Android Studio</strong>:  
            <ul class="list-disc list-inside ml-5">
              <li>Buka Android Studio, lalu masuk ke <strong>Preferences/Settings</strong>.</li>
              <li>Pilih **Plugins** → Cari **Flutter** → Klik **Install**.</li>
              <li>Plugin Dart akan otomatis terinstal bersama Flutter.</li>
              <li>Restart Android Studio setelah instalasi.</li>
            </ul>
          </li>
          <li><strong>Instal Ekstensi Flutter dan Dart di VS Code</strong>:  
            <ul class="list-disc list-inside ml-5">
              <li>Buka VS Code, tekan <code class="bg-gray-200 px-1 rounded">Ctrl + Shift + X</code> untuk membuka Extensions Marketplace.</li>
              <li>Cari **Flutter** dan klik **Install**.</li>
              <li>Ekstensi Dart akan otomatis terinstal bersama Flutter.</li>
            </ul>
          </li>
          <li><strong>Sinkronisasi Android Studio dengan VS Code</strong>:  
            <ul class="list-disc list-inside ml-5">
              <li>Buka terminal dan jalankan perintah berikut untuk menambahkan Android SDK ke Flutter:</li>
            </ul>
            <pre class="bg-gray-900 text-white p-3 rounded"><code>flutter config --android-sdk "C:\\Users\\NamaAnda\\AppData\\Local\\Android\\Sdk"</code></pre>
            <p class="mt-2 text-gray-700">Gantilah <code>C:\\Users\\NamaAnda\\AppData\\Local\\Android\\Sdk</code> dengan lokasi Android SDK Anda.</p>
          </li>
          <li><strong>Cek Instalasi</strong>: Jalankan perintah <code class="bg-gray-200 px-1 rounded">flutter doctor</code> dan pastikan tidak ada error.</li>
          <li><strong>Buat Proyek Flutter Pertama</strong>: Jalankan perintah berikut untuk membuat proyek Flutter baru:</li>
        </ol>`,
      image: "",
      code: `
        # Contoh perintah Flutter
        flutter create my_first_app
        cd my_first_app
        flutter run
      `,
      language: "bash",
    },

    {
      title: "Contoh Kode Sederhana Flutter",
      description: `
       <h2 class="text-2xl font-bold text-gray-800">Contoh Kode Sederhana Flutter</h2>
      <p class="mt-2 text-gray-600">Berikut adalah contoh kode sederhana Flutter untuk menampilkan pesan 'Hello, Flutter!' di layar.</p>`,
      image: "",
      code: `import 'package:flutter/material.dart';

        void main() {
          runApp(MyApp());
        }

        class MyApp extends StatelessWidget {
          @override
          Widget build(BuildContext context) {
            return MaterialApp(
              title: 'Flutter Demo',
              theme: ThemeData(
                primarySwatch: Colors.blue,
              ),
              home: MyHomePage(),
            );
          }
        }

        class MyHomePage extends StatelessWidget {
          @override
          Widget build(BuildContext context) {
            return Scaffold(
              appBar: AppBar(
                title: Text('Flutter Demo Home Page'),
              ),
              body: Center(
                child: Text(
                  'Hello, Flutter!',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
              ),
            );
          }
        }`,
      language: "dart",
    },
    // {
    //   title: "Spesifikasi Perangkat Mobile",
    //   description: "",
    //   image: "",
    //   video: "https://www.youtube.com/watch?v=c7xl9Og8eEM",
    // },
  ],
  2: [
    {
      title: "Spesifikasi Perangkat Mobile",
      description:
        "Menjelaskan spesifikasi utama seperti CPU, RAM, Storage, dan layar dalam perangkat mobile. Spesifikasi ini menentukan performa dan pengalaman pengguna dalam menggunakan perangkat.",
      image: "https://example.com/specs.jpg",
    },
    {
      title: "Sistem Operasi Mobile",
      description:
        "Mengenal berbagai OS seperti Android, iOS, dan HarmonyOS. Sistem operasi ini menjadi dasar untuk menjalankan aplikasi dan mengelola sumber daya perangkat.",
      image: "https://example.com/os.jpg",
    },
  ],
  3: [
    {
      title: "Jaringan dan Konektivitas",
      description:
        "Jaringan seluler (2G, 3G, 4G, 5G) dan teknologi konektivitas seperti Wi-Fi dan Bluetooth. Jaringan ini memungkinkan perangkat mobile terhubung ke internet dan perangkat lain.",
      image: "https://example.com/network.jpg",
    },
    {
      title: "Keamanan Perangkat Mobile",
      description:
        "Teknologi keamanan seperti enkripsi data, autentikasi biometrik (sidik jari, pengenalan wajah), dan aplikasi antivirus untuk melindungi data pengguna.",
      image: "https://example.com/security.jpg",
    },
  ],
  4: [
    {
      title: "Aplikasi Mobile",
      description:
        "Jenis aplikasi mobile seperti aplikasi native, hybrid, dan web. Aplikasi ini dirancang untuk memenuhi kebutuhan pengguna dalam berbagai bidang seperti e-commerce, kesehatan, dan pendidikan.",
      image: "https://example.com/apps.jpg",
    },
    {
      title: "Pengembangan Aplikasi Mobile",
      description:
        "Proses pengembangan aplikasi mobile, mulai dari perencanaan, desain, pengkodean, hingga pengujian dan peluncuran.",
      image: "https://example.com/app-dev.jpg",
    },
  ],
  5: [
    {
      title: "Pengenalan Flutter",
      description:
        "Flutter adalah framework open-source dari Google untuk membangun aplikasi mobile yang indah dan cepat. Flutter menggunakan bahasa pemrograman Dart dan mendukung pengembangan aplikasi cross-platform.",
      image: "https://example.com/flutter.jpg",
    },
    {
      title: "Instalasi Flutter",
      description:
        "Langkah-langkah instalasi Flutter di berbagai platform (Windows, macOS, Linux) dan konfigurasi lingkungan pengembangan.",
      image: "https://example.com/flutter-install.jpg",
    },
  ],
  6: [
    {
      title: "Dasar-Dasar Flutter",
      description:
        "Mempelajari widget, layout, dan state management dalam Flutter. Widget adalah komponen utama dalam Flutter untuk membangun antarmuka pengguna.",
      image: "https://example.com/flutter-basics.jpg",
    },
    {
      title: "Membuat Aplikasi Pertama dengan Flutter",
      description:
        "Panduan langkah demi langkah untuk membuat aplikasi sederhana seperti to-do list atau kalkulator menggunakan Flutter.",
      image: "https://example.com/flutter-app.jpg",
    },
  ],
  7: [
    {
      title: "Pengenalan React Native",
      description:
        "React Native adalah framework untuk membangun aplikasi mobile menggunakan JavaScript dan React. React Native memungkinkan pengembangan aplikasi cross-platform dengan performa yang baik.",
      image: "https://example.com/react-native.jpg",
    },
    {
      title: "Instalasi React Native",
      description:
        "Langkah-langkah instalasi React Native dan konfigurasi lingkungan pengembangan.",
      image: "https://example.com/react-native-install.jpg",
    },
  ],
  8: [
    {
      title: "Dasar-Dasar React Native",
      description:
        "Mempelajari komponen, state, dan props dalam React Native. Komponen adalah blok bangunan utama dalam React Native.",
      image: "https://example.com/react-native-basics.jpg",
    },
    {
      title: "Membuat Aplikasi Pertama dengan React Native",
      description:
        "Panduan langkah demi langkah untuk membuat aplikasi sederhana seperti to-do list atau kalkulator menggunakan React Native.",
      image: "https://example.com/react-native-app.jpg",
    },
  ],
  9: [
    {
      title: "UI/UX Design untuk Aplikasi Mobile",
      description:
        "Prinsip-prinsip desain antarmuka pengguna (UI) dan pengalaman pengguna (UX) untuk aplikasi mobile. Desain yang baik meningkatkan kepuasan pengguna.",
      image: "https://example.com/ui-ux.jpg",
    },
    {
      title: "Tools untuk Desain UI/UX",
      description:
        "Alat-alat populer untuk desain UI/UX seperti Figma, Adobe XD, dan Sketch.",
      image: "https://example.com/design-tools.jpg",
    },
  ],
  10: [
    {
      title: "Pengujian Aplikasi Mobile",
      description:
        "Metode pengujian aplikasi mobile seperti unit testing, integration testing, dan user acceptance testing (UAT).",
      image: "https://example.com/testing.jpg",
    },
    {
      title: "Alat Pengujian Aplikasi Mobile",
      description:
        "Alat-alat untuk pengujian aplikasi mobile seperti Appium, Espresso, dan XCTest.",
      image: "https://example.com/testing-tools.jpg",
    },
  ],
  11: [
    {
      title: "Publishing Aplikasi ke Play Store",
      description:
        "Langkah-langkah untuk mempublikasikan aplikasi Android ke Google Play Store, termasuk persiapan APK dan metadata.",
      image: "https://example.com/play-store.jpg",
    },
    {
      title: "Publishing Aplikasi ke App Store",
      description:
        "Langkah-langkah untuk mempublikasikan aplikasi iOS ke Apple App Store, termasuk persiapan IPA dan metadata.",
      image: "https://example.com/app-store.jpg",
    },
  ],
  12: [
    {
      title: "Analytics dan Monitoring Aplikasi",
      description:
        "Menggunakan tools seperti Firebase Analytics dan Google Analytics untuk memantau performa aplikasi dan perilaku pengguna.",
      image: "https://example.com/analytics.jpg",
    },
    {
      title: "Optimasi Performa Aplikasi",
      description:
        "Teknik optimasi performa aplikasi seperti mengurangi ukuran APK, meningkatkan kecepatan loading, dan mengurangi penggunaan memori.",
      image: "https://example.com/performance.jpg",
    },
  ],
  13: [
    {
      title: "Keamanan Aplikasi Mobile",
      description:
        "Praktik terbaik untuk mengamankan aplikasi mobile, termasuk enkripsi data, autentikasi pengguna, dan pencegahan serangan.",
      image: "https://example.com/app-security.jpg",
    },
    {
      title: "Manajemen Update Aplikasi",
      description:
        "Strategi untuk mengelola update aplikasi, termasuk rilis bertahap dan pengelolaan versi.",
      image: "https://example.com/app-updates.jpg",
    },
  ],
  14: [
    {
      title: "Studi Kasus: Aplikasi E-Commerce",
      description:
        "Membahas studi kasus pengembangan aplikasi e-commerce, termasuk fitur-fitur utama seperti keranjang belanja, pembayaran, dan notifikasi.",
      image: "https://example.com/ecommerce.jpg",
    },
    {
      title: "Studi Kasus: Aplikasi Kesehatan",
      description:
        "Membahas studi kasus pengembangan aplikasi kesehatan, termasuk fitur-fitur seperti konsultasi dokter, pemantauan kesehatan, dan reminder obat.",
      image: "https://example.com/health-app.jpg",
    },
  ],
};
