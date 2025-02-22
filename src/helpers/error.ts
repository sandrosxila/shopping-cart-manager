import { ApolloError } from "@apollo/client";
import toast from "react-hot-toast";
import { ZodError } from "zod";

export const toastZodErrorIssues = (error: ZodError) => {
  error.issues.forEach((issue) => {
    toast.error(issue.message);
  });
};

export const toastGraphQLZodError = (error: any) => {
  if (error instanceof ApolloError) {
    error.graphQLErrors.forEach((err) => {
      if (typeof err.extensions?.exception === "object" && "issues" in err.extensions.exception!) {
        toastZodErrorIssues(err.extensions.exception as ZodError);
      } else {
        console.error("Couldn't find ZodError exception");
      }
    });
  } else {
    console.error("Error is not an ApolloError instance");
  }
};
