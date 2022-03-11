const categories = [
    {
        id: 0,
        name: 'Phone',
    },
    {
        id: 1,
        name: 'Laptop',
    },
];

const CategoryResolvers = {
    Query: {
        categories: (_parent, args, context) => {
            return categories;
        },
        getCategory: (_parent, args, context) => {
            var category = categories[0];
            return category;
        }
    },
    Mutation: {
        createCategory: async (_parent, args, { dataSources }, info) => {
            const user = users[0];
            var token = 'asdasd8sad87as8d7as8dasd74546';
            return { token, user };
        }
    }
};
export default CategoryResolvers;