export type SubscriptionResponse = {
  event: "subscribed" | "unsubscribed";
  chanId?: number;
  channel?: string;
}

export type UpdateMessage = [chanId: number, updates: UpdatePayload[] | UpdatePayload];
export type UpdatePayload = [price: number, count: number, amount: number];