CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" text,
	"level" integer DEFAULT 1 NOT NULL,
	"img_src" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "materials" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "img_src" text;