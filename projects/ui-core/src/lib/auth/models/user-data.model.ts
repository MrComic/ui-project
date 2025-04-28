export class UserData {
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  description: string;
  username: string;

  constructor(user: any) {
    this.avatar = user.Avatar;
    this.email = user.Email;
    this.firstName = user.FirstName;
    this.lastName = user.LastName;
    this.username = user.UserName;
    this.description = user.Description;
  }
}
