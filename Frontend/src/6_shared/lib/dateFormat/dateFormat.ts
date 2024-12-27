export const formatDateToCustom = (isoDate: string): string => {
  const date = new Date(isoDate);

  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  return `${day}.${month}.${year}, ${hours}:${minutes}`;
};

export const formatMessageTime = (messageTimestamp: string): string => {
  const now: any = new Date();
  const messageDate: any = new Date(messageTimestamp);

  const differenceInMilliseconds = now - messageDate;
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
  const differenceInDays = differenceInHours / 24;

  if (differenceInHours <= 24) {
    return messageDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } if (differenceInDays <= 7) {
    return messageDate.toLocaleDateString([], { weekday: "long" });
  }
  return "";
};
