// We wrap our entire code in this event listener to ensure that the JavaScript
// doesn't run until the HTML document is fully loaded and ready.
document.addEventListener('DOMContentLoaded', () => {


    // --- 1. ELEMENT SELECTION ---
    // We get references to the HTML elements we need to interact with and store them in constants.
    const commandInput = document.getElementById('command-input'); // The text field where the user types.
    const output = document.getElementById('output');   // The area where results are printed.
    const terminal = document.getElementById('terminal'); // The main terminal container.    
    const prompt = document.querySelector('.prompt');             // The 'user@host:~$' text.

    // --- 2. DATA & STATE MANAGEMENT ---
    const commandList = [
        'command', 'about', 'skills', 'projects', 'project', 'coding',
        'resume', 'certificate', 'contact', 'theme', 'light',
        'dark', 'matrix', 'github', 'clear'
    ];

    const projectsData = {
        '1': {
            title: 'Terminal Based Portfolio',
            description: 'An interactive portfolio that showcases my skills and projects in a terminal-like interface.',
            tech: ['HTML5', 'CSS3', 'JavaScript (ES6+)'],
            live: '#',
            source: 'https://github.com/rajvikash18113'
        },
        '2': {
            title: 'Smart Stock Portfolio Optimizer',
            description: 'A web application that helps users manage their stock portfolios efficiently.',
            tech: ['React', 'Node.js', 'API'],
            live: '#',
            source: 'https://github.com/rajvikash18113'
        },
        '3': {
            title: 'Daily Task Tracker',
            description: 'A simple task management app to keep track of daily tasks.',
            tech: ['JavaScript', 'HTML', 'CSS'],
            live: '#',
            source: 'https://github.com/rajvikash18113'
        }
    };

    let commandHistory = [];
    let historyIndex = 0;

    // --- 3. HELPER FUNCTIONS ---

    //----------------------------- THEME SWITCHING --------------------------------------------//
    function applyTheme(themeName) {
        document.body.classList.remove('light-theme', 'matrix-theme');
        if (themeName !== 'dark') {
            document.body.classList.add(`${themeName}-theme`);
        }
        const result = document.createElement('div');
        result.innerHTML = `Theme set to: ${themeName}`;
        output.appendChild(result);
    }

    //--------------------- Fetches GitHub repos -----------------------------------//
    // Find and replace the entire fetchGitHubRepos function in script.js

    async function fetchGitHubRepos() {
        const githubUsername = 'rajvikash18113';
        const apiUrl = `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=3`;

        // Create the main container for the output
        const resultContainer = document.createElement('div');

        // --- CHANGE 1: Add the main box class to the container ---
        resultContainer.classList.add();

        // Set the initial loading message inside the box
        resultContainer.innerHTML = '<h3>Recent GitHub Repositories:</h3>Fetching...';
        output.appendChild(resultContainer);

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
            const repos = await response.json();

            let repoListHTML; // This will hold the final list HTML

            if (repos.length === 0) {
                repoListHTML = '<p>No public repositories found.</p>';
            } else {
                // --- CHANGE 2: Wrap each repository in the item box class ---
                repoListHTML = repos.map(repo =>
                    `<div class="output-box">
                    <strong><a href="${repo.html_url}" target="_blank">${repo.name}</a></strong>
                    <p style="margin: 5px 0 0 0; opacity: 0.8;">${repo.description || 'No description'}</p>
                </div>`
                ).join(''); // Use join('') as the divs provide their own spacing
            }

            // Update the container with the final, styled list
            resultContainer.innerHTML = `<h3>Recent GitHub Repositories:</h3>${repoListHTML}`;

        } catch (error) {
            console.error('Failed to fetch GitHub repos:', error);
            // Update the container with an error message
            resultContainer.innerHTML = '<h3>Recent GitHub Repositories:</h3><p>Error fetching data. Please check your connection.</p>';
        }
    }

    // --- 4. DEDICATED COMMAND FUNCTIONS ---

    function showHelp() {
        const result = document.createElement('div');
        result.innerHTML = `
            Available commands: <br>
            
            - <strong>about</strong>: Who am I? <br>
            - <strong>skills</strong>: What can I do. <br> 
            - <strong>projects</strong>: See a list of my work. <br>
            - <strong>coding</strong>: Analyze my Coding Skills. <br> 
            - <strong>resume</strong>: Get my Resume. <br>  
            - <strong>certificate</strong>: See my Cerifications. <br>
            - <strong>contact</strong>: Let's Connect. <br>
            - <strong>theme</strong>: Shows the theme options. <br>
            - <strong>github</strong>: See my recent works on GitHub. <br> 
            - <strong>clear</strong>: Clear the terminal.
            
        `;
        output.appendChild(result);
    }

    function showAbout() {
    const result = document.createElement('div');
    result.innerHTML = `
        <div class="output-box">
            Hello! I'm Vikash Kumar, a Computer Science undergraduate passionate about problem-solving and software development. Skilled in C++ and JavaScript, I’ve solved 500+ coding problems across platforms like LeetCode and CodeChef.<br><br>
            
            Currently, I serve as the Vice President of the Training Advisory Council (TAC), where I develop leadership, coordination, and teamwork skills. Always eager to learn and build, I’m looking forward to applying my skills to real-world challenges. Feel free to explore my work or get in touch!
        </div>
    `;
    output.appendChild(result);
}


    function showSkills() {
    const result = document.createElement('div');
    result.innerHTML = `
        <div class="output-box">
            <strong>Languages:</strong> C++, Java, JavaScript, HTML, CSS, SQL
            <p><strong>Frameworks & Libraries:</strong> Node.js (Basics), Express.js (Basics), Bootstrap, Tailwind CSS</p>
            <p><strong>Tools & Platforms:</strong> Git, GitHub, VS Code, Render, Netlify</p>
            <p><strong>Databases:</strong> MySQL, MongoDB</p>
            <p><strong>CS Fundamentals:</strong> Data Structures & Algorithms (C++), DBMS, OOPs, OS, Computer Networks (Basics)</p>
            <strong>Others:</strong> API Integration, RESTful APIs, Problem Solving (Leetcode, GFG), Version Control
        </div>
    `;
    output.appendChild(result);
}


    function showProjects() {
        const result = document.createElement('div');
        let allProjectsHTML = '<h3>Projects:</h3>';
        for (const id in projectsData) {
            const project = projectsData[id];
            allProjectsHTML += `
                <div class="output-box">
                    <h4>${id}. ${project.title}</h4>
                    <p>${project.description}</p>
                    <span class="prompt-text">Type "project ${id}" for details</span>
                </div>
            `;
        }
        result.innerHTML = allProjectsHTML;
        output.appendChild(result);
    }

    function showProjectDetail(projectId) {
        const result = document.createElement('div');
        const project = projectsData[projectId];
        if (project) {
            let techHTML = '';
            project.tech.forEach(tag => techHTML += `<span>${tag}</span>`);
            result.classList.add('project-container', 'project-detail');
            result.innerHTML = `
            <div class="output-box">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-detail-tech-stack">${techHTML}</div>
                <div class="project-detail-links">
                    <a href="${project.live}" target="_blank">Live Demo</a>
                    <a href="${project.source}" target="_blank">Source Code</a>
                </div>
                </div>
            `;
        } else {
            result.innerHTML = `Error: Project not found. Please use a valid project number (e.g., "project 1").`;
        }
        output.appendChild(result);
    }

    function showCoding() {
        const result = document.createElement('div');
        result.innerHTML = `
            Here are my Coding Profiles: <br>
            <div class="output-box">
            1. <a href="https://leetcode.com/rajvikash18113/" target="_blank">Leetcode</a><br>
            2. <a href="https://www.codechef.com/users/rajvikash18113" target="_blank">CodeChef</a><br>
            3. <a href="https://www.geeksforgeeks.org/user/rajvikash18113/" target="_blank">GeeksForGeeks</a><br>
            4. <a href="https://github.com/rajvikash18113" target="_blank">GitHub</a><br>
            </div>
        `;
        output.appendChild(result);
    }

    function showResume() {
        const result = document.createElement('div');
        result.innerHTML = `
            You can download my resume here: <br>
            <div class="output-box">
            <a href="src/doc/resume.pdf" target="_blank">Download Resume</a>
            </div>
        `;
        output.appendChild(result);
    }

    function showCertificate() {
        const result = document.createElement('div');
        result.innerHTML = `
            Here are my Certificates: <br>
            <div class="output-box">
            <a href="src/doc/certificate/learn-c++-codechef.pdf" target="_blank">Learn C++ (CodeChef) </a><br>
            <a href="src/doc/certificate/problem-solving-hackerrank.pdf" target="_blank">Problem Solver (Hacker Rank) </a><br>
            <a href="src/doc/certificate/web-dev-internship.pdf" target="_blank">Web Development</a><br>
            <a href="src/doc/certificate/introduction-to-mongodb.pdf" target="_blank">Introduction to MongoDB </a><br>
            <a href="src/doc/certificate/data-science-accenture.pdf" target="_blank">Data Science (Accenture) </a><br>
            <a href="src/doc/certificate/summer-workshop-gfg.pdf" target="_blank">Summer Workshop (GFG)</a><br>
            <a href="src/doc/certificate/ethical-hacker-cisco.pdf" target="_blank">Ethical hacker (Cisco) </a><br>
            <a href="src/doc/certificate/cybersecurity-cisco.pdf" target="_blank">Cyber Security (Cisco) </a><br>
            <a href="src/doc/certificate/it-essential-cisco.pdf" target="_blank">IT Essential (Cisco) </a><br>
            <a href="src/doc/certificate/iot-cisco.pdf" target="_blank">IOT (Cisco)</a><br>
            </div>
        `;
        output.appendChild(result);
    }


    function showContact() {
        const result = document.createElement('div');
        result.innerHTML = `
            You can reach me via: <br>
            <div class="output-box">
            - <strong>Email:</strong> <a href="mailto:rajvikash18113@gmail.com">rajvikash18113@gmail.com</a> <br>
            - <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/rajvikash18113" target="_blank">linkedin.com/in/rajvikash18113</a> <br>
            - <strong>GitHub:</strong> <a href="https://github.com/rajvikash18113" target="_blank">github.com/rajvikash18113</a>
            </div>
        `;
        output.appendChild(result);
    }

    function clearTerminal() {
        output.innerHTML = '';
    }

    //-------------------------------------------------- 5. WELCOME ANIMATION -----------------------------------------------------------------//
    const welcomeMessages = [
        { text: "Welcome to my interactive portfolio!", speed: 50 },
        { text: "Type 'command' or 'help' to see the list of available commands.", speed: 30 }
    ];

    async function displayWelcome() {
        commandInput.disabled = true;
        for (const message of welcomeMessages) {
            const line = document.createElement('div');
            output.appendChild(line);
            await new Promise(resolve => {
                let i = 0;
                function type() {
                    if (i < message.text.length) {
                        line.innerHTML += message.text.charAt(i);
                        i++;
                        setTimeout(type, message.speed);
                    } else {
                        resolve();
                    }
                }
                type();
            });
        }
        output.appendChild(document.createElement('br'));
        commandInput.disabled = false;
        commandInput.focus();
    }

    displayWelcome();

    // --------------------------------- 6. EVENT LISTENERS ------------------------------------------------//
    document.getElementById('terminal').addEventListener('click', () => {
        commandInput.focus();
    });

    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const currentInput = commandInput.value.trim().toLowerCase();
            if (!currentInput) return;
            const match = commandList.find(cmd => cmd.startsWith(currentInput));
            if (match) commandInput.value = match;
            return;
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0 && historyIndex > 0) {
                historyIndex--;
                commandInput.value = commandHistory[historyIndex];
                setTimeout(() => commandInput.selectionStart = commandInput.selectionEnd = commandInput.value.length, 0);
            }
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                commandInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                commandInput.value = '';
            }
            return;
        }

        if (e.key === 'Enter' && !commandInput.disabled) {
            const command = commandInput.value.trim().toLowerCase();
            const commandEcho = document.createElement('div');
            commandEcho.innerHTML = `<span class="prompt">${prompt.textContent}</span> <span class="command-echo">${command}</span>`;
            output.appendChild(commandEcho);
            if (command) {
                processCommand(command);
                commandHistory.push(command);
            }
            historyIndex = commandHistory.length;
            commandInput.value = '';
            terminal.scrollTop = terminal.scrollHeight;
        }
    });

    //---------------------------------7. COMMAND PROCESSING LOGIC(Switch Case) ------------------------------------------------//
    function processCommand(command) {
        const parts = command.split(' ');
        const commandName = parts[0];

        switch (commandName) {
            case 'command':
            case 'help':
                showHelp();
                break;
            case 'about':
                showAbout();
                break;
            case 'skills':
                showSkills();
                break;
            case 'projects':
                showProjects();
                break;
            case 'project':
                showProjectDetail(parts[1]);
                break;
            case 'coding':
                showCoding();
                break;
            case 'resume':
                showResume();
                break;
            case 'certificate':
                showCertificate();
                break;
            case 'contact':
                showContact();
                break;
            case 'theme':
                const themeResult = document.createElement('div');
                themeResult.innerHTML = ` Type 'light', 'dark', or 'matrix' to change the theme.`;
                output.appendChild(themeResult);
                break;
            case 'light':
            case 'dark':
            case 'matrix':
                applyTheme(commandName);
                break;
            case 'github':
                fetchGitHubRepos();
                break;
            case 'clear':
                clearTerminal();
                break;
            default:
                const errorResult = document.createElement('div');
                errorResult.innerHTML = `Command not found: ${command}. Type 'command' or 'help' for a list of commands.`;
                output.appendChild(errorResult);
                break;
        }
    }

    //-------------------------------------- 8. MATRIX RAIN ANIMATION ---------------------------------------------//
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const characters = katakana + latin + nums;
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    setInterval(draw, 50);
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    //----------------------------- 9. MUSIC TOGGLE ------------------------------------------------//
    const musicCheckbox = document.getElementById('music-checkbox');
    const audio = document.getElementById('background-audio');
    audio.volume = 0.1;
    musicCheckbox.addEventListener('change', () => {
        if (musicCheckbox.checked) {
            audio.play();
        } else {
            audio.pause();
        }
    });

});