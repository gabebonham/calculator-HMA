CREATE TABLE "calculation_templates" (
	"id" uuid PRIMARY KEY NOT NULL,
	"plan_description" text NOT NULL,
	"initial_balance" double precision NOT NULL,
	"target" double precision NOT NULL,
	"breach_down" double precision NOT NULL,
	"margem_dd" double precision NOT NULL,
	"target_profit" double precision NOT NULL,
	"dd_day" double precision NOT NULL,
	"leverage_funded" double precision NOT NULL,
	"commission_funded" double precision NOT NULL,
	"leverage_real" double precision NOT NULL,
	"commission_real" double precision NOT NULL,
	"prop_firm_account_number" text NOT NULL,
	"total_gasto" text NOT NULL,
	"target_profit_pa" double precision NOT NULL,
	"stop_loss_pa" double precision NOT NULL,
	"stop_loss_ra" double precision NOT NULL,
	"take_ra" double precision NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "calculations" (
	"id" uuid PRIMARY KEY NOT NULL,
	"profile_id" uuid NOT NULL,
	"inp_plan_code" integer NOT NULL,
	"inp_step" integer NOT NULL,
	"inp_stop_loss_trade" double precision NOT NULL,
	"inp_safe_value" double precision NOT NULL,
	"inp_current_balance" double precision NOT NULL,
	"inp_coin_pair_value" double precision NOT NULL,
	"inppa_target_profit_lots" double precision NOT NULL,
	"outpa_target_profit_points" double precision NOT NULL,
	"outpa_stop_loss_points" double precision NOT NULL,
	"outra_stop_loss_lots" double precision NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "plans" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"period" text NOT NULL,
	"price" double precision NOT NULL,
	"color" text NOT NULL,
	"bgcolor" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"plan_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"username" text,
	"email" text NOT NULL,
	"role" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "calculations" ADD CONSTRAINT "calculations_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_plan_id_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;