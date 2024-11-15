const generateSlug = (title) => {
    const slug = title
      .toLowerCase()  
      .replace(/[^\w\s-]/g, "")  
      .trim()  
      .replace(/\s+/g, "-");  
    return slug;
  };

  
  export {
    generateSlug
  }