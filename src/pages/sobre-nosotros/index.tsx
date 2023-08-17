import React from "react";
import { type MyPage } from "~/components/types/types";
import MainHead from "~/components/layouts/head/MainHead";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import SantiagoImage from "../../../public/about_dev_image/santiago.webp";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import Link from "next/link";
import { Globe, Linkedin, LinkedinIcon, WholeWordIcon } from "lucide-react";
const About: MyPage = () => {
  return (
    <>
      <MainHead title="Solucionado App" description="app solucionado" />
      <main className="flex min-h-screen w-full flex-col items-center px-4 py-8">
        <div className="grid auto-rows-auto grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="w-[350px]">
            <CardHeader className="flex flex-col items-center gap-4">
              <CardTitle>
                <div className="flex flex-col space-y-1.5">
                  <Avatar className="h-32 w-32">
                    <Image
                      src={SantiagoImage}
                      className="object-cover"
                      alt="Santiago Pacini Frontend Developer"
                    />
                  </Avatar>
                </div>
              </CardTitle>
              <CardDescription>
                <h2 className="text-2xl font-extrabold tracking-tight text-black">
                  Santiago Pacini
                </h2>
                <p className="text-center text-sm font-medium text-gray-600">
                  Desarrollador Frontend
                </p>
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between gap-2">
              <Button
                variant="outline"
                className="w-full bg-solBlue text-white hover:bg-solBlue/90 hover:text-white"
              >
                <Link
                  href="https://www.linkedin.com/in/santiagopacinidev/"
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <Linkedin />
                  <h2>Linkedin</h2>
                </Link>
              </Button>
              <Button className="w-full">
                <Link
                  href="https://santiagopacini.vercel.app/"
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <Globe />
                  <h2>Visitar Web</h2>
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="w-[350px]">
            <CardHeader className="flex flex-col items-center gap-4">
              <CardTitle>
                <div className="flex flex-col space-y-1.5">
                  <Avatar className="h-32 w-32">
                    <Image
                      src={SantiagoImage}
                      className="object-cover"
                      alt="Santiago Pacini Frontend Developer"
                    />
                  </Avatar>
                </div>
              </CardTitle>
              <CardDescription>
                <h2 className="text-2xl font-extrabold tracking-tight text-black">
                  Santiago Pacini
                </h2>
                <p className="text-center text-sm font-medium text-gray-600">
                  Desarrollador Frontend
                </p>
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between gap-2">
              <Button
                variant="outline"
                className="w-full bg-solBlue text-white hover:bg-solBlue/90 hover:text-white"
              >
                <Link
                  href="https://www.linkedin.com/in/santiagopacinidev/"
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <Linkedin />
                  <h2>Linkedin</h2>
                </Link>
              </Button>
              <Button className="w-full">
                <Link
                  href="https://santiagopacini.vercel.app/"
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <Globe />
                  <h2>Visitar Web</h2>
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="w-[350px]">
            <CardHeader className="flex flex-col items-center gap-4">
              <CardTitle>
                <div className="flex flex-col space-y-1.5">
                  <Avatar className="h-32 w-32">
                    <Image
                      src={SantiagoImage}
                      className="object-cover"
                      alt="Santiago Pacini Frontend Developer"
                    />
                  </Avatar>
                </div>
              </CardTitle>
              <CardDescription>
                <h2 className="text-2xl font-extrabold tracking-tight text-black">
                  Santiago Pacini
                </h2>
                <p className="text-center text-sm font-medium text-gray-600">
                  Desarrollador Frontend
                </p>
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between gap-2">
              <Button
                variant="outline"
                className="w-full bg-solBlue text-white hover:bg-solBlue/90 hover:text-white"
              >
                <Link
                  href="https://www.linkedin.com/in/santiagopacinidev/"
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <Linkedin />
                  <h2>Linkedin</h2>
                </Link>
              </Button>
              <Button className="w-full">
                <Link
                  href="https://santiagopacini.vercel.app/"
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <Globe />
                  <h2>Visitar Web</h2>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  );
};

export default About;
About.Layout = "Main";
