// This file re-exports the JSX-based AuthContext implementation
// kept in `AuthContext.jsx` so that bundlers which only parse JSX in .jsx files
// don't choke on JSX inside .js. Imports may reference this module path.

export { default } from "./AuthContext.jsx";
export { AuthProvider } from "./AuthContext.jsx";
