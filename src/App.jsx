import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./ui/Layout";
import Projects from "./pages/Projects";
import Teams from "./pages/Teams";
import Tasks from "./pages/Tasks";
import ProjectDetail from "./features/project/ProjectDetail";
import TeamDetails from "./features/teams/TeamDetails";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import TaskDetail from "./features/tasks/TaskDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./AuthProvider";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/teams/:id" element={<TeamDetails />} />
              <Route path="/tasks/:id" element={<TaskDetail />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
