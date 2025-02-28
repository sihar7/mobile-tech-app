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
      title: "Tutorial Instalasi Flutter",
      description: `
       <h2 class="text-2xl font-bold text-gray-800">Tutorial Instalasi Flutter</h2>
        <p class="mt-2 text-gray-600">Berikut adalah langkah-langkah untuk menginstal Flutter di sistem Anda:</p>
        <ol class="list-decimal list-inside mt-4 space-y-2 text-gray-700">
          <li><strong>Unduh Flutter SDK</strong>: Kunjungi situs resmi Flutter <a href="https://flutter.dev" target="_blank" class="text-blue-600 hover:underline">di sini</a> dan unduh Flutter SDK sesuai sistem operasi Anda.</li>
          <li><strong>Ekstrak Flutter SDK</strong>: Ekstrak file yang telah diunduh ke direktori yang diinginkan, misalnya <code class="bg-gray-200 px-1 rounded">C:\\flutter</code> (Windows) atau <code class="bg-gray-200 px-1 rounded">/opt/flutter</code> (Linux/macOS).</li>
          <li><strong>Tambahkan Flutter ke PATH</strong>: Buka terminal atau command prompt dan tambahkan path Flutter ke variabel lingkungan PATH.</li>
          <li><strong>Cek Instalasi</strong>: Jalankan perintah <code class="bg-gray-200 px-1 rounded">flutter doctor</code> untuk memastikan Flutter terinstal dengan benar.</li>
          <li><strong>Instal Android Studio (Opsional)</strong>: Jika Anda ingin mengembangkan aplikasi Android, instal Android Studio dan plugin Flutter.</li>
          <li><strong>Instal VS Code (Opsional)</strong>: Jika Anda lebih suka menggunakan Visual Studio Code, instal VS Code dan tambahkan ekstensi Flutter.</li>
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
