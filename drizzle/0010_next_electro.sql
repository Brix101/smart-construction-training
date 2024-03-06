CREATE TABLE IF NOT EXISTS "topics_to_materials" (
	"topic_id" integer NOT NULL,
	"material_id" integer NOT NULL,
	CONSTRAINT "topics_to_materials_topic_id_material_id_pk" PRIMARY KEY("topic_id","material_id")
);
--> statement-breakpoint
ALTER TABLE "topics" RENAME COLUMN "details" TO "desciption";--> statement-breakpoint
ALTER TABLE "materials" DROP CONSTRAINT "materials_topic_id_topics_id_fk";
--> statement-breakpoint
ALTER TABLE "materials" DROP COLUMN IF EXISTS "topic_id";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "topics_to_materials" ADD CONSTRAINT "topics_to_materials_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "topics_to_materials" ADD CONSTRAINT "topics_to_materials_material_id_materials_id_fk" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "materials" ADD CONSTRAINT "materials_link_unique" UNIQUE("link");