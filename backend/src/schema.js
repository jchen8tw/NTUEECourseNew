const { gql } = require('apollo-server-express');

const schema = gql`
  # Order: _id first, then sort the rest by lexicographical order
  # _id is MongoDB ObjectID, can be use as key of React lists
  type Query {
    allCourseGroups: [CourseGroup!]!
    me: Student
    allTeacher: [Course!]!
    getCommentList(type: String!, filter: CommentFilterInput): [Comment]
    getComment(_id: String): Comment
    allWishes: [Wish!] # Only gets wishes associated to token
  }

  type Mutation {
    createStudent(data: LoginInput!): Student # Admin only
    login(data: LoginInput!): Token
    submitStudent(data: AdminInput!): String!
    submitCourse(data: AdminInput!): String!
    createComment(data: CommentInput!): Comment
    changeNickname(nickname: String!): Boolean!
    changePassword(password: String!): Boolean!
    updateWish(data: WishUpdateInput!): Wish! # Normal course without teammate
  }

  input LoginInput {
    student_id: String!
    password: String! # Assume HTTPS is used
  }

  input AdminInput {
    title: String
    content: String
  }

  input CommentInput {
    semester: String!
    type: String! #必修、選修、十選二
    name: String!
    domain: String #CS、光電...
    teacher: String!
    studyTogether: String
    studyBefore: String
    content: [String]!
    score: Int
    author: String
  }

  input CommentFilterInput {
    name: String
    teacher: String
  }

  input WishUpdateInput {
    course_name: String!
    priority: [String!]!
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
    author: String
  }

  type Wish {
    _id: ID!
    student_ids: [String!]
    course_name: String!
    priority: [String!]
  }

  type Token {
    raw: String!
  }
`;

module.exports = schema;
