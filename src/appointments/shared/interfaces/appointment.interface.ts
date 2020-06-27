declare global {
  interface Date {
    toDate: () => Date;
  }
}

export interface Appointment {
  customer: string;
  email?: string;
  dateTime: Date;
}
