class UsersService {
 
    constructor({User}){
        this.User = User;
    }
    async createUser(userData) {
        console.log("create user")
        const _user = await this.User.findOne({
        
                email:userData.email
            
        })
            if (_user){
                console.log("user is here")
                return {
                    message: 'A user with this email already exists',
                };
            } else {
                await this.User.create(userData)
            
                console.log("hello")
                return {
                message: 'Create user works !!!',
                user: userData,
                };
            }
        }

    async updateUser(userId,userData){
        const _user = await this.User.findByIdAndUpdate(userId,userData,{new : true});

        if (_user){
            return {
                message :" User update succesfully",
                user : _user,
            };
        }
        return {
            message : "User not Found !",
        }
    }

    async deleteUser(userId){
        const _user = await this.User.findByIdAndUpdate(userId);

        if (_user){
            return {
                message:'User deleted successfully!'
            }
        }
        return {
            message: 'User note Found'
        }
    }

    async login(userData) {
        const _user = await this.User.findOne({
            
                email:userData.email
            
        })
            if (_user){
                console.log("1111111")
               let isPasswordValid = _user.comparePassword(userData.comparePassword)

               if (isPasswordValid){
                console.log("2222222")

                return {
                    message:'User is connected'
                }
               }
               else {
                return {
                    message:'User Credentials are not corret !'
                }
               }
            } else {
                return {
                message: 'User doesnt exist',
                };
            }
        }

    async listAllUsers({ page = 1, limit = 10, search = '' }) {
        let query = {};
        if (search) {    
            query = {
                $or: [
                    { fullname: { $regex: search, $options: 'i' } },
                    { job: { $regex: search, $options: 'i' } },
                    { role: { $regex: search, $options: 'i' } },
                ],
            };
        }
 
        const _users = await this.User.find(query)
        .limit(limit)
        .skip((page - 1) * limit);
 
        const _total = await this.User.countDocuments(query);
 
        return {
            message: 'List of all users !',
            users: _users,
            total: _total,
            totalPages: Math.ceil(_total / limit),
            currentPage: page,
            limit: limit,
        };
    }
}

 
module.exports = UsersService;