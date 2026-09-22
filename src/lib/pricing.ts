export type Format = 'drift' | 'gymkhana' | 'both';

export type EventPricing = {
  priceDriftEarly: number | null;
  priceGymkhanaEarly: number | null;
  priceDriftLate: number | null;
  priceGymkhanaLate: number | null;
  priceCutoffAt: string | Date | null;
};

export function isEarlyBird(event: Pick<EventPricing, 'priceCutoffAt'>, now: Date = new Date()): boolean {
  if (!event.priceCutoffAt) return true;
  return now.getTime() < new Date(event.priceCutoffAt).getTime();
}

export function basePrices(event: EventPricing, now: Date = new Date()) {
  const early = isEarlyBird(event, now);
  return {
    early,
    drift: early ? event.priceDriftEarly : event.priceDriftLate,
    gymkhana: early ? event.priceGymkhanaEarly : event.priceGymkhanaLate,
  };
}

export function amountForFormat(
  format: Format,
  driftPrice: number | null,
  gymkhanaPrice: number | null
): number | null {
  if (format === 'drift') return driftPrice;
  if (format === 'gymkhana') return gymkhanaPrice;
  if (driftPrice == null || gymkhanaPrice == null) return null;
  return driftPrice + gymkhanaPrice;
}
