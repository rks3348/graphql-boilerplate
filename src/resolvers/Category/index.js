const books = [
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
            console.log(context);
            return books;
        },
        getCategory: (_parent, args, context) => {
            return books;
        },
    },
};
export default CategoryResolvers;