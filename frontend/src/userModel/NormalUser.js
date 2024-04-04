// NormalUser.js

class NormalUser {
    constructor(userData) {
        this.userId = userData.userId;
        this.age = userData.age;
        this.dateJoined = userData.dateJoined;
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
        this.email = userData.email;
        this.education = userData.education;
        this.username = userData.username;
        this.password = userData.password;
        this.birthDate = userData.birthdate;
        this.gender = userData.gender;
        this.admin = userData.admin;
    }

    isAdmin() {
        return false; // Normal users will always return false
    }
}

export default NormalUser;
