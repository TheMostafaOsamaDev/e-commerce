type SignUpType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type UserType = {
  id: string;
  image?: string | null; // Optional, as it may not be set
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: "USER" | "ADMIN"; // Replace with your actual Role enum
  createdAt: Date;
  updatedAt: Date;
};
