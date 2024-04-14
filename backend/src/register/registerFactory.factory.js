// Factory Interface
const userCreator = (isAdmin, user) => {
    return isAdmin ? adminUser(user) : normalUser(user)
}

// Concrete Creator
export const adminUserCreator = (user) => {
    return userCreator(true, user)
}

export const normalUserCreator = (user) => {
    return userCreator(false, user)
}

// Product Interface
const user = (user) => {
    return user
}

// Concrete Product
const adminUser = (userInfo) => {
    return user({
        age: 0,
        firstName: userInfo.firstName,
        email: userInfo.email,
        username: userInfo.username,
        password: userInfo.password,
        admin: 1
    })
}

const normalUser = (userInfo) => {
    const today = new Date();
    const birthDate = new Date(userInfo.birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return user({
        age: age,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        education: userInfo.education,
        username: userInfo.username,
        password: userInfo.password,
        birthDate: userInfo.birthDate,
        gender: userInfo.gender,
        admin: 0
    })
}