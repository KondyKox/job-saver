export const STATUSES = ["saved", "applied", "interview", "rejected"] as const;
export type Status = (typeof STATUSES)[number];
