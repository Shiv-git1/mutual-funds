// adding all data to be displayed in webpage
import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Customer',
            email: 'customer@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        },
    ],
}
export default data;