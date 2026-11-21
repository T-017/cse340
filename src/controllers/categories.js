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
  try {
    const projectId = req.params.projectId;
    console.log('projectId:', projectId);
    console.log('req.body:', req.body);

    let selectedCategoryIds = req.body.categoryIds || [];
    if (!Array.isArray(selectedCategoryIds)) {
      selectedCategoryIds = [selectedCategoryIds];
    }
    console.log('categoryIds:', selectedCategoryIds);

    await updateCategoryAssignments(projectId, selectedCategoryIds);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
  } catch (err) {
    console.error('Error in processAssignCategoriesForm:', err);
    req.flash('error', 'Failed to update categories.');
    res.redirect(`/project/${req.params.projectId}`);
  }
};

export {
  showCategoriesPage,
  showCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm
};