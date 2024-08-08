"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Beam from "@/components/beam";
import MarqueeDemo from "@/components/tweet";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { DarkMode } from "./darkMode";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function Landing() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useUser();
  useEffect(() => {
    user.isSignedIn ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [user]);

  return (
    <div className="flex flex-col dark:bg-black dark:text-white">
      <header className="px-4 h-14 flex items-center justify-between border-b">
        <CloudIcon className="h-6 w-6" />
        <span className="sr-only">Filex</span>
        <nav className="flex gap-4 mt-2 w-full justify-end">
          <DarkMode />
          {isLoggedIn ? (
            <Link href="/dashboard">
              <Button className="w-18" variant="outline">
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/sign-up">
                <Button className="w-18">Sign Up</Button>
              </Link>
              <Link href="/sign-in">
                <Button variant="outline" className="w-18">
                  Login
                </Button>
              </Link>
            </>
          )}
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-8  lg:py-24 xl:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4  lg:text-left">
                <div className="space-y-2">
                  <h1 className="text-4xl md:text-4xl font-bold">
                    Secure and Effortless File Management
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground ">
                    Filex is a powerful file storage and data management service
                    that makes it easy to store, share, and access your files
                    from anywhere.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  {isLoggedIn ? (
                    <Link href="/dashboard">
                      <Button className="w-18" variant="outline">
                        Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link href="/sign-up">
                        <Button className="w-18">Sign Up</Button>
                      </Link>
                      <Link href="/sign-in">
                        <Button variant="outline" className="w-18">
                          Login
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <Beam />
            </div>
          </div>
        </section>
        <MarqueeDemo />
        <section id="pricing" className="w-full py-8 md:py-12 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Pricing
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter">
                  Affordable Plans for Every Need
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that best fits your storage and collaboration
                  needs.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl items-center justify-center gap-6 py-12 sm:grid-cols-2 lg:grid-cols-2 lg:gap-12">
              <Card className="border border-input">
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <CardDescription>
                    Get started with Filex for free.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-4xl font-bold">$0</p>
                    <p className="text-muted-foreground">per month</p>
                  </div>
                  <Separator className="my-6" />
                  <ul className="space-y-2 text-sm">
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                      5GB storage
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                      Basic file sharing
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                      Pdf reader
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                      Premium features
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/sign-up" className="w-full">
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="border border-input">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>
                    Custom plans for large teams and businesses.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-4xl font-bold">Contact Us</p>
                    <p className="text-muted-foreground">for pricing</p>
                  </div>
                  <Separator className="my-6" />
                  <ul className="space-y-2 text-sm">
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                      Unlimited storage
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                      Advanced collaboration tools
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                      Dedicated support
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                      Custom branding and integrations
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">Upload</Button>
                    </DialogTrigger>
                    <DialogContent>Email: patelpiyu468@gmail.com</DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function CloudIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}
