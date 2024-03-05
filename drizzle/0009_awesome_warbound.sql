ALTER TABLE "courses" RENAME COLUMN "isActive" TO "is_active";--> statement-breakpoint
ALTER TABLE "materials" RENAME COLUMN "isActive" TO "is_active";--> statement-breakpoint
ALTER TABLE "topics" RENAME COLUMN "isActive" TO "is_active";--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "is_active" SET DEFAULT true;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "is_published" boolean DEFAULT false NOT NULL;