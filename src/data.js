export const pertemuanData = {
  1: [
    {
      title: "Apa itu mobile teknologi?",
      description: `
   <h2 class="text-2xl font-bold text-gray-800">Apa itu Mobile Teknologi?</h2>
  <p class="mt-2 text-gray-600">Mobile Teknologi adalah teknologi yang memungkinkan perangkat bergerak seperti smartphone, tablet, dan perangkat wearable untuk berfungsi dengan koneksi nirkabel. Teknologi ini mencakup perangkat keras, perangkat lunak, dan jaringan yang mendukung komunikasi serta akses informasi dari mana saja.</p>
  
  <h2 class="text-2xl font-bold text-gray-800">Perkembangan Mobile Teknologi</h2>
  <p class="mt-2 text-gray-600">Mobile Teknologi telah berkembang pesat dari era komunikasi dasar hingga era modern yang mencakup teknologi seperti 4G/5G, Internet of Things (IoT), kecerdasan buatan (AI), dan cloud computing.</p>
  
  <h2 class="text-2xl font-bold text-gray-800">Komponen Utama Mobile Teknologi</h2>
  <ul class="list-disc list-inside mt-2 text-gray-700">
    <li><strong>Perangkat Mobile:</strong> Seperti smartphone, tablet, dan smartwatch.</li>
    <li><strong>Sistem Operasi:</strong> Android, iOS, dan lainnya.</li>
    <li><strong>Jaringan & Konektivitas:</strong> WiFi, 4G, 5G, dan Bluetooth.</li>
    <li><strong>Aplikasi Mobile:</strong> Software yang berjalan di perangkat mobile.</li>
    <li><strong>Keamanan Mobile:</strong> Enkripsi data, autentikasi biometrik, dan proteksi dari malware.</li>
  </ul>
  
  <h2 class="text-2xl font-bold text-gray-800">Dampak Mobile Teknologi</h2>
  <p class="mt-2 text-gray-600">Mobile Teknologi telah mengubah cara manusia berinteraksi, bekerja, dan mengakses informasi. Dengan teknologi ini, komunikasi menjadi lebih cepat, bisnis lebih fleksibel, dan akses ke layanan digital semakin mudah.</p>
  
  <h2 class="text-2xl font-bold text-gray-800">Spesifikasi Minimum dan Rekomendasi</h2>
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
      <h2 class="text-2xl font-bold text-gray-800">Membuat Halaman Utama di Flutter</h2>
      <p class="mt-2 text-gray-600">
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
        <h2 class="text-2xl font-bold text-gray-800">Membuat Tombol yang Bergerak Secara Acak</h2>
        <p class="mt-2 text-gray-600">
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
          <h2 class="text-2xl font-bold text-gray-800">Form Input dengan Validasi</h2>
          <p class="mt-2 text-gray-600">
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
          <h2 class="text-2xl font-bold text-gray-800">Membuat ListView dengan Data Dummy</h2>
          <p class="mt-2 text-gray-600">
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
      ],
  4: [
  {
    title: "Membuat Button dengan Style Kustom",
    description: `
      <h2 class="text-2xl font-bold text-gray-800">Membuat Button dengan Style Kustom</h2>
      <p class="mt-2 text-gray-600">
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
      <h2 class="text-2xl font-bold text-gray-800">Menambahkan Background Gambar</h2>
      <p class="mt-2 text-gray-600">
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
      <h2 class="text-2xl font-bold text-gray-800">Membuat GridView</h2>
      <p class="mt-2 text-gray-600">
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
      <h2 class="text-2xl font-bold text-gray-800">Membuat Menu Chat</h2>
      <p class="mt-2 text-gray-600">
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
  }
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
