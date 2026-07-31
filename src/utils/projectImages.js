export const getProjectImages = (project) => {
  if (Array.isArray(project.images) && project.images.length > 0) {
    return project.images.filter(Boolean);
  }

  return project.image ? [project.image] : [];
};
