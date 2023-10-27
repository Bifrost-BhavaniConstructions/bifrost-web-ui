export interface FollowUp {
  remark: string;
  datetime: Date;
  user: { name: string };
  createdAt?: Date;
  updatedAt?: Date;
}
