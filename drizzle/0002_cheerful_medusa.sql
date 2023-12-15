ALTER TABLE "courses" RENAME COLUMN "urlId" TO "url_id";--> statement-breakpoint
ALTER TABLE "courses" RENAME COLUMN "youtubeUrl" TO "youtube_irl";--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "url_id" SET DATA TYPE varchar(100);