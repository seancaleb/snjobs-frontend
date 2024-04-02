import Balancer from "react-wrap-balancer";

type EmptyChartDataProps = {
  message: string;
};

export const EmptyChartData = ({ message }: EmptyChartDataProps) => {
  return (
    <div className="w-full h-full grid place-items-center text-center muted">
      <div className="max-w-sm">
        <div className="text-sm">
          <Balancer>{message}</Balancer>
        </div>
      </div>
    </div>
  );
};
