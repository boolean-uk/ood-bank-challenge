export class Customer {
  constructor(
    private firstName: string,
    private lastName: string,
    private birthDate: Date
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
  }
}
