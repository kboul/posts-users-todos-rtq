const truncate = (text: string, limit?: number): string => {
  const limitation = limit ?? 110;
  return text.length > limitation
    ? `${text.substring(0, limitation)}...`
    : text;
};

export { truncate };
