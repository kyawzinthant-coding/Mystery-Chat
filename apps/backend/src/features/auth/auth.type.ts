export interface ClerkWebhookEvent {
  type: string;
  data: {
    id: string;
    first_name: string;
    last_name: string;
    email_addresses: Array<{
      email_address: string;
      id: string;
    }>;

    image_url: string;
  };
}
