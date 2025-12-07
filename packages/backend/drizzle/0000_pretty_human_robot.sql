CREATE TYPE "public"."gender_enum" AS ENUM('Laki-laki', 'Perempuan');--> statement-breakpoint
CREATE TYPE "public"."angkatan_category_enum" AS ENUM('putra', 'putri');--> statement-breakpoint
CREATE TYPE "public"."user_status_enum" AS ENUM('PendingApproval', 'Approved', 'Active', 'Blocked', 'Deleted');--> statement-breakpoint
CREATE TABLE "alumni" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"gender" "gender_enum" NOT NULL,
	"angkatanId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "angkatan" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"order" integer NOT NULL,
	"category" "angkatan_category_enum"
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userToRole" (
	"userId" integer NOT NULL,
	"roleId" integer NOT NULL,
	CONSTRAINT "userToRole_userId_roleId_pk" PRIMARY KEY("userId","roleId")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"status" "user_status_enum" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "alumniSurvey" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "alumniSurvey_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"timestamp" timestamp DEFAULT now(),
	"namaLengkap" varchar(255) NOT NULL,
	"angkatan" varchar(255) NOT NULL,
	"nomorKontak" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"formValues" json
);
--> statement-breakpoint
ALTER TABLE "userToRole" ADD CONSTRAINT "userToRole_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userToRole" ADD CONSTRAINT "userToRole_roleId_roles_id_fk" FOREIGN KEY ("roleId") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;