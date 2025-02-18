import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
import BookDetails from "./routes/BookDetails";
import Home from "./routes/Home";
import BookListing from "./routes/BookListing";
import UserProfile from "./routes/UserProfle";

export const AppRoutes = () => {
  return (
      <Routes>
          <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookListing />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
      </Routes>
  );
};
