import mongoose from "mongoose";

const conn = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
        tls: true,
        tlsAllowInvalidCertificates: true,
        tlsAllowInvalidHostnames: true
      });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Connection Error:", error.message);
        process.exit(1);
    }
};

export default conn;
