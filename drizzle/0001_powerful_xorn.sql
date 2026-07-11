CREATE TABLE `applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studentName` varchar(100) NOT NULL,
	`studentId` varchar(20) NOT NULL,
	`phoneNumber` varchar(20) NOT NULL,
	`college` varchar(100) NOT NULL,
	`department` varchar(100) NOT NULL,
	`nationalityType` enum('local','international') NOT NULL,
	`nationality` varchar(100),
	`topics` text NOT NULL,
	`storyDetails` text,
	`status` enum('pending','matched','cancelled') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `applications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `scaleResponses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`applicationId` int NOT NULL,
	`q1` int NOT NULL,
	`q2` int NOT NULL,
	`q3` int NOT NULL,
	`q4` int NOT NULL,
	`q5` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `scaleResponses_id` PRIMARY KEY(`id`)
);
