const { gql } = require('apollo-server-express');

const schema = gql`
  # Order: _id first, then sort the rest by lexicographical order
  # _id is MongoDB ObjectID, can be use as key of React lists
  type Query {
    allCourseGroups: [CourseGroup!]!
    me(student_id: String!): Student
    token: String
  }

  type Mutation {
    addUser(student_id: String!): Student # Admin only
  }

  type Student {
    _id: ID!
    id: String!
  }

  type Course {
    _id: ID!
    capacity: Int!
    group: CourseGroup
    teacher: String!
  }

  type CourseGroup {
    _id: ID!
    courses: [Course!]!
    name: String!
  }
`;

module.exports = schema;
