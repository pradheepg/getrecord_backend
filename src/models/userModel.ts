import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  basicProfile: {
    name: string;
    phone: string;
    dob: Date;
    socialMediaLinks: {
      linkedin: string;
      instagram: string;
    };
  };
  workExperience: Array<{
    title: string;
    companyName: string;
    location: string;
    startDate: Date;
    endDate: Date;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    startDate: Date;
    endDate: Date;
    grade: string;
    description: string;
  }>;
  projects: Array<{
    projectName: string;
    projectLink: string;
    startDate: Date;
    endDate: Date;
    description: string;
    skills: string[];
  }>;
  certifications: Array<{
    certificationName: string;
    organization: string;
    issueDate: Date;
    expirationDate: Date;
    credentialId: string;
    credentialUrl: string;
  }>;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },

    basicProfile: {
      name: String,
      phone: String,
      dob: Date,
      socialMediaLinks: {
        linkedin: String,
        instagram: String,
      },
    },
    workExperience: [
      {
        title: String,
        companyName: String,
        location: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],
    education: [
      {
        degree: String,
        institution: String,
        startDate: Date,
        endDate: Date,
        grade: String,
        description: String,
      },
    ],
    projects: [
      {
        projectName: String,
        projectLink: String,
        startDate: Date,
        endDate: Date,
        description: String,
        skills: [String],
      },
    ],
    certifications: [
      {
        certificationName: String,
        organization: String,
        issueDate: Date,
        expirationDate: Date,
        credentialId: String,
        credentialUrl: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
