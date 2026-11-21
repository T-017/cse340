import {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId,
  getCategoriesByProjectId,
  updateCategoryAssignments
} from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';

const showCategoriesPage = async (req, res) => {
  const categories = await getAllCategories();
  const title = 'Service Project Categories';
  res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
  const categoryId = req.params.id;
  const category = await getCategoryById(categoryId);
  const projects = await getProjectsByCategoryId(categoryId);
  const title = category ? category.name : 'Category Not Found';

  res.render('category', { title, category, projects });
};

const showAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;
  const projectDetails = await getProjectDetails(projectId);
  const categories = await getAllCategories();
  const assignedCategories = await getCategoriesByProjectId(projectId);
  const title = 'Assign Categories to Project';

  res.render('assign-categories', {
    title,
    projectId,
    projectDetails,
    categories,
    assignedCategories
  });
};

const processAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;
  let selectedCategoryIds = req.body.categoryIds || [];

  // Ensure it is always an array
  if (!Array.isArray(selectedCategoryIds)) {
    selectedCategoryIds = [selectedCategoryIds];
  }

  await updateCategoryAssignments(projectId, selectedCategoryIds);
  req.flash('success', 'Categories updated successfully.');
  res.redirect(`/project/${projectId}`);
};

export {
  showCategoriesPage,
  showCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm
};