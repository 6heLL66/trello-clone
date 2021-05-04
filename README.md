# Local Start

IF you want to start app local you should create local mysql database using DBSchema.sql file.
Then you must create .env file in root directory with db credentials

.env:
```
DB_HOST=<your db host>
DB_USERNAME=<your db username>
DB_PASSWORD=<your db password>
JWT_SECRET=<yout jwt secret key>
```

Then run:

`npm install && npm run dev`
