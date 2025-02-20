ALTER TABLE "materials" RENAME COLUMN "material_type" TO "type";--> statement-breakpoint
ALTER TABLE "topics" ALTER COLUMN "youtube_url" SET NOT NULL;