CREATE TYPE "public"."material_type" AS ENUM('upload', 'download');--> statement-breakpoint
ALTER TABLE "topics_to_materials" RENAME TO "topic_materials";--> statement-breakpoint
ALTER TABLE "topic_materials" DROP CONSTRAINT "topics_to_materials_topic_id_topics_id_fk";
--> statement-breakpoint
ALTER TABLE "topic_materials" DROP CONSTRAINT "topics_to_materials_material_id_materials_id_fk";
--> statement-breakpoint
ALTER TABLE "topic_materials" DROP CONSTRAINT "topics_to_materials_topic_id_material_id_pk";--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "materials" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "materials" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "topics" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "topics" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "topics" ALTER COLUMN "course_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "topic_materials" ALTER COLUMN "topic_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "topic_materials" ALTER COLUMN "material_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "topic_materials" ADD CONSTRAINT "topic_materials_topic_id_material_id_pk" PRIMARY KEY("topic_id","material_id");--> statement-breakpoint
ALTER TABLE "materials" ADD COLUMN "material_type" "material_type" DEFAULT 'download' NOT NULL;--> statement-breakpoint
ALTER TABLE "topic_materials" ADD CONSTRAINT "topic_materials_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "topic_materials" ADD CONSTRAINT "topic_materials_material_id_materials_id_fk" FOREIGN KEY ("material_id") REFERENCES "public"."materials"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "topics" DROP COLUMN "youtube_id";--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_name_unique" UNIQUE("name");