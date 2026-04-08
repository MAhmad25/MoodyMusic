const required = ["PORT", "DB_URL", "IMAGEKIT_PRIVATE_KEY", "JWT_SECRET", "IMAGEKIT_URL", "IMAGEKIT_PUBLIC_KEY"];

required.forEach((key) => {
      if (!process.env[key]) {
            throw new Error(`Missing env variable: ${key}`);
      }
});

module.exports = {
      PORT: process.env.PORT,
      DB_URL: process.env.DB_URL,
      IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
      IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
      IMAGEKIT_URL: process.env.IMAGEKIT_URL,
      JWT_SECRET: process.env.JWT_SECRET,
};
