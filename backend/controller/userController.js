import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { User } from "../models/User.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic ||
    !role
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User Already Registered!", 400));
  }
  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role,
  });
  generateToken(user, "User Registered!", 200, res);
});

//login
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;

  // Check if all fields are filled
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please fill all details!", 400));
  }

  // Check if password and confirm password match
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password and confirm password don't match!", 400)
    );
  }

  // Find user by email and select password field
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password!", 400));
  }

  // Check if password matches
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password!", 400));
  }

  // Check if role matches
  if (role !== user.role) {
    return next(new ErrorHandler("User with this role not found!", 400));
  }

  // Generate and send token
  generateToken(user, "User logged in successfully!", 200, res);
});

// add new admin
export const addAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, gender, dob, nic } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(`${isRegistered.role} with same Email already exists`)
    );
  }
  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "Admin created successfully",
  });
});

// All Doctor

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });

  if (!doctors) {
    return next(new ErrorHandler("No doctors found", 404));
  }

  res.status(200).json({
    success: true,
    doctors,
  });
});
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin logged out successfully",
    });
});
export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient logged out successfully",
    });
});
//Add Doctor
export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  // Check if files are uploaded
  if (!req.files || !req.files.docAvatar) {
    return next(new ErrorHandler("Doctor avatar is required!", 400));
  }

  const { docAvatar } = req.files;
  const allowedFormats = ["image/jpg", "image/png", "image/jpeg"];

  // Check file format
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File format not supported", 400));
  }

  // Destructure request body
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    doctorDepartment,
  } = req.body;

  // Validate all required fields
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic ||
    !doctorDepartment
  ) {
    return next(new ErrorHandler("Please provide all details!", 400));
  }

  // Check if the user is already registered
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} already registered with this email`,
        400
      )
    );
  }

  // Upload avatar to Cloudinary
  let cloudinaryResponse;
  try {
    cloudinaryResponse = await cloudinary.uploader.upload(
      docAvatar.tempFilePath,
      {
        folder: "doctors_avatars",
        width: 150,
        crop: "scale",
      }
    );
  } catch (error) {
    return next(new ErrorHandler("Cloudinary upload failed", 500));
  }

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    return next(new ErrorHandler("Error in Cloudinary upload", 500));
  }

  // Create a new doctor
  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    doctorDepartment,
    role: "Doctor",
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "New Doctor Registered Successfully",
    doctor,
  });
});
