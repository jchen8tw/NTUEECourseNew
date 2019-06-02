const { gql } = require('apollo-server-express');

const schema = gql`
  # Order: _id first, then sort the rest by lexicographical order
  # _id is MongoDB ObjectID, can be use as key of React lists
  type Query {
    allCourseGroups: [CourseGroup!]!
    me(student_id: String!): Student
  }

  type Mutation {
    createStudent(data: LoginInput!): Student # Admin only
    login(data: LoginInput!): Token
  }

  input LoginInput {
    student_id: String!
    password: String! # Assume HTTPS is used
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

  type Token {
    raw: String
  }
`;

module.exports = schema;
