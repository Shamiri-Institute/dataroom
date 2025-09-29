import { BasePlan } from "../swr/use-billing";
import {
  conversionQueueFree,
  conversionQueueStarter,
  conversionQueuePro,
  conversionQueueBusiness,
  conversionQueueDatarooms
} from "../trigger/convert-files";

// Get the appropriate queue object based on the team plan
export const getConversionQueue = (plan: string) => {
  const planName = plan.split("+")[0] as BasePlan;

  switch (planName) {
    case "free":
      return conversionQueueFree;
    case "starter":
      return conversionQueueStarter;
    case "pro":
      return conversionQueuePro;
    case "business":
      return conversionQueueBusiness;
    case "datarooms":
      return conversionQueueDatarooms;
    default:
      return conversionQueueFree;
  }
};

// Legacy function for backward compatibility - returns queue name as string
// Note: This is now deprecated in favor of plan-specific task selection
export const conversionQueue = (plan: string): string => {
  const planName = plan.split("+")[0] as BasePlan;
  return `conversion-${planName}`;
};
