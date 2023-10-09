import bcrypt from 'bcrypt';

//1.authRoute.js => 2. authController.js => 3. userModel.js => 4. authHelper.js
export const hashPassword = async (password) => {
    /* console.log("hashPassword"); */
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
}

export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}