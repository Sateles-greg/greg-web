export const logUsageMetrics = ({
  mode,
  timestamp,
}: {
  mode: string;
  timestamp: string;
}) => {
  console.log(`Modo: ${mode}, Timestamp: ${timestamp}`);
};
