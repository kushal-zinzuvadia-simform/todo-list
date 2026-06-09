export const filters = ['All', 'Completed', 'Incomplete'] as const;

export type FilterType = (typeof filters)[number];
