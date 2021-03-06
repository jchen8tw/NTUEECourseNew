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
    getAuthor: Student
    allWishes: [Wish!] # Only gets wishes associated to token
  }

  type Mutation {
    createStudent(data: LoginInput!): Student # Admin only
    login(data: LoginInput!): Token
    submitStudent(data: AdminInput!): String!
    submitCourse(data: AdminInput!): String!
    createComment(data: CommentInput!): String
    modifyComment(data: CommentInput!): String
    deleteComment(data: deleteCommentInput!): String
    createResponse(data: ResponseInput!): String
    changeNickname(nickname: String!): Boolean!
    changePassword(password: String!): Boolean!
    updateWish(data: WishUpdateInput!): Wish! # Normal course without teammate
    startAdmission:Admission_Result!
    updateWishWithTeammate(data: WishUpdateWithTeammateInput!): Wish! # Course with teammate
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
    _id: String
    semester: String!
    type: String! #必修、選修、十選二
    name: String!
    domain: String #CS、光電...
    teacher: String!
    studyTogether: String
    studyBefore: String
    content: String!
    score: Float
    author: String
  }
  input deleteCommentInput {
    _id: String!
  }
  input CommentFilterInput {
    name: String
    teacher: String
    author: String
    comment_id: String
  }

  input WishUpdateInput {
    course_name: String!
    priority: [String!]!
  }

  input WishUpdateWithTeammateInput {
    student_ids: [String!]
    course_name: String!
    priority: [String!]!
  }

  input ResponseInput {
    author: String
    content: String
    comment_id: String
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
    content: String!
    score: Float
    author: String
    responses: [Response]
  }
  type Response {
    author: String
    content: String
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
  type Admission_Result{
    raw: String!
  }
`;

module.exports = schema;
