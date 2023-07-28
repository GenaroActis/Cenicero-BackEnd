export default class buyerUserDto {
    constructor(user) {
        this.fullName = `${user.firstName} ${user.lastName}`
        this.email = user.email
    };
};