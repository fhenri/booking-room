import { signIn, signOut } from "@/lib/auth"
import { Button } from "@/components/ui/button"

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <div className="h-screen flex items-center justify-center">
      <form
        action={async () => {
          "use server"
          await signIn(provider)
        }}
      >
        <Button {...props}>Sign In</Button>
      </form>
    </div>
  )
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <div className="flex w-full items-end justify-end">
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <Button variant="ghost" className="mt-2" {...props}>
          Sign Out
        </Button>
      </form>
    </div>
  )
}