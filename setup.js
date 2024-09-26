const fs = require('fs');
const path = require('path');

// Helper function to create directories and add placeholder .txt files
function createDirWithFile(dirPath, fileName) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(path.join(dirPath, fileName), `This is a placeholder for ${dirPath}`);
}

// Root directory
const rootDir = path.join(__dirname, 'mern_project');

// Define the MERN folder structure
const folderStructure = {
    backend: {
        config: ['config.txt'],
        controllers: ['controllers.txt'],
        models: ['models.txt'],
        routes: ['routes.txt'],
        middlewares: ['middlewares.txt']
    },
    frontend: {
        src: {
            components: ['components.txt'],
            pages: ['pages.txt'],
            styles: ['styles.txt'],
            utils: ['utils.txt']
        },
        public: ['public.txt']
    },
    common: {
        utils: ['utils.txt'],
    }
};

// Recursive function to create the folder structure
function createFolders(baseDir, structure) {
    Object.entries(structure).forEach(([key, value]) => {
        const currentPath = path.join(baseDir, key);
        if (typeof value === 'object') {
            createFolders(currentPath, value);
        } else {
            createDirWithFile(baseDir, value[0]);
        }
    });
}

// Create root folder and structure
if (!fs.existsSync(rootDir)) {
    fs.mkdirSync(rootDir);
}

// Create folders and files
createFolders(rootDir, folderStructure);

console.log('MERN project folder structure created successfully.');