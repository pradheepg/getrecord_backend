import { Request, Response } from "express";
import User from "../models/userModel"; 
import jwt from "jsonwebtoken";


const validateWorkExperience = (workExperience: any[]) => {
  const errors: string[] = [];
  if (!Array.isArray(workExperience)) return ["workExperience must be an array"];

  workExperience.forEach((exp, i) => {
    if (!exp.title) errors.push(`workExperience[${i}].title is required`);
    if (!exp.companyName) errors.push(`workExperience[${i}].companyName is required`);
    if (!exp.location) errors.push(`workExperience[${i}].location is required`);
    if (!exp.startDate) errors.push(`workExperience[${i}].startDate is required`);
  });

  return errors;
};

const validateEducation = (education: any[]) => {
  const errors: string[] = [];
  if (!Array.isArray(education)) return ["education must be an array"];

  education.forEach((edu, i) => {
    if (!edu.degree) errors.push(`education[${i}].degree is required`);
    if (!edu.institution) errors.push(`education[${i}].institution is required`);
    if (!edu.startDate) errors.push(`education[${i}].startDate is required`);
  });

  return errors;
};

const validateCertificates = (certificates: any[]) => {
  const errors: string[] = [];
  if (!Array.isArray(certificates)) return ["certificates must be an array"];

  certificates.forEach((cert, i) => {
    if (!cert.name) errors.push(`certificates[${i}].name is required`);
    if (!cert.issuer) errors.push(`certificates[${i}].issuer is required`);
    if (!cert.issueDate) errors.push(`certificates[${i}].issueDate is required`);
  });

  return errors;
};

const validateProjects = (projects: any[]) => {
  const errors: string[] = [];
  if (!Array.isArray(projects)) return ["projects must be an array"];

  projects.forEach((proj, i) => {
    if (!proj.title) errors.push(`projects[${i}].title is required`);
    if (!proj.description) errors.push(`projects[${i}].description is required`);
    if (!proj.startDate) errors.push(`projects[${i}].startDate is required`);
  });

  return errors;
};

const validateProfileData = (profileData: any) => {
  let errors: string[] = [];

  if (profileData.workExperience) {
    errors = errors.concat(validateWorkExperience(profileData.workExperience));
  }
  if (profileData.education) {
    errors = errors.concat(validateEducation(profileData.education));
  }
  if (profileData.certificates) {
    errors = errors.concat(validateCertificates(profileData.certificates));
  }
  if (profileData.projects) {
    errors = errors.concat(validateProjects(profileData.projects));
  }

  return errors;
};

export const createUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const profileData = req.body;

    const errors = validateProfileData(profileData);
    if (errors.length > 0) {
      return res.status(400).json({
        message: `Validation failed: ${errors.join(", ")}`,
        status: 400,
      });
    }

    const newUser = await User.findByIdAndUpdate(
      userId,
      { $set: profileData },
      { new: true, runValidators: true, upsert: true }
    ).select("-password");

    return res.status(201).json({
      message: "User profile created successfully",
      status: 201,
      user: newUser,
    });
  } catch (error: any) {
    console.error("Error creating profile:", error);
    return res.status(500).json({
      message: "Error creating profile",
      status: 500,
      error: error.message,
    });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const updateData = req.body;

    const errors = validateProfileData(updateData);
    if (errors.length > 0) {
      return res.status(400).json({
        message: `Validation failed: ${errors.join(", ")}`,
        status: 400,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found", status: 404 });
    }

    return res.status(200).json({
      message: "User profile updated successfully",
      status: 200,
      user: updatedUser,
    });
  } catch (error: any) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      message: "Error updating profile",
      status: 500,
      error: error.message,
    });
  }
};



export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    const user = await User.findById(userId).select("-password"); // exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found", status: 404 });
    }

    return res.status(200).json(user);
  } catch (error: any) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ message: "Error fetching profile", status: 500, error: error.message });
  }
};


export const deleteUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found", status: 404 });
    }

    return res.status(200).json({ message: "User profile deleted successfully", status: 200 });
  } catch (error: any) {
    console.error("Error deleting profile:", error);
    return res.status(500).json({ message: "Error deleting profile", status: 500, error: error.message });
  }
};
