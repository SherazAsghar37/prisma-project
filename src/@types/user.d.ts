export type User = {
  uid: string;
  email: string;
  password?: string;
  facebook_id?: string; // these providers have multiple emails
  google_id?: string; // these providers have multiple emails
};
