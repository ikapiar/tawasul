ALTER TABLE "userToRole" DROP CONSTRAINT "userToRole_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "userToRole" ADD CONSTRAINT "userToRole_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;