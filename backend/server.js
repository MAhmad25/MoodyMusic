const app = require("./src/app.js");
const { PORT } = require("./src/config/env.js");
app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
});
