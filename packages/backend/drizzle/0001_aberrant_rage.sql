ALTER TABLE "alumniSurvey" ALTER COLUMN "timestamp" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "alumniSurvey" ALTER COLUMN "timestamp" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "alumniSurvey" ALTER COLUMN "timestamp" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "alumniSurvey" ALTER COLUMN "formValues" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "angkatan" ADD COLUMN "memberCount" integer DEFAULT 0 NOT NULL;