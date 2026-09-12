import { pgTable, text, serial, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const signupsTable = pgTable("signups_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const registrationsTable = pgTable("registrations_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  carMake: text("car_make").notNull(),
  carModel: text("car_model").notNull(),
  eventId: text("event_id").notNull(),
  format: text("format"),
  groupAffiliation: text("group_affiliation"),
  wantsTires: boolean("wants_tires").notNull().default(false),
  tireSize: text("tire_size"),
  tireSizeRear: text("tire_size_rear"),
  tireQuantity: integer("tire_quantity"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Singleton row (id 1) holding whatever the one current/upcoming event is.
export const eventTable = pgTable("event_table", {
  id: serial("id").primaryKey(),
  isOpen: boolean("is_open").notNull().default(false),
  title: text("title").notNull().default(""),
  eventDate: text("event_date").notNull().default(""),
  countdownAt: timestamp("countdown_at"),
  location: text("location").notNull().default(""),
  priceDrift: text("price_drift").notNull().default("TBA"),
  priceGymkhana: text("price_gymkhana").notNull().default("TBA"),
  spots: integer("spots").notNull().default(0),
  description: text("description").notNull().default(""),
  formats: text("formats").notNull().default(""),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
