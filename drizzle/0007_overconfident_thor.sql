ALTER TABLE "courses" RENAME COLUMN "active" TO "isActive";--> statement-breakpoint
ALTER TABLE "materials" ADD COLUMN "isActive" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "topics" ADD COLUMN "isActive" boolean DEFAULT false NOT NULL;