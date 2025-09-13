Simple Chat Backend

Açıklama:
Bu proje, Node.js ve Express.js kullanılarak geliştirilmiş backend odaklı bir chat uygulamasıdır. MongoDB ile veritabanı yönetimi sağlanmış ve kullanıcı kimlik doğrulama sistemi JWT (JSON Web Token) ile güvence altına alınmıştır. Proje, iki kullanıcı arasında mesajlaşmayı ve mesaj geçmişinin saklanmasını destekler.

Öne Çıkan Özellikler:

Kullanıcı kayıt ve giriş sistemi (JWT tabanlı authentication)

Mesaj gönderme ve alma fonksiyonları

Mesaj geçmişi kaydı ve listeleme

REST API endpointleri ile tam CRUD desteği

Docker desteği ile hızlı kurulum ve geliştirme ortamı

Teknolojiler:

Node.js & Express.js

MongoDB & Mongoose

JWT & bcrypt


Kurulum ve Çalıştırma:

Repository’yi klonlayın:

git clone <repo-link>


Bağımlılıkları yükleyin:

npm install
npm install bcryptjs cookie-parser dotenv express jsonwebtoken mongoose
npm install nodemon -D


.env dosyasını oluşturun ve gerekli değişkenleri doldurun:

PORT=5000
MONGO_ENV=development
MONGO_URI=<your_mongo_uri_here>
JWT_SECRET=<your_jwt_secret>


JWT_SECRET key almak için terminalde '+' simgesini basın be Git Bash'i seçin sonra şu komudu girin:
openssl rand -base64 32

Kodu JWT_SECRET içine yapıştırın.

MONGO_URI için MongoDB sitesine girin
Siteye kayıt olun daha sonra Overview üstündeki Proje seçme alanını seçin ve New Project diyin
Yeni Projenizi oluşturduktan sonra CLusters alanına geleceksiniz Create Cluster seçip Free Plan'ı seçin
daha sonra Connect Database tıklayıp linkinizi alın.


Backend’i çalıştırın:

npm run server

Docker sayesinde tek komut ile sistemi kurabilirsiniz:
docker compose up --build


API Testi ve Kullanımı:

REST API endpointleri Postman veya Insomnia ile test edilebilir.

Örnek endpointler:

POST http://localhost:5000/api/auth/signup → kullanıcı kaydı

POST http://localhost:5000/api/auth/login → JWT alma

POST http://localhost:5000/api/messages/send/:id (buraya id kısmını yapıştırın.) → mesaj gönderme

GET http://localhost:5000/api/messages/:id (mesajını görmek istediğiniz kişinin id kısmını yapıştırın.) → mesaj geçmişi çekme

Notlar:

Proje tamamen backend odaklıdır, frontend içermez.

Gerçek zamanlı mesajlaşma (Socket.io) içermez, mesajlar REST API üzerinden yönetilir.
