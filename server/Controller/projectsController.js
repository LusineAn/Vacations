const connection = require('../database');

class ProjectsController {

    getProjects (req, res) {
        const allProjects = 'SELECT * FROM projects';
        
        connection.query(allProjects, (err, results) => {
            if(err) {
                return res.send(err);
            }
            console.log('GET PROJECTS -------- : ');
            return res.json({
                data: results
            })
        })
    };
    
    addProject (req, res) {
        const {project_name} = req.query;
        const insertProject = `INSERT INTO projects (name) VALUES('${project_name}')`;
        
        connection.query(insertProject, (err, results) => {
            if(err) {
                return res.send(err);
            }
            console.log(`Project '${project_name}' successfully added`);
            return res.send(`Project '${project_name}' successfully added`);
        })
    };
    
    deleteProject (req, res) {
        const {project_name} = req.query;

        const deleteProjectFromVacations = `DELETE FROM vacations
                                            WHERE project_id = (
                                            SELECT id FROM projects
                                            WHERE name = ?)`;        
        connection.query(deleteProjectFromVacations, project_name, (err, results) => {
           if(err) {
               console.log(err);
               return res.send(err);
           }
           console.log(`Project '${project_name}' successfully deleted from Vacations`);
           const deleteProjectFromProjects = `DELETE FROM projects WHERE name = '${project_name}'`;
           connection.query(deleteProjectFromProjects, (err, results) => {
                if(err) {
                    console.log(err);
                    return res.send(err);
                }
                console.log(`Project '${project_name}' successfully deleted from Projects`);
           })
       });
    };
    
    updateProject (req, res) {
        const {newName} = req.query;
        const {oldName} = req.name;
        const updateProject = `UPDATE projects SET name = '${newName}' WHERE name = '${oldName}'`;
        
        connection.query(updateProject, (err, results) => {
           if(err) {
               return res.send(err);
           }
           console.log(`Project '${name}' successfully updated`);
       })
    };
}
  
  module.exports = new ProjectsController();