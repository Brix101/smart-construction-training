CREATE TABLE "courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" text,
	"level" integer DEFAULT 1 NOT NULL,
	"sequence" integer DEFAULT 0 NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "materials" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) DEFAULT '',
	"link" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "materials_link_unique" UNIQUE("link")
);
--> statement-breakpoint
CREATE TABLE "topics" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"youtube_id" varchar(100) NOT NULL,
	"youtube_url" text,
	"description" text,
	"course_id" integer NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "topics_to_materials" (
	"topic_id" integer NOT NULL,
	"material_id" integer NOT NULL,
	CONSTRAINT "topics_to_materials_topic_id_material_id_pk" PRIMARY KEY("topic_id","material_id")
);
--> statement-breakpoint
ALTER TABLE "topics" ADD CONSTRAINT "topics_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "topics_to_materials" ADD CONSTRAINT "topics_to_materials_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "topics_to_materials" ADD CONSTRAINT "topics_to_materials_material_id_materials_id_fk" FOREIGN KEY ("material_id") REFERENCES "public"."materials"("id") ON DELETE no action ON UPDATE no action;