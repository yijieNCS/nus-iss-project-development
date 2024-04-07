// userFactory.js

import AdminUser from './AdminUser';
import NormalUser from './NormalUser';

const UserFactory = {
    createUser: (userData) => {
        if (userData.admin === 'Y') {
            return new AdminUser(userData);
        } else {
            return new NormalUser(userData);
        }
    }
};

export default UserFactory;
