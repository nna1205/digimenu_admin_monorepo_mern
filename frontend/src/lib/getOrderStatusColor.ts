export const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "Preparing":
        return "bg-red-300";
      case "Ordered":
        return "bg-gray-300";
      case "Confirmed":
        return "bg-blue-300";
      case "Finished":
        return "bg-green-300";
      default:
        return "bg-gray-300";
    }
  };