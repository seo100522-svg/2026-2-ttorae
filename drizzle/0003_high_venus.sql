ALTER TABLE `applications` ADD `grade` varchar(50);--> statement-breakpoint
ALTER TABLE `applications` ADD `applicationType` enum('pre_arranged','direct') NOT NULL;--> statement-breakpoint
ALTER TABLE `applications` ADD `counselorName` varchar(100);--> statement-breakpoint
ALTER TABLE `applications` ADD `agreedSchedule` varchar(255);--> statement-breakpoint
ALTER TABLE `applications` ADD `availableTimes` text;--> statement-breakpoint
ALTER TABLE `scaleResponses` ADD `q6` int NOT NULL;--> statement-breakpoint
ALTER TABLE `scaleResponses` ADD `q7` int NOT NULL;--> statement-breakpoint
ALTER TABLE `scaleResponses` ADD `q8` int NOT NULL;--> statement-breakpoint
ALTER TABLE `scaleResponses` ADD `q9` int NOT NULL;--> statement-breakpoint
ALTER TABLE `scaleResponses` ADD `q10` int NOT NULL;--> statement-breakpoint
ALTER TABLE `scaleResponses` ADD `q11` int NOT NULL;--> statement-breakpoint
ALTER TABLE `scaleResponses` ADD `q12` int NOT NULL;--> statement-breakpoint
ALTER TABLE `scaleResponses` ADD `q13` int NOT NULL;--> statement-breakpoint
ALTER TABLE `scaleResponses` ADD `q14` int NOT NULL;--> statement-breakpoint
ALTER TABLE `scaleResponses` ADD `q15` int NOT NULL;--> statement-breakpoint
ALTER TABLE `scaleResponses` ADD `q16` int NOT NULL;--> statement-breakpoint
ALTER TABLE `scaleResponses` ADD `q17` int NOT NULL;--> statement-breakpoint
ALTER TABLE `scaleResponses` ADD `q18` int NOT NULL;--> statement-breakpoint
ALTER TABLE `scaleResponses` ADD `q19` int NOT NULL;--> statement-breakpoint
ALTER TABLE `scaleResponses` ADD `q20` int NOT NULL;