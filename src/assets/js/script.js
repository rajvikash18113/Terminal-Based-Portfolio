
// We wrap our entire code in this event listener to ensure that the JavaScript
// doesn't run until the HTML document is fully loaded and ready.
document.addEventListener('DOMContentLoaded', () => {


    // --- 1. ELEMENT SELECTION ---
    // We get references to the HTML elements we need to interact with and store them in constants.
    const commandInput = document.getElementById('command-input'); // The text field where the user types.
    const output = document.getElementById('output');   // The area where results are printed.
    const terminal = document.getElementById('terminal'); // The main terminal container.    
    const prompt = document.querySelector('.prompt');             // The 'user@host:~$' text.

    const commandList = [
        'command', 'about', 'skills', 'projects', 'coding',
        'resume', 'certificate', 'contact', 'theme', 'light',
        'dark', 'matrix', 'github', 'clear'
    ];

    //----------------------------- 2. HELPER FUNCTION: THEME SWITCHING --------------------------------------------//
    /**
     * applyTheme changes the visual theme of the portfolio.
     * @param {string} themeName - The name of the theme to apply (e.g., 'light', 'dark').
     */
    function applyTheme(themeName) {
        // First, reset to default by removing any existing theme classes from the body.
        document.body.classList.remove('light-theme', 'matrix-theme');

        // 'dark' is the default theme (no class needed), so we only add a class for other themes.
        if (themeName !== 'dark') {
            document.body.classList.add(`${themeName}-theme`);
        }
        // Create a new div to display a confirmation message.
        const result = document.createElement('div');
        result.innerHTML = `Theme set to: ${themeName}`;
        output.appendChild(result);
    }

    //--------------------- Fetches and displays public repositories from a GitHub user.-----------------------------------//

    async function fetchGitHubRepos() {
        // IMPORTANT: Replace 'your-username-here' with your actual GitHub username.
        const githubUsername = 'rajvikash18113';
        const apiUrl = `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=3`;

        const output = document.getElementById('output');
        let repoList = 'Fetching GitHub repositories...\n\n';

        // Add a temporary "loading" message
        const loadingMessage = document.createElement('div');
        loadingMessage.innerHTML = repoList;
        output.appendChild(loadingMessage);

        try {
            // Use await to wait for the API response
            const response = await fetch(apiUrl);

            // Check if the request was successful
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status} - ${response.statusText}`);
            }

            const repos = await response.json();

            if (repos.length === 0) {
                repoList = 'No public repositories found.';
            } else {
                // Format the list of repositories
                repoList = repos.map(repo =>
                    `<strong><a href="${repo.html_url}" target="_blank">${repo.name}</a></strong> - ${repo.description || 'No description'}`
                ).join('<br>');
            }

        } catch (error) {
            // Handle any errors that occurred during the fetch
            console.error('Failed to fetch GitHub repos:', error);
            repoList = 'Error fetching GitHub repositories. Please check the username and your connection.';
        }

        // Update the loading message with the final result
        loadingMessage.innerHTML = repoList;
    }

    //-------------------------------------------------- 3. WELCOME ANIMATION -----------------------------------------------------------------//
    // This section controls the initial animated message that types itself out.
    const welcomeMessages = [
        { text: "Welcome to my interactive portfolio!", speed: 50 },
        { text: "Type 'command' to see the list of available commands.", speed: 30 }
    ];

    /**
     * displayWelcome types out the welcome messages one character at a time.
     * The 'async' and 'await' keywords ensure that one line finishes before the next one starts.
     */
    async function displayWelcome() {
        commandInput.disabled = true; // Disable the input field during the animation.
        for (const message of welcomeMessages) {
            const line = document.createElement('div');
            output.appendChild(line);
            await new Promise(resolve => {
                let i = 0;
                function type() {
                    if (i < message.text.length) {
                        line.innerHTML += message.text.charAt(i);
                        i++;
                        setTimeout(type, message.speed); // Wait before typing the next character.
                    } else {
                        resolve(); // This signals that the line is finished typing.
                    }
                }
                type();
            });
        }
        output.appendChild(document.createElement('br'));
        commandInput.disabled = false; // Re-enable the input field.
        commandInput.focus();          // Place the cursor in the input field.
    }

    // Starts the welcome animation automatically when the page loads.
    displayWelcome();

    // --------------------------------- 4. EVENT LISTENERS ------------------------------------------------//
    // This listener ensures that if the user clicks anywhere on the terminal, the input field is focused.
    document.getElementById('terminal').addEventListener('click', () => {
        commandInput.focus();
    });

    // This is the main event listener. It triggers whenever the user presses a key in the input field.
    commandInput.addEventListener('keydown', (e) => {
        // --- NEW: Handle Tab Autocompletion ---
        if (e.key === 'Tab') {
            // Stop the browser from switching focus to another element
            e.preventDefault();

            const currentInput = commandInput.value.trim().toLowerCase();

            // If the input is empty, do nothing
            if (!currentInput) {
                return;
            }

            // Find the first command in our list that starts with what the user has typed
            const match = commandList.find(cmd => cmd.startsWith(currentInput));

            // If a match is found, update the input field with the full command
            if (match) {
                commandInput.value = match;
            }
            return; // Exit the function after handling the Tab key
        }

        //--------------------------  Handle Enter Key-------------------------------//
        if (e.key === 'Enter' && !commandInput.disabled) {
            const command = commandInput.value.trim().toLowerCase();

            const commandEcho = document.createElement('div');
            commandEcho.innerHTML = `<span class="prompt">${prompt.textContent}</span> <span class="command-echo">${command}</span>`;
            output.appendChild(commandEcho);

            processCommand(command);

            commandInput.value = '';
            terminal.scrollTop = terminal.scrollHeight; // Scroll to the bottom of the terminal to show the latest output;
        }
    });

    //---------------------------------5. COMMAND PROCESSING LOGIC(Switch Case) ------------------------------------------------//
    /**
     * processCommand is the "brain" of the terminal. It takes a command
     * and decides what to do with it using a switch statement.
     * @param {string} command - The command entered by the user.
     */
    function processCommand(command) {
        const result = document.createElement('div');

        // The switch statement checks the command against a list of possible cases.
        switch (command) {
            case 'command':
                result.innerHTML = `
                    Available commands: <br>
                    - <strong>about</strong>: Who am I? <br>
                    - <strong>skills</strong>: What can I do. <br> 
                    - <strong>projects</strong>: See my Work. <br> 
                    - <strong>coding</strong>: Analyze my Coding Skills. <br> 
                    - <strong>resume</strong>: Get my Resume. <br>  
                    - <strong>certificate</strong>: See my Cerifications. <br>
                    - <strong>contact</strong>: Let's Connect. <br>
                    - <strong>theme</strong>: Shows the theme Color. <br>
                    - <strong>github</strong>: See my recent works on GitHub. <br> 
                    - <strong>clear</strong>: Clear the terminal.
                `;
                break;

            // The 'theme' command is now purely informational.
            case 'theme':
                result.innerHTML = `Usage: Type 'light', 'dark', or 'matrix' to change the theme directly.`;
                break;

            // These cases handle the direct theme changes.
            case 'light':
            case 'dark':
            case 'matrix':
                applyTheme(command); // The command itself is the theme name.
                return; // We return early because applyTheme() handles its own output.

            case 'about':
                result.innerHTML = `
                    
                    Hello! I'm Vikash Kumar, a passionate Computer Science undergraduate with a love for solving complex problems and building efficient solutions. I have a strong interest in software development and enjoy bringing ideas to life using technologies like C++, and JavaScript. This passion isn't just academic; I have solved over 500 coding problems on CodeChef, LeetCode and various platforms. I'm always eager to learn and currently seeking opportunities to apply my problem-solving skills to real-world challenges. Feel free to explore my work or get in touch!
                `;
                break;
            case 'skills':
                result.innerHTML = `
                    <strong>Languages:</strong> C++, Java, JavaScript, HTML/CSS <br>
                    <strong>Tools:</strong> Git, Github, VS Code <br>
                    <strong>Databases:</strong> MySQL, MongoDB
                `;
                break;
            case 'projects':
                result.innerHTML = `
                    Here are some of my projects: <br>
                    1. <a href="https://github.com/rajvikash18113" target="_blank">Terminal Based Portfolio</a> - An interactive portfolio that showcases my skills and projects in a terminal-like interface. <br>
                    2. <a href="https://github.com/rajvikash18113" target="_blank">Smart Stock Portfolio Optimizer</a> - A web application that helps users manage their stock portfolios efficiently. <br>
                    3. <a href="https://github.com/rajvikash18113" target="_blank">Daily task Tracker</a> - A simple task management app to keep track of daily tasks.<br>
                    4. <a href="https://github.com/rajvikash18113" target="_blank">Profile Card</a> - A simple profile card that showcases your social profiles.
                `;
                break;pr
            case 'coding':
                result.innerHTML = `
                    Here are my Coding Profiles: <br>
                    1. <a href="https://leetcode.com/rajvikash18113/" target="_blank">Leetcode</a><br>
                    2. <a href="https://www.codechef.com/users/rajvikash18113" target="_blank">CodeChef</a><br>
                    3. <a href="https://www.geeksforgeeks.org/user/rajvikash18113/" target="_blank">GeeksForGeeks</a><br>
                    4. <a href="https://github.com/rajvikash18113" target="_blank">GitHub</a><br>
                `;
                break;
            case 'resume':
                result.innerHTML = `
                    You can download my resume here: <br>
                    <a href="doc/resume.pdf" target="_blank">Download Resume</a>
                `;
                break;
            case 'certificate':
                result.innerHTML = `
                    Here are my Certificates: <br>
                    <a href="doc/certificate/learn-c++-codechef.pdf" target="_blank">Learn C++ (CodeChef) </a><br>
                    <a href="doc/certificate/problem-solving-hackerrank.pdf" target="_blank">Problem Solver (Hacker Rank) </a><br>
                    <a href="doc/certificate/web-dev-internship.pdf" target="_blank">Web Development</a><br>
                    <a href="doc/certificate/introduction-to-mongodb.pdf" target="_blank">Introduction to MongoDB </a><br>
                    <a href="doc/certificate/data-science-accenture.pdf" target="_blank">Data Science (Accenture) </a><br>
                    <a href="doc/certificate/summer-workshop-gfg.pdf" target="_blank">Summer Workshop (GFG)</a><br>
                    <a href="doc/certificate/ethical-hacker-cisco.pdf" target="_blank">Ethical hacker (Cisco) </a><br>
                    <a href="doc/certificate/cybersecurity-cisco.pdf" target="_blank">Cyber Security (Cisco) </a><br>
                    <a href="doc/certificate/it-essential-cisco.pdf" target="_blank">IT Essential (Cisco) </a><br>
                    <a href="doc/certificate/iot-cisco.pdf" target="_blank">IOT (Cisco)</a><br>
                `;
                break;
            case 'contact':
                result.innerHTML = `
                    You can reach me via: <br>
                    - <strong>Email:</strong> <a href="mailto:rajvikash18113@gmail.com">rajvikash18113@gmail.com</a> <br>
                    - <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/rajvikash18113" target="_blank">linkedin.com/in/rajvikash18113</a> <br>
                    - <strong>GitHub:</strong> <a href="https://github.com/rajvikash18113" target="_blank">github.com/rajvikash18113</a>
                `;
                break;

            // The 'fetch' command is used to get the latest GitHub repositories.
            // Inside your processCommand function's switch statement
            case 'github':
                fetchGitHubRepos(); // Call our new async function
                return; // Return to prevent an extra empty line

            // The 'clear' command is used to clear the terminal output.
            case 'clear':
                output.innerHTML = ''; // Clears all content from the output div.
                return; // Return to prevent an empty div from being added.

            // This 'default' case runs if the command doesn't match any of the above cases.
            default:
                result.innerHTML = `Command not found: ${command}. Type 'command' for a list of commands.`;
                break;
        }
        // This adds the result of the command to the output area on the screen.
        output.appendChild(result);
    }


    //-------------------------------------- 7. MATRIX RAIN ANIMATION ---------------------------------------------//
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas to the full screen size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // The characters that will be used for the rain
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const characters = katakana + latin + nums;

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);

    // 'drops' will store the y-position of the raindrop for each column
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function draw() {
        // Fill the canvas with a semi-transparent black to create the fading trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set the color and font for the characters
        ctx.fillStyle = '#0F0'; // Matrix Green
        ctx.font = fontSize + 'px monospace';

        // Loop through each column/drop
        for (let i = 0; i < drops.length; i++) {
            // Get a random character from our set
            const text = characters.charAt(Math.floor(Math.random() * characters.length));

            // Draw the character
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Reset the drop back to the top if it goes off screen
            // Add a random element to make the drops reset at different times
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            // Move the drop down for the next frame
            drops[i]++;
        }
    }

    // Start the animation loop
    setInterval(draw, 50);

    // Optional: Resize the canvas if the window is resized
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });



    //----------------------------- 8. MUSIC TOGGLE ------------------------------------------------//
    const musicCheckbox = document.getElementById('music-checkbox');
    const audio = document.getElementById('background-audio');

    // Set a low volume for the background music
    audio.volume = 0.1;

    // Listen for a 'change' event on the checkbox
    musicCheckbox.addEventListener('change', () => {
        // Check if the checkbox is now checked (ON)
        if (musicCheckbox.checked) {
            audio.play();
        } else {
            audio.pause();
        }
    });
});