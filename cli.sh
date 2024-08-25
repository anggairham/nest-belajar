# NEST JS semuanya berbasil module
nest generate module user
nest generate controller user user

npm install cookie-parser
# auto complete typescript
npm install --save-dev @types/cookie-parser

# template engines express js untuk membuat view html 
npm install mustache-express
# auto complete typescript
npm install --save-dev @types/mustache-express

# solusi untuk unit test jika menggunakan parameter express.Request atau express.Response
npm install --save-dev node-mocks-http
# untuk testing unit test
npm run test

# untuk testing integration test
npm run test:e2e
# banyak class di aplikasi NestJS bisa dianggap sebagai Provider, contoh misal Service, Repository, Factory, Helper dan lainnya
# provider agar object dari provider bisa diinject sebagai dependency ke object lainnya (Controller atau provider lain)
# membuat Provider jenisnya service
nest generate service user user
nest generate provider connection user
nest generate service mail user
nest generate provider user-repository user
nest generate service member user

# configuration : untuk keperluan env , koneksi db 
npm install @nestjs/config
npm install --save-dev prisma
npx prisma init

npx prisma migrate dev
# Enter a name for the new migration: ... create table users
npx prisma generate

nest generate module prisma
nest generate service prisma prisma
# logging
npm install nest-winston
# validation
npm install zod
nest generate module validation
nest generate service validation validation
# middleware
nest generate middleware log
# validation filter
nest generate filter validation
# MEMBUAT PIPE MANUAL
nest generate pipe validation