import React from "react";
import Button from "@mui/material/Button";

type PropType = {
  children: React.ReactNode;
  onClick?: () => void;
};
export default function Component({ children, onClick }: PropType) {
  return (
    <Button className="text-xl" variant="contained" onClick={onClick}>
      {children}
    </Button>
  );
}
