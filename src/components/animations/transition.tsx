import { ReactNode } from "react";
import { MotionProps, motion } from "framer-motion";
import { animateFadeHorizontal, transition } from "@/lib/framer";
import { cn } from "@/lib/utils";

type TransitionProps = {
  children: ReactNode;
  childKey?: string;
  MotionProps?: MotionProps;
  className?: string;
};

export const Transition = ({
  children,
  childKey,
  MotionProps,
  className,
}: TransitionProps) => {
  return (
    <motion.div
      key={childKey ?? location.pathname}
      className={cn(
        "absolute top-[4.125rem] left-0 right-0 bottom-0 overflow-auto",
        className
      )}
      transition={transition}
      {...animateFadeHorizontal}
      {...MotionProps}
    >
      {children}
    </motion.div>
  );
};
