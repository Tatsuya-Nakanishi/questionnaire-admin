import React from "react";
import Button from "@mui/material/Button";

type PropType = {
  children: React.ReactNode;
};
export default function Component({ children }: PropType) {
  return (
    <Button className="text-xl" variant="contained">
      {children}
    </Button>
  );
}
