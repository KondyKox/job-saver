CREATE TYPE "public"."status" AS ENUM('saved', 'applied', 'interview', 'rejected');--> statement-breakpoint
CREATE TABLE "offers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "offers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"company" text NOT NULL,
	"url" text NOT NULL,
	"status" "status" DEFAULT 'saved' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "offers_url_unique" UNIQUE("url")
);
