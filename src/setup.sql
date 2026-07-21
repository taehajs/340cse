DROP TABLE IF EXISTS project_category;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS organization;

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    contact_email VARCHAR(255),
    logo_filename VARCHAR(255)
);

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id) 
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE project_category (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (project_id, category_id),
    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES project(project_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE
);

INSERT INTO organization (name, description, contact_email, logo_filename) VALUES
('Red Cross', 'Disaster relief and community support.', 'contact@redcross.org', 'org1.png'),
('Green Earth', 'Environmental conservation and clean-up.', 'info@greenearth.org', 'org2.png'),
('Youth Mentors', 'Education and mentoring for teenagers.', 'hello@youthmentors.org', 'org3.png');

INSERT INTO project (organization_id, title, description, location, date) VALUES
(1, 'Blood Drive 2026', 'Annual summer blood donation campaign.', 'Community Hall', '2026-07-20'),
(1, 'Disaster Prep Workshop', 'Learn basic survival and first aid skills.', 'Red Cross HQ', '2026-08-05'),
(1, 'First Aid Training', 'Get certified in CPR and basic first aid.', 'Downtown Center', '2026-08-15'),
(1, 'Food Pantry Drive', 'Distributing non-perishable food to families.', 'West Side Church', '2026-09-01'),
(1, 'Senior Care Visit', 'Spending time and helping out at the local senior center.', 'Sunnyvale Home', '2026-09-10'),

(2, 'City Park Clean-up', 'Picking up trash and planting flowers in the central park.', 'Central Park', '2026-07-25'),
(2, 'River Cleanup Day', 'Cleaning the banks of the Han River.', 'Han River Park', '2026-08-12'),
(2, 'Tree Planting Initiative', 'Help us plant 100 trees in the community forest.', 'Greenwood Forest', '2026-08-22'),
(2, 'Recycling Drive', 'Collecting electronic waste for proper recycling.', 'Eco Center', '2026-09-05'),
(2, 'Community Garden Setup', 'Building raised beds for the new community garden.', 'East District Lot', '2026-09-18'),

(3, 'Coding Bootcamp Mentor', 'Teach basic HTML/CSS to middle school students.', 'Tech Hub Library', '2026-07-28'),
(3, 'Math Tutoring Session', 'Help high school students prepare for their exams.', 'Study Smart Center', '2026-08-08'),
(3, 'Career Day Panel', 'Share your career journey with local youth.', 'Civic Center Auditorium', '2026-08-19'),
(3, 'Youth Soccer Coaching', 'Assist in coaching the weekend youth soccer league.', 'Sports Complex', '2026-09-03'),
(3, 'Art & Music Workshop', 'Creative expression classes for kids.', 'Creative Arts Studio', '2026-09-15');

INSERT INTO category (name) VALUES
('Community Infrastructure'),
('Education & Mentorship'),
('Environment & Sustainability');

INSERT INTO project_category (project_id, category_id) VALUES
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1),
(6, 3), (7, 3), (8, 3), (9, 3), (10, 3),
(11, 2), (12, 2), (13, 2), (14, 2), (15, 2),
(11, 1),
(10, 1);