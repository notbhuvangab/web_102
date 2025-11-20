import { Routes, Route } from 'react-router-dom'
import RootLayout from './app/layout'
import { Header } from '@/components/Header'
import HomePage from './pages/HomePage'
import LoginPage from './pages/auth/LoginPage'
import SignUpPage from './pages/auth/SignUpPage'
import SignUpSuccessPage from './pages/auth/SignUpSuccessPage'
import CreatePostPage from './pages/CreatePostPage'
import PostPage from './pages/posts/PostPage'
import EditPostPage from './pages/posts/EditPostPage'

export default function App() {
  return (
    <RootLayout>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/sign-up" element={<SignUpPage />} />
        <Route path="/auth/sign-up-success" element={<SignUpSuccessPage />} />
        <Route path="/create" element={<CreatePostPage />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/posts/:id/edit" element={<EditPostPage />} />
      </Routes>
    </RootLayout>
  )
}

