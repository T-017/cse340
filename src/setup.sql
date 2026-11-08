-- ------------------------------------------------------------------------
-- Organizations Table
-- ------------------------------------------------------------------------
CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- Insert Sample Data into Organizations Table
INSERT INTO organizations (name, description, contact_email, logo_filename)
VALUES
    ('BrightFuture Builders',
     'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
     'info@brightfuturebuilders.org',
     'brightfuture-logo.png'),

    ('GreenHarvest Growers',
     'An urban farming collective promoting food sustainability and education in local neighborhoods.',
     'contact@greenharvest.org',
     'greenharvest-logo.png'),

    ('UnityServe Volunteers',
     'A volunteer coordination group supporting local charities and service initiatives.',
     'hello@unityserve.org',
     'unityserve-logo.png');


-- Create the project table
CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES organization(organization_id),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    project_date DATE NOT NULL
);

-- Insert at least 5 projects per organization (15 total)
INSERT INTO project (organization_id, title, description, project_date) VALUES
-- BrightFuture Builders (assuming organization_id = 1)
(1, 'Community Park Cleanup', 'Help clean and beautify the local park.', '2026-11-15'),
(1, 'Playground Equipment Repair', 'Repair and paint playground equipment.', '2026-11-22'),
(1, 'Sidewalk Repair Day', 'Fix cracked sidewalks in the neighborhood.', '2026-12-06'),
(1, 'Community Garden Build', 'Build raised beds for a new community garden.', '2026-12-13'),
(1, 'Winter Shelter Prep', 'Prepare materials for winter shelter improvements.', '2026-12-20'),

-- GreenHarvest Growers (assuming organization_id = 2)
(2, 'Harvest Day', 'Help harvest vegetables from the urban farm.', '2026-11-08'),
(2, 'Seed Starting Workshop', 'Learn how to start seeds indoors.', '2026-11-16'),
(2, 'Composting Education', 'Teach neighbors how to compost.', '2026-11-29'),
(2, 'Farmers Market Setup', 'Help set up and run the weekend farmers market.', '2026-12-07'),
(2, 'Greenhouse Cleaning', 'Clean and prepare the greenhouse for winter.', '2026-12-14'),

-- UnityServe Volunteers (assuming organization_id = 3)
(3, 'Food Drive Sorting', 'Sort and package donated food.', '2026-11-10'),
(3, 'Senior Center Visit', 'Spend time with seniors at the local center.', '2026-11-18'),
(3, 'Toy Drive Collection', 'Collect and organize toys for children.', '2026-11-25'),
(3, 'Holiday Meal Prep', 'Help prepare meals for families in need.', '2026-12-12'),
(3, 'New Year Volunteer Orientation', 'Train new volunteers for the upcoming year.', '2026-12-28');

-- Categories table
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Junction table for many-to-many relationship
CREATE TABLE project_category (
    project_id INTEGER NOT NULL REFERENCES project(project_id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES category(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

-- Insert at least 3 categories
INSERT INTO category (name) VALUES
    ('Environmental'),
    ('Educational'),
    ('Community Service'),
    ('Health and Wellness');

-- Associate each project with at least one category
-- (Adjust project_id values if yours are different)
INSERT INTO project_category (project_id, category_id) VALUES
    -- Environmental
    (1, 1), (2, 1), (3, 1), (4, 1), (5, 1),
    (6, 1), (7, 1), (8, 1), (9, 1), (10, 1),
    -- Educational
    (6, 2), (7, 2), (8, 2), (11, 2), (15, 2),
    -- Community Service
    (1, 3), (3, 3), (5, 3), (11, 3), (12, 3), (13, 3), (14, 3),
    -- Health and Wellness
    (12, 4), (14, 4);