## Employee Directory App - Local Deployment Guide

Clone the repository to your local machine and run the following command to install all required dependencies in the root directory of the project. Node version 18 is required for this project to run.

```bash
npm install
```

Secondly, create a .env file in the root of your project with the following content. This will serve as the paths for the local database and object storages. Note that uploaded images will only be uploaded inside the public directory.

```bash
DATABASE_URL="file:./dev.db"
STORAGE_PATH="./storage"
```

Next, set up Prisma by running the following command to create the database and apply the schema:

```bash
npx prisma migrate dev --name init
```

Make sure to create the public/storage directory where uploaded images will be saved:

```bash
mkdir public/storage
```

Finally, run the Next.js development server with:

```bash
npm run dev
```

The app will be available at http://localhost:3000. You can access the Employee Directory app and test the functionality.


