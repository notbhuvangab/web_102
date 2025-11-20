import { Link } from 'react-router-dom'

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-sm border-2 border-foreground p-8 text-center">
        <h1 className="text-3xl font-bold tracking-tighter mb-4">CHECK YOUR EMAIL</h1>
        <p className="text-sm text-muted-foreground mb-8">
          We've sent you a confirmation link. Please check your email to verify your account.
        </p>
        
        <Link 
          to="/auth/login"
          className="inline-block border-2 border-foreground bg-foreground text-background px-6 py-2 font-bold uppercase text-sm hover:bg-background hover:text-foreground"
        >
          BACK TO LOGIN
        </Link>
      </div>
    </div>
  )
}

