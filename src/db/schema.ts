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
  wantsTires: boolean("wants_tires").notNull().default(false),
  tireSize: text("tire_size"),
  tireQuantity: integer("tire_quantity"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Singleton row (id 1) holding whatever the one current/upcoming event is.
export const eventTable = pgTable("event_table", {
  id: serial("id").primaryKey(),
  isOpen: boolean("is_open").notNull().default(false),
  title: text("title").notNull().default(""),
  eventDate: text("event_date").notNull().default(""),
  location: text("location").notNull().default(""),
  price: text("price").notNull().default("TBA"),
  spots: integer("spots").notNull().default(0),
  description: text("description").notNull().default(""),
  formats: text("formats").notNull().default(""),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
