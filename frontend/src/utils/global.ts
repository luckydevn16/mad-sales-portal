export {};

declare global {
  interface StateType {
    id: string;
    name: string;
    code: string;
    country: string;
    users: UserType[];
  }

  interface UserType {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    status: string;
    joinedAt: string;
    lastLogin: string;
    states: StateType[];
  }

  interface VisitType {
    id: string;
    quoteId: string;
    salesPerson: string;
    creationDate: Date;
    customerName: string;
    attendees: string;
    location: string;
    reception: number;
    summaryOfMeeting: number;
    doingRight: string;
    areasToImprove: string;
    actionNextSteps: string;
  }

  interface QuoteType {
    id: string;
    quoteId: string;
    type: string;
    status: string;
    probability: string;
    projectName: string;
    units: number;
    value: number;
    customerName: string;
    contact: string;
    endContractor: string;
    salesPerson: string;
    revision: string;
    projectAddress: string;
    quoteBy: string;
    creationDate: Date;
    estAwardDate: Date;
    revisionDate: Date;
    nextFollowUp: Date;
    sysAwardDate: Date;

    consultant: any;
    state: StateType;
  }

  interface QuoteFileType {
    quoteId: string;
    orgName: string;
    fileSize: number;
    createdAt: string;
  }

  interface QuoteNoteType {
    id: string;
    quoteId: string;
    content: string;
    createdAt: string;
  }

  interface InvitationType {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    token: string;
    status: string;
    sentAt: string;
    expiredAt: string;
    acceptedAt: string;
  }
}
