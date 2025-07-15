export const pertemuanData = {
  1: [
    {
      title: "Apa itu mobile teknologi?",
      description: `
   <h2 class="text-2xl font-bold text-white-800">Apa itu Mobile Teknologi?</h2>
  <p class="mt-2 text-white-800">Mobile Teknologi adalah teknologi yang memungkinkan perangkat bergerak seperti smartphone, tablet, dan perangkat wearable untuk berfungsi dengan koneksi nirkabel. Teknologi ini mencakup perangkat keras, perangkat lunak, dan jaringan yang mendukung komunikasi serta akses informasi dari mana saja.</p>

  <h2 class="text-2xl font-bold text-white-800">Perkembangan Mobile Teknologi</h2>
  <p class="mt-2 text-white-600">Mobile Teknologi telah berkembang pesat dari era komunikasi dasar hingga era modern yang mencakup teknologi seperti 4G/5G, Internet of Things (IoT), kecerdasan buatan (AI), dan cloud computing.</p>

  <h2 class="text-2xl font-bold text-white-800">Komponen Utama Mobile Teknologi</h2>
  <ul class="list-disc list-inside mt-2 text-white-700">
    <li><strong>Perangkat Mobile:</strong> Seperti smartphone, tablet, dan smartwatch.</li>
    <li><strong>Sistem Operasi:</strong> Android, iOS, dan lainnya.</li>
    <li><strong>Jaringan & Konektivitas:</strong> WiFi, 4G, 5G, dan Bluetooth.</li>
    <li><strong>Aplikasi Mobile:</strong> Software yang berjalan di perangkat mobile.</li>
    <li><strong>Keamanan Mobile:</strong> Enkripsi data, autentikasi biometrik, dan proteksi dari malware.</li>
  </ul>

  <h2 class="text-2xl font-bold text-white-800">Dampak Mobile Teknologi</h2>
  <p class="mt-2 text-white-600">Mobile Teknologi telah mengubah cara manusia berinteraksi, bekerja, dan mengakses informasi. Dengan teknologi ini, komunikasi menjadi lebih cepat, bisnis lebih fleksibel, dan akses ke layanan digital semakin mudah.</p>

  <h2 class="text-2xl font-bold text-white-800">Spesifikasi Minimum dan Rekomendasi</h2>
  <ul class="list-disc list-inside mt-2 text-white-700">
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
      code: "",
      language: "bash",
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
      title: "Panduan Instalasi Android Studio",
      description: `<h2 class="text-2xl font-bold text-white-800">Cara Instal Android Studio</h2>
        <p class="mt-2 text-white-700">Ikuti langkah-langkah berikut untuk menginstal Android Studio di sistem operasi yang kamu gunakan.</p>

        <h3 class="text-xl font-semibold text-white-800 mt-4">1. Unduh Android Studio</h3>
        <p class="text-white-700">Kunjungi situs resmi Android Studio dan unduh versi terbaru:</p>
        <p class="text-white-700"><a href="https://developer.android.com/studio" class="text-blue-500 underline">Download Android Studio</a></p>

        <h3 class="text-xl font-semibold text-white-800 mt-4">2. Instalasi di Windows</h3>
        <ul class="list-disc list-inside mt-2 text-white-700">
          <li>Jalankan file <code class="bg-white-200 p-1 rounded">.exe</code> yang telah diunduh.</li>
          <li>Ikuti wizard instalasi dan pilih opsi default.</li>
          <li>Pastikan opsi "Android Virtual Device (AVD)" dicentang.</li>
          <li>Setelah selesai, buka Android Studio dan lakukan konfigurasi awal.</li>
        </ul>

        <h3 class="text-xl font-semibold text-white-800 mt-4">3. Instalasi di macOS</h3>
        <ul class="list-disc list-inside mt-2 text-white-700">
          <li>Ekstrak file <code class="bg-white-200 p-1 rounded">.dmg</code> yang telah diunduh.</li>
          <li>Seret ikon Android Studio ke folder <code class="bg-white-200 p-1 rounded">Applications</code>.</li>
          <li>Buka Android Studio dan ikuti wizard konfigurasi.</li>
        </ul>

        <h3 class="text-xl font-semibold text-white-800 mt-4">4. Instalasi di Linux</h3>
        <ul class="list-disc list-inside mt-2 text-white-700">
          <li>Ekstrak file ZIP yang telah diunduh.</li>
          <li>Jalankan perintah berikut di terminal:</li>
          <pre class="bg-white-900 text-white p-2 rounded"><code>cd android-studio/bin && ./studio.sh</code></pre>
          <li>Ikuti wizard instalasi untuk menyelesaikan konfigurasi.</li>
        </ul>

        <h3 class="text-xl font-semibold text-white-800 mt-4">5. Instal SDK dan Emulator</h3>
        <ul class="list-disc list-inside mt-2 text-white-700">
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
      description: `<h2 class="text-2xl font-bold text-white-800">Cara Instal Visual Studio Code</h2>
        <p class="mt-2 text-white-700">Ikuti langkah-langkah berikut untuk menginstal Visual Studio Code serta ekstensi yang dibutuhkan untuk pengembangan Android dan Flutter.</p>

        <h3 class="text-xl font-semibold text-white-800 mt-4">1. Unduh Visual Studio Code</h3>
        <p class="text-white-700">Kunjungi situs resmi dan unduh VS Code sesuai sistem operasi kamu:</p>
        <p class="text-white-700"><a href="https://code.visualstudio.com/" class="text-blue-500 underline">Download Visual Studio Code</a></p>

        <h3 class="text-xl font-semibold text-white-800 mt-4">2. Instal Visual Studio Code</h3>
        <ul class="list-disc list-inside mt-2 text-white-700">
          <li>Jalankan file installer yang telah diunduh.</li>
          <li>Ikuti petunjuk instalasi dan centang opsi **"Add to PATH"** agar bisa diakses dari terminal.</li>
          <li>Klik **Next**, lalu **Install**, dan tunggu hingga proses selesai.</li>
        </ul>

        <h3 class="text-xl font-semibold text-white-800 mt-4">3. Instal Ekstensi Wajib</h3>
        <p class="text-white-700">Buka VS Code, lalu instal ekstensi berikut untuk pengembangan Flutter:</p>
        <ul class="list-disc list-inside mt-2 text-white-700">
          <li><strong>Flutter & Dart</strong> - Untuk mengembangkan aplikasi Flutter.</li>
          <li><strong>Android iOS Emulator</strong> - Untuk menjalankan emulator langsung dari VS Code.</li>
          <li><strong>Material Icon Theme</strong> - Untuk ikon yang lebih menarik di file explorer.</li>
          <li><strong>Code Runner</strong> - Untuk menjalankan kode langsung di VS Code.</li>
        </ul>
        <p class="text-white-700">Kamu bisa menginstal ekstensi ini dengan membuka <strong>Extensions Marketplace (Ctrl+Shift+X)</strong>, lalu cari nama ekstensi dan klik **Install**.</p>`,
      image: "",
      code: "",
      language: "bash",
    },
    {
      title: "Tutorial Instalasi Flutter dan Sinkronisasi dengan VS Code",
      description: `
        <h2 class="text-2xl font-bold text-white-800">Tutorial Instalasi Flutter</h2>
        <p class="mt-2 text-white-600">Berikut adalah langkah-langkah untuk menginstal Flutter di sistem Anda dan menyinkronkan Android Studio dengan Visual Studio Code:</p>
        <ol class="list-decimal list-inside mt-4 space-y-2 text-white-700">
          <li><strong>Unduh Flutter SDK</strong>: Kunjungi situs resmi Flutter <a href="https://flutter.dev" target="_blank" class="text-blue-600 hover:underline">di sini</a> dan unduh Flutter SDK sesuai sistem operasi Anda.</li>
          <li><strong>Ekstrak Flutter SDK</strong>: Ekstrak file yang telah diunduh ke direktori yang diinginkan, misalnya <code class="bg-white-200 px-1 rounded">C:\\flutter</code> (Windows) atau <code class="bg-white-200 px-1 rounded">/opt/flutter</code> (Linux/macOS).</li>
          <li><strong>Tambahkan Flutter ke PATH</strong>: Buka terminal atau command prompt dan tambahkan path Flutter ke variabel lingkungan PATH.</li>
          <li><strong>Cek Instalasi</strong>: Jalankan perintah <code class="bg-white-200 px-1 rounded">flutter doctor</code> untuk memastikan Flutter terinstal dengan benar.</li>
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
              <li>Buka VS Code, tekan <code class="bg-white-200 px-1 rounded">Ctrl + Shift + X</code> untuk membuka Extensions Marketplace.</li>
              <li>Cari **Flutter** dan klik **Install**.</li>
              <li>Ekstensi Dart akan otomatis terinstal bersama Flutter.</li>
            </ul>
          </li>
          <li><strong>Sinkronisasi Android Studio dengan VS Code</strong>:
            <ul class="list-disc list-inside ml-5">
              <li>Buka terminal dan jalankan perintah berikut untuk menambahkan Android SDK ke Flutter:</li>
            </ul>
            <pre class="bg-white-900 text-white p-3 rounded"><code>flutter config --android-sdk "C:\\Users\\NamaAnda\\AppData\\Local\\Android\\Sdk"</code></pre>
            <p class="mt-2 text-white-700">Gantilah <code>C:\\Users\\NamaAnda\\AppData\\Local\\Android\\Sdk</code> dengan lokasi Android SDK Anda.</p>
          </li>
          <li><strong>Cek Instalasi</strong>: Jalankan perintah <code class="bg-white-200 px-1 rounded">flutter doctor</code> dan pastikan tidak ada error.</li>
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
       <h2 class="text-2xl font-bold text-white-800">Contoh Kode Sederhana Flutter</h2>
      <p class="mt-2 text-white-600">Berikut adalah contoh kode sederhana Flutter untuk menampilkan pesan 'Hello, Flutter!' di layar.</p>`,
      image: "",
      code: `import 'package:flutter/material.dart';

        // Fungsi utama yang akan dijalankan pertama kali
        void main() {
          runApp(MyApp());
        }

        // Class utama aplikasi yang merupakan StatelessWidget
        class MyApp extends StatelessWidget {
          @override
          Widget build(BuildContext context) {
            return MaterialApp(
              debugShowCheckedModeBanner: false,
              title: 'Flutter Demo',
              theme: ThemeData(
                primarySwatch: Colors.blue,
              ),
              home: MyHomePage(),
            );
          }
        }

        // Class halaman utama
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
  3: [
    {
      title: "Membuat Halaman Utama di Flutter",
      description: `
      <h2 class="text-2xl font-bold text-white-800">Membuat Halaman Utama di Flutter</h2>
      <p class="mt-2 text-white-600">
        Kita akan membuat halaman utama menggunakan <code>Scaffold</code>, yang terdiri dari <b>AppBar</b>, <b>Body</b>, dan <b>FloatingActionButton</b>.
      </p>`,
      image: "",
      code: `import 'package:flutter/material.dart';

        void main() {
          runApp(MyApp());
        }

        // StatelessWidget digunakan karena halaman ini tidak memiliki perubahan state
        class MyApp extends StatelessWidget {
          @override
          Widget build(BuildContext context) {
            return MaterialApp(
              debugShowCheckedModeBanner: false,
              title: 'Home Page',
              home: HomePage(),
            );
          }
        }

        // Halaman Utama
        class HomePage extends StatelessWidget {
          @override
          Widget build(BuildContext context) {
            return Scaffold(
              appBar: AppBar(
                title: Text('Home Page'),
              ),
              body: Center(
                child: Text(
                  'Selamat Datang di Flutter!',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
              ),
              floatingActionButton: FloatingActionButton(
                onPressed: () {
                  print('Tombol ditekan!');
                },
                child: Icon(Icons.add),
              ),
            );
          }
        }`,
      language: "dart",
    },

    {
      title: "Membuat Tombol yang Bergerak Secara Acak",
      description: `
        <h2 class="text-2xl font-bold text-white-800">Membuat Tombol yang Bergerak Secara Acak</h2>
        <p class="mt-2 text-white-600">
          Kita akan membuat tombol yang berpindah posisi secara acak ketika ditekan, menggunakan <code>AnimatedPositioned</code>.
        </p>`,
      image: "",
      code: `import 'package:flutter/material.dart';
        import 'dart:math'; // Untuk membuat angka acak

        void main() {
          runApp(MyApp());
        }

        // Widget utama aplikasi
        class MyApp extends StatelessWidget {
          @override
          Widget build(BuildContext context) {
            return MaterialApp(
              debugShowCheckedModeBanner: false,
              title: 'Animated Button',
              home: AnimatedButtonPage(),
            );
          }
        }

        // StatefulWidget karena tombol akan berpindah posisi
        class AnimatedButtonPage extends StatefulWidget {
          @override
          _AnimatedButtonPageState createState() => _AnimatedButtonPageState();
        }

        class _AnimatedButtonPageState extends State<AnimatedButtonPage> {
          double _top = 150;
          double _left = 150;

          // Fungsi untuk memindahkan tombol ke posisi acak
          void _moveButton() {
            final random = Random();
            setState(() {
              _top = random.nextDouble() * 400;
              _left = random.nextDouble() * 300;
            });
          }

          @override
          Widget build(BuildContext context) {
            return Scaffold(
              appBar: AppBar(title: Text('Animated Button')),
              body: Stack(
                children: [
                  AnimatedPositioned(
                    duration: Duration(milliseconds: 500),
                    curve: Curves.easeInOut,
                    top: _top,
                    left: _left,
                    child: ElevatedButton(
                      onPressed: _moveButton,
                      child: Text('Pindah!'),
                    ),
                  ),
                ],
              ),
            );
          }
        }`,
      language: "dart",
    },

    {
      title: "Form Input dengan Validasi",
      description: `
          <h2 class="text-2xl font-bold text-white-800">Form Input dengan Validasi</h2>
          <p class="mt-2 text-white-600">
            Kita akan membuat form input yang memvalidasi apakah pengguna sudah mengisi nama atau belum.
          </p>`,
      image: "",
      code: `import 'package:flutter/material.dart';

        void main() {
          runApp(MyApp());
        }

        // StatelessWidget untuk menjalankan aplikasi
        class MyApp extends StatelessWidget {
          @override
          Widget build(BuildContext context) {
            return MaterialApp(
              debugShowCheckedModeBanner: false,
              title: 'Form Validation',
              home: FormPage(),
            );
          }
        }

        // StatefulWidget karena ada perubahan pada form
        class FormPage extends StatefulWidget {
          @override
          _FormPageState createState() => _FormPageState();
        }

        class _FormPageState extends State<FormPage> {
          final _formKey = GlobalKey<FormState>();
          final TextEditingController _nameController = TextEditingController();

          @override
          void dispose() {
            _nameController.dispose();
            super.dispose();
          }

          @override
          Widget build(BuildContext context) {
            return Scaffold(
              appBar: AppBar(title: Text('Form Validation')),
              body: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      TextFormField(
                        controller: _nameController,
                        decoration: InputDecoration(labelText: 'Nama'),
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Nama tidak boleh kosong';
                          }
                          return null;
                        },
                      ),
                      SizedBox(height: 20),
                      ElevatedButton(
                        onPressed: () {
                          if (_formKey.currentState!.validate()) {
                            String enteredName = _nameController.text;
                            showDialog(
                              context: context,
                              builder: (context) {
                                return AlertDialog(
                                  title: Text('Berhasil'),
                                  content: Text('Halo, ' + enteredName + '!'),
                                  actions: [
                                    TextButton(
                                      onPressed: () {
                                        Navigator.pop(context);
                                      },
                                      child: Text('OK'),
                                    ),
                                  ],
                                );
                              },
                            );
                          }
                        },
                        child: Text('Submit'),
                      ),
                    ],
                  ),
                ),
              ),
            );
          }
        }`,
      language: "dart",
    },

    {
      title: "Membuat ListView dengan Data Dummy",
      description: `
          <h2 class="text-2xl font-bold text-white-800">Membuat ListView dengan Data Dummy</h2>
          <p class="mt-2 text-white-600">
            Kita akan membuat daftar item menggunakan <code>ListView.builder</code> untuk menampilkan data secara dinamis.
          </p>`,
      image: "",
      code: `import 'package:flutter/material.dart';

          void main() {
            runApp(MyApp());
          }

          class MyApp extends StatelessWidget {
            @override
            Widget build(BuildContext context) {
              return MaterialApp(
                debugShowCheckedModeBanner: false,
                title: 'ListView Example',
                home: ListViewExample(),
              );
            }
          }

          class ListViewExample extends StatelessWidget {
            final List<String> items = List.generate(10, (index) => 'Item \${index + 1}');

            @override
            Widget build(BuildContext context) {
              return Scaffold(
                appBar: AppBar(title: Text('ListView Example')),
                body: ListView.builder(
                  itemCount: items.length,
                  itemBuilder: (context, index) {
                    return ListTile(
                      title: Text(items[index]),
                      leading: Icon(Icons.star),
                      onTap: () {
                        print('Tapped on: ' + items[index]);
                      },
                    );
                  },
                ),
              );
            }
          }`,
      language: "dart",
    },
    {
      type: "question",
      title: "Tugas Integrasi: Aplikasi Flutter Dasar",
      description: `
    <div class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Tugas: Aplikasi Manajemen Kontak</h2>
      <p class="text-gray-600 mb-6">Gabungkan 4 materi utama (Halaman Utama, Tombol Acak, Form Validasi, dan ListView) dalam satu aplikasi.</p>

      <div class="space-y-6">
        <div class="border-l-4 border-blue-500 pl-4">
          <h3 class="text-xl font-semibold text-gray-700">1. Halaman Utama (Scaffold)</h3>
          <ul class="list-disc pl-5 mt-2 text-gray-600">
            <li>Buat Scaffold dengan AppBar (judul "Kontak Saya")</li>
            <li>Body berisi Column dengan:
              <ul class="list-disc pl-5">
                <li>Text "Selamat Datang" di center</li>
                <li>Tombol "Tambah Kontak" yang navigasi ke form</li>
              </ul>
            </li>
          </ul>
          <pre class="bg-gray-100 text-gray-800 p-3 rounded mt-2 text-sm">Scaffold(
          appBar: AppBar(title: Text("Kontak Saya")),
          body: Center(child: Text("Selamat Datang")),
        )</pre>
        </div>

        <div class="border-l-4 border-green-500 pl-4">
          <h3 class="text-xl font-semibold text-gray-700">2. Tombol Acak (Game)</h3>
          <ul class="list-disc pl-5 mt-2 text-gray-600">
            <li>Buat halaman baru dengan tombol yang berpindah posisi saat dihover/ditekan</li>
            <li>Gunakan AnimatedPositioned dengan durasi 300ms</li>
            <li>Tampilkan counter berapa kali tombol berhasil diklik</li>
          </ul>
        </div>

        <div class="border-l-4 border-purple-500 pl-4">
          <h3 class="text-xl font-semibold text-gray-700">3. Form Validasi Kontak</h3>
          <ul class="list-disc pl-5 mt-2 text-gray-600">
            <li>Buat form dengan field:
              <ul class="list-disc pl-5">
                <li>Nama (min 3 karakter)</li>
                <li>Nomor HP (harus angka, min 10 digit)</li>
                <li>Email (harus mengandung @)</li>
              </ul>
            </li>
            <li>Tombol submit yang menyimpan data ke List</li>
          </ul>
        </div>

        <div class="border-l-4 border-yellow-500 pl-4">
          <h3 class="text-xl font-semibold text-gray-700">4. ListView Kontak</h3>
          <ul class="list-disc pl-5 mt-2 text-gray-600">
            <li>Tampilkan daftar kontak dalam ListView.builder</li>
            <li>Setiap item menampilkan:
              <ul class="list-disc pl-5">
                <li>Avatar lingkaran (gunakan CircleAvatar)</li>
                <li>Nama kontak</li>
                <li>Nomor HP</li>
                <li>Tombol delete</li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="bg-blue-50 p-4 rounded-lg">
          <h3 class="font-bold text-lg text-blue-800">Pengumpulan Tugas:</h3>
          <div class="mt-3 bg-white p-4 rounded-lg border border-blue-200 shadow-sm">
            <h4 class="font-semibold text-blue-700 mb-3">Petunjuk Pengumpulan</h4>
            <!-- File Naming Section -->
            <div class="mb-4 p-3 bg-white-50 rounded-md border border-white-200">
              <h5 class="font-medium text-gray-700 mb-2">1. Format Penamaan File</h5>

              <div class="flex items-start mb-2">
                <div class="flex-shrink-0 mt-1">
                  <div class="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg class="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-gray-600">Buat folder utama dengan format:</p>
                  <div class="mt-1 flex items-center">
                    <code class="bg-gray-100 px-2 py-1 rounded-md text-sm font-mono">NIM_Nama_Kelas</code>
                    <span class="ml-2 text-xs text-gray-500">(Contoh: <code class="bg-gray-100 px-1 rounded text-xs">10520056_SigitHardianto_IF2</code>)</span>
                  </div>
                </div>
              </div>

              <div class="flex items-start">
                <div class="flex-shrink-0 mt-1">
                  <div class="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg class="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-gray-600">Dalam folder tersebut, masukkan file dengan format:</p>
                  <ul class="list-disc list-inside ml-4 mt-1 space-y-1 text-sm text-gray-600">
                    <li><code class="bg-gray-100 px-1 rounded">1_HomePage.jpg</code></li>
                    <li><code class="bg-gray-100 px-1 rounded">2_RandomButton.jpg</code></li>
                    <li><code class="bg-gray-100 px-1 rounded">3_FormValidation.jpg</code></li>
                    <li><code class="bg-gray-100 px-1 rounded">4_ListView.jpg</code></li>
                    <li><code class="bg-gray-100 px-1 rounded">Demo_NIM.mp4</code></li>
                    <li><code class="bg-gray-100 px-1 rounded">Readme_NIM.pdf</code></li>
                  </ul>
                  <p class="mt-1 text-xs text-gray-500">• Gunakan underscore (_) sebagai pemisah<br>• Hindari spasi dan karakter khusus</p>
                </div>
              </div>
            </div>


            <!-- Upload Section -->
            <div class="mb-4 p-3 bg-blue-50 rounded-md border border-blue-200">
              <h5 class="font-medium text-blue-700 mb-2">2. Upload ke Google Drive</h5>
              <div class="flex items-center">
                <!-- Ikon upload -->
                <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0-8l-3 3m3-3l3 3M12 4v8" />
                </svg>

                <!-- Link ke Google Drive -->
                <a href="https://drive.google.com/drive/folders/1AEESOBAdB7rs_7whHa5ibv11RA3zI0eJ?usp=sharing"
                  class="text-blue-600 hover:underline font-medium"
                  target="_blank">
                  Klik di sini untuk mengumpulkan
                </a>
              </div>
              <p class="ml-7 mt-1 text-sm text-white-600">Pastikan mengupload ke folder kelas Anda</p>
            </div>


            <div>
              <h5 class="font-medium text-purple-700 mb-2">3. Dokumentasi Wajib</h5>
              <p class="text-sm text-gray-600">Buat file PDF berisi:</p>
              <ul class="list-disc ml-5 text-sm text-gray-600">
                <li>Identitas (Nama, NIM, Kelas)</li>
                <li>Penjelasan singkat tiap fitur</li>
                <li>Kendala yang dihadapi + solusi</li>
                <li>Screenshot alur aplikasi</li>
              </ul>
              <p class="mt-2 text-sm text-purple-600">Format nama file: <code class="bg-purple-100 px-1 rounded">Readme_NIM.pdf</code></p>
            </div>
          </div>

          <div class="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 class="font-semibold text-yellow-800">Penting!</h4>
            <ul class="list-disc ml-5 text-sm text-yellow-700 mt-1">
              <li>Deadline: <strong>1 minggu setelah tugas diberikan</strong></li>
              <li>File yang tidak sesuai format akan dikembalikan</li>
              <li>Pastikan semua file dapat diakses (tidak private)</li>
              <li>Tidak menerima pengumpulan terlambat</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
      image: "",
      code: `// Contoh data kontak
        List<Map<String, dynamic>> contacts = [
          {
            'name': 'Budi',
            'phone': '08123456789',
            'email': 'budi@example.com'
          },
          {
            'name': 'Ani',
            'phone': '08987654321',
            'email': 'ani@example.com'
          }
        ];`,
      language: "dart",
      submitLink:
        "https://drive.google.com/drive/folders/1AEESOBAdB7rs_7whHa5ibv11RA3zI0eJ?usp=sharing",
    },
  ],
  4: [
    {
      title: "Membuat Button dengan Style Kustom",
      description: `
      <h2 class="text-2xl font-bold text-white-800">Membuat Button dengan Style Kustom</h2>
      <p class="mt-2 text-white-600">
        Menggunakan <code>ElevatedButton.styleFrom()</code> untuk mengubah warna, padding, dan radius button.
      </p>`,
      code: `import 'package:flutter/material.dart'; // Import package Material untuk UI

        void main() {
          runApp(MyApp()); // Menjalankan aplikasi
        }

        class MyApp extends StatelessWidget {
          @override
          Widget build(BuildContext context) {
            return MaterialApp(
              debugShowCheckedModeBanner: false, // Menghilangkan banner debug
              home: HomePage(),
            );
          }
        }

        class HomePage extends StatelessWidget {
          @override
          Widget build(BuildContext context) {
            return Scaffold(
              appBar: AppBar(title: Text("Styled Button")), // Menampilkan AppBar
              body: Center(
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.blue, // Mengatur warna tombol
                    padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10), // Mengatur padding
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10), // Mengatur radius tombol
                    ),
                  ),
                  onPressed: () {
                    print("Tombol ditekan!"); // Aksi ketika tombol ditekan
                  },
                  child: Text("Klik Saya", style: TextStyle(color: Colors.white)), // Teks tombol
                ),
              ),
            );
          }
        }`,
      language: "dart",
    },
    {
      title: "Menambahkan Background Gambar di Flutter",
      description: `
      <h2 class="text-2xl font-bold text-white-800">Menambahkan Background Gambar</h2>
      <p class="mt-2 text-white-600">
        Menggunakan <code>BoxDecoration</code> untuk menambahkan background gambar di aplikasi Flutter.
      </p>`,
      code: `import 'package:flutter/material.dart'; // Import Flutter Material

        void main() {
          runApp(MyApp()); // Menjalankan aplikasi
        }

        class MyApp extends StatelessWidget {
          @override
          Widget build(BuildContext context) {
            return MaterialApp(
              debugShowCheckedModeBanner: false,
              home: BackgroundScreen(),
            );
          }
        }

        class BackgroundScreen extends StatelessWidget {
          @override
          Widget build(BuildContext context) {
            return Scaffold(
              body: Container(
                decoration: BoxDecoration(
                  image: DecorationImage(
                    image: AssetImage("assets/background.jpg"), // Gambar latar dari assets
                    fit: BoxFit.cover, // Mengatur gambar agar menutupi seluruh layar
                  ),
                ),
                child: Center(
                  child: Text(
                    "Halo, Flutter!",
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
            );
          }
        }`,
      language: "dart",
    },
    {
      title: "Membuat GridView di Flutter",
      description: `
      <h2 class="text-2xl font-bold text-white-800">Membuat GridView</h2>
      <p class="mt-2 text-white-600">
        Menggunakan <code>GridView.builder()</code> untuk membuat tata letak grid di Flutter.
      </p>`,
      code: `import 'package:flutter/material.dart'; // Import Flutter Material

        void main() {
          runApp(MyApp()); // Menjalankan aplikasi
        }

        class MyApp extends StatelessWidget {
          @override
          Widget build(BuildContext context) {
            return MaterialApp(
              debugShowCheckedModeBanner: false,
              home: GridScreen(),
            );
          }
        }

        class GridScreen extends StatelessWidget {
          @override
          Widget build(BuildContext context) {
            return Scaffold(
              appBar: AppBar(title: Text("GridView")),
              body: GridView.builder(
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2, // Jumlah kolom
                  crossAxisSpacing: 10, // Jarak horizontal antar item
                  mainAxisSpacing: 10, // Jarak vertikal antar item
                ),
                itemCount: 6, // Jumlah item dalam grid
                itemBuilder: (context, index) {
                  return Container(
                    color: Colors.blue, // Warna latar item
                    child: Center(
                      child: Text(
                        "Item \$index",
                        style: TextStyle(color: Colors.white, fontSize: 20),
                      ),
                    ),
                  );
                },
              ),
            );
          }
        }`,
      language: "dart",
    },
    {
      title: "Membuat Menu Chat di Flutter",
      description: `
      <h2 class="text-2xl font-bold text-white-800">Membuat Menu Chat</h2>
      <p class="mt-2 text-white-600">
        Menggunakan <code>ListView</code> dan <code>TextField</code> untuk membuat tampilan menu chat.
      </p>`,
      code: `import 'package:flutter/material.dart';

        void main() {
          runApp(MyApp());
        }

        class MyApp extends StatelessWidget {
          @override
          Widget build(BuildContext context) {
            return MaterialApp(
              debugShowCheckedModeBanner: false,
              home: ChatScreen(),
            );
          }
        }

        class ChatScreen extends StatelessWidget {
          @override
          Widget build(BuildContext context) {
            return Scaffold(
              appBar: AppBar(title: Text("Chat")),
              body: Column(
                children: [
                  Expanded(
                    child: ListView(
                      children: [
                        ListTile(title: Text("Halo!")),
                        ListTile(title: Text("Apa kabar?")),
                      ],
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.all(8.0),
                    child: TextField(
                      decoration: InputDecoration(hintText: "Ketik pesan..."),
                    ),
                  ),
                ],
              ),
            );
          }
        }`,
      language: "dart",
    },
  ],

  5: [
    {
      title: "Setup Project Flutter dan Install HTTP",
      description: `
        <h2 class="text-2xl font-bold text-white-800">Setup Project Flutter</h2>
        <p class="mt-2 text-white-600">
          1. Buat project baru Flutter dengan perintah <code>flutter create crud_flutter</code>.<br/>
          2. Masuk ke folder project menggunakan <code>cd crud_flutter</code>.<br/>
          3. Tambahkan package <code>http</code> di file <code>pubspec.yaml</code> untuk koneksi ke API Laravel.<br/>
          4. Setelah itu, jalankan perintah <code>flutter pub get</code> untuk menginstall package.<br/>
          Pastikan semua langkah diikuti agar tidak terjadi error saat import package <code>http</code>.
        </p>`,
      code: `# Buat project Flutter
          flutter create crud_flutter

          # Masuk ke folder project
          cd crud_flutter

          # Tambahkan di pubspec.yaml
          dependencies:
            flutter:
              sdk: flutter
            http: ^1.2.0

          # Jalankan untuk install package
          flutter pub get
          `,
      language: "bash",
    },

    {
      title: "Membuat Model Materi untuk Parsing JSON",
      description: `
        <h2 class="text-2xl font-bold text-white-800">Membuat Model Materi</h2>
        <p class="mt-2 text-white-600">
          1. Buat folder baru <code>models/</code> di dalam project Flutter kamu.<br/>
          2. Di dalam folder <code>models/</code>, buat file baru dengan nama <code>materi.dart</code>.<br/>
          3. Isi file <code>materi.dart</code> dengan kode berikut untuk membuat model Materi.<br/>
          Model ini berguna untuk parsing data JSON dari API Laravel ke dalam object di Flutter.<br/>
          Pastikan kamu menggunakan keyword <code>required</code> agar setiap field wajib diisi saat membuat object baru.
        </p>`,
      code: `// File: models/materi.dart

        class Materi {
          final int id;
          final String title;
          final String description;
          final String image;

          Materi({
            required this.id,
            required this.title,
            required this.description,
            required this.image,
          });

          factory Materi.fromJson(Map<String, dynamic> json) {
            return Materi(
              id: json['id'],
              title: json['title'],
              description: json['description'],
              image: json['image'],
            );
          }
        }
        `,
      language: "dart",
    },

    {
    "title": "Membuat Service Flutter untuk Akses API",
    "description": `
      <h2 class="text-2xl font-bold text-white-800">Membuat API Service</h2>
      <p class="mt-2 text-white-600">
        Buat file <code>api_service.dart</code> untuk menghubungkan Flutter dengan API Laravel menggunakan metode <code>GET</code>, <code>POST</code>, <code>PUT</code>, dan <code>DELETE</code>.
      </p>
      <p class="mt-4 text-white-600">
        Sebelum membuat service ini, pastikan struktur folder Flutter kamu sudah seperti berikut:
        <ul class="list-disc ml-5 mt-2">
          <li><b>lib/</b> — folder utama kode Flutter kamu.</li>
          <li><b>lib/services/</b> — buat folder baru untuk semua file service API.</li>
          <li><b>lib/models/</b> — buat folder ini untuk file model, misalnya file <code>materi.dart</code>.</li>
        </ul>
        Setelah itu, buat file baru <code>api_service.dart</code> di dalam folder <code>services</code>.
      </p>
    `,
    "code": `import 'dart:convert';
        import 'package:http/http.dart' as http;
        import '../models/materi.dart';

        class ApiService {
          // URL dasar API. Ganti IP jika menggunakan emulator atau device fisik
          static const String _baseUrl = "http://127.0.0.1:8000/api/materi";

          // GET: Mengambil semua data Materi
          Future<List<Materi>> getMateri() async {
            try {
              final response = await http.get(Uri.parse(_baseUrl));

              if (response.statusCode == 200) {
                List<dynamic> jsonResponse = json.decode(response.body);
                return jsonResponse.map((data) => Materi.fromJson(data)).toList();
              } else {
                throw Exception('Gagal memuat data materi');
              }
            } catch (e) {
              throw Exception('Error getMateri: \$e');
            }
          }

          // POST: Membuat data Materi baru
          Future<void> createMateri({
            required String title,
            required String description,
            required String image,
          }) async {
            try {
              final response = await http.post(
                Uri.parse(_baseUrl),
                headers: {'Content-Type': 'application/json'},
                body: jsonEncode({
                  'title': title,
                  'description': description,
                  'image': image,
                }),
              );

              if (response.statusCode != 201) {
                throw Exception('Gagal membuat materi');
              }
            } catch (e) {
              throw Exception('Error createMateri: \$e');
            }
          }

          // PUT: Mengupdate data Materi
          Future<void> updateMateri({
            required int id,
            required String title,
            required String description,
            required String image,
          }) async {
            try {
              final response = await http.put(
                Uri.parse('\$_baseUrl/\$id'),
                headers: {'Content-Type': 'application/json'},
                body: jsonEncode({
                  'title': title,
                  'description': description,
                  'image': image,
                }),
              );

              if (response.statusCode != 200) {
                throw Exception('Gagal memperbarui materi');
              }
            } catch (e) {
              throw Exception('Error updateMateri: \$e');
            }
          }

          // DELETE: Menghapus data Materi
          Future<void> deleteMateri(int id) async {
            try {
              final response = await http.delete(
                Uri.parse('\$_baseUrl/\$id'),
                headers: {'Content-Type': 'application/json'},
              );

              if (response.statusCode != 200) {
                throw Exception('Gagal menghapus materi');
              }
            } catch (e) {
              throw Exception('Error deleteMateri: \$e');
            }
          }
        }
        `
    ,
    "language": "dart"
  },
  {
    "title": "Membuat UI CRUD Materi di Flutter (Lengkap dengan Tambah, Hapus, Tampilkan)",
    "description": `
      <h2 class="text-2xl font-bold text-white-800">Membuat UI CRUD Materi</h2>
      <p class="mt-2 text-white-600">
        Pada halaman ini, kita akan membuat halaman Flutter lengkap untuk:
      </p>
      <ul class="list-disc ml-5 mt-2 text-white-600">
        <li>Menampilkan daftar data Materi menggunakan <code>ListView</code> dan <code>FutureBuilder</code>.</li>
        <li>Menambahkan data baru Materi menggunakan <code>TextField</code> dan <code>AlertDialog</code>.</li>
        <li>Menghapus data Materi dengan tombol <code>Delete</code>.</li>
      </ul>
      <p class="mt-4 text-white-600">
        <b>Struktur folder sebelum membuat halaman ini:</b>
        <ul class="list-disc ml-5 mt-2">
          <li><b>lib/</b> — folder utama project Flutter kamu.</li>
          <li><b>lib/models/</b> — tempat file <code>materi.dart</code>.</li>
          <li><b>lib/services/</b> — tempat file <code>api_service.dart</code>.</li>
          <li><b>lib/screens/</b> — buat file baru <code>materi_screen.dart</code> di sini.</li>
        </ul>
      </p>
      <p class="mt-4 text-white-600">
        <b>Cara pakai:</b> Panggil halaman ini di <code>main.dart</code> dengan mengimport <code>MateriScreen</code>.
      </p>
    `,
    "code": `// File: lib/screens/materi_screen.dart

        import 'package:flutter/material.dart';
        import 'package:crud_flutter/services/api_service.dart';
        import 'package:crud_flutter/models/materi.dart';

        class MateriScreen extends StatefulWidget {
          const MateriScreen({Key? key}) : super(key: key);

          @override
          _MateriScreenState createState() => _MateriScreenState();
        }

        class _MateriScreenState extends State<MateriScreen> {
          // Variabel untuk menyimpan daftar data materi
          late Future<List<Materi>> _futureMateri;
          final ApiService _apiService = ApiService();

          @override
          void initState() {
            super.initState();
            _loadMateri(); // Memuat data materi saat halaman pertama dibuka
          }

          // Fungsi untuk memuat ulang data dari server
          void _loadMateri() {
            setState(() {
              _futureMateri = _apiService.getMateri();
            });
          }

          // Fungsi untuk menampilkan form tambah data menggunakan AlertDialog
          void _showAddMateriDialog() {
            String title = '';
            String description = '';
            String image = '';

            showDialog(
              context: context,
              builder: (context) {
                return AlertDialog(
                  title: Text('Tambah Materi'),
                  content: SingleChildScrollView(
                    child: Column(
                      children: [
                        TextField(
                          decoration: InputDecoration(labelText: 'Title'),
                          onChanged: (value) => title = value,
                        ),
                        TextField(
                          decoration: InputDecoration(labelText: 'Description'),
                          onChanged: (value) => description = value,
                        ),
                        TextField(
                          decoration: InputDecoration(labelText: 'Image URL'),
                          onChanged: (value) => image = value,
                        ),
                      ],
                    ),
                  ),
                  actions: [
                    TextButton(
                      onPressed: () async {
                        await _apiService.createMateri(
                          title: title,
                          description: description,
                          image: image,
                        );
                        Navigator.of(context).pop();
                        _loadMateri(); // Refresh data setelah tambah
                      },
                      child: Text('Simpan'),
                    ),
                    TextButton(
                      onPressed: () => Navigator.of(context).pop(),
                      child: Text('Batal'),
                    ),
                  ],
                );
              },
            );
          }

          @override
          Widget build(BuildContext context) {
            return Scaffold(
              appBar: AppBar(
                title: Text('Daftar Materi'),
              ),
              body: FutureBuilder<List<Materi>>(
                future: _futureMateri,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return Center(child: CircularProgressIndicator());
                  } else if (snapshot.hasError) {
                    return Center(child: Text('Error: \${snapshot.error}'));
                  } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                    return Center(child: Text('Belum ada data materi.'));
                  } else {
                    final materiList = snapshot.data!;
                    return ListView.builder(
                      itemCount: materiList.length,
                      itemBuilder: (context, index) {
                        final materi = materiList[index];
                        return Card(
                          margin: EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                          child: ListTile(
                            title: Text(materi.title),
                            subtitle: Text(materi.description),
                            trailing: IconButton(
                              icon: Icon(Icons.delete, color: Colors.red),
                              onPressed: () async {
                                await _apiService.deleteMateri(materi.id);
                                _loadMateri(); // Refresh data setelah hapus
                              },
                            ),
                          ),
                        );
                      },
                    );
                  }
                },
              ),
              floatingActionButton: FloatingActionButton(
                onPressed: _showAddMateriDialog,
                child: Icon(Icons.add),
              ),
            );
          }
        }
        `,
          "language": "dart"
        },
        {
        "title": "Membuat UI CRUD Materi ( Main Dart )",
        "description": `
          <h2 class="text-2xl font-bold text-white-800">Membuat UI CRUD Materi</h2>
          <p class="mt-2 text-white-600">
            Pada halaman ini, kita akan membuat halaman Flutter lengkap untuk:
          </p>
          <ul class="list-disc ml-5 mt-2 text-white-600">
            <li>Menampilkan daftar data Materi menggunakan <code>ListView</code> dan <code>FutureBuilder</code>.</li>
            <li>Menambahkan data baru Materi menggunakan <code>TextField</code> dan <code>AlertDialog</code>.</li>
            <li>Menghapus data Materi dengan tombol <code>Delete</code>.</li>
          </ul>
          <p class="mt-4 text-white-600">
            <b>Struktur folder sebelum membuat halaman ini:</b>
            <ul class="list-disc ml-5 mt-2">
              <li><b>lib/</b> — folder utama project Flutter kamu.</li>
              <li><b>lib/models/</b> — tempat file <code>materi.dart</code>.</li>
              <li><b>lib/services/</b> — tempat file <code>api_service.dart</code>.</li>
              <li><b>lib/screens/</b> — memuat file <code>materi_screen.dart</code> di sini.</li>
            </ul>
          </p>
          <p class="mt-4 text-white-600">
            <b>Cara pakai:</b> Buat file <code>main.dart</code> seperti contoh di bawah ini untuk menampilkan halaman <code>MateriScreen</code> langsung saat app dibuka.
          </p>
        `,
        "code": `// File: lib/main.dart

        import 'package:flutter/material.dart';
        import 'package:crud_flutter/screens/materi_screen.dart'; // Import halaman Materi

        void main() {
          runApp(MyApp());
        }

        class MyApp extends StatelessWidget {
          @override
          Widget build(BuildContext context) {
            return MaterialApp(
              title: 'CRUD Materi',
              theme: ThemeData(
                primarySwatch: Colors.blue,
              ),
              home: MateriScreen(), // Langsung tampilkan halaman daftar materi
              debugShowCheckedModeBanner: false, // Hilangkan banner debug
            );
          }
        }
      `,
        "language": "dart"
      },
        {
          title: "Mengetes CRUD Flutter dengan API Laravel",
          description: `
            <h2 class="text-2xl font-bold text-white-800">Testing CRUD</h2>
            <p class="mt-2 text-white-600">
            jalankan aplikasi Flutter di emulator atau device.
              Cek apakah data berhasil ditampilkan, ditambah, diupdate, dan dihapus dari database.
            </p>`,
          code: ` flutter run`,
          language: "bash",
        },
      ],

  6: [
    {
      title: "Pembuatan Fitur Login & Dashboard di Flutter",
      description: `
        <h2 class="text-2xl font-bold text-white-800">Langkah-langkah Pengembangan</h2>
        
        <h3 class="text-xl font-semibold mt-4 text-white-700">1. Membuat Models & Services Login Register</h3>
        <p class="text-white-600">
          Langkah awal adalah membuat model data pengguna dalam file <code>user.dart</code>, lalu menyiapkan service untuk komunikasi API di file <code>auth_service.dart</code>.
          Service ini akan menangani proses login dan register menggunakan metode <code>POST</code> ke server backend.
        </p>

        <h3 class="text-xl font-semibold mt-4 text-white-700">2. Membuat UI Login & Register</h3>
        <p class="text-white-600">
          Di bagian ini, UI dibuat menggunakan kombinasi <code>TextField</code>, <code>Form</code>, dan <code>ElevatedButton</code>.
          Form memiliki validasi dasar seperti pengecekan email kosong dan panjang password minimal 6 karakter.
        </p>

        <h3 class="text-xl font-semibold mt-4 text-white-700">3. Membuat Login & Register API dengan 3 Role</h3>
        <p class="text-white-600">
          Backend disiapkan agar mendukung 3 peran berbeda: admin, petugas, dan user.
          Setelah login berhasil, token JWT disimpan dan peran user digunakan untuk menavigasi ke halaman yang sesuai.
        </p>

        <h3 class="text-xl font-semibold mt-4 text-white-700">4. Membuat Validasi Login Register</h3>
        <p class="text-white-600">
          Validasi ditambahkan baik di sisi frontend (menggunakan Flutter Form Validator) maupun backend (menggunakan Laravel Validator).
          Validasi mencakup email valid, password tidak kosong, dan konfirmasi password cocok.
        </p>

        <h3 class="text-xl font-semibold mt-4 text-white-700">5. Membuat Dashboard Flutter</h3>
        <p class="text-white-600">
          Setelah login berhasil, pengguna diarahkan ke halaman dashboard.
          Halaman ini menampilkan informasi akun dan fitur lanjutan seperti statistik atau menu navigasi.
        </p>
      `,
     image: "/assets/materi6/1.jpg",
    },
  ],
  7: [
  
  ],
  8: [
     ],
  9: [
  ],
  10: [
    
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
    title: "UAS Flutter: Aplikasi Penjualan Terintegrasi",
    description: `
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">UAS Flutter 2025 — Aplikasi Penjualan Terintegrasi (Tingkat Lanjut)</h2>
        <p class="text-gray-600 mb-6">
          Mahasiswa diwajibkan membuat aplikasi Flutter dengan <strong>10 menu yang saling terhubung</strong>, <strong>Autentikasi</strong>, integrasi API (CRUD), serta menampilkan <strong>grafik dan statistik</strong>. UI harus modern, responsif, dan interaktif.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div class="bg-blue-50 p-4 rounded">
            <h3 class="text-lg font-semibold text-blue-700">1. Login & Register</h3>
            <ul class="list-disc ml-5 mt-1 text-blue-800">
              <li>Form validasi lengkap</li>
              <li>Terhubung ke API</li>
              <li>Simpan token JWT (simulasi aman)</li>
            </ul>
          </div>
          <div class="bg-green-50 p-4 rounded">
            <h3 class="text-lg font-semibold text-green-700">2. Dashboard</h3>
            <ul class="list-disc ml-5 mt-1 text-green-800">
              <li>Total produk, penjualan, & user aktif</li>
              <li>Info saldo, penjualan hari ini</li>
            </ul>
          </div>
          <div class="bg-yellow-50 p-4 rounded">
            <h3 class="text-lg font-semibold text-yellow-700">3. Produk</h3>
            <ul class="list-disc ml-5 mt-1 text-yellow-800">
              <li>CRUD produk + gambar</li>
              <li>Pencarian, filter by kategori</li>
            </ul>
          </div>
          <div class="bg-purple-50 p-4 rounded">
            <h3 class="text-lg font-semibold text-purple-700">4. Penjualan</h3>
            <ul class="list-disc ml-5 mt-1 text-purple-800">
              <li>Tambah item ke keranjang</li>
              <li>Checkout & simpan transaksi</li>
            </ul>
          </div>
          <div class="bg-pink-50 p-4 rounded">
            <h3 class="text-lg font-semibold text-pink-700">5. Riwayat Transaksi</h3>
            <ul class="list-disc ml-5 mt-1 text-pink-800">
              <li>List riwayat lengkap</li>
              <li>Cetak PDF / share struk</li>
            </ul>
          </div>
          <div class="bg-orange-50 p-4 rounded">
            <h3 class="text-lg font-semibold text-orange-700">6. Kategori Produk</h3>
            <ul class="list-disc ml-5 mt-1 text-orange-800">
              <li>CRUD kategori</li>
              <li>Digunakan saat input produk</li>
            </ul>
          </div>
          <div class="bg-cyan-50 p-4 rounded">
            <h3 class="text-lg font-semibold text-cyan-700">7. Grafik Penjualan</h3>
            <ul class="list-disc ml-5 mt-1 text-cyan-800">
              <li>Grafik produk terlaris (bar)</li>
              <li>Grafik total penjualan (line/pie)</li>
            </ul>
          </div>
          <div class="bg-gray-50 p-4 rounded">
            <h3 class="text-lg font-semibold text-gray-700">8. Pengaturan</h3>
            <ul class="list-disc ml-5 mt-1 text-gray-800">
              <li>Dark mode, logout</li>
              <li>Set API Endpoint</li>
            </ul>
          </div>
          <div class="bg-teal-50 p-4 rounded">
            <h3 class="text-lg font-semibold text-teal-700">9. Manajemen User</h3>
            <ul class="list-disc ml-5 mt-1 text-teal-800">
              <li>CRUD user (role admin saja) </li>
              <li>Aktivasi/nonaktif akun</li>
            </ul>
          </div>
          <div class="bg-indigo-50 p-4 rounded">
            <h3 class="text-lg font-semibold text-indigo-700">10. Notifikasi & Feedback</h3>
            <ul class="list-disc ml-5 mt-1 text-indigo-800">
              <li>Dialog snackbar/toast setiap aksi</li>
              <li>Toast saat berhasil/validasi gagal</li>
            </ul>
          </div>
        </div>

        <div class="mt-6 bg-gray-100 p-4 rounded-lg border">
          <h4 class="font-bold text-gray-700 mb-2">🧠 Teknis Tambahan:</h4>
          <ul class="list-disc ml-5 text-sm text-gray-600">
            <li>Gunakan <strong>Provider</strong> atau <strong>Bloc</strong> (minimal Provider)</li>
            <li>Gunakan <code>shared_preferences</code> atau <code>secure_storage</code></li>
            <li>Struktur folder modular: <code>pages, models, services, widgets, providers</code></li>
          </ul>
        </div>

        <div class="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 class="font-semibold text-blue-800">📂 Download Database SQL:</h4>
          <p class="text-sm text-blue-700 mt-1">
            <a class="underline" href="https://drive.google.com/drive/folders/1D1wlr6x8KJbTGh55_WyTus5C2gvnC29v?hl=ID" target="_blank">
              Klik di sini untuk mengambil struktur & data database (.sql)
            </a>
          </p>
        </div>

        <div class="mt-4 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h4 class="font-semibold text-yellow-800">📁 Pengumpulan:</h4>
          <ul class="list-disc ml-5 text-sm text-yellow-700">
            <li>10 Screenshot (1-10)</li>
            <li>Readme PDF: Penjelasan fitur, struktur folder, alur login</li>
            <li>Bonus: export ke APK (opsional)</li>
          </ul>
        </div>

        <div class="mt-4 bg-red-50 p-4 rounded-lg border border-red-200">
          <h4 class="font-semibold text-red-800">📊 Penilaian Per Fitur:</h4>
          <ul class="list-disc ml-5 text-sm text-red-700">
            <li>Login & Register – 10%</li>
            <li>Dashboard – 10%</li>
            <li>Produk – 10%</li>
            <li>Penjualan – 10%</li>
            <li>Riwayat Transaksi – 10%</li>
            <li>Kategori Produk – 10%</li>
            <li>Grafik Penjualan – 10%</li>
            <li>Pengaturan – 5%</li>
            <li>Manajemen User – 10%</li>
            <li>Notifikasi & Feedback – 5%</li>
            <li>Struktur folder & teknis tambahan – 10%</li>
          </ul>
        </div>

        <div class="mt-4 bg-red-100 p-4 rounded-lg border border-red-300">
          <h4 class="text-lg font-bold text-red-800">⏰ Deadline Pengumpulan:</h4>
          <p class="text-sm text-red-700 mt-1">
            <strong>10 Juli 2025, pukul 15.00 WIB (jam 3 sore)</strong>. Jangan sampai terlambat!
          </p>
        </div>
      </div>
    `,
    code: `// Contoh struktur penjualan
        Map<String, dynamic> transaksi = {
          "id": 1,
          "produk": [
            {"nama": "Laptop", "qty": 2, "harga": 5000000}
          ],
          "total": 10000000,
          "tanggal": "2025-07-09"
        };

        // Simpan token dari login
        String? token = "eyJhbGciOiJIUzI1NiIs..."; // JWT Token

        // Contoh grafik data
        List<Map<String, dynamic>> chartData = [
          {"label": "Laptop", "value": 30},
          {"label": "Smartphone", "value": 20},
        ];`,
    language: "dart",
    type: "question",
    submitLink: "https://drive.google.com/drive/folders/1bQvP2eTiPUvAr49VIHWav_PZ9tWmhFAV"
  }
]



};
