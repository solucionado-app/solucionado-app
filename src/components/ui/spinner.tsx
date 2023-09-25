
import { Loader2 } from "lucide-react";
type SpinnerProps = {
  className: string;
};
const Spinner: React.FC<SpinnerProps> = ({ className }) => {
  return <Loader2 className={`animate-spin ${className}`} />;
};

export default Spinner;
