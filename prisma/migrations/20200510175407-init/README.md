# Migration `20200510175407-init`

This migration has been generated by Tony Gorez at 5/10/2020, 5:54:07 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

CREATE TYPE "Genre" AS ENUM ('MALE', 'FEMALE');

CREATE TYPE "MemberShip" AS ENUM ('CONTRIBUTOR', 'ADMIN');

CREATE TABLE "public"."Gift" (
    "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL,
    "link" text  NOT NULL ,
    "listId" integer  NOT NULL ,
    "name" text  NOT NULL ,
    "ownerId" integer   ,
    "updatedAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Member" (
    "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL,
    "listId" integer   ,
    "status" "MemberShip" NOT NULL ,
    "updatedAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" integer  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."List" (
    "authorId" integer  NOT NULL ,
    "babyGenre" "Genre"  ,
    "babyName" text   ,
    "birthDate" timestamp(3)   ,
    "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" text   ,
    "familyName" text   ,
    "id" SERIAL,
    "isActivated" boolean  NOT NULL DEFAULT true,
    "isOpen" boolean  NOT NULL DEFAULT false,
    "name" text  NOT NULL ,
    "updatedAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."User" (
    "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" text  NOT NULL ,
    "firstName" text  NOT NULL ,
    "genre" "Genre" NOT NULL ,
    "id" SERIAL,
    "lastName" text  NOT NULL ,
    "password" text  NOT NULL ,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "updatedAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
) 

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

ALTER TABLE "public"."Gift" ADD FOREIGN KEY ("listId")REFERENCES "public"."List"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Gift" ADD FOREIGN KEY ("ownerId")REFERENCES "public"."User"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."Member" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Member" ADD FOREIGN KEY ("listId")REFERENCES "public"."List"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."List" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200510175407-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,79 @@
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+enum Role {
+  USER
+  ADMIN
+}
+
+enum Genre {
+  MALE
+  FEMALE
+}
+
+enum MemberShip {
+  CONTRIBUTOR
+  ADMIN
+}
+
+model Gift {
+  id        Int      @default(autoincrement()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @default(now())
+  name      String
+  link      String
+  list      List     @relation(fields: [listId], references: [id])
+  listId    Int
+  owner     User?    @relation(fields: [ownerId], references: [id])
+  ownerId   Int?
+}
+
+model Member {
+  id        Int        @default(autoincrement()) @id
+  createdAt DateTime   @default(now())
+  updatedAt DateTime   @default(now())
+  user      User       @relation(fields: [userId], references: [id])
+  userId    Int
+  status    MemberShip
+  List      List?      @relation(fields: [listId], references: [id])
+  listId    Int?
+}
+
+model List {
+  id          Int       @default(autoincrement()) @id
+  createdAt   DateTime  @default(now())
+  updatedAt   DateTime  @default(now())
+  name        String
+  description String?
+  familyName  String?
+  babyGenre   Genre?
+  babyName    String?
+  birthDate   DateTime?
+  gifts       Gift[]
+  members     Member[]
+  isActivated Boolean   @default(true)
+  isOpen      Boolean   @default(false)
+  author      User      @relation(fields: [authorId], references: [id])
+  authorId    Int
+}
+
+model User {
+  id        Int      @default(autoincrement()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @default(now())
+  firstName String
+  lastName  String
+  email     String   @unique
+  password  String
+  role      Role     @default(USER)
+  genre     Genre
+  gifts     Gift[]
+  members   Member[]
+  List      List[]
+}
```

