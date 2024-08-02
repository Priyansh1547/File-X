import { SignUp } from "@clerk/nextjs";

export default function RootLayout() {
  return (
    <>
      <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-black md:shadow-xl">
        <SignUp fallbackRedirectUrl={"/dashboard"} />
      </div>
    </>
  );
}
