export const generateBadgeVariant = (status: string) => {
  switch (status) {
    case "Applied":
      return "info" as const;
    case "Application viewed":
      return "success" as const;
    case "Not selected by employer":
      return "error" as const;
    default:
      return "default";
  }
};
