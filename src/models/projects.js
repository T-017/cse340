import db from './db.js';

const getAllProjects = async () => {
  const query = `
    SELECT 
      p.project_id,
      p.title,
      p.description,
      p.project_date,
      p.organization_id,
      o.name AS organization_name
    FROM project p
    JOIN organization o ON p.organization_id = o.organization_id
    ORDER BY p.project_date;
  `;

  const result = await db.query(query);
  return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
  const query = `
    SELECT 
      p.project_id,
      p.title,
      p.description,
      p.project_date,
      p.organization_id,
      o.name AS organization_name
    FROM project p
    JOIN organization o ON p.organization_id = o.organization_id
    WHERE p.project_date >= CURRENT_DATE
    ORDER BY p.project_date ASC
    LIMIT $1;
  `;

  const result = await db.query(query, [number_of_projects]);
  return result.rows;
};

const getProjectDetails = async (id) => {
  const query = `
    SELECT 
      p.project_id,
      p.title,
      p.description,
      p.project_date,
      p.organization_id,
      o.name AS organization_name
    FROM project p
    JOIN organization o ON p.organization_id = o.organization_id
    WHERE p.project_id = $1;
  `;

  const result = await db.query(query, [id]);
  return result.rows.length > 0 ? result.rows[0] : null;
};

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

  const result = await db.query(query, [organizationId]);
  return result.rows;
};

const createProject = async (title, description, projectDate, organizationId) => {
  const query = `
    INSERT INTO project (title, description, project_date, organization_id)
    VALUES ($1, $2, $3, $4)
    RETURNING project_id;
  `;

  const queryParams = [title, description, projectDate, organizationId];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Failed to create project');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Created new project with ID:', result.rows[0].project_id);
  }

  return result.rows[0].project_id;
};

export {
  getAllProjects,
  getUpcomingProjects,
  getProjectDetails,
  getProjectsByOrganizationId,
  createProject
};