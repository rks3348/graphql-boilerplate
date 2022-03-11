const __ = require('lodash');
const {logoutResponse, parsePayload} = require('../../helpers/helper');
const {updateUser} = require('../../helpers/orchestrator');

module.exports = {
    Query: {
        me: async (_, args, {dataSources}) => {
           return dataSources.id._('users/me').me(args);
        },
        user: async (_, {id}, {dataSources}) => {
            return dataSources.id._('user').user(id);
        },
        allUsers: async (_, args, {dataSources}) => {
            return dataSources.id._('getAllUsers').getAll(args);
        },
        exportUsersFile: async (_, args, {dataSources}) => {
            return dataSources.id._('exportUsersFile').getAll(args);
        },
        //ORCHESTRATOR
        userJourneys: async (_, args, {dataSources}) => {
            return dataSources.orchestratorApi._('users/me/journeys').getAll(args);
        },
        userJourney: async (_, {id}, {dataSources}) => {
            return dataSources.orchestratorApi._('users/me/journeys').getOne(id);
        },
        userJourneyProviders: async (_, args, {dataSources}) => {
            return dataSources.orchestratorApi._('users/me/journey_providers').getAllById(args.journey_id, args.input);
        },
        //END ORCHESTRATOR
    },
    Mutation: {
        register: async (_, args, {dataSources}) => {
            return dataSources.id._('api/users').register(args);
        },
        createUser: async (_, args, {dataSources}) => {
            return dataSources.id._('users/create').register(args);
        },
        googleLogin: async (_, args, {dataSources}) => {
            return dataSources.id._('auth/google/token').googleLogin(args);
        },
        appleLogin: async (_, args, {dataSources}) => {
            return dataSources.id._('auth/apple/token').appleLogin(args);
        },
        facebookLogin: async (_, args, {dataSources}) => {
            return dataSources.id._('auth/facebook/token').facebookLogin(args);
        },
        renewToken: async (_, args, {dataSources}) => {
            return dataSources.id._('/auth/renew-token').renewToken(args);
        },
        signIn: async (_, args, {dataSources}) => {
            return dataSources.id._('/users/login/res').signIn(args);
        },
        updateMe: async (_, args, {dataSources}) => {
            const res = await dataSources.id._('/users/me').updateMe(args);

            if(!__.isEmpty(res) && res.code === 200) {
                const data = parsePayload(args.input);

                await updateUser(dataSources, res.user._id, data);
            }

            return res;
        },
        updateProfile: async (_, {id, input}, {dataSources}) => {
            const res = await dataSources.id._('/users/edit').updateProfile(id, input);

            if(!__.isEmpty(res) && res.code === 200) {
                const data = parsePayload(input);
                await updateUser(dataSources, id, data);
            }

            return res;
        },
        updateNotificationPreferences: async (_, args, {dataSources}) => {

            const input = {};

            if (__.isBoolean(args.notificationUpdates)) {
                input.notificationUpdates = args.notificationUpdates;
            }
            if (__.isBoolean(args.notificationMessages)) {
                input.notificationMessages = args.notificationMessages;
            }

            return dataSources.id._('/users/me').updateNotificationPreferences(input);
        },
        changePassword: async (_, args, {dataSources}) => {
            return dataSources.id._('/users/updatepassword').changePassword(args);
        },
        resetPassword: async (_, args, {dataSources}) => {
            return dataSources.id._('/users/resetpassword').resetPassword(args);
        },
        deleteUser: async (_, args, {dataSources}) => {
            const res = await dataSources.id._('/users/delete').deleteUser(args);

            if(!__.isEmpty(res) && res.code === 200) {
                const data = {};
                data.deleted = 1;
                await updateUser(dataSources, args.id, data);
            }

            return res;
        },
        changeEmail: async (_, args, {dataSources}) => {
            return dataSources.id._('users/me/changeEmail').changeEmail(args);
        },
        requestDeleteUser: async (_, args, {dataSources}) => {
            return dataSources.id._('/users/me/delete').deleteUser(args);
        },
        banUser: async (_, {id}, {dataSources}) => {
            const res = await dataSources.id._('/users/ban').banUser(id);

            if(!__.isEmpty(res) && res.code === 200) { //send information through subscriptions to logout the user
                const CONVERSATION_MESSAGES = 'CONVERSATION_MESSAGES';

                const participantIds = new Set();
                participantIds.add(id);

                await dataSources.id.context.pubsub.publish(CONVERSATION_MESSAGES, { conversationMessages: logoutResponse(), participantIds: participantIds });
            }

            return res;
        },
    }
};

