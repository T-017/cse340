// Import any needed model functions
import { getAllProjects } from '../models/projects.js';

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
    SELECT
      project_id,
      organization_id,
      title,
      description,
      project_date
    FROM project
    WHERE organization_id = $1
    ORDER BY project_date;
  `;

  const queryParams = [organizationId];
  const result = await db.query(query, queryParams);

  return result.rows;
};

export { getAllProjects, getProjectsByOrganizationId };

// Define any controller functions
const showProjectsPage = async (req, res) => {
  const projects = await getAllProjects();
  const title = 'Service Projects';

  res.render('projects', { title, projects });
};

// Export any controller functions
export { showProjectsPage };