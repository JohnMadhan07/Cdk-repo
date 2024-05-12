
export type SignUpBody = {
    username: string;
    password: string;
    email: string
  }

  export type ConfirmSignUpBody = {
    username: string;
    code: string;
  }

  export type SignInBody = {
    username: string;
    password: string;
  }

  export type Review = {
    movieId: number; // Partition key
    ReviewerName: string;
    ReviewDate: string; // Format: "YYYY-MM-DD"
    Content: string;
    Rating: number; // Range: 1-5
}