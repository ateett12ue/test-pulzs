"use client";

import * as React from "react";
//import { useMutation, useQuery, gql } from "@apollo/client";
//import Image from "next/image";
//import Link from "next/link";
import HomeHeader from "./components/homeheader";
import CentralBody from "./components/centralbody";
import Footer from "./components/footer";

//import { cn } from "ui/lib/utils";

//import { buttonVariants } from "@/registry/new-york/ui/button"
// import {
//   // Avatar,
//   // AvatarFallback,
//   // AvatarImage,
//   buttonVariants,
//   Button,
//   Header,
//   Heading,
// } from "ui";
// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "../../../../packages/ui/components/avatar";

const Home = () => {
  return (
    <div>
      <HomeHeader />
      <CentralBody />
      <Footer />
    </div>
  );
};

export default Home;
