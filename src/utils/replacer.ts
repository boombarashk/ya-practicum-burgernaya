const replacer = (location: string): string => {
  return /#\/$/.test(location) ? location : `${location}#/`;
};

export default replacer;
