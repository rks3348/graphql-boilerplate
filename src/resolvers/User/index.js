const users = [
    {
        id: 1,
        username: 'xyz',
        email: 'rks3348@gmail.com',
    },
    {
        id: 2,
        username: 'abc',
        email: 'rks@gmail.com',
    },
];
const UserResolver = {
    Query: {
        users: async ( _parent, args, { dataSources }, info ) => {
            let posts = await dataSources.CMSApi._('users').getAll(1);
            console.log(posts);
            return posts;
        },
    }
};
export default UserResolver;
