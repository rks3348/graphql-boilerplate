const users = [
    {
        id: 1,
        username: 'xyz',
        email: 'rks3348@gmail.com',
        firstname: 'firstname',
        lastname: 'firstname'
    },
    {
        id: 2,
        username: 'abc',
        email: 'rks@gmail.com',
        firstname: 'firstname',
        lastname: 'firstname'
    }
];
const UserResolver = {
    Query: {
        users: async (_parent, args, { dataSources }, info) => {
            let posts = await dataSources.CMSApi._('users').getAll(1);
            return posts;
        }
    },
    Mutation: {
        signup: async (_parent, args, { dataSources }, info) => {
            const user = users[0];
            var token = 'asdasd8sad87as8d7as8dasd74546';
            return { token, user };
        }
    }
};
export default UserResolver;
