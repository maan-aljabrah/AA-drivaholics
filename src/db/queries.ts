import { db } from './index';
import { eventTable } from './schema';

export type CurrentEvent = typeof eventTable.$inferSelect;

export async function getCurrentEvent(): Promise<CurrentEvent | null> {
  const [event] = await db.select().from(eventTable).limit(1);
  return event ?? null;
}
