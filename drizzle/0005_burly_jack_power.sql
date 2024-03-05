ALTER TABLE "courses" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "materials" ALTER COLUMN "link" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "topics" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "topics" ALTER COLUMN "url_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "level" integer DEFAULT 1 NOT NULL;