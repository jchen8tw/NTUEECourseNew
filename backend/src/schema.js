const { gql } = require('apollo-server-express');

const schema = gql`
  # Order: _id first, then sort the rest by lexicographical order
  # _id is MongoDB ObjectID, can be use as key of React lists
  type Query {
    allCourseGroups: [CourseGroup!]!
    me(student_id: String!): Student
    allTeacher: [Course!]!
    getCommentList(type: String!, name: String, teacher: String): [Comment]
  }

  type Mutation {
    createStudent(data: LoginInput!): Student # Admin only
    login(data: LoginInput!): Token
    adminSubmit(data: AdminInput!): Message
  }

  input LoginInput {
    student_id: String!
    password: String! # Assume HTTPS is used
  }
  input AdminInput {
    title: String
    content: String
  }
  type Student {
    _id: ID!
    id: String!
    nickname: String!
    fullname: String!
  }

  type Course {
    _id: ID!
    name: String!
    limit: Int!
    group: CourseGroup
    teacher: String!
  }

  type CourseGroup {
    _id: ID!
    courses: [Course!]!
    name: String!
    grade: Int!
  }
  type Comment {
    _id: ID!
    semester: String!
    type: String! #必修、選修、十選二
    name: String!
    domain: String #CS、光電...
    teacher: String!
    studyTogether: String
    studyBefore: String
    content: [String]!
    score: Int
  }

  type Token {
    raw: String!
  }

  type Message {
    message: String!
  }
`;

module.exports = schema;
