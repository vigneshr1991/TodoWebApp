const { GraphQLDateTime } = require('graphql-iso-date');

const TodoResolvers = require('./TodoResolvers');

module.exports = {
    DateTime: GraphQLDateTime,
    ...TodoResolvers
}