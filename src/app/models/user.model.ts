export class User {
  static mapToUser(data: any): User {
    return {
      id: data._id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName
    } as User;
  }

  id = '';
  email = '';
  firstName: '';
  lastName: '';

  constructor() { }
}
