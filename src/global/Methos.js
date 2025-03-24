export const USMobileNumberFormatHandler = (_mobile: string) => {
    let cleanNumber = _mobile?.replace(/\D/g, '');
    let formattedNumber;
    if (cleanNumber?.length > 6) {
      formattedNumber = `(${cleanNumber?.slice(0, 3)}) ${cleanNumber?.slice(
        3,
        6,
      )}-${cleanNumber?.slice(6)}`;
    } else if (cleanNumber?.length > 3) {
      formattedNumber = `(${cleanNumber?.slice(0, 3)}) ${cleanNumber?.slice(
        3,
        6,
      )}`;
    } else {
      formattedNumber = cleanNumber;
    }
    return formattedNumber;
  };