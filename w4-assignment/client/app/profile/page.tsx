import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <Link href="/signin">Sign in</Link>
      <Link href="/signup">Sign up</Link>
    </div>
  );
};

export default page;
