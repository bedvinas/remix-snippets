import { mongoose } from "mongoose";

const { Schema } = mongoose;

const snippetSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Need title"],
      minLength: [4, "Title is too short"],
    },
    description: {
        type: String,
        trim: true,
    },
    programmingLanguage: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Need username"],
      minLength: [4, "Username is too short"],
    },
    password: {
      type: String,
      required: [true, "Need password"],
      minLength: [4, "Password is too short"],
    },
  },
  { timestamps: true }
);

export const models = [
  {
    name: "Snippet",
    schema: snippetSchema,
    collection: "snippets",
  },
  {
    name: "User",
    schema: userSchema,
    collection: "users",
  },
];