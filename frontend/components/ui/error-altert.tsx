import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleAlert } from "lucide-react";

function ErrorAlert({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Alert variant={"destructive"}>
      <CircleAlert className="h-4 w-4" />
      <AlertTitle>{title || "An error occurred"}</AlertTitle>
      <AlertDescription>
        {description ||
          "An error occurred while processing your request. Please try again later."}
      </AlertDescription>
    </Alert>
  );
}

export default ErrorAlert;
